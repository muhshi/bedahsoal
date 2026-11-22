import { describe, it, expect, vi } from 'vitest';
import { GET as getHistoryHandler } from '@/app/api/user/history/route';

vi.mock('@/lib/db', () => ({
  db: {
    examSession: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 'test-session-1',
          userId: 'user-demo-1',
          tryoutId: 'tryout-tiu-60',
          mode: 'SIMULASI',
          status: 'COMPLETED',
          startedAt: new Date('2026-11-22T08:00:00Z'),
          finishedAt: new Date('2026-11-22T08:50:00Z'),
          totalScore: 165,
          isPassed: true,
          scoreBknBreakdown: { tiu: 165 },
          scoreNegativeBreakdown: null,
          tryout: {
            id: 'tryout-tiu-60',
            title: 'Simulasi Mandiri TIU 60 Soal',
            examType: 'SKD_CPNS',
            durationMinutes: 60,
            totalQuestions: 60,
            passingGrade: { tiu: 80 },
          },
        },
      ]),
    },
  },
}));

describe('User History API: GET /api/user/history', () => {
  it('should return 200 with user session history and stats', async () => {
    const res = await getHistoryHandler();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.stats).toBeDefined();
    expect(body.stats.total).toBe(1);
    expect(body.stats.completed).toBe(1);
    expect(body.stats.passed).toBe(1);
    expect(body.stats.averageScore).toBe(165);
    expect(body.stats.highestScore).toBe(165);
    expect(body.sessions).toHaveLength(1);
    expect(body.sessions[0].tryout.title).toBe('Simulasi Mandiri TIU 60 Soal');
  });
});
