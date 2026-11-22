'use client';

import React, { useState, useEffect, useCallback, use, Suspense, useRef } from 'react';
import { useExamStore } from '@/stores/use-exam-store';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { QuestionViewer } from '@/components/exam/QuestionViewer';
import { QuestionPalette } from '@/components/exam/QuestionPalette';
import { ExamSessionInitDTO, ExamReviewDTO } from '@/types/exam';
import { ExamReviewViewer } from '@/components/exam/ExamReviewViewer';
import { ExamStartConfirmation } from '@/components/exam/ExamStartConfirmation';
import { StampBadge } from '@/components/ui/StampBadge';
import { mergeAnswersByTimestamp } from '@/lib/answer-merge';
import { get, set as idbSet } from 'idb-keyval';
import {
  Wifi,
  WifiOff,
  Database,
  X,
  AlertCircle,
  Loader2,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface ExamPageProps {
  params: Promise<{ sessionId: string }>;
}

type StoredAnswer = {
  selectedOptionId?: string | null;
  numericAnswer?: string | null;
  isDoubt?: boolean;
  answeredAt?: string;
};

function ExamLoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4">
      <div className="border border-ink bg-white p-8 text-center shadow-paper">
        <div
          className="mx-auto mb-4 h-10 w-10 animate-spin border-2 border-ink border-t-red-stamp"
          aria-hidden="true"
        />
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-stamp">
          Berkas 01 / Sesi Ujian
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
          Mempersiapkan Sesi Ujian...
        </h2>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">
          Mengambil butir soal dengan proteksi Zero Answer Leakage.
        </p>
      </div>
    </div>
  );
}

