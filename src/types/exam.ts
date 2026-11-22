// ============================================================
// Zero Answer Leakage DTOs (Sent to client during active exam)
// ============================================================

export type QuestionType = 'MULTIPLE_CHOICE' | 'NUMERIC_INPUT';
export type QuestionCategory = 'TWK' | 'TIU' | 'TKP' | string;

export interface ClientOptionDTO {
  id: string;
  key: string;
  text: string;
  imageUrl?: string | null;
  // NOTE: 'score' and 'isCorrect' are STRICTLY EXCLUDED
}

export interface ClientQuestionDTO {
  id: string;
  orderNumber: number;
  category: string; // e.g. TWK, TIU, TKP, Aljabar, Geometri, Penalaran Umum
  subTopic?: string | null;
  questionType: QuestionType;
  text: string;
  imageUrl?: string | null;
  options: ClientOptionDTO[];
  // NOTE: 'explanation' and 'explanationImageUrl' are EXCLUDED until submission
}

export interface ExamSessionInitDTO {
  sessionId: string;
  tryoutId: string;
  title: string;
  mode: 'SIMULASI' | 'LATIHAN';
  startedAt: string; // ISO String
  deadline: string;  // ISO String (Server-Authoritative)
  serverTime: string;// ISO String for clock drift adjustment
  questions: ClientQuestionDTO[];
  initialAnswers?: Record<
    string,
    {
      selectedOptionId?: string | null;
      numericAnswer?: string | null;
      isDoubt: boolean;
      answeredAt?: string;
    }
  >;
}

export interface AnswerSyncItem {
  questionId: string;
  selectedOptionId?: string | null;
  numericAnswer?: string | null;
  isDoubt: boolean;
  answeredAt: string; // ISO String
}

export interface ExamResultDTO {
  sessionId: string;
  scoreTWK?: number;
  scoreTIU?: number;
  scoreTKP?: number;
  totalScore: number;
  subtestScores?: Record<string, number>;
  isPassed?: boolean;
  passingGradeSnapshot?: {
    minTWK?: number;
    minTIU?: number;
    minTKP?: number;
    [key: string]: any;
  } | null;
  durationSeconds: number;
  submittedAt: string;
}

// ============================================================
// Post-Exam Review DTOs (Sent only after submission)
// ============================================================

export interface ReviewOptionDTO {
  id: string;
  key: string;
  text: string;
  imageUrl?: string | null;
  score: number;
  isCorrect?: boolean;
}

export interface QuestionReviewDTO {
  id: string;
  orderNumber: number;
  category: string;
  subTopic?: string | null;
  questionType: QuestionType;
  text: string;
  imageUrl?: string | null;
  options: ReviewOptionDTO[];
  explanation?: string | null;
  explanationImageUrl?: string | null;
  userAnswer?: {
    selectedOptionId?: string | null;
    numericAnswer?: string | null;
    scoreAwarded: number;
    isCorrect: boolean;
    isDoubt?: boolean;
  };
}

export interface ExamReviewDTO {
  sessionId: string;
  tryoutId: string;
  title: string;
  mode: 'SIMULASI' | 'LATIHAN';
  totalScore: number;
  subtestScores?: Record<string, number>;
  isPassed?: boolean;
  totalQuestions: number;
  totalCorrect: number;
  totalWrong: number;
  totalUnanswered: number;
  startedAt: string;
  submittedAt?: string | null;
  questions: QuestionReviewDTO[];
}
