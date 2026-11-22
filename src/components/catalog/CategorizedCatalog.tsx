'use client';

import React, { useState } from 'react';
import { Clock, FileText, Lock, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { StartExamButton } from '@/components/exam/StartExamButton';
import { CheckoutModal } from '@/components/payment/CheckoutModal';
import { StampBadge } from '@/components/ui/StampBadge';

export interface PackageData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  examType: string;
  price: number;
  promoPrice: number | null;
  isFree: boolean;
  isOwned?: boolean;
  tryouts: Array<{
    id: string;
    title: string;
    durationMinutes: number;
    totalQuestions: number;
  }>;
}

export interface CategorizedCatalogProps {
  packages: PackageData[];
  userPackageIds?: string[];
}

export interface CategoryTabMeta {
  key: string;
  code: string;
  label: string;
  name: string;
  shortName: string;
  trackIndex: string;
  description: string;
  accentColor: string;
}

export const CATEGORY_TABS: CategoryTabMeta[] = [
  {
    key: 'ALL',
    code: '00',
    label: '00: SEMUA PAKET',
    name: 'Semua Paket Ujian',
    shortName: 'Semua',
    trackIndex: '00 / ALL',
    description: 'Seluruh paket simulasi CBT dengan timer server dan penilaian resmi.',
    accentColor: '#191713',
  },
  {
    key: 'SKD_CPNS',
    code: '01',
    label: '01: SKD CPNS',
    name: 'SKD CPNS & Kedinasan',
    shortName: 'SKD CPNS',
    trackIndex: '01 / SKD',
    description:
      'Simulasi resmi format BKN (TWK, TIU, TKP) dengan kalkulasi Passing Grade KepmenPANRB dan perankingan serentak.',
    accentColor: '#23415c',
  },
  {
    key: 'LPDP_TBS',
    code: '02',
    label: '02: TBS LPDP',
    name: 'Beasiswa LPDP (Tes Bakat Skolastik)',
    shortName: 'TBS LPDP',
    trackIndex: '02 / LPDP',
    description:
      'Standar seleksi substansi beasiswa: Penalaran Verbal Kritis, Pemecahan Masalah (Problem Solving), dan Kuantitatif Lanjutan.',
    accentColor: '#2f5a44',
  },
  {
    key: 'UTBK_SNBT',
    code: '03',
    label: '03: UTBK-SNBT',
    name: 'UTBK-SNBT 2026/2027 (TPS & Literasi)',
    shortName: 'UTBK-SNBT',
    trackIndex: '03 / UTBK',
    description:
      'Mastery Tes Potensi Skolastik (TPS), Literasi Bahasa Indonesia/Inggris, dan Penalaran Matematika persiapan masuk PTN.',
    accentColor: '#b67a18',
  },
  {
    key: 'MATH_OLYMPIAD',
    code: '04',
    label: '04: OLIMPIADE',
    name: 'Olimpiade Sains & Matematika (OSN)',
    shortName: 'OLIMPIADE',
    trackIndex: '04 / OSN',
    description:
      'Problem solving tingkat tinggi (Aljabar, Geometri, Teori Bilangan, Kombinatorika) dengan KaTeX Math & Negative Marking (+4/-1).',
    accentColor: '#c4402a',
  },
];

export const CATEGORIES: Record<string, CategoryTabMeta> = CATEGORY_TABS.reduce(
  (acc, tab) => {
    if (tab.key !== 'ALL') {
      acc[tab.key] = tab;
    }
    return acc;
  },
  {} as Record<string, CategoryTabMeta>
);

export function getCategoryMeta(key: string): CategoryTabMeta {
  return (
    CATEGORIES[key] || {
      key,
      code: '99',
      label: `99: ${key}`,
      name: key.replace(/_/g, ' '),
      shortName: key.replace(/_/g, ' '),
      trackIndex: `99 / ${key.slice(0, 4)}`,
      description: 'Paket latihan dan simulasi ujian.',
      accentColor: '#191713',
    }
  );
}

export function filterPackagesByCategory(packages: PackageData[], activeTab: string): PackageData[] {
  if (activeTab === 'ALL') {
    return packages;
  }
  return packages.filter((pkg) => (pkg.examType || 'SKD_CPNS') === activeTab);
}

export function groupPackagesByCategory(packages: PackageData[]): Record<string, PackageData[]> {
  return packages.reduce<Record<string, PackageData[]>>((acc, pkg) => {
    const type = pkg.examType || 'SKD_CPNS';
    if (!acc[type]) acc[type] = [];
    acc[type].push(pkg);
    return acc;
  }, {});
}

