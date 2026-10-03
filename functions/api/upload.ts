/**
 * Cloudflare Pages Function: Media Upload Endpoint
 *
 * POST /api/upload
 * Handles multipart/form-data image uploads. Writes to Cloudflare R2 bucket
 * (context.env.MEDIA_BUCKET) or fallback local public/uploads/ directory.
 * Returns { success: true, url: string }.
 */
import { checkAdminAuth } from '../../src/lib/adminAuth';
import { jsonResponse, errorResponse } from './_db';
import type { EventContext } from './categories';

export async function onRequestPost(context: EventContext): Promise<Response> {
  // 1. Verify administrative authorization
  const auth = checkAdminAuth(context.request, context.env);
  if (!auth.authorized) {
    return errorResponse(auth.error || 'Unauthorized: Admin access required', 401);
  }

  try {
    const contentType = context.request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return errorResponse('Content-Type must be multipart/form-data', 400);
    }

    const formData = await context.request.formData();
    const fileEntry = formData.get('file') || formData.get('image');

    if (!fileEntry || !(fileEntry instanceof Blob || (typeof fileEntry === 'object' && 'arrayBuffer' in (fileEntry as any)))) {
      return errorResponse('No image file provided in upload request', 400);
    }

    const file = fileEntry as Blob;
    const originalName = (fileEntry as any).name || 'product.jpg';
    const extMatch = originalName.match(/\.[a-zA-Z0-9]+$/);
    const rawExt = extMatch ? extMatch[0].toLowerCase() : '.jpg';
    const ext = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(rawExt)
      ? rawExt
      : '.jpg';

    const filename = `product-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const fileBuffer = await file.arrayBuffer();

    // 2. Cloudflare R2 Bucket persistence
    if (context.env?.MEDIA_BUCKET && typeof context.env.MEDIA_BUCKET.put === 'function') {
      await context.env.MEDIA_BUCKET.put(filename, fileBuffer, {
        httpMetadata: {
          contentType: file.type || 'image/jpeg',
        },
      });

      return jsonResponse({
        success: true,
        url: `/media/${filename}`,
        filename,
      });
    }

    // 3. Fallback local filesystem storage (public/uploads/) for local development and Node runtime
    try {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const uploadDir = path.resolve(process.cwd(), 'public/uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(fileBuffer));

      return jsonResponse({
        success: true,
        url: `/uploads/${filename}`,
        filename,
      });
    } catch {
      // In-memory base64 fallback if filesystem write is unavailable
      const base64 = Buffer.from(fileBuffer).toString('base64');
      const mime = file.type || 'image/jpeg';
      return jsonResponse({
        success: true,
        url: `data:${mime};base64,${base64}`,
        filename,
      });
    }
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to upload image file', 500);
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-token, cf-access-authenticated-user-email',
    },
  });
}

export const onRequest = onRequestPost;
