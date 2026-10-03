import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import type { Product, Category } from '../src/db/catalog';
import {
  filterProducts,
  formatPriceARS,
  normalizeCategory,
  normalizeTag,
  CATEGORY_TABS,
  TAG_TOGGLES,
} from '../src/utils/catalogFiltering';
import { Header } from '../src/components/Header';
import { CategoryFilter } from '../src/components/CategoryFilter';
import { TagFilter } from '../src/components/TagFilter';
import { SearchBar } from '../src/components/SearchBar';
import { ProductCard } from '../src/components/ProductCard';
import { ProductGrid } from '../src/components/ProductGrid';
import App from '../src/App';

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Natural', slug: 'natural', description: null },
  { id: 'cat-2', name: 'Vegano', slug: 'vegano', description: null },
  { id: 'cat-3', name: 'Jabones', slug: 'jabones', description: null },
  { id: 'cat-4', name: 'skincare', slug: 'skincare', description: null },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Serum Facial Retinol Night Repair',
    slug: 'serum-facial-retinol-night-repair',
    description: 'Este serum combina retinol y ácido hialurónico para el rostro.',
    brand: 'Laima',
    price: 35000,
    category_id: 'cat-4',
    category: MOCK_CATEGORIES[3],
    image_url: 'https://example.com/serum.webp',
    images: ['https://example.com/serum.webp'],
    tags: ['natural', 'facial'],
    is_new: true,
    bestseller: false,
    active: true,
    created_at: '2026-01-19T14:40:03Z',
  },
  {
    id: 'prod-2',
    name: 'Desodorante Piedra Alumbre',
    slug: 'desodorante-piedra-alumbre',
    description: 'Protección natural corporal y axilas.',
    brand: 'Satibax',
    price: 20000,
    category_id: null,
    category: null,
    image_url: 'https://example.com/alumbre.webp',
    images: ['https://example.com/alumbre.webp'],
    tags: ['natural', 'celiacosafe', 'vegano'],
    is_new: false,
    bestseller: true,
    active: true,
    created_at: '2026-06-03T10:18:46Z',
  },
  {
    id: 'prod-3',
    name: 'Shampoo Sólido Brillo Natural',
    slug: 'shampoo-solido-brillo-natural',
    description: 'Cuidado capilar sin sulfatos para cabello normal.',
    brand: 'Sentida Botánica',
    price: 12500,
    category_id: 'cat-1',
    category: MOCK_CATEGORIES[0],
    image_url: null,
    images: [],
    tags: ['natural', 'vegano'],
    is_new: false,
    bestseller: false,
    active: true,
    created_at: '2026-02-10T12:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Aceite Esencial Lavanda Aromaterapia',
    slug: 'aceite-esencial-lavanda',
    description: 'Gotas de relajación con aroma puro de lavanda.',
    brand: 'Satibax',
    price: 18000,
    category_id: null,
    category: null,
    image_url: 'https://example.com/lavanda.webp',
    images: ['https://example.com/lavanda.webp'],
    tags: ['aroma', 'natural'],
    is_new: false,
    bestseller: false,
    active: true,
    created_at: '2026-03-01T15:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Kit Pausa Bonita',
    slug: 'kit-pausa-bonita',
    description: 'Curaduría especial de cuidado para regalo.',
    brand: 'Satibax',
    price: 45000,
    category_id: null,
    category: null,
    image_url: 'https://example.com/kit.webp',
    images: ['https://example.com/kit.webp'],
    tags: ['kit-regalo', 'natural'],
    is_new: true,
    bestseller: true,
    active: true,
    created_at: '2026-04-01T10:00:00Z',
  },
  {
    id: 'prod-6',
    name: 'Jabón Vegetal Arcilla',
    slug: 'jabon-vegetal-arcilla',
    description: 'Limpieza suave con arcilla.',
    brand: 'PURASOAP',
    price: 6500,
    category_id: 'cat-3',
    category: MOCK_CATEGORIES[2],
    image_url: 'https://example.com/jabon.webp',
    images: ['https://example.com/jabon.webp'],
    tags: ['natural'],
    is_new: false,
    bestseller: false,
    active: false, // Inactive product
    created_at: '2026-01-01T10:00:00Z',
  },
];

