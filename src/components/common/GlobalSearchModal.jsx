import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Laptop, Cpu, HardDrive } from 'lucide-react';
import { dbService } from '../../services/firebase/db';
import { formatPrice } from '../../utils/formatters';
import { useStorefront } from '../../context/StorefrontContext';
import { analyticsService } from '../../services/firebase/analyticsService';

const POPULAR_QUERIES = [
  'RTX 4060 Laptop',
  'Intel Core i7 Laptop',
  '16GB DDR5 RAM',
  '1TB NVMe SSD',
  'Gaming PC under 100000',
  'Laptop charger HP',
  'ASUS Gaming Laptop',
  'RTX 4070 Super',
];

export const GlobalSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen } = useStorefront();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Load products for quick matching
  useEffect(() => {
    if (isSearchOpen) {
      dbService.getAll('products', { status: 'published' }).then((prods) => {
        setProducts(prods || []);
      });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Search filtering logic
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const qTokens = query.toLowerCase().trim().split(/\s+/);
    const results = products.filter((p) => {
      const targetText = `${p.name} ${p.brandName || ''} ${p.categoryName || ''} ${p.sku || ''} ${p.shortDescription || ''}`.toLowerCase();
      return qTokens.every((token) => targetText.includes(token));
    });

    setFilteredProducts(results.slice(0, 6));
  }, [query, products]);

  const handleSelectQuery = (text) => {
    setQuery(text);
    saveRecentSearch(text);
  };

  const saveRecentSearch = (text) => {
    if (!text.trim()) return;
    const updated = [text, ...recentSearches.filter((s) => s.toLowerCase() !== text.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('dc_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleNavigateProduct = (product) => {
    analyticsService.trackEvent('search_select', { query, productId: product.id });
    saveRecentSearch(product.name);
    setIsSearchOpen(false);
    navigate(`/product/${product.slug}`);
  };

  const handleFullSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    analyticsService.trackEvent('search', { query });
    setIsSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl bg-[#121826] border border-[#303746] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearchSubmit} className="relative flex items-center border-b border-[#303746] px-4 py-3.5">
          <Search className="w-5 h-5 text-[#BEF8A1] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search laptops, RTX 4060, Intel i7, SSDs, Custom PCs..."
            className="w-full bg-transparent px-3 text-[#F5F5F7] placeholder-[#8B929E] text-base focus:outline-none font-inter"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#8B929E] hover:text-[#F5F5F7]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 px-2 py-1 text-xs text-[#8B929E] hover:text-[#F5F5F7] bg-[#191F2D] border border-[#303746] rounded"
          >
            ESC
          </button>
        </form>

        {/* Content body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Live Search Results */}
          {query.trim() && (
            <div>
              <div className="flex items-center justify-between text-xs font-rajdhani uppercase font-bold text-[#8B929E] mb-2">
                <span>Matching Products ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleFullSearchSubmit}
                    className="text-[#BEF8A1] hover:underline flex items-center gap-1"
                  >
                    View All Results <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleNavigateProduct(p)}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-[#191F2D] hover:bg-[#1f2738] border border-transparent hover:border-[#BEF8A1]/40 cursor-pointer transition-all"
                    >
                      <img
                        src={p.images?.[0] || '/favicon.svg'}
                        alt={p.name}
                        className="w-12 h-12 rounded object-cover bg-[#0A101E] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#F5F5F7] truncate">{p.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-[#8B929E]">
                          <span>{p.brandName}</span>
                          <span>•</span>
                          <span className="text-[#BEF8A1] font-rajdhani font-bold">
                            {formatPrice(p.basePrice)}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-[#8B929E] uppercase font-rajdhani">View →</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-sm text-[#8B929E]">
                  No products found for "<span className="text-[#F5F5F7]">{query}</span>".
                  <p className="text-xs mt-1">Try searching by GPU model, brand, or component type.</p>
                </div>
              )}
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E] mb-2">
              Popular Searches in Patna
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_QUERIES.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectQuery(item)}
                  className="px-2.5 py-1 text-xs bg-[#191F2D] hover:bg-[#252e42] hover:text-[#BEF8A1] text-[#B7BBC5] border border-[#303746] rounded-md transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !query && (
            <div>
              <div className="flex items-center justify-between text-xs font-rajdhani uppercase font-bold text-[#8B929E] mb-2">
                <span>Recent Searches</span>
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('dc_recent_searches');
                  }}
                  className="text-[10px] text-red-400 hover:underline"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSelectQuery(s)}
                    className="px-2.5 py-1 text-xs bg-[#121826] text-[#B7BBC5] border border-[#303746] rounded-md hover:border-[#BEF8A1]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
