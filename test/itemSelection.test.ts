import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  calculateTotals,
  createEmptySelection,
  addItem,
  removeItem,
  updateQuantity,
  clearSelection,
  itemSelectionReducer,
  ItemSelectionAction,
  STORAGE_KEY,
  saveSelectionToStorage,
  loadSelectionFromStorage,
  clearSelectionFromStorage,
  SelectionItem,
  Product,
} from '../src/domain/itemSelection';

describe('formatCurrency', () => {
  it('formats whole numbers in Argentine Pesos (ARS) format with dot separator', () => {
    expect(formatCurrency(35000)).toBe('$ 35.000');
    expect(formatCurrency(20000)).toBe('$ 20.000');
    expect(formatCurrency(3800)).toBe('$ 3.800');
    expect(formatCurrency(1250000)).toBe('$ 1.250.000');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$ 0');
  });

  it('handles negative numbers correctly', () => {
    expect(formatCurrency(-5000)).toBe('-$ 5.000');
  });

  it('handles invalid numbers safely', () => {
    expect(formatCurrency(NaN)).toBe('$ 0');
  });

  it('formats fractional amounts with comma decimal separator when present', () => {
    expect(formatCurrency(3500.5)).toBe('$ 3.500,50');
  });
});

describe('calculateTotals', () => {
  const sampleProduct1: Product = {
    id: 'prod-1',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  const sampleProduct2: Product = {
    id: 'prod-2',
    name: 'Jabón Vegetal de Caléndula',
    price: 6000,
  };

  it('returns zero totals for empty items array', () => {
    const totals = calculateTotals([]);
    expect(totals.totalItems).toBe(0);
    expect(totals.totalPrice).toBe(0);
  });

  it('calculates totalItems and totalPrice for multiple selection items', () => {
    const items: SelectionItem[] = [
      { product: sampleProduct1, quantity: 2, subtotal: 70000 },
      { product: sampleProduct2, quantity: 3, subtotal: 18000 },
    ];

    const totals = calculateTotals(items);
    expect(totals.totalItems).toBe(5);
    expect(totals.totalPrice).toBe(88000);
  });
});

describe('createEmptySelection', () => {
  it('creates an empty ItemSelection with zero totals', () => {
    const selection = createEmptySelection();
    expect(selection.items).toEqual([]);
    expect(selection.totalItems).toBe(0);
    expect(selection.totalPrice).toBe(0);
  });
});

describe('addItem', () => {
  const productA: Product = {
    id: 'prod-a',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  const productB: Product = {
    id: 'prod-b',
    name: 'Jabón Vegetal de Caléndula',
    price: 6000,
  };

  it('adds a new product with default quantity 1 to empty selection', () => {
    const initial = createEmptySelection();
    const next = addItem(initial, productA);

    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toEqual({
      product: productA,
      quantity: 1,
      subtotal: 35000,
    });
    expect(next.totalItems).toBe(1);
    expect(next.totalPrice).toBe(35000);
  });

  it('adds a new product with explicit quantity', () => {
    const initial = createEmptySelection();
    const next = addItem(initial, productB, 3);

    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(3);
    expect(next.items[0].subtotal).toBe(18000);
    expect(next.totalItems).toBe(3);
    expect(next.totalPrice).toBe(18000);
  });

  it('increments quantity and updates subtotal when adding existing product', () => {
    const initial = createEmptySelection();
    const state1 = addItem(initial, productA, 1);
    const state2 = addItem(state1, productA, 2);

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(3);
    expect(state2.items[0].subtotal).toBe(105000);
    expect(state2.totalItems).toBe(3);
    expect(state2.totalPrice).toBe(105000);
  });

  it('maintains immutability of previous state', () => {
    const initial = createEmptySelection();
    const state1 = addItem(initial, productA, 1);
    const state2 = addItem(state1, productB, 2);

    expect(initial.items).toHaveLength(0);
    expect(state1.items).toHaveLength(1);
    expect(state2.items).toHaveLength(2);
  });

  it('defaults invalid or negative quantity to 1', () => {
    const initial = createEmptySelection();
    const next = addItem(initial, productA, -3);

    expect(next.items[0].quantity).toBe(1);
    expect(next.totalItems).toBe(1);
    expect(next.totalPrice).toBe(35000);
  });
});

describe('removeItem', () => {
  const productA: Product = {
    id: 'prod-a',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  const productB: Product = {
    id: 'prod-b',
    name: 'Jabón Vegetal de Caléndula',
    price: 6000,
  };

  it('removes an item by product id and recalculates totals', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 2);
    selection = addItem(selection, productB, 1);

    expect(selection.items).toHaveLength(2);
    expect(selection.totalItems).toBe(3);
    expect(selection.totalPrice).toBe(76000);

    const updated = removeItem(selection, 'prod-a');
    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].product.id).toBe('prod-b');
    expect(updated.totalItems).toBe(1);
    expect(updated.totalPrice).toBe(6000);
  });

  it('does nothing if product id is not in selection', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 1);

    const updated = removeItem(selection, 'non-existent');
    expect(updated.items).toHaveLength(1);
    expect(updated.totalItems).toBe(1);
    expect(updated.totalPrice).toBe(35000);
  });
});

