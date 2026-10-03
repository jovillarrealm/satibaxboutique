/**
 * GET /api/categories
 *
 * Returns list of all catalog categories.
 */
import { getCategories } from '../../src/db/catalog';
import { resolveDb, jsonResponse, errorResponse } from './_db';

export interface EventContext<Env = any, Params = any, Data = any> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Params;
  data: Data;
}

export async function onRequestGet(context: EventContext): Promise<Response> {
  try {
    const db = await resolveDb(context.env);
    const categories = await getCategories(db);
    return jsonResponse(categories);
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to fetch categories', 500);
  }
}

export const onRequest = onRequestGet;
