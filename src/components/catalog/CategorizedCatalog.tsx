'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Compass,
} from 'lucide-react';
import { StartExamButton } from '@/components/exam/StartExamButton';

export interface PackageData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  examType: string;
  price: number;
  promoPrice: number | null;
  isFree: boolean;
  tryouts: Array<{
    id: string;
    title: string;
    durationMinutes: number;
    totalQuestions: number;
  }>;
}

interface CategorizedCatalogProps {
  packages: PackageData[];
}

interface CategoryMeta {
  key: string;
  name: string;
  shortName: string;
  emoji: string;
  description: string;
  badgeClass: string;
  borderClass: string;
  bgGlow: string;
  iconBg: string;
}

const CATEGORIES: Record<string, CategoryMeta> = {
  SKD_CPNS: {
    key: 'SKD_CPNS',
    name: 'SKD CPNS & Kedinasan',
    shortName: 'SKD CPNS',
    emoji: '🏛️',
    description:
      'Simulasi resmi format BKN (TWK, TIU, TKP) dengan kalkulasi Passing Grade KepmenPANRB dan perankingan serentak.',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    borderClass: 'border-blue-200/80',
    bgGlow: 'from-blue-500/10 via-blue-500/5 to-transparent',
    iconBg: 'bg-blue-600 text-white',
  },
  LPDP_TBS: {
    key: 'LPDP_TBS',
    name: 'Beasiswa LPDP (Tes Bakat Skolastik)',
    shortName: 'Beasiswa LPDP',
    emoji: '🎓',
    description:
      'Standar seleksi substansi beasiswa: Penalaran Verbal Kritis, Pemecahan Masalah (Problem Solving), dan Kuantitatif Lanjutan.',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    borderClass: 'border-emerald-200/80',
    bgGlow: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    iconBg: 'bg-emerald-600 text-white',
  },
  UTBK_SNBT: {
    key: 'UTBK_SNBT',
    name: 'UTBK-SNBT 2026/2027 (TPS & Literasi)',
    shortName: 'UTBK-SNBT',
    emoji: '🏫',
    description:
      'Mastery Tes Potensi Skolastik (TPS), Literasi Bahasa Indonesia/Inggris, dan Penalaran Matematika persiapan masuk PTN.',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    borderClass: 'border-amber-200/80',
    bgGlow: 'from-amber-500/10 via-amber-500/5 to-transparent',
    iconBg: 'bg-amber-600 text-white',
  },
  MATH_OLYMPIAD: {
    key: 'MATH_OLYMPIAD',
    name: 'Olimpiade Sains & Matematika (OSN)',
    shortName: 'Olimpiade Sains',
    emoji: '📐',
    description:
      'Problem solving tingkat tinggi (Aljabar, Geometri, Teori Bilangan, Kombinatorika) dengan KaTeX Math & Negative Marking (+4/-1).',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    borderClass: 'border-purple-200/80',
    bgGlow: 'from-purple-500/10 via-purple-500/5 to-transparent',
    iconBg: 'bg-purple-600 text-white',
  },
};

export function CategorizedCatalog({ packages }: CategorizedCatalogProps) {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  // Group packages by category
  const groupedPackages = packages.reduce<Record<string, PackageData[]>>((acc, pkg) => {
    const type = pkg.examType || 'SKD_CPNS';
    if (!acc[type]) acc[type] = [];
    acc[type].push(pkg);
    return acc;
  }, {});

  const categoryKeys = Object.keys(CATEGORIES);

  // Filter groups to display
  const displayedCategories =
    activeTab === 'ALL'
      ? categoryKeys.filter((k) => groupedPackages[k]?.length > 0)
      : [activeTab];

  return (
    <div className="space-y-10">
      {/* Category Pills / Tab Navigation */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'ALL'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-100'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <span>✨ Semua Paket</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
              activeTab === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {packages.length}
          </span>
        </button>

        {categoryKeys.map((key) => {
          const meta = CATEGORIES[key];
          const count = groupedPackages[key]?.length || 0;
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-100'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <span>
                {meta.emoji} {meta.shortName}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Categorized Package Sections */}
      <div className="space-y-14">
        {displayedCategories.map((catKey) => {
          const meta = CATEGORIES[catKey];
          const catPackages = groupedPackages[catKey] || [];
          if (catPackages.length === 0) return null;

          return (
            <div key={catKey} className="space-y-6">
              {/* Category Header Banner */}
              <div
                className={`relative overflow-hidden p-6 rounded-3xl border ${meta.borderClass} bg-gradient-to-r ${meta.bgGlow} bg-white shadow-xs`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${meta.iconBg} flex items-center justify-center font-extrabold text-2xl shadow-sm shrink-0`}
                    >
                      {meta.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                          {meta.name}
                        </h3>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${meta.badgeClass}`}
                        >
                          {catPackages.length} Paket
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid of Packages for this Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ${meta.badgeClass}`}
                        >
                          {meta.emoji} {meta.shortName}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            pkg.isFree
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {pkg.isFree ? 'Gratis / Trial' : 'Paket Penuh'}
                        </span>
                      </div>

                      {/* Package Title */}
                      <h4 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {pkg.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {pkg.description ||
                          'Paket simulasi komprehensif lengkap dengan pembahasan mendalam dan ranking.'}
                      </p>

                      {/* Tryouts List */}
                      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                        {pkg.tryouts.map((t) => (
                          <div key={t.id} className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium text-slate-700">
                              <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="truncate max-w-[170px]">{t.title}</span>
                            </span>
                            <span className="font-bold text-slate-800 shrink-0">
                              {t.totalQuestions} Soal ({t.durationMinutes} m)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA & Price */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-500 block font-medium">Biaya Akses</span>
                        <span
                          className={`text-lg font-extrabold ${
                            pkg.isFree ? 'text-emerald-600' : 'text-slate-900'
                          }`}
                        >
                          {pkg.isFree ? 'Gratis' : `Rp ${pkg.price.toLocaleString('id-ID')}`}
                        </span>
                      </div>

                      <StartExamButton
                        tryoutId={pkg.tryouts[0]?.id || 'tryout-tiu-60'}
                        label="Mulai Ujian"
                        className="px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm transition cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
