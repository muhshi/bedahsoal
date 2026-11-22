/** Resolve a safe destination from the session-start API response. */
export function resolveExamUrl(response: {
  examUrl?: string | null;
  sessionId?: string | null;
}): string {
  if (response.examUrl) return response.examUrl;
  if (response.sessionId) return `/exam/${response.sessionId}`;
  return '/dashboard';
}
