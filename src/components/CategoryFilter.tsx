import React from 'react';
import type { Category } from '../db/catalog';
import { CATEGORY_TABS } from '../utils/catalogFiltering';

export interface CategoryFilterProps {
  categories?: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) => {
  // Combine standard botanical tabs with any database categories that aren't already represented
  const standardTabSlugs = new Set(CATEGORY_TABS.map((t) => t.slug.toLowerCase()));

  const additionalTabs = categories
    .filter((cat) => {
      const slug = cat.slug.toLowerCase();
      // Exclude if already in standard tabs or generic names covered elsewhere
      return !standardTabSlugs.has(slug);
    })
    .map((cat) => ({
      id: cat.slug,
      label: cat.name,
      slug: cat.slug,
    }));

  const allTabs = [...CATEGORY_TABS, ...additionalTabs];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:justify-center">
        {allTabs.map((tab) => {
          const isSelected =
            selectedCategory.toLowerCase() === tab.slug.toLowerCase() ||
            (tab.slug === 'todos' && (!selectedCategory || selectedCategory === 'todos'));

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8FA479] focus:ring-offset-1 cursor-pointer ${
                isSelected
                  ? 'bg-[#3D4D45] dark:bg-[#8FA479] text-[#F9F7F2] dark:text-[#151D18] shadow-sm scale-105 font-bold'
                  : 'bg-white/80 dark:bg-[#223028] text-[#3D4D45] dark:text-[#E8EFEA] hover:bg-[#8FA479]/15 dark:hover:bg-white/10 border border-[#3D4D45]/10 dark:border-white/10'
              }`}
              aria-pressed={isSelected}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
