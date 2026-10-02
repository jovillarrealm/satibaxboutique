## Problem Statement

The owner of Satibax Boutique is currently paying recurring hosting fees on Hostinger for an online boutique storefront. The existing store depends on an unmaintained external Supabase database project that is susceptible to 7-day inactivity auto-pausing (which takes down the storefront and breaks public images), and the store owner lacks administrative access to the original source code repository and database dashboard. The boutique needs to eliminate hosting costs entirely by migrating to a perpetual $0/month Cloudflare stack while preserving its 74-product natural cosmetics catalog, existing WhatsApp-based order workflow, and editorial aesthetics.

## Solution

A clean, modern storefront application deployed to Cloudflare Pages with zero recurring hosting costs. The application replaces the fragile external database with Cloudflare D1 (serverless SQL) for the catalog, bundles and hosts all product images locally and via Cloudflare R2 (eliminating external image link breakage), secures administrative management via Cloudflare Zero Trust (Access) with one-time email passcodes, and modernizes the natural botanical aesthetic. The customer experience centers on an Item Selection drawer that formats inquiries directly into WhatsApp messages sent to the boutique's phone number to finalize stock, payment, and shipping in direct conversation.

## User Stories

1. As a boutique customer, I want to view the full catalog of natural cosmetic products on the homepage and dedicated catalog views, so that I can discover items suited to my skin and wellness needs.
2. As a boutique customer, I want each product card to display high-quality imagery, product title, brand, and clearly formatted Argentine Peso (ARS) pricing, so that I can evaluate products quickly.
3. As a boutique customer, I want to filter products by category (such as Facial, Corporal, Capilar, and Aromaterapia), so that I can find products for specific self-care routines.
4. As a boutique customer, I want to filter products by dietary and ethical tags (such as Natural, Vegano, and Celiaco-Safe), so that I can shop in alignment with my dietary restrictions and ethical preferences.
5. As a boutique customer, I want to search products by keyword or brand name, so that I can quickly locate specific items like retinol serums or alum stones.
6. As a boutique customer, I want to browse curated gift Kits in a dedicated section, so that I can purchase bundled natural care routines for myself or as presents.
7. As a boutique customer, I want to open a detailed product view with comprehensive descriptions, ingredient listings, benefits, and usage instructions, so that I understand how to use the cosmetic safely and effectively.
8. As a boutique customer, I want to add products and kits to my Item Selection with a single click, so that I can assemble my prospective order while continuing to browse.
9. As a boutique customer, I want an easily accessible Item Selection drawer that slides in from the screen edge, so that I can inspect my selected items without losing my place on the page.
10. As a boutique customer, I want to increment and decrement quantities or remove products within my Item Selection, so that my order list reflects exactly what I want to purchase.
11. As a boutique customer, I want my Item Selection to persist across page navigations and browser refreshes, so that I do not lose my selected items if I accidentally close the tab.
12. As a boutique customer, I want to see an automatically updated total price calculated across all items in my Item Selection, so that I know the estimated order cost before initiating contact.
13. As a boutique customer, I want to click a "Pedir por WhatsApp" button that automatically opens WhatsApp with an itemized, politely formatted order message, so that I can coordinate availability, delivery, and payment directly with the store staff.
14. As a boutique customer, I want a floating WhatsApp contact button available on all pages, so that I can ask general questions even if I haven't assembled an Item Selection.
15. As a boutique customer, I want to read educational articles on the boutique blog, so that I can learn about natural ingredients, skincare rituals, and healthy habits.
16. As a boutique customer, I want to read individual blog posts with rich formatting, imagery, and related product links, so that I can deepen my knowledge on specific skincare topics.
17. As a boutique customer, I want to view an "About Us" (Nosotros) story page, so that I understand the boutique's philosophy, origin, and commitment to clean cosmetics.
18. As a boutique customer, I want a clear Contact page with location details, operating hours, and communication channels, so that I know where the boutique operates and when they respond.
19. As a boutique customer, I want to submit my email address to subscribe to the boutique newsletter, so that I receive updates on new product arrivals and seasonal discounts.
20. As a boutique customer, I want the website to load instantly on mobile phones with smooth drawer transitions and responsive typography, so that I have a seamless shopping experience on handheld devices.
21. As a Store Admin, I want to access a protected administration dashboard via Cloudflare Zero Trust using a secure one-time passcode sent to my email, so that I can manage store data without remembering complex passwords or risking unauthorized access.
22. As a Store Admin, I want to view a table of all products with stock indicators, active status, prices, and categories, so that I can manage the boutique's inventory at a glance.
23. As a Store Admin, I want to create new products with title, brand, description, ingredient notes, tags, category, and price, so that new arrivals appear on the storefront immediately.
24. As a Store Admin, I want to upload new product photos directly through the dashboard with automated storage in Cloudflare R2, so that new products have high-resolution imagery without manual file hosting.
25. As a Store Admin, I want to toggle products between active and inactive states, so that out-of-stock items can be hidden from customers without deleting their records.
26. As a Store Admin, I want to edit existing product pricing and descriptions, so that the catalog stays accurate as manufacturer prices or formulas change.
27. As a Store Admin, I want to compose, edit, and publish blog articles with title, slug, cover image, and body content, so that I can maintain active content marketing.
28. As a Store Admin, I want to view and export the list of newsletter subscribers, so that I can run promotional email campaigns.
29. As a developer, I want all 74 original products and 4 categories pre-seeded into an offline-capable SQLite database schema, so that the storefront can be developed and tested locally without cloud connectivity.
30. As a boutique owner, I want the storefront hosted on Cloudflare Pages with continuous deployment from GitHub and zero hosting costs, so that my monthly overhead drops to $0 permanently.

