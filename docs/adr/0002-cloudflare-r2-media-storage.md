# Cloudflare R2 for Product Images and Media Assets

The original boutique site hosted product images in an external Supabase storage bucket subject to auto-pause and project expiration. We decided to download and bundle existing images and route new administrative uploads to a Cloudflare R2 bucket via Cloudflare Pages Functions. This ensures perpetual asset availability with zero egress fees within Cloudflare's free tier.
