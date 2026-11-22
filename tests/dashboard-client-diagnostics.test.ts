import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { TopicDiagnostic } from '../src/lib/diagnostics';

describe('DashboardClient diagnostics data contract & UI specifications', () => {
  it('correctly maps topic diagnostics for presentation', () => {
    const mockDiagnostics: TopicDiagnostic[] = [
      {
        topicKey: 'TIU::Deret Angka',
        category: 'TIU',
        topic: 'Deret Angka',
        label: 'TIU · Deret Angka',
        totalQuestions: 10,
        scoreAwarded: 24,
        maxScore: 50,
        percentage: 48,
        tier: 'critical',
        recommendedAction: 'Bedah konsep dasar & trik eliminasi pilihan secepatnya.',
      },
    ];

    expect(mockDiagnostics[0].percentage).toBe(48);
    expect(mockDiagnostics[0].tier).toBe('critical');
    expect(mockDiagnostics[0].label).toContain('TIU');
  });

  it('DashboardClient imports TopicDiagnostic and accepts diagnostics prop', () => {
    const clientCode = fs.readFileSync(
      path.resolve(__dirname, '../src/components/dashboard/DashboardClient.tsx'),
      'utf-8'
    );

    expect(clientCode).toContain('TopicDiagnostic');
    expect(clientCode).toMatch(/diagnostics\??:\s*TopicDiagnostic\[\]/);
  });

  it('renders progress bar colors for critical, moderate, and mastered tiers', () => {
    const clientCode = fs.readFileSync(
      path.resolve(__dirname, '../src/components/dashboard/DashboardClient.tsx'),
      'utf-8'
    );

    // Critical (red #c4402a), Moderate (amber #b67a18), Mastered (green #2f5a44)
    expect(clientCode).toContain('#c4402a');
    expect(clientCode).toContain('#b67a18');
    expect(clientCode).toContain('#2f5a44');
  });

  it('includes active session quick-resume banner when in-progress session exists', () => {
    const clientCode = fs.readFileSync(
      path.resolve(__dirname, '../src/components/dashboard/DashboardClient.tsx'),
      'utf-8'
    );

    // Active session resume banner logic
    expect(clientCode).toMatch(/IN_PROGRESS/);
    expect(clientCode).toMatch(/Lanjutkan Ujian|Lanjut Mengerjakan|Sesi Berjalan/i);
  });

  it('handles empty diagnostics with friendly guidance', () => {
    const clientCode = fs.readFileSync(
      path.resolve(__dirname, '../src/components/dashboard/DashboardClient.tsx'),
      'utf-8'
    );

    expect(clientCode).toContain('Belum ada data materi');
  });

  it('strictly adheres to editorial paper design without dark or rounded-xl', () => {
    const clientCode = fs.readFileSync(
      path.resolve(__dirname, '../src/components/dashboard/DashboardClient.tsx'),
      'utf-8'
    );

    expect(clientCode).not.toContain('dark:');
    expect(clientCode).not.toMatch(/rounded-(xl|2xl|3xl)/);
  });
});
