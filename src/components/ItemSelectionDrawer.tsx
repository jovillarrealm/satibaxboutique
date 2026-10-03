import React, { useEffect, useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Leaf,
  ArrowRight,
} from 'lucide-react';
import type { ItemSelection } from '../domain/itemSelection';
import { formatCurrency } from '../domain/itemSelection';
import { compileWhatsAppOrder } from '../domain/whatsappCompiler';

export interface ItemSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selection: ItemSelection;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearSelection?: () => void;
  whatsappPhone?: string;
}

export const ItemSelectionDrawer: React.FC<ItemSelectionDrawerProps> = ({
  isOpen,
  onClose,
  selection,
  onUpdateQuantity,
  onRemoveItem,
  onClearSelection,
  whatsappPhone,
}) => {
  // Track failed thumbnail loads
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Close drawer on Escape key press
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

  // Lock background scroll when open on mobile
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const items = selection?.items || [];
  const isEmpty = items.length === 0;
  const totalItems = selection?.totalItems || 0;
  const totalPrice = selection?.totalPrice || 0;

  const whatsappUrl = !isEmpty
    ? compileWhatsAppOrder(selection, { phone: whatsappPhone })
    : '';

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="selection-drawer-title"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F7F2] text-[#3D4D45] shadow-2xl flex flex-col border-l border-[#3D4D45]/10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#3D4D45]/10 bg-white/70 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#8FA479]/20 flex items-center justify-center text-[#3D4D45]">
                <ShoppingBag className="w-5 h-5 text-[#3D4D45]" />
              </div>
              <div>
                <h2
                  id="selection-drawer-title"
                  className="font-serif text-lg sm:text-xl font-bold text-[#3D4D45] leading-tight"
                >
                  Mi Selección
                </h2>
                <p className="text-xs text-[#3D4D45]/70 font-medium">
                  {`${totalItems} ${totalItems === 1 ? 'producto seleccionado' : 'productos seleccionados'}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEmpty && onClearSelection && (
                <button
                  type="button"
                  onClick={onClearSelection}
                  className="text-xs text-[#553A49] hover:text-[#3D4D45] hover:underline font-medium px-2 py-1 transition-colors"
                  aria-label="Vaciar selección"
                >
                  Vaciar
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-[#3D4D45]/70 hover:text-[#3D4D45] hover:bg-[#3D4D45]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8FA479]"
                aria-label="Cerrar selección"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            {isEmpty ? (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#8FA479]/15 flex items-center justify-center text-[#8FA479] mb-2">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3D4D45]">
                  Tu selección está vacía
                </h3>
                <p className="text-sm text-[#3D4D45]/70 max-w-xs font-light leading-relaxed">
                  Explorá nuestro catálogo de cosmética botánica y agregá productos para armar tu pedido personalizado.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3D4D45] text-[#F9F7F2] text-sm font-semibold hover:bg-[#3D4D45]/90 active:scale-95 transition-all shadow-sm"
                >
                  <span>Explorar catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Items List */
              <ul className="divide-y divide-[#3D4D45]/10 space-y-4">
                {items.map((item) => {
                  const hasImage =
                    Boolean(item.product.image_url) && !imageErrors[item.product.id];

                  return (
                    <li
                      key={item.product.id}
                      className="pt-4 first:pt-0 flex gap-4 items-start"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F9F7F2] border border-[#3D4D45]/10 flex-shrink-0 flex items-center justify-center">
                        {hasImage ? (
                          <img
                            src={item.product.image_url!}
                            alt={item.product.name}
                            onError={() => handleImageError(item.product.id)}
                            loading="lazy"
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <Leaf className="w-7 h-7 text-[#8FA479]/60" />
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8FA479] block">
                              {item.product.brand || 'Satibax'}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#3D4D45] leading-snug line-clamp-2">
                              {item.product.name}
                            </h4>
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#3D4D45]/40 hover:text-[#553A49] p-1 rounded-md transition-colors"
                            aria-label={`Eliminar ${item.product.name} de la selección`}
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Unit price */}
                        <p className="text-xs text-[#3D4D45]/70 mt-0.5">
                          {formatCurrency(item.product.price)} c/u
                        </p>

                        {/* Controls & Subtotal */}
                        <div className="mt-3 flex items-center justify-between">
                          {/* Quantity stepper */}
                          <div className="inline-flex items-center rounded-lg border border-[#3D4D45]/20 bg-white shadow-sm overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 text-[#3D4D45] hover:bg-[#8FA479]/15 active:bg-[#8FA479]/30 transition-colors focus:outline-none"
                              aria-label={`Disminuir cantidad de ${item.product.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <span
                              className="px-3 py-1 text-xs font-semibold text-[#3D4D45] min-w-[28px] text-center"
                              aria-label={`Cantidad: ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 text-[#3D4D45] hover:bg-[#8FA479]/15 active:bg-[#8FA479]/30 transition-colors focus:outline-none"
                              aria-label={`Aumentar cantidad de ${item.product.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Subtotal */}
                          <div className="text-right">
                            <span className="text-[11px] text-[#3D4D45]/60 block -mb-0.5">
                              Subtotal
                            </span>
                            <span className="font-semibold text-sm text-[#3D4D45]">
                              {formatCurrency(item.subtotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer with Totals & WhatsApp CTA */}
          {!isEmpty && (
            <div className="p-5 border-t border-[#3D4D45]/10 bg-white/80 backdrop-blur-sm space-y-4">
              {/* Grand Total */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#3D4D45]/70 font-semibold block">
                    Total Estimado
                  </span>
                  <span className="text-[11px] text-[#3D4D45]/50">
                    Sujeto a disponibilidad y envío
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#3D4D45]">
                  {formatCurrency(totalPrice)}
                </div>
              </div>

              {/* Informative Note */}
              <div className="bg-[#8FA479]/10 rounded-xl p-3 text-xs text-[#3D4D45]/80 font-light flex items-center gap-2 border border-[#8FA479]/20">
                <MessageCircle className="w-4 h-4 text-[#8FA479] flex-shrink-0" />
                <span>
                  Al pulsar el botón, se abrirá WhatsApp con el detalle de tu pedido para coordinar stock y entrega.
                </span>
              </div>

              {/* WhatsApp Order Dispatch Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-base"
                aria-label="Pedir por WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current text-white flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemSelectionDrawer;
