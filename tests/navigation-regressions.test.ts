import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveExamUrl } from '../src/lib/exam-navigation';

const readSource = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('exam navigation regressions', () => {
  it('prefers the server-provided exam URL and falls back to the session id', () => {
    expect(resolveExamUrl({ examUrl: '/exam/session-123', sessionId: 'session-123' })).toBe(
      '/exam/session-123'
    );
    expect(resolveExamUrl({ sessionId: 'session-456' })).toBe('/exam/session-456');
    expect(resolveExamUrl({})).toBe('/dashboard');
  });

  it('does not link to the non-existent /review route from the dashboard', () => {
    const source = readSource('src/components/dashboard/DashboardClient.tsx');
    expect(source).not.toContain('/review/${session.id}');
    expect(source).toContain('/exam/${session.id}');
  });

  it('does not link directly to an uncreated demo session id', () => {
    const home = readSource('src/app/page.tsx');
    const userNav = readSource('src/components/auth/UserNav.tsx');
    expect(home).not.toContain('session-demo-tiu');
    expect(userNav).not.toContain('session-demo-tiu');
    expect(home).toContain('tryout-tiu-60');
    expect(userNav).toContain('tryout-tiu-60');
  });
});
