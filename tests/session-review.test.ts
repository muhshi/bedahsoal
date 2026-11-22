import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET as getReviewHandler } from '@/app/api/sessions/[sessionId]/review/route';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    examSession: {
      findUnique: vi.fn(),
    },
  },
}));

describe('Review API: GET /api/sessions/[sessionId]/review', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 404 when session not found', async () => {
    vi.mocked(db.examSession.findUnique).mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:3000/api/sessions/unknown/review');
    const res = await getReviewHandler(req, {
      params: Promise.resolve({ sessionId: 'unknown' }),
    });

    expect(res.status).toBe(404);
  });

  it('should return 403 when session is still IN_PROGRESS (Zero Leakage Guard)', async () => {
    vi.mocked(db.examSession.findUnique).mockResolvedValueOnce({
      id: 'active-session',
      status: 'IN_PROGRESS',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/sessions/active-session/review');
    const res = await getReviewHandler(req, {
      params: Promise.resolve({ sessionId: 'active-session' }),
    });

    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toContain('Pembahasan hanya dapat diakses setelah sesi ujian selesai');
  });

  it('should reject a different authenticated user', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'other-user' } } as any);
    vi.mocked(db.examSession.findUnique).mockResolvedValueOnce({
      id: 'private-session',
      userId: 'owner-user',
      status: 'COMPLETED',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/sessions/private-session/review');
    const res = await getReviewHandler(req, {
      params: Promise.resolve({ sessionId: 'private-session' }),
    });

    expect(res.status).toBe(403);
    expect((await res.json()).error).toBe('Akses ditolak');
  });

  it('should return full ExamReviewDTO with options, explanations, and scores when COMPLETED', async () => {
    vi.mocked(db.examSession.findUnique).mockResolvedValueOnce({
      id: 'done-session',
      tryoutId: 'tryout-1',
      status: 'COMPLETED',
      mode: 'SIMULASI',
      startedAt: new Date('2026-11-22T08:00:00Z'),
      submittedAt: new Date('2026-11-22T08:50:00Z'),
      totalScore: 5,
      subtestScores: { TIU: 5 },
      isPassed: true,
      tryout: {
        title: 'Tryout TIU 60',
        questions: [
          {
            id: 'q1',
            orderNumber: 1,
            category: 'TIU',
            subTopic: 'Silogisme',
            questionType: 'MULTIPLE_CHOICE',
            text: 'Semua mamalia bernapas dengan paru-paru.',
            imageUrl: null,
            explanation: 'Paus adalah mamalia laut sehingga bernapas dengan paru-paru.',
            explanationImageUrl: null,
            options: [
              { id: 'opt1', key: 'A', text: 'Paus bernapas dengan paru-paru', score: 5 },
              { id: 'opt2', key: 'B', text: 'Ikan mas adalah mamalia', score: 0 },
            ],
          },
        ],
      },
      answers: [
        {
          questionId: 'q1',
          selectedOptionId: 'opt1',
          numericAnswer: null,
          scoreAwarded: 5,
          isDoubt: false,
        },
      ],
    } as any);

    const req = new NextRequest('http://localhost:3000/api/sessions/done-session/review');
    const res = await getReviewHandler(req, {
      params: Promise.resolve({ sessionId: 'done-session' }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.sessionId).toBe('done-session');
    expect(body.totalQuestions).toBe(1);
    expect(body.totalCorrect).toBe(1);
    expect(body.questions[0].explanation).toBe(
      'Paus adalah mamalia laut sehingga bernapas dengan paru-paru.'
    );
    expect(body.questions[0].options[0].isCorrect).toBe(true);
    expect(body.questions[0].userAnswer.selectedOptionId).toBe('opt1');
  });
});
