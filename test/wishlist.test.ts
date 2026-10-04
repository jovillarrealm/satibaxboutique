import { describe, it, expect, beforeEach } from 'vitest';
import {
  WISHLIST_STORAGE_KEY,
  loadWishlistFromStorage,
  saveWishlistToStorage,
  isInWishlist,
  toggleWishlist,
} from '../src/domain/wishlist';

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

describe('Wishlist Domain Engine', () => {
  let mockStorage: Storage;

  beforeEach(() => {
    mockStorage = createMockStorage();
  });

  it('exposes WISHLIST_STORAGE_KEY matching domain convention', () => {
    expect(WISHLIST_STORAGE_KEY).toBe('satibax_wishlist');
  });

  it('loads empty array when storage is empty or invalid', () => {
    expect(loadWishlistFromStorage(mockStorage)).toEqual([]);

    mockStorage.setItem(WISHLIST_STORAGE_KEY, 'not-json');
    expect(loadWishlistFromStorage(mockStorage)).toEqual([]);

    mockStorage.setItem(WISHLIST_STORAGE_KEY, '{"not":"array"}');
    expect(loadWishlistFromStorage(mockStorage)).toEqual([]);
  });

  it('saves and loads favorite product IDs properly', () => {
    const ids = ['prod-1', 'prod-2', 'prod-3'];
    const saved = saveWishlistToStorage(ids, mockStorage);
    expect(saved).toBe(true);

    expect(loadWishlistFromStorage(mockStorage)).toEqual(ids);
  });

  it('deduplicates product IDs when saving', () => {
    const ids = ['prod-1', 'prod-2', 'prod-1', 'prod-3', 'prod-2'];
    saveWishlistToStorage(ids, mockStorage);

    expect(loadWishlistFromStorage(mockStorage)).toEqual(['prod-1', 'prod-2', 'prod-3']);
  });

  it('correctly checks if product is in wishlist', () => {
    const wishlist = ['prod-1', 'prod-2'];
    expect(isInWishlist(wishlist, 'prod-1')).toBe(true);
    expect(isInWishlist(wishlist, 'prod-2')).toBe(true);
    expect(isInWishlist(wishlist, 'prod-3')).toBe(false);
  });

  it('toggles product into and out of wishlist', () => {
    let wishlist: string[] = [];

    // Add prod-1
    wishlist = toggleWishlist(wishlist, 'prod-1');
    expect(wishlist).toEqual(['prod-1']);

    // Add prod-2
    wishlist = toggleWishlist(wishlist, 'prod-2');
    expect(wishlist).toEqual(['prod-1', 'prod-2']);

    // Toggling already existing prod-1 removes it
    wishlist = toggleWishlist(wishlist, 'prod-1');
    expect(wishlist).toEqual(['prod-2']);

    // Toggling prod-2 removes it
    wishlist = toggleWishlist(wishlist, 'prod-2');
    expect(wishlist).toEqual([]);
  });

  it('handles empty string productId safely in toggleWishlist', () => {
    const wishlist = ['prod-1'];
    expect(toggleWishlist(wishlist, '')).toEqual(['prod-1']);
  });
});
