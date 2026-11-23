import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FeaturedCategories = ({ categories = [] }) => {
  return (
    <section className="py-16 bg-[#0A101E] border-b border-[#303746]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest mb-1">
              EXPLORE CATALOG
            </div>
            <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
              FEATURED HARDWARE CATEGORIES
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-rajdhani font-bold text-[#BEF8A1] hover:underline flex items-center gap-1.5"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative bg-[#121826] hover:bg-[#191F2D] border border-[#303746] hover:border-[#BEF8A1]/50 rounded-xl overflow-hidden p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-glow-subtle"
            >
              <div className="aspect-square bg-[#0A101E] rounded-lg overflow-hidden mb-4 p-3 flex items-center justify-center">
                <img
                  src={cat.image || '/favicon.svg'}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="font-rajdhani font-bold text-base text-[#F5F5F7] group-hover:text-[#BEF8A1] transition-colors leading-tight mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#8B929E] line-clamp-2 font-inter mb-3">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-rajdhani font-bold text-[#BEF8A1] group-hover:translate-x-1 transition-transform">
                  <span>Browse Hardware</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
