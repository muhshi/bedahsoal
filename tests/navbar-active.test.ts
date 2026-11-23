import { describe, it, expect } from 'vitest';
import { resolveActiveNav } from '../src/components/auth/UserNav';

describe('resolveActiveNav', () => {
  it('identifies dashboard when on /dashboard', () => {
    expect(resolveActiveNav('/dashboard', '')).toBe('dashboard');
  });

  it('identifies catalog when on /#katalog', () => {
    expect(resolveActiveNav('/', '#katalog')).toBe('catalog');
  });

  it('identifies principles when on /#keunggulan', () => {
    expect(resolveActiveNav('/', '#keunggulan')).toBe('principles');
  });

  it('defaults to home when on / with no hash', () => {
    expect(resolveActiveNav('/', '')).toBe('home');
  });
});