describe('updateQuantity', () => {
  const productA: Product = {
    id: 'prod-a',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  it('updates quantity and recalculates subtotal and totals when quantity > 0', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 1);

    const updated = updateQuantity(selection, 'prod-a', 4);
    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].quantity).toBe(4);
    expect(updated.items[0].subtotal).toBe(140000);
    expect(updated.totalItems).toBe(4);
    expect(updated.totalPrice).toBe(140000);
  });

  it('removes the item when quantity is 0', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 2);

    const updated = updateQuantity(selection, 'prod-a', 0);
    expect(updated.items).toHaveLength(0);
    expect(updated.totalItems).toBe(0);
    expect(updated.totalPrice).toBe(0);
  });

  it('removes the item when quantity is negative', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 2);

    const updated = updateQuantity(selection, 'prod-a', -1);
    expect(updated.items).toHaveLength(0);
    expect(updated.totalItems).toBe(0);
    expect(updated.totalPrice).toBe(0);
  });

  it('returns same state if product id is not found', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 1);

    const updated = updateQuantity(selection, 'unknown-id', 5);
    expect(updated).toEqual(selection);
  });
});

describe('clearSelection', () => {
  const productA: Product = {
    id: 'prod-a',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  it('resets selection to empty state with zero totals', () => {
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 3);
    expect(selection.items).toHaveLength(1);

    const cleared = clearSelection();
    expect(cleared.items).toEqual([]);
    expect(cleared.totalItems).toBe(0);
    expect(cleared.totalPrice).toBe(0);
  });
});

describe('itemSelectionReducer', () => {
  const productA: Product = {
    id: 'prod-a',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  const productB: Product = {
    id: 'prod-b',
    name: 'Jabón Vegetal de Caléndula',
    price: 6000,
  };

  it('handles ADD_ITEM action', () => {
    const initial = createEmptySelection();
    const action: ItemSelectionAction = {
      type: 'ADD_ITEM',
      product: productA,
      quantity: 2,
    };
    const state = itemSelectionReducer(initial, action);

    expect(state.items).toHaveLength(1);
    expect(state.totalItems).toBe(2);
    expect(state.totalPrice).toBe(70000);
  });

  it('handles REMOVE_ITEM action', () => {
    let state = createEmptySelection();
    state = addItem(state, productA, 1);
    state = addItem(state, productB, 2);

    const action: ItemSelectionAction = {
      type: 'REMOVE_ITEM',
      productId: 'prod-a',
    };
    const nextState = itemSelectionReducer(state, action);

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].product.id).toBe('prod-b');
    expect(nextState.totalItems).toBe(2);
    expect(nextState.totalPrice).toBe(12000);
  });

  it('handles UPDATE_QUANTITY action', () => {
    let state = createEmptySelection();
    state = addItem(state, productA, 1);

    const action: ItemSelectionAction = {
      type: 'UPDATE_QUANTITY',
      productId: 'prod-a',
      quantity: 5,
    };
    const nextState = itemSelectionReducer(state, action);

    expect(nextState.items[0].quantity).toBe(5);
    expect(nextState.totalItems).toBe(5);
    expect(nextState.totalPrice).toBe(175000);
  });

  it('handles CLEAR_SELECTION action', () => {
    let state = createEmptySelection();
    state = addItem(state, productA, 3);

    const action: ItemSelectionAction = { type: 'CLEAR_SELECTION' };
    const nextState = itemSelectionReducer(state, action);

    expect(nextState.items).toEqual([]);
    expect(nextState.totalItems).toBe(0);
    expect(nextState.totalPrice).toBe(0);
  });

  it('handles SET_SELECTION action and recalculates totals correctly', () => {
    const customSelection = {
      items: [{ product: productB, quantity: 4, subtotal: 24000 }],
      totalItems: 4,
      totalPrice: 24000,
    };

    const action: ItemSelectionAction = {
      type: 'SET_SELECTION',
      selection: customSelection,
    };
    const nextState = itemSelectionReducer(createEmptySelection(), action);

    expect(nextState.items).toHaveLength(1);
    expect(nextState.totalItems).toBe(4);
    expect(nextState.totalPrice).toBe(24000);
  });

  it('returns current state for unhandled action type', () => {
    const current = createEmptySelection();
    // @ts-expect-error Testing fallback for runtime unexpected action
    const nextState = itemSelectionReducer(current, { type: 'UNSUPPORTED_ACTION' });
    expect(nextState).toBe(current);
  });
});

