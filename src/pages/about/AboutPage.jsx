import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Cpu,
  Wrench,
  Award,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { STORE_INFO } from '../../services/seo/seoConfig';
import { DreamLogo } from '../../components/common/DreamLogo';

export const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Dream Computer Patna - Custom Gaming PCs & Laptop Store</title>
        <meta
          name="description"
          content="Learn about Dream Computer, Patna’s premier custom gaming PC builder, authorized laptop retailer, and chip-level motherboard repair centre beside Westside Mall on SP Verma Road Chauraha."
        />
        <link rel="canonical" href="https://dreamcomputerpatna.com/about" />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-12 border-b border-[#303746]">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121826] border border-[#BEF8A1]/40 text-[#BEF8A1] font-rajdhani font-bold text-xs uppercase tracking-wider">
              <span>GSTIN: 10GEBPB0233K1ZA • ESTABLISHED IN PATNA</span>
            </div>
            <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-[#F5F5F7] tracking-tight uppercase">
              PATNA'S PREMIER <span className="text-[#BEF8A1]">TECH POWERHOUSE</span>
            </h1>
            <p className="text-sm sm:text-base text-[#B7BBC5] font-inter leading-relaxed">
              Dream Computer is a premier computer & laptop showroom, custom gaming PC assembly house, and chip-level motherboard repair laboratory located in the heart of Patna at SP Verma Road Chauraha, New Dakbunglow Main Road.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 space-y-4 relative group hover:border-[#BEF8A1]/50 transition-all">
              <div className="w-14 h-14 rounded-xl bg-[#191F2D] border border-[#BEF8A1]/30 flex items-center justify-center text-[#BEF8A1]">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="font-orbitron font-bold text-xl text-[#F5F5F7] uppercase">
                Custom Gaming Rigs
              </h3>
              <p className="text-xs sm:text-sm text-[#8B929E] leading-relaxed">
                Handcrafted esports battlestations and heavy 3D rendering workstations built with RTX 40-Series GPUs, Intel Core, and AMD Ryzen processors. Every build undergoes meticulous cable routing and 48-hour thermal stress-testing.
              </p>
            </div>

            <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 space-y-4 relative group hover:border-[#BEF8A1]/50 transition-all">
              <div className="w-14 h-14 rounded-xl bg-[#191F2D] border border-[#BEF8A1]/30 flex items-center justify-center text-[#BEF8A1]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-orbitron font-bold text-xl text-[#F5F5F7] uppercase">
                100% Genuine Hardware
              </h3>
              <p className="text-xs sm:text-sm text-[#8B929E] leading-relaxed">
                Direct procurement partnerships with industry giants: DELL, HP, LG, SAMSUNG, INTEL, ACER, LENOVO, and ASUS. Guaranteed genuine products, official manufacturer warranty cards, and 100% compliant GST tax invoices.
              </p>
            </div>

            <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 space-y-4 relative group hover:border-[#BEF8A1]/50 transition-all">
              <div className="w-14 h-14 rounded-xl bg-[#191F2D] border border-[#BEF8A1]/30 flex items-center justify-center text-[#BEF8A1]">
                <Wrench className="w-7 h-7" />
              </div>
              <h3 className="font-orbitron font-bold text-xl text-[#F5F5F7] uppercase">
                Chip-Level Repair Lab
              </h3>
              <p className="text-xs sm:text-sm text-[#8B929E] leading-relaxed">
                Patna's in-house micro-soldering laboratory. We revive dead motherboards, repair power short circuits, fabricate broken hinges, and replace displays without recommending expensive board replacements.
              </p>
            </div>
          </div>
        </div>

        {/* Storefront Story & Integrity */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest">
                  OUR PHILOSOPHY & VALUES
                </div>
                <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
                  BUILT ON TRUST, TECHNICAL EXPERTISE & LOCAL COMMITMENT
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-[#B7BBC5] font-inter leading-relaxed">
                  <p>
                    Unlike generic electronics marketplaces, Dream Computer was founded with a singular mission: to provide the gamers, software developers, creative studios, and businesses of Bihar with genuine, uncompromised computing hardware.
                  </p>
                  <p>
                    Whether you are commissioning a high-FPS competitive esports rig, picking up an authorized enterprise laptop, or requiring critical micro-soldering on a creator workstation, our team of certified engineers tests every component in front of you.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-[#F5F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-[#BEF8A1]" />
                    <span>Free Component Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-[#F5F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-[#BEF8A1]" />
                    <span>Same-Day Diagnostics</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-[#F5F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-[#BEF8A1]" />
                    <span>Live Unboxing & Bench-Testing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-[#F5F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-[#BEF8A1]" />
                    <span>Instant WhatsApp Quotations</span>
                  </div>
                </div>
              </div>

              {/* Showroom Contact Card */}
              <div className="lg:col-span-5 bg-[#0A101E] border border-[#303746] rounded-xl p-6 sm:p-8 space-y-5">
                <div className="pb-3 border-b border-[#303746]">
                  <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase">Official Showroom</div>
                  <h4 className="font-orbitron font-bold text-lg text-[#F5F5F7]">Dream Computer</h4>
                  <span className="text-[11px] text-[#8B929E] font-mono">GSTIN: 10GEBPB0233K1ZA</span>
                </div>

                <div className="space-y-3 text-xs text-[#B7BBC5]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#BEF8A1] shrink-0 mt-0.5" />
                    <span>Beside of Westside Mall, Near SBI ATM, S.P. Verma Road Chauraha, New Dakbunglow Main Road, Patna-01</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                    <span>+91 84484 74795 / WA: 82929 21078</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                    <span>Monday – Sunday: 9:00 AM – 9:00 PM</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <Link
                    to="/contact"
                    className="w-full py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-glow-subtle"
                  >
                    <span>Visit Showroom & Directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/custom-pc-builder"
                    className="w-full py-2.5 bg-[#191F2D] hover:bg-[#252e42] border border-[#303746] text-[#F5F5F7] font-rajdhani font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Configure Custom PC</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
