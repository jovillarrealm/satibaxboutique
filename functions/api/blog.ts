/**
 * Blog API Endpoint
 *
 * GET /api/blog - Lists blog posts or retrieves a single post by ?slug=...
 * POST /api/blog - Creates a new blog post (admin protected)
 * PUT /api/blog - Updates an existing blog post (admin protected)
 */
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
} from '../../src/db/catalog';
import { checkAdminAuth } from '../../src/lib/adminAuth';
import { resolveDb, jsonResponse, errorResponse } from './_db';
import type { EventContext } from './categories';

export async function onRequestGet(context: EventContext): Promise<Response> {
  try {
    const db = await resolveDb(context.env);
    const url = new URL(context.request.url);

    const slug = url.searchParams.get('slug');
    if (slug) {
      const post = await getBlogPostBySlug(db, slug);
      if (!post) {
        return errorResponse('Blog post not found', 404);
      }
      return jsonResponse(post);
    }

    const wantsAll = url.searchParams.get('all') === 'true';
    let publishedOnly = true;

    if (wantsAll) {
      const auth = checkAdminAuth(context.request, context.env);
      if (auth.authorized) {
        publishedOnly = false;
      }
    }

    const posts = await getBlogPosts(db, { publishedOnly });
    return jsonResponse(posts);
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to fetch blog posts', 500);
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
      return errorResponse('Missing blog post data', 400);
    }

    if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
      return errorResponse('Title is required', 400);
    }

    if (!body.content || typeof body.content !== 'string' || !body.content.trim()) {
      return errorResponse('Content is required', 400);
    }

    const created = await createBlogPost(db, {
      title: body.title.trim(),
      content: body.content.trim(),
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      cover_image: body.cover_image ?? null,
      published: body.published !== undefined ? Boolean(body.published) : true,
    });

    return jsonResponse(created, { status: 201 });
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to create blog post', 500);
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
      return errorResponse('Blog post ID is required', 400);
    }

    const updated = await updateBlogPost(db, id, {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      cover_image: body.cover_image,
      published: body.published !== undefined ? Boolean(body.published) : undefined,
    });

    if (!updated) {
      return errorResponse('Blog post not found', 404);
    }

    return jsonResponse(updated, { status: 200 });
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to update blog post', 500);
  }
}
