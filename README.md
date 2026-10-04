# Satibax Boutique — Cosmética Natural y Bienestar

> Modern botanical storefront deployed to Cloudflare Pages with perpetual $0/month infrastructure costs, Cloudflare D1 serverless relational database, and direct WhatsApp order coordination.

---

## 🌿 Overview

**Satibax Boutique** is an online boutique specializing in artisan botanical skincare, therapeutic serums, handmade soaps, and aromatherapy. This project completely eliminates recurring hosting fees by replacing legacy hosting and fragile external database dependencies with a modern, high-performance **Cloudflare Pages + Cloudflare D1** architecture.

### Key Highlights
- **100% Zero-Cost Architecture ($0/month)**: Free-tier Cloudflare Pages hosting, Cloudflare D1 serverless SQLite at the edge, and Cloudflare R2 for zero-egress media storage.
- **Preserved 74-Product Catalog**: All 74 original boutique products, 4 categories, curated gift kits, and authentic founder blog posts migrated with zero loss.
- **Frictionless WhatsApp Ordering**: Assembled Item Selection compiles into a structured, itemized WhatsApp message dispatched directly to Elizabeth (`+54 9 2252 515155`).
- **Botanical Aesthetic**: Dark forest (`#3D4D45`), Olive accent (`#8FA479`), Warm cream canvas (`#F9F7F2`), and editorial typography (*Playfair Display* + *Lato*).
- **Zero Trust Admin Security**: Protected `/admin` panel secured with Cloudflare Access (one-time email passcodes), eliminating password management risks.

---

