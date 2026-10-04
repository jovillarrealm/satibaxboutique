/**
 * Botanical Dark Mode theme manager.
 * Stores theme preference under key 'theme' in localStorage.
 * Syncs the 'dark' CSS class on document.documentElement.
 */

export const THEME_STORAGE_KEY = 'theme';

function getStorage(customStorage?: Storage): Storage | null {
  if (customStorage) return customStorage;
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

/**
 * Gets the stored theme preference ('light' | 'dark') or null if not set.
 */
export function getStoredTheme(customStorage?: Storage): 'light' | 'dark' | null {
  const storage = getStorage(customStorage);
  if (!storage) return null;
  const raw = storage.getItem(THEME_STORAGE_KEY);
  if (raw === 'dark' || raw === 'light') {
    return raw;
  }
  return null;
}

/**
 * Sets the stored theme preference in localStorage.
 */
export function setStoredTheme(theme: 'light' | 'dark', customStorage?: Storage): boolean {
  const storage = getStorage(customStorage);
  if (!storage) return false;
  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolves the initial theme on application boot:
 * 1. Checks localStorage.
 * 2. Checks system color preference (prefers-color-scheme: dark).
 * 3. Defaults to 'light'.
 */
export function getInitialTheme(customStorage?: Storage): 'light' | 'dark' {
  const stored = getStoredTheme(customStorage);
  if (stored) return stored;

  if (typeof window !== 'undefined' && window.matchMedia) {
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) return 'dark';
    } catch {
      // Fallback
    }
  }

  return 'light';
}

/**
 * Applies or removes the 'dark' CSS class on the root HTML element.
 */
export function applyTheme(theme: 'light' | 'dark', targetElement?: HTMLElement): void {
  const element = targetElement || (typeof document !== 'undefined' ? document.documentElement : undefined);
  if (!element) return;

  if (theme === 'dark') {
    element.classList.add('dark');
  } else {
    element.classList.remove('dark');
  }
}
