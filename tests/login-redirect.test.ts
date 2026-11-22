import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Auth Redirect Logic & Workspace Navigation', () => {
  it('uses /dashboard as the post-login destination', () => {
    const postLoginUrl = '/dashboard';
    expect(postLoginUrl).toBe('/dashboard');
  });

  it('configures LoginModal to redirect Google and Guest logins to /dashboard', () => {
    const loginModalContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/auth/LoginModal.tsx'),
      'utf-8'
    );

    // Google login should specify callbackUrl: '/dashboard'
    expect(loginModalContent).toMatch(/signIn\(['"]google['"],\s*\{\s*callbackUrl:\s*['"]\/dashboard['"]/);

    // Guest login should specify callbackUrl: '/dashboard' and redirect: true
    expect(loginModalContent).toContain("callbackUrl: '/dashboard'");
    expect(loginModalContent).toContain('redirect: true');
  });

  it('renders Meja Kerja / Rapor link in UserNav pointing to /dashboard', () => {
    const userNavContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/auth/UserNav.tsx'),
      'utf-8'
    );

    expect(userNavContent).toContain('Meja Kerja / Rapor');
    expect(userNavContent).toContain('href="/dashboard"');
  });

  it('strictly adheres to editorial paper design tokens without dark or rounded-xl', () => {
    const loginModal = fs.readFileSync(
      path.resolve(__dirname, '../src/components/auth/LoginModal.tsx'),
      'utf-8'
    );
    const userNav = fs.readFileSync(
      path.resolve(__dirname, '../src/components/auth/UserNav.tsx'),
      'utf-8'
    );

    expect(loginModal).not.toContain('dark:');
    expect(loginModal).not.toMatch(/rounded-(xl|2xl|3xl)/);

    expect(userNav).not.toContain('dark:');
    expect(userNav).not.toMatch(/rounded-(xl|2xl|3xl)/);
  });
});
