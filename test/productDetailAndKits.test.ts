import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import type { Product, Category } from '../src/db/catalog';
import { ProductDetailModal } from '../src/components/ProductDetailModal';
import { KitsSection } from '../src/components/KitsSection';
import { parseProductDetails, formatTagLabel } from '../src/utils/productDetails';
import App from '../src/App';

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Natural', slug: 'natural', description: null },
  { id: 'cat-4', name: 'skincare', slug: 'skincare', description: null },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Serum Facial Retinol Night Repair',
    slug: 'serum-facial-retinol-night-repair',
    description: `¿Qué hace? 

Este serum combina retinol y ácido hialurónico para combatir los signos visibles del envejecimiento.

Modo de uso: 
• Aplica una pequeña cantidad sobre la piel limpia y seca por la noche. 
• Masajea suavemente hasta su completa absorción.

Beneficios: 
• Promueve la renovación celular gracias al retinol. 
• Reduce líneas finas y mejora la firmeza de la piel.

_________________________ 
 
INGREDIENTES: WATER, GLYCERIN, RETINOL, SODIUM HYALURONATE, CITRIC ACID.`,
    brand: 'Laima',
    price: 35000,
    category_id: 'cat-4',
    category: MOCK_CATEGORIES[1],
    image_url: 'https://example.com/serum-1.webp',
    images: [
      'https://example.com/serum-1.webp',
      'https://example.com/serum-2.webp',
      'https://example.com/serum-3.webp',
    ],
    tags: ['natural', 'facial', 'vegano'],
    is_new: true,
    bestseller: true,
    active: true,
    created_at: '2026-01-19T14:40:03Z',
  },
  {
    id: 'prod-kit-1',
    name: 'Kit Pausa Bonita',
    slug: 'kit-pausa-bonita',
    description: `KIT PAUSA BONITA ✨

Un pequeño ritual de cuidado para llevar siempre con vos.

Incluye:
🌿 Bolsita de algodón reutilizable con cordón regulable.
🌿 Bálsamo labial sabor chicle.
🌿 Crema de manos con llavero para llevar en la cartera.
🌿 2 borlas de maquillaje para aplicar polvo facial.
🌿 2 pads para contorno de ojos.

Un kit versátil, delicado y lleno de pequeños tesoros.`,
    brand: 'Satibax',
    price: 28000,
    category_id: null,
    category: null,
    image_url: 'https://example.com/kit-pausa.webp',
    images: ['https://example.com/kit-pausa.webp'],
    tags: ['kit-regalo', 'natural'],
    is_new: true,
    bestseller: true,
    active: true,
    created_at: '2026-04-01T10:00:00Z',
  },
  {
    id: 'prod-kit-2',
    name: 'Kit Amuleto de Perlas',
    slug: 'kit-amuleto-de-perlas',
    description: `✨ AMULETO DE PERLAS ✨

Incluye:
🌿 Bolsita de algodón reutilizable.
🌿 Collar de perlas.
🌿 Bálsamo labial Sentida Botánica.`,
    brand: 'Satibax',
    price: 22500,
    category_id: null,
    category: null,
    image_url: 'https://example.com/kit-perlas.webp',
    images: ['https://example.com/kit-perlas.webp'],
    tags: ['kit-regalo'],
    is_new: false,
    bestseller: false,
    active: true,
    created_at: '2026-04-02T10:00:00Z',
  },
  {
    id: 'prod-kit-inactive',
    name: 'Kit Inactivo Agotado',
    slug: 'kit-inactivo-agotado',
    description: 'Kit fuera de stock temporal.',
    brand: 'Satibax',
    price: 30000,
    category_id: null,
    category: null,
    image_url: null,
    images: [],
    tags: ['kit-regalo'],
    is_new: false,
    bestseller: false,
    active: false,
    created_at: '2026-04-03T10:00:00Z',
  },
  {
    id: 'prod-regular',
    name: 'Jabón Botánico Caléndula',
    slug: 'jabon-botanico-calendula',
    description: 'Jabón suave para piel delicada.',
    brand: 'Satibax',
    price: 7500,
    category_id: 'cat-1',
    category: MOCK_CATEGORIES[0],
    image_url: null,
    images: [],
    tags: ['natural'],
    is_new: false,
    bestseller: false,
    active: true,
    created_at: '2026-02-01T10:00:00Z',
  },
];

