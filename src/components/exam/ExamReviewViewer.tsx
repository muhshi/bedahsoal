'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ExamReviewDTO, QuestionReviewDTO } from '@/types/exam';
import { MathRenderer } from '@/components/exam/MathRenderer';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Award,
  RotateCcw,
  Home,
  Check,
  X,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ExamReviewViewerProps {
  review: ExamReviewDTO;
  onRetakeExam?: () => void;
}

type FilterType = 'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED';

export function ExamReviewViewer({ review, onRetakeExam }: ExamReviewViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<FilterType>('ALL');

  const filteredQuestions = useMemo(() => {
    return review.questions.filter((q) => {
      if (filter === 'ALL') return true;
      const isAnswered = Boolean(q.userAnswer?.selectedOptionId || q.userAnswer?.numericAnswer);
      if (filter === 'UNANSWERED') return !isAnswered;
      if (filter === 'CORRECT') return isAnswered && q.userAnswer?.isCorrect;
      if (filter === 'WRONG') return isAnswered && !q.userAnswer?.isCorrect;
      return true;
    });
  }, [review.questions, filter]);

  // Ensure currentIndex stays within bounds of filtered list
  const activeQuestion: QuestionReviewDTO | undefined =
    filteredQuestions[currentIndex] || filteredQuestions[0] || review.questions[0];

  const accuracyPercent = Math.round(
    (review.totalCorrect / Math.max(review.totalQuestions, 1)) * 100
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Header Ringkasan & Navigasi */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Kembali ke Beranda"
              >
                <Home className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Mode Pembahasan
                  </span>
                  <span className="text-xs text-slate-400">&bull;</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {review.title}
                  </span>
                </div>
                <h1 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                  Evaluasi Hasil &amp; Pembahasan Soal
                </h1>
              </div>
            </div>

            {/* Score & Passing Grade Snapshot */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80">
                <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Total Skor:</span>
                <span className="text-lg font-mono font-black text-blue-700 dark:text-blue-300">
                  {review.totalScore}
                </span>
              </div>

              {review.isPassed !== undefined && (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    review.isPassed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{review.isPassed ? 'LULUS PASSING GRADE' : 'BELUM MEMENUHI PG'}</span>
                </div>
              )}

              {onRetakeExam && (
                <button
                  onClick={onRetakeExam}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Ujian</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics & Subtest Breakdown Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-500 dark:text-slate-400">
                Benar: <strong className="text-emerald-600 dark:text-emerald-400">{review.totalCorrect}</strong>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Salah: <strong className="text-rose-600 dark:text-rose-400">{review.totalWrong}</strong>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Kosong: <strong className="text-slate-600 dark:text-slate-400">{review.totalUnanswered}</strong>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Akurasi: <strong className="text-blue-600 dark:text-blue-400">{accuracyPercent}%</strong>
              </span>
            </div>

            {/* Subtests */}
            {review.subtestScores && (
              <div className="flex items-center gap-3">
                {Object.entries(review.subtestScores).map(([sub, sc]) => (
                  <span
                    key={sub}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-semibold"
                  >
                    {sub}: {sc}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Content Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Review Pane (3 Cols) */}
          <main className="lg:col-span-3 space-y-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => {
                  setFilter('ALL');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filter === 'ALL'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                Semua Soal ({review.totalQuestions})
              </button>
              <button
                onClick={() => {
                  setFilter('WRONG');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filter === 'WRONG'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-800 hover:bg-rose-50'
                }`}
              >
                Salah Saja ({review.totalWrong})
              </button>
              <button
                onClick={() => {
                  setFilter('CORRECT');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filter === 'CORRECT'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
                }`}
              >
                Benar Saja ({review.totalCorrect})
              </button>
              <button
                onClick={() => {
                  setFilter('UNANSWERED');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filter === 'UNANSWERED'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                Tidak Dijawab ({review.totalUnanswered})
              </button>
            </div>

            {/* Active Question Box */}
            {activeQuestion ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
                {/* Question Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                      {activeQuestion.orderNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {activeQuestion.category}
                      </span>
                      {activeQuestion.subTopic && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          &bull; {activeQuestion.subTopic}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Answer Badge */}
                  <div>
                    {!activeQuestion.userAnswer?.selectedOptionId &&
                    !activeQuestion.userAnswer?.numericAnswer ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Tidak Dijawab (0 Poin)
                      </span>
                    ) : activeQuestion.userAnswer.isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Benar (+{activeQuestion.userAnswer.scoreAwarded} Poin)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                        <XCircle className="w-3.5 h-3.5" />
                        Salah ({activeQuestion.userAnswer.scoreAwarded} Poin)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Stem (Text & KaTeX) */}
                <div className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-100">
                  <MathRenderer content={activeQuestion.text} />
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pilihan Jawaban
                  </span>

                  <div className="space-y-2.5">
                    {activeQuestion.options.map((opt) => {
                      const isSelected = activeQuestion.userAnswer?.selectedOptionId === opt.id;
                      const isCorrectAnswer = opt.isCorrect;

                      let borderClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
                      let badgeTag = null;

                      if (isCorrectAnswer) {
                        borderClass = 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30';
                        badgeTag = (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white">
                            <Check className="w-3 h-3" />
                            Kunci Jawaban ({opt.score} Poin)
                          </span>
                        );
                      }

                      if (isSelected && !isCorrectAnswer) {
                        borderClass = 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30';
                        badgeTag = (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white">
                            <X className="w-3 h-3" />
                            Pilihan Anda ({opt.score} Poin)
                          </span>
                        );
                      }

                      if (isSelected && isCorrectAnswer) {
                        badgeTag = (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white">
                            <Check className="w-3 h-3" />
                            Pilihan Anda &amp; Kunci Jawaban ({opt.score} Poin)
                          </span>
                        );
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 ${borderClass}`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-sm flex items-center justify-center shrink-0">
                              {opt.key}
                            </span>
                            <div className="text-sm pt-0.5 leading-relaxed text-slate-800 dark:text-slate-200">
                              <MathRenderer content={opt.text} />
                            </div>
                          </div>
                          {badgeTag && <div className="shrink-0">{badgeTag}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step-by-Step KaTeX Explanation Box */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Pembahasan Mendalam &amp; Solusi Cepat</span>
                    </div>

                    <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {activeQuestion.explanation ? (
                        <MathRenderer content={activeQuestion.explanation} />
                      ) : (
                        <p className="italic text-slate-400">
                          Pembahasan untuk soal ini sedang diperbarui oleh tim akademisi BedahSoal.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Between Filtered Questions */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  <span className="text-xs text-slate-500 font-medium">
                    Soal {currentIndex + 1} dari {filteredQuestions.length}
                  </span>

                  <button
                    disabled={currentIndex >= filteredQuestions.length - 1}
                    onClick={() =>
                      setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Tidak Ada Soal pada Filter Ini
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pilih tab filter lain untuk melihat evaluasi soal.
                </p>
              </div>
            )}
          </main>

          {/* Right Palette Sidebar (1 Col) */}
          <aside className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Palet Review Nomor
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredQuestions.length} Soal
                </span>
              </div>

              {/* Grid of Question Numbers */}
              <div className="grid grid-cols-5 gap-2 max-h-[50vh] overflow-y-auto p-1">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = Boolean(q.userAnswer?.selectedOptionId || q.userAnswer?.numericAnswer);
                  const isCorrect = isAnswered && q.userAnswer?.isCorrect;

                  let colorClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
                  if (isAnswered) {
                    colorClass = isCorrect
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-rose-500 text-white font-bold';
                  }

                  if (isCurrent) {
                    colorClass += ' ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg text-xs font-mono transition-transform active:scale-95 flex items-center justify-center ${colorClass}`}
                      title={`Nomor ${q.orderNumber}: ${isAnswered ? (isCorrect ? 'Benar' : 'Salah') : 'Kosong'}`}
                    >
                      {q.orderNumber}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
                  <span>Jawaban Benar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-rose-500 shrink-0" />
                  <span>Jawaban Salah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700 shrink-0" />
                  <span>Tidak Dijawab</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default ExamReviewViewer;
