import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  getProducts,
  getProductBySlug,
  getProductById,
  getKits,
  getBlogPosts,
  getBlogPostBySlug,
  addSubscriber,
  getSubscribers,
  createD1Adapter,
  type DatabaseClient,
} from '../src/db/catalog';

describe('Catalog Database and Seed Tests', () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    const schemaPath = path.resolve(__dirname, '../migrations/0001_initial_schema.sql');
    const seedPath = path.resolve(__dirname, '../data/seed.sql');

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);

    const seedSql = fs.readFileSync(seedPath, 'utf8');
    db.exec(seedSql);
  });

  describe('Seeding validation', () => {
    it('seeds exactly 4 categories', async () => {
      const categories = await getCategories(db);
      expect(categories).toHaveLength(4);
      const slugs = categories.map((c) => c.slug).sort();
      expect(slugs).toEqual(['jabones', 'natural', 'skincare', 'vegano']);
    });

    it('seeds exactly 74 products', async () => {
      const products = await getProducts(db);
      expect(products).toHaveLength(74);
      expect(products.every((p) => p.active)).toBe(true);
      expect(products.every((p) => typeof p.price === 'number' && p.price > 0)).toBe(true);
      expect(products.every((p) => Array.isArray(p.images))).toBe(true);
      expect(products.every((p) => Array.isArray(p.tags))).toBe(true);
    });

    it('seeds exactly 1 blog post', async () => {
      const posts = await getBlogPosts(db);
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe('hola-soy-elizabeth');
      expect(posts[0].title).toBe('Hola, soy Elizabeth');
      expect(posts[0].published).toBe(true);
      expect(posts[0].content).toContain('Soy Elizabeth');
    });
  });

  describe('Category queries', () => {
    it('finds category by slug', async () => {
      const category = await getCategoryBySlug(db, 'skincare');
      expect(category).not.toBeNull();
      expect(category?.name).toBe('skincare');
      expect(category?.slug).toBe('skincare');
    });

    it('returns null for nonexistent category slug', async () => {
      const category = await getCategoryBySlug(db, 'nonexistent');
      expect(category).toBeNull();
    });

    it('filters products by category slug (skincare: 9 products)', async () => {
      const products = await getProducts(db, { categorySlug: 'skincare' });
      expect(products).toHaveLength(9);
      expect(products.every((p) => p.category_id === '61f5cfdd-8cdd-4c34-88db-060efef554a7')).toBe(true);
    });

    it('filters products by category slug (natural: 4 products)', async () => {
      const products = await getProducts(db, { categorySlug: 'natural' });
      expect(products).toHaveLength(4);
      expect(products.every((p) => p.category_id === '5830755b-43b1-4ef9-93aa-aa337a263bfd')).toBe(true);
    });
  });

  describe('Tag queries', () => {
    it('filters products by tag "natural" (27 products)', async () => {
      const products = await getProducts(db, { tag: 'natural' });
      expect(products).toHaveLength(27);
      expect(products.every((p) => p.tags.includes('natural'))).toBe(true);
    });

    it('filters products by tag "vegano" (28 products)', async () => {
      const products = await getProducts(db, { tag: 'vegano' });
      expect(products).toHaveLength(28);
      expect(products.every((p) => p.tags.includes('vegano'))).toBe(true);
    });

    it('filters products by tag "celiacosafe" (4 products)', async () => {
      const products = await getProducts(db, { tag: 'celiacosafe' });
      expect(products).toHaveLength(4);
      expect(products.every((p) => p.tags.includes('celiacosafe'))).toBe(true);
    });

    it('filters products by multiple tags ("natural" AND "vegano")', async () => {
      const products = await getProducts(db, { tags: ['natural', 'vegano'] });
      expect(products.length).toBeGreaterThan(0);
      expect(products.every((p) => p.tags.includes('natural') && p.tags.includes('vegano'))).toBe(true);
    });

    it('searches products by keyword (e.g. "alumbre")', async () => {
      const products = await getProducts(db, { search: 'alumbre' });
      expect(products.length).toBeGreaterThanOrEqual(2);
      expect(products.some((p) => p.slug.includes('alumbre'))).toBe(true);
    });
  });

  describe('Kits queries', () => {
    it('returns all 9 curated kits tagged with "kit-regalo"', async () => {
      const kits = await getKits(db);
      expect(kits).toHaveLength(9);
      expect(kits.every((k) => k.tags.includes('kit-regalo'))).toBe(true);
      const names = kits.map((k) => k.name);
      expect(names).toContain('Kit Pausa Bonita');
      expect(names).toContain('Humidificador + Esencia Rosa');
      expect(names).toContain('Kit amuleto de perlas');
    });
  });

  describe('Product details query', () => {
    it('fetches a product by slug with parsed images and tags', async () => {
      const product = await getProductBySlug(db, 'serum-facial-retinol-night-repair');
      expect(product).not.toBeNull();
      expect(product?.name).toBe('Serum Facial Retinol Night Repair');
      expect(product?.brand).toBe('Laima');
      expect(product?.price).toBe(35000);
      expect(product?.is_new).toBe(false);
      expect(product?.bestseller).toBe(false);
      expect(product?.active).toBe(true);
      expect(product?.images.length).toBeGreaterThanOrEqual(2);
      expect(product?.category?.slug).toBe('skincare');
    });

    it('fetches a product by ID', async () => {
      const product = await getProductById(db, 'a60964b4-a6a0-446a-b3d7-3c1f82b34380');
      expect(product).not.toBeNull();
      expect(product?.slug).toBe('serum-facial-retinol-night-repair');
    });

    it('returns null for unknown product slug', async () => {
      const product = await getProductBySlug(db, 'unknown-product');
      expect(product).toBeNull();
    });
  });

  describe('Blog queries', () => {
    it('fetches single blog post by slug', async () => {
      const post = await getBlogPostBySlug(db, 'hola-soy-elizabeth');
      expect(post).not.toBeNull();
      expect(post?.title).toBe('Hola, soy Elizabeth');
      expect(post?.slug).toBe('hola-soy-elizabeth');
    });
  });

  describe('Subscribers', () => {
    it('records a new subscriber and prevents duplicates', async () => {
      const email = 'cliente@example.com';
      const sub1 = await addSubscriber(db, email);
      expect(sub1.email).toBe(email);

      // Inserting again shouldn't crash (INSERT OR IGNORE)
      const sub2 = await addSubscriber(db, email);
      expect(sub2.email).toBe(email);

      const all = await getSubscribers(db);
      expect(all.filter((s) => s.email === email)).toHaveLength(1);
    });
  });

  describe('Cloudflare D1 compatibility', () => {
    it('works with a mock D1Database interface', async () => {
      // Mock D1Database mimicking Cloudflare Workers runtime
      const mockD1 = {
        prepare(query: string) {
          const stmt = db.prepare(query);
          let boundParams: unknown[] = [];
          return {
            bind(...params: unknown[]) {
              boundParams = params;
              return this;
            },
            async all() {
              const results = stmt.all(...boundParams);
              return { results, success: true, meta: {} };
            },
            async first(colName?: string) {
              const res = stmt.get(...boundParams);
              if (!res) return null;
              if (colName && typeof res === 'object') return (res as Record<string, unknown>)[colName] ?? null;
              return res;
            },
            async run() {
              const info = stmt.run(...boundParams);
              return { results: [], success: true, meta: { changes: info.changes } };
            },
          };
        },
      };

      const d1Client: DatabaseClient = createD1Adapter(mockD1 as any);
      const categories = await getCategories(d1Client);
      expect(categories).toHaveLength(4);

      const kits = await getKits(d1Client);
      expect(kits).toHaveLength(9);

      const product = await getProductBySlug(d1Client, 'serum-facial-retinol-night-repair');
      expect(product?.brand).toBe('Laima');
    });
  });
});
