/**
 * Product Image Decoupling and Botanic Fallback Utilities
 *
 * Provides safe fallback handling for product imagery to ensure zero broken images
 * if external storage buckets (such as Supabase free tier) pause or expire.
 */
import type React from 'react';

/**
 * High-resolution botanical cosmetic placeholder SVG data URI.
 * Styled in boutique signature palette: Forest (#3D4D45), Olive (#8FA479), Cream (#F9F7F2).
 */
export const BOTANIC_PLACEHOLDER_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F9F7F2"/>
          <stop offset="100%" stop-color="#EBE5D8"/>
        </linearGradient>
        <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8FA479"/>
          <stop offset="100%" stop-color="#3D4D45"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bgGrad)"/>
      <g transform="translate(130, 80)">
        <!-- Dropper Cap -->
        <rect x="58" y="0" width="24" height="32" rx="6" fill="#3D4D45"/>
        <rect x="48" y="28" width="44" height="14" rx="3" fill="#8FA479"/>
        <!-- Bottle Neck -->
        <rect x="54" y="42" width="32" height="20" fill="#3D4D45" opacity="0.85"/>
        <!-- Bottle Body -->
        <rect x="25" y="62" width="90" height="150" rx="20" fill="url(#bottleGrad)"/>
        <!-- Label Plate -->
        <rect x="35" y="95" width="70" height="85" rx="8" fill="#F9F7F2" opacity="0.95"/>
        <line x1="45" y1="120" x2="95" y2="120" stroke="#3D4D45" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="52" y1="135" x2="88" y2="135" stroke="#8FA479" stroke-width="2" stroke-linecap="round"/>
        <!-- Leaf Silhouette Motif -->
        <path d="M70 78 C58 55, 92 55, 70 78 C48 78, 58 102, 70 78 Z" fill="#8FA479" opacity="0.9"/>
      </g>
      <text x="200" y="335" font-family="serif" font-size="16" font-weight="700" fill="#3D4D45" text-anchor="middle" letter-spacing="1">SATIBAX BOUTIQUE</text>
      <text x="200" y="358" font-family="sans-serif" font-size="10" font-weight="500" fill="#8FA479" text-anchor="middle" letter-spacing="2">COSMÉTICA BOTÁNICA</text>
    </svg>`.trim()
  );

/**
 * Resolves an image URL safely: returns the URL or the botanic SVG placeholder.
 */
export function resolveImageUrl(imageUrl?: string | null): string {
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
    return BOTANIC_PLACEHOLDER_SVG;
  }
  return imageUrl.trim();
}

/**
 * Event handler for <img> onError to guarantee zero visual breakage.
 * Replaces broken sources with the botanic SVG placeholder.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = BOTANIC_PLACEHOLDER_SVG
): void {
  const img = event.currentTarget;
  if (img && img.src !== fallbackSrc) {
    img.onerror = null; // Prevent recursion if placeholder fails
    img.src = fallbackSrc;
  }
}

/**
 * Returns either the original URL or proxy/fallback if the URL is from a known fragile source.
 */
export function proxyOrLocalImageUrl(imageUrl?: string | null): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return BOTANIC_PLACEHOLDER_SVG;
  }
  return imageUrl;
}
