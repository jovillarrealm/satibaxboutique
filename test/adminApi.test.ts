import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { onRequestGet as getCategories } from '../functions/api/categories';
import {
  onRequestGet as getProducts,
  onRequestPost as createProduct,
  onRequestPut as updateProduct,
} from '../functions/api/products';
import {
  onRequestGet as getBlog,
  onRequestPost as createBlogPost,
  onRequestPut as updateBlogPost,
} from '../functions/api/blog';
import {
  onRequestGet as getSubscribers,
  onRequestPost as addSubscriber,
} from '../functions/api/subscribers';
import { createNodeSqliteAdapter } from '../src/db/catalog';
import { setFallbackDb } from '../functions/api/_db';

describe('Admin Dashboard & Cloudflare Functions API', () => {
  let db: DatabaseSync;
  let mockEnv: { DB: any };

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    const schemaPath = path.resolve(__dirname, '../migrations/0001_initial_schema.sql');
    const seedPath = path.resolve(__dirname, '../data/seed.sql');

    db.exec(fs.readFileSync(schemaPath, 'utf8'));
    db.exec(fs.readFileSync(seedPath, 'utf8'));

    // Create a mock D1-compatible object wrapping DatabaseSync
    const adapter = createNodeSqliteAdapter(db);
    mockEnv = { DB: db };
    setFallbackDb(db);
  });

  const adminHeaders = {
    'cf-access-authenticated-user-email': 'elizabeth@satibax.com',
  };

  describe('GET /api/categories', () => {
    it('returns all 4 categories', async () => {
      const request = new Request('http://localhost/api/categories');
      const response = await getCategories({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(4);
      const slugs = data.map((c: any) => c.slug).sort();
      expect(slugs).toEqual(['jabones', 'natural', 'skincare', 'vegano']);
    });
  });

  describe('GET /api/products', () => {
    it('returns active products by default', async () => {
      const request = new Request('http://localhost/api/products');
      const response = await getProducts({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      const products = await response.json();
      expect(products).toHaveLength(74);
      expect(products.every((p: any) => p.active)).toBe(true);
    });

    it('filters products by category slug (skincare: 9 items)', async () => {
      const request = new Request('http://localhost/api/products?category=skincare');
      const response = await getProducts({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      const products = await response.json();
      expect(products).toHaveLength(9);
    });

    it('filters kits with ?isKit=true', async () => {
      const request = new Request('http://localhost/api/products?isKit=true');
      const response = await getProducts({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      const products = await response.json();
      expect(products).toHaveLength(9);
      expect(products.every((p: any) => p.tags.includes('kit-regalo'))).toBe(true);
    });

    it('includes inactive products when requested by admin', async () => {
      // First mark one product as inactive
      db.prepare("UPDATE products SET active = 0 WHERE slug = 'serum-facial-retinol-night-repair'").run();

      // Normal public request should only return 73
      const publicReq = new Request('http://localhost/api/products');
      const publicRes = await getProducts({ request: publicReq, env: mockEnv } as any);
      const publicProducts = await publicRes.json();
      expect(publicProducts).toHaveLength(73);

      // Admin request with ?all=true should return all 74
      const adminReq = new Request('http://localhost/api/products?all=true', {
        headers: adminHeaders,
      });
      const adminRes = await getProducts({ request: adminReq, env: mockEnv } as any);
      const adminProducts = await adminRes.json();
      expect(adminProducts).toHaveLength(74);
      expect(adminProducts.some((p: any) => p.active === false)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('rejects unauthenticated request with 401', async () => {
      const request = new Request('http://localhost/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Nuevo Serum', price: 25000 }),
      });

      const response = await createProduct({ request, env: mockEnv } as any);
      expect(response.status).toBe(401);
    });

    it('validates required fields (name and price)', async () => {
      const request = new Request('http://localhost/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify({ name: '' }),
      });

      const response = await createProduct({ request, env: mockEnv } as any);
      expect(response.status).toBe(400);
    });

    it('creates a new product with admin auth', async () => {
      const payload = {
        name: 'Bálsamo Labial de Caléndula',
        price: 8500,
        brand: 'Satibax Botánica',
        description: 'Bálsamo reparador labial con cera de abejas y extracto de caléndula.',
        category_id: '5830755b-43b1-4ef9-93aa-aa337a263bfd',
        tags: ['natural', 'calmante'],
        images: ['https://example.com/balsamo.jpg'],
        is_new: true,
      };

      const request = new Request('http://localhost/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify(payload),
      });

      const response = await createProduct({ request, env: mockEnv } as any);
      expect(response.status).toBe(201);
      const product = await response.json();

      expect(product.id).toBeDefined();
      expect(product.name).toBe('Bálsamo Labial de Caléndula');
      expect(product.slug).toBe('balsamo-labial-de-calendula');
      expect(product.price).toBe(8500);
      expect(product.active).toBe(true);
      expect(product.tags).toEqual(['natural', 'calmante']);

      // Verify in DB directly
      const row: any = db.prepare('SELECT * FROM products WHERE id = ?').get(product.id);
      expect(row).toBeDefined();
      expect(row.name).toBe('Bálsamo Labial de Caléndula');
    });
  });

  describe('PUT /api/products', () => {
    it('rejects unauthenticated request with 401', async () => {
      const request = new Request('http://localhost/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'a60964b4-a6a0-446a-b3d7-3c1f82b34380', price: 42000 }),
      });

      const response = await updateProduct({ request, env: mockEnv } as any);
      expect(response.status).toBe(401);
    });

    it('updates product details and price', async () => {
      const productId = 'a60964b4-a6a0-446a-b3d7-3c1f82b34380';
      const request = new Request('http://localhost/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify({
          id: productId,
          price: 39500,
          description: 'Fórmula mejorada con retinol puro y aceites botánicos.',
        }),
      });

      const response = await updateProduct({ request, env: mockEnv } as any);
      expect(response.status).toBe(200);
      const updated = await response.json();
      expect(updated.price).toBe(39500);
      expect(updated.description).toBe('Fórmula mejorada con retinol puro y aceites botánicos.');
    });

    it('toggles product active status', async () => {
      const productId = 'a60964b4-a6a0-446a-b3d7-3c1f82b34380';

      // Toggle to inactive
      const deactReq = new Request('http://localhost/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify({ id: productId, active: false }),
      });
      const deactRes = await updateProduct({ request: deactReq, env: mockEnv } as any);
      expect(deactRes.status).toBe(200);
      const deactData = await deactRes.json();
      expect(deactData.active).toBe(false);

      // Verify omitted from public catalog
      const pubRes = await getProducts({ request: new Request('http://localhost/api/products'), env: mockEnv } as any);
      const pubList = await pubRes.json();
      expect(pubList.some((p: any) => p.id === productId)).toBe(false);

      // Toggle back to active
      const actReq = new Request('http://localhost/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify({ id: productId, active: true }),
      });
      const actRes = await updateProduct({ request: actReq, env: mockEnv } as any);
      expect(actRes.status).toBe(200);
      const actData = await actRes.json();
      expect(actData.active).toBe(true);
    });

    it('returns 404 for unknown product id', async () => {
      const request = new Request('http://localhost/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify({ id: 'nonexistent-id', price: 1000 }),
      });

      const response = await updateProduct({ request, env: mockEnv } as any);
      expect(response.status).toBe(404);
    });
  });

  describe('Blog API (/api/blog)', () => {
    it('retrieves published blog posts', async () => {
      const request = new Request('http://localhost/api/blog');
      const response = await getBlog({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      const posts = await response.json();
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe('hola-soy-elizabeth');
    });

    it('retrieves single blog post by slug', async () => {
      const request = new Request('http://localhost/api/blog?slug=hola-soy-elizabeth');
      const response = await getBlog({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      const post = await response.json();
      expect(post.title).toBe('Hola, soy Elizabeth');
    });

    it('returns 404 for unknown blog slug', async () => {
      const request = new Request('http://localhost/api/blog?slug=inexistente');
      const response = await getBlog({ request, env: mockEnv } as any);
      expect(response.status).toBe(404);
    });

    it('creates a new blog post with admin auth', async () => {
      const newPost = {
        title: 'Secretos de la Aromaterapia',
        excerpt: 'Cómo los aceites esenciales transforman tu bienestar diario.',
        content: 'La aromaterapia utiliza compuestos aromáticos naturales para promover la armonía física y emocional...',
        cover_image: 'https://images.satibax.com/aromaterapia.jpg',
        published: true,
      };

      const request = new Request('http://localhost/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify(newPost),
      });

      const response = await createBlogPost({ request, env: mockEnv } as any);
      expect(response.status).toBe(201);
      const post = await response.json();
      expect(post.id).toBeDefined();
      expect(post.slug).toBe('secretos-de-la-aromaterapia');
      expect(post.title).toBe('Secretos de la Aromaterapia');

      // Verify in list
      const listReq = new Request('http://localhost/api/blog');
      const listRes = await getBlog({ request: listReq, env: mockEnv } as any);
      const allPosts = await listRes.json();
      expect(allPosts).toHaveLength(2);
    });

    it('updates an existing blog post with admin auth', async () => {
      const existing: any = db.prepare("SELECT id FROM blog_posts WHERE slug = 'hola-soy-elizabeth'").get();

      const request = new Request('http://localhost/api/blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...adminHeaders,
        },
        body: JSON.stringify({
          id: existing.id,
          title: 'Hola, soy Elizabeth - Mi Historia Botánica',
          excerpt: 'Un viaje personal hacia el cuidado natural.',
        }),
      });

      const response = await updateBlogPost({ request, env: mockEnv } as any);
      expect(response.status).toBe(200);
      const post = await response.json();
      expect(post.title).toBe('Hola, soy Elizabeth - Mi Historia Botánica');
      expect(post.excerpt).toBe('Un viaje personal hacia el cuidado natural.');
    });
  });

  describe('Newsletter Subscribers API (/api/subscribers)', () => {
    it('records a new subscriber without admin auth (public endpoint)', async () => {
      const request = new Request('http://localhost/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'nuevo_suscriptor@example.com' }),
      });

      const response = await addSubscriber({ request, env: mockEnv } as any);
      expect(response.status).toBe(201);
      const sub = await response.json();
      expect(sub.email).toBe('nuevo_suscriptor@example.com');
    });

    it('rejects invalid email address', async () => {
      const request = new Request('http://localhost/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email' }),
      });

      const response = await addSubscriber({ request, env: mockEnv } as any);
      expect(response.status).toBe(400);
    });

    it('requires admin auth to list subscribers', async () => {
      const unauthReq = new Request('http://localhost/api/subscribers');
      const unauthRes = await getSubscribers({ request: unauthReq, env: mockEnv } as any);
      expect(unauthRes.status).toBe(401);

      const authReq = new Request('http://localhost/api/subscribers', {
        headers: adminHeaders,
      });
      const authRes = await getSubscribers({ request: authReq, env: mockEnv } as any);
      expect(authRes.status).toBe(200);
      const list = await authRes.json();
      expect(Array.isArray(list)).toBe(true);
    });

    it('exports subscribers as CSV with ?format=csv', async () => {
      // Add test subscribers
      db.prepare("INSERT INTO subscribers (id, email, created_at) VALUES ('sub-1', 'ana@example.com', '2026-10-01T10:00:00Z')").run();
      db.prepare("INSERT INTO subscribers (id, email, created_at) VALUES ('sub-2', 'bea@example.com', '2026-10-02T10:00:00Z')").run();

      const request = new Request('http://localhost/api/subscribers?format=csv', {
        headers: adminHeaders,
      });
      const response = await getSubscribers({ request, env: mockEnv } as any);

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toContain('text/csv');
      expect(response.headers.get('Content-Disposition')).toContain('attachment; filename="subscribers.csv"');

      const csv = await response.text();
      expect(csv).toContain('id,email,created_at');
      expect(csv).toContain('ana@example.com');
      expect(csv).toContain('bea@example.com');
    });
  });

  describe('Fallback DB adapter', () => {
    it('uses fallback DB adapter when env.DB is not provided', async () => {
      const request = new Request('http://localhost/api/categories');
      // No DB passed in env
      const response = await getCategories({ request, env: {} } as any);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveLength(4);
    });
  });

  describe('adminAuth helper tests', () => {
    it('authenticates via Cloudflare Access email header', async () => {
      const { checkAdminAuth } = await import('../src/lib/adminAuth');
      const req = new Request('http://localhost/api/test', {
        headers: { 'cf-access-authenticated-user-email': 'elizabeth@satibax.com' },
      });
      const res = checkAdminAuth(req);
      expect(res.authorized).toBe(true);
      expect(res.email).toBe('elizabeth@satibax.com');
    });

    it('authenticates via Bearer token', async () => {
      const { checkAdminAuth } = await import('../src/lib/adminAuth');
      const req = new Request('http://localhost/api/test', {
        headers: { authorization: 'Bearer satibax-admin-secret-token' },
      });
      const res = checkAdminAuth(req);
      expect(res.authorized).toBe(true);
      expect(res.email).toBe('admin@satibax.com');
    });

    it('authenticates via x-admin-token header', async () => {
      const { checkAdminAuth } = await import('../src/lib/adminAuth');
      const req = new Request('http://localhost/api/test', {
        headers: { 'x-admin-token': 'admin-secret' },
      });
      const res = checkAdminAuth(req);
      expect(res.authorized).toBe(true);
    });

    it('authenticates via cookie session', async () => {
      const { checkAdminAuth } = await import('../src/lib/adminAuth');
      const req = new Request('http://localhost/api/test', {
        headers: { cookie: 'satibax_admin_session=active; other=val' },
      });
      const res = checkAdminAuth(req);
      expect(res.authorized).toBe(true);
    });

    it('rejects unauthenticated request', async () => {
      const { checkAdminAuth } = await import('../src/lib/adminAuth');
      const req = new Request('http://localhost/api/test');
      const res = checkAdminAuth(req);
      expect(res.authorized).toBe(false);
      expect(res.error).toContain('Unauthorized');
    });
  });

  describe('Utility functions & UI helpers', () => {
    it('generates clean slug from title with diacritics and symbols', async () => {
      const { slugify } = await import('../src/db/catalog');
      expect(slugify('Jabón de Carbón Activado & Caléndula')).toBe('jabon-de-carbon-activado-calendula');
      expect(slugify('Crema Antiage 50ml!')).toBe('crema-antiage-50ml');
    });

    it('formats Argentine Peso prices properly', async () => {
      const { formatPriceARS } = await import('../src/components/admin/ProductManagementTable');
      const formatted = formatPriceARS(35000);
      expect(formatted).toContain('35.000');
    });

    it('supports deleting a product in the database', async () => {
      const { deleteProduct, getProductById } = await import('../src/db/catalog');
      const productId = 'a60964b4-a6a0-446a-b3d7-3c1f82b34380';
      const existing = await getProductById(db, productId);
      expect(existing).not.toBeNull();

      const deleted = await deleteProduct(db, productId);
      expect(deleted).toBe(true);

      const after = await getProductById(db, productId);
      expect(after).toBeNull();
    });
  });
});

