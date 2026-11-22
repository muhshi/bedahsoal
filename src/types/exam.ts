// ============================================================
// Zero Answer Leakage DTOs (Sent to client during active exam)
// ============================================================

export type QuestionCategory = 'TWK' | 'TIU' | 'TKP';

export interface ClientOptionDTO {
  id: string;
  key: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  imageUrl?: string | null;
  // NOTE: 'score' and 'isCorrect' are STRICTLY EXCLUDED
}

export interface ClientQuestionDTO {
  id: string;
  orderNumber: number;
  category: QuestionCategory;
  subTopic?: string | null;
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
  initialAnswers: Record<string, { selectedOptionId: string | null; isDoubt: boolean }>;
}

export interface AnswerSyncItem {
  questionId: string;
  selectedOptionId: string | null;
  isDoubt: boolean;
  answeredAt: string; // ISO String
}

export interface ExamResultDTO {
  sessionId: string;
  scoreTWK: number;
  scoreTIU: number;
  scoreTKP: number;
  totalScore: number;
  isPassed: boolean;
  passingGradeSnapshot: {
    minTWK: number;
    minTIU: number;
    minTKP: number;
  };
  durationSeconds: number;
  submittedAt: string;
}
