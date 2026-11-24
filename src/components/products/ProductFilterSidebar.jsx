import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const ProductFilterSidebar = ({
  categories = [],
  brands = [],
  selectedCategory,
  onSelectCategory,
  selectedBrands = [],
  onToggleBrand,
  priceRange,
  onChangePriceRange,
  inStockOnly,
  onToggleInStockOnly,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
}) => {
  const content = (
    <div className="space-y-6">
      {/* Header for Filter Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#303746]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#BEF8A1]" />
          <span className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase tracking-wider">
            Filters
          </span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-[#8B929E] hover:text-[#BEF8A1] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* In-Stock Only Toggle */}
      <div className="p-3 bg-[#191F2D] border border-[#303746] rounded-lg flex items-center justify-between">
        <span className="text-xs font-rajdhani uppercase font-bold text-[#F5F5F7]">
          In-Stock in Patna Store
        </span>
        <button
          type="button"
          onClick={() => onToggleInStockOnly(!inStockOnly)}
          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
            inStockOnly ? 'bg-[#BEF8A1] justify-end' : 'bg-[#303746] justify-start'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full bg-[#0A101E] shadow-sm transform transition-transform`}
          />
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-rajdhani font-bold text-xs uppercase text-[#8B929E] mb-3 tracking-wider">
          Hardware Category
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-rajdhani font-semibold transition-all ${
              !selectedCategory
                ? 'bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/40'
                : 'text-[#B7BBC5] hover:bg-[#121826]'
            }`}
          >
            All Hardware
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-rajdhani font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/40'
                  : 'text-[#B7BBC5] hover:bg-[#121826]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-rajdhani font-bold text-xs uppercase text-[#8B929E] tracking-wider">
            Max Price
          </h4>
          <span className="text-xs font-rajdhani font-bold text-[#BEF8A1]">
            {formatPrice(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="300000"
          step="500"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full accent-[#BEF8A1] bg-[#191F2D] h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#8B929E] mt-1 font-mono">
          <span>₹500</span>
          <span>₹3,00,000+</span>
        </div>
      </div>

      {/* Brands Filter */}
      <div>
        <h4 className="font-rajdhani font-bold text-xs uppercase text-[#8B929E] mb-3 tracking-wider">
          Brands
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => {
            const checked = selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                className="flex items-center gap-2.5 text-xs text-[#B7BBC5] hover:text-[#F5F5F7] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleBrand(brand.id)}
                  className="rounded border-[#303746] bg-[#191F2D] text-[#BEF8A1] focus:ring-0 cursor-pointer"
                />
                <span className="font-medium">{brand.name}</span>
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
      <div className="hidden lg:block w-64 bg-[#121826] border border-[#303746] rounded-xl p-5 shrink-0 self-start sticky top-28">
        {content}
      </div>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#121826] border-l border-[#303746] p-5 h-full overflow-y-auto">
            <button
              onClick={onCloseMobile}
              className="absolute top-4 right-4 text-[#8B929E] hover:text-[#F5F5F7]"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
