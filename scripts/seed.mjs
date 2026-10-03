import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to escape single quotes in SQL strings
function escapeSqlString(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

export function generateSeedData() {
  const categoriesPath = path.resolve(rootDir, 'data/raw_categories.json');
  const productsPath = path.resolve(rootDir, 'data/raw_products.json');
  const postsPath = path.resolve(rootDir, 'data/raw_posts.json');

  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const rawPosts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const posts = Array.isArray(rawPosts) ? rawPosts : [rawPosts];

  const categoryDescriptions = {
    '5830755b-43b1-4ef9-93aa-aa337a263bfd': 'Cosmética y cuidado natural',
    '3f4af2e7-1348-4d62-99f0-4f1bc17152c2': 'Productos 100% veganos y cruelty-free',
    'a789a2b5-95e2-4d4b-80f8-c68e620cbb5a': 'Jabones artesanales y naturales',
    '61f5cfdd-8cdd-4c34-88db-060efef554a7': 'Cuidado facial y tratamientos para la piel',
  };

  const sqlLines = [
    '-- Satibax Boutique Catalog Seed Data',
    '-- Populates categories (4), products (74), and blog_posts (1)',
    '',
    '-- 1. Categories',
  ];

  for (const c of categories) {
    const id = escapeSqlString(c.id);
    const name = escapeSqlString(c.name);
    const slug = escapeSqlString(c.name.toLowerCase().trim());
    const desc = escapeSqlString(categoryDescriptions[c.id] || null);

    sqlLines.push(
      `INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES (${id}, ${name}, ${slug}, ${desc});`
    );
  }

  sqlLines.push('', '-- 2. Products');

  for (const p of products) {
    const id = escapeSqlString(p.id);
    const name = escapeSqlString(p.name);
    const slug = escapeSqlString(p.slug);
    const desc = escapeSqlString(p.description || null);
    const brand = escapeSqlString(p.brand || null);
    const price = typeof p.price === 'number' ? p.price : 0;
    const catId = p.category_id ? escapeSqlString(p.category_id) : 'NULL';
    const imageUrl = escapeSqlString(p.image_url || (Array.isArray(p.images) && p.images[0]) || null);
    const images = escapeSqlString(JSON.stringify(p.images || []));
    const tags = escapeSqlString(JSON.stringify(p.tags || []));
    const isNew = p.is_new ? 1 : 0;
    const bestseller = p.bestseller ? 1 : 0;
    const active = p.active !== false ? 1 : 0;
    const createdAt = escapeSqlString(p.created_at || new Date().toISOString());

    sqlLines.push(
      `INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES (${id}, ${name}, ${slug}, ${desc}, ${brand}, ${price}, ${catId}, ${imageUrl}, ${images}, ${tags}, ${isNew}, ${bestseller}, ${active}, ${createdAt});`
    );
  }

  sqlLines.push('', '-- 3. Blog Posts');

  for (const post of posts) {
    const id = escapeSqlString(post.id);
    const title = escapeSqlString(post.title);
    const slug = escapeSqlString(post.slug);
    const excerpt = escapeSqlString(post.excerpt || 'Presentación de Elizabeth, fundadora de Satibax Boutique.');
    const content = escapeSqlString(post.content);
    const coverImage = escapeSqlString(post.image_url || null);
    const published = post.active !== false ? 1 : 0;
    const createdAt = escapeSqlString(post.created_at || new Date().toISOString());

    sqlLines.push(
      `INSERT OR REPLACE INTO blog_posts (id, title, slug, excerpt, content, cover_image, published, created_at) VALUES (${id}, ${title}, ${slug}, ${excerpt}, ${content}, ${coverImage}, ${published}, ${createdAt});`
    );
  }

  return {
    sql: sqlLines.join('\n') + '\n',
    categoryCount: categories.length,
    productCount: products.length,
    postCount: posts.length,
  };
}

export function writeSeedSqlFile() {
  const { sql, categoryCount, productCount, postCount } = generateSeedData();
  const seedFilePath = path.resolve(rootDir, 'data/seed.sql');
  fs.writeFileSync(seedFilePath, sql, 'utf8');
  console.log(`Generated data/seed.sql successfully:`);
  console.log(`  - Categories: ${categoryCount}`);
  console.log(`  - Products:   ${productCount}`);
  console.log(`  - Blog posts: ${postCount}`);
  return seedFilePath;
}

// If executed directly via CLI: node scripts/seed.mjs [--db <path>]
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeSeedSqlFile();

  const dbFlagIndex = process.argv.indexOf('--db');
  if (dbFlagIndex !== -1 && process.argv[dbFlagIndex + 1]) {
    const dbPath = path.resolve(process.cwd(), process.argv[dbFlagIndex + 1]);
    const { DatabaseSync } = await import('node:sqlite');
    const db = new DatabaseSync(dbPath);
    const schemaPath = path.resolve(rootDir, 'migrations/0001_initial_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const seedSql = fs.readFileSync(path.resolve(rootDir, 'data/seed.sql'), 'utf8');
    db.exec(schemaPath ? schemaSql : '');
    db.exec(seedSql);
    console.log(`Applied schema and seed data directly to SQLite database: ${dbPath}`);
  }
}

