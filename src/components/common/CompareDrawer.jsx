import React from 'react';
import { Link } from 'react-router-dom';
import { X, Scale, ArrowRight } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { formatPrice } from '../../utils/formatters';

export const CompareDrawer = () => {
  const {
    compareList,
    isCompareDrawerOpen,
    setIsCompareDrawerOpen,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  if (!isCompareDrawerOpen || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121826] border-t-2 border-[#BEF8A1] shadow-2xl p-4 animate-in slide-in-from-bottom duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title and counts */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#191F2D] text-[#BEF8A1]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F5F5F7] font-rajdhani uppercase">
              Product Comparison ({compareList.length}/4)
            </h4>
            <p className="text-xs text-[#8B929E]">Compare technical specifications side-by-side</p>
          </div>
        </div>

        {/* Product items thumbnail row */}
        <div className="flex items-center gap-3 overflow-x-auto py-1 max-w-full">
          {compareList.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 bg-[#191F2D] border border-[#303746] rounded-lg p-1.5 pr-2.5 shrink-0"
            >
              <img
                src={p.images?.[0] || '/favicon.svg'}
                alt={p.name}
                className="w-9 h-9 rounded object-cover bg-[#0A101E]"
              />
              <div className="max-w-[130px]">
                <div className="text-xs font-semibold text-[#F5F5F7] truncate">{p.name}</div>
                <div className="text-[11px] text-[#BEF8A1] font-rajdhani font-bold">
                  {formatPrice(p.basePrice)}
                </div>
              </div>
              <button
                onClick={() => removeFromCompare(p.id)}
                className="text-[#8B929E] hover:text-red-400 p-0.5 ml-1"
                title="Remove"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-[#8B929E] hover:text-red-400 font-medium"
          >
            Clear All
          </button>
          <button
            onClick={() => setIsCompareDrawerOpen(false)}
            className="text-xs text-[#8B929E] hover:text-[#F5F5F7] px-2 py-1"
          >
            Minimize
          </button>
          <Link
            to="/compare"
            onClick={() => setIsCompareDrawerOpen(false)}
            className="px-4 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm rounded flex items-center gap-1.5 shadow-glow-subtle transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
