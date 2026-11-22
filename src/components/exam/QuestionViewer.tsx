'use client';

import React, { useCallback } from 'react';
import { useExamStore } from '@/stores/use-exam-store';
import { MathRenderer } from '@/components/exam/MathRenderer';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  X,
  HelpCircle,
  Hash,
} from 'lucide-react';

export function isOptionSelected(
  selectedOptionId: string | null | undefined,
  optionId: string
): boolean {
  return selectedOptionId === optionId;
}

export function isValidNumericValue(value: string | null | undefined): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (trimmed === '') return false;
  // Validates integer, decimals, or negative numbers (e.g. 42, -5, 3.14, -0.5)
  return /^-?\d+(\.\d+)?$/.test(trimmed);
}

export interface QuestionViewerProps {
  className?: string;
}

export function QuestionViewer({ className = '' }: QuestionViewerProps) {
  const questions = useExamStore((state) => state.questions);
  const currentIndex = useExamStore((state) => state.currentIndex);
  const answers = useExamStore((state) => state.answers);
  const selectOption = useExamStore((state) => state.selectOption);
  const setNumericAnswer = useExamStore((state) => state.setNumericAnswer);
  const toggleDoubt = useExamStore((state) => state.toggleDoubt);
  const goToNextQuestion = useExamStore((state) => state.goToNextQuestion);
  const goToPrevQuestion = useExamStore((state) => state.goToPrevQuestion);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleNumericChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!currentQuestion) return;
      setNumericAnswer(currentQuestion.id, e.target.value);
    },
    [currentQuestion, setNumericAnswer]
  );

  const handleClearNumeric = useCallback(() => {
    if (!currentQuestion) return;
    setNumericAnswer(currentQuestion.id, null);
  }, [currentQuestion, setNumericAnswer]);

  if (!currentQuestion) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center border border-ink bg-paper p-12 text-center">
        <HelpCircle className="mb-3 h-12 w-12 text-ink-3" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-wider text-ink-2">
          Tidak ada soal yang tersedia saat ini.
        </p>
      </div>
    );
  }

  const isDoubt = Boolean(currentAnswer?.isDoubt);
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex >= questions.length - 1;
  const isNumeric = currentQuestion.questionType === 'NUMERIC_INPUT';

  const doubtButtonClass = `inline-flex min-h-11 items-center gap-2 border px-3 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
    isDoubt
      ? 'border-amber-flag bg-amber-flag text-ink'
      : 'border-amber-flag bg-white text-amber-flag hover:bg-amber-flag/10'
  }`;

  return (
    <article
      aria-label={`Soal nomor ${currentIndex + 1}`}
      className={`flex min-h-[550px] flex-col justify-between overflow-hidden border border-ink bg-white shadow-paper ${className}`}
    >
      {/* Question meta & doubt toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper-2 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-serif text-xl font-bold text-ink sm:text-2xl">
            Soal No. {currentIndex + 1}
          </span>
          <span className="font-mono text-xs text-ink-3">/ {questions.length}</span>

          <span className="inline-flex items-center border border-ink bg-ink px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-paper">
            {currentQuestion.category}
          </span>

          {currentQuestion.subTopic && (
            <span className="inline-flex items-center border border-line-strong bg-paper px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-2">
              {currentQuestion.subTopic}
            </span>
          )}

          {isNumeric && (
            <span className="inline-flex items-center gap-1 border border-blue-ink px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-blue-ink">
              <Hash className="h-3 w-3" aria-hidden="true" />
              Isian Singkat
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleDoubt(currentQuestion.id)}
          aria-pressed={isDoubt}
          className={doubtButtonClass}
        >
          <Flag className={`h-4 w-4 ${isDoubt ? 'fill-current' : ''}`} aria-hidden="true" />
          {isDoubt ? 'Ragu-ragu Aktif' : 'Tandai Ragu-ragu'}
        </button>
      </div>

      {/* Question body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        <div className="mb-6 font-serif text-base leading-relaxed text-ink sm:text-lg">
          <MathRenderer content={currentQuestion.text} />
        </div>

        {currentQuestion.imageUrl && (
          <div className="my-5 flex justify-center">
            <div className="max-w-full border border-line bg-paper p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentQuestion.imageUrl}
                alt={`Ilustrasi Soal ${currentIndex + 1}`}
                className="h-auto max-h-80 w-auto max-w-full object-contain sm:max-h-96"
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          {isNumeric ? (
            <div className="max-w-xl border border-ink bg-paper p-5 sm:p-6">
              <label
                htmlFor="olympiad-numeric-input"
                className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-ink"
              >
                Jawaban Isian Singkat
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="olympiad-numeric-input"
                  type="text"
                  inputMode="numeric"
                  value={currentAnswer?.numericAnswer ?? ''}
                  onChange={handleNumericChange}
                  placeholder="Ketik angka jawaban..."
                  className="w-full border-2 border-ink bg-white px-4 py-3 text-center font-mono text-2xl font-bold tracking-wider text-ink outline-none focus:border-red-stamp sm:text-3xl"
                  autoComplete="off"
                />
                {currentAnswer?.numericAnswer && (
                  <button
                    type="button"
                    onClick={handleClearNumeric}
                    aria-label="Hapus jawaban angka"
                    className="flex-none border border-ink p-3 text-ink-3 hover:border-red-stamp hover:text-red-stamp"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-ink-3">
                Ketikkan angka jawaban akhir (contoh: 42, -5, 3.14) sesuai instruksi soal.
              </p>
            </div>
          ) : (
            <div
              role="radiogroup"
              aria-label={`Pilihan jawaban untuk soal nomor ${currentIndex + 1}`}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => {
                const isSelected = isOptionSelected(
                  currentAnswer?.selectedOptionId,
                  option.id
                );

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => selectOption(currentQuestion.id, option.id)}
                    className={`group flex min-h-12 w-full items-start gap-3 border p-3.5 text-left transition-all sm:gap-4 sm:p-4 ${
                      isSelected
                        ? 'border-ink bg-paper-2 shadow-[3px_3px_0px_#ded4bf]'
                        : 'border-line bg-white hover:border-ink hover:bg-paper'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center border font-mono text-sm font-bold transition-colors sm:h-9 sm:w-9 sm:text-base ${
                        isSelected
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line-strong bg-paper text-ink-2 group-hover:border-ink group-hover:bg-ink group-hover:text-paper'
                      }`}
                    >
                      {option.key}
                    </span>

                    <div className="min-w-0 flex-1 pt-1 font-serif text-sm leading-relaxed text-ink sm:text-base">
                      <MathRenderer content={option.text} />

                      {option.imageUrl && (
                        <div className="mt-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={option.imageUrl}
                            alt={`Pilihan ${option.key}`}
                            className="max-h-40 border border-line object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <span className="self-center text-red-stamp" aria-hidden="true">
                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Navigation footer */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper-2 px-5 py-4">
        <button
          type="button"
          onClick={goToPrevQuestion}
          disabled={isFirstQuestion}
          aria-label="Soal sebelumnya"
          className={`inline-flex min-h-11 min-w-[120px] items-center justify-center gap-2 border px-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
            isFirstQuestion
              ? 'cursor-not-allowed border-line bg-paper text-ink-3 opacity-60'
              : 'border-ink bg-white text-ink hover:bg-ink hover:text-paper active:scale-98'
          }`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Sebelumnya
        </button>

        <button
          type="button"
          onClick={() => toggleDoubt(currentQuestion.id)}
          aria-pressed={isDoubt}
          className={`hidden min-h-11 items-center gap-2 border px-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors sm:inline-flex ${doubtButtonClass}`}
        >
          <Flag className={`h-4 w-4 ${isDoubt ? 'fill-current' : ''}`} aria-hidden="true" />
          {isDoubt ? 'Ragu-ragu Aktif' : 'Ragu-ragu'}
        </button>

        <button
          type="button"
          onClick={goToNextQuestion}
          disabled={isLastQuestion}
          aria-label="Soal selanjutnya"
          className={`inline-flex min-h-11 min-w-[120px] items-center justify-center gap-2 border px-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
            isLastQuestion
              ? 'cursor-not-allowed border-line bg-paper text-ink-3 opacity-60'
              : 'border-ink bg-ink text-paper shadow-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-red-stamp active:translate-x-0 active:translate-y-0'
          }`}
        >
          Selanjutnya
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}

export default QuestionViewer;
