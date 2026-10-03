import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Cloudflare Pages Functions API endpoints
import { onRequestGet as getCategories } from '../functions/api/categories';
import {
  onRequestGet as getProducts,
  onRequestPost as createProduct,
  onRequestPut as updateProduct,
} from '../functions/api/products';
import {
  onRequestGet as getBlog,
  onRequestPost as createBlogPost,
} from '../functions/api/blog';
import {
  onRequestGet as getSubscribers,
  onRequestPost as addSubscriber,
} from '../functions/api/subscribers';
import { setFallbackDb } from '../functions/api/_db';

// Domain and State Engines
import {
  createEmptySelection,
  addItem,
  updateQuantity,
  removeItem,
  clearSelection,
  calculateSelectionTotal,
  countTotalItems,
  saveSelectionToStorage,
  loadSelectionFromStorage,
  type ItemSelection,
} from '../src/domain/itemSelection';
import {
  compileWhatsAppOrder,
  compileWhatsAppMessage,
  DEFAULT_WHATSAPP_PHONE,
  WHATSAPP_GREETING_HEADER,
  WHATSAPP_CONFIRMATION_FOOTER,
} from '../src/domain/whatsappCompiler';
import { filterProducts, TAG_TOGGLES, normalizeTag, formatPriceARS } from '../src/utils/catalogFiltering';
import { parseProductDetails } from '../src/utils/productDetails';

// UI Components
import { ProductDetailModal } from '../src/components/ProductDetailModal';
import { KitsSection } from '../src/components/KitsSection';
import { FloatingWhatsAppButton } from '../src/components/FloatingWhatsAppButton';
import App from '../src/App';
import type { Product, Category } from '../src/db/catalog';

