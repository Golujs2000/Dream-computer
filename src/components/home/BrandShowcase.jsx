import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogos';

export const BrandShowcase = ({ brands = [] }) => {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-16 bg-[#0A101E] border-b border-[#303746] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#BEF8A1]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121826] border border-[#BEF8A1]/30 text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-wider mb-2">
            <span>OFFICIAL AUTHORIZED TIE-UPS</span>
          </div>
          <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase tracking-wide">
            AUTHORIZED BRANDS & HARDWARE PARTNERS
          </h2>
          <p className="text-xs sm:text-sm text-[#8B929E] mt-2 font-inter">
            Direct procurement channels ensuring 100% genuine products, manufacturer warranty cards, and authorized GST invoices in Patna.
          </p>
        </div>

        {/* Perfectly aligned logo cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/products?brand=${brand.id}`}
              className="group relative bg-[#121826] hover:bg-[#191F2D] border border-[#303746] hover:border-[#BEF8A1]/60 rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-glow-subtle hover:-translate-y-1"
            >
              {/* Perfectly centered fixed-height logo container */}
              <div className="w-full h-12 flex items-center justify-center mb-3">
                <BrandLogo
                  slug={brand.slug}
                  name={brand.name}
                  className="h-9 w-auto max-w-[150px] object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Brand Name & Action */}
              <div className="flex items-center gap-1.5 text-xs font-rajdhani font-bold uppercase text-[#B7BBC5] group-hover:text-[#BEF8A1] tracking-wider transition-colors">
                <span>{brand.name}</span>
                <span className="text-[10px] text-[#8B929E] group-hover:text-[#BEF8A1] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
