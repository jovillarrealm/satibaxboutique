/**
 * Satibax Boutique - Catalog Database Adapter
 *
 * Compatible with both Cloudflare D1 (D1Database) and local Node.js (node:sqlite DatabaseSync).
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  brand: string | null;
  price: number;
  category_id: string | null;
  category?: Category | null;
  image_url: string | null;
  images: string[];
  tags: string[];
  is_new: boolean;
  bestseller: boolean;
  active: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface ProductFilterOptions {
  categorySlug?: string;
  categoryId?: string;
  tag?: string;
  tags?: string[];
  activeOnly?: boolean;
  search?: string;
  isKit?: boolean;
}

/**
 * Universal minimal client interface for SQL database queries.
 */
export interface DatabaseClient {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  queryFirst<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
  execute(sql: string, params?: unknown[]): Promise<{ changes?: number }>;
}

export type DbInput = DatabaseClient | any;

const adapterCache = new WeakMap<object, DatabaseClient>();

/**
 * Creates an adapter for Cloudflare D1 Database.
 */
export function createD1Adapter(d1: any): DatabaseClient {
  return {
    async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
      let stmt = d1.prepare(sql);
      if (params.length > 0) {
        stmt = stmt.bind(...params);
      }
      const res = await stmt.all();
      return (res.results || []) as T[];
    },
    async queryFirst<T = unknown>(sql: string, params: unknown[] = []): Promise<T | null> {
      let stmt = d1.prepare(sql);
      if (params.length > 0) {
        stmt = stmt.bind(...params);
      }
      const res = await stmt.first();
      return (res as T) ?? null;
    },
    async execute(sql: string, params: unknown[] = []): Promise<{ changes?: number }> {
      let stmt = d1.prepare(sql);
      if (params.length > 0) {
        stmt = stmt.bind(...params);
      }
      const res = await stmt.run();
      return { changes: res.meta?.changes };
    },
  };
}

/**
 * Creates an adapter for Node.js built-in node:sqlite DatabaseSync.
 */
export function createNodeSqliteAdapter(db: any): DatabaseClient {
  return {
    async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
      const stmt = db.prepare(sql);
      const rows = stmt.all(...params);
      return rows as T[];
    },
    async queryFirst<T = unknown>(sql: string, params: unknown[] = []): Promise<T | null> {
      const stmt = db.prepare(sql);
      const row = stmt.get(...params);
      return (row as T) ?? null;
    },
    async execute(sql: string, params: unknown[] = []): Promise<{ changes?: number }> {
      const stmt = db.prepare(sql);
      const info = stmt.run(...params);
      return { changes: info.changes };
    },
  };
}

/**
 * Resolves any supported DB input (DatabaseClient, D1Database, or DatabaseSync)
 * into a standard DatabaseClient.
 */
export function asDatabaseClient(db: DbInput): DatabaseClient {
  if (!db || typeof db !== 'object') {
    throw new Error('Database client cannot be null or undefined');
  }

  // Already a DatabaseClient
  if (
    typeof db.query === 'function' &&
    typeof db.queryFirst === 'function' &&
    typeof db.execute === 'function'
  ) {
    return db as DatabaseClient;
  }

  if (adapterCache.has(db)) {
    return adapterCache.get(db)!;
  }

  let client: DatabaseClient;

  // Cloudflare D1 check (has batch and prepare returning object with bind)
  if (typeof db.batch === 'function' && typeof db.prepare === 'function') {
    client = createD1Adapter(db);
  } else if (typeof db.prepare === 'function') {
    // node:sqlite DatabaseSync
    client = createNodeSqliteAdapter(db);
  } else {
    throw new Error('Unsupported database instance. Expected DatabaseClient, D1Database, or DatabaseSync.');
  }

  adapterCache.set(db, client);
  return client;
}

function safeJsonParse<T>(val: unknown, fallback: T): T {
  if (!val) return fallback;
  if (typeof val !== 'string') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function mapProductRow(row: any): Product {
  const images = safeJsonParse<string[]>(row.images, []);
  const tags = safeJsonParse<string[]>(row.tags, []);

  const category: Category | null = row.category_row_id
    ? {
        id: row.category_row_id,
        name: row.category_row_name,
        slug: row.category_row_slug,
        description: row.category_row_description ?? null,
      }
    : null;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
    brand: row.brand ?? null,
    price: Number(row.price),
    category_id: row.category_id ?? null,
    category,
    image_url: row.image_url || images[0] || null,
    images,
    tags,
    is_new: Boolean(row.is_new),
    bestseller: Boolean(row.bestseller),
    active: Boolean(row.active),
    created_at: row.created_at,
  };
}

function mapCategoryRow(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
  };
}

function mapBlogPostRow(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? null,
    content: row.content,
    cover_image: row.cover_image ?? null,
    published: Boolean(row.published),
    created_at: row.created_at,
  };
}

const PRODUCT_SELECT_SQL = `
  SELECT 
    p.id,
    p.name,
    p.slug,
    p.description,
    p.brand,
    p.price,
    p.category_id,
    p.image_url,
    p.images,
    p.tags,
    p.is_new,
    p.bestseller,
    p.active,
    p.created_at,
    c.id AS category_row_id,
    c.name AS category_row_name,
    c.slug AS category_row_slug,
    c.description AS category_row_description
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
`;

