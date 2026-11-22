import {
  QuestionScoringItem,
  UserAnswerItem,
  ExamScoreResult,
  NegativeMarkingConfig,
  BKNPassingGradeCriteria,
  ExamType,
} from '@/types/scoring';

export const BKNScoringStrategy = {
  calculate(
    questions: QuestionScoringItem[],
    answers: Record<string, UserAnswerItem>,
    criteria?: BKNPassingGradeCriteria
  ): ExamScoreResult {
    const subtestScores: Record<string, number> = { TWK: 0, TIU: 0, TKP: 0 };
    let totalScore = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      const selectedKey = ans?.selectedKey;
      let scoreAwarded = 0;

      if (selectedKey) {
        const option = q.options.find((o) => o.key === selectedKey);
        if (option) {
          scoreAwarded = option.score;
        }
      }

      const cat = q.category.toUpperCase().includes('TWK')
        ? 'TWK'
        : q.category.toUpperCase().includes('TIU')
        ? 'TIU'
        : q.category.toUpperCase().includes('TKP')
        ? 'TKP'
        : q.category;

      subtestScores[cat] = (subtestScores[cat] || 0) + scoreAwarded;
      totalScore += scoreAwarded;
    }

    const isPassed = criteria
      ? (subtestScores['TWK'] ?? 0) >= criteria.minTWK &&
        (subtestScores['TIU'] ?? 0) >= criteria.minTIU &&
        (subtestScores['TKP'] ?? 0) >= criteria.minTKP
      : undefined;

    return { totalScore, subtestScores, isPassed };
  },
};

export const NegativeMarkingStrategy = {
  calculate(
    questions: QuestionScoringItem[],
    answers: Record<string, UserAnswerItem>,
    config: NegativeMarkingConfig = { correctScore: 4, wrongScore: -1, emptyScore: 0 }
  ): ExamScoreResult {
    const subtestScores: Record<string, number> = {};
    let totalScore = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      const selectedKey = ans?.selectedKey;
      let scoreAwarded = config.emptyScore;

      if (selectedKey) {
        if (q.correctKey && selectedKey === q.correctKey) {
          scoreAwarded = config.correctScore;
        } else {
          scoreAwarded = config.wrongScore;
        }
      }

      subtestScores[q.category] = (subtestScores[q.category] || 0) + scoreAwarded;
      totalScore += scoreAwarded;
    }

    return { totalScore, subtestScores };
  },
};

export const StandardSumStrategy = {
  calculate(
    questions: QuestionScoringItem[],
    answers: Record<string, UserAnswerItem>
  ): ExamScoreResult {
    const subtestScores: Record<string, number> = {};
    let totalScore = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      const selectedKey = ans?.selectedKey;
      let scoreAwarded = 0;

      if (selectedKey) {
        const option = q.options.find((o) => o.key === selectedKey);
        scoreAwarded = option ? option.score : 0;
      }

      subtestScores[q.category] = (subtestScores[q.category] || 0) + scoreAwarded;
      totalScore += scoreAwarded;
    }

    return { totalScore, subtestScores };
  },
};

export function calculateExamScore(
  examType: ExamType,
  questions: QuestionScoringItem[],
  answers: Record<string, UserAnswerItem>,
  options?: {
    bknCriteria?: BKNPassingGradeCriteria;
    negativeConfig?: NegativeMarkingConfig;
  }
): ExamScoreResult {
  switch (examType) {
    case 'SKD_CPNS':
      return BKNScoringStrategy.calculate(questions, answers, options?.bknCriteria);
    case 'MATH_OLYMPIAD':
      return NegativeMarkingStrategy.calculate(questions, answers, options?.negativeConfig);
    case 'LPDP_TBS':
    case 'UTBK_SNBT':
    case 'CUSTOM':
    default:
      return StandardSumStrategy.calculate(questions, answers);
  }
}
