'use client';

import React, { useState, useEffect, useCallback, use, Suspense } from 'react';
import { useExamStore } from '@/stores/use-exam-store';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { QuestionViewer } from '@/components/exam/QuestionViewer';
import { QuestionPalette } from '@/components/exam/QuestionPalette';
import { ExamSessionInitDTO } from '@/types/exam';
import { get, set as idbSet } from 'idb-keyval';
import {
  Wifi,
  WifiOff,
  Database,
  X,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Award,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface ExamPageProps {
  params: Promise<{ sessionId: string }>;
}

function ExamLoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="flex flex-col items-center max-w-sm text-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Mempersiapkan Sesi Ujian...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
  const [isOnline, setIsOnline] = useState(true);
  const [isSavedLocally, setIsSavedLocally] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    totalScore: number;
    subtestScores?: Record<string, number>;
    isPassed?: boolean;
    submittedAt?: string;
  } | null>(null);

  const answers = useExamStore((state) => state.answers);

  // Online / Offline network event monitoring
  useEffect(() => {
    setIsOnline(navigator.onLine);

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

    async function loadExamSession() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const res = await fetch(`/api/sessions/${sessionId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Gagal memuat sesi ujian');
        }

        const initDTO = data as ExamSessionInitDTO;

        // Check if there are local offline answers cached in IndexedDB
        let mergedAnswers = initDTO.initialAnswers || {};
        try {
          const cachedAnswers = await get(`cbt_session_${sessionId}_answers`);
          if (cachedAnswers && typeof cachedAnswers === 'object') {
            mergedAnswers = { ...mergedAnswers, ...cachedAnswers };
          }
        } catch {
          // IndexedDB read error fallback
        }

        if (isMounted) {
          useExamStore.getState().initExam({
            sessionId: initDTO.sessionId,
            tryoutId: initDTO.tryoutId,
            title: initDTO.title,
            mode: initDTO.mode,
            deadline: initDTO.deadline,
            serverTime: initDTO.serverTime,
            questions: initDTO.questions,
            initialAnswers: mergedAnswers,
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

    let timeoutId: NodeJS.Timeout;
    try {
      setIsSavedLocally(false);
      timeoutId = setTimeout(async () => {
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
    } catch {
      // Ignore sync error
    }

    return () => clearTimeout(timeoutId);
  }, [sessionId, answers, isLoading]);

  // Keyboard Navigation: Arrow Left/Right, Keys A-E, Key R for Doubt
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger hotkeys if user is currently typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return;
      }

      // Ignore modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

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
        if (currentQ) {
          store.toggleDoubt(currentQ.id);
        }
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
  }, []);

  // Submit Handler
  const handleSubmitExam = useCallback(async () => {
    try {
      const currentAnswers = useExamStore.getState().answers;

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
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan submit';
      alert(msg);
    }
  }, [sessionId]);

  // Loading Screen
  if (isLoading) {
    return <ExamLoadingScreen />;
  }

  // Error Screen
  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/60 shadow-lg text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Gagal Memuat Ujian
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
            {loadError}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Completion / Submission Success Modal
  if (isSubmitted && submitResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 text-center animate-in fade-in zoom-in duration-200">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Ujian Berhasil Diserahkan!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Seluruh jawaban Anda telah dinilai oleh server secara otomatis.
          </p>

          {/* Score Badge */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 mb-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Total Skor Akhir
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1 mb-2">
              {submitResult.totalScore}
            </div>

            {/* Passing status if evaluated */}
            {submitResult.isPassed !== undefined && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  submitResult.isPassed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                {submitResult.isPassed ? 'LULUS PASSING GRADE' : 'BELUM MEMENUHI PASSING GRADE'}
              </span>
            )}

            {/* Subtest Scores Breakdown */}
            {submitResult.subtestScores && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-2">
                {Object.entries(submitResult.subtestScores).map(([subtest, score]) => (
                  <div key={subtest} className="text-center">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                      {subtest}
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                      {score}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-xs"
          >
            Selesai & Kembali ke Beranda
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 select-none">
      {/* 1. Exam Header (Sticky top) */}
      <ExamHeader
        onSubmit={handleSubmitExam}
        onTimeUp={handleSubmitExam}
        onTogglePalette={() => setIsMobilePaletteOpen((prev) => !prev)}
      />

      {/* 2. Network & Storage Status Sub-bar */}
      <div className="bg-slate-200/80 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Offline / Online banner */}
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <Wifi className="w-3.5 h-3.5" />
                Terhubung (Online)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold animate-pulse">
                <WifiOff className="w-3.5 h-3.5" />
                Mode Offline (Jawaban disimpan di memori lokal)
              </span>
            )}
          </div>

          {/* Local storage sync indicator */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Database className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>
              {isSavedLocally ? 'Tersimpan di perangkat' : 'Menyimpan...'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Fullscreen CBT Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Center / Left: Polymorphic Question Viewer */}
        <section
          aria-label="Lembar Soal Ujian"
          className="lg:col-span-8 xl:col-span-9 w-full"
        >
          <QuestionViewer />
        </section>

        {/* Right: Desktop Sticky Question Palette */}
        <aside
          aria-label="Palet Soal Desktop"
          className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20"
        >
          <QuestionPalette />
        </aside>
      </main>

      {/* 4. Mobile Drawer for Question Palette */}
      {isMobilePaletteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Palet Soal Mobile"
          className="lg:hidden fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobilePaletteOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 h-full p-4 shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                Navigasi Soal
              </h2>
              <button
                type="button"
                onClick={() => setIsMobilePaletteOpen(false)}
                aria-label="Tutup navigasi soal"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <QuestionPalette
              onSelectQuestion={() => setIsMobilePaletteOpen(false)}
            />
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
