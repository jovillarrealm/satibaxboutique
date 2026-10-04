/**
 * Domain engine for Wishlist (Lista de Deseos) management.
 * Persists favorite product IDs in localStorage under key 'satibax_wishlist'.
 */

export const WISHLIST_STORAGE_KEY = 'satibax_wishlist';

function getStorage(customStorage?: Storage): Storage | null {
  if (customStorage) return customStorage;
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

/**
 * Loads favorite product IDs from localStorage.
 */
export function loadWishlistFromStorage(customStorage?: Storage): string[] {
  const storage = getStorage(customStorage);
  if (!storage) return [];
  try {
    const raw = storage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id) => typeof id === 'string' && id.trim().length > 0);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves favorite product IDs to localStorage.
 */
export function saveWishlistToStorage(productIds: string[], customStorage?: Storage): boolean {
  const storage = getStorage(customStorage);
  if (!storage) return false;
  try {
    const uniqueIds = Array.from(new Set(productIds));
    storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(uniqueIds));
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a product ID exists in the wishlist.
 */
export function isInWishlist(productIds: string[], productId: string): boolean {
  return productIds.includes(productId);
}

/**
 * Toggles a product in the wishlist: adds it if absent, removes it if present.
 */
export function toggleWishlist(productIds: string[], productId: string): string[] {
  if (!productId) return productIds;
  if (productIds.includes(productId)) {
    return productIds.filter((id) => id !== productId);
  }
  return [...productIds, productId];
}