describe('Catalog Filtering Logic', () => {
  it('returns all active products when category is "todos" and no filters are set', () => {
    const results = filterProducts(MOCK_PRODUCTS, { category: 'todos' });
    expect(results).toHaveLength(5);
    expect(results.every((p) => p.active)).toBe(true);
  });

  it('filters by "facial" category', () => {
    const results = filterProducts(MOCK_PRODUCTS, { category: 'facial' });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-1');
  });

  it('filters by "corporal" category', () => {
    const results = filterProducts(MOCK_PRODUCTS, { category: 'corporal' });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-2');
  });

  it('filters by "capilar" category', () => {
    const results = filterProducts(MOCK_PRODUCTS, { category: 'capilar' });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-3');
  });

  it('filters by "aromaterapia" category', () => {
    const results = filterProducts(MOCK_PRODUCTS, { category: 'aromaterapia' });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-4');
  });

  it('filters by database category slug', () => {
    const results = filterProducts(MOCK_PRODUCTS, { category: 'skincare' });
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('serum-facial-retinol-night-repair');
  });

  it('filters by single ethical/dietary tag "vegano"', () => {
    const results = filterProducts(MOCK_PRODUCTS, { tags: ['vegano'] });
    expect(results).toHaveLength(2);
    expect(results.map((p) => p.id)).toEqual(['prod-2', 'prod-3']);
  });

  it('filters by "celiacosafe" / "Celiaco-Safe" tag', () => {
    const results = filterProducts(MOCK_PRODUCTS, { tags: ['celiacosafe'] });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-2');
  });

  it('filters by multiple tags simultaneously (AND conjunction)', () => {
    const results = filterProducts(MOCK_PRODUCTS, { tags: ['vegano', 'celiacosafe'] });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-2');
  });

  it('filters by live search keyword in product name', () => {
    const results = filterProducts(MOCK_PRODUCTS, { query: 'retinol' });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-1');
  });

  it('filters by live search keyword in brand name', () => {
    const results = filterProducts(MOCK_PRODUCTS, { query: 'Sentida' });
    expect(results).toHaveLength(1);
    expect(results[0].brand).toBe('Sentida Botánica');
  });

  it('filters by live search keyword in description', () => {
    const results = filterProducts(MOCK_PRODUCTS, { query: 'axilas' });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-2');
  });

  it('combines category, tag, and search query filters', () => {
    const results = filterProducts(MOCK_PRODUCTS, {
      category: 'corporal',
      tags: ['vegano'],
      query: 'alumbre',
    });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-2');

    const mismatch = filterProducts(MOCK_PRODUCTS, {
      category: 'facial',
      tags: ['vegano'],
      query: 'alumbre',
    });
    expect(mismatch).toHaveLength(0);
  });

  it('filters by kitOnly option', () => {
    const results = filterProducts(MOCK_PRODUCTS, { kitOnly: true });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('prod-5');
  });
});

describe('formatPriceARS', () => {
  it('formats whole number price with Argentine locale style', () => {
    const formatted = formatPriceARS(35000);
    expect(formatted).toMatch(/\$\s?35\.000/);
  });

  it('formats smaller price', () => {
    const formatted = formatPriceARS(6500);
    expect(formatted).toMatch(/\$\s?6\.500/);
  });

  it('handles zero gracefully', () => {
    expect(formatPriceARS(0)).toBe('$ 0');
  });

  it('handles invalid or non-numeric values', () => {
    // @ts-expect-error test non-number
    expect(formatPriceARS(undefined)).toBe('$ 0');
    expect(formatPriceARS(NaN)).toBe('$ 0');
  });
});

