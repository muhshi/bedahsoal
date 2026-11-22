import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST as startSessionHandler } from '@/app/api/sessions/start/route';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  db: {
    tryout: {
      findUnique: vi.fn(),
    },
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    examSession: {
      create: vi.fn(),
      count: vi.fn(),
    },
  },
}));

describe('Session Lifecycle: POST /api/sessions/start', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(db.examSession.count).mockResolvedValue(0);
  });

  it('should return 400 when tryoutId is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/sessions/start', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await startSessionHandler(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain('tryoutId diperlukan');
  });

  it('should return 404 when tryout does not exist', async () => {
    vi.mocked(db.tryout.findUnique).mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:3000/api/sessions/start', {
      method: 'POST',
      body: JSON.stringify({ tryoutId: 'non-existent' }),
    });

    const res = await startSessionHandler(req);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toContain('Tryout tidak ditemukan');
  });

  it('should create a fresh exam session and return sessionId', async () => {
    vi.mocked(db.tryout.findUnique).mockResolvedValueOnce({
      id: 'tryout-tiu-60',
      title: 'Simulasi TIU',
      durationMinutes: 60,
      totalQuestions: 60,
    } as any);

    vi.mocked(db.user.upsert).mockResolvedValueOnce({
      id: 'user-demo-1',
      email: 'demo@bedahsoal.id',
    } as any);

    vi.mocked(db.examSession.create).mockResolvedValueOnce({
      id: 'session-unique-abc123xyz',
      tryoutId: 'tryout-tiu-60',
      userId: 'user-demo-1',
      status: 'IN_PROGRESS',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/sessions/start', {
      method: 'POST',
      body: JSON.stringify({ tryoutId: 'tryout-tiu-60' }),
    });

    const res = await startSessionHandler(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.sessionId).toBe('session-unique-abc123xyz');
    expect(body.examUrl).toBe('/exam/session-unique-abc123xyz');

    const createArgs = vi.mocked(db.examSession.create).mock.calls[0][0] as any;
    expect(createArgs.data).toMatchObject({
      userId: 'user-demo-1',
      tryoutId: 'tryout-tiu-60',
      mode: 'SIMULASI',
      status: 'IN_PROGRESS',
      attemptNumber: 1,
      rankEligible: true,
    });
    expect(new Date(createArgs.data.deadline).getTime()).toBeGreaterThan(
      new Date(createArgs.data.startedAt).getTime()
    );
  });

  it('marks a second simulation attempt as not rank eligible', async () => {
    vi.mocked(db.tryout.findUnique).mockResolvedValueOnce({
      id: 'tryout-tiu-60',
      title: 'Simulasi TIU',
      durationMinutes: 60,
      totalQuestions: 60,
    } as any);
    vi.mocked(db.user.upsert).mockResolvedValueOnce({ id: 'user-demo-1' } as any);
    vi.mocked(db.examSession.count).mockResolvedValueOnce(1);
    vi.mocked(db.examSession.create).mockResolvedValueOnce({
      id: 'session-second-attempt',
      tryoutId: 'tryout-tiu-60',
      userId: 'user-demo-1',
      status: 'IN_PROGRESS',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/sessions/start', {
      method: 'POST',
      body: JSON.stringify({ tryoutId: 'tryout-tiu-60' }),
    });

    const res = await startSessionHandler(req);
    expect(res.status).toBe(201);

    const createArgs = vi.mocked(db.examSession.create).mock.calls[0][0] as any;
    expect(createArgs.data.attemptNumber).toBe(2);
    expect(createArgs.data.rankEligible).toBe(false);
  });
});
