'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ExamReviewDTO, QuestionReviewDTO } from '@/types/exam';
import { MathRenderer } from '@/components/exam/MathRenderer';
import {
  Check,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trophy,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { LeaderboardView } from '@/components/leaderboard/LeaderboardView';
import { StampBadge } from '@/components/ui/StampBadge';

interface ExamReviewViewerProps {
  review: ExamReviewDTO;
  onRetakeExam?: () => void;
}

type FilterType = 'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED';

export function getRemedialQuestions(questions: QuestionReviewDTO[]): QuestionReviewDTO[] {
  return questions.filter((q) => {
    if (!q.userAnswer) return true;
    const isAnswered = Boolean(q.userAnswer.selectedOptionId || q.userAnswer.numericAnswer);
    if (!isAnswered) return true;
    if (!q.userAnswer.isCorrect) return true;
    if (q.userAnswer.isDoubt) return true;
    return false;
  });
}

export function isDrillAnswerCorrect(
  question: QuestionReviewDTO,
  optionId: string
): boolean {
  const chosenOpt = question.options.find((o) => o.id === optionId);
  if (!chosenOpt) return false;
  if (chosenOpt.isCorrect === true) return true;
  if (question.correctOptionKey && chosenOpt.key === question.correctOptionKey) return true;
  const maxScore = Math.max(...question.options.map((o) => o.score), 0);
  return maxScore > 0 && chosenOpt.score === maxScore;
}

export function ExamReviewViewer({ review, onRetakeExam }: ExamReviewViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDrillMode, setIsDrillMode] = useState(false);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillSolved, setDrillSolved] = useState<Set<string>>(new Set());

  const remedialQuestions = useMemo(() => {
    return getRemedialQuestions(review.questions);
  }, [review.questions]);

  const filteredQuestions = useMemo(() => {
    if (isDrillMode) {
      return remedialQuestions;
    }
    return review.questions.filter((q) => {
      if (filter === 'ALL') return true;
      const isAnswered = Boolean(q.userAnswer?.selectedOptionId || q.userAnswer?.numericAnswer);
      if (filter === 'UNANSWERED') return !isAnswered;
      if (filter === 'CORRECT') return isAnswered && q.userAnswer?.isCorrect;
      if (filter === 'WRONG') return isAnswered && !q.userAnswer?.isCorrect;
      return true;
    });
  }, [review.questions, filter, isDrillMode, remedialQuestions]);

  const handleSelectDrillOption = (question: QuestionReviewDTO, optionId: string) => {
    setDrillAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    const isCorrect = isDrillAnswerCorrect(question, optionId);
    if (isCorrect) {
      setDrillSolved((prev) => {
        const next = new Set(prev);
        next.add(question.id);
        return next;
      });
    }
  };

  // Ensure currentIndex stays within bounds of filtered list
  const activeQuestion: QuestionReviewDTO | undefined =
    filteredQuestions[currentIndex] || filteredQuestions[0] || review.questions[0];

  const accuracyPercent = Math.round(
    (review.totalCorrect / Math.max(review.totalQuestions, 1)) * 100
  );

  return (
    <div className="min-h-screen bg-[var(--paper,#f3efe3)] text-[var(--ink,#191713)] flex flex-col selection:bg-[#c4402a] selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <header className="sticky top-0 z-60 bg-[#f3efe3]/95 backdrop-blur-md border-b border-[#d2c8b2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#191713] bg-[#fbf8f0] hover:bg-[#eae3d2] text-[#191713] font-mono text-[10.5px] uppercase tracking-wider transition"
            >
              <span>&larr;</span>
              <span>Rapor</span>
            </Link>
            <div className="hidden sm:block">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#7a7365] block">
                Evaluasi Pengerjaan
              </span>
              <span className="font-serif text-sm font-bold text-[#191713] truncate max-w-sm block">
                {review.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {remedialQuestions.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setIsDrillMode((prev) => !prev);
                  setCurrentIndex(0);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#191713] font-mono text-xs font-semibold tracking-wider uppercase transition shadow-[2px_2px_0px_#d2c8b2] cursor-pointer ${
                  isDrillMode
                    ? 'bg-[#c4402a] text-[#f3efe3]'
                    : 'bg-[#fbf8f0] text-[#191713] hover:bg-[#eae3d2]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isDrillMode
                    ? 'Keluar Drill'
                    : `Drill Soal Salah (${remedialQuestions.length})`}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsLeaderboardOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#191713] bg-[#fbf8f0] hover:bg-[#eae3d2] text-[#191713] font-mono text-xs font-semibold tracking-wider uppercase transition shadow-[2px_2px_0px_#d2c8b2] cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-[#b67a18]" />
              <span>Peringkat</span>
            </button>

            {onRetakeExam && (
              <button
                type="button"
                onClick={onRetakeExam}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#c4402a] transition shadow-[2px_2px_0px_#b9ac91] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6 flex-1">
        {/* Top Result Card (DeepSeek result-card design) */}
        <div className="border border-[#191713] bg-[#fbf8f0] p-6 sm:p-8 shadow-paper relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#c4402a] font-bold">
                Hasil Simulasi · {review.totalQuestions} Butir Soal
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#191713] mt-1.5">
                {review.isPassed ? 'Kerja bagus. Ambang batas terlampaui.' : 'Evaluasi lembar ujian selesai.'}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#4b463d] mt-2 max-w-xl leading-relaxed">
                Skor dihitung berdasarkan sistem penilaian resmi. Telusuri pembahasan soal untuk melihat langkah pengerjaan yang keliru.
              </p>
            </div>

            {/* Score & Stamp Badge */}
            <div className="flex items-center gap-5 shrink-0 self-start lg:self-auto">
              <div className="text-left sm:text-right">
                <span className="font-serif text-4xl sm:text-5xl font-extrabold text-[#191713] block leading-none">
                  {review.totalScore}
                </span>
                <span className="font-mono text-[10px] text-[#7a7365] uppercase tracking-wider block mt-1">
                  Total Poin Diperoleh
                </span>
              </div>
              {review.isPassed !== undefined && (
                <div>
                  <StampBadge
                    label={review.isPassed ? 'LULUS PG' : 'BELUM MEMENUHI PG'}
                    variant={review.isPassed ? 'green' : 'red'}
                    rotate={-2}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Subtests & Stats Breakdown Ledger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#d2c8b2]">
            <div className="border border-[#d2c8b2] bg-[#f3efe3] p-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365] block">Benar</span>
              <b className="font-serif text-xl sm:text-2xl font-bold text-[#2f5a44] block mt-0.5">{review.totalCorrect}</b>
            </div>
            <div className="border border-[#d2c8b2] bg-[#f3efe3] p-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365] block">Salah</span>
              <b className="font-serif text-xl sm:text-2xl font-bold text-[#c4402a] block mt-0.5">{review.totalWrong}</b>
            </div>
            <div className="border border-[#d2c8b2] bg-[#f3efe3] p-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365] block">Kosong</span>
              <b className="font-serif text-xl sm:text-2xl font-bold text-[#7a7365] block mt-0.5">{review.totalUnanswered}</b>
            </div>
            <div className="border border-[#d2c8b2] bg-[#f3efe3] p-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#7a7365] block">Akurasi</span>
              <b className="font-serif text-xl sm:text-2xl font-bold text-[#191713] block mt-0.5">{accuracyPercent}%</b>
            </div>
          </div>

          {/* Subtest Scores Pill Bar (if available) */}
          {review.subtestScores && Object.keys(review.subtestScores).length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#7a7365] mr-1">Rincian Subtes:</span>
              {Object.entries(review.subtestScores).map(([sub, score]) => (
                <span
                  key={sub}
                  className="px-2.5 py-1 border border-[#b9ac91] bg-[#eae3d2] text-[#191713] font-semibold"
                >
                  {sub}: <strong>{score}</strong>
                </span>
              ))}
            </div>
          )}

          {/* Remedial Drill Prompt Ledger */}
          {remedialQuestions.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#d2c8b2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#191713] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c4402a]" />
                  <span>Mode Drill Soal Salah ({remedialQuestions.length} Butir)</span>
                </div>
                <p className="font-sans text-xs text-[#4b463d] mt-1 max-w-xl leading-relaxed">
                  Latih kembali butir soal yang keliru, kosong, atau ditandai ragu-ragu untuk menguji daya ingat dan ketelitian tanpa melihat kunci terlebih dahulu.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {drillSolved.size === remedialQuestions.length ? (
                  <StampBadge label="100% TUNTAS REMEDIAL" variant="green" rotate={-2} />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrillMode(true);
                      setCurrentIndex(0);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 border border-[#191713] font-mono text-xs font-bold uppercase tracking-wider transition shadow-paper cursor-pointer ${
                      isDrillMode
                        ? 'bg-[#2f5a44] text-[#f3efe3]'
                        : 'bg-[#c4402a] text-[#f3efe3] hover:bg-[#a83420]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {isDrillMode
                        ? `Sedang Drill (${drillSolved.size}/${remedialQuestions.length} Tuntas)`
                        : `Drill Soal Salah (${remedialQuestions.length} Butir)`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. Main Split View: Question Area (8 cols) & Palet (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {/* Filter Tabs / Drill Header */}
            {isDrillMode ? (
              <div className="flex flex-wrap items-center justify-between gap-3 border border-[#191713] bg-[#eae3d2] p-3.5 shadow-[2px_2px_0px_#b9ac91]">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#c4402a]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#191713]">
                    Mode Drill Soal Salah · {drillSolved.size} dari {remedialQuestions.length} Tuntas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {drillSolved.size === remedialQuestions.length && remedialQuestions.length > 0 && (
                    <StampBadge label="100% TUNTAS REMEDIAL" variant="green" rotate={0} />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrillMode(false);
                      setCurrentIndex(0);
                    }}
                    className="font-mono text-xs font-semibold uppercase tracking-wider text-[#c4402a] hover:underline cursor-pointer"
                  >
                    Keluar Mode Drill &times;
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => {
                    setFilter('ALL');
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 border transition cursor-pointer font-semibold ${
                    filter === 'ALL'
                      ? 'border-[#191713] bg-[#191713] text-[#f3efe3]'
                      : 'border-[#b9ac91] bg-[#fbf8f0] text-[#4b463d] hover:bg-[#eae3d2]'
                  }`}
                >
                  Semua ({review.totalQuestions})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilter('WRONG');
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 border transition cursor-pointer font-semibold ${
                    filter === 'WRONG'
                      ? 'border-[#c4402a] bg-[#c4402a] text-[#f3efe3]'
                      : 'border-[#b9ac91] bg-[#fbf8f0] text-[#c4402a] hover:bg-[#c4402a]/10'
                  }`}
                >
                  Salah ({review.totalWrong})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilter('CORRECT');
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 border transition cursor-pointer font-semibold ${
                    filter === 'CORRECT'
                      ? 'border-[#2f5a44] bg-[#2f5a44] text-[#f3efe3]'
                      : 'border-[#b9ac91] bg-[#fbf8f0] text-[#2f5a44] hover:bg-[#2f5a44]/10'
                  }`}
                >
                  Benar ({review.totalCorrect})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilter('UNANSWERED');
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 border transition cursor-pointer font-semibold ${
                    filter === 'UNANSWERED'
                      ? 'border-[#4b463d] bg-[#4b463d] text-[#f3efe3]'
                      : 'border-[#b9ac91] bg-[#fbf8f0] text-[#7a7365] hover:bg-[#eae3d2]'
                  }`}
                >
                  Kosong ({review.totalUnanswered})
                </button>
              </div>
            )}

            {/* Active Question Box */}
            {activeQuestion ? (
              <div className="border border-[#191713] bg-[#fbf8f0] p-6 sm:p-8 shadow-paper space-y-6">
                {/* Question Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#d2c8b2]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 border border-[#191713] bg-[#eae3d2] text-[#191713] font-mono font-bold flex items-center justify-center text-sm shadow-[1px_1px_0px_#b9ac91]">
                      {activeQuestion.orderNumber}
                    </span>
                    <div className="font-mono text-xs">
                      <span className="font-bold text-[#191713] uppercase tracking-wider">
                        {activeQuestion.category}
                      </span>
                      {activeQuestion.subTopic && (
                        <span className="text-[#7a7365] ml-1.5">
                          · {activeQuestion.subTopic}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    {isDrillMode ? (
                      drillSolved.has(activeQuestion.id) ? (
                        <StampBadge label="REMEDIAL TUNTAS" variant="green" rotate={0} />
                      ) : drillAnswers[activeQuestion.id] ? (
                        <StampBadge label="BELUM TEPAT" variant="red" rotate={0} />
                      ) : (
                        <StampBadge label="UJI KEMBALI" variant="neutral" rotate={0} />
                      )
                    ) : !activeQuestion.userAnswer?.selectedOptionId &&
                      !activeQuestion.userAnswer?.numericAnswer ? (
                      <StampBadge label="KOSONG (0 POIN)" variant="neutral" rotate={0} />
                    ) : activeQuestion.userAnswer.isCorrect ? (
                      <StampBadge
                        label={`BENAR (+${activeQuestion.userAnswer.scoreAwarded} POIN)`}
                        variant="green"
                        rotate={0}
                      />
                    ) : (
                      <StampBadge
                        label={`SALAH (${activeQuestion.userAnswer.scoreAwarded} POIN)`}
                        variant="red"
                        rotate={0}
                      />
                    )}
                  </div>
                </div>

                {/* Question Stem (Text & KaTeX) */}
                <div className="text-base sm:text-lg leading-relaxed text-[#191713] font-sans">
                  <MathRenderer content={activeQuestion.text} />
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a7365] font-semibold">
                    {isDrillMode ? 'Pilih Opsi untuk Menguji Pemahaman' : 'Pilihan Jawaban'}
                  </div>

                  <div className="space-y-2.5">
                    {activeQuestion.options.map((opt) => {
                      if (isDrillMode) {
                        const isChosenInDrill = drillAnswers[activeQuestion.id] === opt.id;
                        const isSolved = drillSolved.has(activeQuestion.id);
                        const isOptCorrect = isDrillAnswerCorrect(activeQuestion, opt.id);

                        let borderClass = 'border-[#d2c8b2] bg-[#fbf8f0] hover:border-[#191713] hover:bg-[#eae3d2]';
                        let badgeTag = null;

                        if (isChosenInDrill) {
                          if (isOptCorrect) {
                            borderClass = 'border-[#2f5a44] bg-[#2f5a44]/15 shadow-[2px_2px_0px_#2f5a44]';
                            badgeTag = (
                              <span className="font-mono text-[10px] font-bold text-[#2f5a44] uppercase tracking-wider flex items-center gap-1 border border-[#2f5a44] px-2 py-0.5 bg-[#2f5a44]/20">
                                <Check className="w-3 h-3" />
                                Jawaban Tepat!
                              </span>
                            );
                          } else {
                            borderClass = 'border-[#c4402a] bg-[#c4402a]/15 shadow-[2px_2px_0px_#c4402a]';
                            badgeTag = (
                              <span className="font-mono text-[10px] font-bold text-[#c4402a] uppercase tracking-wider flex items-center gap-1 border border-[#c4402a] px-2 py-0.5 bg-[#c4402a]/20">
                                <X className="w-3 h-3" />
                                Belum Tepat, Coba Lagi!
                              </span>
                            );
                          }
                        } else if (isSolved && isOptCorrect) {
                          borderClass = 'border-[#2f5a44] bg-[#2f5a44]/10';
                          badgeTag = (
                            <span className="font-mono text-[10px] font-bold text-[#2f5a44] uppercase tracking-wider flex items-center gap-1 border border-[#2f5a44] px-2 py-0.5 bg-[#2f5a44]/20">
                              <Check className="w-3 h-3" />
                              Kunci Jawaban ({opt.score} Poin)
                            </span>
                          );
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectDrillOption(activeQuestion, opt.id)}
                            className={`w-full p-3.5 sm:p-4 border transition-all flex items-start justify-between gap-3 text-left cursor-pointer ${borderClass}`}
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <span className="w-7 h-7 border border-[#191713] bg-[#f3efe3] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                {opt.key}
                              </span>
                              <div className="text-sm pt-0.5 leading-relaxed text-[#191713]">
                                <MathRenderer content={opt.text} />
                              </div>
                            </div>
                            {badgeTag && <div className="shrink-0">{badgeTag}</div>}
                          </button>
                        );
                      }

                      // Normal Review Mode
                      const isSelected = activeQuestion.userAnswer?.selectedOptionId === opt.id;
                      const isCorrectAnswer = opt.isCorrect;

                      let borderClass = 'border-[#d2c8b2] bg-[#fbf8f0]';
                      let badgeTag = null;

                      if (isCorrectAnswer) {
                        borderClass = 'border-[#2f5a44] bg-[#2f5a44]/5';
                        badgeTag = (
                          <span className="font-mono text-[10px] font-bold text-[#2f5a44] uppercase tracking-wider flex items-center gap-1 border border-[#2f5a44] px-2 py-0.5 bg-[#2f5a44]/10">
                            <Check className="w-3 h-3" />
                            Kunci Jawaban ({opt.score} Poin)
                          </span>
                        );
                      }

                      if (isSelected && !isCorrectAnswer) {
                        borderClass = 'border-[#c4402a] bg-[#c4402a]/5';
                        badgeTag = (
                          <span className="font-mono text-[10px] font-bold text-[#c4402a] uppercase tracking-wider flex items-center gap-1 border border-[#c4402a] px-2 py-0.5 bg-[#c4402a]/10">
                            <X className="w-3 h-3" />
                            Pilihan Anda ({opt.score} Poin)
                          </span>
                        );
                      }

                      if (isSelected && isCorrectAnswer) {
                        badgeTag = (
                          <span className="font-mono text-[10px] font-bold text-[#2f5a44] uppercase tracking-wider flex items-center gap-1 border border-[#2f5a44] px-2 py-0.5 bg-[#2f5a44]/15">
                            <Check className="w-3 h-3" />
                            Pilihan Anda &amp; Kunci ({opt.score} Poin)
                          </span>
                        );
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3.5 sm:p-4 border transition-all flex items-start justify-between gap-3 ${borderClass}`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span className="w-7 h-7 border border-[#191713] bg-[#f3efe3] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              {opt.key}
                            </span>
                            <div className="text-sm pt-0.5 leading-relaxed text-[#191713]">
                              <MathRenderer content={opt.text} />
                            </div>
                          </div>
                          {badgeTag && <div className="shrink-0">{badgeTag}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Drill Mode Success Banner */}
                {isDrillMode && drillSolved.has(activeQuestion.id) && (
                  <div className="p-3.5 border border-[#2f5a44] bg-[#2f5a44]/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#2f5a44]">
                      <Check className="w-4 h-4" />
                      <span>Butir ini tuntas dijawab dengan benar!</span>
                    </div>
                    {currentIndex < filteredQuestions.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1))
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#2f5a44] bg-[#2f5a44] text-[#f3efe3] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#234333] transition cursor-pointer"
                      >
                        <span>Lanjut Soal Berikutnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Step-by-Step KaTeX Explanation Box */}
                <div className="mt-6 pt-6 border-t border-[#d2c8b2]">
                  {isDrillMode && !drillAnswers[activeQuestion.id] && !drillSolved.has(activeQuestion.id) ? (
                    <div className="border border-[#b9ac91] bg-[#f3efe3] p-5 sm:p-6 text-center space-y-2">
                      <Sparkles className="w-5 h-5 text-[#c4402a] mx-auto" />
                      <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#191713]">
                        Pembahasan Terkunci dalam Mode Drill
                      </h4>
                      <p className="font-sans text-xs text-[#7a7365] max-w-md mx-auto">
                        Pilih opsi jawaban untuk menguji analisis Anda terlebih dahulu. Pembahasan lengkap akan terbuka setelah Anda mencoba menjawab.
                      </p>
                    </div>
                  ) : (
                    <div className="border border-[#191713] bg-[#eae3d2] p-5 sm:p-6 shadow-[2px_2px_0px_#b9ac91] space-y-3">
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#191713]">
                        <Sparkles className="w-4 h-4 text-[#c4402a]" />
                        <span>Bedah Logika &amp; Solusi Cepat</span>
                      </div>

                      <div className="text-sm leading-relaxed text-[#191713] font-sans">
                        {activeQuestion.explanation ? (
                          <MathRenderer content={activeQuestion.explanation} />
                        ) : (
                          <p className="italic text-[#7a7365] font-mono text-xs">
                            Pembahasan untuk butir ini sedang dikalibrasi oleh tim akademisi.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Pagination */}
                <div className="pt-4 flex items-center justify-between border-t border-[#d2c8b2]">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#191713] bg-[#fbf8f0] hover:bg-[#eae3d2] text-[#191713] font-mono text-xs font-semibold uppercase tracking-wider disabled:opacity-40 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  <span className="font-mono text-xs text-[#7a7365]">
                    Butir {currentIndex + 1} dari {filteredQuestions.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentIndex >= filteredQuestions.length - 1}
                    onClick={() =>
                      setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#191713] bg-[#191713] text-[#f3efe3] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#c4402a] hover:border-[#c4402a] disabled:opacity-40 transition cursor-pointer"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center border border-[#191713] bg-[#fbf8f0] shadow-paper">
                <BookOpen className="w-8 h-8 text-[#7a7365] mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-[#191713]">
                  {isDrillMode ? 'Semua butir remedial telah diselesaikan!' : 'Tidak ada butir pada filter ini.'}
                </h3>
                <p className="font-mono text-xs text-[#7a7365] mt-1">
                  {isDrillMode
                    ? 'Selamat, pemahaman Anda telah tuntas pada seluruh materi yang sebelumnya keliru.'
                    : 'Pilih tab filter lain untuk melihat evaluasi butir soal.'}
                </p>
              </div>
            )}
          </div>

          {/* Right Palette Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="border border-[#191713] bg-[#fbf8f0] p-5 shadow-paper sticky top-24">
              <div className="flex items-center justify-between border-b border-[#d2c8b2] pb-3 mb-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#191713]">
                  {isDrillMode ? 'Palet Drill Remedial' : 'Palet Nomor Soal'}
                </h3>
                <span className="font-mono text-xs text-[#7a7365]">
                  {isDrillMode
                    ? `${drillSolved.size}/${remedialQuestions.length} Tuntas`
                    : `${filteredQuestions.length} Butir`}
                </span>
              </div>

              {/* Grid of Question Numbers */}
              <div className="grid grid-cols-5 gap-2 max-h-[50vh] overflow-y-auto p-1 scroll-smooth">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  let colorClass = 'border-[#b9ac91] bg-[#f3efe3] text-[#4b463d]';
                  let titleText = `Nomor ${q.orderNumber}`;

                  if (isDrillMode) {
                    const isSolved = drillSolved.has(q.id);
                    const hasAttempted = Boolean(drillAnswers[q.id]);
                    if (isSolved) {
                      colorClass = 'border-[#2f5a44] bg-[#2f5a44] text-[#f3efe3] font-bold';
                      titleText += ': Tuntas Remedial';
                    } else if (hasAttempted) {
                      colorClass = 'border-[#c4402a] bg-[#c4402a] text-[#f3efe3] font-bold';
                      titleText += ': Belum Tepat';
                    } else {
                      colorClass = 'border-[#b9ac91] bg-[#fbf8f0] text-[#191713]';
                      titleText += ': Belum Diuji';
                    }
                  } else {
                    const isAnswered = Boolean(q.userAnswer?.selectedOptionId || q.userAnswer?.numericAnswer);
                    const isCorrect = isAnswered && q.userAnswer?.isCorrect;
                    if (isAnswered) {
                      colorClass = isCorrect
                        ? 'border-[#2f5a44] bg-[#2f5a44] text-[#f3efe3] font-bold'
                        : 'border-[#c4402a] bg-[#c4402a] text-[#f3efe3] font-bold';
                    }
                  }

                  if (isCurrent) {
                    colorClass += ' ring-2 ring-[#191713] ring-offset-2';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`aspect-square w-full border font-mono text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer ${colorClass}`}
                      title={titleText}
                    >
                      {q.orderNumber}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-[#d2c8b2] space-y-2 font-mono text-[10.5px] text-[#4b463d]">
                {isDrillMode ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#2f5a44] bg-[#2f5a44] shrink-0" />
                      <span>Remedial Tuntas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#c4402a] bg-[#c4402a] shrink-0" />
                      <span>Dicoba (Belum Tepat)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#b9ac91] bg-[#fbf8f0] shrink-0" />
                      <span>Belum Dicoba</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#2f5a44] bg-[#2f5a44] shrink-0" />
                      <span>Jawaban Benar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#c4402a] bg-[#c4402a] shrink-0" />
                      <span>Jawaban Salah</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-[#b9ac91] bg-[#f3efe3] shrink-0" />
                      <span>Tidak Dijawab</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal Papan Peringkat Nasional */}
      {isLeaderboardOpen && (
        <LeaderboardView
          tryoutId={review.tryoutId}
          tryoutTitle={review.title}
          isOpen={isLeaderboardOpen}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}
    </div>
  );
}

export default ExamReviewViewer;
