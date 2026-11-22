import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { mergeAnswersByTimestamp, parseAnsweredAt } from '@/lib/answer-merge';
import { canAccessSession } from '@/lib/session-access';
import { calculateExamScore } from '@/lib/scoring-engine';
import {
  ExamType,
  QuestionScoringItem,
  UserAnswerItem,
  NegativeMarkingConfig,
  BKNPassingGradeCriteria,
} from '@/types/scoring';

interface SubmittedAnswerPayload {
  selectedOptionId?: string | null;
  numericAnswer?: string | null;
  isDoubt?: boolean;
  answeredAt?: string | null;
}

/** Auto-submit fires exactly at the deadline; allow a short grace window. */
const LATE_SUBMIT_GRACE_MS = 5 * 60 * 1000;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'ID sesi ujian diperlukan' },
        { status: 400 }
      );
    }

    // Parse incoming answers payload if present
    let submittedAnswers: Record<string, SubmittedAnswerPayload> = {};
    try {
      const body = await request.json();
      if (body && body.answers) {
        if (Array.isArray(body.answers)) {
          for (const item of body.answers) {
            if (item && item.questionId) {
              submittedAnswers[item.questionId] = {
                selectedOptionId: item.selectedOptionId ?? null,
                numericAnswer: item.numericAnswer ?? null,
                isDoubt: Boolean(item.isDoubt),
                answeredAt: item.answeredAt ?? null,
              };
            }
          }
        } else if (typeof body.answers === 'object') {
          submittedAnswers = body.answers;
        }
      }
    } catch {
      // Body may be empty or absent, continue using database answers
    }

    // Fetch exam session with tryout, passing grade profile, questions, and options
    const session = await db.examSession.findUnique({
      where: { id: sessionId },
      include: {
        tryout: {
          include: {
            passingGradeProfile: true,
            questions: {
              include: {
                options: true,
              },
              orderBy: {
                orderNumber: 'asc',
              },
            },
          },
        },
        answers: true,
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Sesi ujian tidak ditemukan' },
        { status: 404 }
      );
    }

    let authenticatedUserId: string | undefined;
    try {
      authenticatedUserId = (await auth())?.user?.id;
    } catch {
      authenticatedUserId = undefined;
    }

    if (!canAccessSession(session.userId, authenticatedUserId)) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    // If session is already COMPLETED, return the saved scores idempotently
    if (session.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        message: 'Sesi ujian telah diselesaikan sebelumnya',
        sessionId: session.id,
        totalScore: session.totalScore,
        subtestScores: session.subtestScores,
        isPassed: session.isPassed,
        submittedAt: session.submittedAt,
      });
    }

    const deadlineMs = session.deadline
      ? new Date(session.deadline).getTime()
      : Number.POSITIVE_INFINITY;
    if (deadlineMs < Date.now() - LATE_SUBMIT_GRACE_MS) {
      return NextResponse.json(
        { error: 'Waktu ujian telah habis' },
        { status: 403 }
      );
    }

    // Merge answers from database and submitted payload by answeredAt so a
    // delayed offline sync cannot overwrite a newer answer on the server.
    const serverAnswers: Record<
      string,
      {
        selectedOptionId: string | null;
        numericAnswer: string | null;
        isDoubt: boolean;
        answeredAt?: string | null;
      }
    > = {};

    for (const ans of session.answers) {
      serverAnswers[ans.questionId] = {
        selectedOptionId: ans.selectedOptionId,
        numericAnswer: ans.numericAnswer,
        isDoubt: ans.isDoubt,
        answeredAt: ans.answeredAt?.toISOString?.() ?? null,
      };
    }

    const clientAnswers: Record<
      string,
      {
        selectedOptionId: string | null;
        numericAnswer: string | null;
        isDoubt: boolean;
        answeredAt?: string | null;
      }
    > = {};

    for (const [qId, ans] of Object.entries(submittedAnswers)) {
      clientAnswers[qId] = {
        selectedOptionId: ans.selectedOptionId ?? null,
        numericAnswer: ans.numericAnswer ?? null,
        isDoubt: Boolean(ans.isDoubt),
        answeredAt: ans.answeredAt ?? null,
      };
    }

    const combinedAnswers = mergeAnswersByTimestamp(serverAnswers, clientAnswers);

    // Prepare QuestionScoringItem and UserAnswerItem arrays for scoring engine
    const questionScoringItems: QuestionScoringItem[] = [];
    const userAnswerItems: Record<string, UserAnswerItem> = {};

    for (const q of session.tryout.questions) {
      // Find option with highest score as the correctKey (if any score > 0)
      const maxScoreOption = q.options.length > 0
        ? q.options.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), q.options[0])
        : null;
      const correctKey = maxScoreOption && maxScoreOption.score > 0 ? maxScoreOption.key : null;

      questionScoringItems.push({
        id: q.id,
        category: q.category,
        correctKey,
        options: q.options.map((opt) => ({
          key: opt.key,
          score: opt.score,
        })),
      });

      // Map user answer to selectedKey / numericAnswer
      const userAns = combinedAnswers[q.id];
      let selectedKey: string | null = null;

      if (userAns?.selectedOptionId) {
        const matchedOption = q.options.find((o) => o.id === userAns.selectedOptionId);
        if (matchedOption) {
          selectedKey = matchedOption.key;
        }
      }

      if (!selectedKey && userAns?.numericAnswer) {
        selectedKey = userAns.numericAnswer.trim();
      }

      userAnswerItems[q.id] = {
        selectedKey,
        numericAnswer: userAns?.numericAnswer ?? null,
      };
    }

    // Prepare passing grade criteria and scoring configs
    const bknCriteria: BKNPassingGradeCriteria | undefined = session.tryout.passingGradeProfile
      ? {
          minTWK: session.tryout.passingGradeProfile.minTWK,
          minTIU: session.tryout.passingGradeProfile.minTIU,
          minTKP: session.tryout.passingGradeProfile.minTKP,
        }
      : undefined;

    const rawScheme = session.tryout.scoringScheme as any;
    const negativeConfig: NegativeMarkingConfig = {
      correctScore:
        typeof rawScheme?.correctScore === 'number'
          ? rawScheme.correctScore
          : typeof rawScheme?.correct === 'number'
          ? rawScheme.correct
          : 4,
      wrongScore:
        typeof rawScheme?.wrongScore === 'number'
          ? rawScheme.wrongScore
          : typeof rawScheme?.wrong === 'number'
          ? rawScheme.wrong
          : -1,
      emptyScore:
        typeof rawScheme?.emptyScore === 'number'
          ? rawScheme.emptyScore
          : typeof rawScheme?.empty === 'number'
          ? rawScheme.empty
          : 0,
    };

    // Calculate official scores via Strategy Pattern
    const scoreResult = calculateExamScore(
      (session.tryout.examType as ExamType) || 'SKD_CPNS',
      questionScoringItems,
      userAnswerItems,
      {
        bknCriteria,
        negativeConfig,
      }
    );

    const safeTotalScore =
      typeof scoreResult.totalScore === 'number' && !isNaN(scoreResult.totalScore)
        ? Math.round(scoreResult.totalScore)
        : 0;

    const safeSubtestScores: Record<string, number> = {};
    if (scoreResult.subtestScores && typeof scoreResult.subtestScores === 'object') {
      for (const [key, val] of Object.entries(scoreResult.subtestScores)) {
        safeSubtestScores[key] = typeof val === 'number' && !isNaN(val) ? Math.round(val) : 0;
      }
    }

    const now = new Date();

    // Atomic database update with Prisma transaction
    await db.$transaction(async (tx) => {
      // Upsert individual exam answers and assign scoreAwarded
      for (const q of session.tryout.questions) {
        const ans = combinedAnswers[q.id];
        if (!ans) continue;

        let scoreAwarded = 0;
        const matchedOption = q.options.find((o) => o.id === ans.selectedOptionId);

        if (session.tryout.examType === 'MATH_OLYMPIAD') {
          const neg = negativeConfig;
          const chosenKey = matchedOption?.key || (ans.numericAnswer ? ans.numericAnswer.trim() : null);
          const maxOption = q.options.length > 0
            ? q.options.reduce((p, c) => (c.score > p.score ? c : p), q.options[0])
            : null;
          const correctKey = maxOption && maxOption.score > 0 ? maxOption.key : null;

          if (chosenKey) {
            scoreAwarded = correctKey && chosenKey === correctKey ? neg.correctScore : neg.wrongScore;
          } else {
            scoreAwarded = neg.emptyScore;
          }
        } else {
          scoreAwarded = matchedOption ? matchedOption.score : 0;
        }

        if (isNaN(scoreAwarded)) scoreAwarded = 0;

        const answerTimestamp = parseAnsweredAt(ans.answeredAt);
        const answeredAt = Number.isFinite(answerTimestamp)
          ? new Date(answerTimestamp).toISOString()
          : now.toISOString();

        await tx.examAnswer.upsert({
          where: {
            examSessionId_questionId: {
              examSessionId: session.id,
              questionId: q.id,
            },
          },
          update: {
            selectedOptionId: ans.selectedOptionId,
            numericAnswer: ans.numericAnswer,
            isDoubt: ans.isDoubt,
            scoreAwarded,
            answeredAt,
          },
          create: {
            examSessionId: session.id,
            questionId: q.id,
            selectedOptionId: ans.selectedOptionId,
            numericAnswer: ans.numericAnswer,
            isDoubt: ans.isDoubt,
            scoreAwarded,
            answeredAt,
          },
        });
      }

      // Update exam session status to COMPLETED and save scores
      await tx.examSession.update({
        where: { id: session.id },
        data: {
          status: 'COMPLETED',
          totalScore: safeTotalScore,
          subtestScores: safeSubtestScores,
          isPassed: scoreResult.isPassed ?? false,
          submittedAt: now,
          passingGradeSnapshot: session.tryout.passingGradeProfile
            ? {
                minTWK: session.tryout.passingGradeProfile.minTWK,
                minTIU: session.tryout.passingGradeProfile.minTIU,
                minTKP: session.tryout.passingGradeProfile.minTKP,
              }
            : undefined,
        },
      });
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      totalScore: safeTotalScore,
      subtestScores: safeSubtestScores,
      isPassed: scoreResult.isPassed ?? false,
      submittedAt: now.toISOString(),
    });
  } catch (error) {
    console.error('Error submitting exam session:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses penyerahan ujian' },
      { status: 500 }
    );
  }
}
