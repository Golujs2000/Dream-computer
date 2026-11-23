import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Cpu,
  Monitor,
  Laptop,
  Wrench,
  Sliders,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStorefront } from '../../context/StorefrontContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatters';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, totalEstimatedPrice, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useStorefront();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Gaming PCs', path: '/products?category=cat-custom-pcs' },
    { name: 'Laptops', path: '/products?category=cat-gaming-laptops' },
    { name: 'Components', path: '/products?category=cat-graphics-cards' },
    { name: 'Monitors', path: '/products?category=cat-monitors' },
    { name: 'Accessories', path: '/products?category=cat-accessories' },
    { name: 'PC Builder', path: '/custom-pc-builder' },
    { name: 'Repairs & Services', path: '/services' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A101E]/95 backdrop-blur-md border-b border-[#303746]">
      {/* Top Bar for Patna Store Info */}
      <div className="bg-[#121826] text-xs text-[#B7BBC5] py-1.5 px-4 border-b border-[#303746]/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-[#F5F5F7]">
              <span className="w-2 h-2 rounded-full bg-[#BEF8A1] animate-pulse"></span>
              Patna Store Open Today: 9:00 AM – 9:00 PM
            </span>
            <span className="hidden md:inline text-[#8B929E]">|</span>
            <span className="hidden md:inline">SP Verma Road Corner, New Dak Bunglow Road, Patna</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+918448474795"
              className="flex items-center gap-1 hover:text-[#BEF8A1] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#BEF8A1]" />
              <span>+91 84484 74795</span>
            </a>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-[#BEF8A1] font-semibold hover:underline flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" /> Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#121826] border border-[#BEF8A1] flex items-center justify-center shadow-glow-subtle group-hover:shadow-glow-accent transition-all">
              <span className="font-orbitron font-extrabold text-xl text-[#BEF8A1]">D</span>
            </div>
            <div>
              <span className="font-orbitron text-xl sm:text-2xl font-black tracking-wider text-[#F5F5F7] group-hover:text-[#BEF8A1] transition-colors block leading-tight">
                DREAM<span className="text-[#BEF8A1]">.</span>COMPUTER
              </span>
              <span className="text-[10px] tracking-widest uppercase font-rajdhani text-[#B7BBC5] block -mt-1">
                Patna’s Tech Powerhouse
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 text-sm font-rajdhani font-semibold text-[#B7BBC5] hover:text-[#BEF8A1] hover:bg-[#121826] rounded-md transition-all tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 text-sm text-[#B7BBC5] hover:text-[#F5F5F7] bg-[#121826] hover:bg-[#191F2D] border border-[#303746] rounded-md flex items-center gap-2 transition-all"
              title="Search hardware (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-[#BEF8A1]" />
              <span className="hidden xl:inline text-xs text-[#8B929E]">Search hardware...</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[10px] bg-[#0A101E] border border-[#303746] rounded text-[#8B929E]">
                ⌘K
              </kbd>
            </button>

            {/* Booking Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#121826] hover:bg-[#191F2D] border border-[#BEF8A1]/40 hover:border-[#BEF8A1] px-3.5 py-2 rounded-md shadow-glow-subtle transition-all"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#BEF8A1]" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#BEF8A1] text-[#0A101E] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left leading-none">
                <div className="text-[10px] text-[#8B929E] font-rajdhani uppercase font-bold">Booking Cart</div>
                <div className="text-xs font-bold text-[#F5F5F7] font-rajdhani">
                  {formatPrice(totalEstimatedPrice)}
                </div>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#B7BBC5] hover:text-[#F5F5F7] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#BEF8A1]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121826] border-b border-[#303746] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-rajdhani font-bold text-[#F5F5F7] hover:text-[#BEF8A1] hover:bg-[#191F2D] rounded-md transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#303746]">
            <a
              href="https://wa.me/918448474795"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold rounded shadow-glow-subtle transition-all"
            >
              Book via WhatsApp (+91 84484 74795)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
