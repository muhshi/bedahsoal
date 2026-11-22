'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Layers,
  GraduationCap,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { UserNav } from '@/components/auth/UserNav';

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
    : 'U';

  const formatExamType = (type: string) => {
    switch (type) {
      case 'SKD_CPNS':
        return { label: 'SKD CPNS', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'LPDP_TBS':
        return { label: 'LPDP TBS', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
      case 'MATH_OLYMPIAD':
        return { label: 'Olimpiade Sains', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'UTBK_SNBT':
        return { label: 'UTBK SNBT', color: 'bg-amber-100 text-amber-700 border-amber-200' };
      default:
        return { label: type, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-slate-900 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-blue-900 font-extrabold tracking-tight">
                Bedah<span className="text-blue-600">Soal</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
                Dashboard Peserta
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
            >
              &larr; Beranda
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* User Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-5 z-10">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'User'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-blue-100"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md ring-2 ring-blue-100">
                {initials}
              </div>
            )}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Peserta Aktif</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {user.name || 'Peserta Mandiri'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">{user.email || 'Akun Tamu'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto z-10">
            <Link
              href="/#paket-ujian"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-95 transition shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Mulai Ujian Baru</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Total Ujian</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.total}</span>
              <span className="text-xs text-slate-500 block mt-0.5">Sesi tryout terdaftar</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Selesai</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.completed}</span>
              <span className="text-xs text-emerald-600 font-semibold block mt-0.5">
                {stats.passed} Lulus Passing Grade
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Skor Tertinggi</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">{stats.highestScore}</span>
              <span className="text-xs text-slate-500 block mt-0.5">Poin terbaik yang diraih</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Skor</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.averageScore}</span>
              <span className="text-xs text-slate-500 block mt-0.5">Konsistensi performa</span>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Riwayat Tryout &amp; Pembahasan</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Daftar semua ujian yang pernah Anda ikuti beserta evaluasi nilai
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({sessions.length})
              </button>
              <button
                onClick={() => setFilter('COMPLETED')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === 'COMPLETED'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Selesai ({stats.completed})
              </button>
              <button
                onClick={() => setFilter('IN_PROGRESS')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === 'IN_PROGRESS'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Berlangsung ({sessions.length - stats.completed})
              </button>
            </div>
          </div>

          {/* List of Sessions */}
          {filteredSessions.length > 0 ? (
            <div className="space-y-4">
              {filteredSessions.map((session) => {
                const badge = formatExamType(session.tryout.examType);
                const isCompleted = session.status === 'COMPLETED';

                return (
                  <div
                    key={session.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                        {isCompleted ? (
                          session.isPassed ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Lulus Passing Grade
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                              <AlertCircle className="w-3 h-3 text-rose-600" /> Belum Lulus
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                            <Clock className="w-3 h-3 text-amber-600" /> Sedang Dikerjakan
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-base">{session.tryout.title}</h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(session.startedAt)}
                        </span>
                        <span>&bull;</span>
                        <span>{session.tryout.totalQuestions} Soal</span>
                        <span>&bull;</span>
                        <span>{session.tryout.durationMinutes} Menit</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                      {isCompleted ? (
                        <div className="text-left md:text-right">
                          <span className="text-[11px] text-slate-500 block">Total Nilai</span>
                          <span className="text-xl font-extrabold text-blue-600">
                            {session.totalScore} Poin
                          </span>
                        </div>
                      ) : (
                        <div className="text-left md:text-right">
                          <span className="text-[11px] text-slate-500 block">Status Sesi</span>
                          <span className="text-sm font-bold text-amber-600">Masih Berjalan</span>
                        </div>
                      )}

                      <div>
                        {isCompleted ? (
                          <Link
                            href={`/review/${session.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition shadow-xs"
                          >
                            <span>Bahas Soal</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <Link
                            href={`/exam/${session.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs"
                          >
                            <span>Lanjutkan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Belum Ada Riwayat Ujian</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Anda belum memiliki sesi ujian pada kategori ini. Mulai simulasi pertama Anda sekarang!
              </p>
              <Link
                href="/#paket-ujian"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
              >
                <span>Jelajahi Paket Tryout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