describe('Product Details Parser Utility', () => {
  it('parses structured overview, benefits, usage instructions, ingredients, and bundle items', () => {
    const parsed = parseProductDetails(MOCK_PRODUCTS[0].description);

    expect(parsed.overview).toContain('Este serum combina retinol');
    expect(parsed.usageInstructions.length).toBeGreaterThanOrEqual(1);
    expect(parsed.usageInstructions[0]).toContain('Aplica una pequeña cantidad');
    expect(parsed.benefits.length).toBeGreaterThanOrEqual(1);
    expect(parsed.benefits[0]).toContain('Promueve la renovación celular');
    expect(parsed.ingredients).toContain('WATER, GLYCERIN, RETINOL');
    expect(parsed.bundleItems).toHaveLength(0);
  });

  it('parses bundle items from gift kits with "Incluye:"', () => {
    const parsed = parseProductDetails(MOCK_PRODUCTS[1].description);

    expect(parsed.bundleItems.length).toBeGreaterThanOrEqual(3);
    expect(parsed.bundleItems[0]).toContain('Bolsita de algodón');
    expect(parsed.bundleItems[1]).toContain('Bálsamo labial');
  });

  it('handles null, undefined, or unstructured descriptions gracefully', () => {
    const parsedNull = parseProductDetails(null);
    expect(parsedNull.overview).toBe('');
    expect(parsedNull.benefits).toEqual([]);
    expect(parsedNull.usageInstructions).toEqual([]);
    expect(parsedNull.ingredients).toBeNull();
    expect(parsedNull.bundleItems).toEqual([]);

    const parsedSimple = parseProductDetails('Jabón artesanal simple sin secciones.');
    expect(parsedSimple.overview).toBe('Jabón artesanal simple sin secciones.');
  });

  it('formats known product tags to capitalized friendly labels', () => {
    expect(formatTagLabel('natural')).toBe('Natural');
    expect(formatTagLabel('vegano')).toBe('Vegano');
    expect(formatTagLabel('celiacosafe')).toBe('Celiaco-Safe');
    expect(formatTagLabel('kit-regalo')).toBe('Kit Regalo');
    expect(formatTagLabel('facial')).toBe('Facial');
    expect(formatTagLabel('corporal')).toBe('Corporal');
    expect(formatTagLabel('capilar')).toBe('Capilar');
    expect(formatTagLabel('aroma')).toBe('Aromaterapia');
    expect(formatTagLabel('nuevo')).toBe('Nuevo');
  });
});

describe('ProductDetailModal Component', () => {
  it('returns null / renders nothing when isOpen is false', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[0],
        isOpen: false,
        onClose: () => {},
      })
    );
    expect(html).toBe('');
  });

  it('returns null / renders nothing when product is null', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: null,
        isOpen: true,
        onClose: () => {},
      })
    );
    expect(html).toBe('');
  });

  it('renders modal dialog with Playfair serif title, brand, ARS price, and tags', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[0],
        isOpen: true,
        onClose: () => {},
      })
    );

    // Modal role and accessibility
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');

    // Title and Brand
    expect(html).toContain('Serum Facial Retinol Night Repair');
    expect(html).toContain('Laima');
    expect(html).toContain('font-serif');

    // ARS price formatting
    expect(html).toMatch(/\$\s?35\.000/);

    // Ethical badges
    expect(html).toContain('Natural');
    expect(html).toContain('Vegano');
  });

  it('renders structured sections: description overview, ingredients, benefits, and usage instructions', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[0],
        isOpen: true,
        onClose: () => {},
      })
    );

    // Overview
    expect(html).toContain('Este serum combina retinol');

    // Ingredients section
    expect(html).toContain('Ingredientes');
    expect(html).toContain('WATER, GLYCERIN, RETINOL');

    // Benefits section
    expect(html).toContain('Beneficios');
    expect(html).toContain('Promueve la renovación celular');

    // Usage instructions section
    expect(html).toContain('Modo de uso');
    expect(html).toContain('Aplica una pequeña cantidad');
  });

  it('renders product gallery with multiple thumbnail selectors when available', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[0], // has 3 images
        isOpen: true,
        onClose: () => {},
      })
    );

    expect(html).toContain('serum-1.webp');
    expect(html).toContain('serum-2.webp');
    expect(html).toContain('serum-3.webp');
  });

  it('does not render thumbnail strip when product has only 1 image', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[1], // has 1 image
        isOpen: true,
        onClose: () => {},
      })
    );

    expect(html).toContain('kit-pausa.webp');
    expect(html).not.toContain('aria-label="Ver imagen 2"');
  });

  it('renders botanical fallback image placeholder when product has no image', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[4], // null image_url, empty images
        isOpen: true,
        onClose: () => {},
      })
    );

    expect(html).toContain('Jabón Botánico Caléndula');
    expect(html).toContain('Satibax');
  });

  it('renders fallback description and botanical notes when product description is null', () => {
    const productWithNullDesc: Product = {
      ...MOCK_PRODUCTS[4],
      description: null,
    };

    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: productWithNullDesc,
        isOpen: true,
        onClose: () => {},
      })
    );

    expect(html).toContain('Fórmula botánica cuidadosamente desarrollada');
    expect(html).toContain('Beneficios');
    expect(html).toContain('Modo de uso');
    expect(html).toContain('Ingredientes');
  });

  it('renders bundle items in modal when inspecting a gift kit', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[1], // Kit Pausa Bonita
        isOpen: true,
        onClose: () => {},
      })
    );

    expect(html).toContain('¿Qué incluye este kit?');
    expect(html).toContain('Bolsita de algodón reutilizable');
    expect(html).toContain('Bálsamo labial');
  });

  it('renders quantity selector and "Añadir a mi selección" button', () => {
    const html = renderToString(
      React.createElement(ProductDetailModal, {
        product: MOCK_PRODUCTS[0],
        isOpen: true,
        onClose: () => {},
      })
    );

    // Quantity selector buttons
    expect(html).toContain('aria-label="Disminuir cantidad"');
    expect(html).toContain('aria-label="Aumentar cantidad"');

    // Add button
    expect(html).toContain('Añadir a mi selección');

    // Close button
    expect(html).toContain('aria-label="Cerrar detalle"');
  });
});

