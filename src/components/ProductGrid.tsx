import React from 'react';
import { Leaf, RefreshCw } from 'lucide-react';
import type { Product } from '../db/catalog';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: Product[];
  onAddToSelection?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onClearFilters?: () => void;
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToSelection,
  onViewDetails,
  onClearFilters,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#8FA479]/30 border-t-[#3D4D45] animate-spin mb-4" />
        <p className="text-sm text-[#3D4D45]/70 font-medium">Cargando catálogo natural...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-4 flex flex-col items-center justify-center text-center bg-white/60 rounded-3xl border border-[#3D4D45]/10 max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-[#8FA479]/15 flex items-center justify-center mb-4 text-[#8FA479]">
          <Leaf className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3D4D45] mb-2">
          No encontramos productos
        </h3>
        <p className="text-sm text-[#3D4D45]/70 max-w-md mb-6 leading-relaxed">
          No encontramos productos que coincidan con tus filtros actuales. Probá buscando con otros términos o removiendo las etiquetas seleccionadas.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3D4D45] hover:bg-[#8FA479] text-[#F9F7F2] text-sm font-semibold transition-all duration-200 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restablecer filtros</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToSelection={onAddToSelection}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
