import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  placeholder = 'Buscar por producto, marca o ingrediente...',
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#3D4D45]/50">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-2.5 rounded-full bg-white/95 text-[#3D4D45] placeholder-[#3D4D45]/40 text-sm border border-[#3D4D45]/15 focus:outline-none focus:ring-2 focus:ring-[#8FA479] focus:border-transparent shadow-sm transition-all duration-200"
          aria-label="Buscar en el catálogo"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#3D4D45]/50 hover:text-[#3D4D45] focus:outline-none"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
