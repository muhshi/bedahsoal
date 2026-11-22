import { describe, it, expect } from 'vitest';
import { PackageData } from '@/components/catalog/CategorizedCatalog';

describe('Categorized Catalog Grouping Logic', () => {
  const mockPackages: PackageData[] = [
    {
      id: 'pkg-skd-1',
      title: 'Simulasi TIU 60',
      slug: 'simulasi-tiu-60',
      description: 'Deskripsi TIU',
      examType: 'SKD_CPNS',
      price: 0,
      promoPrice: null,
      isFree: true,
      tryouts: [{ id: 't1', title: 'TIU 60', durationMinutes: 60, totalQuestions: 60 }],
    },
    {
      id: 'pkg-skd-2',
      title: 'Mastery SKD 110',
      slug: 'mastery-skd-110',
      description: 'Deskripsi SKD',
      examType: 'SKD_CPNS',
      price: 29000,
      promoPrice: null,
      isFree: false,
      tryouts: [{ id: 't2', title: 'SKD 110', durationMinutes: 100, totalQuestions: 110 }],
    },
    {
      id: 'pkg-lpdp-1',
      title: 'TBS LPDP Paket 1',
      slug: 'tbs-lpdp-p1',
      description: 'Deskripsi LPDP',
      examType: 'LPDP_TBS',
      price: 35000,
      promoPrice: null,
      isFree: false,
      tryouts: [{ id: 't3', title: 'TBS 40', durationMinutes: 60, totalQuestions: 40 }],
    },
    {
      id: 'pkg-utbk-1',
      title: 'UTBK SNBT 2026',
      slug: 'utbk-snbt-2026',
      description: 'Deskripsi UTBK',
      examType: 'UTBK_SNBT',
      price: 35000,
      promoPrice: null,
      isFree: false,
      tryouts: [{ id: 't4', title: 'UTBK 45', durationMinutes: 60, totalQuestions: 45 }],
    },
    {
      id: 'pkg-math-1',
      title: 'OSN Matematika',
      slug: 'osn-math-p1',
      description: 'Deskripsi OSN',
      examType: 'MATH_OLYMPIAD',
      price: 50000,
      promoPrice: null,
      isFree: false,
      tryouts: [{ id: 't5', title: 'OSN 20', durationMinutes: 90, totalQuestions: 20 }],
    },
  ];

  it('correctly partitions packages by examType', () => {
    const grouped = mockPackages.reduce<Record<string, PackageData[]>>((acc, pkg) => {
      if (!acc[pkg.examType]) acc[pkg.examType] = [];
      acc[pkg.examType].push(pkg);
      return acc;
    }, {});

    expect(Object.keys(grouped)).toHaveLength(4);
    expect(grouped['SKD_CPNS']).toHaveLength(2);
    expect(grouped['LPDP_TBS']).toHaveLength(1);
    expect(grouped['UTBK_SNBT']).toHaveLength(1);
    expect(grouped['MATH_OLYMPIAD']).toHaveLength(1);
  });

  it('calculates total questions per category properly', () => {
    const skdQuestions = mockPackages
      .filter((p) => p.examType === 'SKD_CPNS')
      .flatMap((p) => p.tryouts)
      .reduce((sum, t) => sum + t.totalQuestions, 0);

    expect(skdQuestions).toBe(170);
  });
});
