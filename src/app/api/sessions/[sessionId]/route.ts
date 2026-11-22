import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { canAccessSession } from '@/lib/session-access';
import { ClientQuestionDTO, ExamSessionInitDTO, QuestionType } from '@/types/exam';

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
              select: {
                id: true,
                orderNumber: true,
                category: true,
                subTopic: true,
                questionType: true,
                text: true,
                imageUrl: true,
                // Zero Leakage: explanation & explanationImageUrl STRICTLY EXCLUDED
                options: {
                  select: {
                    id: true,
                    key: true,
                    text: true,
                    imageUrl: true,
                    // Zero Leakage: score STRICTLY EXCLUDED
                  },
                  orderBy: {
                    key: 'asc',
                  },
                },
              },
              orderBy: {
                orderNumber: 'asc',
              },
            },
          },
        },
        answers: {
          select: {
            questionId: true,
            selectedOptionId: true,
            numericAnswer: true,
            isDoubt: true,
            answeredAt: true,
          },
        },
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

    // Check if session has already been completed
    if (session.status === 'COMPLETED') {
      return NextResponse.json(
        {
          error: 'Sesi ujian ini telah selesai dikerjakan',
          status: session.status,
          isCompleted: true,
          totalScore: session.totalScore,
          subtestScores: session.subtestScores,
          isPassed: session.isPassed,
          tryoutId: session.tryoutId,
          title: session.tryout?.title,
        },
        { status: 403 }
      );
    }

    // Map questions ensuring strict Zero Answer Leakage DTO format
    const questions: ClientQuestionDTO[] = session.tryout.questions.map((q) => ({
      id: q.id,
      orderNumber: q.orderNumber,
      category: q.category,
      subTopic: q.subTopic,
      questionType: (q.questionType as QuestionType) || 'MULTIPLE_CHOICE',
      text: q.text,
      imageUrl: q.imageUrl,
      options: q.options.map((opt) => ({
        id: opt.id,
        key: opt.key,
        text: opt.text,
        imageUrl: opt.imageUrl,
      })),
    }));

    // Map initial user answers
    const initialAnswers: Record<
      string,
      {
        selectedOptionId?: string | null;
        numericAnswer?: string | null;
        isDoubt: boolean;
        answeredAt?: string;
      }
    > = {};

    for (const ans of session.answers) {
      initialAnswers[ans.questionId] = {
        selectedOptionId: ans.selectedOptionId,
        numericAnswer: ans.numericAnswer,
        isDoubt: ans.isDoubt,
        answeredAt: ans.answeredAt?.toISOString?.() ?? new Date(0).toISOString(),
      };
    }

    const initDTO: ExamSessionInitDTO = {
      sessionId: session.id,
      tryoutId: session.tryoutId,
      title: session.tryout.title,
      mode: session.mode,
      startedAt: session.startedAt.toISOString(),
      deadline: session.deadline.toISOString(),
      serverTime: new Date().toISOString(),
      questions,
      initialAnswers,
    };

    return NextResponse.json(initDTO, { status: 200 });
  } catch (error) {
    console.error('Error fetching exam session:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memuat sesi ujian' },
      { status: 500 }
    );
  }
}
