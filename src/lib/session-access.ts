/**
 * Session ownership guard used by active-session, submit and review routes.
 *
 * Guest sessions are created under a shared demo user, so they remain callable
 * without a login. Once a real user is authenticated, only that user (or an
 * explicit demo session) may read or mutate the session.
 */
export const DEMO_USER_ID = 'user-demo-1';

export function canAccessSession(
  sessionUserId: string | null | undefined,
  authenticatedUserId: string | null | undefined
): boolean {
  if (!authenticatedUserId) return true;
  if (!sessionUserId || sessionUserId === DEMO_USER_ID) return true;
  return sessionUserId === authenticatedUserId;
}
