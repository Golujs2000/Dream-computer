import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const CustomPcPromo = () => {
  return (
    <section className="py-16 bg-[#121826] border-b border-[#303746] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#0A101E] to-[#191F2D] border border-[#303746] rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#BEF8A1]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#121826] border border-[#BEF8A1]/30 text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Patna's Master PC Builders</span>
              </div>

              <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-[#F5F5F7] uppercase tracking-tight">
                BUILD YOUR DREAM CUSTOM GAMING RIG
              </h2>

              <p className="text-sm text-[#B7BBC5] max-w-2xl font-inter leading-relaxed">
                Choose your Processor, RTX GPU, Liquid Cooler, High-Frequency DDR5 RAM, and Tempered Glass Cabinet.
                Every build is custom assembled at our SP Verma Road workshop, stress-tested for 48 hours, and comes with
                guaranteed local Patna on-site warranty support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#F5F5F7]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                  <span>100% Component Compatibility Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                  <span>Custom ARGB Cable Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                  <span>Thermal Grizzly Kryonaut Paste Applied</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                  <span>Original GST Bills for All Hardware</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/custom-pc-builder"
                  className="px-6 py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-glow-subtle transition-all"
                >
                  <span>Launch PC Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/918448474795?text=Hello%20Dream%20Computer!%20I%20want%20to%20get%20a%20quotation%20for%20a%20Custom%20Gaming%20PC."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#191F2D] hover:bg-[#252e42] text-[#F5F5F7] hover:text-[#BEF8A1] border border-[#303746] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all"
                >
                  <span>WhatsApp Your Specs</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="inline-block p-6 rounded-2xl bg-[#0A101E] border border-[#303746] text-left">
                <div className="font-orbitron font-bold text-2xl text-[#BEF8A1] mb-1">
                  FREE
                </div>
                <div className="text-sm font-rajdhani font-bold text-[#F5F5F7] uppercase mb-2">
                  Professional Assembly & Stress Test
                </div>
                <p className="text-xs text-[#8B929E] leading-relaxed">
                  When you buy complete PC build components from Dream Computer Patna, assembly and bench testing are 100% complimentary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
