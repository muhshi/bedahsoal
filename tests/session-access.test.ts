import { describe, expect, it } from 'vitest';
import { canAccessSession } from '../src/lib/session-access';

describe('canAccessSession', () => {
  it('allows guest access when nobody is authenticated', () => {
    expect(canAccessSession('someone-else', undefined)).toBe(true);
    expect(canAccessSession('someone-else', null)).toBe(true);
  });

  it('allows the authenticated owner', () => {
    expect(canAccessSession('user-1', 'user-1')).toBe(true);
  });

  it('rejects another authenticated user', () => {
    expect(canAccessSession('user-1', 'user-2')).toBe(false);
  });

  it('keeps shared demo and legacy sessions accessible', () => {
    expect(canAccessSession('user-demo-1', 'user-2')).toBe(true);
    expect(canAccessSession(null, 'user-2')).toBe(true);
  });
});
