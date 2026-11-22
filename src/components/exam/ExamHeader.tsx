'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  Loader2,
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

  const [remainingMs, setRemainingMs] = useState<number>(() =>
    calculateRemainingMs(deadline, serverTimeOffsetMs)
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmSubmitting, setIsConfirmSubmitting] = useState(false);
  const hasTimedUpRef = useRef(false);

  const currentQuestion = questions[currentIndex];
  const activeCategory = currentQuestion?.category || 'Umum';

  const stats = useMemo(() => {
    return calculatePaletteStats(questions, answers);
  }, [questions, answers]);

  // Synchronized countdown timer; time-up fires only once.
  useEffect(() => {
    if (!deadline) return;

    const tick = () => {
      const ms = calculateRemainingMs(deadline, serverTimeOffsetMs);
      setRemainingMs(ms);

      if (ms <= 0 && !hasTimedUpRef.current) {
        hasTimedUpRef.current = true;
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
      if (e.key === 'Escape' && isConfirmOpen && !isSubmitting && !isConfirmSubmitting) {
        setIsConfirmOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConfirmOpen, isSubmitting, isConfirmSubmitting]);

  const handleConfirmSubmit = useCallback(async () => {
    if (isSubmitting || isConfirmSubmitting) return;
    setIsConfirmSubmitting(true);
    try {
      if (onSubmit) await onSubmit();
      setIsConfirmOpen(false);
    } finally {
      setIsConfirmSubmitting(false);
    }
  }, [isSubmitting, isConfirmSubmitting, onSubmit]);

  const formattedTime = formatRemainingTime(remainingMs);
  const isWarning = isTimerWarning(remainingMs);
  const isBusy = isSubmitting || isConfirmSubmitting;

  return (
    <>
      <header
        aria-label="Header Ujian"
        className={`sticky top-0 z-60 w-full border-b border-line-strong bg-paper/95 px-4 py-3 backdrop-blur-md sm:px-6 ${className}`}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          {/* Left: Exam identity */}
          <div className="flex min-w-0 items-center gap-3">
            {onTogglePalette && (
              <button
                type="button"
                onClick={onTogglePalette}
                aria-label="Buka palet nomor soal"
                className="flex h-10 w-10 flex-none items-center justify-center border border-ink text-ink hover:bg-ink hover:text-paper lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            <div className="min-w-0">
              <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.18em] text-red-stamp">
                Ruang Ujian · Lembar {questions.length > 0 ? currentIndex + 1 : 0}
              </p>
              <h1 className="truncate font-serif text-lg font-bold tracking-tight text-ink sm:text-xl">
                {title || 'Ujian CBT'}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-wider">
                <span className="inline-flex items-center border border-ink bg-ink px-1.5 py-0.5 font-semibold text-paper">
                  {activeCategory}
                </span>
                <span className="text-ink-3">
                  Butir {questions.length > 0 ? currentIndex + 1 : 0} / {questions.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Server-authoritative timer & submit */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div
              aria-label={`Sisa waktu: ${formattedTime}`}
              role="timer"
              className={`flex items-center gap-2 border px-3 py-1.5 font-mono text-sm font-bold sm:text-base ${
                isWarning
                  ? 'border-red-stamp bg-red-stamp/10 text-red-stamp'
                  : 'border-ink bg-white text-ink'
              }`}
            >
              <Clock
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isWarning ? 'text-red-stamp' : 'text-ink-3'
                }`}
                aria-hidden="true"
              />
              <span>{formattedTime}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              disabled={isBusy}
              className="inline-flex min-h-11 items-center gap-2 border border-ink bg-ink px-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-red-stamp disabled:opacity-50 sm:px-4"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Selesai Ujian</span>
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation dialog */}
      {isConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          className="fixed inset-0 z-200 overflow-y-auto bg-ink/65 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isBusy) setIsConfirmOpen(false);
          }}
        >
          <div
            className="flex min-h-full items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget && !isBusy) setIsConfirmOpen(false);
            }}
          >
            <div
              className="my-8 w-full max-w-md border border-ink bg-paper shadow-paper-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 border-b border-line-strong bg-paper-2 p-5">
                <div className="flex h-10 w-10 flex-none items-center justify-center border border-amber-flag bg-amber-flag/10 text-amber-flag">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-red-stamp">
                    Konfirmasi Akhir
                  </p>
                  <h2 id="confirm-modal-title" className="mt-1 font-serif text-xl font-bold text-ink">
                    Selesaikan Sesi Ujian?
                  </h2>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">
                    Periksa kembali status pengerjaan Anda.
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-px border border-ink bg-ink">
                  <div className="bg-white p-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-green-stamp">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Dijawab
                    </span>
                    <strong className="mt-2 block font-serif text-2xl font-bold text-ink">
                      {stats.answered}
                    </strong>
                  </div>
                  <div className="bg-white p-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-flag">
                      <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" /> Ragu
                    </span>
                    <strong className="mt-2 block font-serif text-2xl font-bold text-ink">
                      {stats.doubt}
                    </strong>
                  </div>
                  <div className="bg-white p-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink-3">
                      <XCircle className="h-3.5 w-3.5" aria-hidden="true" /> Kosong
                    </span>
                    <strong className="mt-2 block font-serif text-2xl font-bold text-ink">
                      {stats.remaining}
                    </strong>
                  </div>
                </div>

                {(stats.remaining > 0 || stats.doubt > 0) && (
                  <div className="border-l-2 border-amber-flag bg-amber-flag/10 p-3 font-mono text-[10px] leading-relaxed text-ink-2">
                    <p className="font-bold uppercase tracking-wider text-amber-flag">Perhatian:</p>
                    <ul className="mt-1 list-inside list-disc space-y-0.5">
                      {stats.remaining > 0 && <li>Masih ada {stats.remaining} butir belum dijawab.</li>}
                      {stats.doubt > 0 && <li>Masih ada {stats.doubt} butir ditandai ragu-ragu.</li>}
                    </ul>
                  </div>
                )}

                <p className="font-mono text-[10px] leading-relaxed text-ink-2">
                  Setelah dikumpulkan, jawaban tidak dapat diubah lagi. Penilaian dilakukan sesuai
                  aturan resmi.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-line bg-paper-2 p-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => setIsConfirmOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center border border-ink bg-white px-4 font-mono text-[10px] font-bold uppercase tracking-wider text-ink hover:bg-paper disabled:opacity-50"
                >
                  Lanjutkan Mengerjakan
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={handleConfirmSubmit}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink bg-ink px-4 font-mono text-[10px] font-bold uppercase tracking-wider text-paper shadow-paper hover:bg-red-stamp disabled:opacity-50"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Menyimpan...
                    </>
                  ) : (
                    'Ya, Kumpulkan'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExamHeader;
