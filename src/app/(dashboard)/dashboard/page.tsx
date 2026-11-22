import { Suspense } from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { computeTopicDiagnostics, AnswerDiagnosticInput } from '@/lib/diagnostics';

export const metadata: Metadata = {
  title: 'Dashboard & Riwayat Ujian - BedahSoal',
  description: 'Pantau riwayat tryout, perkembangan skor, dan analisis kelemahan materi ujian Anda di BedahSoal.',
};

async function DashboardContent() {
  let authSession = null;
  try {
    authSession = await auth();
  } catch {
    authSession = null;
  }
  const userId = authSession?.user?.id || 'user-demo-1';

  let sessions: any[] = [];
  let userAnswers: any[] = [];

  try {
    const [fetchedSessions, fetchedAnswers] = await Promise.all([
      db.examSession.findMany({
        where: { userId },
        include: {
          tryout: {
            select: {
              id: true,
              title: true,
              examType: true,
              durationMinutes: true,
              totalQuestions: true,
            },
          },
        },
        orderBy: { startedAt: 'desc' },
        take: 50,
      }),
      db.examAnswer.findMany({
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
      }),
    ]);

    sessions = fetchedSessions;
    userAnswers = fetchedAnswers;
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }

  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');
  const stats = {
    total: sessions.length,
    completed: completedSessions.length,
    passed: completedSessions.filter((s) => s.isPassed).length,
    averageScore:
      completedSessions.length > 0
        ? Math.round(
            completedSessions.reduce((acc, curr) => acc + curr.totalScore, 0) /
              completedSessions.length
          )
        : 0,
    highestScore:
      completedSessions.length > 0
        ? Math.max(...completedSessions.map((s) => s.totalScore))
        : 0,
  };

  const diagnosticInputs: AnswerDiagnosticInput[] = userAnswers.map((a) => {
    const maxScore =
      a.question.options && a.question.options.length > 0
        ? Math.max(...a.question.options.map((o: any) => o.score))
        : 5;
    return {
      category: a.question.category,
      subTopic: a.question.subTopic,
      scoreAwarded: a.scoreAwarded,
      maxScore: maxScore > 0 ? maxScore : 5,
    };
  });

  const diagnostics = computeTopicDiagnostics(diagnosticInputs);

  const user = authSession?.user || {
    id: 'user-demo-1',
    name: 'Peserta Mandiri',
    email: 'demo@bedahsoal.id',
    image: null,
  };

  const serializedSessions = sessions.map((s) => ({
    ...s,
    startedAt: s.startedAt.toISOString(),
    finishedAt: s.finishedAt ? s.finishedAt.toISOString() : null,
  }));

  return (
    <DashboardClient
      user={user}
      stats={stats}
      sessions={serializedSessions}
      {...({ diagnostics } as any)}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper p-6">
      <div className="flex flex-col items-center max-w-sm text-center border border-ink bg-white p-8 shadow-paper">
        <div className="w-10 h-10 mb-4 border-2 border-ink border-t-red-stamp animate-spin" aria-hidden="true" />
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-stamp">
          Arsip 00 / Rapor
        </p>
        <h2 className="font-serif text-2xl font-bold text-ink mt-2">Memuat Dashboard...</h2>
        <p className="font-mono text-xs text-ink-3 mt-1 uppercase tracking-wider">
          Mengambil data riwayat tryout dan statistik ujian Anda.
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
