import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import {
  sortLeaderboardEntries,
  pseudonymizeName,
  formatDuration,
  LeaderboardRankedEntry,
} from '@/lib/leaderboard';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tryoutId: string }> }
) {
  try {
    const { tryoutId } = await params;
    if (!tryoutId) {
      return NextResponse.json({ error: 'tryoutId parameter wajib disertakan' }, { status: 400 });
    }

    const tryout = await db.tryout.findUnique({
      where: { id: tryoutId },
      select: {
        id: true,
        title: true,
        examType: true,
        durationMinutes: true,
        totalQuestions: true,
      },
    });

    if (!tryout) {
      return NextResponse.json({ error: 'Paket tryout tidak ditemukan' }, { status: 404 });
    }

    // Ambil seluruh sesi ujian attempt 1 simulasi yang berhak masuk ranking
    const completedSessions = await db.examSession.findMany({
      where: {
        tryoutId,
        mode: 'SIMULASI',
        status: 'COMPLETED',
        attemptNumber: 1,
        rankEligible: true,
      },
      select: {
        id: true,
        userId: true,
        totalScore: true,
        subtestScores: true,
        isPassed: true,
        startedAt: true,
        submittedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            avatarUrl: true,
            isNamePublic: true,
          },
        },
      },
    });

    // Urutkan berdasarkan aturan resmi BKN Tie-Breaker
    const sorted = sortLeaderboardEntries(completedSessions, tryout.examType);

    // Ambil sesi user saat ini jika login untuk mengetahui posisinya
    const currentSession = await auth();
    const currentUserId = currentSession?.user?.id;

    let userStanding: { rank: number; entry: LeaderboardRankedEntry } | null = null;

    // Petakan ke DTO publik dengan pseudonymisasi nama sesuai UU PDP
    const rankedList: LeaderboardRankedEntry[] = sorted.map((item, index) => {
      const rank = index + 1;
      const durationSec =
        item.submittedAt && item.startedAt
          ? Math.max(0, Math.floor((new Date(item.submittedAt).getTime() - new Date(item.startedAt).getTime()) / 1000))
          : 0;

      const subScores = (item.subtestScores as Record<string, number>) || {};

      const entry: LeaderboardRankedEntry = {
        rank,
        sessionId: item.id,
        userId: item.userId,
        displayName: pseudonymizeName(item.user.name, item.user.isNamePublic),
        avatarUrl: item.user.image || item.user.avatarUrl,
        isNamePublic: item.user.isNamePublic,
        totalScore: item.totalScore,
        subtestScores: subScores,
        isPassed: item.isPassed,
        durationFormatted: formatDuration(durationSec),
        durationSeconds: durationSec,
        submittedAt: item.submittedAt ? item.submittedAt.toISOString() : new Date().toISOString(),
      };

      if (currentUserId && item.userId === currentUserId && !userStanding) {
        userStanding = { rank, entry };
      }

      return entry;
    });

    // Batasi list respons ke top 100 untuk efisiensi
    const topLeaderboard = rankedList.slice(0, 100);

    return NextResponse.json({
      tryout,
      totalParticipants: rankedList.length,
      userStanding,
      leaderboard: topLeaderboard,
    });
  } catch (error: any) {
    console.error('[API_TRYOUT_LEADERBOARD_ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Gagal memuat papan peringkat tryout' },
      { status: 500 }
    );
  }
}
