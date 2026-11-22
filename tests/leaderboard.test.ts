import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import {
  pseudonymizeName,
  formatDuration,
  sortLeaderboardEntries,
} from '../src/lib/leaderboard';
import { GET as getLeaderboard } from '../src/app/api/tryouts/[tryoutId]/leaderboard/route';
import { PATCH as updatePrivacy } from '../src/app/api/user/privacy/route';
import { db } from '../src/lib/db';
import { auth } from '../src/auth';

vi.mock('../src/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('../src/lib/db', () => ({
  db: {
    tryout: {
      findUnique: vi.fn(),
    },
    examSession: {
      findMany: vi.fn(),
    },
    user: {
      update: vi.fn(),
    },
  },
}));

describe('Leaderboard Engine & Privacy (Official BKN Tie-Breaker)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('pseudonymizeName (UU PDP Compliance)', () => {
    it('anonymizes names with initial format when isNamePublic is false', () => {
      expect(pseudonymizeName('Muhammad Abdul Muhshi', false)).toBe('M. A. Muhshi');
      expect(pseudonymizeName('Budi Santoso', false)).toBe('B. Santoso');
      expect(pseudonymizeName('Rian', false)).toBe('R***');
      expect(pseudonymizeName('Al', false)).toBe('Al*');
    });

    it('returns full name unchanged when isNamePublic is true', () => {
      expect(pseudonymizeName('Muhammad Abdul Muhshi', true)).toBe('Muhammad Abdul Muhshi');
      expect(pseudonymizeName('Budi Santoso', true)).toBe('Budi Santoso');
    });

    it('handles empty or missing names gracefully', () => {
      expect(pseudonymizeName(null, false)).toBe('Peserta Anonim');
      expect(pseudonymizeName('', false)).toBe('Peserta Anonim');
      expect(pseudonymizeName('   ', false)).toBe('Peserta Anonim');
    });
  });

  describe('formatDuration', () => {
    it('formats seconds into human readable minute and second string', () => {
      expect(formatDuration(3665)).toBe('61m 05s');
      expect(formatDuration(120)).toBe('2m 00s');
      expect(formatDuration(45)).toBe('0m 45s');
      expect(formatDuration(0)).toBe('0m 00s');
    });
  });

  describe('sortLeaderboardEntries (Official BKN Hierarchy)', () => {
    it('sorts strictly by Total Score DESC as primary criteria', () => {
      const entries = [
        { id: '1', totalScore: 400, subtestScores: { TKP: 180, TIU: 130, TWK: 90 }, durationSeconds: 5000 },
        { id: '2', totalScore: 450, subtestScores: { TKP: 170, TIU: 150, TWK: 130 }, durationSeconds: 5400 },
      ];
      const sorted = sortLeaderboardEntries(entries, 'SKD_CPNS');
      expect(sorted[0].id).toBe('2');
      expect(sorted[1].id).toBe('1');
    });

    it('resolves equal total scores using TKP > TIU > TWK > Duration hierarchy', () => {
      const entries = [
        { id: 'p1', totalScore: 420, subtestScores: { TKP: 170, TIU: 150, TWK: 100 }, durationSeconds: 4000 },
        { id: 'p2', totalScore: 420, subtestScores: { TKP: 180, TIU: 140, TWK: 100 }, durationSeconds: 4500 },
        { id: 'p3', totalScore: 420, subtestScores: { TKP: 170, TIU: 160, TWK: 90 }, durationSeconds: 4200 },
        { id: 'p4', totalScore: 420, subtestScores: { TKP: 170, TIU: 150, TWK: 100 }, durationSeconds: 3500 },
      ];

      const sorted = sortLeaderboardEntries(entries, 'SKD_CPNS');
      expect(sorted.map((s) => s.id)).toEqual(['p2', 'p3', 'p4', 'p1']);
    });
  });

  describe('GET /api/tryouts/[tryoutId]/leaderboard', () => {
    it('returns 404 if tryout does not exist', async () => {
      vi.mocked(db.tryout.findUnique).mockResolvedValueOnce(null);

      const req = new NextRequest('http://localhost:3000/api/tryouts/invalid-id/leaderboard');
      const res = await getLeaderboard(req, {
        params: Promise.resolve({ tryoutId: 'invalid-id' }),
      });

      expect(res.status).toBe(404);
      const data = await res.json();
      expect(data.error).toBe('Paket tryout tidak ditemukan');
    });

    it('returns ranked leaderboard with pseudonymized names and tie-breaker sorting', async () => {
      vi.mocked(auth).mockResolvedValueOnce({
        user: { id: 'u1', name: 'User Satu' },
      } as any);

      vi.mocked(db.tryout.findUnique).mockResolvedValueOnce({
        id: 't1',
        title: 'Tryout Akbar SKD CPNS 2026',
        examType: 'SKD_CPNS',
        durationMinutes: 100,
        totalQuestions: 110,
      } as any);

      const now = new Date();
      vi.mocked(db.examSession.findMany).mockResolvedValueOnce([
        {
          id: 's1',
          userId: 'u1',
          totalScore: 410,
          subtestScores: { TWK: 100, TIU: 140, TKP: 170 },
          isPassed: true,
          startedAt: new Date(now.getTime() - 4000 * 1000),
          submittedAt: now,
          user: {
            id: 'u1',
            name: 'Muhammad Abdul Muhshi',
            image: null,
            avatarUrl: null,
            isNamePublic: false,
          },
        },
        {
          id: 's2',
          userId: 'u2',
          totalScore: 450,
          subtestScores: { TWK: 110, TIU: 155, TKP: 185 },
          isPassed: true,
          startedAt: new Date(now.getTime() - 4500 * 1000),
          submittedAt: now,
          user: {
            id: 'u2',
            name: 'Budi Santoso',
            image: null,
            avatarUrl: null,
            isNamePublic: true,
          },
        },
      ] as any);

      const req = new NextRequest('http://localhost:3000/api/tryouts/t1/leaderboard');
      const res = await getLeaderboard(req, {
        params: Promise.resolve({ tryoutId: 't1' }),
      });

      expect(res.status).toBe(200);

      const findManyArgs = vi.mocked(db.examSession.findMany).mock.calls[0][0] as any;
      expect(findManyArgs.where).toMatchObject({
        tryoutId: 't1',
        mode: 'SIMULASI',
        status: 'COMPLETED',
        attemptNumber: 1,
        rankEligible: true,
      });

      const data = await res.json();
      expect(data.totalParticipants).toBe(2);
      expect(data.leaderboard[0].rank).toBe(1);
      expect(data.leaderboard[0].totalScore).toBe(450);
      expect(data.leaderboard[0].displayName).toBe('Budi Santoso'); // public
      expect(data.leaderboard[1].rank).toBe(2);
      expect(data.leaderboard[1].totalScore).toBe(410);
      expect(data.leaderboard[1].displayName).toBe('M. A. Muhshi'); // pseudonymized
      expect(data.userStanding?.rank).toBe(2);
    });
  });

  describe('PATCH /api/user/privacy', () => {
    it('returns 401 if unauthenticated', async () => {
      vi.mocked(auth).mockResolvedValueOnce(null as any);

      const req = new NextRequest('http://localhost:3000/api/user/privacy', {
        method: 'PATCH',
        body: JSON.stringify({ isNamePublic: true }),
      });
      const res = await updatePrivacy(req);
      expect(res.status).toBe(401);
    });

    it('updates isNamePublic successfully for logged in user', async () => {
      vi.mocked(auth).mockResolvedValueOnce({
        user: { id: 'u1', name: 'User Test' },
      } as any);

      vi.mocked(db.user.update).mockResolvedValueOnce({
        id: 'u1',
        name: 'User Test',
        isNamePublic: true,
      } as any);

      const req = new NextRequest('http://localhost:3000/api/user/privacy', {
        method: 'PATCH',
        body: JSON.stringify({ isNamePublic: true }),
      });
      const res = await updatePrivacy(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.user.isNamePublic).toBe(true);
    });
  });
});
