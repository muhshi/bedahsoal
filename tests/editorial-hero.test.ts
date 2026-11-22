import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Editorial Paper Hero & UserNav', () => {
  it('implements authentic paper atelier aesthetic in UserNav.tsx', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '../src/components/auth/UserNav.tsx'), 'utf-8');

    // [B] serif brand mark
    expect(file).toContain('[B]');
    // 'Ruang Bedah Ujian' kicker
    expect(file).toContain('Ruang Bedah Ujian');
    // Paper styling
    expect(file).toMatch(/bg-\[#f3efe3\]|bg-paper/);
    expect(file).toMatch(/border-\[#d2c8b2\]|border-line/);
  });

  it('implements Fraunces headline, subtitle, teaser card, and 4 pillars in page.tsx', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '../src/app/page.tsx'), 'utf-8');

    // Fraunces headline
    expect(file).toContain('Ujian bukan soal tebak-tebakan.');
    expect(file).toContain('Bedah soalnya.');
    expect(file).toContain('font-serif');

    // Subtitle
    expect(file).toContain('Simulasi ujian dengan timer server, penilaian resmi, dan pembahasan yang menunjukkan');
    expect(file).toContain('di mana logikamu patah');

    // 4 Integrity Pillars
    expect(file).toContain('Soal yang tidak bocor');
    expect(file).toContain('Waktu yang tidak bisa ditawar');
    expect(file).toContain('Nilai yang bisa dipertanggungjawabkan');
    expect(file).toContain('Pembahasan yang membedah');

    // Live simulation teaser card elements
    expect(file).toMatch(/01:39:42|InteractiveDocketCard/);
  });
});
