import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../src/app/api/health/route';

vi.mock('../src/lib/db', () => ({
  db: {
    $queryRaw: vi.fn(),
  },
}));

import { db } from '../src/lib/db';

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns status ok with database connected when DB query succeeds', async () => {
    vi.mocked(db.$queryRaw).mockResolvedValueOnce([{ '?column?': 1 }]);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.status).toBe('ok');
    expect(json.database).toBe('connected');
    expect(json.timestamp).toBeDefined();
  });

  it('returns status degraded with 503 when DB query fails', async () => {
    vi.mocked(db.$queryRaw).mockRejectedValueOnce(new Error('DB Connection Lost'));

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(503);
    expect(json.status).toBe('degraded');
    expect(json.database).toBe('disconnected');
    expect(json.error).toBe('DB Connection Lost');
  });
});
