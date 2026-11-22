import { create } from 'zustand';
import { ClientQuestionDTO, AnswerSyncItem } from '@/types/exam';

interface AnswerState {
  selectedOptionId: string | null;
  isDoubt: boolean;
  answeredAt: string;
}

interface ExamStore {
  sessionId: string | null;
  mode: 'SIMULASI' | 'LATIHAN';
  deadline: string | null;
  serverTimeOffsetMs: number;
  questions: ClientQuestionDTO[];
  currentIndex: number;
  answers: Record<string, AnswerState>; // questionId -> AnswerState
  pendingSyncQueue: AnswerSyncItem[];
  isSubmitting: boolean;

  // Actions
  initExam: (params: {
    sessionId: string;
    mode: 'SIMULASI' | 'LATIHAN';
    deadline: string;
    serverTime: string;
    questions: ClientQuestionDTO[];
    initialAnswers?: Record<string, { selectedOptionId: string | null; isDoubt: boolean }>;
  }) => void;
  setCurrentIndex: (index: number) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  selectOption: (questionId: string, optionId: string) => void;
  toggleDoubt: (questionId: string) => void;
  clearPendingSyncQueue: () => void;
  setSubmitting: (submitting: boolean) => void;
}

export const useExamStore = create<ExamStore>((set, get) => ({
  sessionId: null,
  mode: 'SIMULASI',
  deadline: null,
  serverTimeOffsetMs: 0,
  questions: [],
  currentIndex: 0,
  answers: {},
  pendingSyncQueue: [],
  isSubmitting: false,

  initExam: ({ sessionId, mode, deadline, serverTime, questions, initialAnswers = {} }) => {
    const serverTimestamp = new Date(serverTime).getTime();
    const localTimestamp = Date.now();
    const offset = serverTimestamp - localTimestamp;

    const formattedAnswers: Record<string, AnswerState> = {};
    for (const [qId, ans] of Object.entries(initialAnswers)) {
      formattedAnswers[qId] = {
        selectedOptionId: ans.selectedOptionId,
        isDoubt: ans.isDoubt,
        answeredAt: new Date().toISOString(),
      };
    }

    set({
      sessionId,
      mode,
      deadline,
      serverTimeOffsetMs: offset,
      questions,
      currentIndex: 0,
      answers: formattedAnswers,
      pendingSyncQueue: [],
      isSubmitting: false,
    });
  },

  setCurrentIndex: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentIndex: index });
    }
  },

  goToNextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  goToPrevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  selectOption: (questionId, optionId) => {
    const now = new Date().toISOString();
    set((state) => {
      const current = state.answers[questionId];
      const isAlreadySelected = current?.selectedOptionId === optionId;
      const newOptionId = isAlreadySelected ? null : optionId;

      const newAnswer: AnswerState = {
        selectedOptionId: newOptionId,
        isDoubt: current ? current.isDoubt : false,
        answeredAt: now,
      };

      const syncItem: AnswerSyncItem = {
        questionId,
        selectedOptionId: newOptionId,
        isDoubt: newAnswer.isDoubt,
        answeredAt: now,
      };

      return {
        answers: { ...state.answers, [questionId]: newAnswer },
        pendingSyncQueue: [...state.pendingSyncQueue, syncItem],
      };
    });
  },

  toggleDoubt: (questionId) => {
    const now = new Date().toISOString();
    set((state) => {
      const current = state.answers[questionId] || {
        selectedOptionId: null,
        isDoubt: false,
        answeredAt: now,
      };

      const newAnswer: AnswerState = {
        ...current,
        isDoubt: !current.isDoubt,
        answeredAt: now,
      };

      const syncItem: AnswerSyncItem = {
        questionId,
        selectedOptionId: newAnswer.selectedOptionId,
        isDoubt: newAnswer.isDoubt,
        answeredAt: now,
      };

      return {
        answers: { ...state.answers, [questionId]: newAnswer },
        pendingSyncQueue: [...state.pendingSyncQueue, syncItem],
      };
    });
  },

  clearPendingSyncQueue: () => set({ pendingSyncQueue: [] }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
