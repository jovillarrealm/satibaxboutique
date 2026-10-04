import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

export interface HeaderProps {
  itemCount?: number;
  onOpenSelection?: () => void;
  activeNav?: string;
  onNavClick?: (navItem: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  itemCount = 0,
  onOpenSelection,
  activeNav = 'inicio',
  onNavClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 4 Primary Right-Aligned Navigation Links (Inicio is accessible via brand logo)
  const navLinks = [
    { id: 'tienda', label: 'Tienda', href: '#tienda' },
    { id: 'nosotros', label: 'Sobre Satibax', href: '#nosotros' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    if (onNavClick) {
      e.preventDefault();
      onNavClick(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#3D4D45]/10 shadow-sm transition-all duration-200">
      {/* Botanical announcement bar */}
      <div className="bg-[#3D4D45] text-[#F9F7F2] text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#8FA479] animate-pulse" />
        <span>Cosmética Consciente • Envíos a todo el país • Coordiná tu pedido por WhatsApp</span>
        <Sparkles className="w-3.5 h-3.5 text-[#8FA479] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3D4D45] hover:bg-[#3D4D45]/5 focus:outline-none focus:ring-2 focus:ring-[#8FA479] cursor-pointer"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Botanical Branding (Left-aligned) */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#inicio"
              onClick={(e) => handleLinkClick('inicio', e)}
              className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 cursor-pointer"
              aria-label="Satibax Boutique - Ir al Inicio"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#3D4D45]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 bg-white shadow-xs flex-shrink-0">
                <img src="/logo.jpeg" alt="Satibax Boutique" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#3D4D45] leading-tight">
                  Satibax Boutique<span className="text-[#8FA479]">.</span>
                </h1>
                <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8FA479] font-medium -mt-0.5">
                  Cosmética Natural y Bienestar
                </p>
              </div>
            </a>
          </div>

          {/* Right Cluster: Desktop Navigation + Action Buttons (Right-aligned, NOT centered) */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  activeNav === link.id ||
                  (link.id === 'tienda' && (activeNav === 'catalogo' || activeNav === 'kits'));
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.id, e)}
                    className={`text-sm tracking-wide transition-colors duration-150 py-1 border-b-2 font-medium cursor-pointer ${
                      isActive
                        ? 'text-[#3D4D45] border-[#8FA479] font-bold'
                        : 'text-[#3D4D45]/70 border-transparent hover:text-[#3D4D45] hover:border-[#8FA479]/40'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Action buttons cluster */}
            <div className="flex items-center space-x-3 pl-4 border-l border-[#3D4D45]/15">
              <button
                type="button"
                onClick={onOpenSelection}
                className="relative p-2.5 rounded-full text-[#3D4D45] hover:bg-[#8FA479]/15 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#8FA479] cursor-pointer"
                aria-label={`Ver mi selección (${itemCount} productos)`}
                title="Ver mi selección"
              >
                <ShoppingBag className="w-6 h-6 text-[#3D4D45]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8FA479] text-[#F9F7F2] text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile shopping bag icon */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={onOpenSelection}
              className="relative p-2 rounded-full text-[#3D4D45] hover:bg-[#8FA479]/15 active:scale-95"
              aria-label={`Ver mi selección (${itemCount} productos)`}
            >
              <ShoppingBag className="w-6 h-6 text-[#3D4D45]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8FA479] text-[#F9F7F2] text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#3D4D45]/10 bg-[#F9F7F2] px-4 pt-3 pb-5 space-y-2">
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick('inicio', e)}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              activeNav === 'inicio' ? 'bg-[#3D4D45] text-[#F9F7F2]' : 'text-[#3D4D45] hover:bg-[#3D4D45]/5'
            }`}
          >
            Inicio
          </a>
          {navLinks.map((link) => {
            const isActive =
              activeNav === link.id ||
              (link.id === 'tienda' && (activeNav === 'catalogo' || activeNav === 'kits'));
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#3D4D45] text-[#F9F7F2]'
                    : 'text-[#3D4D45] hover:bg-[#3D4D45]/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
