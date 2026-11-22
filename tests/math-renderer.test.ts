import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { renderMathInText } from '../src/components/exam/MathRenderer';

describe('KaTeX Math Rendering', () => {
  it('renders inline latex math to valid HTML string', () => {
    const rawLatex = '\\frac{a}{b}';
    const html = katex.renderToString(rawLatex, { throwOnError: false });
    expect(html).toContain('katex');
    expect(html).toContain('mfrac');
  });

  it('renders complex olympiad formulas without throwing', () => {
    const formula = '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}';
    const html = katex.renderToString(formula, { throwOnError: false });
    expect(html).toContain('katex');
  });

  it('renders mixed text with inline $...$ and display $$...$$ math', () => {
    const mixed = 'Berapakah nilai dari $\\frac{1}{2}$ jika $x = 4$ dan $$\\int_0^1 x dx$$?';
    const result = renderMathInText(mixed);

    expect(result).toContain('katex');
    expect(result).toContain('katex-display');
    expect(result).toContain('Berapakah nilai dari');
  });

  it('returns empty string when content is empty', () => {
    expect(renderMathInText('')).toBe('');
  });

  it('handles invalid math syntax gracefully without throwing', () => {
    const invalidMath = 'Rumus salah: $\\invalidcommand{123}$';
    expect(() => renderMathInText(invalidMath)).not.toThrow();
    const result = renderMathInText(invalidMath);
    expect(result).toBeDefined();
  });
});
