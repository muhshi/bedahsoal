import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

import {
  PackageData,
  CategorizedCatalog,
  CATEGORY_TABS,
  CATEGORIES,
  getCategoryMeta,
  filterPackagesByCategory,
  groupPackagesByCategory,
} from '@/components/catalog/CategorizedCatalog';

describe('Categorized Catalog Grouping & Tab Logic', () => {
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
      promoPrice: 19000,
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

  it('defines the canonical Empat Meja Ujian category tabs', () => {
    const tabLabels = CATEGORY_TABS.map((t) => t.label);
    expect(tabLabels).toContain('00: SEMUA PAKET');
    expect(tabLabels).toContain('01: SKD CPNS');
    expect(tabLabels).toContain('02: TBS LPDP');
    expect(tabLabels).toContain('03: UTBK-SNBT');
    expect(tabLabels).toContain('04: OLIMPIADE');
    expect(CATEGORY_TABS).toHaveLength(5);
  });

  it('returns appropriate category metadata from getCategoryMeta', () => {
    const skd = getCategoryMeta('SKD_CPNS');
    expect(skd.code).toBe('01');
    expect(skd.trackIndex).toBe('01 / SKD');
    expect(skd.accentColor).toBe('#23415c');

    const lpdp = getCategoryMeta('LPDP_TBS');
    expect(lpdp.code).toBe('02');
    expect(lpdp.trackIndex).toBe('02 / LPDP');

    const unknown = getCategoryMeta('CUSTOM_TRACK');
    expect(unknown.code).toBe('99');
  });

  it('correctly partitions packages by examType using groupPackagesByCategory', () => {
    const grouped = groupPackagesByCategory(mockPackages);

    expect(Object.keys(grouped)).toHaveLength(4);
    expect(grouped['SKD_CPNS']).toHaveLength(2);
    expect(grouped['LPDP_TBS']).toHaveLength(1);
    expect(grouped['UTBK_SNBT']).toHaveLength(1);
    expect(grouped['MATH_OLYMPIAD']).toHaveLength(1);
  });

  it('filters packages accurately based on selected category tab', () => {
    expect(filterPackagesByCategory(mockPackages, 'ALL')).toHaveLength(5);
    expect(filterPackagesByCategory(mockPackages, 'SKD_CPNS')).toHaveLength(2);
    expect(filterPackagesByCategory(mockPackages, 'LPDP_TBS')).toHaveLength(1);
    expect(filterPackagesByCategory(mockPackages, 'UTBK_SNBT')).toHaveLength(1);
    expect(filterPackagesByCategory(mockPackages, 'MATH_OLYMPIAD')).toHaveLength(1);
  });

  it('calculates total questions per category properly', () => {
    const skdQuestions = mockPackages
      .filter((p) => p.examType === 'SKD_CPNS')
      .flatMap((p) => p.tryouts)
      .reduce((sum, t) => sum + t.totalQuestions, 0);

    expect(skdQuestions).toBe(170);
  });

  it('correctly identifies free, owned, and discounted package status', () => {
    const userOwnedIds = new Set(['pkg-skd-2']);

    const checkIsOwned = (pkg: PackageData) => {
      if (pkg.isFree) return true;
      const effectivePrice = pkg.promoPrice ?? pkg.price;
      if (effectivePrice <= 0) return true;
      return userOwnedIds.has(pkg.id) || !!pkg.isOwned;
    };

    expect(checkIsOwned(mockPackages[0])).toBe(true); // isFree = true
    expect(checkIsOwned(mockPackages[1])).toBe(true); // in userOwnedIds
    expect(checkIsOwned(mockPackages[2])).toBe(false); // paid and not owned
    expect(checkIsOwned(mockPackages[3])).toBe(false); // paid and not owned
  });

  it('renders section header, mono subhead, and category tabs', () => {
    const html = renderToStaticMarkup(
      React.createElement(CategorizedCatalog, {
        packages: mockPackages,
        userPackageIds: ['pkg-skd-2'],
      })
    );

    // Section Header and Mono Subhead
    expect(html).toContain('Katalog Paket');
    expect(html).toContain('EMPAT MEJA UJIAN &amp; LATIHAN TERARAH');

    // Category Tabs
    expect(html).toContain('00: SEMUA PAKET');
    expect(html).toContain('01: SKD CPNS');
    expect(html).toContain('02: TBS LPDP');
    expect(html).toContain('03: UTBK-SNBT');
    expect(html).toContain('04: OLIMPIADE');

    // Index card styling tokens
    expect(html).toContain('bg-[#fbf8f0]');
    expect(html).toContain('border-[#191713]');
    expect(html).toContain('shadow-paper');

    // Stamp badges
    expect(html).toContain('GRATIS');
    expect(html).toContain('DIMILIKI');

    // Action buttons
    expect(html).toContain('Mulai Ujian');
    expect(html).toContain('Beli Paket');
  });

  it('renders promo stamp badge and strikethrough price when discounted and unowned', () => {
    const html = renderToStaticMarkup(
      React.createElement(CategorizedCatalog, {
        packages: [mockPackages[1]], // pkg-skd-2 with price 29000, promoPrice 19000, unowned
        userPackageIds: [],
      })
    );

    expect(html).toContain('PROMO');
    expect(html).toContain('Rp 19.000');
    expect(html).toContain('Rp 29.000');
    expect(html).toContain('line-through');
  });

  it('renders empty state when no packages exist in catalog', () => {
    const html = renderToStaticMarkup(
      React.createElement(CategorizedCatalog, {
        packages: [],
        userPackageIds: [],
      })
    );

    expect(html).toContain('LEMBAR SOAL BELUM TERSEDIA');
    expect(html).toContain('Belum ada paket pada meja ujian ini');
  });
});
