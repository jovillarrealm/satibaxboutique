import type { Product } from '../db/catalog';

export interface CategoryTabItem {
  id: string;
  label: string;
  slug: string;
}

export interface TagToggleItem {
  id: string;
  label: string;
  tag: string;
}

export const CATEGORY_TABS: CategoryTabItem[] = [
  { id: 'todos', label: 'Todos', slug: 'todos' },
  { id: 'facial', label: 'Facial', slug: 'facial' },
  { id: 'corporal', label: 'Corporal', slug: 'corporal' },
  { id: 'capilar', label: 'Capilar', slug: 'capilar' },
  { id: 'aromaterapia', label: 'Aromaterapia', slug: 'aromaterapia' },
];

export const TAG_TOGGLES: TagToggleItem[] = [
  { id: 'natural', label: 'Natural', tag: 'natural' },
  { id: 'vegano', label: 'Vegano', tag: 'vegano' },
  { id: 'celiacosafe', label: 'Celiaco-Safe', tag: 'celiacosafe' },
];

/**
 * Normalizes a tag string for consistent comparison.
 * e.g. "celiaco-safe", "celiacosafe", "Celiaco-Safe", "sin-gluten" -> "celiacosafe"
 */
export function normalizeTag(tag: string): string {
  const clean = tag.toLowerCase().replace(/[\s\-_]/g, '');
  if (clean === 'celiacosafe' || clean === 'singluten' || clean === 'sintacc') {
    return 'celiacosafe';
  }
  return clean;
}

/**
 * Normalizes a category identifier for consistent comparison.
 */
export function normalizeCategory(category: string): string {
  return category.trim().toLowerCase();
}

/**
 * Formats an Argentine Peso amount to "$ XX.XXX".
 * Example: 35000 -> "$ 35.000", 6500 -> "$ 6.500", 0 -> "$ 0"
 */
export function formatPriceARS(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$ 0';
  }

  const isNegative = price < 0;
  const absPrice = Math.abs(price);
  const hasDecimals = absPrice % 1 !== 0;

  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(absPrice);

  return `${isNegative ? '-' : ''}$ ${formatted}`;
}

export interface ProductFilterOptions {
  category?: string;
  tags?: string[];
  query?: string;
  kitOnly?: boolean;
  activeOnly?: boolean;
}

/**
 * Checks whether a product matches a category tab or database category.
 */
function productMatchesCategory(product: Product, targetCategory: string): boolean {
  const normTarget = normalizeCategory(targetCategory);
  if (!normTarget || normTarget === 'todos') {
    return true;
  }

  const productCatSlug = product.category?.slug?.toLowerCase() || '';
  const productCatName = product.category?.name?.toLowerCase() || '';
  const productTags = (product.tags || []).map((t) => t.toLowerCase());
  const productText = `${product.name} ${product.description || ''} ${product.brand || ''}`.toLowerCase();

  switch (normTarget) {
    case 'facial':
      return (
        productCatSlug === 'skincare' ||
        productCatSlug === 'facial' ||
        productCatName.includes('facial') ||
        productCatName.includes('skincare') ||
        productTags.includes('facial') ||
        /\b(facial|rostro|ojos|labial|serum facial|limpieza facial)\b/i.test(productText)
      );

    case 'corporal':
      return (
        productCatSlug === 'corporal' ||
        productCatName.includes('corporal') ||
        productTags.includes('corporal') ||
        /\b(corporal|cuerpo|axilas|manos|pies|desodorante|exfoliante corporal)\b/i.test(productText)
      );

    case 'capilar':
      return (
        productCatSlug === 'capilar' ||
        productCatName.includes('capilar') ||
        productTags.includes('capilar') ||
        /\b(capilar|shampoo|acondicionador|cabello|pelo)\b/i.test(productText)
      );

    case 'aromaterapia':
      return (
        productCatSlug === 'aromaterapia' ||
        productCatSlug === 'aroma' ||
        productCatName.includes('aroma') ||
        productTags.includes('aroma') ||
        productTags.includes('aromaterapia') ||
        /\b(aroma|aromaterapia|aceite esencial|sahumerio|vela|difusor)\b/i.test(productText)
      );

    default:
      // Direct match on database category slug, id, name, or product tag
      return (
        productCatSlug === normTarget ||
        productCatName === normTarget ||
        product.category_id === targetCategory ||
        productTags.includes(normTarget)
      );
  }
}

/**
 * Checks whether a product satisfies all selected ethical/dietary tags.
 */
function productMatchesTags(product: Product, selectedTags: string[]): boolean {
  if (!selectedTags || selectedTags.length === 0) {
    return true;
  }

  const productNormalizedTags = (product.tags || []).map(normalizeTag);
  const productText = `${product.name} ${product.description || ''}`.toLowerCase();

  return selectedTags.every((selTag) => {
    const normSel = normalizeTag(selTag);
    // Direct tag match
    if (productNormalizedTags.includes(normSel)) {
      return true;
    }
    // Contextual fallback check
    if (normSel === 'celiacosafe') {
      return (
        productNormalizedTags.includes('celiacosafe') ||
        productText.includes('sin gluten') ||
        productText.includes('sin tacc') ||
        productText.includes('celiaco')
      );
    }
    if (normSel === 'vegano') {
      return (
        productNormalizedTags.includes('vegano') ||
        productText.includes('vegano') ||
        productText.includes('vegan')
      );
    }
    if (normSel === 'natural') {
      return (
        productNormalizedTags.includes('natural') ||
        productText.includes('natural') ||
        productText.includes('100% natural')
      );
    }
    return false;
  });
}

/**
 * Checks whether a product matches a keyword search across name, brand, and description.
 */
function productMatchesSearch(product: Product, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return true;
  }

  const nameMatch = product.name.toLowerCase().includes(trimmed);
  const brandMatch = (product.brand || '').toLowerCase().includes(trimmed);
  const descMatch = (product.description || '').toLowerCase().includes(trimmed);

  return nameMatch || brandMatch || descMatch;
}

/**
 * Pure filter function for the product catalog.
 */
export function filterProducts(
  products: Product[],
  options: ProductFilterOptions = {}
): Product[] {
  const {
    category = 'todos',
    tags = [],
    query = '',
    kitOnly = false,
    activeOnly = true,
  } = options;

  return products.filter((product) => {
    if (activeOnly && !product.active) {
      return false;
    }

    if (kitOnly) {
      const isKit =
        (product.tags || []).includes('kit-regalo') ||
        product.name.toLowerCase().startsWith('kit');
      if (!isKit) return false;
    }

    if (!productMatchesCategory(product, category)) {
      return false;
    }

    if (!productMatchesTags(product, tags)) {
      return false;
    }

    if (!productMatchesSearch(product, query)) {
      return false;
    }

    return true;
  });
}
