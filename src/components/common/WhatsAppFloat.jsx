import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { analyticsService } from '../../services/firebase/analyticsService';

export const WhatsAppFloat = () => {
  const handleClick = () => {
    analyticsService.trackWhatsAppClick('floating_button');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* WhatsApp Floating Action Pill */}
      <a
        href="https://wa.me/918448474795?text=Hello%20Dream%20Computer!%20I%20would%20like%20to%20enquire%20about%20products%20and%20PC%20builds."
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="pointer-events-auto group flex items-center gap-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] px-4 py-3 rounded-full shadow-glow-accent hover:scale-105 transition-all duration-300"
        title="Chat with Dream Computer on WhatsApp"
      >
        <span className="w-3 h-3 rounded-full bg-emerald-700 animate-ping absolute -top-0.5 -right-0.5"></span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="font-rajdhani font-bold text-sm tracking-wide hidden sm:inline">
          Book / Chat via WhatsApp
        </span>
      </a>
    </div>
  );
};
