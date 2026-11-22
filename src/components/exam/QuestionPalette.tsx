'use client';

import React, { useState, useMemo } from 'react';
import { useExamStore } from '@/stores/use-exam-store';
import { ClientQuestionDTO } from '@/types/exam';

export type QuestionStatus = 'answered' | 'doubt' | 'unanswered';

export function getQuestionStatus(answer?: {
  selectedOptionId?: string | null;
  numericAnswer?: string | null;
  isDoubt?: boolean;
}): QuestionStatus {
  if (answer?.isDoubt) return 'doubt';
  const hasSelectedOption = Boolean(answer?.selectedOptionId);
  const hasNumericAnswer = Boolean(
    answer?.numericAnswer !== undefined &&
      answer?.numericAnswer !== null &&
      answer.numericAnswer.trim() !== ''
  );
  if (hasSelectedOption || hasNumericAnswer) return 'answered';
  return 'unanswered';
}

export function calculatePaletteStats(
  questions: { id: string }[],
  answers: Record<
    string,
    { selectedOptionId?: string | null; numericAnswer?: string | null; isDoubt?: boolean }
  >
) {
  let answered = 0;
  let doubt = 0;
  let remaining = 0;

  for (const q of questions) {
    const status = getQuestionStatus(answers[q.id]);
    if (status === 'doubt') {
      doubt++;
    } else if (status === 'answered') {
      answered++;
    } else {
      remaining++;
    }
  }

  return {
    answered,
    doubt,
    remaining,
    total: questions.length,
  };
}

export function filterQuestionsBySubtest(
  questions: ClientQuestionDTO[],
  activeTab: string
): ClientQuestionDTO[] {
  if (activeTab === 'Semua') {
    return questions;
  }
  return questions.filter((q) => q.category === activeTab);
}

export interface QuestionPaletteProps {
  className?: string;
  onSelectQuestion?: (index: number) => void;
}

export function QuestionPalette({ className = '', onSelectQuestion }: QuestionPaletteProps) {
  const questions = useExamStore((state) => state.questions);
  const answers = useExamStore((state) => state.answers);
  const currentIndex = useExamStore((state) => state.currentIndex);
  const setCurrentIndex = useExamStore((state) => state.setCurrentIndex);
  const getSubtests = useExamStore((state) => state.getSubtests);

  const subtests = useMemo(() => getSubtests(), [getSubtests, questions]);
  const [activeTab, setActiveTab] = useState<string>('Semua');

  // Filtered list of questions based on active subtest tab
  const displayedQuestions = useMemo(() => {
    return filterQuestionsBySubtest(questions, activeTab);
  }, [questions, activeTab]);

  // Global counts for all questions
  const stats = useMemo(() => {
    return calculatePaletteStats(questions, answers);
  }, [questions, answers]);

  const handleSelectQuestion = (questionId: string) => {
    const actualIndex = questions.findIndex((q) => q.id === questionId);
    if (actualIndex !== -1) {
      setCurrentIndex(actualIndex);
      onSelectQuestion?.(actualIndex);
    }
  };

  return (
    <aside
      aria-label="Navigasi Nomor Soal"
      className={`flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 ${className}`}
    >
      {/* Title & Stats Summary */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2.5">
          Nomor Soal
        </h3>

        {/* Status Indicators Pill Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
            <span className="font-extrabold text-base leading-none mb-0.5">{stats.answered}</span>
            <span className="text-[11px] font-medium">Terjawab</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
            <span className="font-extrabold text-base leading-none mb-0.5">{stats.doubt}</span>
            <span className="text-[11px] font-medium">Ragu-ragu</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            <span className="font-extrabold text-base leading-none mb-0.5">{stats.remaining}</span>
            <span className="text-[11px] font-medium">Sisa</span>
          </div>
        </div>
      </div>

      {/* Dynamic Subtest Tabs (if exam has 2 or more subtest categories) */}
      {subtests.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('Semua')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === 'Semua'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua ({questions.length})
          </button>
          {subtests.map((subtest) => {
            const count = questions.filter((q) => q.category === subtest).length;
            const isTabActive = activeTab === subtest;
            return (
              <button
                key={subtest}
                type="button"
                onClick={() => setActiveTab(subtest)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isTabActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {subtest} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Question Number Grid */}
      <div
        tabIndex={0}
        aria-label="Daftar Tombol Nomor Soal"
        className="flex-1 overflow-y-auto max-h-[calc(100vh-320px)] min-h-[180px] p-2.5 scroll-smooth focus:outline-none rounded-xl"
      >
        {displayedQuestions.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">Tidak ada soal pada subtes ini.</p>
        ) : (
          <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
            {displayedQuestions.map((q) => {
              const actualIndex = questions.findIndex((item) => item.id === q.id);
              const isActive = actualIndex === currentIndex;
              const status = getQuestionStatus(answers[q.id]);

              // Color styles matching requirements
              // Hijau = Terjawab, Kuning = Ragu-ragu, Abu = Belum, Border Biru = Aktif
              let statusClasses =
                'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700';

              if (status === 'doubt') {
                statusClasses =
                  'bg-amber-400 text-amber-950 font-semibold hover:bg-amber-500 border border-amber-500 shadow-xs';
              } else if (status === 'answered') {
                statusClasses =
                  'bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600 shadow-xs';
              }

              const activeClasses = isActive
                ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900 border-2 border-blue-600 font-extrabold bg-blue-50/80 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100 shadow-sm z-10'
                : '';

              const statusLabel =
                status === 'doubt'
                  ? 'Ragu-ragu'
                  : status === 'answered'
                  ? 'Terjawab'
                  : 'Belum dijawab';

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleSelectQuestion(q.id)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Soal nomor ${q.orderNumber}: ${statusLabel}${
                    isActive ? ', sedang dibuka' : ''
                  }`}
                  className={`aspect-square w-full rounded-xl text-sm sm:text-base flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusClasses} ${activeClasses}`}
                >
                  {q.orderNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend Information */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-3 flex flex-wrap items-center justify-between gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-emerald-600 inline-block" />
          <span>Terjawab</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-amber-400 inline-block" />
          <span>Ragu-ragu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 inline-block" />
          <span>Belum</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm border-2 border-blue-600 bg-white dark:bg-slate-900 inline-block" />
          <span>Aktif</span>
        </div>
      </div>
    </aside>
  );
}

export default QuestionPalette;
