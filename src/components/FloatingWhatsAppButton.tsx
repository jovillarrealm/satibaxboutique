import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { DEFAULT_WHATSAPP_PHONE } from '../domain/whatsappCompiler';

export interface FloatingWhatsAppButtonProps {
  phone?: string;
  defaultMessage?: string;
  className?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phone = DEFAULT_WHATSAPP_PHONE,
  defaultMessage = '¡Hola! Tengo una consulta sobre los productos de Satibax Boutique.',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sanitizedPhone = phone.replace(/\D/g, '') || DEFAULT_WHATSAPP_PHONE;
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 ${className}`}
    >
      {/* Expanding Tooltip / Label */}
      <div
        className={`hidden sm:flex items-center bg-white/95 text-[#3D4D45] text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-[#3D4D45]/10 backdrop-blur-sm transition-all duration-300 pointer-events-none transform ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span>¿Dudas? Escribinos por WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-[#8FA479] hover:bg-[#7d9168] active:scale-95 text-[#F9F7F2] shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#8FA479]/40 group"
        aria-label="Consultar por WhatsApp"
        title="Consultar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 transition-transform duration-200 group-hover:scale-110" />
      </a>
    </aside>
  );
};

export default FloatingWhatsAppButton;
