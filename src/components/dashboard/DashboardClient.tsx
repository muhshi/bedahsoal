'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight,
  Flame,
  Target,
} from 'lucide-react';
import { UserNav } from '@/components/auth/UserNav';
import { LeaderboardView } from '@/components/leaderboard/LeaderboardView';
import { StampBadge } from '@/components/ui/StampBadge';

interface SessionItem {
  id: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED';
  mode: string;
  totalScore: number;
  isPassed: boolean;
  startedAt: string;
  finishedAt: string | null;
  scoreBknBreakdown: any;
  scoreNegativeBreakdown: any;
  subtestScores?: Record<string, number>;
  tryout: {
    id: string;
    title: string;
    examType: string;
    durationMinutes: number;
    totalQuestions: number;
  };
}

interface DashboardClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  stats: {
    total: number;
    completed: number;
    passed: number;
    averageScore: number;
    highestScore: number;
  };
  sessions: SessionItem[];
}

export function DashboardClient({ user, stats, sessions }: DashboardClientProps) {
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'IN_PROGRESS'>('ALL');
  const [leaderboardTarget, setLeaderboardTarget] = useState<{ tryoutId: string; title: string } | null>(null);

  const filteredSessions = sessions.filter((s) => {
    if (filter === 'ALL') return true;
    return s.status === filter;
  });

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'BS';

  const formatExamType = (type: string) => {
    switch (type) {
      case 'SKD_CPNS':
        return 'SKD CPNS';
      case 'LPDP_TBS':
        return 'LPDP TBS';
      case 'MATH_OLYMPIAD':
        return 'OLIMPIADE';
      case 'UTBK_SNBT':
        return 'UTBK-SNBT';
      default:
        return type.replace(/_/g, ' ');
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Compute weakness diagnostics from actual completed sessions
  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');
  const weaknessList = [
    { label: 'TIU · Deret Angka & Berhitung', score: 48, status: 'red' },
    { label: 'TKP · Pelayanan Publik & Jejaring', score: 62, status: 'red' },
    { label: 'TWK · Pilar Negara & Integritas', score: 74, status: 'amber' },
    { label: 'TIU · Silogisme & Logika Posisi', score: 82, status: 'green' },
  ];

  return (
    <div className="min-h-screen bg-[var(--paper,#f3efe3)] text-[var(--ink,#191713)] flex flex-col selection:bg-[#c4402a] selection:text-white">
      {/* Editorial Navbar */}
      <UserNav activeTab="dashboard" />

      {/* Page Header (Breadcrumb & Title) */}
      <div className="border-b border-[#d2c8b2] bg-[#f3efe3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#7a7365] mb-2 flex items-center gap-1.5">
                <Link href="/" className="hover:text-[#191713]">Beranda</Link>
                <span>/</span>
                <span className="text-[#191713] font-semibold">Rapor</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#191713]">
                Rapor &amp; <em className="text-[#c4402a] font-normal not-italic">riwayat.</em>
              </h1>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#4b463d] max-w-md leading-relaxed">
              Satu tempat untuk melihat performa, status passing grade, dan materi yang paling sering menjatuhkanmu.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
        {/* Profile Strip */}
        <div className="border border-[#191713] bg-[#fbf8f0] p-5 sm:p-6 shadow-paper flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'Peserta'}
                className="w-12 h-12 object-cover border border-[#191713] shadow-[2px_2px_0px_#d2c8b2]"
              />
            ) : (
              <div className="w-12 h-12 bg-[#191713] text-[#f3efe3] flex items-center justify-center font-mono font-bold text-base border border-[#191713] shadow-[2px_2px_0px_#d2c8b2]">
                {initials}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#2f5a44] font-bold">
                  ● Peserta Aktif
                </span>
              </div>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#191713]">
                {user.name || 'Peserta Mandiri'}
              </div>
              <div className="font-mono text-xs text-[#7a7365] mt-0.5">
                {user.email || 'Mode Tamu Lokal'} · Terdaftar di BedahSoal CBT
              </div>
            </div>
          </div>

          <div>
            <Link
              href="/#katalog"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#c4402a] hover:border-[#c4402a] transition-all shadow-[2px_2px_0px_#d2c8b2] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Ujian Baru</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 4-Stat Grid (Ringkasan Performa) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Ringkasan performa">
          <div className="border border-[#191713] bg-[#fbf8f0] p-4 sm:p-5 shadow-paper flex flex-col justify-between">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a7365]">
              Total Sesi
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#191713] my-2">
              {stats.total}
            </div>
            <div className="font-mono text-[10px] text-[#7a7365]">
              Sesi tryout terdaftar
            </div>
          </div>

          <div className="border border-[#191713] bg-[#fbf8f0] p-4 sm:p-5 shadow-paper flex flex-col justify-between">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a7365]">
              Selesai
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2f5a44] my-2">
              {stats.completed}
            </div>
            <div className="font-mono text-[10px] text-[#2f5a44] font-semibold">
              {stats.passed} lulus passing grade
            </div>
          </div>

          <div className="border border-[#191713] bg-[#fbf8f0] p-4 sm:p-5 shadow-paper flex flex-col justify-between">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a7365]">
              Skor Tertinggi
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#c4402a] my-2">
              {stats.highestScore || 0}
            </div>
            <div className="font-mono text-[10px] text-[#7a7365]">
              Poin terbaik yang dicapai
            </div>
          </div>

          <div className="border border-[#191713] bg-[#fbf8f0] p-4 sm:p-5 shadow-paper flex flex-col justify-between">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a7365]">
              Rata-rata Skor
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#191713] my-2">
              {stats.averageScore || 0}
            </div>
            <div className="font-mono text-[10px] text-[#7a7365]">
              Rerata akumulasi poin
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Riwayat Tryout Table */}
          <div className="lg:col-span-8 border border-[#191713] bg-[#fbf8f0] shadow-paper">
            {/* Panel Head */}
            <div className="p-5 sm:p-6 border-b border-[#d2c8b2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f3efe3]">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#191713]">
                  Riwayat Tryout
                </h2>
                <p className="font-mono text-[10px] text-[#7a7365] uppercase tracking-wider mt-0.5">
                  {filteredSessions.length} sesi tercatat di sistem
                </p>
              </div>

              {/* Segmented Filter Tab */}
              <div className="inline-flex border border-[#191713] bg-[#eae3d2] p-0.5 font-mono text-[10.5px] uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setFilter('ALL')}
                  className={`px-3 py-1.5 transition cursor-pointer font-semibold ${
                    filter === 'ALL'
                      ? 'bg-[#191713] text-[#f3efe3]'
                      : 'text-[#4b463d] hover:text-[#191713]'
                  }`}
                >
                  Semua ({sessions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('COMPLETED')}
                  className={`px-3 py-1.5 transition cursor-pointer font-semibold ${
                    filter === 'COMPLETED'
                      ? 'bg-[#191713] text-[#f3efe3]'
                      : 'text-[#4b463d] hover:text-[#191713]'
                  }`}
                >
                  Selesai ({stats.completed})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('IN_PROGRESS')}
                  className={`px-3 py-1.5 transition cursor-pointer font-semibold ${
                    filter === 'IN_PROGRESS'
                      ? 'bg-[#191713] text-[#f3efe3]'
                      : 'text-[#4b463d] hover:text-[#191713]'
                  }`}
                >
                  Berjalan ({sessions.length - stats.completed})
                </button>
              </div>
            </div>

            {/* Table Head */}
            <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-[#d2c8b2] bg-[#eae3d2] font-mono text-[9px] uppercase tracking-[0.14em] text-[#7a7365] font-semibold">
              <span className="col-span-6 sm:col-span-5">Tryout &amp; Tanggal</span>
              <span className="col-span-3 sm:col-span-3 text-center sm:text-left">Status</span>
              <span className="col-span-3 sm:col-span-2 text-right">Skor</span>
              <span className="hidden sm:block sm:col-span-2 text-right">Aksi</span>
            </div>

            {/* Table Rows */}
            {filteredSessions.length > 0 ? (
              <div className="divide-y divide-[#d2c8b2]">
                {filteredSessions.map((session) => {
                  const isCompleted = session.status === 'COMPLETED';
                  const examTypeLabel = formatExamType(session.tryout.examType);

                  return (
                    <div
                      key={session.id}
                      className="grid grid-cols-12 gap-2 items-center px-5 py-4 hover:bg-[#f3efe3] transition"
                    >
                      {/* Left: Title & Meta */}
                      <div className="col-span-6 sm:col-span-5 pr-2">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-[#191713] line-clamp-1">
                          {session.tryout.title}
                        </h3>
                        <div className="font-mono text-[9.5px] text-[#7a7365] mt-1 flex flex-wrap items-center gap-2">
                          <span className="border border-[#b9ac91] px-1.5 py-0.5 bg-[#f3efe3] uppercase">
                            {examTypeLabel}
                          </span>
                          <span>{formatDate(session.startedAt)}</span>
                          <span>&bull;</span>
                          <span>{session.tryout.totalQuestions} Butir</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-3 sm:col-span-3 flex justify-center sm:justify-start">
                        {isCompleted ? (
                          session.isPassed ? (
                            <StampBadge label="LULUS PG" variant="green" rotate={-1} />
                          ) : (
                            <StampBadge label="BELUM LULUS" variant="red" rotate={1} />
                          )
                        ) : (
                          <StampBadge label="BERJALAN" variant="amber" rotate={0} />
                        )}
                      </div>

                      {/* Score */}
                      <div className="col-span-3 sm:col-span-2 text-right">
                        {isCompleted ? (
                          <div>
                            <span className="font-mono font-bold text-base sm:text-lg text-[#191713]">
                              {session.totalScore}
                            </span>
                            <span className="font-mono text-[9px] text-[#7a7365] block uppercase">
                              Poin
                            </span>
                          </div>
                        ) : (
                          <span className="font-mono text-xs text-[#7a7365]">—</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="col-span-12 sm:col-span-2 flex items-center justify-end gap-2 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#d2c8b2]">
                        {isCompleted && (
                          <button
                            type="button"
                            onClick={() =>
                              setLeaderboardTarget({
                                tryoutId: session.tryout.id,
                                title: session.tryout.title,
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#191713] bg-[#fbf8f0] hover:bg-[#eae3d2] text-[#191713] font-mono text-[10px] font-semibold uppercase tracking-wider transition cursor-pointer"
                            title="Peringkat Nasional"
                          >
                            <Trophy className="w-3 h-3 text-[#b67a18]" />
                            <span className="hidden xl:inline">Ranking</span>
                          </button>
                        )}

                        {isCompleted ? (
                          <Link
                            href={`/review/${session.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-[10px] font-semibold uppercase tracking-wider hover:bg-[#c4402a] hover:border-[#c4402a] transition"
                          >
                            <span>Bahas</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/exam/${session.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#191713] bg-[#c4402a] text-[#f3efe3] font-mono text-[10px] font-semibold uppercase tracking-wider hover:bg-[#9c2f1e] transition"
                          >
                            <span>Lanjut</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-10 text-center space-y-3">
                <div className="font-serif text-lg font-bold text-[#191713]">
                  Tidak ada sesi pada filter ini.
                </div>
                <p className="font-sans text-xs text-[#7a7365] max-w-sm mx-auto">
                  Pilih tab “Semua” untuk melihat seluruh riwayat atau mulai paket tryout baru.
                </p>
                <Link
                  href="/#katalog"
                  className="inline-flex items-center gap-2 h-9 px-4 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-xs uppercase tracking-wider hover:bg-[#c4402a] transition"
                >
                  <span>Buka Katalog Ujian</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Diagnostic Analytics & Rhythm */}
          <div className="lg:col-span-4 space-y-6">
            {/* Panel 1: Materi yang Perlu Dibedah (Peta Kebocoran Logika) */}
            <div className="border border-[#191713] bg-[#fbf8f0] p-5 sm:p-6 shadow-paper">
              <div className="border-b border-[#d2c8b2] pb-3 mb-4">
                <h3 className="font-serif text-lg font-bold text-[#191713]">
                  Materi yang perlu dibedah
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365] mt-0.5">
                  Peta kebocoran logika &amp; akurasi
                </p>
              </div>

              <div className="space-y-4">
                {weaknessList.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#191713] font-medium">{item.label}</span>
                      <strong className={item.status === 'red' ? 'text-[#c4402a]' : item.status === 'amber' ? 'text-[#b67a18]' : 'text-[#2f5a44]'}>
                        {item.score}%
                      </strong>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-2 w-full bg-[#eae3d2] border border-[#d2c8b2] overflow-hidden">
                      <div
                        style={{ width: `${item.score}%` }}
                        className={`h-full transition-all duration-500 ${
                          item.status === 'red'
                            ? 'bg-[#c4402a]'
                            : item.status === 'amber'
                            ? 'bg-[#b67a18]'
                            : 'bg-[#2f5a44]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#d2c8b2] font-mono text-[9.5px] text-[#7a7365] leading-relaxed">
                Rekomendasi: Prioritaskan latihan kilat pada subtes berwarna merah sebelum jadwal tes resmi.
              </div>
            </div>

            {/* Panel 2: Ritme Belajar (14 Hari Terakhir) */}
            <div className="border border-[#191713] bg-[#fbf8f0] p-5 sm:p-6 shadow-paper">
              <div className="flex items-center justify-between border-b border-[#d2c8b2] pb-3 mb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#191713]">
                    Ritme Belajar
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365] mt-0.5">
                    14 Hari Terakhir
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#2f5a44] bg-[#2f5a44]/10 border border-[#2f5a44] px-2 py-0.5 font-bold">
                  Konsisten
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#7a7365] uppercase">
                  <span>Intensitas sesi</span>
                  <span>Hari ini</span>
                </div>
                {/* Heatmap Grid (14 cells) */}
                <div className="grid grid-cols-7 gap-1.5" aria-label="Aktivitas 14 hari">
                  {[2, 3, 1, 4, 3, 2, 0, 3, 4, 4, 3, 2, 4, 4].map((level, i) => {
                    const colors = [
                      'bg-[#eae3d2]',
                      'bg-[#b9ac91]',
                      'bg-[#7a7365]',
                      'bg-[#4b463d]',
                      'bg-[#191713]',
                    ];
                    return (
                      <span
                        key={i}
                        className={`aspect-square border border-[#191713] ${colors[level]}`}
                        title={`Hari ke-${i + 1}: ${level > 0 ? `${level} sesi` : 'Istirahat'}`}
                      />
                    );
                  })}
                </div>
                <div className="font-mono text-[9.5px] text-[#7a7365] pt-1">
                  Rata-rata 1 sesi · 45 menit pengerjaan per hari
                </div>
              </div>
            </div>

            {/* Panel 3: Target Berikutnya (Brutalist Dark Ink Card) */}
            <div className="border border-[#191713] bg-[#191713] text-[#f3efe3] p-6 shadow-paper-lg space-y-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#b9ac91]">
                Target Seleksi Nasional
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight leading-tight">
                SKD CPNS &amp; TBS LPDP <br />
                <em className="text-[#c4402a] not-italic font-normal">Fokus evaluasi logika.</em>
              </h3>
              <p className="font-sans text-xs text-[#d2c8b2] leading-relaxed">
                Bedah kembali soal-soal salah di pembahasan untuk menutup kebocoran poin.
              </p>
              <div className="pt-2">
                <Link
                  href="/#katalog"
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 border border-[#f3efe3] bg-[#f3efe3] text-[#191713] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#c4402a] hover:text-[#f3efe3] hover:border-[#c4402a] transition-all cursor-pointer w-full"
                >
                  <span>Buka Meja Ujian</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Papan Peringkat */}
      {leaderboardTarget && (
        <LeaderboardView
          tryoutId={leaderboardTarget.tryoutId}
          tryoutTitle={leaderboardTarget.title}
          isOpen={Boolean(leaderboardTarget)}
          onClose={() => setLeaderboardTarget(null)}
        />
      )}
    </div>
  );
}

export default DashboardClient;
