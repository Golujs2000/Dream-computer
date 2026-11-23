import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../../services/seo/seoConfig';

export const StoreLocationSection = () => {
  return (
    <section className="py-16 bg-[#0A101E] border-b border-[#303746]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Store Address Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest mb-1">
                VISIT OUR SHOWROOM
              </div>
              <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
                EXPERIENCE HARDWARE LIVE IN PATNA
              </h2>
            </div>

            <p className="text-sm text-[#8B929E] font-inter leading-relaxed">
              Step into our store for live gaming PC bench-testing, side-by-side display comparisons,
              original laptop chargers, and instant hardware diagnosis by certified technicians.
            </p>

            <div className="space-y-4 text-sm bg-[#121826] p-5 rounded-xl border border-[#303746]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#BEF8A1] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#F5F5F7] font-rajdhani text-base">Store Address</div>
                  <div className="text-xs text-[#B7BBC5] leading-relaxed">
                    Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Near SBI ATM, opposite Westside Mall lane, Patna, Bihar – 800001
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#303746]/50">
                <Phone className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                <a
                  href="tel:+918448474795"
                  className="font-rajdhani font-bold text-sm text-[#F5F5F7] hover:text-[#BEF8A1]"
                >
                  +91 84484 74795
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#303746]/50">
                <Clock className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                <div className="text-xs text-[#B7BBC5]">
                  Open All 7 Days: <strong className="text-[#F5F5F7]">9:00 AM – 9:00 PM</strong>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://maps.google.com/?q=SP+Verma+Road+Corner+New+Dak+Bunglow+Road+Patna"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded-lg flex items-center gap-2 shadow-glow-subtle transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Google Maps Embed / Interactive Preview */}
          <div className="lg:col-span-7">
            <div className="bg-[#121826] border border-[#303746] rounded-2xl p-2 shadow-2xl overflow-hidden h-96 relative">
              <iframe
                title="Dream Computer Patna Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2843.6215253365717!2d85.1366854741696!3d25.609550914878046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed594ad8cd8e63%3A0x9b99e4c82865469b!2sDream%20Computer!5e1!3m2!1sen!2sin!4v1795421348090!5m2!1sen!2sin"
                className="w-full h-full rounded-xl border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
