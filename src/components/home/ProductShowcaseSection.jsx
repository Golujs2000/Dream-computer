import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';

export const ProductShowcaseSection = ({ title, subtitle, products = [], viewAllLink = '/products' }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-[#0A101E] border-b border-[#303746]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            {subtitle && (
              <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest mb-1">
                {subtitle}
              </div>
            )}
            <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
              {title}
            </h2>
          </div>
          <Link
            to={viewAllLink}
            className="text-sm font-rajdhani font-bold text-[#BEF8A1] hover:underline flex items-center gap-1.5"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
