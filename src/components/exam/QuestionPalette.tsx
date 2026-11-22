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

  const subtests = useMemo(
    () => Array.from(new Set(questions.map((question) => question.category))),
    [questions]
  );
  const [activeTab, setActiveTab] = useState<string>('Semua');

  const displayedQuestions = useMemo(() => {
    return filterQuestionsBySubtest(questions, activeTab);
  }, [questions, activeTab]);

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

  const tabClass = (isActive: boolean) =>
    `whitespace-nowrap border px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-colors ${
      isActive
        ? 'border-ink bg-ink text-paper'
        : 'border-line-strong bg-paper text-ink-2 hover:border-ink hover:text-ink'
    }`;

  return (
    <aside
      aria-label="Navigasi Nomor Soal"
      className={`flex flex-col border border-ink bg-white shadow-paper ${className}`}
    >
      {/* Title & stats summary */}
      <div className="border-b border-line-strong bg-paper-2 px-4 py-3">
        <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.18em] text-red-stamp">
          Indeks Lembar Jawab
        </p>
        <h3 className="mt-1 font-serif text-lg font-bold text-ink">Nomor Soal</h3>

        <div className="mt-3 grid grid-cols-3 gap-px border border-ink bg-ink text-center">
          <div className="bg-white p-2">
            <strong className="block font-serif text-lg font-bold leading-none text-ink">
              {stats.answered}
            </strong>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-green-stamp">
              Terjawab
            </span>
          </div>
          <div className="bg-white p-2">
            <strong className="block font-serif text-lg font-bold leading-none text-ink">
              {stats.doubt}
            </strong>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-amber-flag">
              Ragu-ragu
            </span>
          </div>
          <div className="bg-white p-2">
            <strong className="block font-serif text-lg font-bold leading-none text-ink">
              {stats.remaining}
            </strong>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-ink-3">
              Sisa
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic subtest tabs */}
      {subtests.length > 1 && (
        <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto border-b border-line px-3 py-2.5">
          <button type="button" onClick={() => setActiveTab('Semua')} className={tabClass(activeTab === 'Semua')}>
            Semua ({questions.length})
          </button>
          {subtests.map((subtest) => {
            const count = questions.filter((q) => q.category === subtest).length;
            return (
              <button
                key={subtest}
                type="button"
                onClick={() => setActiveTab(subtest)}
                className={tabClass(activeTab === subtest)}
              >
                {subtest} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Question number grid */}
      <div
        tabIndex={0}
        aria-label="Daftar Tombol Nomor Soal"
        className="max-h-[calc(100vh-360px)] min-h-[180px] flex-1 overflow-y-auto p-3 focus:outline-none"
      >
        {displayedQuestions.length === 0 ? (
          <p className="py-6 text-center font-mono text-[10px] text-ink-3">
            Tidak ada soal pada subtes ini.
          </p>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {displayedQuestions.map((q) => {
              const actualIndex = questions.findIndex((item) => item.id === q.id);
              const isActive = actualIndex === currentIndex;
              const status = getQuestionStatus(answers[q.id]);

              let statusClasses =
                'border border-line bg-paper text-ink-2 hover:border-ink hover:text-ink';
              if (status === 'doubt') {
                statusClasses = 'border border-amber-flag bg-amber-flag text-ink hover:bg-amber-flag/80';
              } else if (status === 'answered') {
                statusClasses = 'border border-ink bg-ink text-paper hover:bg-red-stamp';
              }

              const activeClasses = isActive
                ? 'border-2 border-red-stamp font-bold text-red-stamp shadow-[2px_2px_0px_#c4402a]'
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
                  className={`flex aspect-square w-full items-center justify-center font-mono text-xs transition-all sm:text-sm ${statusClasses} ${activeClasses}`}
                >
                  {q.orderNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line bg-paper-2 px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-ink-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 border border-ink bg-ink" /> Terjawab
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 border border-amber-flag bg-amber-flag" /> Ragu
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 border border-line bg-paper" /> Belum
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 border-2 border-red-stamp bg-white" /> Aktif
        </span>
      </div>
    </aside>
  );
}

export default QuestionPalette;
