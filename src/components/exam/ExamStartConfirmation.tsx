'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, Award, ShieldCheck, Play, ArrowLeft, Keyboard } from 'lucide-react';
import { StampBadge } from '@/components/ui/StampBadge';

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
  const normalizedType = categoryOrType.toUpperCase();
  const isOlimpiade = normalizedType.includes('OLYMPIAD') || normalizedType.includes('OLIMPIADE');
  const isSKD = normalizedType.includes('SKD') || normalizedType.includes('CPNS');

  const metrics = [
    {
      icon: Clock,
      label: 'Durasi Waktu',
      value: `${durationMinutes} Menit`,
      note: 'Timer Server Otomatis',
    },
    {
      icon: BookOpen,
      label: 'Jumlah Soal',
      value: `${totalQuestions} Butir`,
      note: 'Navigasi Bebas',
    },
    {
      icon: Award,
      label: 'Sistem Penilaian',
      value: isOlimpiade ? 'Skor Minus (+4/-1)' : isSKD ? 'Passing Grade BKN' : 'Standar Akumulasi',
      note: isOlimpiade ? 'Salah kena penalti -1' : isSKD ? 'TWK, TIU, TKP 1-5' : 'Skor bertahap',
    },
  ];

  return (
    <div className="flex min-h-screen justify-center bg-paper px-4 py-8 sm:py-12">
      <div className="w-full max-w-3xl border border-ink bg-white p-6 shadow-paper-lg sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-strong pb-6">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-stamp">
              Lembar Pengarahan / Sebelum Sesi Dimulai
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink-3">
              Tinjau parameter ujian dan petunjuk teknis. Timer baru berjalan setelah Anda
              menyetujui lembar ini.
            </p>
          </div>
          <StampBadge label="TERSEGEL" variant="red" rotate={-4} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {metrics.map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="border border-ink bg-paper p-4 shadow-[2px_2px_0px_#ded4bf]">
              <Icon className="mb-3 h-5 w-5 text-red-stamp" aria-hidden="true" />
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-3">
                {label}
              </span>
              <strong className="mt-1 block font-serif text-xl font-bold leading-tight text-ink">
                {value}
              </strong>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-ink-3">
                {note}
              </span>
            </div>
          ))}
        </div>

        <section className="mt-8 border border-line bg-paper p-5" aria-labelledby="exam-instructions-title">
          <h2
            id="exam-instructions-title"
            className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink"
          >
            <Keyboard className="h-4 w-4 text-blue-ink" aria-hidden="true" />
            Petunjuk Pengerjaan &amp; Navigasi Cepat
          </h2>
          <ul className="mt-4 space-y-2.5 font-mono text-[11px] leading-relaxed text-ink-2">
            <li>
              <strong className="text-ink">Pintasan Keyboard:</strong> tekan{' '}
              <kbd className="border border-ink bg-white px-1.5 py-0.5 font-mono text-[10px]">A</kbd>–
              <kbd className="border border-ink bg-white px-1.5 py-0.5 font-mono text-[10px]">E</kbd>{' '}
              untuk memilih jawaban tanpa mouse.
            </li>
            <li>
              <strong className="text-ink">Pindah Soal:</strong> gunakan{' '}
              <kbd className="border border-ink bg-white px-1.5 py-0.5 font-mono text-[10px]">&larr;</kbd>{' '}
              dan{' '}
              <kbd className="border border-ink bg-white px-1.5 py-0.5 font-mono text-[10px]">&rarr;</kbd>{' '}
              untuk berpindah butir soal.
            </li>
            <li>
              <strong className="text-ink">Ragu-ragu:</strong> tekan{' '}
              <kbd className="border border-ink bg-white px-1.5 py-0.5 font-mono text-[10px]">R</kbd>{' '}
              untuk menandai soal yang ingin ditinjau kembali.
            </li>
            <li>
              <strong className="text-ink">Penyimpanan Otomatis:</strong> jawaban tersimpan di perangkat
              ini dan tetap aman bila koneksi terputus.
            </li>
          </ul>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onConfirmStart}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 border border-ink bg-ink px-6 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-red-stamp hover:shadow-[8px_8px_0px_#ded4bf] active:translate-x-0 active:translate-y-0 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Saya Siap, Mulai Ujian
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-transparent px-6 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink hover:bg-paper-2 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Batal
          </Link>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-wider text-ink-3">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Zero answer leakage · penilaian sesuai aturan resmi
        </p>
      </div>
    </div>
  );
}

export default ExamStartConfirmation;
