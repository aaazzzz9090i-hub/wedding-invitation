import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types';
import { CATEGORIES } from '../../data/products';
import { formatPrice } from '../../utils';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const AVAILABLE_SIZES = [
  'FR 34 (XS)',
  'FR 36 (S)',
  'FR 38 (M)',
  'FR 40 (L)',
  '46 (S)',
  '48 (M)',
  '50 (L)',
  '52 (XL)',
  'EU 39',
  'EU 40',
  'EU 41',
  'EU 42',
  'EU 43',
  'EU 44',
  'EU 45',
  'One Size'
];

const AVAILABLE_COLORS = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Beige / Cream', hex: '#EBE5D8' },
  { name: 'Brown / Camel', hex: '#8B5A2B' },
  { name: 'Navy / Blue', hex: '#1C2833' },
  { name: 'Grey / Slate', hex: '#636569' },
  { name: 'Olive / Green', hex: '#4B5320' },
  { name: 'Gold / Champagne', hex: '#D4AF37' }
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  isMobileOpen = false,
  onMobileClose
}) => {
  const handleCategoryChange = (catId: string) => {
    onChange({ ...filters, category: catId });
  };

  const handleGenderChange = (gender: string) => {
    onChange({ ...filters, gender: filters.gender === gender ? 'all' : gender });
  };

  const handleSizeToggle = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: updated });
  };

  const handleColorToggle = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: updated });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const content = (
    <div className="space-y-8 text-stone-900 pb-12">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-900">
          Refine Results
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-stone-900 mb-3">
          Category
        </h4>
        <ul className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left py-1 text-xs tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected ? 'font-semibold text-stone-900 underline underline-offset-4' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gender */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-stone-900 mb-3">
          Gender / Department
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'men', label: "Men's" },
            { id: 'women', label: "Women's" },
            { id: 'unisex', label: 'Unisex' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleGenderChange(item.id)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                filters.gender === item.id
                  ? 'bg-stone-900 text-white border-stone-900 font-medium'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-stone-200">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-[11px] uppercase tracking-widest font-semibold text-stone-900">
            Price Range
          </h4>
          <span className="text-xs text-stone-900 font-medium">
            Up to {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="7000"
          step="50"
          value={filters.maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-none"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-2 tracking-wider">
          <span>{formatPrice(100)}</span>
          <span>{formatPrice(7000)}</span>
        </div>
      </div>

      {/* Sizes */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-stone-900 mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
          {AVAILABLE_SIZES.map((size) => {
            const isChecked = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-colors cursor-pointer ${
                  isChecked
                    ? 'bg-stone-900 text-white border-stone-900 font-medium'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-stone-900 mb-3">
          Color Palette
        </h4>
        <div className="space-y-2">
          {AVAILABLE_COLORS.map((col) => {
            const isChecked = filters.colors.includes(col.name);
            return (
              <label
                key={col.name}
                className="flex items-center gap-3 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleColorToggle(col.name)}
                  className="rounded-none accent-stone-900"
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">{content}</aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onMobileClose} />
          <div className="relative w-4/5 max-w-sm bg-[#FAF9F5] p-6 shadow-2xl overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-200 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-stone-900">
                  Filter Catalog
                </span>
                <button onClick={onMobileClose} className="p-1 text-stone-500 hover:text-stone-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <button
              onClick={onMobileClose}
              className="w-full py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};
