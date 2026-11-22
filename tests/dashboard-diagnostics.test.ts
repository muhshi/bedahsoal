import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/db', () => ({
  db: {
    examAnswer: {
      findMany: vi.fn().mockResolvedValue([
        {
          scoreAwarded: 5,
          question: {
            category: 'TIU',
            subTopic: 'Deret Angka',
            options: [{ score: 5 }, { score: 0 }],
          },
        },
      ]),
    },
  },
}));

vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({
    user: { id: 'test-user-1' },
  }),
}));

import { GET } from '../src/app/api/user/diagnostics/route';

describe('GET /api/user/diagnostics', () => {
  it('returns 200 with diagnostics array', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toHaveProperty('success', true);
    expect(json).toHaveProperty('diagnostics');
    expect(Array.isArray(json.diagnostics)).toBe(true);
    expect(json.diagnostics).toHaveLength(1);
    expect(json.diagnostics[0].category).toBe('TIU');
  });
});