describe('localStorage sync helpers', () => {
  const productA: Product = {
    id: 'prod-a',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

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

  it('exposes STORAGE_KEY matching domain convention', () => {
    expect(STORAGE_KEY).toBe('satibax_item_selection');
  });

  it('saves and loads ItemSelection round-trip', () => {
    const mockStorage = createMockStorage();
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 2);

    const saved = saveSelectionToStorage(selection, mockStorage);
    expect(saved).toBe(true);

    const loaded = loadSelectionFromStorage(mockStorage);
    expect(loaded.items).toHaveLength(1);
    expect(loaded.items[0].product.id).toBe('prod-a');
    expect(loaded.items[0].quantity).toBe(2);
    expect(loaded.totalItems).toBe(2);
    expect(loaded.totalPrice).toBe(70000);
  });

  it('clears selection from storage', () => {
    const mockStorage = createMockStorage();
    let selection = createEmptySelection();
    selection = addItem(selection, productA, 1);
    saveSelectionToStorage(selection, mockStorage);

    expect(mockStorage.getItem(STORAGE_KEY)).not.toBeNull();
    clearSelectionFromStorage(mockStorage);
    expect(mockStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('returns empty selection when storage item does not exist', () => {
    const mockStorage = createMockStorage();
    const loaded = loadSelectionFromStorage(mockStorage);

    expect(loaded.items).toEqual([]);
    expect(loaded.totalItems).toBe(0);
    expect(loaded.totalPrice).toBe(0);
  });

  it('returns empty selection gracefully when stored JSON is invalid/corrupt', () => {
    const mockStorage = createMockStorage();
    mockStorage.setItem(STORAGE_KEY, '{invalid-json-data');

    const loaded = loadSelectionFromStorage(mockStorage);
    expect(loaded.items).toEqual([]);
    expect(loaded.totalItems).toBe(0);
    expect(loaded.totalPrice).toBe(0);
  });

  it('re-validates and recomputes totals if loaded data contains stale/mismatched totals', () => {
    const mockStorage = createMockStorage();
    const corruptedPayload = JSON.stringify({
      items: [
        {
          product: productA,
          quantity: 2,
          subtotal: 999999, // stale wrong subtotal
        },
      ],
      totalItems: 999, // stale wrong total
      totalPrice: 999999, // stale wrong total
    });
    mockStorage.setItem(STORAGE_KEY, corruptedPayload);

    const loaded = loadSelectionFromStorage(mockStorage);
    expect(loaded.items).toHaveLength(1);
    expect(loaded.items[0].subtotal).toBe(70000);
    expect(loaded.totalItems).toBe(2);
    expect(loaded.totalPrice).toBe(70000);
  });

  it('handles storage errors safely when saving (e.g. quota exceeded)', () => {
    const brokenStorage = createMockStorage();
    brokenStorage.setItem = () => {
      throw new Error('QuotaExceededError');
    };

    const selection = addItem(createEmptySelection(), productA, 1);
    const result = saveSelectionToStorage(selection, brokenStorage);
    expect(result).toBe(false);
  });
});




