import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function GET() {
  try {
    let authSession = null;
    try {
      authSession = await auth();
    } catch {
      authSession = null;
    }
    const userId = authSession?.user?.id || 'user-demo-1';

    const sessions = await db.examSession.findMany({
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

    const stats = {
      total: sessions.length,
      completed: sessions.filter((s) => s.status === 'COMPLETED').length,
      passed: sessions.filter((s) => s.isPassed).length,
      averageScore:
        sessions.filter((s) => s.status === 'COMPLETED').length > 0
          ? Math.round(
              sessions
                .filter((s) => s.status === 'COMPLETED')
                .reduce((acc, curr) => acc + curr.totalScore, 0) /
                sessions.filter((s) => s.status === 'COMPLETED').length
            )
          : 0,
      highestScore:
        sessions.filter((s) => s.status === 'COMPLETED').length > 0
          ? Math.max(...sessions.filter((s) => s.status === 'COMPLETED').map((s) => s.totalScore))
          : 0,
    };

    return NextResponse.json({
      success: true,
      user: authSession?.user || {
        id: 'user-demo-1',
        name: 'Peserta Mandiri',
        email: 'demo@bedahsoal.id',
      },
      stats,
      sessions,
    });
  } catch (err: any) {
    console.error('Failed to get user history:', err);
    return NextResponse.json(
      { error: 'Gagal memuat riwayat ujian' },
      { status: 500 }
    );
  }
}
