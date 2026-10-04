import React, { useState } from 'react';
import { Plus, Check, Leaf, Sparkles, Heart } from 'lucide-react';
import type { Product } from '../db/catalog';
import { formatPriceARS } from '../utils/catalogFiltering';

export interface ProductCardProps {
  product: Product;
  onAddToSelection?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToSelection,
  onViewDetails,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [imageError, setImageError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToSelection) {
      onAddToSelection(product);
      setAddedRecently(true);
      setTimeout(() => setAddedRecently(false), 1200);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  // Map product tags to human-friendly badge labels
  const formatTagLabel = (tag: string): string => {
    const lower = tag.toLowerCase();
    if (lower === 'natural') return 'Natural';
    if (lower === 'vegano') return 'Vegano';
    if (lower === 'celiacosafe' || lower === 'celiaco-safe') return 'Celiaco-Safe';
    if (lower === 'kit-regalo') return 'Kit Regalo';
    if (lower === 'facial') return 'Facial';
    if (lower === 'aroma') return 'Aromaterapia';
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  };

  const displayTags = (product.tags || []).slice(0, 3);
  const hasImage = Boolean(product.image_url && !imageError);

  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col bg-white dark:bg-[#223028] rounded-2xl overflow-hidden border border-[#3D4D45]/10 dark:border-white/10 hover:border-[#8FA479]/50 dark:hover:border-[#8FA479]/60 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F9F7F2] dark:bg-[#1C2620] overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img
            src={product.image_url!}
            alt={product.name}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-[#3D4D45]/40 dark:text-[#E8EFEA]/40 bg-gradient-to-br from-[#F9F7F2] to-[#8FA479]/10 dark:from-[#1C2620] dark:to-[#8FA479]/10 w-full h-full">
            <Leaf className="w-12 h-12 text-[#8FA479]/60 mb-2" />
            <span className="text-xs uppercase tracking-wider font-medium text-[#3D4D45]/60 dark:text-[#E8EFEA]/60">
              {product.brand || 'Satibax'}
            </span>
          </div>
        )}

        {/* Status Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.is_new && (
            <span className="inline-flex items-center gap-1 bg-[#8FA479] text-[#F9F7F2] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Nuevo
            </span>
          )}
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 bg-[#553A49] text-[#F9F7F2] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
              Destacado
            </span>
          )}
        </div>

        {/* Favorite Wishlist Toggle Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-xs ${
            isFavorite
              ? 'bg-white/90 dark:bg-[#151D18]/90 text-rose-500 scale-105'
              : 'bg-white/70 dark:bg-[#151D18]/70 text-[#3D4D45]/70 dark:text-[#E8EFEA]/70 hover:text-rose-500 hover:bg-white dark:hover:bg-[#151D18]'
          }`}
          aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <p className="text-[11px] uppercase tracking-widest text-[#8FA479] font-bold mb-1">
            {product.brand || 'Satibax'}
          </p>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3D4D45] dark:text-[#E8EFEA] group-hover:text-[#8FA479] transition-colors duration-150 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Tags Badges */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium bg-[#F9F7F2] dark:bg-[#1C2620] text-[#3D4D45]/80 dark:text-[#E8EFEA]/80 px-2 py-0.5 rounded-md border border-[#3D4D45]/10 dark:border-white/10"
                >
                  {formatTagLabel(tag)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Footer */}
        <div className="mt-4 pt-3 border-t border-[#3D4D45]/10 dark:border-white/10 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#3D4D45]/60 dark:text-[#E8EFEA]/60 font-medium">
              Precio ARS
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#3D4D45] dark:text-[#E8EFEA]">
              {formatPriceARS(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8FA479] active:scale-95 cursor-pointer ${
              addedRecently
                ? 'bg-[#8FA479] text-[#F9F7F2]'
                : 'bg-[#3D4D45] hover:bg-[#8FA479] text-[#F9F7F2] dark:bg-[#8FA479] dark:hover:bg-[#7b9166] dark:text-[#151D18]'
            }`}
            aria-label={`Añadir ${product.name} a mi selección`}
          >
            {addedRecently ? (
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
};

export default ProductCard;
