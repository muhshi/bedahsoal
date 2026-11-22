export type ExamType = 'SKD_CPNS' | 'LPDP_TBS' | 'MATH_OLYMPIAD' | 'UTBK_SNBT' | 'CUSTOM';

export interface QuestionScoringItem {
  id: string;
  category: string;
  correctKey?: string | null;
  options: Array<{
    key: string;
    score: number;
  }>;
}

export interface UserAnswerItem {
  selectedKey?: string | null;
  numericAnswer?: string | null;
}

export interface ExamScoreResult {
  totalScore: number;
  subtestScores: Record<string, number>;
  isPassed?: boolean;
}

export interface NegativeMarkingConfig {
  correctScore: number;
  wrongScore: number;
  emptyScore: number;
}

export interface BKNPassingGradeCriteria {
  minTWK: number;
  minTIU: number;
  minTKP: number;
}
