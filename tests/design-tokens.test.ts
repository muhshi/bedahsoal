import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Editorial Paper Design Tokens', () => {
  it('defines required paper & ink color variables and utilities in globals.css', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../src/app/globals.css'), 'utf-8');

    // Required color variables
    expect(css).toContain('--paper:');
    expect(css).toContain('--paper-2:');
    expect(css).toContain('--paper-3:');
    expect(css).toContain('--white:');
    expect(css).toContain('--ink:');
    expect(css).toContain('--ink-2:');
    expect(css).toContain('--ink-3:');
    expect(css).toContain('--line:');
    expect(css).toContain('--line-strong:');
    expect(css).toContain('--red-stamp:');
    expect(css).toContain('--red-dark:');
    expect(css).toContain('--green-stamp:');
    expect(css).toContain('--amber-flag:');
    expect(css).toContain('--blue-ink:');

    // Required font tokens
    expect(css).toContain('--font-display:');
    expect(css).toContain('--font-mono:');

    // Shadow utilities
    expect(css).toContain('.shadow-paper');
    expect(css).toContain('.shadow-paper-lg');
    expect(css).toContain('.shadow-paper-hover');
  });

  it('configures Fraunces, Manrope, and JetBrains Mono in layout.tsx', () => {
    const layout = fs.readFileSync(path.resolve(__dirname, '../src/app/layout.tsx'), 'utf-8');
    expect(layout).toContain('Fraunces');
    expect(layout).toContain('JetBrains_Mono');
    expect(layout).toContain('Manrope');
    expect(layout).toContain('--font-display');
    expect(layout).toContain('--font-sans');
    expect(layout).toContain('--font-mono');
  });
});
