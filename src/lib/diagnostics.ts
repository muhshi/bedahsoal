export interface AnswerDiagnosticInput {
  category: string;
  subTopic?: string | null;
  scoreAwarded: number;
  maxScore: number;
}

export type DiagnosticTier = 'critical' | 'moderate' | 'mastered';

export interface TopicDiagnostic {
  topicKey: string;
  category: string;
  topic: string;
  label: string;
  totalQuestions: number;
  scoreAwarded: number;
  maxScore: number;
  percentage: number;
  tier: DiagnosticTier;
  recommendedAction: string;
}

/**
 * Computes diagnostic performance per category and subtopic based on actual exam answers.
 * Returns topics sorted by lowest accuracy first (most critical weakness first).
 */
export function computeTopicDiagnostics(
  answers: AnswerDiagnosticInput[]
): TopicDiagnostic[] {
  if (!answers || answers.length === 0) {
    return [];
  }

  const topicMap = new Map<
    string,
    {
      category: string;
      topic: string;
      totalQuestions: number;
      scoreAwarded: number;
      maxScore: number;
    }
  >();

  for (const item of answers) {
    const category = (item.category || 'UMUM').trim().toUpperCase();
    const topic = (item.subTopic || '').trim() || `${category} Umum`;
    const key = `${category}::${topic}`;

    const existing = topicMap.get(key) || {
      category,
      topic,
      totalQuestions: 0,
      scoreAwarded: 0,
      maxScore: 0,
    };

    existing.totalQuestions += 1;
    existing.scoreAwarded += Math.max(0, item.scoreAwarded || 0);
    existing.maxScore += Math.max(1, item.maxScore || 5);

    topicMap.set(key, existing);
  }

  const diagnostics: TopicDiagnostic[] = [];

  for (const [key, data] of topicMap.entries()) {
    const percentage =
      data.maxScore > 0 ? Math.round((data.scoreAwarded / data.maxScore) * 100) : 0;

    let tier: DiagnosticTier = 'moderate';
    let recommendedAction = 'Perbanyak latihan variasi soal untuk stabilitas skor.';

    if (percentage < 65) {
      tier = 'critical';
      recommendedAction = 'Bedah konsep dasar & trik eliminasi pilihan secepatnya.';
    } else if (percentage >= 80) {
      tier = 'mastered';
      recommendedAction = 'Pertahankan ritme kecepatan pengerjaan di bawah 50 detik.';
    }

    diagnostics.push({
      topicKey: key,
      category: data.category,
      topic: data.topic,
      label: `${data.category} · ${data.topic}`,
      totalQuestions: data.totalQuestions,
      scoreAwarded: data.scoreAwarded,
      maxScore: data.maxScore,
      percentage,
      tier,
      recommendedAction,
    });
  }

  // Sort lowest accuracy first, then by number of questions attempted
  diagnostics.sort((a, b) => {
    if (a.percentage !== b.percentage) {
      return a.percentage - b.percentage;
    }
    return b.totalQuestions - a.totalQuestions;
  });

  return diagnostics;
}
