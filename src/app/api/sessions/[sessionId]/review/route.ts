import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { canAccessSession } from '@/lib/session-access';
import { ExamReviewDTO, QuestionReviewDTO, QuestionType } from '@/types/exam';

export async function GET(
  _request: NextRequest,
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

    const session = await db.examSession.findUnique({
      where: { id: sessionId },
      include: {
        tryout: {
          include: {
            questions: {
              include: {
                options: {
                  orderBy: { key: 'asc' },
                },
              },
              orderBy: { orderNumber: 'asc' },
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

    // Zero Leakage Guard: Only permit review when exam session is COMPLETED
    if (session.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Pembahasan hanya dapat diakses setelah sesi ujian selesai dikerjakan' },
        { status: 403 }
      );
    }

    const answerMap = new Map<string, typeof session.answers[0]>();
    for (const ans of session.answers) {
      answerMap.set(ans.questionId, ans);
    }

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnanswered = 0;

    const questions: QuestionReviewDTO[] = session.tryout.questions.map((q) => {
      const userAns = answerMap.get(q.id);

      // Determine highest score among options (for TKP or standard MCQ)
      const maxScore = Math.max(...q.options.map((o) => o.score), 0);

      const options = q.options.map((opt) => ({
        id: opt.id,
        key: opt.key,
        text: opt.text,
        imageUrl: opt.imageUrl,
        score: opt.score,
        isCorrect: opt.score === maxScore && maxScore > 0,
      }));

      let isCorrect = false;
      let scoreAwarded = userAns?.scoreAwarded ?? 0;

      if (!userAns || (!userAns.selectedOptionId && !userAns.numericAnswer)) {
        totalUnanswered++;
      } else {
        if (q.category === 'TKP') {
          // For TKP, any answer gets points (1-5), counted as attempted
          isCorrect = scoreAwarded >= 3;
        } else {
          isCorrect = scoreAwarded > 0;
        }

        if (isCorrect) {
          totalCorrect++;
        } else {
          totalWrong++;
        }
      }

      return {
        id: q.id,
        orderNumber: q.orderNumber,
        category: q.category,
        subTopic: q.subTopic,
        questionType: (q.questionType as QuestionType) || 'MULTIPLE_CHOICE',
        text: q.text,
        imageUrl: q.imageUrl,
        explanation: q.explanation,
        explanationImageUrl: q.explanationImageUrl,
        options,
        userAnswer: userAns
          ? {
              selectedOptionId: userAns.selectedOptionId,
              numericAnswer: userAns.numericAnswer,
              scoreAwarded,
              isCorrect,
              isDoubt: userAns.isDoubt,
            }
          : undefined,
      };
    });

    const reviewDTO: ExamReviewDTO = {
      sessionId: session.id,
      tryoutId: session.tryoutId,
      title: session.tryout.title,
      mode: session.mode,
      totalScore: session.totalScore,
      subtestScores: session.subtestScores as Record<string, number> | undefined,
      isPassed: session.isPassed,
      totalQuestions: questions.length,
      totalCorrect,
      totalWrong,
      totalUnanswered,
      startedAt: session.startedAt.toISOString(),
      submittedAt: session.submittedAt?.toISOString(),
      questions,
    };

    return NextResponse.json(reviewDTO, { status: 200 });
  } catch (error) {
    console.error('Error fetching exam review:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat memuat pembahasan' },
      { status: 500 }
    );
  }
}
