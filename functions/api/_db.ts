/**
 * Database resolver and response helpers for Cloudflare Pages Functions
 */
import type { DbInput } from '../../src/db/catalog';

let fallbackDb: any = null;

export function setFallbackDb(db: any): void {
  fallbackDb = db;
}

export function getFallbackDb(): any {
  return fallbackDb;
}

/**
 * Resolves the database instance:
 * 1. env.DB (Cloudflare D1 binding)
 * 2. Pre-set fallbackDb (e.g. from tests)
 * 3. Dynamic Node.js node:sqlite initialization for local runtime / test
 */
export async function resolveDb(env?: { DB?: any }): Promise<DbInput> {
  if (env?.DB) {
    return env.DB;
  }

  if (fallbackDb) {
    return fallbackDb;
  }

  // Attempt to initialize local SQLite if in Node.js environment
  try {
    const { DatabaseSync } = await import('node:sqlite');
    const fs = await import('node:fs');
    const path = await import('node:path');

    const db = new DatabaseSync(':memory:');
    const schemaPath = path.resolve(process.cwd(), 'migrations/0001_initial_schema.sql');
    const seedPath = path.resolve(process.cwd(), 'data/seed.sql');

    if (fs.existsSync(schemaPath)) {
      db.exec(fs.readFileSync(schemaPath, 'utf8'));
    }
    if (fs.existsSync(seedPath)) {
      db.exec(fs.readFileSync(seedPath, 'utf8'));
    }

    fallbackDb = db;
    return fallbackDb;
  } catch {
    throw new Error(
      'Database binding not available. Provide env.DB in Cloudflare Pages or ensure SQLite adapter is set.'
    );
  }
}

export function jsonResponse(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      ...init?.headers,
    },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, { status });
}
