import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Zap, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RepairsSection = () => {
  const repairServices = [
    {
      title: 'Chip-Level Motherboard Repair',
      desc: 'Micro-soldering, short-circuit diagnostics, MOSFET, IO controller and power IC replacement.',
    },
    {
      title: 'Gaming Laptop GPU & VRAM Repair',
      desc: 'BGA reballing, GPU reflow, VRAM replacement, and thermal pad overhauls.',
    },
    {
      title: 'Laptop Screen & Hinge Replacement',
      desc: 'Original 144Hz/165Hz/OLED panels, broken hinge fabrication, and bezel replacements.',
    },
    {
      title: 'Liquid Spill & No-Power Recovery',
      desc: 'Ultrasonic board cleaning, corrosion removal, and precision circuit tracing.',
    },
  ];

  return (
    <section className="py-16 bg-[#0A101E] border-b border-[#303746]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest">
              HARDWARE DIAGNOSIS & REPAIRS
            </div>
            <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase leading-tight">
              PATNA’S TRUSTED CHIP-LEVEL REPAIR LAB
            </h2>
            <p className="text-sm text-[#8B929E] font-inter leading-relaxed">
              Don’t discard expensive laptop motherboards! Other service centers recommend full board replacement costing ₹30,000–₹50,000.
              Our dedicated engineering lab at SP Verma Road fixes dead laptops and desktops at component level with precision micro-soldering.
            </p>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121826] hover:bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/40 hover:border-[#BEF8A1] font-rajdhani font-bold text-sm uppercase rounded-lg shadow-glow-subtle transition-all"
              >
                <span>View All Repair Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repairServices.map((srv, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#121826] border border-[#303746] rounded-xl hover:border-[#BEF8A1]/40 transition-colors space-y-2"
              >
                <div className="w-9 h-9 rounded-lg bg-[#191F2D] border border-[#303746] flex items-center justify-center text-[#BEF8A1]">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-rajdhani font-bold text-base text-[#F5F5F7]">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#8B929E] font-inter leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
