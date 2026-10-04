import React, { useState } from 'react';
import { Gift, Plus, Check, Eye, Sparkles, Leaf } from 'lucide-react';
import type { Product } from '../db/catalog';
import { formatPriceARS } from '../utils/catalogFiltering';
import { parseProductDetails } from '../utils/productDetails';

export interface KitsSectionProps {
  products: Product[];
  onAddToSelection?: (product: Product, quantity?: number) => void;
  onViewDetails?: (product: Product) => void;
  id?: string;
}

export const KitsSection: React.FC<KitsSectionProps> = ({
  products,
  onAddToSelection,
  onViewDetails,
  id = 'kits',
}) => {
  const [addedKitId, setAddedKitId] = useState<string | null>(null);

  // Filter products tagged with kit-regalo
  const kits = products.filter(
    (product) =>
      product.active !== false &&
      product.tags &&
      product.tags.some((t) => t.toLowerCase() === 'kit-regalo')
  );

  const handleQuickAdd = (kit: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToSelection) {
      onAddToSelection(kit, 1);
      setAddedKitId(kit.id);
      setTimeout(() => setAddedKitId(null), 1200);
    }
  };

  const handleViewDetails = (kit: Product) => {
    if (onViewDetails) {
      onViewDetails(kit);
    }
  };

  return (
    <section id={id} className="py-12 sm:py-16 bg-[#F9F7F2] dark:bg-[#151D18] border-t border-[#3D4D45]/10 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#553A49]/10 dark:bg-[#553A49]/30 text-[#553A49] dark:text-[#E8A598] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#553A49] dark:text-[#E8A598]" />
            <span>Curaduría Especial</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D4D45] dark:text-[#E8EFEA] tracking-tight leading-tight">
            Kits de Regalo & Experiencias Botánicas
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#3D4D45]/80 dark:text-[#E8EFEA]/80 font-light leading-relaxed">
            Combinaciones únicas y sets de cosmética natural pensados para regalar o regalarte momentos de calma, belleza y conexión.
          </p>
        </div>

        {/* Kits Grid */}
        {kits.length === 0 ? (
          <div className="bg-white/60 dark:bg-[#223028] rounded-3xl border border-[#3D4D45]/10 dark:border-white/10 p-8 text-center max-w-xl mx-auto">
            <Gift className="w-10 h-10 text-[#8FA479] mx-auto mb-3" />
            <p className="text-[#3D4D45]/70 dark:text-[#E8EFEA]/70 text-sm font-medium">
              Pronto sumaremos nuevos kits y sets de regalo a nuestra colección.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kits.map((kit) => {
              const details = parseProductDetails(kit.description);
              const bundleItems = details.bundleItems;
              const isAdded = addedKitId === kit.id;

              return (
                <article
                  key={kit.id}
                  onClick={() => handleViewDetails(kit)}
                  className="group cursor-pointer bg-white dark:bg-[#223028] rounded-3xl overflow-hidden border border-[#3D4D45]/10 dark:border-white/10 hover:border-[#8FA479]/60 dark:hover:border-[#8FA479]/70 hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  {/* Image container */}
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-[#F9F7F2] dark:bg-[#1C2620] overflow-hidden flex items-center justify-center">
                      {kit.image_url ? (
                        <img
                          src={kit.image_url}
                          alt={kit.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center text-[#3D4D45]/40 dark:text-[#E8EFEA]/40 w-full h-full">
                          <Gift className="w-12 h-12 text-[#8FA479]/60 mb-2" />
                          <span className="text-xs uppercase tracking-wider font-medium text-[#3D4D45]/60 dark:text-[#E8EFEA]/60">
                            {kit.brand || 'Satibax'}
                          </span>
                        </div>
                      )}

                      {/* Editorial Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        <span className="inline-flex items-center gap-1 bg-[#553A49] text-[#F9F7F2] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
                          <Gift className="w-3 h-3" />
                          Kit Regalo
                        </span>
                        {kit.is_new && (
                          <span className="inline-flex items-center gap-1 bg-[#8FA479] text-[#F9F7F2] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
                            <Sparkles className="w-3 h-3" />
                            Nuevo
                          </span>
                        )}
                      </div>

                      {/* Hover view hint */}
                      <div className="absolute inset-0 bg-[#3D4D45]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-[#151D18]/95 text-[#3D4D45] dark:text-[#E8EFEA] text-xs font-semibold shadow-lg">
                          <Eye className="w-4 h-4 text-[#8FA479]" />
                          Ver detalles del kit
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6">
                      <p className="text-[11px] uppercase tracking-widest text-[#8FA479] font-bold mb-1">
                        {kit.brand || 'Satibax Boutique'}
                      </p>

                      <h3 className="font-serif text-xl font-bold text-[#3D4D45] dark:text-[#E8EFEA] group-hover:text-[#8FA479] dark:group-hover:text-[#8FA479] transition-colors duration-150 leading-snug">
                        {kit.name}
                      </h3>

                      {/* Bundle Items Overview */}
                      <div className="mt-4 pt-4 border-t border-[#3D4D45]/10 dark:border-white/10">
                        <p className="text-xs font-semibold text-[#3D4D45] dark:text-[#E8EFEA] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-[#8FA479]" />
                          <span>Incluye en este set:</span>
                        </p>

                        {bundleItems.length > 0 ? (
                          <ul className="space-y-1.5 text-xs text-[#3D4D45]/80 dark:text-[#E8EFEA]/80">
                            {bundleItems.slice(0, 4).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[#8FA479] font-bold shrink-0">🌿</span>
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                            {bundleItems.length > 4 && (
                              <li className="text-[11px] text-[#553A49] dark:text-[#E8A598] font-semibold pt-0.5">
                                {`+ ${bundleItems.length - 4} detalles más en este kit`}
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-xs text-[#3D4D45]/70 dark:text-[#E8EFEA]/70 line-clamp-3 leading-relaxed">
                            {details.overview ||
                              'Curaduría exclusiva de cosmética botánica lista para regalar con presentación especial.'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-[#3D4D45]/10 dark:border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3D4D45]/60 dark:text-[#E8EFEA]/60 font-medium block">
                          Precio ARS
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#3D4D45] dark:text-[#E8EFEA]">
                          {formatPriceARS(kit.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(kit, e)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FA479] active:scale-95 cursor-pointer ${
                          isAdded
                            ? 'bg-[#8FA479] text-[#F9F7F2]'
                            : 'bg-[#3D4D45] hover:bg-[#8FA479] text-[#F9F7F2]'
                        }`}
                        aria-label={`Añadir ${kit.name} a mi selección`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>¡Añadido!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Añadir a mi selección</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
