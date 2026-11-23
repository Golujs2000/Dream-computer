import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
  Search,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { dbService } from '../../services/firebase/db';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductFilterSidebar } from '../../components/products/ProductFilterSidebar';
import { formatPrice } from '../../utils/formatters';
import { analyticsService } from '../../services/firebase/analyticsService';

export const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const categoryParam = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrands, setSelectedBrands] = useState(brandParam ? [brandParam] : []);
  const [priceRange, setPriceRange] = useState(300000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (brandParam) setSelectedBrands([brandParam]);
  }, [categoryParam, brandParam]);

  useEffect(() => {
    analyticsService.trackPageView('Product Catalog');

    const loadData = async () => {
      setLoading(true);
      try {
        const [prods, cats, brnds] = await Promise.all([
          dbService.getAll('products', { status: 'published' }),
          dbService.getAll('categories', { status: 'active' }),
          dbService.getAll('brands', { status: 'active' }),
        ]);
        setProducts(prods || []);
        setCategories(cats || []);
        setBrands(brnds || []);
      } catch (err) {
        console.error('Error fetching catalog data', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleToggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((b) => b !== brandId) : [...prev, brandId]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange(300000);
    setInStockOnly(false);
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query tokenization
    if (searchParam.trim()) {
      const tokens = searchParam.toLowerCase().trim().split(/\s+/);
      result = result.filter((p) => {
        const text = `${p.name} ${p.brandName || ''} ${p.categoryName || ''} ${p.sku || ''} ${p.shortDescription || ''}`.toLowerCase();
        return tokens.every((t) => text.includes(t));
      });
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(
        (p) => p.categoryId === selectedCategory || p.categorySlug === selectedCategory
      );
    }

    // Brands filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brandId));
    }

    // Max Price filter
    result = result.filter((p) => p.basePrice <= priceRange);

    // In Stock filter
    if (inStockOnly) {
      result = result.filter((p) => (p.stock || 0) > 0);
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'best_seller') {
      result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    } else {
      // Featured / default
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, searchParam, selectedCategory, selectedBrands, priceRange, inStockOnly, sortBy]);

  const activeCategoryObj = categories.find(
    (c) => c.id === selectedCategory || c.slug === selectedCategory
  );

  return (
    <>
      <Helmet>
        <title>
          {activeCategoryObj
            ? `${activeCategoryObj.name} in Patna | Dream Computer`
            : 'Computer Hardware, Laptops & Gaming PCs in Patna | Dream Computer'}
        </title>
        <meta
          name="description"
          content={
            activeCategoryObj?.seoDescription ||
            'Browse high performance gaming laptops, custom PC rigs, GPUs, CPUs, monitors and accessories at Dream Computer Patna.'
          }
        />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-8 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-rajdhani uppercase font-semibold text-[#8B929E] mb-6">
            <Link to="/" className="hover:text-[#BEF8A1]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products" className="hover:text-[#BEF8A1]">
              Catalog
            </Link>
            {activeCategoryObj && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#BEF8A1]">{activeCategoryObj.name}</span>
              </>
            )}
            {searchParam && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#F5F5F7]">Search: "{searchParam}"</span>
              </>
            )}
          </nav>

          {/* Category Banner / Title */}
          <div className="mb-8 p-6 bg-[#121826] border border-[#303746] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
                {activeCategoryObj ? activeCategoryObj.name : searchParam ? `Search: ${searchParam}` : 'All Hardware & Systems'}
              </h1>
              <p className="text-xs sm:text-sm text-[#8B929E] mt-1 max-w-2xl font-inter">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : 'Genuine brand warranty, GST invoice, and same-day in-store pickup at SP Verma Road, Patna.'}
              </p>
            </div>
            <div className="text-xs text-[#BEF8A1] font-rajdhani font-bold flex items-center gap-1.5 shrink-0 bg-[#0A101E] px-3.5 py-2 rounded-lg border border-[#303746]">
              <ShieldCheck className="w-4 h-4" />
              <span>Patna Store Warranty Protected</span>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="flex gap-8 items-start">
            {/* Filter Sidebar */}
            <ProductFilterSidebar
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedBrands={selectedBrands}
              onToggleBrand={handleToggleBrand}
              priceRange={priceRange}
              onChangePriceRange={setPriceRange}
              inStockOnly={inStockOnly}
              onToggleInStockOnly={setInStockOnly}
              onResetFilters={handleResetFilters}
              isOpenMobile={isMobileFilterOpen}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />

            {/* Product Listing Area */}
            <div className="flex-1 min-w-0">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#121826] border border-[#303746] rounded-xl p-3.5 mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-[#191F2D] border border-[#303746] text-xs font-rajdhani font-bold text-[#F5F5F7] rounded"
                  >
                    <Filter className="w-3.5 h-3.5 text-[#BEF8A1]" />
                    <span>Filters</span>
                  </button>

                  <span className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">
                    Showing <strong className="text-[#F5F5F7]">{filteredProducts.length}</strong> Products
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sorting dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8B929E] font-rajdhani uppercase hidden sm:inline">
                      Sort:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-[#191F2D] border border-[#303746] rounded-lg text-xs font-rajdhani font-semibold text-[#F5F5F7] px-2.5 py-1.5 focus:outline-none focus:border-[#BEF8A1]"
                    >
                      <option value="featured">Featured First</option>
                      <option value="best_seller">Best Sellers</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 bg-[#121826] rounded-xl animate-pulse border border-[#303746]"
                    />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#121826] border border-[#303746] rounded-xl space-y-4">
                  <div className="w-16 h-16 bg-[#191F2D] rounded-full flex items-center justify-center mx-auto text-[#8B929E]">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-[#F5F5F7]">
                    No Matching Hardware Found
                  </h3>
                  <p className="text-xs text-[#8B929E] max-w-sm mx-auto">
                    Try adjusting your filters, clearing search criteria, or contact our Patna showroom for custom procurement.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded shadow-glow-subtle transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
