/**
 * Products API Endpoint
 *
 * GET /api/products - Lists products (active only for public, all for admin with ?all=true)
 * POST /api/products - Creates a new product (admin protected)
 * PUT /api/products - Updates product details, price, active status (admin protected)
 */
import {
  getProducts,
  createProduct,
  updateProduct,
  type ProductFilterOptions,
} from '../../src/db/catalog';
import { checkAdminAuth } from '../../src/lib/adminAuth';
import { resolveDb, jsonResponse, errorResponse } from './_db';
import type { EventContext } from './categories';

export async function onRequestGet(context: EventContext): Promise<Response> {
  try {
    const db = await resolveDb(context.env);
    const url = new URL(context.request.url);

    const categorySlug = url.searchParams.get('category') || undefined;
    const categoryId = url.searchParams.get('categoryId') || undefined;
    const tag = url.searchParams.get('tag') || undefined;
    const search = url.searchParams.get('search') || undefined;
    const isKitParam = url.searchParams.get('isKit');
    const isKit = isKitParam === 'true' || isKitParam === '1';

    const wantsAll =
      url.searchParams.get('all') === 'true' ||
      url.searchParams.get('activeOnly') === 'false';

    let activeOnly = true;
    if (wantsAll) {
      const auth = checkAdminAuth(context.request, context.env);
      if (auth.authorized) {
        activeOnly = false;
      }
    }

    const filters: ProductFilterOptions = {
      categorySlug,
      categoryId,
      tag,
      search,
      isKit: isKit ? true : undefined,
      activeOnly,
    };

    const products = await getProducts(db, filters);
    return jsonResponse(products);
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to fetch products', 500);
  }
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const auth = checkAdminAuth(context.request, context.env);
  if (!auth.authorized) {
    return errorResponse(auth.error || 'Unauthorized: Admin access required', 401);
  }

  try {
    const db = await resolveDb(context.env);
    let body: any;
    try {
      body = await context.request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    if (!body || typeof body !== 'object') {
      return errorResponse('Missing product data', 400);
    }

    if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
      return errorResponse('Product name is required', 400);
    }

    if (
      body.price === undefined ||
      body.price === null ||
      isNaN(Number(body.price)) ||
      Number(body.price) < 0
    ) {
      return errorResponse('Valid non-negative product price is required', 400);
    }

    const created = await createProduct(db, {
      name: body.name.trim(),
      price: Number(body.price),
      slug: body.slug,
      description: body.description ?? null,
      brand: body.brand ?? null,
      category_id: body.category_id ?? null,
      image_url: body.image_url ?? null,
      images: Array.isArray(body.images) ? body.images : undefined,
      tags: Array.isArray(body.tags) ? body.tags : undefined,
      is_new: Boolean(body.is_new),
      bestseller: Boolean(body.bestseller),
      active: body.active !== undefined ? Boolean(body.active) : true,
    });

    return jsonResponse(created, { status: 201 });
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to create product', 500);
  }
}

export async function onRequestPut(context: EventContext): Promise<Response> {
  const auth = checkAdminAuth(context.request, context.env);
  if (!auth.authorized) {
    return errorResponse(auth.error || 'Unauthorized: Admin access required', 401);
  }

  try {
    const db = await resolveDb(context.env);
    const url = new URL(context.request.url);

    let body: any;
    try {
      body = await context.request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const id = body?.id || url.searchParams.get('id');
    if (!id || typeof id !== 'string') {
      return errorResponse('Product ID is required', 400);
    }

    if (
      body.price !== undefined &&
      (isNaN(Number(body.price)) || Number(body.price) < 0)
    ) {
      return errorResponse('Price must be a valid non-negative number', 400);
    }

    const updated = await updateProduct(db, id, {
      name: body.name,
      slug: body.slug,
      description: body.description,
      brand: body.brand,
      price: body.price !== undefined ? Number(body.price) : undefined,
      category_id: body.category_id,
      image_url: body.image_url,
      images: Array.isArray(body.images) ? body.images : undefined,
      tags: Array.isArray(body.tags) ? body.tags : undefined,
      is_new: body.is_new !== undefined ? Boolean(body.is_new) : undefined,
      bestseller: body.bestseller !== undefined ? Boolean(body.bestseller) : undefined,
      active: body.active !== undefined ? Boolean(body.active) : undefined,
    });

    if (!updated) {
      return errorResponse('Product not found', 404);
    }

    return jsonResponse(updated, { status: 200 });
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to update product', 500);
  }
}
