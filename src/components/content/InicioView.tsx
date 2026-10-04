import React, { useState, useMemo } from 'react';
import type { Product } from '../../db/catalog';
import { ProductCard } from '../ProductCard';
import { KitsSection } from '../KitsSection';
import { NewsletterSubscription } from './NewsletterSubscription';
import { Gift, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

export interface InicioViewProps {
  products: Product[];
  onNavigateTienda: (options?: { kitOnly?: boolean; category?: string }) => void;
  onAddToSelection: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const REVIEWS = [
  {
    id: 1,
    name: 'María Laura G.',
    role: 'Cliente verificada • La Costa',
    comment:
      'Súper cómoda y dinámica la compra online. Pude coordinar por WhatsApp con calidez y respeto. Me ayudó a elegir un kit hermoso para regalar. Volveré a comprar sin dudas.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Valeria M.',
    role: 'Cliente verificada • Buenos Aires',
    comment:
      'Los serums terapéuticos y jabones vegetales cambiaron la textura de mi piel. Texturas livianas, aromas naturales sin fragancias sintéticas invasivas y packaging impecable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Carolina R.',
    role: 'Cliente verificada • Mar de Ajó',
    comment:
      'Excelente atención personalizada. Tenía dudas sobre los desodorantes sin aluminio y me explicaron todo al detalle. Llegó rapidísimo y con una presentación hermosa.',
    rating: 5,
  },
];

export const InicioView: React.FC<InicioViewProps> = ({
  products,
  onNavigateTienda,
  onAddToSelection,
  onViewDetails,
}) => {
  const [destacadosTab, setDestacadosTab] = useState<'elegidos' | 'nuevos' | 'regalo'>('elegidos');

  // Filter products for the destacados section
  const featuredProducts = useMemo(() => {
    let list = [...products];
    if (destacadosTab === 'elegidos') {
      list = list.filter((p) => p.bestseller || (p.tags && p.tags.includes('bestseller')));
      if (list.length === 0) list = products.slice(0, 4);
    } else if (destacadosTab === 'nuevos') {
      list = list.filter((p) => p.is_new || (p.tags && p.tags.includes('nuevo')));
      if (list.length === 0) list = products.slice(4, 8);
    } else if (destacadosTab === 'regalo') {
      list = list.filter((p) => p.tags && p.tags.includes('kit-regalo'));
      if (list.length === 0) list = products.slice(2, 6);
    }
    return list.slice(0, 4);
  }, [products, destacadosTab]);

  return (
    <div className="w-full">
      {/* 1. Hero Section with Full-Bleed Cover Image */}
      <section className="relative h-[85vh] min-h-[580px] w-full flex items-center justify-center overflow-hidden bg-[#3D4D45]">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-cover.jpg"
            alt="Fondo natural hojas verdes Satibax"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 border border-white/30 text-white animate-pulse">
            Bienestar Natural
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Cosmética Natural, Aromas y Regalos con Intención
          </h1>

          <p className="text-white/90 text-base sm:text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto drop-shadow leading-relaxed">
            Descubre el poder de la naturaleza en tu rutina diaria. Cuidado natural para tu piel y bienestar diario. Productos artesanales, libres de tóxicos y creados con amor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => onNavigateTienda()}
              className="bg-white text-[#3D4D45] px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-[#8FA479] hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              Comprar Ahora
            </button>

            <button
              type="button"
              onClick={() => onNavigateTienda({ kitOnly: true })}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-[#8FA479]" />
              Ver Regalos
            </button>
          </div>
        </div>
      </section>

      {/* 2. 4 Pillars Value Props Section */}
      <section className="py-16 sm:py-20 bg-[#F9F7F2] border-b border-[#3D4D45]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/70 shadow-xs border border-[#3D4D45]/5 hover:shadow-md transition-shadow">
              <div className="text-4xl sm:text-5xl mb-2">💚</div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3D4D45]">100% Natural</h3>
              <p className="text-[#3D4D45]/80 leading-relaxed text-xs sm:text-sm">
                Ingredientes orgánicos seleccionados sin parabenos, sulfatos ni conservantes artificiales.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/70 shadow-xs border border-[#3D4D45]/5 hover:shadow-md transition-shadow">
              <div className="text-4xl sm:text-5xl mb-2">🌱</div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3D4D45]">Cruelty Free</h3>
              <p className="text-[#3D4D45]/80 leading-relaxed text-xs sm:text-sm">
                Amamos a los animales. Ninguno de nuestros productos o insumos es testado en ellos.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/70 shadow-xs border border-[#3D4D45]/5 hover:shadow-md transition-shadow">
              <div className="text-4xl sm:text-5xl mb-2">♻️</div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3D4D45]">Eco-Friendly</h3>
              <p className="text-[#3D4D45]/80 leading-relaxed text-xs sm:text-sm">
                Packaging libre de plásticos y biodegradable. Cuidamos el impacto en cada envío.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/70 shadow-xs border border-[#3D4D45]/5 hover:shadow-md transition-shadow">
              <div className="text-4xl sm:text-5xl mb-2">🌾</div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3D4D45]">Sin Gluten</h3>
              <p className="text-[#3D4D45]/80 leading-relaxed text-xs sm:text-sm">
                Productos seguros para celíacos. Todos nuestros items están certificados gluten-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Destacados / Best Sellers Section */}
      <section className="py-20 bg-white border-b border-[#3D4D45]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#8FA479] font-bold text-xs uppercase tracking-widest">
                Destacados
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D4D45] mt-1">
                Encuentra tu Favorito
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTienda()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3D4D45] hover:text-[#8FA479] transition-colors group cursor-pointer"
            >
              <span>Ver catálogo completo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Tab Filter Buttons */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setDestacadosTab('elegidos')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                destacadosTab === 'elegidos'
                  ? 'bg-[#3D4D45] text-white shadow-sm'
                  : 'bg-[#F9F7F2] text-[#3D4D45] hover:bg-[#8FA479]/20'
              }`}
            >
              ⭐ Más Elegidos
            </button>
            <button
              type="button"
              onClick={() => setDestacadosTab('nuevos')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                destacadosTab === 'nuevos'
                  ? 'bg-[#3D4D45] text-white shadow-sm'
                  : 'bg-[#F9F7F2] text-[#3D4D45] hover:bg-[#8FA479]/20'
              }`}
            >
              ✨ Nuevos
            </button>
            <button
              type="button"
              onClick={() => setDestacadosTab('regalo')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                destacadosTab === 'regalo'
                  ? 'bg-[#3D4D45] text-white shadow-sm'
                  : 'bg-[#F9F7F2] text-[#3D4D45] hover:bg-[#8FA479]/20'
              }`}
            >
              🎁 Ideal Regalo
            </button>
          </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToSelection={onAddToSelection}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated Gift Kits Editorial Section */}
      <KitsSection
        id="kits"
        products={products}
        onAddToSelection={onAddToSelection}
        onViewDetails={onViewDetails}
      />

      {/* 5. Google Customer Reviews Section */}
      <section className="py-20 bg-[#F9F7F2] border-t border-b border-[#3D4D45]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D4D45] mb-3">
              Lo que dicen quienes nos eligen
            </h2>
            <p className="text-[#3D4D45]/70 max-w-xl mx-auto text-sm sm:text-base font-light">
              Reseñas reales de clientes que confían en la cosmética consciente de Satibax
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#3D4D45]/10 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#3D4D45]/85 italic text-sm sm:text-base leading-relaxed mb-6">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3D4D45]/10 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#3D4D45]">{review.name}</h4>
                    <span className="text-[#3D4D45]/60">{review.role}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#8FA479]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <NewsletterSubscription />
    </div>
  );
};

export default InicioView;
