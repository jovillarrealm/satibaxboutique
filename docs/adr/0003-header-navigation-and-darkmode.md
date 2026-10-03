# Header Navigation Restructuring, Dedicated Inicio View, and Botanical Dark Mode

## Context & Motivation
Following user review and visual alignment with the original Satibax storefront (`satibaxboutique.com.ar`):
1. The **Inicio** page contains the branded editorial experience (full-bleed hero cover photo, 4 botanical pillars, best seller highlights, curated kits editorial, customer reviews, and newsletter).
2. The **Tienda** (Catalog) page should be a dedicated shopping experience focused on search and filtering without the heavy hero cover photo banner, merging products and kits with a quick filter toggle.
3. The **Header** navigation was previously centered with generic names. It must now align navigation items to the right, provide logo-based access to **Inicio** without cluttering the menu bar with an "Inicio" link, and present right-aligned quick actions.
4. **Dark Mode** is an essential user preference feature requiring class-based Tailwind styling, `localStorage` persistence, and an organic botanical dark color scheme.
5. A **Wishlist** (Lista de Deseos) quick action allows customers to favorite items locally before ordering.

## Decisions

### 1. View Architecture & Route Separation
- **`inicio` View**: Accessible by clicking the header logo (`Satibax Boutique.`) or via direct navigation. Renders the full hero banner with `/assets/hero-cover.jpg`, the 4 pillars value proposition, featured best sellers, and reviews.
- **`tienda` View**: Replaces the generic catalog link. Renders the clean search, categories, and dietary/ethical filters, plus a dedicated "Kits de Regalo" filter toggle chip to easily isolate or view all items. It omits the hero cover banner.
- **`nosotros` View**: Labeled as **Sobre Satibax** in the header.
- **`blog` & `contacto` Views**: Retain their dedicated views.
- **`Header` Navigation Menu**:
  - Aligned to the **right** (not centered).
  - Links: `Tienda`, `Sobre Satibax`, `Blog`, `Contacto` (no redundant `Inicio` link in the bar; the brand logo serves as the Home anchor).

### 2. Header Action Cluster
On the far right of the header (both desktop and mobile):
1. **Dark Mode Toggle**: Moon/Sun icon toggling `.dark` class on `document.documentElement` and persisting `'theme'` (`'light'` | `'dark'`) in `localStorage`.
2. **Wishlist Button**: Heart icon with live count badge stored in `localStorage` (`'satibax_wishlist'`), toggling favorites filter in Tienda.
3. **Shopping Bag**: Retains the `ItemSelectionDrawer` dispatch with item count badge.

### 3. Botanical Dark Mode Styling
- Configure Tailwind with `darkMode: 'class'`.
- Define dark color tokens respecting the botanical brand:
  - Base backgrounds: `dark:bg-[#151D18]` (deep forest charcoal) / `dark:bg-[#1c2620]` (elevated surfaces).
  - Cards & modals: `dark:bg-[#223028]`, borders `dark:border-white/10`.
  - Text: `dark:text-[#E8EFEA]`, muted `dark:text-stone-300`.
  - Botanical green accents: `#8FA479` (sage) and WhatsApp vibrant `#25D366`.