describe('KitsSection Component', () => {
  it('renders editorial header, curated gift kits, and bundle items overview', () => {
    const html = renderToString(
      React.createElement(KitsSection, {
        products: MOCK_PRODUCTS,
        onAddToSelection: () => {},
        onViewDetails: () => {},
      })
    );

    // Editorial heading
    expect(html).toContain('Kits de Regalo');
    expect(html).toContain('Curaduría');

    // Should include both active kits tagged with kit-regalo
    expect(html).toContain('Kit Pausa Bonita');
    expect(html).toContain('Kit Amuleto de Perlas');

    // Should NOT include regular product not tagged with kit-regalo
    expect(html).not.toContain('Jabón Botánico Caléndula');

    // Should NOT include inactive kit
    expect(html).not.toContain('Kit Inactivo Agotado');

    // Bundle items overview
    expect(html).toContain('Incluye en este set');
    expect(html).toContain('Bolsita de algodón');
    expect(html).toContain('Bálsamo labial');

    // ARS price formatting
    expect(html).toMatch(/\$\s?28\.000/);
    expect(html).toMatch(/\$\s?22\.500/);

    // Quick add button
    expect(html).toContain('Añadir a mi selección');
  });

  it('renders overflow notice when a kit has more than 4 bundle items', () => {
    const html = renderToString(
      React.createElement(KitsSection, {
        products: [MOCK_PRODUCTS[1]], // Kit Pausa Bonita has 5 items
      })
    );

    expect(html).toContain('+ 1 detalles más en este kit');
  });

  it('renders fallback or empty message if no kits are provided', () => {
    const html = renderToString(
      React.createElement(KitsSection, {
        products: [MOCK_PRODUCTS[4]], // No kits
      })
    );

    expect(html).toContain('Kits de Regalo');
    expect(html).toContain('Pronto sumaremos nuevos kits');
  });
});

describe('App Integration with Detail Modal & Kits Navigation', () => {
  it('renders App containing both the catalog and the curated Kits section', () => {
    const html = renderToString(
      React.createElement(App, {
        initialProducts: MOCK_PRODUCTS,
        initialCategories: MOCK_CATEGORIES,
      })
    );

    // Header nav should include Kits link
    expect(html).toContain('Kits');

    // Kits section should be present in page
    expect(html).toContain('Kit Pausa Bonita');
    expect(html).toContain('Kits de Regalo');

    // Catalog products should be present
    expect(html).toContain('Serum Facial Retinol Night Repair');
  });
});
