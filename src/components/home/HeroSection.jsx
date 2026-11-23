import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, ShieldCheck, Zap, Wrench } from 'lucide-react';

export const HeroSection = ({ banner }) => {
  const title = banner?.title || 'POWER YOUR NEXT LEVEL.';
  const subtitle = banner?.subtitle || 'Premium Laptops, Gaming PCs & Computer Solutions in Patna.';
  const description = banner?.description || 'Custom-built with genuine hardware components, expert cable management, and Patna’s premier chip-level service backup at SP Verma Road.';
  const ctaText = banner?.ctaText || 'Explore Products';
  const ctaLink = banner?.ctaLink || '/products';
  const secondaryCtaText = banner?.secondaryCtaText || 'Build Your PC';
  const secondaryCtaLink = banner?.secondaryCtaLink || '/custom-pc-builder';
  const bgImage = banner?.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1600&auto=format&fit=crop&q=80';

  return (
    <section className="relative overflow-hidden bg-[#0A101E] border-b border-[#303746] py-16 sm:py-24 cyber-grid-bg">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#BEF8A1]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121826] border border-[#BEF8A1]/40 text-[#BEF8A1] text-xs font-rajdhani font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#BEF8A1] animate-pulse" />
              <span>SP VERMA ROAD • PATNA HARDWARE HQ</span>
            </div>

            {/* Headline */}
            <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F5F7] tracking-tight leading-none uppercase">
              POWER YOUR <br />
              <span className="text-[#BEF8A1] drop-shadow-[0_0_20px_rgba(190,248,161,0.3)]">
                NEXT LEVEL.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-rajdhani font-semibold text-[#B7BBC5] max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-sm text-[#8B929E] leading-relaxed max-w-xl mx-auto lg:mx-0 font-inter">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to={ctaLink}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-base uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-glow-accent hover:scale-105 transition-all"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={secondaryCtaLink}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#121826] hover:bg-[#191F2D] text-[#F5F5F7] hover:text-[#BEF8A1] border border-[#303746] hover:border-[#BEF8A1] font-rajdhani font-bold text-base uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Cpu className="w-4 h-4 text-[#BEF8A1]" />
                <span>{secondaryCtaText}</span>
              </Link>
            </div>

            {/* Key Value Badges */}
            <div className="pt-6 border-t border-[#303746]/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="font-orbitron font-bold text-xl text-[#F5F5F7]">100%</div>
                <div className="text-[11px] font-rajdhani font-semibold text-[#8B929E] uppercase">Genuine Invoices</div>
              </div>
              <div>
                <div className="font-orbitron font-bold text-xl text-[#BEF8A1]">24h</div>
                <div className="text-[11px] font-rajdhani font-semibold text-[#8B929E] uppercase">Patna Pickup</div>
              </div>
              <div>
                <div className="font-orbitron font-bold text-xl text-[#F5F5F7]">Chip-Level</div>
                <div className="text-[11px] font-rajdhani font-semibold text-[#8B929E] uppercase">Repair Lab</div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#BEF8A1]/30 to-blue-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-[#121826] border border-[#303746] rounded-2xl overflow-hidden p-3 shadow-2xl">
                <img
                  src={bgImage}
                  alt="Dream Computer Custom Gaming PC Build"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl"
                />

                {/* Overlaid Floating Specs Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0A101E]/90 border border-[#BEF8A1]/40 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-orbitron font-bold text-[#BEF8A1]">DREAM TITAN 4080</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">Ready in Store</span>
                  </div>
                  <p className="text-xs text-[#B7BBC5]">Ryzen 7 7800X3D • RTX 4080 Super • 32GB DDR5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
