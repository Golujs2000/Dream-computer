import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

export const TestimonialsSection = ({ testimonials = [] }) => {
  const displayTestimonials = testimonials.filter((t) => t.approved);

  if (displayTestimonials.length === 0) return null;

  return (
    <section className="py-16 bg-[#121826] border-b border-[#303746]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-widest mb-1">
            COMMUNITY TRUST
          </div>
          <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
            VERIFIED PATNA CUSTOMER REVIEWS
          </h2>
          <p className="text-xs sm:text-sm text-[#8B929E] mt-2 font-inter">
            Read what local gamers, students, and professionals say about Dream Computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-[#0A101E] border border-[#303746] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#BEF8A1]/40 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-[#303746]'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#B7BBC5] italic leading-relaxed font-inter">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#303746]/60 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#F5F5F7] font-rajdhani">
                    {t.customerName}
                  </div>
                  <div className="text-[11px] text-[#8B929E] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#BEF8A1]" />
                    <span>{t.location || 'Patna'}</span>
                  </div>
                </div>

                {t.verifiedBooking && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-rajdhani uppercase font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
