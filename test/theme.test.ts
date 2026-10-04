import { describe, it, expect, beforeEach } from 'vitest';
import {
  THEME_STORAGE_KEY,
  getStoredTheme,
  setStoredTheme,
  getInitialTheme,
  applyTheme,
} from '../src/utils/theme';

function createMockStorage(): Storage {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  };
}

function createMockElement(): HTMLElement {
  const classes = new Set<string>();
  return {
    classList: {
      add: (cls: string) => classes.add(cls),
      remove: (cls: string) => classes.delete(cls),
      contains: (cls: string) => classes.has(cls),
    },
    className: '',
  } as unknown as HTMLElement;
}

describe('Theme Manager Utility', () => {
  let mockStorage: Storage;

  beforeEach(() => {
    mockStorage = createMockStorage();
  });

  it('exposes THEME_STORAGE_KEY matching convention', () => {
    expect(THEME_STORAGE_KEY).toBe('theme');
  });

  it('gets null when no valid theme is stored', () => {
    expect(getStoredTheme(mockStorage)).toBeNull();

    mockStorage.setItem(THEME_STORAGE_KEY, 'invalid-theme');
    expect(getStoredTheme(mockStorage)).toBeNull();
  });

  it('saves and reads dark and light themes properly', () => {
    setStoredTheme('dark', mockStorage);
    expect(getStoredTheme(mockStorage)).toBe('dark');

    setStoredTheme('light', mockStorage);
    expect(getStoredTheme(mockStorage)).toBe('light');
  });

  it('resolves initial theme from storage or defaults to light', () => {
    expect(getInitialTheme(mockStorage)).toBe('light');

    setStoredTheme('dark', mockStorage);
    expect(getInitialTheme(mockStorage)).toBe('dark');
  });

  it('applies and removes dark class on target HTML element', () => {
    const mockEl = createMockElement();

    applyTheme('dark', mockEl);
    expect(mockEl.classList.contains('dark')).toBe(true);

    applyTheme('light', mockEl);
    expect(mockEl.classList.contains('dark')).toBe(false);
  });
});
