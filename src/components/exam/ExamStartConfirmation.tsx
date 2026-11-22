'use client';

import React from 'react';
import Link from 'next/link';
import {
  Clock,
  BookOpen,
  Award,
  Zap,
  ShieldCheck,
  Play,
  ArrowLeft,
  Keyboard,
  Info,
} from 'lucide-react';

interface ExamStartConfirmationProps {
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  categoryOrType?: string;
  onConfirmStart: () => void;
}

export function ExamStartConfirmation({
  title,
  durationMinutes,
  totalQuestions,
  categoryOrType = 'SKD_CPNS',
  onConfirmStart,
}: ExamStartConfirmationProps) {
  const isOlimpiade = categoryOrType.toUpperCase().includes('OLYMPIAD') || categoryOrType.toUpperCase().includes('OLIMPIADE');
  const isSKD = categoryOrType.toUpperCase().includes('SKD') || categoryOrType.toUpperCase().includes('CPNS');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Badge & Title */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Konfirmasi Persiapan Ujian</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Silakan tinjau parameter ujian dan petunjuk teknis di bawah ini sebelum memulai perhitungan waktu pengerjaan.
          </p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 flex flex-col items-center text-center">
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Durasi Waktu</span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{durationMinutes} Menit</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Timer Server Otomatis</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 flex flex-col items-center text-center">
            <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jumlah Soal</span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{totalQuestions} Butir</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Navigasi Bebas</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/60 flex flex-col items-center text-center">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sistem Penilaian</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              {isOlimpiade ? 'Skor Minus (+4/-1)' : isSKD ? 'Passing Grade BKN' : 'Standar Akumulasi'}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              {isOlimpiade ? 'Salah kena penalti -1' : isSKD ? 'TWK, TIU, TKP 1-5' : 'Skor bertahap'}
            </span>
          </div>
        </div>

        {/* Petunjuk Teknis & Navigasi */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-5 mb-8 space-y-3.5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Keyboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Petunjuk Pengerjaan &amp; Navigasi Cepat</span>
          </div>

          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Pintasan Keyboard:</strong> Anda dapat menekan tombol <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border font-mono">A</kbd> - <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border font-mono">E</kbd> untuk memilih jawaban langsung tanpa mouse.
            </li>
            <li>
              <strong>Pindah Soal:</strong> Gunakan tombol panah <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border font-mono">&larr;</kbd> dan <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border font-mono">&rarr;</kbd> untuk berpindah butir soal.
            </li>
            <li>
              <strong>Ragu-ragu:</strong> Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border font-mono">R</kbd> untuk menandai soal yang ingin ditinjau kembali (berwarna kuning di peta soal).
            </li>
            <li>
              <strong>Penyimpanan Otomatis:</strong> Jawaban tersimpan otomatis secara real-time. Jika koneksi internet terputus, pengerjaan tetap aman dan tersinkronisasi saat kembali online.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onConfirmStart}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Saya Siap, Mulai Ujian Sekarang!</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm transition-colors text-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Batal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExamStartConfirmation;
