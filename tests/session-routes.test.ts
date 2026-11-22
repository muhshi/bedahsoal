import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../src/app/api/sessions/[sessionId]/route';
import { POST } from '../src/app/api/sessions/[sessionId]/submit/route';
import { db } from '../src/lib/db';

const { mockTx } = vi.hoisted(() => ({
  mockTx: {
    examAnswer: { upsert: vi.fn() },
    examSession: { update: vi.fn() },
  },
}));

vi.mock('../src/lib/db', () => ({
  db: {
    examSession: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    examAnswer: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn(async (cb: (tx: any) => Promise<any>) => cb(mockTx)),
  },
}));

describe('Sessions API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/sessions/[sessionId] (Zero Answer Leakage)', () => {
    it('returns 404 if exam session does not exist', async () => {
      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce(null);

      const req = new NextRequest('http://localhost:3000/api/sessions/invalid-id');
      const response = await GET(req, {
        params: Promise.resolve({ sessionId: 'invalid-id' }),
      });

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toBe('Sesi ujian tidak ditemukan');
    });

    it('returns 403 if session is already COMPLETED', async () => {
      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce({
        id: 's1',
        status: 'COMPLETED',
      } as any);

      const req = new NextRequest('http://localhost:3000/api/sessions/s1');
      const response = await GET(req, {
        params: Promise.resolve({ sessionId: 's1' }),
      });

      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data.isCompleted).toBe(true);
    });

    it('returns ExamSessionInitDTO with Zero Answer Leakage (no scores, no explanations)', async () => {
      const mockSession = {
        id: 'session-123',
        tryoutId: 'tryout-456',
        mode: 'SIMULASI',
        status: 'IN_PROGRESS',
        startedAt: new Date('2026-11-22T08:00:00Z'),
        deadline: new Date(Date.now() + 60 * 60 * 1000),
        tryout: {
          title: 'Simulasi Akbar CPNS 2026',
          questions: [
            {
              id: 'q1',
              orderNumber: 1,
              category: 'TIU',
              subTopic: 'Silogisme',
              questionType: 'MULTIPLE_CHOICE',
              text: 'Semua A adalah B.',
              imageUrl: null,
              options: [
                { id: 'opt1', key: 'A', text: 'Sebagian C adalah A', imageUrl: null },
                { id: 'opt2', key: 'B', text: 'Tidak ada', imageUrl: null },
              ],
            },
            {
              id: 'q2',
              orderNumber: 2,
              category: 'Aljabar',
              subTopic: null,
              questionType: 'NUMERIC_INPUT',
              text: 'Berapa nilai 5 + 5?',
              imageUrl: null,
              options: [],
            },
          ],
        },
        answers: [
          {
            questionId: 'q1',
            selectedOptionId: 'opt1',
            numericAnswer: null,
            isDoubt: false,
            answeredAt: new Date('2026-11-22T08:05:00Z'),
          },
        ],
      };

      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce(mockSession as any);

      const req = new NextRequest('http://localhost:3000/api/sessions/session-123');
      const response = await GET(req, {
        params: Promise.resolve({ sessionId: 'session-123' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.sessionId).toBe('session-123');
      expect(data.tryoutId).toBe('tryout-456');
      expect(data.title).toBe('Simulasi Akbar CPNS 2026');
      expect(data.questions).toHaveLength(2);

      // Verify ZERO LEAKAGE
      const q1 = data.questions[0];
      expect(q1).not.toHaveProperty('explanation');
      expect(q1).not.toHaveProperty('explanationImageUrl');
      expect(q1.options[0]).not.toHaveProperty('score');
      expect(q1.options[0]).not.toHaveProperty('isCorrect');

      // Verify initial answers
      expect(data.initialAnswers).toEqual({
        q1: {
          selectedOptionId: 'opt1',
          numericAnswer: null,
          isDoubt: false,
          answeredAt: '2026-11-22T08:05:00.000Z',
        },
      });
    });
  });

  describe('POST /api/sessions/[sessionId]/submit', () => {
    it('returns 404 if session not found', async () => {
      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce(null);

      const req = new NextRequest('http://localhost:3000/api/sessions/invalid/submit', {
        method: 'POST',
        body: JSON.stringify({ answers: {} }),
      });
      const response = await POST(req, {
        params: Promise.resolve({ sessionId: 'invalid' }),
      });

      expect(response.status).toBe(404);
    });

    it('submits exam session and calculates BKN SKD score', async () => {
      const mockSession = {
        id: 'sess-skd-1',
        tryoutId: 'tryout-skd',
        status: 'IN_PROGRESS',
        startedAt: new Date('2026-11-22T08:00:00Z'),
        deadline: new Date(Date.now() + 60 * 60 * 1000),
        tryout: {
          examType: 'SKD_CPNS',
          passingGradeProfile: {
            minTWK: 65,
            minTIU: 80,
            minTKP: 166,
          },
          questions: [
            {
              id: 'q1',
              category: 'TWK',
              options: [
                { id: 'opt1', key: 'A', score: 5 },
                { id: 'opt2', key: 'B', score: 0 },
              ],
            },
            {
              id: 'q2',
              category: 'TIU',
              options: [
                { id: 'opt3', key: 'C', score: 5 },
                { id: 'opt4', key: 'D', score: 0 },
              ],
            },
            {
              id: 'q3',
              category: 'TKP',
              options: [
                { id: 'opt5', key: 'A', score: 5 },
                { id: 'opt6', key: 'B', score: 4 },
              ],
            },
          ],
        },
        answers: [],
      };

      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce(mockSession as any);

      const req = new NextRequest('http://localhost:3000/api/sessions/sess-skd-1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            q1: { selectedOptionId: 'opt1', isDoubt: false }, // TWK: 5
            q2: { selectedOptionId: 'opt3', isDoubt: false }, // TIU: 5
            q3: { selectedOptionId: 'opt5', isDoubt: false }, // TKP: 5
          },
        }),
      });

      const response = await POST(req, {
        params: Promise.resolve({ sessionId: 'sess-skd-1' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.totalScore).toBe(15);
      expect(data.subtestScores).toEqual({ TWK: 5, TIU: 5, TKP: 5 });
      expect(data.isPassed).toBe(false); // 5 < 65 minTWK
      expect(db.$transaction).toHaveBeenCalled();
    });

    it('submits Math Olympiad with negative marking and numeric input', async () => {
      const mockOlympiadSession = {
        id: 'sess-olympiad-1',
        tryoutId: 'tryout-olympiad',
        status: 'IN_PROGRESS',
        startedAt: new Date('2026-11-22T08:00:00Z'),
        deadline: new Date(Date.now() + 60 * 60 * 1000),
        tryout: {
          examType: 'MATH_OLYMPIAD',
          scoringScheme: {
            correctScore: 4,
            wrongScore: -1,
            emptyScore: 0,
          },
          passingGradeProfile: null,
          questions: [
            {
              id: 'm1',
              category: 'Aljabar',
              options: [
                { id: 'opt1', key: 'A', score: 4 },
                { id: 'opt2', key: 'B', score: 0 },
              ],
            },
            {
              id: 'm2',
              category: 'Geometri',
              options: [
                { id: 'opt3', key: 'B', score: 4 },
                { id: 'opt4', key: 'A', score: 0 },
              ],
            },
          ],
        },
        answers: [],
      };

      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce(mockOlympiadSession as any);

      const req = new NextRequest('http://localhost:3000/api/sessions/sess-olympiad-1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            m1: { selectedOptionId: 'opt1', isDoubt: false }, // Benar: +4
            m2: { selectedOptionId: 'opt4', isDoubt: false }, // Salah: -1
          },
        }),
      });

      const response = await POST(req, {
        params: Promise.resolve({ sessionId: 'sess-olympiad-1' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.totalScore).toBe(3); // 4 - 1 = 3
      expect(data.subtestScores).toEqual({ Aljabar: 4, Geometri: -1 });
    });

    it('rejects a submission well after the deadline', async () => {
      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce({
        id: 'sess-expired',
        status: 'IN_PROGRESS',
        deadline: new Date(Date.now() - 60 * 60 * 1000),
        answers: [],
        tryout: { examType: 'SKD_CPNS', questions: [], passingGradeProfile: null },
      } as any);

      const req = new NextRequest('http://localhost:3000/api/sessions/sess-expired/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: {} }),
      });

      const response = await POST(req, {
        params: Promise.resolve({ sessionId: 'sess-expired' }),
      });

      expect(response.status).toBe(403);
      expect((await response.json()).error).toBe('Waktu ujian telah habis');
      expect(db.$transaction).not.toHaveBeenCalled();
    });

    it('keeps the newer timestamped answer when merging cached and server answers', async () => {
      const serverAnsweredAt = new Date(Date.now() + 60_000).toISOString();
      const clientAnsweredAt = new Date(Date.now() - 60_000).toISOString();

      vi.mocked(db.examSession.findUnique).mockResolvedValueOnce({
        id: 'sess-merge',
        status: 'IN_PROGRESS',
        deadline: new Date(Date.now() + 60 * 60 * 1000),
        answers: [
          {
            questionId: 'q1',
            selectedOptionId: 'opt-newer',
            numericAnswer: null,
            isDoubt: false,
            answeredAt: new Date(serverAnsweredAt),
          },
        ],
        tryout: {
          examType: 'SKD_CPNS',
          passingGradeProfile: null,
          questions: [
            {
              id: 'q1',
              category: 'TWK',
              options: [
                { id: 'opt-newer', key: 'A', score: 5 },
                { id: 'opt-stale', key: 'B', score: 0 },
              ],
            },
          ],
        },
      } as any);

      const req = new NextRequest('http://localhost:3000/api/sessions/sess-merge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            q1: {
              selectedOptionId: 'opt-stale',
              numericAnswer: null,
              isDoubt: false,
              answeredAt: clientAnsweredAt,
            },
          },
        }),
      });

      const response = await POST(req, {
        params: Promise.resolve({ sessionId: 'sess-merge' }),
      });

      expect(response.status).toBe(200);
      const upsertArgs = mockTx.examAnswer.upsert.mock.calls[0][0] as any;
      expect(upsertArgs.update.selectedOptionId).toBe('opt-newer');
      expect(upsertArgs.update.answeredAt).toBe(serverAnsweredAt);
    });
  });
});
