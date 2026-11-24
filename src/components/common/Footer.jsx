import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ShieldCheck,
  Cpu,
  Wrench,
  Truck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { STORE_INFO } from '../../services/seo/seoConfig';
import { DreamLogo } from './DreamLogo';

export const Footer = () => {
  return (
    <footer className="bg-[#0A101E] border-t border-[#303746] text-[#B7BBC5] pt-14 pb-8">
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-[#303746]/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-[#121826] border border-[#303746]">
            <div className="p-3 rounded-lg bg-[#191F2D] text-[#BEF8A1]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F5F7] font-rajdhani uppercase">100% Genuine Hardware</h4>
              <p className="text-xs text-[#8B929E]">Official brand warranty & GST tax invoices</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-[#121826] border border-[#303746]">
            <div className="p-3 rounded-lg bg-[#191F2D] text-[#BEF8A1]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F5F7] font-rajdhani uppercase">Custom Rig Specialists</h4>
              <p className="text-xs text-[#8B929E]">Stress-tested gaming builds & workstations</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-[#121826] border border-[#303746]">
            <div className="p-3 rounded-lg bg-[#191F2D] text-[#BEF8A1]">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F5F7] font-rajdhani uppercase">Chip-Level Repair Lab</h4>
              <p className="text-xs text-[#8B929E]">Motherboard & GPU micro-soldering in Patna</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-[#121826] border border-[#303746]">
            <div className="p-3 rounded-lg bg-[#191F2D] text-[#BEF8A1]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F5F7] font-rajdhani uppercase">Instant WhatsApp Booking</h4>
              <p className="text-xs text-[#8B929E]">Store pickup or local delivery across Patna</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" aria-label="Dream Computer Homepage">
              <DreamLogo />
            </Link>
            <p className="text-sm text-[#8B929E] leading-relaxed max-w-md">
              Patna’s premier destination for custom gaming PC rigs, high-performance laptops, workstation components, and precision chip-level hardware repair services.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="inline-block px-2.5 py-1 rounded bg-[#191F2D] border border-[#BEF8A1]/40 text-[#BEF8A1] font-rajdhani font-bold text-xs uppercase tracking-wider mb-1">
                GSTIN: 10GEBPB0233K1ZA
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#BEF8A1] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Beside of Westside Mall, Near SBI ATM, S.P. Verma Road Chauraha, New Dakbunglow Main Road, Patna-01
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                <div className="text-xs">
                  <a href="tel:+918448474795" className="hover:text-[#BEF8A1] transition-colors">
                    +91 84484 74795
                  </a>
                  <span className="mx-2 text-[#8B929E]">|</span>
                  <a href="https://wa.me/918292921078" target="_blank" rel="noopener noreferrer" className="hover:text-[#BEF8A1] transition-colors">
                    WA: +91 82929 21078
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                <a href="mailto:dreamcomputer2026@gmail.com" className="text-xs hover:text-[#BEF8A1] transition-colors">
                  dreamcomputer2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                <span className="text-xs">Monday – Sunday: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-rajdhani font-bold text-lg text-[#F5F5F7] uppercase tracking-wider mb-4 border-l-2 border-[#BEF8A1] pl-2.5">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=cat-gaming-laptops" className="hover:text-[#BEF8A1] transition-colors">
                  Gaming Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-custom-pcs" className="hover:text-[#BEF8A1] transition-colors">
                  Custom Gaming PCs
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-graphics-cards" className="hover:text-[#BEF8A1] transition-colors">
                  Graphics Cards (RTX GPUs)
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-processors" className="hover:text-[#BEF8A1] transition-colors">
                  Intel & AMD Processors
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-ram-ssd" className="hover:text-[#BEF8A1] transition-colors">
                  RAM & NVMe SSD Storage
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-monitors" className="hover:text-[#BEF8A1] transition-colors">
                  High Refresh Gaming Monitors
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-accessories" className="hover:text-[#BEF8A1] transition-colors">
                  Mechanical Keyboards & Mice
                </Link>
              </li>
            </ul>
          </div>

          {/* Patna Local Services */}
          <div>
            <h3 className="font-rajdhani font-bold text-lg text-[#F5F5F7] uppercase tracking-wider mb-4 border-l-2 border-[#BEF8A1] pl-2.5">
              Store & Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-[#BEF8A1] hover:underline transition-colors font-semibold flex items-center gap-1.5">
                  <span>→ About Dream Computer</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#BEF8A1] hover:underline transition-colors font-semibold flex items-center gap-1.5">
                  <span>→ Contact & Showroom Map</span>
                </Link>
              </li>
              <li>
                <Link to="/custom-pc-builder" className="hover:text-[#BEF8A1] transition-colors">
                  Custom PC Builder Patna
                </Link>
              </li>
              <li>
                <Link to="/chip-level-repair-patna" className="hover:text-[#BEF8A1] transition-colors">
                  Chip-Level Laptop Repair
                </Link>
              </li>
              <li>
                <Link to="/laptop-repair-patna" className="hover:text-[#BEF8A1] transition-colors">
                  Laptop Screen & Battery Replacement
                </Link>
              </li>
              <li>
                <Link to="/computer-shop-patna" className="hover:text-[#BEF8A1] transition-colors">
                  Computer Shop SP Verma Road
                </Link>
              </li>
              <li>
                <Link to="/gaming-pc-builder-patna" className="hover:text-[#BEF8A1] transition-colors">
                  Gaming PC Showroom Patna
                </Link>
              </li>
              <li>
                <Link to="/computer-accessories-patna" className="hover:text-[#BEF8A1] transition-colors">
                  Original Chargers & Parts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Quick Booking */}
          <div>
            <h3 className="font-rajdhani font-bold text-lg text-[#F5F5F7] uppercase tracking-wider mb-4 border-l-2 border-[#BEF8A1] pl-2.5">
              WhatsApp Booking
            </h3>
            <p className="text-xs text-[#8B929E] mb-3">
              Book online and collect at our store with live unboxing, testing, and system setup assistance.
            </p>
            <a
              href="https://wa.me/918448474795?text=Hello%20Dream%20Computer%20Patna!%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm rounded shadow-glow-subtle transition-all"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="mt-4 text-xs text-[#8B929E]">
              <p>Store Location:</p>
              <p className="text-[#F5F5F7] font-semibold">New Dak Bunglow Road / SP Verma Rd Junction</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-[#303746] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B929E] gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-[#F5F5F7] font-bold">Dream Computer</span> (GSTIN: 10GEBPB0233K1ZA). All rights reserved. Patna, Bihar, India.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <Link to="/about" className="text-[#F5F5F7] hover:text-[#BEF8A1] font-bold transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link to="/contact" className="text-[#F5F5F7] hover:text-[#BEF8A1] font-bold transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <Link to="/privacy-policy" className="hover:text-[#BEF8A1] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-[#BEF8A1] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