/**
 * Retrieves all categories.
 */
export async function getCategories(db: DbInput): Promise<Category[]> {
  const client = asDatabaseClient(db);
  const rows = await client.query<any>('SELECT * FROM categories ORDER BY name ASC');
  return rows.map(mapCategoryRow);
}

/**
 * Retrieves a category by its slug.
 */
export async function getCategoryBySlug(db: DbInput, slug: string): Promise<Category | null> {
  const client = asDatabaseClient(db);
  const row = await client.queryFirst<any>('SELECT * FROM categories WHERE slug = ?', [slug]);
  return row ? mapCategoryRow(row) : null;
}

/**
 * Retrieves a category by its ID.
 */
export async function getCategoryById(db: DbInput, id: string): Promise<Category | null> {
  const client = asDatabaseClient(db);
  const row = await client.queryFirst<any>('SELECT * FROM categories WHERE id = ?', [id]);
  return row ? mapCategoryRow(row) : null;
}

/**
 * Retrieves products matching optional filters (category, tag, kit, active status, search).
 */
export async function getProducts(db: DbInput, filter?: ProductFilterOptions): Promise<Product[]> {
  const client = asDatabaseClient(db);
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filter?.activeOnly !== false) {
    conditions.push('p.active = 1');
  }

  if (filter?.categoryId) {
    conditions.push('p.category_id = ?');
    params.push(filter.categoryId);
  }

  if (filter?.categorySlug) {
    conditions.push('c.slug = ?');
    params.push(filter.categorySlug);
  }

  if (filter?.tag) {
    conditions.push('EXISTS (SELECT 1 FROM json_each(p.tags) WHERE value = ?)');
    params.push(filter.tag);
  }

  if (filter?.tags && filter.tags.length > 0) {
    for (const t of filter.tags) {
      conditions.push('EXISTS (SELECT 1 FROM json_each(p.tags) WHERE value = ?)');
      params.push(t);
    }
  }

  if (filter?.isKit) {
    conditions.push('EXISTS (SELECT 1 FROM json_each(p.tags) WHERE value = ?)');
    params.push('kit-regalo');
  }

  if (filter?.search && filter.search.trim()) {
    const term = `%${filter.search.trim()}%`;
    conditions.push('(p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)');
    params.push(term, term, term);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `${PRODUCT_SELECT_SQL} ${whereClause} ORDER BY p.name ASC`;

  const rows = await client.query<any>(sql, params);
  return rows.map(mapProductRow);
}

/**
 * Retrieves a single product by its slug.
 */
export async function getProductBySlug(db: DbInput, slug: string): Promise<Product | null> {
  const client = asDatabaseClient(db);
  const sql = `${PRODUCT_SELECT_SQL} WHERE p.slug = ? LIMIT 1`;
  const row = await client.queryFirst<any>(sql, [slug]);
  return row ? mapProductRow(row) : null;
}

/**
 * Retrieves a single product by its ID.
 */
export async function getProductById(db: DbInput, id: string): Promise<Product | null> {
  const client = asDatabaseClient(db);
  const sql = `${PRODUCT_SELECT_SQL} WHERE p.id = ? LIMIT 1`;
  const row = await client.queryFirst<any>(sql, [id]);
  return row ? mapProductRow(row) : null;
}

/**
 * Retrieves curated gift kits (products tagged with 'kit-regalo').
 */
export async function getKits(db: DbInput): Promise<Product[]> {
  return getProducts(db, { isKit: true });
}

/**
 * Retrieves blog posts.
 */
export async function getBlogPosts(db: DbInput, options?: { publishedOnly?: boolean }): Promise<BlogPost[]> {
  const client = asDatabaseClient(db);
  const publishedOnly = options?.publishedOnly !== false;
  const sql = publishedOnly
    ? 'SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC'
    : 'SELECT * FROM blog_posts ORDER BY created_at DESC';
  const rows = await client.query<any>(sql);
  return rows.map(mapBlogPostRow);
}

/**
 * Retrieves a single blog post by its slug.
 */
export async function getBlogPostBySlug(db: DbInput, slug: string): Promise<BlogPost | null> {
  const client = asDatabaseClient(db);
  const row = await client.queryFirst<any>('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
  return row ? mapBlogPostRow(row) : null;
}

/**
 * Records a new email subscriber.
 */
export async function addSubscriber(db: DbInput, email: string): Promise<Subscriber> {
  const client = asDatabaseClient(db);
  const normalizedEmail = email.trim().toLowerCase();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await client.execute(
    'INSERT OR IGNORE INTO subscribers (id, email, created_at) VALUES (?, ?, ?)',
    [id, normalizedEmail, createdAt]
  );

  const row = await client.queryFirst<any>(
    'SELECT * FROM subscribers WHERE email = ?',
    [normalizedEmail]
  );

  return {
    id: row.id,
    email: row.email,
    created_at: row.created_at,
  };
}

/**
 * Retrieves all newsletter subscribers.
 */
export async function getSubscribers(db: DbInput): Promise<Subscriber[]> {
  const client = asDatabaseClient(db);
  const rows = await client.query<any>('SELECT * FROM subscribers ORDER BY created_at DESC');
  return rows.map((r) => ({
    id: r.id,
    email: r.email,
    created_at: r.created_at,
  }));
}
