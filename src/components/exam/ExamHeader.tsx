'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useExamStore } from '@/stores/use-exam-store';
import { calculatePaletteStats } from './QuestionPalette';
import {
  Clock,
  AlertTriangle,
  Send,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Menu,
} from 'lucide-react';

export function calculateRemainingMs(
  deadline: string | null,
  serverTimeOffsetMs = 0
): number {
  if (!deadline) return 0;
  const deadlineTimestamp = new Date(deadline).getTime();
  const currentServerTime = Date.now() + serverTimeOffsetMs;
  return Math.max(0, deadlineTimestamp - currentServerTime);
}

export function formatRemainingTime(remainingMs: number): string {
  if (remainingMs <= 0) return '00:00:00';
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function isTimerWarning(remainingMs: number): boolean {
  // Warning triggered when < 5 minutes (300,000 ms)
  return remainingMs <= 5 * 60 * 1000;
}

export interface ExamHeaderProps {
  className?: string;
  onSubmit?: () => Promise<void> | void;
  onTimeUp?: () => void;
  onTogglePalette?: () => void;
}

export function ExamHeader({
  className = '',
  onSubmit,
  onTimeUp,
  onTogglePalette,
}: ExamHeaderProps) {
  const title = useExamStore((state) => state.title);
  const deadline = useExamStore((state) => state.deadline);
  const serverTimeOffsetMs = useExamStore((state) => state.serverTimeOffsetMs);
  const questions = useExamStore((state) => state.questions);
  const answers = useExamStore((state) => state.answers);
  const currentIndex = useExamStore((state) => state.currentIndex);
  const isSubmitting = useExamStore((state) => state.isSubmitting);
  const setSubmitting = useExamStore((state) => state.setSubmitting);

  const [remainingMs, setRemainingMs] = useState<number>(() =>
    calculateRemainingMs(deadline, serverTimeOffsetMs)
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Active question and subtest info
  const currentQuestion = questions[currentIndex];
  const activeCategory = currentQuestion?.category || 'Umum';

  // Statistics for submission confirmation
  const stats = useMemo(() => {
    return calculatePaletteStats(questions, answers);
  }, [questions, answers]);

  // Synchronized countdown timer interval
  useEffect(() => {
    if (!deadline) return;

    const tick = () => {
      const ms = calculateRemainingMs(deadline, serverTimeOffsetMs);
      setRemainingMs(ms);

      if (ms <= 0) {
        onTimeUp?.();
      }
    };

    tick();
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [deadline, serverTimeOffsetMs, onTimeUp]);

  // Close confirmation modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isConfirmOpen && !isSubmitting) {
        setIsConfirmOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConfirmOpen, isSubmitting]);

  const handleConfirmSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit();
      }
    } finally {
      setSubmitting(false);
      setIsConfirmOpen(false);
    }
  }, [isSubmitting, setSubmitting, onSubmit]);

  const formattedTime = formatRemainingTime(remainingMs);
  const isWarning = isTimerWarning(remainingMs);

  return (
    <>
      <header
        aria-label="Header Ujian"
        className={`w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs sticky top-0 z-30 px-4 py-3 sm:px-6 ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Exam Title & Subtest Badge */}
          <div className="flex items-center gap-3 min-w-0">
            {onTogglePalette && (
              <button
                type="button"
                onClick={onTogglePalette}
                aria-label="Buka palet nomor soal"
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                {title || 'Ujian CBT'}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {activeCategory}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Soal {questions.length > 0 ? currentIndex + 1 : 0} dari {questions.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Server-Authoritative Timer & Submit Button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Countdown Timer */}
            <div
              aria-label={`Sisa waktu: ${formattedTime}`}
              role="timer"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm sm:text-base font-bold transition-colors ${
                isWarning
                  ? 'bg-red-50 text-red-600 border-red-400 dark:bg-red-950/60 dark:text-red-400 dark:border-red-600 animate-pulse'
                  : 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'
              }`}
            >
              <Clock
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isWarning ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'
                }`}
              />
              <span>{formattedTime}</span>
            </div>

            {/* Selesai Ujian Button */}
            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 min-h-[44px]"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Selesai Ujian</span>
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Dialog Modal */}
      {isConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 flex min-h-full items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsConfirmOpen(false);
          }}
        >
          <div
            className="w-full max-w-md my-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="confirm-modal-title"
                    className="text-lg font-bold text-slate-900 dark:text-white"
                  >
                    Konfirmasi Selesai Ujian
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Periksa kembali status pengerjaan soal Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body: Stats Breakdown */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-semibold">Dijawab</span>
                  </div>
                  <span className="text-xl font-extrabold text-emerald-800 dark:text-emerald-300">
                    {stats.answered}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-center gap-1 text-amber-700 dark:text-amber-400 mb-1">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Ragu-ragu</span>
                  </div>
                  <span className="text-xl font-extrabold text-amber-800 dark:text-amber-300">
                    {stats.doubt}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-center gap-1 text-slate-600 dark:text-slate-400 mb-1">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Kosong</span>
                  </div>
                  <span className="text-xl font-extrabold text-slate-700 dark:text-slate-200">
                    {stats.remaining}
                  </span>
                </div>
              </div>

              {/* Warning Notice if unanswered or doubts exist */}
              {(stats.remaining > 0 || stats.doubt > 0) && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300">
                  <p className="font-semibold mb-0.5">Perhatian:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {stats.remaining > 0 && (
                      <li>Masih ada {stats.remaining} nomor soal yang belum dijawab.</li>
                    )}
                    {stats.doubt > 0 && (
                      <li>Masih ada {stats.doubt} nomor soal yang ditandai ragu-ragu.</li>
                    )}
                  </ul>
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Apakah Anda yakin ingin menyelesaikan sesi ujian ini sekarang? Setelah dikumpulkan,
                jawaban Anda tidak dapat diubah lagi.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[44px]"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmSubmit}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[44px] flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <span>Ya, Kumpulkan</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExamHeader;
