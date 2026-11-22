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
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[400px]">
        <HelpCircle className="w-12 h-12 text-slate-400 mb-3" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Tidak ada soal yang tersedia saat ini.
        </p>
      </div>
    );
  }

  const isDoubt = Boolean(currentAnswer?.isDoubt);
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex >= questions.length - 1;
  const isNumeric = currentQuestion.questionType === 'NUMERIC_INPUT';

  return (
    <article
      aria-label={`Soal nomor ${currentIndex + 1}`}
      className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between min-h-[550px] overflow-hidden ${className}`}
    >
      {/* Top Bar: Question Meta & Doubt Toggle */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
            Soal No. {currentIndex + 1}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-sm">
            / {questions.length}
          </span>

          {/* Subtest / Category Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {currentQuestion.category}
          </span>

          {/* Subtopic Badge */}
          {currentQuestion.subTopic && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {currentQuestion.subTopic}
            </span>
          )}

          {/* Question Type Badge */}
          {isNumeric && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <Hash className="w-3 h-3" />
              Isian Singkat
            </span>
          )}
        </div>

        {/* Quick Doubt Toggle */}
        <button
          type="button"
          onClick={() => toggleDoubt(currentQuestion.id)}
          aria-pressed={isDoubt}
          className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-colors touch-manipulation ${
            isDoubt
              ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-300 dark:bg-slate-800 dark:text-amber-400 dark:border-amber-700/80 dark:hover:bg-amber-950/30'
          }`}
        >
          <Flag className={`w-4 h-4 ${isDoubt ? 'fill-current' : ''}`} />
          {isDoubt ? 'Ragu-Ragu Aktif' : 'Tandai Ragu-Ragu'}
        </button>
      </div>

      {/* Main Content Area: Question Text, Image & Answers */}
      <div className="p-5 sm:p-7 flex-1 overflow-y-auto">
        {/* Question Text with KaTeX */}
        <div className="text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          <MathRenderer content={currentQuestion.text} />
        </div>

        {/* Question Image if present */}
        {currentQuestion.imageUrl && (
          <div className="my-5 flex justify-center">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2 max-w-full">
              <img
                src={currentQuestion.imageUrl}
                alt={`Ilustrasi Soal ${currentIndex + 1}`}
                className="max-h-80 sm:max-h-96 w-auto object-contain rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Polymorphic Answer Input Area */}
        <div className="mt-8">
          {isNumeric ? (
            /* NUMERIC INPUT: Short Answer for Math Olympiad */
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl p-5 sm:p-6 max-w-xl">
              <label
                htmlFor="olympiad-numeric-input"
                className="block text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mb-2"
              >
                Jawaban Isian Singkat:
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="olympiad-numeric-input"
                  type="text"
                  inputMode="numeric"
                  value={currentAnswer?.numericAnswer ?? ''}
                  onChange={handleNumericChange}
                  placeholder="Ketik angka jawaban..."
                  className="w-full text-2xl sm:text-3xl font-mono font-bold text-center tracking-wider px-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 text-slate-900 dark:text-white transition-all shadow-inner"
                  autoComplete="off"
                />
                {currentAnswer?.numericAnswer && (
                  <button
                    type="button"
                    onClick={handleClearNumeric}
                    aria-label="Hapus jawaban angka"
                    className="p-3 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Ketikkan angka jawaban akhir Anda (contoh: 42, -5, 3.14). Pastikan format sesuai dengan instruksi soal.
              </p>
            </div>
          ) : (
            /* MULTIPLE CHOICE: Responsive Touch Targets >= 44px with KaTeX & Badge */
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
                    className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 sm:gap-4 transition-all touch-manipulation group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Letter Badge: A, B, C, D, E */}
                    <span
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-slate-700 group-hover:text-blue-800 dark:group-hover:text-white'
                      }`}
                    >
                      {option.key}
                    </span>

                    {/* Option Text with KaTeX Formula Support */}
                    <div className="flex-1 min-w-0 pt-1 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                      <MathRenderer content={option.text} />

                      {/* Optional Option Image */}
                      {option.imageUrl && (
                        <div className="mt-2.5">
                          <img
                            src={option.imageUrl}
                            alt={`Pilihan ${option.key}`}
                            className="max-h-40 rounded-lg border border-slate-200 dark:border-slate-700 object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    {/* Selected Checkmark Indicator */}
                    {isSelected && (
                      <span className="self-center shrink-0 text-blue-600 dark:text-blue-400">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer: Prev, Doubt, Next */}
      <footer className="px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={goToPrevQuestion}
          disabled={isFirstQuestion}
          aria-label="Soal sebelumnya"
          className={`min-h-[44px] min-w-[120px] px-4 py-2.5 rounded-lg border font-medium text-sm flex items-center justify-center gap-2 transition-all touch-manipulation ${
            isFirstQuestion
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 shadow-xs active:scale-98'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        {/* Center doubt status button on larger screens */}
        <button
          type="button"
          onClick={() => toggleDoubt(currentQuestion.id)}
          aria-pressed={isDoubt}
          className={`sm:inline-flex hidden min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-semibold items-center gap-2 border transition-all touch-manipulation ${
            isDoubt
              ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-300 dark:bg-slate-800 dark:text-amber-400 dark:border-amber-700/80 dark:hover:bg-amber-950/30'
          }`}
        >
          <Flag className={`w-4 h-4 ${isDoubt ? 'fill-current' : ''}`} />
          {isDoubt ? 'Ragu-Ragu Aktif' : 'Ragu-Ragu'}
        </button>

        <button
          type="button"
          onClick={goToNextQuestion}
          disabled={isLastQuestion}
          aria-label="Soal selanjutnya"
          className={`min-h-[44px] min-w-[120px] px-4 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all touch-manipulation ${
            isLastQuestion
              ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow active:scale-98'
          }`}
        >
          Selanjutnya
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </article>
  );
}