## Implementation Decisions

### Architectural Shape
- Deploy as a Single Page Application built with modern frontend tooling, Tailwind CSS for styling, and Lucide icons for UI symbols, hosted on Cloudflare Pages.
- Replace external database dependencies with Cloudflare D1 (serverless relational SQLite at the edge) and Cloudflare Pages Functions to serve API endpoints.
- Secure administrative routes behind Cloudflare Zero Trust (Access) using email one-time passcodes, offloading identity verification entirely to edge policies.
- Decouple product imagery from the external Supabase storage bucket by archiving all existing product images directly into local assets and routing new administrative media uploads to a Cloudflare R2 storage bucket.

### Module Boundaries and Interfaces
- **Storefront Application Controller**: Exposes the top-level interface for fetching the product catalog, filtering by category and ethical tag, managing the client-side Item Selection state, and rendering view routes.
- **WhatsApp Order Compiler**: Pure domain module that accepts an Item Selection entity and store configuration, computes line subtotals and grand totals in Argentine Pesos, and returns the URI-encoded WhatsApp dispatch URL targeting the boutique's phone number (`+54 9 2252 515155`).
- **Catalog Data Adapter**: Exposes relational query functions over Cloudflare D1 for listing active products, retrieving kit bundles, fetching blog articles, and recording newsletter subscriptions.
- **Media Storage Adapter**: Exposes functions for generating signed upload targets or proxying media writes to Cloudflare R2, returning persistent public CDN URLs for product imagery.

### Data Schema
- `categories`: `id` (text primary key), `name` (text), `slug` (text unique), `description` (text).
- `products`: `id` (text primary key), `name` (text), `slug` (text unique), `description` (text), `brand` (text), `price` (real), `category_id` (foreign key to categories), `image_url` (text), `images` (JSON array of strings), `tags` (JSON array of strings), `is_new` (boolean), `bestseller` (boolean), `active` (boolean), `created_at` (text ISO timestamp).
- `blog_posts`: `id` (text primary key), `title` (text), `slug` (text unique), `excerpt` (text), `content` (text), `cover_image` (text), `published` (boolean), `created_at` (text ISO timestamp).
- `subscribers`: `id` (text primary key), `email` (text unique), `created_at` (text ISO timestamp).

### WhatsApp Message Contract
- The generated WhatsApp message adheres strictly to the canonical customer template:
  - Header: `"¡Hola! Me gustaría hacer el siguiente pedido:"`
  - Body: Itemized lines in the format `"{quantity}x {product_name} - ${item_subtotal}"`
  - Footer: `"*Total: ${grand_total}*"` followed by `"¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!"`
  - Target URL format: `https://wa.me/5492252515155?text={encoded_message}`

### Aesthetic Refinement
- Maintain the botanical color identity: primary dark forest (`#3D4D45`), olive accent (`#8FA479`), warm cream canvas (`#F9F7F2`), and plum highlight (`#553A49`).
- Use the established editorial font pairing: *Playfair Display* for headings and *Lato* for body typography.
- Modernize layout with clean card elevations, refined negative space, tactile button states, and smooth slide-over drawer mechanics for mobile viewports.

## Testing Decisions

### Test Principles
- Tests must verify external observable behavior across defined seams, rather than asserting on internal implementation details, private component state, or ephemeral DOM structures.
- A good test exercises the domain rule (e.g. calculation of totals, correct WhatsApp message encoding, proper filtering of inactive products) and fails only when business behavior breaks.

### Seams Under Test
- **The Storefront Application Seam**: The primary test surface exercising catalog loading, category/tag filtering, Item Selection state transitions (add, increment, decrement, remove, clear), and WhatsApp order compilation.
- **The Cloudflare Data API Seam**: Pages Functions integration tests executing against local SQLite/D1 emulation to verify database migrations, query filtering, and admin mutations.

### Chrome DevTools MCP Browser Testing
- Real browser testing is conducted using the Chrome DevTools MCP server across representative viewport dimensions (mobile 390x844 and desktop 1280x800).
- Browser tests will:
  - Navigate to the storefront and take visual snapshots to verify responsive layout, font loading, and botanical aesthetic consistency.
  - Interact with product cards, click to add items to the Item Selection, open the drawer, and verify that quantity changes update line items and grand totals in real time.
  - Trigger the WhatsApp order action and assert that the generated URL contains valid `wa.me/5492252515155` parameters matching the selected items.
  - Inspect browser logs via `list_console_messages` to ensure zero runtime errors or unhandled promise rejections.

## Out of Scope
- Automated payment gateway integration (e.g. Mercado Pago checkout API, credit card processing) is strictly deferred; all transactions continue via WhatsApp.
- Third-party shipping and courier API calculation; logistics remain coordinated manually in WhatsApp conversation.
- Multi-currency conversion or internationalization outside Argentine Pesos (ARS) and Spanish.
- User account registration and authentication for customers; shopping remains frictionless without accounts.

## Further Notes
- The domain cutover (delegating nameservers from Hostinger to Cloudflare on NIC Argentina) will be performed as the final operational step once the new site is built and verified on its Cloudflare Pages preview URL.
- All 74 extracted products and images from the live store must be migrated to guarantee zero content regression on day one.