## 🏗️ Architecture & Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge Network                      │
├────────────────────────┬────────────────────────────────────────┤
│ Cloudflare Pages (CDN) │ Cloudflare Pages Functions (/api/*)    │
│ - Vite + React 19 SPA  │ - /api/products (CRUD + filtering)     │
│ - Tailwind CSS styling │ - /api/categories                      │
│ - Lucide React icons   │ - /api/blog (Articles & posts)         │
│ - public/_routes.json  │ - /api/subscribers (Newsletter + CSV)  │
├────────────────────────┴────────────────────────────────────────┤
│ Bindings:                                                       │
│ - DB (Cloudflare D1 SQLite Database)                            │
│ - MEDIA_BUCKET (Cloudflare R2 Object Storage)                   │
│ Security: Cloudflare Zero Trust (Access Email OTP)              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v20+ or v22+
- `npm` v10+

### Quick Start

1. **Clone the repository and install dependencies**:
   ```bash
   git clone https://github.com/satibax/satibax-boutique.git
   cd satibax-boutique
   npm install
   ```

2. **Run local Vite development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Run local test suite**:
   ```bash
   npm test
   ```
   Runs the full Vitest suite (all test files pass 100%).

4. **Verify production build**:
   ```bash
   npm run build
   ```
   Compiles TypeScript and bundles assets into `dist/` with zero errors.

5. **Run Cloudflare Pages emulation locally (with D1 & Functions)**:
   ```bash
   npm run pages:dev
   ```

---

## 🗄️ Database & Seeding

The application includes an offline-capable SQLite schema and data snapshot containing all 74 original products and categories:

- `migrations/0001_initial_schema.sql`: D1 database table definitions and indices.
- `data/seed.sql`: Pre-populated SQL seed data.
- `scripts/seed.mjs`: Script to generate seed SQL or populate a local SQLite file.

To re-generate seed SQL or seed a local database file:
```bash
npm run seed
# Or seed a local SQLite file directly:
npm run seed -- --db satibax-local.sqlite
```

---

## ☁️ Zero-Cost Cloudflare Deployment Guide

Follow these steps to deploy Satibax Boutique to Cloudflare with $0/month recurring fees:

### 1. Create Cloudflare D1 Database

In your Cloudflare dashboard (or via Wrangler CLI):
```bash
npx wrangler d1 create satibax-db
```
The command outputs your `database_id`. Open `wrangler.jsonc` and replace the placeholder:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "satibax-db",
    "database_id": "<YOUR-ACTUAL-D1-DATABASE-ID>",
    "migrations_dir": "migrations"
  }
]
```

### 2. Create Cloudflare R2 Media Bucket

```bash
npx wrangler r2 bucket create satibax-media
```

### 3. Apply Migrations to Remote D1

Run the initial schema migration on your production Cloudflare D1 database:
```bash
npm run d1:migrate:prod
```

### 4. Seed 74 Products & Categories into Remote D1

Execute the pre-built seed SQL script directly on your production D1 instance:
```bash
npx wrangler d1 execute satibax-db --remote --file=./data/seed.sql
```

### 5. Deploy Cloudflare Pages Application

You can deploy directly from your local terminal:
```bash
npm run build
npm run pages:deploy
```
Or connect your GitHub repository to Cloudflare Pages for automatic deployments on push to `main`:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- Under **Settings > Functions > D1 database bindings**:
  - Variable name: `DB`
  - D1 database: `satibax-db`
- Under **Settings > Functions > R2 bucket bindings**:
  - Variable name: `MEDIA_BUCKET`
  - R2 bucket: `satibax-media`

### 6. Configure Cloudflare Zero Trust (Access) for Admin Security

Protect administrative access to `/admin` and `/api/*` administrative mutations without complex passwords:
1. In Cloudflare Zero Trust dashboard, go to **Access > Applications > Add an application**.
2. Select **Self-hosted**.
3. Set Application Domain: `satibax.com.ar` with Path: `/admin*`.
4. Add an Access Policy:
   - Action: `Allow`
   - Include: `Emails` -> `elizabeth@satibax.com` (and authorized administrative emails).
   - Identity Provider: **One-time PIN (OTP)** sent to email.
5. Cloudflare automatically injects the verified email header (`cf-access-authenticated-user-email`) into all requests.

### 7. Custom Domain Delegation (NIC Argentina)

To connect your `.com.ar` domain:
1. In Cloudflare Dashboard, add the domain `satibax.com.ar`.
2. Cloudflare will assign two free nameservers (e.g., `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`).
3. Log into [NIC Argentina](https://nic.ar), select your domain, and update the DNS delegating nameservers to Cloudflare.
4. In Cloudflare Pages, navigate to **Custom domains** and add `satibax.com.ar` and `www.satibax.com.ar`. Cloudflare automatically provisions and renews free SSL certificates.

---

## 📲 WhatsApp Ordering Flow

Satibax Boutique handles order coordination, stock confirmation, and shipping directly via WhatsApp:

1. **Browsing & Discovery**: Customers browse the catalog, filter by categories (*Skincare, Natural, Vegano, Jabones*), ethical tags (*Celiaco-Safe, Cruelty-Free*), or search by keyword.
2. **Item Selection Drawer**: Customers add items with desired quantities. The slide-over drawer calculates subtotals and grand totals in Argentine Pesos (ARS).
3. **WhatsApp Dispatch**: Clicking **"Pedir por WhatsApp"** generates a URI-encoded URL targeting Elizabeth's WhatsApp number (`+54 9 2252 515155`):
   ```
   ¡Hola! Me gustaría hacer el siguiente pedido:
   • 2x Serum Facial Regenerador - $ 35.000
   • 1x Jabón Botánico de Caléndula - $ 8.500
   *Total: $ 43.500*
   ¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!
   ```

---

## 🧪 Testing

The repository maintains comprehensive test coverage across both unit domain models and full end-to-end integration seams:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage Map
- `test/catalog.test.ts`: D1 / SQLite database querying, filters, and offline adapter.
- `test/storefrontCatalog.test.ts`: Catalog filtering, tag search, and state transitions.
- `test/itemSelection.test.ts`: Pure domain cart engine (add, increment, decrement, remove, total calculation).
- `test/itemSelectionDrawer.test.ts`: Slide-over UI drawer mechanics and interactions.
- `test/whatsappCompiler.test.ts`: Canonical WhatsApp order message encoding and validation.
- `test/productDetailAndKits.test.ts`: Product detail modal, kits section, and gallery.
- `test/contentPages.test.ts`: Blog view, Nosotros view, Contacto view, and newsletter.
- `test/adminApi.test.ts`: Admin endpoints, authentication headers, and Cloudflare Pages Functions.
- `test/e2eIntegration.test.ts`: Full end-to-end customer journey from catalog load to order compilation and admin mutations.

---

## 📄 License

Proprietary © Satibax Boutique. All rights reserved.