export function CategorizedCatalog({ packages, userPackageIds = [] }: CategorizedCatalogProps) {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [ownedPackageIds, setOwnedPackageIds] = useState<Set<string>>(() => {
    const initial = new Set<string>(userPackageIds);
    packages.forEach((pkg) => {
      if (pkg.isOwned) initial.add(pkg.id);
    });
    return initial;
  });

  const checkIsOwned = (pkg: PackageData) => {
    if (pkg.isFree) return true;
    const effectivePrice = pkg.promoPrice ?? pkg.price;
    if (effectivePrice <= 0) return true;
    return ownedPackageIds.has(pkg.id) || !!pkg.isOwned;
  };

  // Group packages by category
  const groupedPackages = groupPackagesByCategory(packages);

  // Determine category sections to render
  const categoryKeys = Object.keys(CATEGORIES);
  const displayedCategoryKeys =
    activeTab === 'ALL'
      ? categoryKeys.filter((k) => (groupedPackages[k]?.length || 0) > 0)
      : [activeTab];

  const totalDisplayed =
    activeTab === 'ALL'
      ? packages.length
      : (groupedPackages[activeTab] || []).length;

  return (
    <div className="space-y-8" id="katalog">
      {/* Section Header: Empat Meja Ujian */}
      <div className="space-y-3 pb-6 border-b border-[#191713]">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7a7365]">
          <span className="inline-block w-2.5 h-2.5 bg-[#c4402a]" />
          <span>EMPAT MEJA UJIAN &amp; LATIHAN TERARAH</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#191713]">
              Katalog Paket <span className="italic font-normal text-[#c4402a]">Ujian</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4b463d] max-w-xl mt-1.5 leading-relaxed">
              Pilih meja ujian target Anda: SKD CPNS, Beasiswa LPDP, UTBK-SNBT, atau Olimpiade Sains dengan timer server, passing grade resmi, dan pembahasan analitis.
            </p>
          </div>
          <div className="font-mono text-xs text-[#7a7365] uppercase tracking-wider shrink-0">
            Menampilkan <span className="font-bold text-[#191713]">{totalDisplayed}</span> paket
          </div>
        </div>
      </div>

      {/* Category Index Tabs */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        role="tablist"
        aria-label="Filter Meja Ujian"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count =
            tab.key === 'ALL'
              ? packages.length
              : (groupedPackages[tab.key] || []).length;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`group flex items-center gap-2 px-3.5 py-2.5 border font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#191713] text-[#fbf8f0] border-[#191713] shadow-paper'
                  : 'bg-[#fbf8f0] text-[#4b463d] border-[#b9ac91] hover:border-[#191713] hover:text-[#191713] hover:bg-[#eae3d2]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 text-[10px] font-mono border ${
                  isActive
                    ? 'border-[#fbf8f0]/30 text-[#fbf8f0] bg-white/10'
                    : 'border-[#b9ac91] text-[#7a7365] bg-[#eae3d2]/60'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {totalDisplayed === 0 && (
        <div className="p-12 text-center border-2 border-dashed border-[#b9ac91] bg-[#fbf8f0] space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7365]">
            LEMBAR SOAL BELUM TERSEDIA
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#191713]">
            Belum ada paket pada meja ujian ini
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#4b463d] max-w-md mx-auto">
            Paket untuk kategori ini sedang disiapkan oleh tim kurasi. Silakan periksa meja ujian lainnya.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('ALL')}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider bg-[#191713] text-[#fbf8f0] hover:bg-[#23415c] border border-[#191713] shadow-paper cursor-pointer transition"
          >
            Kembali ke Semua Paket
          </button>
        </div>
      )}

      {/* Categorized Package Sections */}
      <div className="space-y-12">
        {displayedCategoryKeys.map((catKey) => {
          const meta = getCategoryMeta(catKey);
          const catPackages = groupedPackages[catKey] || [];
          if (catPackages.length === 0) return null;

          return (
            <div key={catKey} className="space-y-5">
              {/* Category Strip Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#d2c8b2] pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 text-white"
                    style={{ backgroundColor: meta.accentColor }}
                  >
                    {meta.trackIndex}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191713]">
                    {meta.name}
                  </h3>
                </div>
                <p className="font-mono text-[11px] text-[#7a7365] uppercase tracking-wider">
                  {catPackages.length} Paket Ujian Tersedia
                </p>
              </div>

              {/* Grid of 'Lembar Soal' Index Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catPackages.map((pkg, idx) => {
                  const isOwned = checkIsOwned(pkg);
                  const effectivePrice = pkg.promoPrice ?? pkg.price;
                  const hasDiscount = pkg.promoPrice !== null && pkg.promoPrice < pkg.price;

                  const totalQuestions = pkg.tryouts.reduce((sum, t) => sum + t.totalQuestions, 0);
                  const totalDuration = pkg.tryouts.reduce((sum, t) => sum + t.durationMinutes, 0);
                  const cardIndexNumber = String(idx + 1).padStart(2, '0');

                  return (
                    <article
                      key={pkg.id}
                      className="relative flex flex-col justify-between bg-[#fbf8f0] border border-[#191713] p-5 sm:p-6 shadow-paper hover:shadow-paper-hover transition-all duration-150 group"
                    >
                      {/* Left accent line for track color */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: meta.accentColor }}
                      />

                      <div className="space-y-4 pl-1">
                        {/* Top Metadata Row: Index, Category Tag & Stamp Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold tracking-wider text-[#7a7365]">
                              {cardIndexNumber} / {meta.shortName}
                            </span>
                            <span className="font-mono text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 border border-[#191713]/30 text-[#191713] bg-[#eae3d2]/40">
                              {meta.shortName}
                            </span>
                          </div>

                          {/* Stamp Badge */}
                          <div className="shrink-0">
                            {pkg.isFree ? (
                              <StampBadge label="GRATIS" variant="green" rotate={-2} />
                            ) : isOwned ? (
                              <StampBadge label="DIMILIKI" variant="green" rotate={-2} />
                            ) : hasDiscount ? (
                              <StampBadge label="PROMO" variant="red" rotate={-2} />
                            ) : (
                              <StampBadge label="RESMI" variant="neutral" rotate={-2} />
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="font-serif text-xl font-bold text-[#191713] leading-snug group-hover:text-[#c4402a] transition-colors">
                          {pkg.title}
                        </h4>

                        {/* Description */}
                        <p className="font-sans text-xs text-[#4b463d] line-clamp-3 leading-relaxed">
                          {pkg.description ||
                            'Paket simulasi komprehensif lengkap dengan timer server, passing grade resmi, dan pembahasan mendalam.'}
                        </p>

                        {/* Question Count & Duration Pill */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eae3d2] border border-[#d2c8b2] text-[#191713] font-bold tracking-wide">
                            <Clock className="w-3.5 h-3.5 text-[#7a7365]" />
                            <span>{totalDuration} MENIT</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eae3d2] border border-[#d2c8b2] text-[#191713] font-bold tracking-wide">
                            <FileText className="w-3.5 h-3.5 text-[#7a7365]" />
                            <span>{totalQuestions} SOAL</span>
                          </span>
                        </div>

                        {/* Tryout Composition Breakdown */}
                        {pkg.tryouts.length > 0 && (
                          <div className="pt-3 border-t border-dashed border-[#d2c8b2] space-y-1.5">
                            <div className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365]">
                              Lembar Tryout ({pkg.tryouts.length} Sesi):
                            </div>
                            {pkg.tryouts.map((t) => (
                              <div
                                key={t.id}
                                className="flex items-center justify-between font-mono text-[10px] text-[#4b463d] bg-[#eae3d2]/30 px-2 py-1 border border-[#d2c8b2]"
                              >
                                <span className="flex items-center gap-1.5 font-sans font-medium text-[#191713] truncate max-w-[170px]">
                                  <BookOpen className="w-3 h-3 text-[#7a7365] shrink-0" />
                                  <span className="truncate">{t.title}</span>
                                </span>
                                <span className="font-mono font-bold text-[#191713] shrink-0">
                                  {t.totalQuestions} Butir · {t.durationMinutes}m
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Price & CTA Action Button */}
                      <div className="pt-4 mt-6 border-t border-[#191713] flex items-end justify-between gap-3 pl-1">
                        <div>
                          <span className="block font-mono text-[9px] font-semibold tracking-widest text-[#7a7365] uppercase">
                            Biaya Akses
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            {pkg.isFree ? (
                              <span className="font-serif text-2xl font-bold text-[#2f5a44]">
                                Gratis
                              </span>
                            ) : (
                              <>
                                <span className="font-serif text-2xl font-bold text-[#191713]">
                                  Rp {effectivePrice.toLocaleString('id-ID')}
                                </span>
                                {hasDiscount && (
                                  <span className="font-mono text-xs text-[#7a7365] line-through">
                                    Rp {pkg.price.toLocaleString('id-ID')}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <div>
                          {isOwned ? (
                            <StartExamButton
                              tryoutId={pkg.tryouts[0]?.id || 'tryout-tiu-60'}
                              label="Mulai Ujian"
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider bg-[#191713] text-[#fbf8f0] hover:bg-[#23415c] active:translate-y-0.5 border border-[#191713] shadow-paper transition cursor-pointer"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setIsCheckoutOpen(true);
                              }}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider bg-[#c4402a] text-white hover:bg-[#9c2f1e] active:translate-y-0.5 border border-[#191713] shadow-paper transition cursor-pointer"
                            >
                              <Lock className="w-3.5 h-3.5 text-white/80" />
                              <span>Beli Paket</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal Integration */}
      <CheckoutModal
        key={selectedPackage?.id || 'checkout-modal'}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        packageData={selectedPackage}
        onPaymentSuccess={(packageId) => {
          setOwnedPackageIds((prev) => new Set([...prev, packageId]));
        }}
      />
    </div>
  );
}
