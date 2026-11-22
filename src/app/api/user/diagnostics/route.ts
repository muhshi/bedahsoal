import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { computeTopicDiagnostics, AnswerDiagnosticInput } from '@/lib/diagnostics';

export async function GET() {
  try {
    const session = await auth().catch(() => null);
    const userId = session?.user?.id || 'user-demo-1';

    // Retrieve answers from completed exam sessions
    const answers = await db.examAnswer.findMany({
      where: {
        examSession: {
          userId,
          status: 'COMPLETED',
        },
      },
      select: {
        scoreAwarded: true,
        question: {
          select: {
            category: true,
            subTopic: true,
            options: {
              select: {
                score: true,
              },
            },
          },
        },
      },
      take: 500,
    });

    const diagnosticInputs: AnswerDiagnosticInput[] = answers.map((a) => {
      const maxScore =
        a.question.options.length > 0
          ? Math.max(...a.question.options.map((o) => o.score))
          : 5;

      return {
        category: a.question.category,
        subTopic: a.question.subTopic,
        scoreAwarded: a.scoreAwarded,
        maxScore: maxScore > 0 ? maxScore : 5,
      };
    });

    const diagnostics = computeTopicDiagnostics(diagnosticInputs);

    return NextResponse.json({
      success: true,
      count: diagnostics.length,
      diagnostics,
    });
  } catch (error) {
    console.error('Error fetching user diagnostics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to compute diagnostics' },
      { status: 500 }
    );
  }
}
