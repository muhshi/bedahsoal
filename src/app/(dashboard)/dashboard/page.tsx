import { Suspense } from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { Loader2 } from 'lucide-react';

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
  try {
    sessions = await db.examSession.findMany({
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
    });
  } catch (err) {
    console.error('Failed to load sessions in dashboard:', err);
  }

  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');
  const stats = {
    total: sessions.length,
    completed: completedSessions.length,
    passed: completedSessions.filter((s) => s.isPassed).length,
    averageScore:
      completedSessions.length > 0
        ? Math.round(completedSessions.reduce((acc, curr) => acc + curr.totalScore, 0) / completedSessions.length)
        : 0,
    highestScore:
      completedSessions.length > 0
        ? Math.max(...completedSessions.map((s) => s.totalScore))
        : 0,
  };

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

  return <DashboardClient user={user} stats={stats} sessions={serializedSessions} />;
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="flex flex-col items-center max-w-sm text-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <h2 className="text-lg font-bold text-slate-800">Memuat Dashboard...</h2>
        <p className="text-sm text-slate-500 mt-1">Mengambil data riwayat tryout dan statistik ujian Anda.</p>
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
