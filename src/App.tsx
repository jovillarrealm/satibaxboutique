import React, { useState, useEffect, useMemo } from 'react';
import type { Product, Category } from './db/catalog';
import { DEFAULT_PRODUCTS, DEFAULT_CATEGORIES } from './data/initialCatalog';
import { filterProducts } from './utils/catalogFiltering';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { TagFilter } from './components/TagFilter';
import { SearchBar } from './components/SearchBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  NosotrosView,
  BlogView,
  ContactoView,
  NewsletterSubscription,
  InicioView,
} from './components/content';
import { AdminDashboard } from './components/admin';
import {
  loadSelectionFromStorage,
  saveSelectionToStorage,
  addItem,
  updateQuantity,
  removeItem,
  clearSelection,
  type ItemSelection,
} from './domain/itemSelection';
import { ItemSelectionDrawer } from './components/ItemSelectionDrawer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Sparkles, Gift, Heart } from 'lucide-react';
import { getInitialTheme, setStoredTheme, applyTheme } from './utils/theme';
import {
  loadWishlistFromStorage,
  saveWishlistToStorage,
  toggleWishlist,
} from './domain/wishlist';

export interface AppProps {
  initialProducts?: Product[];
  initialCategories?: Category[];
  initialNav?: string;
}

export const App: React.FC<AppProps> = ({
  initialProducts = DEFAULT_PRODUCTS,
  initialCategories = DEFAULT_CATEGORIES,
  initialNav = 'inicio',
}) => {
  // Catalog state with live fetching from /api/products and /api/categories
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Live catalog fetching from Cloudflare Pages API on mount (with offline fallback)
  useEffect(() => {
    let isMounted = true;
    const fetchLiveCatalog = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products').catch(() => null),
          fetch('/api/categories').catch(() => null),
        ]);

        if (prodRes && prodRes.ok) {
          const liveProducts = await prodRes.json();
          if (isMounted && Array.isArray(liveProducts) && liveProducts.length > 0) {
            setProducts(liveProducts);
          }
        }

        if (catRes && catRes.ok) {
          const liveCategories = await catRes.json();
          if (isMounted && Array.isArray(liveCategories) && liveCategories.length > 0) {
            setCategories(liveCategories);
          }
        }
      } catch {
        // Retain fallback to initialProducts / DEFAULT_PRODUCTS
      }
    };

    fetchLiveCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [kitOnly, setKitOnly] = useState<boolean>(initialNav === 'kits');
  const [activeNav, setActiveNav] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return 'admin';
    }
    return initialNav;
  });
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Sync navigation on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        if (window.location.pathname.startsWith('/admin')) {
          setActiveNav('admin');
        } else {
          setActiveNav('catalogo');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Product Detail Modal state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Item Selection state persisted to localStorage using domain engine
  const [selection, setSelection] = useState<ItemSelection>(() => {
    return loadSelectionFromStorage();
  });

  // Drawer slide-over open/closed state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Sync selection to localStorage
  useEffect(() => {
    saveSelectionToStorage(selection);
  }, [selection]);

  // Theme state persisted to localStorage and applied to documentElement
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    setStoredTheme(theme);
  }, [theme]);

  const handleToggleDarkMode = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => loadWishlistFromStorage());

  useEffect(() => {
    saveWishlistToStorage(wishlist);
  }, [wishlist]);

  const handleToggleFavorite = (productId: string) => {
    setWishlist((prev) => toggleWishlist(prev, productId));
  };

  // Quick filter for wishlist items in Tienda
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);

  // Support global custom event for opening selection drawer
  useEffect(() => {
    const handleOpenDrawer = () => setIsDrawerOpen(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('satibax:open-selection', handleOpenDrawer);
      return () => {
        window.removeEventListener('satibax:open-selection', handleOpenDrawer);
      };
    }
  }, []);

  // Handle adding product to selection with quantity
  const handleAddToSelection = (product: Product, quantity: number = 1) => {
    setSelection((prev) => addItem(prev, product, quantity));
  };

  // Open detail modal for product
  const handleViewDetails = (product: Product) => {
    setSelectedProductForDetail(product);
  };

  // Handle updating product quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setSelection((prev) => updateQuantity(prev, productId, quantity));
  };

  // Handle removing product from selection
  const handleRemoveItem = (productId: string) => {
    setSelection((prev) => removeItem(prev, productId));
  };

  // Handle clearing entire selection
  const handleClearSelection = () => {
    setSelection(clearSelection());
  };

  // Toggle tag filter
  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedCategory('todos');
    setSelectedTags([]);
    setSearchQuery('');
    setKitOnly(false);
    setFavoritesOnly(false);
  };

  // Handle nav clicks
  const handleNavClick = (navId: string) => {
    let targetNav = navId;
    if (navId === 'catalogo') {
      targetNav = 'tienda';
      setKitOnly(false);
      setFavoritesOnly(false);
    } else if (navId === 'kits') {
      targetNav = 'tienda';
      setKitOnly(true);
      setFavoritesOnly(false);
      setSelectedCategory('todos');
    } else if (navId === 'tienda') {
      setKitOnly(false);
      setFavoritesOnly(false);
    }
    setActiveNav(targetNav);
    if (typeof window !== 'undefined' && window.history?.pushState) {
      const targetPath = targetNav === 'admin' ? '/admin' : '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
    if (targetNav !== 'blog') {
      setSelectedBlogSlug(null);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle header wishlist click: navigates to Tienda and activates favorites filter
  const handleOpenWishlist = () => {
    setActiveNav('tienda');
    setFavoritesOnly(true);
    setKitOnly(false);
    setSelectedCategory('todos');
    if (typeof window !== 'undefined' && window.history?.pushState) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter products according to current state
  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, {
      category: selectedCategory,
      tags: selectedTags,
      query: searchQuery,
      kitOnly,
      activeOnly: true,
    });
    if (favoritesOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }
    return result;
  }, [products, selectedCategory, selectedTags, searchQuery, kitOnly, favoritesOnly, wishlist]);

  // Dedicated Admin Dashboard View (routed via /admin or footer link)
  if (activeNav === 'admin') {
    return (
      <AdminDashboard
        onViewStorefront={() => {
          handleNavClick('catalogo');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] dark:bg-[#151D18] text-[#3D4D45] dark:text-[#E8EFEA] flex flex-col font-sans selection:bg-[#8FA479]/30 transition-colors duration-200">
      {/* Navigation Header */}
      <Header
        itemCount={selection.totalItems}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenSelection={() => setIsDrawerOpen(true)}
        isDarkMode={theme === 'dark'}
        onToggleDarkMode={handleToggleDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={handleOpenWishlist}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* View 1: Inicio (Branded Editorial Homepage with Hero Cover, Pillars, Destacados & Reviews) */}
        {activeNav === 'inicio' && (
          <InicioView
            products={products}
            onNavigateTienda={(options) => {
              setActiveNav('tienda');
              setFavoritesOnly(false);
              if (options?.kitOnly) {
                setKitOnly(true);
                setSelectedCategory('todos');
              } else {
                setKitOnly(false);
                if (options?.category) {
                  setSelectedCategory(options.category);
                }
              }
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onAddToSelection={handleAddToSelection}
            onViewDetails={handleViewDetails}
            wishlist={wishlist}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* View 2: Tienda & Catálogo (Dedicated Shopping View WITHOUT Hero Cover Image) */}
        {(activeNav === 'tienda' || activeNav === 'catalogo' || activeNav === 'kits') && (
          <>
            <section className="bg-[#F9F7F2] dark:bg-[#151D18] py-8 sm:py-10 border-b border-[#3D4D45]/10 dark:border-white/10 transition-colors duration-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[#8FA479] font-bold text-xs uppercase tracking-widest">
                      Tienda Botánica
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D4D45] dark:text-[#E8EFEA] mt-1">
                      {favoritesOnly ? 'Mis Favoritos' : 'Tienda & Catálogo Completo'}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[#3D4D45]/80 dark:text-[#E8EFEA]/80 font-light max-w-2xl">
                      {favoritesOnly
                        ? 'Tus productos seleccionados en tu lista de deseos personal.'
                        : 'Cuidado natural para tu piel y bienestar diario. Cosmética consciente, extractos puros y combinaciones botánicas.'}
                    </p>
                  </div>

                  {/* Quick Filters Cluster */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setFavoritesOnly(!favoritesOnly);
                        if (!favoritesOnly) {
                          setKitOnly(false);
                          setSelectedCategory('todos');
                        }
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                        favoritesOnly
                          ? 'bg-[#8FA479] text-[#151D18] shadow-sm font-bold'
                          : 'bg-white dark:bg-[#223028] text-[#3D4D45] dark:text-[#E8EFEA] hover:bg-[#8FA479]/15 dark:hover:bg-white/10 border border-[#3D4D45]/15 dark:border-white/10'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favoritesOnly ? 'fill-current text-[#151D18]' : 'text-[#8FA479]'}`} />
                      <span>{favoritesOnly ? 'Mostrando sólo Favoritos' : `Favoritos (${wishlist.length})`}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setKitOnly(!kitOnly);
                        if (!kitOnly) {
                          setFavoritesOnly(false);
                          setSelectedCategory('todos');
                        }
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                        kitOnly
                          ? 'bg-[#553A49] text-[#F9F7F2] shadow-sm font-bold'
                          : 'bg-white dark:bg-[#223028] text-[#3D4D45] dark:text-[#E8EFEA] hover:bg-[#8FA479]/15 dark:hover:bg-white/10 border border-[#3D4D45]/15 dark:border-white/10'
                      }`}
                    >
                      <Gift className="w-4 h-4 text-[#8FA479]" />
                      <span>{kitOnly ? 'Mostrando sólo Kits de Regalo' : '🎁 Ver Kits de Regalo'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Catalog Section */}
            <main id="catalogo" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {/* Controls Container */}
              <div className="space-y-6 mb-8 sm:mb-10">
                {/* Live Search */}
                <SearchBar
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  placeholder="Buscar por serum, jabón, alumbre, marca..."
                />

                {/* Category Tabs */}
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    if (kitOnly) setKitOnly(false);
                  }}
                />

                {/* Ethical / Dietary Tag Toggles */}
                <TagFilter
                  selectedTags={selectedTags}
                  onToggleTag={handleToggleTag}
                  onClearTags={selectedTags.length > 0 ? () => setSelectedTags([]) : undefined}
                />
              </div>

              {/* Catalog Subheader: Counts & Active Filters State */}
              <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-[#3D4D45]/10 dark:border-white/10 pb-4 mb-6 gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3D4D45] dark:text-[#E8EFEA]">
                    {favoritesOnly
                      ? 'Mis Favoritos'
                      : kitOnly
                      ? 'Kits y Regalos'
                      : selectedCategory === 'todos'
                      ? 'Catálogo Completo'
                      : `Productos: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                  </h3>
                  <span className="text-xs bg-[#8FA479]/20 text-[#3D4D45] dark:text-[#E8EFEA] font-semibold px-2.5 py-0.5 rounded-full">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                {(selectedCategory !== 'todos' || selectedTags.length > 0 || searchQuery || kitOnly || favoritesOnly) && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs text-[#553A49] dark:text-[#E8A598] hover:text-[#3D4D45] dark:hover:text-[#E8EFEA] font-medium underline underline-offset-4 cursor-pointer"
                  >
                    Restablecer todos los filtros
                  </button>
                )}
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToSelection={handleAddToSelection}
                onViewDetails={handleViewDetails}
                onClearFilters={handleClearFilters}
                wishlist={wishlist}
                onToggleFavorite={handleToggleFavorite}
              />
            </main>
          </>
        )}

        {/* View 2: Nosotros */}
        {activeNav === 'nosotros' && (
          <NosotrosView
            onNavigateCatalog={() => handleNavClick('catalogo')}
            onNavigateContact={() => handleNavClick('contacto')}
          />
        )}

        {/* View 3: Blog */}
        {activeNav === 'blog' && (
          <BlogView
            selectedSlug={selectedBlogSlug}
            onSelectPost={setSelectedBlogSlug}
            onNavigateCatalog={() => handleNavClick('catalogo')}
            onAddToSelection={handleAddToSelection}
            products={products}
          />
        )}

        {/* View 4: Contacto */}
        {activeNav === 'contacto' && (
          <ContactoView
            onNavigateCatalog={() => handleNavClick('catalogo')}
          />
        )}
      </div>

      {/* Community Newsletter Subscription Section (rendered on views other than Inicio) */}
      {activeNav !== 'inicio' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <NewsletterSubscription />
        </section>
      )}

      {/* Botanical Footer */}
      <footer className="bg-[#3D4D45] dark:bg-[#0E1410] text-[#F9F7F2] border-t border-[#3D4D45]/20 dark:border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h4 className="font-serif text-2xl font-bold text-[#F9F7F2] mb-2">Satibax Boutique</h4>
              <p className="text-xs uppercase tracking-widest text-[#8FA479] font-medium mb-3">
                Cosmética Natural y Bienestar
              </p>
              <p className="text-sm text-[#F9F7F2]/80 leading-relaxed">
                Fórmulas conscientes, ingredientes vegetales y rutinas saludables pensadas para conectar con tu bienestar natural.
              </p>
            </div>

            <div>
              <h5 className="font-serif text-lg font-semibold mb-3">Navegación</h5>
              <ul className="space-y-2 text-sm text-[#F9F7F2]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('catalogo')}
                    className="hover:text-[#8FA479] transition-colors"
                  >
                    Catálogo de Productos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('kits')}
                    className="hover:text-[#8FA479] transition-colors"
                  >
                    Kits de Regalo
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('nosotros')}
                    className="hover:text-[#8FA479] transition-colors"
                  >
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('blog')}
                    className="hover:text-[#8FA479] transition-colors"
                  >
                    Blog & Cuaderno Botánico
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('contacto')}
                    className="hover:text-[#8FA479] transition-colors"
                  >
                    Contacto & Ubicación
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('admin')}
                    className="hover:text-[#8FA479] transition-colors text-xs text-[#F9F7F2]/40"
                    title="Acceso administrativo"
                  >
                    Panel Admin
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-lg font-semibold mb-3">Atención Personalizada</h5>
              <p className="text-sm text-[#F9F7F2]/80 mb-2">
                Coordinamos pedidos, stock y envíos directamente por WhatsApp.
              </p>
              <a
                href="https://wa.me/5492252515155"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#8FA479] hover:underline"
              >
                WhatsApp: +54 9 2252 515155
              </a>
              <p className="text-xs text-[#F9F7F2]/60 mt-1">
                Lunes a Sábados de 9:00 a 19:00 hs
              </p>
              <p className="text-xs text-[#F9F7F2]/60 mt-0.5">
                Partido de La Costa • Costa Atlántica
              </p>
            </div>

            <div>
              <h5 className="font-serif text-lg font-semibold mb-3">Valores & Compromiso</h5>
              <div className="flex flex-col gap-2 text-sm text-[#F9F7F2]/80">
                <span className="inline-flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#8FA479]" /> Cruelty-Free & Vegano
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8FA479]" /> Sin Parabenos ni Sulfatos agresivos
                </span>
                <span className="inline-flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#8FA479]" /> Opciones sin TACC / Celiaco-Safe
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#F9F7F2]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F9F7F2]/60 gap-4">
            <p>© {new Date().getFullYear()} Satibax Boutique. Todos los derechos reservados.</p>
            <p>Hecho con amor y cosmética botánica consciente en la Costa Atlántica.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={Boolean(selectedProductForDetail)}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToSelection={handleAddToSelection}
      />

      {/* Slide-over Item Selection Drawer */}
      <ItemSelectionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selection={selection}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearSelection={handleClearSelection}
      />

      {/* Persistent Floating WhatsApp Action Button */}
      {!isDrawerOpen && <FloatingWhatsAppButton />}
    </div>
  );
};

export default App;
