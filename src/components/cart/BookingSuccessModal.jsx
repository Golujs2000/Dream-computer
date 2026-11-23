import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, ExternalLink, Calendar, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatPrice } from '../../utils/formatters';

export const BookingSuccessModal = ({ booking, onClose }) => {
  if (!booking) return null;

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#BEF8A1', '#C3FFA5', '#ffffff'],
      });
    } catch (e) {}
  }, []);

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.bookingId);
    toast.success(`Booking ID ${booking.bookingId} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#121826] border border-[#BEF8A1] rounded-2xl shadow-glow-accent overflow-hidden p-6 text-center">
        {/* Animated Check */}
        <div className="w-16 h-16 bg-[#BEF8A1]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#BEF8A1]">
          <CheckCircle2 className="w-10 h-10 text-[#BEF8A1]" />
        </div>

        <h3 className="text-xl font-bold font-orbitron text-[#F5F5F7] mb-1">
          BOOKING SUBMITTED!
        </h3>
        <p className="text-xs text-[#8B929E] mb-5">
          Your booking has been registered with Dream Computer Patna.
        </p>

        {/* Booking Reference Box */}
        <div className="bg-[#191F2D] border border-[#303746] rounded-xl p-4 mb-5 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Booking Reference ID</span>
            <button
              onClick={copyBookingId}
              className="text-[#BEF8A1] hover:text-[#C3FFA5] flex items-center gap-1 text-xs"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <div className="font-orbitron text-xl font-bold text-[#BEF8A1] tracking-wider mb-2">
            {booking.bookingId}
          </div>
          <div className="text-xs text-[#B7BBC5] space-y-1 pt-2 border-t border-[#303746]">
            <div>Customer: <strong className="text-[#F5F5F7]">{booking.customer.name}</strong></div>
            <div>Phone: <strong className="text-[#F5F5F7]">{booking.customer.phone}</strong></div>
            <div>Total Est. Value: <strong className="text-[#BEF8A1]">{formatPrice(booking.estimatedTotal)}</strong></div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-[#0A101E] border border-[#303746] rounded-lg p-3 text-left text-xs text-[#B7BBC5] mb-5 space-y-2">
          <div className="font-bold text-[#F5F5F7] font-rajdhani uppercase text-sm mb-1">What Happens Next?</div>
          <div className="flex items-start gap-2">
            <span className="text-[#BEF8A1] font-bold">1.</span>
            <span>WhatsApp chat has been prepared with your configuration details.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#BEF8A1] font-bold">2.</span>
            <span>Our store technician will confirm component availability and price lock.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#BEF8A1] font-bold">3.</span>
            <span>Visit our store on SP Verma Road for live bench-testing or get same-day Patna delivery.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold rounded-lg shadow-glow-subtle transition-all uppercase tracking-wider text-sm"
          >
            Continue Browsing Store
          </button>
        </div>
      </div>
    </div>
  );
};