describe('Header component', () => {
  it('renders botanical title, subtitle, navigation, and selection trigger', () => {
    const html = renderToString(
      React.createElement(Header, {
        itemCount: 3,
        onOpenSelection: () => {},
      })
    );

    expect(html).toContain('Satibax Boutique');
    expect(html).toContain('Cosm\u00e9tica Natural y Bienestar');
    expect(html).toContain('Cat\u00e1logo');
    expect(html).toContain('Kits');
    expect(html).toContain('Nosotros');
    expect(html).toContain('Blog');
    expect(html).toContain('Contacto');
    expect(html).toContain('3'); // selection badge count
  });

  it('renders zero count or hides badge when itemCount is 0', () => {
    const html = renderToString(
      React.createElement(Header, {
        itemCount: 0,
      })
    );
    expect(html).toContain('Satibax Boutique');
  });
});

describe('CategoryFilter component', () => {
  it('renders standard botanical category tabs and custom database categories', () => {
    const html = renderToString(
      React.createElement(CategoryFilter, {
        categories: MOCK_CATEGORIES,
        selectedCategory: 'facial',
        onSelectCategory: () => {},
      })
    );

    expect(html).toContain('Todos');
    expect(html).toContain('Facial');
    expect(html).toContain('Corporal');
    expect(html).toContain('Capilar');
    expect(html).toContain('Aromaterapia');
  });
});

describe('TagFilter component', () => {
  it('renders toggles for Natural, Vegano, and Celiaco-Safe', () => {
    const html = renderToString(
      React.createElement(TagFilter, {
        selectedTags: ['vegano'],
        onToggleTag: () => {},
      })
    );

    expect(html).toContain('Natural');
    expect(html).toContain('Vegano');
    expect(html).toContain('Celiaco-Safe');
  });
});

describe('SearchBar component', () => {
  it('renders search input with placeholder and value', () => {
    const html = renderToString(
      React.createElement(SearchBar, {
        query: 'retinol',
        onQueryChange: () => {},
        placeholder: 'Buscar productos...',
      })
    );

    expect(html).toContain('value="retinol"');
    expect(html).toContain('Buscar productos...');
  });
});

describe('ProductCard component', () => {
  it('renders product details, ARS price, badges, and add button', () => {
    const html = renderToString(
      React.createElement(ProductCard, {
        product: MOCK_PRODUCTS[0],
        onAddToSelection: () => {},
      })
    );

    expect(html).toContain('Serum Facial Retinol Night Repair');
    expect(html).toContain('Laima');
    expect(html).toMatch(/\$\s?35\.000/);
    expect(html).toContain('A\u00f1adir a mi selecci\u00f3n');
    expect(html).toContain('Nuevo');
  });

  it('renders fallback image when image_url is missing', () => {
    const html = renderToString(
      React.createElement(ProductCard, {
        product: MOCK_PRODUCTS[2], // has null image_url
      })
    );

    expect(html).toContain('Shampoo S\u00f3lido Brillo Natural');
    expect(html).toContain('Sentida Bot\u00e1nica');
  });
});

describe('ProductGrid component', () => {
  it('renders responsive grid of product cards', () => {
    const html = renderToString(
      React.createElement(ProductGrid, {
        products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
      })
    );

    expect(html).toContain('Serum Facial Retinol Night Repair');
    expect(html).toContain('Desodorante Piedra Alumbre');
  });

  it('renders comforting empty state when no products match', () => {
    const html = renderToString(
      React.createElement(ProductGrid, {
        products: [],
        onClearFilters: () => {},
      })
    );

    expect(html).toContain('No encontramos productos');
  });
});

describe('App component', () => {
  it('renders full catalog view with loaded products', () => {
    const html = renderToString(
      React.createElement(App, {
        initialProducts: MOCK_PRODUCTS,
        initialCategories: MOCK_CATEGORIES,
      })
    );

    expect(html).toContain('Satibax Boutique');
    expect(html).toContain('Cosm\u00e9tica Natural y Bienestar');
    expect(html).toContain('Serum Facial Retinol Night Repair');
    expect(html).toContain('Desodorante Piedra Alumbre');
  });
});
