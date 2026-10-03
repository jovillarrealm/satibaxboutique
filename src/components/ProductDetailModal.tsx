import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Check,
  Leaf,
  Sparkles,
  Droplets,
  FileText,
  Gift,
} from 'lucide-react';
import type { Product } from '../db/catalog';
import { formatPriceARS } from '../utils/catalogFiltering';
import { parseProductDetails, formatTagLabel } from '../utils/productDetails';

export interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToSelection?: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToSelection,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedRecently, setAddedRecently] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset state when product changes or modal opens
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setAddedRecently(false);
    setImageError(false);
  }, [product, isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen && typeof document !== 'undefined') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !product) {
    return null;
  }

  const galleryImages: string[] =
    product.images && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : [];

  const currentImage = galleryImages[selectedImageIndex] || product.image_url;
  const hasImage = Boolean(currentImage && !imageError);

  const parsedDetails = parseProductDetails(product.description);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    if (onAddToSelection) {
      onAddToSelection(product, quantity);
      setAddedRecently(true);
      setTimeout(() => setAddedRecently(false), 1500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#3D4D45]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#F9F7F2] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#3D4D45]/15 overflow-hidden my-auto transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#3D4D45] hover:text-[#553A49] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#8FA479]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Column */}
            <div className="flex flex-col gap-3">
              {/* Main Image Display */}
              <div className="relative aspect-square w-full rounded-2xl bg-white border border-[#3D4D45]/10 overflow-hidden flex items-center justify-center shadow-inner">
                {hasImage ? (
                  <img
                    src={currentImage!}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-[#3D4D45]/40 bg-gradient-to-br from-[#F9F7F2] to-[#8FA479]/15 w-full h-full">
                    <Leaf className="w-16 h-16 text-[#8FA479]/60 mb-3" />
                    <span className="font-serif text-lg font-semibold text-[#3D4D45]">
                      {product.name}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#3D4D45]/60 mt-1">
                      {product.brand || 'Satibax'}
                    </span>
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.is_new && (
                    <span className="inline-flex items-center gap-1 bg-[#8FA479] text-[#F9F7F2] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
                      <Sparkles className="w-3 h-3" />
                      Nuevo
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="inline-flex items-center gap-1 bg-[#553A49] text-[#F9F7F2] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
                      Destacado
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails strip (when multiple images) */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setImageError(false);
                      }}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#8FA479] ring-2 ring-[#8FA479]/30 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Ver imagen ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Column */}
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Brand */}
                <p className="text-xs uppercase tracking-widest text-[#8FA479] font-bold mb-1.5">
                  {product.brand || 'Satibax'}
                </p>

                {/* Product Title */}
                <h2
                  id="product-detail-title"
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#3D4D45] leading-snug"
                >
                  {product.name}
                </h2>

                {/* Tags Badges */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-[#8FA479]/15 text-[#3D4D45] px-2.5 py-0.5 rounded-full border border-[#8FA479]/20"
                      >
                        {formatTagLabel(tag)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price Display */}
                <div className="mt-4 pb-4 border-b border-[#3D4D45]/10">
                  <span className="text-xs uppercase tracking-wider text-[#3D4D45]/60 font-medium block">
                    Precio en Pesos Argentinos
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif text-3xl font-bold text-[#3D4D45]">
                      {formatPriceARS(product.price)}
                    </span>
                    <span className="text-xs text-[#3D4D45]/60">ARS</span>
                  </div>
                </div>

                {/* Main Overview Description */}
                <div className="mt-4 prose prose-sm text-[#3D4D45]/85 leading-relaxed">
                  <p className="whitespace-pre-line text-sm sm:text-base font-light">
                    {parsedDetails.overview ||
                      'Fórmula botánica cuidadosamente desarrollada con ingredientes seleccionados para el cuidado diario de tu bienestar.'}
                  </p>
                </div>
              </div>

              {/* Purchase Action Box */}
              <div className="bg-white/80 p-4 sm:p-5 rounded-2xl border border-[#3D4D45]/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm font-semibold text-[#3D4D45]">
                    Cantidad:
                  </span>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#3D4D45]/20 rounded-xl bg-white overflow-hidden shadow-inner">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      aria-label="Disminuir cantidad"
                      className="p-2 sm:px-3 text-[#3D4D45] hover:bg-[#8FA479]/15 transition-colors focus:outline-none"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      aria-live="polite"
                      className="px-4 py-1 text-sm font-bold text-[#3D4D45] min-w-[2.5rem] text-center"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      aria-label="Aumentar cantidad"
                      className="p-2 sm:px-3 text-[#3D4D45] hover:bg-[#8FA479]/15 transition-colors focus:outline-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Selection Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full py-3 px-5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#8FA479] active:scale-[0.98] ${
                    addedRecently
                      ? 'bg-[#8FA479] text-[#F9F7F2]'
                      : 'bg-[#3D4D45] hover:bg-[#8FA479] text-[#F9F7F2]'
                  }`}
                >
                  {addedRecently ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>¡Añadido a mi selección!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                      <span>Añadir a mi selección</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Editorial Sections */}
          <div className="border-t border-[#3D4D45]/15 pt-6 space-y-6">
            {/* Bundle Items for Gift Kits */}
            {parsedDetails.bundleItems.length > 0 && (
              <div className="bg-white/60 p-5 rounded-2xl border border-[#3D4D45]/10">
                <div className="flex items-center gap-2 mb-3 text-[#3D4D45]">
                  <Gift className="w-5 h-5 text-[#8FA479]" />
                  <h4 className="font-serif text-lg font-bold">¿Qué incluye este kit?</h4>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#3D4D45]/85">
                  {parsedDetails.bundleItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8FA479] font-bold">🌿</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits & Usage Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits Section */}
              <div className="bg-white/60 p-5 rounded-2xl border border-[#3D4D45]/10 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-[#3D4D45]">
                  <Sparkles className="w-5 h-5 text-[#8FA479]" />
                  <h4 className="font-serif text-lg font-bold">Beneficios</h4>
                </div>

                {parsedDetails.benefits.length > 0 ? (
                  <ul className="space-y-2 text-sm text-[#3D4D45]/85 flex-1">
                    {parsedDetails.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#8FA479] mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm text-[#3D4D45]/85 flex-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8FA479] mt-0.5">•</span>
                      <span>Fórmula botánica con extractos naturales y activos puros.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8FA479] mt-0.5">•</span>
                      <span>Respetuoso con el manto lipídico de la piel y de absorción suave.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8FA479] mt-0.5">•</span>
                      <span>Libre de pruebas en animales (Cruelty-Free).</span>
                    </li>
                  </ul>
                )}
              </div>

              {/* Usage Instructions Section */}
              <div className="bg-white/60 p-5 rounded-2xl border border-[#3D4D45]/10 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-[#3D4D45]">
                  <Droplets className="w-5 h-5 text-[#8FA479]" />
                  <h4 className="font-serif text-lg font-bold">Modo de uso</h4>
                </div>

                {parsedDetails.usageInstructions.length > 0 ? (
                  <ul className="space-y-2 text-sm text-[#3D4D45]/85 flex-1">
                    {parsedDetails.usageInstructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#8FA479] mt-0.5">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm text-[#3D4D45]/85 flex-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8FA479] mt-0.5">•</span>
                      <span>Aplicar sobre la piel limpia y masajear con suavidad.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8FA479] mt-0.5">•</span>
                      <span>Apto para uso diario o como ritual reparador de autocuidado.</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="bg-white/60 p-5 rounded-2xl border border-[#3D4D45]/10">
              <div className="flex items-center gap-2 mb-2 text-[#3D4D45]">
                <FileText className="w-5 h-5 text-[#8FA479]" />
                <h4 className="font-serif text-lg font-bold">Ingredientes</h4>
              </div>

              {parsedDetails.ingredients ? (
                <p className="text-xs sm:text-sm text-[#3D4D45]/80 font-mono tracking-tight bg-[#F9F7F2] p-3 rounded-xl border border-[#3D4D45]/10 leading-relaxed">
                  {parsedDetails.ingredients}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-[#3D4D45]/80 leading-relaxed">
                  Elaborado con aceites botánicos, extractos vegetales puros e ingredientes de origen consciente. Sin parabenos, sulfatos agresivos ni derivados de petróleo.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