function ExamPlayer({ params }: ExamPageProps) {
  const { sessionId } = use(params);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  const [isSavedLocally, setIsSavedLocally] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewData, setReviewData] = useState<ExamReviewDTO | null>(null);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [sessionTryoutId, setSessionTryoutId] = useState<string | null>(null);
  const [isConfirmedStart, setIsConfirmedStart] = useState(false);
  const [examMeta, setExamMeta] = useState<{
    title: string;
    durationMinutes: number;
    totalQuestions: number;
    examType: string;
  } | null>(null);
  const [submitResult, setSubmitResult] = useState<{
    totalScore: number;
    subtestScores?: Record<string, number>;
    isPassed?: boolean;
    submittedAt?: string;
  } | null>(null);

  const submitInFlightRef = useRef(false);
  const timeUpTriggeredRef = useRef(false);
  const answers = useExamStore((state) => state.answers);

  // Online / offline network event monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch initial exam session with Zero Leakage
  useEffect(() => {
    let isMounted = true;

    async function readCachedAnswers(): Promise<Record<string, StoredAnswer> | null> {
      try {
        const cached = await get<Record<string, StoredAnswer>>(
          `cbt_session_${sessionId}_answers`
        );
        if (cached && typeof cached === 'object') return cached;
      } catch {
        // IndexedDB read error fallback
      }

      try {
        const raw = localStorage.getItem(`cbt_session_${sessionId}_answers`);
        return raw ? (JSON.parse(raw) as Record<string, StoredAnswer>) : null;
      } catch {
        return null;
      }
    }

    async function loadExamSession() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const res = await fetch(`/api/sessions/${sessionId}`);
        const data = await res.json();

        // If session has already been completed, show result and review options
        if (data.isCompleted) {
          if (isMounted) {
            setSessionTryoutId(data.tryoutId || null);
            setSubmitResult({
              totalScore: data.totalScore ?? 0,
              subtestScores: data.subtestScores,
              isPassed: data.isPassed,
            });
            setIsSubmitted(true);
            setIsLoading(false);
          }
          return;
        }

        if (!res.ok) {
          throw new Error(data.error || 'Gagal memuat sesi ujian');
        }

        const initDTO = data as ExamSessionInitDTO;
        const serverAnswers = initDTO.initialAnswers || {};
        const cachedAnswers = await readCachedAnswers();

        // Merge per question using answeredAt so a stale local cache cannot
        // overwrite a newer answer saved on the server.
        const mergedAnswers = mergeAnswersByTimestamp(
          serverAnswers as Record<string, StoredAnswer>,
          (cachedAnswers ?? {}) as Record<string, StoredAnswer>
        );

        // The store requires an explicit isDoubt boolean for every answer.
        const normalizedAnswers: Record<
          string,
          {
            selectedOptionId?: string | null;
            numericAnswer?: string | null;
            isDoubt: boolean;
            answeredAt?: string;
          }
        > = {};
        for (const [questionId, answer] of Object.entries(mergedAnswers)) {
          normalizedAnswers[questionId] = {
            selectedOptionId: answer.selectedOptionId,
            numericAnswer: answer.numericAnswer,
            isDoubt: Boolean(answer.isDoubt),
            answeredAt: answer.answeredAt,
          };
        }

        if (isMounted) {
          setSessionTryoutId(initDTO.tryoutId);
          setExamMeta({
            title: initDTO.title,
            durationMinutes: Math.max(
              1,
              Math.round(
                (new Date(initDTO.deadline).getTime() - new Date(initDTO.startedAt).getTime()) /
                  60000
              )
            ),
            totalQuestions: initDTO.questions.length,
            examType: initDTO.questions[0]?.category || 'SKD_CPNS',
          });

          // Resuming an exam with saved answers bypasses the briefing screen.
          if (Object.keys(normalizedAnswers).length > 0) {
            setIsConfirmedStart(true);
          }

          useExamStore.getState().initExam({
            sessionId: initDTO.sessionId,
            tryoutId: initDTO.tryoutId,
            title: initDTO.title,
            mode: initDTO.mode,
            deadline: initDTO.deadline,
            serverTime: initDTO.serverTime,
            questions: initDTO.questions,
            initialAnswers: normalizedAnswers,
          });
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
          setLoadError(message);
          setIsLoading(false);
        }
      }
    }

    if (sessionId) {
      loadExamSession();
    }

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  // Persist answers to local IndexedDB whenever store answers change
  useEffect(() => {
    if (!sessionId || isLoading) return;

    const timeoutId = setTimeout(async () => {
      setIsSavedLocally(false);
      try {
        await idbSet(`cbt_session_${sessionId}_answers`, answers);
        setIsSavedLocally(true);
      } catch {
        // Fallback to localStorage if IndexedDB is blocked
        try {
          localStorage.setItem(
            `cbt_session_${sessionId}_answers`,
            JSON.stringify(answers)
          );
          setIsSavedLocally(true);
        } catch {
          // Local storage full or unavailable
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [sessionId, answers, isLoading]);

  // Keyboard navigation is only active while the exam is actually in progress
  useEffect(() => {
    if (!isConfirmedStart || isSubmitted || isReviewMode || loadError || isLoading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const store = useExamStore.getState();
      if (!store.questions || store.questions.length === 0) return;

      const currentQ = store.questions[store.currentIndex];

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        store.goToPrevQuestion();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        store.goToNextQuestion();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        if (currentQ) store.toggleDoubt(currentQ.id);
      } else if (['a', 'b', 'c', 'd', 'e'].includes(e.key.toLowerCase())) {
        if (currentQ && currentQ.questionType === 'MULTIPLE_CHOICE') {
          const letter = e.key.toUpperCase();
          const targetOption = currentQ.options.find(
            (opt) => opt.key.toUpperCase() === letter
          );
          if (targetOption) {
            e.preventDefault();
            store.selectOption(currentQ.id, targetOption.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConfirmedStart, isSubmitted, isReviewMode, loadError, isLoading]);

  // Load review data and switch to review mode
  const handleOpenReview = useCallback(async () => {
    try {
      setIsLoadingReview(true);
      setReviewError(null);
      const res = await fetch(`/api/sessions/${sessionId}/review`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memuat pembahasan ujian');
      }
      setReviewData(data as ExamReviewDTO);
      setIsReviewMode(true);
    } catch (err: unknown) {
      setReviewError(
        err instanceof Error ? err.message : 'Terjadi kesalahan memuat pembahasan'
      );
    } finally {
      setIsLoadingReview(false);
    }
  }, [sessionId]);

  // Retake exam: create fresh session for this tryout
  const handleRetakeExam = useCallback(async () => {
    if (!sessionTryoutId) {
      setReviewError('Tryout asal tidak diketahui. Silakan pilih paket dari katalog.');
      return;
    }

    try {
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tryoutId: sessionTryoutId }),
      });
      const data = await res.json();
      if (!res.ok || !data.sessionId) {
        throw new Error(data.error || 'Gagal membuat sesi baru');
      }
      window.location.href = data.examUrl || `/exam/${data.sessionId}`;
    } catch (err: unknown) {
      setReviewError(err instanceof Error ? err.message : 'Terjadi kesalahan sistem');
    }
  }, [sessionTryoutId]);

  // Submit Handler — guarded against duplicate and late submissions
  const handleSubmitExam = useCallback(async () => {
    if (submitInFlightRef.current || isSubmitted) return;
    const store = useExamStore.getState();
    if (store.isSubmitting) return;

    submitInFlightRef.current = true;
    store.setSubmitting(true);

    try {
      const currentAnswers = store.answers;

      const res = await fetch(`/api/sessions/${sessionId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: currentAnswers }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyerahkan ujian');
      }

      setSubmitResult(data);
      setIsSubmitted(true);
    } catch (err: unknown) {
      setReviewError(err instanceof Error ? err.message : 'Terjadi kesalahan submit');
    } finally {
      useExamStore.getState().setSubmitting(false);
      submitInFlightRef.current = false;
    }
  }, [sessionId, isSubmitted]);

  const handleTimeUp = useCallback(() => {
    if (timeUpTriggeredRef.current) return;
    timeUpTriggeredRef.current = true;
    void handleSubmitExam();
  }, [handleSubmitExam]);

  // If in Review Mode, render the full review viewer
  if (isReviewMode && reviewData) {
    return <ExamReviewViewer review={reviewData} onRetakeExam={handleRetakeExam} />;
  }

  // Loading Screen
  if (isLoading) {
    return <ExamLoadingScreen />;
  }

  // Error Screen
  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="w-full max-w-md border border-ink bg-white p-8 text-center shadow-paper-lg">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-red-stamp bg-red-stamp/10 text-red-stamp">
            <AlertCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-stamp">
            Berkas bermasalah
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
            Gagal Memuat Ujian
          </h2>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-2">
            {loadError}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/#katalog"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink bg-ink px-5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-paper hover:bg-red-stamp"
            >
              Kembali ke Katalog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-wider text-ink-3 hover:text-ink"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Completion / Submission Success
  if (isSubmitted && submitResult) {
    return (
      <div className="flex min-h-screen justify-center bg-paper px-4 py-8 sm:py-12">
        <div className="h-fit w-full max-w-2xl border border-ink bg-white p-6 shadow-paper-lg sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-strong pb-6">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-stamp">
                Lembar Hasil / Selesai Dinilai
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Ujian Telah Selesai
              </h2>
              <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink-3">
                Seluruh jawaban telah dinilai oleh server secara otomatis.
              </p>
            </div>
            <StampBadge label="TERKIRIM" variant="green" rotate={-4} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="border border-ink bg-paper p-5 shadow-[2px_2px_0px_#ded4bf] sm:col-span-1">
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-3">
                Total Skor Akhir
              </span>
              <strong className="mt-2 block font-serif text-5xl font-bold leading-none tracking-tight text-ink">
                {submitResult.totalScore}
              </strong>
              {submitResult.isPassed !== undefined && (
                <span
                  className={`mt-4 inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                    submitResult.isPassed
                      ? 'border-green-stamp text-green-stamp'
                      : 'border-amber-flag text-amber-flag'
                  }`}
                >
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  {submitResult.isPassed ? 'Lulus Passing Grade' : 'Belum Memenuhi'}
                </span>
              )}
            </div>

            <div className="border border-line bg-paper-2 p-5 sm:col-span-2">
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-3">
                Rekap per Subtes
              </span>
              {submitResult.subtestScores &&
              Object.keys(submitResult.subtestScores).length > 0 ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {Object.entries(submitResult.subtestScores).map(([subtest, score]) => (
                    <div key={subtest} className="border border-line bg-white p-3 text-center">
                      <div className="truncate font-mono text-[9px] uppercase tracking-wider text-ink-3">
                        {subtest}
                      </div>
                      <div className="mt-1 font-serif text-xl font-bold text-ink">{score}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 font-mono text-[10px] text-ink-3">
                  Rekap per subtes tidak tersedia untuk sesi ini.
                </p>
              )}
            </div>
          </div>

          {reviewError && (
            <p role="alert" className="mt-5 border border-red-stamp bg-red-stamp/5 p-3 font-mono text-[10px] text-red-stamp">
              {reviewError}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-line-strong pt-6 sm:flex-row">
            <button
              type="button"
              onClick={handleOpenReview}
              disabled={isLoadingReview}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 border border-ink bg-ink px-6 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-red-stamp disabled:opacity-50"
            >
              {isLoadingReview ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              )}
              Lihat Pembahasan &amp; Kunci Jawaban
            </button>
            <button
              type="button"
              onClick={handleRetakeExam}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-transparent px-6 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink hover:bg-paper-2"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Ulangi Ujian
            </button>
          </div>

          <Link
            href="/dashboard"
            className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-3 hover:text-ink"
          >
            Lihat rapor lengkap <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  // Pre-Exam Confirmation Screen
  if (!isConfirmedStart && examMeta) {
    return (
      <ExamStartConfirmation
        title={examMeta.title}
        durationMinutes={examMeta.durationMinutes}
        totalQuestions={examMeta.totalQuestions}
        categoryOrType={examMeta.examType}
        onConfirmStart={() => setIsConfirmedStart(true)}
      />
    );
  }

  return (
    <div className="flex min-h-screen select-none flex-col bg-paper">
      {/* 1. Exam Header */}
      <ExamHeader
        onSubmit={handleSubmitExam}
        onTimeUp={handleTimeUp}
        onTogglePalette={() => setIsMobilePaletteOpen((prev) => !prev)}
      />

      {/* 2. Network & storage status sub-bar */}
      <div className="border-b border-line bg-paper-2 px-4 py-1.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.12em]">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-green-stamp">
                <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
                Terhubung · jawaban tersimpan otomatis
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-flag">
                <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
                Mode offline · jawaban disimpan di perangkat
              </span>
            )}
          </div>
          <div className="inline-flex items-center gap-1.5 text-ink-3">
            <Database className="h-3.5 w-3.5" aria-hidden="true" />
            {isSavedLocally ? 'Tersimpan di perangkat' : 'Menyimpan...'}
          </div>
        </div>
      </div>

      {/* 3. Main CBT layout */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-start gap-5 p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-6">
        <section aria-label="Lembar Soal Ujian" className="w-full min-w-0">
          <QuestionViewer />
        </section>

        <aside
          aria-label="Palet Soal Desktop"
          className="sticky top-24 hidden lg:block"
        >
          <QuestionPalette />
        </aside>
      </main>

      {/* 4. Mobile palette drawer */}
      {isMobilePaletteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Palet Soal Mobile"
          className="fixed inset-0 z-180 flex justify-end lg:hidden"
        >
          <div
            className="fixed inset-0 bg-ink/65 backdrop-blur-sm"
            onClick={() => setIsMobilePaletteOpen(false)}
          />
          <div className="relative z-10 flex h-full w-full max-w-xs flex-col overflow-y-auto border-l border-ink bg-paper p-4 shadow-paper-lg sm:max-w-sm">
            <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-serif text-lg font-bold text-ink">Navigasi Soal</h2>
              <button
                type="button"
                onClick={() => setIsMobilePaletteOpen(false)}
                aria-label="Tutup navigasi soal"
                className="flex h-9 w-9 items-center justify-center border border-ink text-ink hover:bg-ink hover:text-paper"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <QuestionPalette onSelectQuestion={() => setIsMobilePaletteOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExamPage({ params }: ExamPageProps) {
  return (
    <Suspense fallback={<ExamLoadingScreen />}>
      <ExamPlayer params={params} />
    </Suspense>
  );
}
