/**
 * Subscribers API Endpoint
 *
 * GET /api/subscribers - Lists all subscribers (admin protected, supports format=csv)
 * POST /api/subscribers - Records a new subscriber (public)
 */
import { getSubscribers, addSubscriber } from '../../src/db/catalog';
import { checkAdminAuth } from '../../src/lib/adminAuth';
import { resolveDb, jsonResponse, errorResponse } from './_db';
import type { EventContext } from './categories';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestGet(context: EventContext): Promise<Response> {
  const auth = checkAdminAuth(context.request, context.env);
  if (!auth.authorized) {
    return errorResponse(auth.error || 'Unauthorized: Admin access required', 401);
  }

  try {
    const db = await resolveDb(context.env);
    const subscribers = await getSubscribers(db);
    const url = new URL(context.request.url);

    const wantsCsv =
      url.searchParams.get('format') === 'csv' ||
      context.request.headers.get('accept')?.includes('text/csv');

    if (wantsCsv) {
      const header = 'id,email,created_at';
      const rows = subscribers.map(
        (s) => `"${s.id}","${s.email}","${s.created_at}"`
      );
      const csv = [header, ...rows].join('\n');

      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="subscribers.csv"',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return jsonResponse(subscribers);
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to fetch subscribers', 500);
  }
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  try {
    const db = await resolveDb(context.env);
    let body: any;
    try {
      body = await context.request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const email = body?.email;
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return errorResponse('Invalid email address', 400);
    }

    const subscriber = await addSubscriber(db, email.trim());
    return jsonResponse(subscriber, { status: 201 });
  } catch (err: any) {
    return errorResponse(err?.message || 'Failed to record subscriber', 500);
  }
}
