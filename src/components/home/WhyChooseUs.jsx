import React, { useState } from 'react';
import { ShieldCheck, Cpu, CheckCircle2, Headphones, MapPin, Wrench, Sparkles, Award } from 'lucide-react';

export const WhyChooseUs = () => {
  const [activeImageTab, setActiveImageTab] = useState(0);

  const showcaseImages = [
    {
      title: 'Custom PC Assembly Workshop',
      subtitle: 'Hand-crafted gaming rigs with custom ARGB cable combs and 48-hour bench testing.',
      badge: 'Patna Build Studio',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80',
    },
    {
      title: 'Chip-Level Micro-Soldering Lab',
      subtitle: 'Component-level motherboard repair using stereoscopic microscopes and thermal cameras.',
      badge: 'SP Verma Rd Engineering Lab',
      image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80532e?w=1000&auto=format&fit=crop&q=80',
    },
    {
      title: 'Genuine Tax-Invoiced Inventory',
      subtitle: 'Brand-sealed RTX 40-Series GPUs, processors, and high-frequency DDR5 memory.',
      badge: 'Official Brand Warranty',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1000&auto=format&fit=crop&q=80',
    },
  ];

  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-[#BEF8A1]" />,
      title: 'Custom PC Configuration',
      desc: 'Bespoke gaming and workstation rigs configured to fit your exact budget, resolution targets, and software workloads.',
      tag: 'Complimentary Assembly',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#BEF8A1]" />,
      title: 'Genuine Hardware Products',
      desc: '100% authentic products sourced directly from authorized Indian distributors with GST tax invoices and serial tracking.',
      tag: 'Brand Warranty Cards',
    },
    {
      icon: <Wrench className="w-5 h-5 text-[#BEF8A1]" />,
      title: 'Chip-Level Repair Lab',
      desc: 'Micro-soldering, short-circuit diagnostics, power IC replacement, and liquid damage recovery instead of costly board swaps.',
      tag: 'No-Fix No-Fee Policy',
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#BEF8A1]" />,
      title: 'Expert Technical Support',
      desc: 'Friendly hardware engineers ready to help with BIOS flashing, XMP memory tuning, thermal repasting, and drivers.',
      tag: 'Certified Technicians',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#BEF8A1]" />,
      title: 'Local Patna Storefront',
      desc: 'Walk into our SP Verma Road store anytime for live physical inspection, unboxing checks, and immediate post-purchase help.',
      tag: 'Open All 7 Days',
    },
  ];

  return (
    <section className="py-16 bg-[#121826] border-b border-[#303746] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A101E] border border-[#BEF8A1]/30 text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Gamers & Studios Choose Us</span>
          </div>
          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-[#F5F5F7] uppercase tracking-tight">
            THE PATNA TECH DIFFERENCE
          </h2>
          <p className="text-xs sm:text-sm text-[#8B929E] mt-2 font-inter leading-relaxed">
            From precision chip-level diagnostics to handcrafted liquid-cooled gaming rigs, explore why Dream Computer is Bihar’s highest-rated hardware powerhouse.
          </p>
        </div>

        {/* Visual Imagery Feature Stage */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0A101E] border border-[#303746] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Left: Interactive Image Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-[#303746] shadow-xl group">
              <img
                src={showcaseImages[activeImageTab].image}
                alt={showcaseImages[activeImageTab].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A101E] via-[#0A101E]/30 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 bg-[#BEF8A1] text-[#0A101E] font-rajdhani font-bold text-xs uppercase px-3 py-1 rounded-full shadow-glow-subtle">
                {showcaseImages[activeImageTab].badge}
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121826]/90 border border-[#303746] backdrop-blur-md">
                <h3 className="font-orbitron font-bold text-base text-[#F5F5F7]">
                  {showcaseImages[activeImageTab].title}
                </h3>
                <p className="text-xs text-[#B7BBC5] mt-1 font-inter">
                  {showcaseImages[activeImageTab].subtitle}
                </p>
              </div>
            </div>

            {/* Thumbnail navigation tabs */}
            <div className="grid grid-cols-3 gap-3">
              {showcaseImages.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageTab(idx)}
                  className={`p-2.5 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                    activeImageTab === idx
                      ? 'bg-[#191F2D] border-[#BEF8A1] shadow-glow-subtle'
                      : 'bg-[#121826] border-[#303746] hover:border-[#8B929E] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 rounded object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-rajdhani font-bold text-xs text-[#F5F5F7] truncate">
                      {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                    </div>
                    <div className="text-[10px] text-[#BEF8A1]">View Facility →</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Patna Craftsmanship Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest">
              LOCAL ENGINEERING STANDARDS
            </div>
            <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-[#F5F5F7] leading-snug">
              WHERE PASSION MEETS PRECISION HARDWARE
            </h3>
            <p className="text-xs sm:text-sm text-[#8B929E] font-inter leading-relaxed">
              Every gaming rig, workstation, and laptop repair at Dream Computer undergoes rigorous inspection. We don't just box and ship parts — our certified team stress-tests your machine for maximum stability, optimal thermal dissipation, and zero throttling under full load.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-[#121826] border border-[#303746] rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                <span className="text-[#F5F5F7]">Thermal Grizzly Kryonaut thermal compound applied on every build</span>
              </div>
              <div className="p-3 bg-[#121826] border border-[#303746] rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                <span className="text-[#F5F5F7]">Clean ARGB routing & cable combing for optimal airflow</span>
              </div>
              <div className="p-3 bg-[#121826] border border-[#303746] rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                <span className="text-[#F5F5F7]">Free OS setup, driver installation, and official warranty registration</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="group p-5 bg-[#0A101E] hover:bg-[#191F2D] border border-[#303746] hover:border-[#BEF8A1]/50 rounded-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-glow-subtle hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#121826] border border-[#303746] flex items-center justify-center group-hover:border-[#BEF8A1] transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-rajdhani font-bold text-base text-[#F5F5F7] uppercase group-hover:text-[#BEF8A1] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8B929E] font-inter leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#303746]/60">
                <span className="text-[10px] font-rajdhani font-bold uppercase tracking-wider text-[#BEF8A1] bg-[#121826] px-2 py-0.5 rounded border border-[#BEF8A1]/30">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
