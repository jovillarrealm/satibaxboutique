/**
 * Item Selection Domain Model & Calculations
 *
 * Implements pure domain logic for Item Selection in Satibax Boutique,
 * adhering to the glossary domain vocabulary and ARS currency specifications.
 */

export interface Product {
  id: string;
  name: string;
  slug?: string;
  price: number;
  brand?: string | null;
  description?: string | null;
  category_id?: string | null;
  image_url?: string | null;
  images?: string[];
  tags?: string[];
  is_new?: boolean;
  bestseller?: boolean;
  active?: boolean;
  created_at?: string;
}

export interface SelectionItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface ItemSelection {
  items: SelectionItem[];
  totalItems: number;
  totalPrice: number;
}

/**
 * Formats a numeric amount in Argentine Pesos (ARS) format:
 * "$ XX.XXX" using dot thousand separators and optional comma decimal separators.
 * Example: 35000 -> "$ 35.000", 0 -> "$ 0", -5000 -> "-$ 5.000".
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$ 0';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const hasDecimals = absAmount % 1 !== 0;

  const formattedNumber = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(absAmount);

  return `${isNegative ? '-' : ''}$ ${formattedNumber}`;
}

/**
 * Calculates the total items count and grand total price for a list of selection items.
 */
export function calculateTotals(items: readonly SelectionItem[]): { totalItems: number; totalPrice: number } {
  let totalItems = 0;
  let totalPrice = 0;

  for (const item of items) {
    const qty = Math.max(0, Math.floor(item.quantity || 0));
    totalItems += qty;
    totalPrice += item.product.price * qty;
  }

  return {
    totalItems,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
}

/**
 * Creates a clean, empty ItemSelection.
 */
export function createEmptySelection(): ItemSelection {
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
}

export const INITIAL_SELECTION: ItemSelection = createEmptySelection();

/**
 * Pure state transition to add a product to the selection.
 * If product already exists in selection, increases its quantity.
 * Always recalculates item subtotal, total items, and grand total.
 */
export function addItem(
  selection: ItemSelection,
  product: Product,
  quantity: number = 1
): ItemSelection {
  const sanitizedQuantity = typeof quantity === 'number' && quantity > 0
    ? Math.floor(quantity)
    : 1;

  const existingIndex = selection.items.findIndex(
    (item) => item.product.id === product.id
  );

  let newItems: SelectionItem[];

  if (existingIndex >= 0) {
    newItems = selection.items.map((item, index) => {
      if (index === existingIndex) {
        const updatedQty = item.quantity + sanitizedQuantity;
        return {
          ...item,
          quantity: updatedQty,
          subtotal: Math.round(item.product.price * updatedQty * 100) / 100,
        };
      }
      return item;
    });
  } else {
    const newItem: SelectionItem = {
      product,
      quantity: sanitizedQuantity,
      subtotal: Math.round(product.price * sanitizedQuantity * 100) / 100,
    };
    newItems = [...selection.items, newItem];
  }

  const totals = calculateTotals(newItems);

  return {
    items: newItems,
    totalItems: totals.totalItems,
    totalPrice: totals.totalPrice,
  };
}

/**
 * Pure state transition to remove an item from selection by product ID.
 * Recalculates total items and grand total.
 */
export function removeItem(selection: ItemSelection, productId: string): ItemSelection {
  const newItems = selection.items.filter((item) => item.product.id !== productId);
  if (newItems.length === selection.items.length) {
    return selection;
  }

  const totals = calculateTotals(newItems);
  return {
    items: newItems,
    totalItems: totals.totalItems,
    totalPrice: totals.totalPrice,
  };
}

/**
 * Pure state transition to update the quantity of an item by product ID.
 * If quantity <= 0, the item is removed.
 * Recalculates subtotal, total items, and grand total.
 */
export function updateQuantity(
  selection: ItemSelection,
  productId: string,
  quantity: number
): ItemSelection {
  const itemIndex = selection.items.findIndex(
    (item) => item.product.id === productId
  );

  if (itemIndex === -1) {
    return selection;
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return removeItem(selection, productId);
  }

  const sanitizedQuantity = Math.floor(quantity);
  const newItems = selection.items.map((item, index) => {
    if (index === itemIndex) {
      return {
        ...item,
        quantity: sanitizedQuantity,
        subtotal: Math.round(item.product.price * sanitizedQuantity * 100) / 100,
      };
    }
    return item;
  });

  const totals = calculateTotals(newItems);
  return {
    items: newItems,
    totalItems: totals.totalItems,
    totalPrice: totals.totalPrice,
  };
}

/**
 * Pure state transition to clear the selection completely.
 */
export function clearSelection(): ItemSelection {
  return createEmptySelection();
}

export type ItemSelectionAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_SELECTION'; selection: ItemSelection };

/**
 * Pure reducer function for ItemSelection, suitable for React's useReducer.
 */
export function itemSelectionReducer(
  state: ItemSelection,
  action: ItemSelectionAction
): ItemSelection {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItem(state, action.product, action.quantity);

    case 'REMOVE_ITEM':
      return removeItem(state, action.productId);

    case 'UPDATE_QUANTITY':
      return updateQuantity(state, action.productId, action.quantity);

    case 'CLEAR_SELECTION':
      return clearSelection();

    case 'SET_SELECTION': {
      const items = (action.selection?.items || []).map((item) => ({
        ...item,
        quantity: Math.max(0, Math.floor(item.quantity || 0)),
        subtotal: Math.round(item.product.price * Math.max(0, Math.floor(item.quantity || 0)) * 100) / 100,
      }));
      const totals = calculateTotals(items);
      return {
        items,
        totalItems: totals.totalItems,
        totalPrice: totals.totalPrice,
      };
    }

    default:
      return state;
  }
}

/**
 * Storage key used for persisting Item Selection in browser localStorage.
 */
export const STORAGE_KEY = 'satibax_item_selection';

/**
 * Safely saves the ItemSelection to localStorage (or provided Storage).
 * Handles quota exceeded errors or non-browser environments gracefully.
 */
export function saveSelectionToStorage(
  selection: ItemSelection,
  storage?: Storage
): boolean {
  try {
    const targetStorage = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
    if (!targetStorage) {
      return false;
    }
    const payload = JSON.stringify(selection);
    targetStorage.setItem(STORAGE_KEY, payload);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely loads the ItemSelection from localStorage (or provided Storage).
 * Revalidates and recomputes totals to guarantee data integrity.
 * Returns an empty selection on missing, invalid, or corrupted data.
 */
export function loadSelectionFromStorage(storage?: Storage): ItemSelection {
  try {
    const targetStorage = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
    if (!targetStorage) {
      return createEmptySelection();
    }
    const raw = targetStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptySelection();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) {
      return createEmptySelection();
    }

    const items: SelectionItem[] = parsed.items
      .filter((item: any) => item && item.product && typeof item.product.price === 'number')
      .map((item: any) => {
        const qty = Math.max(1, Math.floor(item.quantity || 1));
        return {
          product: item.product,
          quantity: qty,
          subtotal: Math.round(item.product.price * qty * 100) / 100,
        };
      });

    const totals = calculateTotals(items);
    return {
      items,
      totalItems: totals.totalItems,
      totalPrice: totals.totalPrice,
    };
  } catch {
    return createEmptySelection();
  }
}

/**
 * Safely removes the ItemSelection from localStorage (or provided Storage).
 */
export function clearSelectionFromStorage(storage?: Storage): void {
  try {
    const targetStorage = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
    if (targetStorage) {
      targetStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage deletion errors
  }
}




