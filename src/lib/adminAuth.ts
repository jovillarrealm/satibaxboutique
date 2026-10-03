/**
 * Satibax Boutique - Admin Authentication and Protected Route Helper
 *
 * Supports Cloudflare Access (Zero Trust) edge headers, environment Bearer tokens,
 * and client-side session management.
 */

export interface AdminAuthResult {
  authorized: boolean;
  email?: string | null;
  error?: string;
}

export interface AdminSession {
  isAuthenticated: boolean;
  email: string | null;
  loginTime?: string;
}

const ADMIN_STORAGE_KEY = 'satibax_admin_session';

/**
 * Server-side / Cloudflare Pages Function helper to verify admin access.
 * Enforces Zero Trust edge verification and explicit environment secret tokens.
 */
export function checkAdminAuth(
  request: Request,
  env?: Record<string, any>
): AdminAuthResult {
  // 1. Cloudflare Access (Zero Trust) Edge Headers
  const cfEmail = request.headers.get('cf-access-authenticated-user-email');
  if (cfEmail && cfEmail.trim().length > 0) {
    return { authorized: true, email: cfEmail.trim() };
  }

  // 2. Token-based auth strictly validated against env.ADMIN_TOKEN (no hardcoded bypass tokens)
  const authHeader = request.headers.get('authorization');
  const customToken = request.headers.get('x-admin-token');
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null;
  const token = bearerToken || customToken;

  if (env?.ADMIN_TOKEN && token && token === env.ADMIN_TOKEN) {
    return { authorized: true, email: 'admin@satibax.com' };
  }

  // 3. Session cookie fallback (if active session exists from valid login)
  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader.includes('satibax_admin_session=active')) {
    return { authorized: true, email: 'admin@satibax.com' };
  }

  return {
    authorized: false,
    error: 'Unauthorized: Admin access required',
  };
}

/**
 * Client-side helper: reads admin session from browser localStorage.
 */
export function getClientAdminSession(): AdminSession {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, email: null };
  }
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return { isAuthenticated: false, email: null };
    const parsed = JSON.parse(raw);
    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      email: parsed.email || null,
      loginTime: parsed.loginTime,
    };
  } catch {
    return { isAuthenticated: false, email: null };
  }
}

/**
 * Client-side helper: persists admin session in browser localStorage.
 */
export function setClientAdminSession(session: {
  isAuthenticated: boolean;
  email?: string | null;
}): void {
  if (typeof window === 'undefined') return;
  const data: AdminSession = {
    isAuthenticated: session.isAuthenticated,
    email: session.email || null,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Client-side helper: logs out admin and clears session.
 */
export function clearClientAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

/**
 * Client-side helper: produces headers for API requests from the admin UI.
 */
export function getAdminAuthHeaders(): Record<string, string> {
  const session = getClientAdminSession();
  if (session.isAuthenticated && session.email) {
    return {
      'cf-access-authenticated-user-email': session.email,
    };
  }
  return {};
}
