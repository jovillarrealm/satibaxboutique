/**
 * Satibax Boutique - Media Storage Client Adapter
 *
 * Provides client-side helpers to upload product imagery to Cloudflare R2 / local uploads
 * via the /api/upload endpoint.
 */
import { getAdminAuthHeaders } from './adminAuth';

export interface UploadImageResult {
  success: boolean;
  url: string;
  filename?: string;
  error?: string;
}

/**
 * Uploads a product image file to the boutique media storage.
 *
 * @param file - File or Blob object containing the image
 * @returns UploadImageResult containing { success: true, url: string }
 */
export async function uploadProductImage(file: File | Blob): Promise<UploadImageResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      ...getAdminAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = `Upload failed with status ${response.status}`;
    try {
      const json = await response.json();
      if (json?.error) {
        errorMsg = json.error;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return {
    success: true,
    url: data.url,
    filename: data.filename,
  };
}
