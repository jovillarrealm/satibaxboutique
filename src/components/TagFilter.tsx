import React from 'react';
import { Leaf, Sprout, ShieldCheck, Check } from 'lucide-react';
import { TAG_TOGGLES, normalizeTag } from '../utils/catalogFiltering';

export interface TagFilterProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags?: () => void;
}

const TAG_ICONS: Record<string, React.ReactNode> = {
  natural: <Leaf className="w-3.5 h-3.5" />,
  vegano: <Sprout className="w-3.5 h-3.5" />,
  celiacosafe: <ShieldCheck className="w-3.5 h-3.5" />,
};

export const TagFilter: React.FC<TagFilterProps> = ({
  selectedTags = [],
  onToggleTag,
  onClearTags,
}) => {
  const normalizedSelected = selectedTags.map(normalizeTag);

  return (
    <div className="flex flex-wrap items-center gap-2 sm:justify-center">
      <span className="text-xs uppercase tracking-wider text-[#3D4D45]/70 dark:text-[#E8EFEA]/70 font-semibold mr-1">
        Filtros:
      </span>
      {TAG_TOGGLES.map((item) => {
        const normTag = normalizeTag(item.tag);
        const isSelected = normalizedSelected.includes(normTag);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggleTag(item.tag)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#8FA479] cursor-pointer ${
              isSelected
                ? 'bg-[#8FA479] text-[#151D18] shadow-sm font-semibold'
                : 'bg-white/90 dark:bg-[#223028] text-[#3D4D45] dark:text-[#E8EFEA] hover:bg-[#8FA479]/20 dark:hover:bg-white/10 border border-[#3D4D45]/15 dark:border-white/10'
            }`}
            aria-pressed={isSelected}
          >
            {isSelected ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              TAG_ICONS[normTag] || <Leaf className="w-3.5 h-3.5" />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}

      {selectedTags.length > 0 && onClearTags && (
        <button
          type="button"
          onClick={onClearTags}
          className="text-xs text-[#553A49] dark:text-[#E8A598] hover:underline ml-1 font-medium cursor-pointer"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};
