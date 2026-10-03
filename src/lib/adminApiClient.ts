/**
 * Admin API Client for Satibax Boutique
 *
 * Provides typed methods for interacting with the Cloudflare Pages Functions
 * administrative endpoints.
 */
import type {
  Product,
  Category,
  BlogPost,
  Subscriber,
  CreateProductInput,
  UpdateProductInput,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from './catalog';
import { getAdminAuthHeaders } from './adminAuth';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = `Error ${res.status}: ${res.statusText}`;
    try {
      const json = await res.json();
      if (json?.error) errorMsg = json.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}

export async function fetchAdminProducts(options?: {
  all?: boolean;
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (options?.all !== false) {
    params.set('all', 'true');
  }
  if (options?.category) {
    params.set('category', options.category);
  }
  if (options?.search) {
    params.set('search', options.search);
  }

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`/api/products${query}`, {
    headers: {
      ...getAdminAuthHeaders(),
      Accept: 'application/json',
    },
  });

  return handleResponse<Product[]>(res);
}

export async function fetchAdminCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories', {
    headers: {
      ...getAdminAuthHeaders(),
      Accept: 'application/json',
    },
  });
  return handleResponse<Category[]>(res);
}

export async function createAdminProduct(data: CreateProductInput): Promise<Product> {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      ...getAdminAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Product>(res);
}

export async function updateAdminProduct(
  id: string,
  updates: UpdateProductInput
): Promise<Product> {
  const res = await fetch('/api/products', {
    method: 'PUT',
    headers: {
      ...getAdminAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });
  return handleResponse<Product>(res);
}

export async function toggleProductActive(
  id: string,
  active: boolean
): Promise<Product> {
  return updateAdminProduct(id, { active });
}

export async function fetchAdminBlogPosts(all = true): Promise<BlogPost[]> {
  const query = all ? '?all=true' : '';
  const res = await fetch(`/api/blog${query}`, {
    headers: {
      ...getAdminAuthHeaders(),
      Accept: 'application/json',
    },
  });
  return handleResponse<BlogPost[]>(res);
}

export async function createAdminBlogPost(data: CreateBlogPostInput): Promise<BlogPost> {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: {
      ...getAdminAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<BlogPost>(res);
}

export async function updateAdminBlogPost(
  id: string,
  updates: UpdateBlogPostInput
): Promise<BlogPost> {
  const res = await fetch('/api/blog', {
    method: 'PUT',
    headers: {
      ...getAdminAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });
  return handleResponse<BlogPost>(res);
}

export async function fetchAdminSubscribers(): Promise<Subscriber[]> {
  const res = await fetch('/api/subscribers', {
    headers: {
      ...getAdminAuthHeaders(),
      Accept: 'application/json',
    },
  });
  return handleResponse<Subscriber[]>(res);
}

export async function exportSubscribersCsv(): Promise<void> {
  const res = await fetch('/api/subscribers?format=csv', {
    headers: {
      ...getAdminAuthHeaders(),
      Accept: 'text/csv',
    },
  });

  if (!res.ok) {
    throw new Error('No se pudo descargar la lista de suscriptores.');
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `suscriptores-satibax-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