describe('End-to-End Integration: Complete Customer & Admin Workflow', () => {
  let db: DatabaseSync;
  let mockEnv: { DB: any };

  const adminHeaders = {
    'cf-access-authenticated-user-email': 'elizabeth@satibax.com',
  };

  beforeEach(() => {
    // 1. Initialize SQLite with exact schema and seed data
    db = new DatabaseSync(':memory:');
    const schemaPath = path.resolve(__dirname, '../migrations/0001_initial_schema.sql');
    const seedPath = path.resolve(__dirname, '../data/seed.sql');

    db.exec(fs.readFileSync(schemaPath, 'utf8'));
    db.exec(fs.readFileSync(seedPath, 'utf8'));

    mockEnv = { DB: db };
    setFallbackDb(db);
  });

  it('verifies the full customer journey: catalog load -> filter -> detail -> cart -> WhatsApp -> admin mutations', async () => {
    // =========================================================================
    // STEP 1: CATALOG LOADING (The Cloudflare Data API Seam)
    // =========================================================================
    // Verify categories load properly from Cloudflare D1
    const categoriesReq = new Request('http://localhost/api/categories');
    const categoriesRes = await getCategories({ request: categoriesReq, env: mockEnv } as any);
    expect(categoriesRes.status).toBe(200);
    const categories: Category[] = await categoriesRes.json();
    expect(categories).toHaveLength(4);
    const categorySlugs = categories.map((c) => c.slug).sort();
    expect(categorySlugs).toEqual(['jabones', 'natural', 'skincare', 'vegano']);

    // Verify all 74 active products load from Cloudflare D1
    const productsReq = new Request('http://localhost/api/products');
    const productsRes = await getProducts({ request: productsReq, env: mockEnv } as any);
    expect(productsRes.status).toBe(200);
    const products: Product[] = await productsRes.json();
    expect(products).toHaveLength(74);

    // Assert key product fields
    const firstProduct = products[0];
    expect(firstProduct.id).toBeDefined();
    expect(firstProduct.name).toBeDefined();
    expect(typeof firstProduct.price).toBe('number');
    expect(firstProduct.price).toBeGreaterThan(0);
    expect(firstProduct.active).toBe(true);

    // =========================================================================
    // STEP 2: CATEGORY & TAG FILTERING (Storefront Discovery Seam)
    // =========================================================================
    // Filter by Skincare category
    const skincareProducts = filterProducts(products, {
      category: 'skincare',
      tags: [],
      query: '',
      kitOnly: false,
    });
    expect(skincareProducts.length).toBeGreaterThan(0);
    expect(skincareProducts.every((p) => p.category?.slug === 'skincare')).toBe(true);

    // Filter by ethical tag (e.g. 'vegano' or 'natural')
    const veganProducts = filterProducts(products, {
      category: 'todos',
      tags: ['vegano'],
      query: '',
      kitOnly: false,
    });
    expect(veganProducts.length).toBeGreaterThan(0);
    expect(
      veganProducts.every(
        (p) =>
          (p.tags && p.tags.map(normalizeTag).includes('vegano')) ||
          `${p.name} ${p.description || ''}`.toLowerCase().includes('vegan')
      )
    ).toBe(true);

    // Filter by search query (e.g. "serum")
    const serumProducts = filterProducts(products, {
      category: 'todos',
      tags: [],
      query: 'serum',
      kitOnly: false,
    });
    expect(serumProducts.length).toBeGreaterThan(0);
    expect(
      serumProducts.every(
        (p) =>
          p.name.toLowerCase().includes('serum') ||
          (p.description && p.description.toLowerCase().includes('serum'))
      )
    ).toBe(true);

    // Filter curated gift kits
    const kitProducts = filterProducts(products, {
      category: 'todos',
      tags: [],
      query: '',
      kitOnly: true,
    });
    expect(kitProducts.length).toBeGreaterThan(0);
    expect(
      kitProducts.every(
        (p) =>
          (p.tags && p.tags.includes('kit-regalo')) ||
          p.name.toLowerCase().includes('kit') ||
          p.name.toLowerCase().includes('dúo') ||
          p.name.toLowerCase().includes('duo')
      )
    ).toBe(true);

    // Check unique tags extraction & defined tag toggles
    expect(TAG_TOGGLES.map((t) => t.tag)).toEqual(['natural', 'vegano', 'celiacosafe']);
    const productTagSet = new Set(products.flatMap((p) => p.tags || []));
    expect(productTagSet.has('natural')).toBe(true);
    expect(productTagSet.has('vegano')).toBe(true);

    // =========================================================================
    // STEP 3: PRODUCT DETAIL VIEW (Inspection & Parsing Seam)
    // =========================================================================
    // Locate a featured product for detailed inspection
    const targetProduct = products.find((p) => p.name.toLowerCase().includes('serum')) || products[0];
    const details = parseProductDetails(targetProduct.description || '');

    expect(details.overview).toBeDefined();
    // Verify Argentine Peso price formatting helper
    const formattedPrice = formatPriceARS(targetProduct.price);
    expect(formattedPrice.startsWith('$ ')).toBe(true);

    // Render ProductDetailModal to verify UI output
    const modalHtml = renderToString(
      React.createElement(ProductDetailModal, {
        product: targetProduct,
        isOpen: true,
        onClose: () => {},
        onAddToSelection: () => {},
      })
    );
    expect(modalHtml).toContain(targetProduct.name);
    expect(modalHtml).toContain(formattedPrice);

    // Render KitsSection
    const kitsHtml = renderToString(
      React.createElement(KitsSection, {
        products: products,
        onSelectProduct: () => {},
        onAddToSelection: () => {},
      })
    );
    expect(kitsHtml).toContain('Kits de Regalo');

    // =========================================================================
    // STEP 4: ITEM SELECTION & CART STATE TRANSITIONS (Cart Engine Seam)
    // =========================================================================
    let selection: ItemSelection = createEmptySelection();
    expect(selection.items).toHaveLength(0);
    expect(selection.totalItems).toBe(0);
    expect(selection.totalPrice).toBe(0);

    // Pick 2 products: one serum and one kit
    const product1 = targetProduct;
    const product2 = kitProducts[0] || products[1];

    // Add 2 units of product 1
    selection = addItem(selection, product1, 2);
    expect(selection.items).toHaveLength(1);
    expect(selection.totalItems).toBe(2);
    expect(selection.totalPrice).toBe(product1.price * 2);
    expect(selection.items[0].subtotal).toBe(product1.price * 2);

    // Add 1 unit of product 2
    selection = addItem(selection, product2, 1);
    expect(selection.items).toHaveLength(2);
    expect(selection.totalItems).toBe(3);
    const expectedSubtotal = product1.price * 2 + product2.price * 1;
    expect(selection.totalPrice).toBe(expectedSubtotal);

    // Increment product 2 quantity to 3
    selection = updateQuantity(selection, product2.id, 3);
    expect(selection.totalItems).toBe(5);
    expect(selection.items.find((i) => i.product.id === product2.id)?.quantity).toBe(3);

    // Decrement product 1 quantity to 1
    selection = updateQuantity(selection, product1.id, 1);
    expect(selection.totalItems).toBe(4);
    expect(selection.items.find((i) => i.product.id === product1.id)?.quantity).toBe(1);

    // Verify localStorage persistence seam
    const mockStorage: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        for (const k in mockStorage) delete mockStorage[k];
      },
    };

    saveSelectionToStorage(selection, mockLocalStorage as any);
    const restoredSelection = loadSelectionFromStorage(mockLocalStorage as any);
    expect(restoredSelection.totalItems).toBe(selection.totalItems);
    expect(restoredSelection.totalPrice).toBe(selection.totalPrice);
    expect(restoredSelection.items).toHaveLength(selection.items.length);

    // =========================================================================
    // STEP 5: WHATSAPP ORDER COMPILATION (WhatsApp Dispatch Seam)
    // =========================================================================
    const message = compileWhatsAppMessage(selection);
    expect(message).toContain(WHATSAPP_GREETING_HEADER);
    expect(message).toContain(WHATSAPP_CONFIRMATION_FOOTER);
    expect(message).toContain(`1x ${product1.name}`);
    expect(message).toContain(`3x ${product2.name}`);
    expect(message).toContain(`*Total: ${formatPriceARS(selection.totalPrice)}*`);

    // Compile complete WhatsApp dispatch URL targeting Elizabeth's phone
    const orderUrl = compileWhatsAppOrder(selection);
    expect(orderUrl.startsWith(`https://wa.me/${DEFAULT_WHATSAPP_PHONE}?text=`)).toBe(true);

    // Verify special characters and emojis are validly URI-encoded without spaces
    expect(orderUrl).not.toMatch(/\s/);
    const urlParam = orderUrl.replace(`https://wa.me/${DEFAULT_WHATSAPP_PHONE}?text=`, '');
    expect(decodeURIComponent(urlParam)).toBe(message);

    // Verify Floating WhatsApp action button
    const floatBtnHtml = renderToString(React.createElement(FloatingWhatsAppButton));
    expect(floatBtnHtml).toContain(`https://wa.me/${DEFAULT_WHATSAPP_PHONE}`);

    // =========================================================================
    // STEP 6: ADMIN MUTATIONS & CATALOG MANAGEMENT (The Data API Seam)
    // =========================================================================
    // 6a. Verify unauthorized mutation attempt is rejected
    const unauthPostReq = new Request('http://localhost/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Producto Hack',
        price: 9999,
      }),
    });
    const unauthPostRes = await createProduct({ request: unauthPostReq, env: mockEnv } as any);
    expect(unauthPostRes.status).toBe(401);

    // 6b. Admin creates a new botanical product
    const newProductPayload = {
      name: 'Bálsamo Labial Botánico de Caléndula',
      slug: 'balsamo-labial-botanico-de-calendula',
      brand: 'Satibax Artesanal',
      price: 7500,
      category_id: categories[0].id,
      description: 'Bálsamo hidratante con cera vegetal, caléndula pura y manteca de karité.',
      tags: ['natural', 'vegano', 'celiacosafe'],
      is_new: true,
      bestseller: false,
      active: true,
    };

    const createReq = new Request('http://localhost/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...adminHeaders,
      },
      body: JSON.stringify(newProductPayload),
    });
    const createRes = await createProduct({ request: createReq, env: mockEnv } as any);
    expect(createRes.status).toBe(201);
    const createdProduct: Product = await createRes.json();
    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toBe('Bálsamo Labial Botánico de Caléndula');
    expect(createdProduct.price).toBe(7500);

    // 6c. Verify product is listed in public active catalog (now 75 items)
    const publicCatalogRes = await getProducts({
      request: new Request('http://localhost/api/products'),
      env: mockEnv,
    } as any);
    const updatedProducts: Product[] = await publicCatalogRes.json();
    expect(updatedProducts).toHaveLength(75);
    const foundNewProduct = updatedProducts.find((p) => p.id === createdProduct.id);
    expect(foundNewProduct).toBeDefined();

    // 6d. Admin updates product price to $8.200 and toggles active to false (out of stock)
    const updateReq = new Request('http://localhost/api/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...adminHeaders,
      },
      body: JSON.stringify({
        id: createdProduct.id,
        price: 8200,
        active: false,
      }),
    });
    const updateRes = await updateProduct({ request: updateReq, env: mockEnv } as any);
    expect(updateRes.status).toBe(200);
    const updatedResult: Product = await updateRes.json();
    expect(updatedResult.price).toBe(8200);
    expect(updatedResult.active).toBe(false);

    // 6e. Verify public catalog filters out inactive product (back to 74 items)
    const activeCatalogRes = await getProducts({
      request: new Request('http://localhost/api/products'),
      env: mockEnv,
    } as any);
    const activeProducts: Product[] = await activeCatalogRes.json();
    expect(activeProducts).toHaveLength(74);
    expect(activeProducts.find((p) => p.id === createdProduct.id)).toBeUndefined();

    // 6f. Verify admin catalog with ?all=true still returns all 75 items
    const adminCatalogReq = new Request('http://localhost/api/products?all=true', {
      headers: adminHeaders,
    });
    const adminCatalogRes = await getProducts({ request: adminCatalogReq, env: mockEnv } as any);
    const allProductsAdmin: Product[] = await adminCatalogRes.json();
    expect(allProductsAdmin).toHaveLength(75);
    const adminFoundProduct = allProductsAdmin.find((p) => p.id === createdProduct.id);
    expect(adminFoundProduct?.active).toBe(false);
    expect(adminFoundProduct?.price).toBe(8200);

    // 6g. Newsletter subscriber flow: customer subscribes
    const subEmail = 'cliente-bienestar@ejemplo.com.ar';
    const subReq = new Request('http://localhost/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: subEmail }),
    });
    const subRes = await addSubscriber({ request: subReq, env: mockEnv } as any);
    expect(subRes.status).toBe(201);

    // Admin views subscribers list
    const adminSubReq = new Request('http://localhost/api/subscribers', {
      headers: adminHeaders,
    });
    const adminSubRes = await getSubscribers({ request: adminSubReq, env: mockEnv } as any);
    expect(adminSubRes.status).toBe(200);
    const subscribers = await adminSubRes.json();
    expect(subscribers.some((s: any) => s.email === subEmail)).toBe(true);

    // 6h. Blog post publication flow
    const blogReq = new Request('http://localhost/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...adminHeaders,
      },
      body: JSON.stringify({
        title: 'Ritual Botánico de Primavera',
        slug: 'ritual-botanico-de-primavera',
        excerpt: 'Cómo revitalizar la piel después del invierno con activos vegetales.',
        content: 'La primavera invita a renovar las células de la piel con extractos naturales...',
        cover_image: 'https://example.com/primavera.webp',
        published: true,
      }),
    });
    const blogRes = await createBlogPost({ request: blogReq, env: mockEnv } as any);
    expect(blogRes.status).toBe(201);

    const publicBlogRes = await getBlog({
      request: new Request('http://localhost/api/blog'),
      env: mockEnv,
    } as any);
    const blogPosts = await publicBlogRes.json();
    expect(blogPosts.length).toBeGreaterThanOrEqual(2); // Initial post + new post
    expect(blogPosts.some((b: any) => b.slug === 'ritual-botanico-de-primavera')).toBe(true);

    // =========================================================================
    // STEP 7: CLEANUP & CONCLUSION
    // =========================================================================
    selection = removeItem(selection, product1.id);
    expect(selection.items).toHaveLength(1);
    selection = clearSelection();
    expect(selection.items).toHaveLength(0);
    expect(selection.totalItems).toBe(0);
    expect(selection.totalPrice).toBe(0);
  });

  it('renders top-level App storefront with full navigation switching between catalogo, kits, and admin', () => {
    // Render storefront in default catalogo mode
    const storefrontHtml = renderToString(React.createElement(App));
    expect(storefrontHtml).toContain('Satibax');
    expect(storefrontHtml).toContain('Cuidado natural para tu piel y bienestar diario');
    expect(storefrontHtml).toContain('WhatsApp: +54 9 2252 515155');

    // Render App in admin navigation mode
    const adminHtml = renderToString(React.createElement(App, { initialNav: 'admin' }));
    expect(adminHtml).toContain('Panel de Administración');
    expect(adminHtml).toContain('Productos y Catálogo');
    expect(adminHtml).toContain('Blog y Novedades');
    expect(adminHtml).toContain('Suscriptores');
  });
});
