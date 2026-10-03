import React, { useState, useEffect, useMemo } from 'react';
import type { Product, Category } from './db/catalog';
import { DEFAULT_PRODUCTS, DEFAULT_CATEGORIES } from './data/initialCatalog';
import { filterProducts } from './utils/catalogFiltering';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { TagFilter } from './components/TagFilter';
import { SearchBar } from './components/SearchBar';
import { ProductGrid } from './components/ProductGrid';
import {
  NosotrosView,
  BlogView,
  ContactoView,
  NewsletterSubscription,
} from './components/content';
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
import { Sparkles, Gift, Heart, ArrowRight } from 'lucide-react';

export interface AppProps {
  initialProducts?: Product[];
  initialCategories?: Category[];
  initialNav?: string;
}

export const App: React.FC<AppProps> = ({
  initialProducts = DEFAULT_PRODUCTS,
  initialCategories = DEFAULT_CATEGORIES,
  initialNav = 'catalogo',
}) => {
  // Catalog state
  const [products] = useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [kitOnly, setKitOnly] = useState<boolean>(initialNav === 'kits');
  const [activeNav, setActiveNav] = useState<string>(initialNav);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

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

  // Handle adding product to selection
  const handleAddToSelection = (product: Product) => {
    setSelection((prev) => addItem(prev, product));
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
  };

  // Handle nav clicks
  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (navId === 'kits') {
      setKitOnly(true);
      setSelectedCategory('todos');
    } else if (navId === 'catalogo') {
      setKitOnly(false);
    }
    if (navId !== 'blog') {
      setSelectedBlogSlug(null);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter products according to current state
  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      category: selectedCategory,
      tags: selectedTags,
      query: searchQuery,
      kitOnly,
      activeOnly: true,
    });
  }, [products, selectedCategory, selectedTags, searchQuery, kitOnly]);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#3D4D45] flex flex-col font-sans selection:bg-[#8FA479]/30">
      {/* Navigation Header */}
      <Header
        itemCount={selection.totalItems}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenSelection={() => setIsDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* View 1: Catalog & Kits */}
        {(activeNav === 'catalogo' || activeNav === 'kits') && (
          <>
            {/* Hero Botanical Banner */}
            <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-b from-[#F9F7F2] via-white/50 to-[#F9F7F2] border-b border-[#3D4D45]/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA479]/15 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#8FA479]" />
                  <span>Ingredientes Botánicos & Amor Consciente</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3D4D45] tracking-tight max-w-3xl mx-auto leading-tight">
                  Cuidado natural para tu piel y bienestar diario
                </h2>

                <p className="mt-4 text-base sm:text-lg text-[#3D4D45]/80 max-w-2xl mx-auto font-light leading-relaxed">
                  Descubrí nuestra selección artesanal de cosmética vegetal, serums terapéuticos, jabones botánicos y aromaterapia pura.
                </p>

                {/* Quick Kits Promo Link */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setKitOnly(!kitOnly);
                      if (!kitOnly) setSelectedCategory('todos');
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                      kitOnly
                        ? 'bg-[#553A49] text-[#F9F7F2]'
                        : 'bg-white text-[#3D4D45] hover:bg-[#8FA479]/15 border border-[#3D4D45]/15'
                    }`}
                  >
                    <Gift className="w-4 h-4 text-[#8FA479]" />
                    <span>{kitOnly ? 'Mostrando sólo Kits de Regalo' : 'Explorar Kits de Regalo'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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
              <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-[#3D4D45]/10 pb-4 mb-6 gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3D4D45]">
                    {kitOnly
                      ? 'Kits y Regalos'
                      : selectedCategory === 'todos'
                      ? 'Catálogo Completo'
                      : `Productos: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                  </h3>
                  <span className="text-xs bg-[#8FA479]/20 text-[#3D4D45] font-semibold px-2.5 py-0.5 rounded-full">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                {(selectedCategory !== 'todos' || selectedTags.length > 0 || searchQuery || kitOnly) && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs text-[#553A49] hover:text-[#3D4D45] font-medium underline underline-offset-4"
                  >
                    Restablecer todos los filtros
                  </button>
                )}
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToSelection={handleAddToSelection}
                onClearFilters={handleClearFilters}
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
          />
        )}

        {/* View 4: Contacto */}
        {activeNav === 'contacto' && (
          <ContactoView
            onNavigateCatalog={() => handleNavClick('catalogo')}
          />
        )}
      </div>

      {/* Community Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <NewsletterSubscription />
      </section>

      {/* Botanical Footer */}
      <footer className="bg-[#3D4D45] text-[#F9F7F2] border-t border-[#3D4D45]/20 mt-8">
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
      <FloatingWhatsAppButton />
    </div>
  );
};

export default App;
