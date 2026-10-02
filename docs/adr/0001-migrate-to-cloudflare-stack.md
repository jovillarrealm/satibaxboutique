# Migrate Storefront and Data Layer to Cloudflare Pages and D1

The existing storefront was hosted on Hostinger with an orphaned Supabase database that risks auto-pausing and lacks administrative dashboard access. We decided to extract the Vite + React SPA, migrate the product catalog and blog data into Cloudflare D1 (with Cloudflare Pages Functions), and secure the `/admin` route via Cloudflare Zero Trust Access. This consolidates hosting, edge database, and authentication into a single perpetual $0/month Cloudflare infrastructure with zero external account dependencies.
