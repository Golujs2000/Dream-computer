import React, { useState } from 'react';
import { X, Send, User, Phone, Mail, MapPin, Truck, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { generateBookingId } from '../../utils/formatters';
import { dbService } from '../../services/firebase/db';
import { analyticsService } from '../../services/firebase/analyticsService';
import { buildBookingWhatsAppMessage, getWhatsAppUrl } from '../../services/whatsapp/whatsappService';

export const BookingFormModal = ({ isOpen, onClose, onSuccess }) => {
  const { cartItems, totalEstimatedPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryPreference: 'pickup', // 'pickup' or 'delivery'
    notes: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const bookingId = generateBookingId();
      const bookingPayload = {
        bookingId,
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          brandName: item.brandName || '',
          variantId: item.variantId || null,
          sku: item.sku || '',
          selectedAttributes: item.selectedAttributes || {},
          quantity: item.quantity,
          price: item.price,
          image: item.image || '',
        })),
        estimatedTotal: totalEstimatedPrice,
        deliveryPreference: formData.deliveryPreference,
        customerNotes: formData.notes.trim() || null,
        bookingStatus: 'New',
        bookingSource: 'website_cart',
        whatsappHandoffAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 1. Save Booking in Database
      await dbService.create('bookings', bookingPayload);

      // 2. Track Analytics Events
      analyticsService.trackEvent('booking_created', {
        bookingId,
        itemCount: cartItems.length,
        totalValue: totalEstimatedPrice,
        preference: formData.deliveryPreference,
      });
      analyticsService.trackWhatsAppClick('booking_handoff', bookingId);

      // 3. Build WhatsApp text & open chat
      const waMessage = buildBookingWhatsAppMessage(bookingPayload);
      const waUrl = getWhatsAppUrl(waMessage);

      // Open WhatsApp in new window
      window.open(waUrl, '_blank');

      // 4. Clear cart & trigger success callback
      clearCart();
      onClose();
      onSuccess(bookingPayload);
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('Failed to submit booking. Please try again or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#121826] border border-[#303746] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#303746] bg-[#0A101E]">
          <div>
            <h3 className="text-lg font-bold font-orbitron text-[#F5F5F7]">
              COMPLETE YOUR BOOKING
            </h3>
            <p className="text-xs text-[#8B929E]">
              We will confirm availability & pricing via WhatsApp
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B929E] hover:text-[#F5F5F7] rounded-lg bg-[#191F2D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className={`w-full bg-[#191F2D] border ${
                  errors.name ? 'border-red-500' : 'border-[#303746]'
                } rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F5F5F7] placeholder-[#8B929E] focus:outline-none focus:border-[#BEF8A1]`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
              WhatsApp Mobile Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9835012345"
                className={`w-full bg-[#191F2D] border ${
                  errors.phone ? 'border-red-500' : 'border-[#303746]'
                } rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F5F5F7] placeholder-[#8B929E] focus:outline-none focus:border-[#BEF8A1]`}
              />
            </div>
            {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
              Email Address <span className="text-[#8B929E] lowercase font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. rahul@example.com"
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F5F5F7] placeholder-[#8B929E] focus:outline-none focus:border-[#BEF8A1]"
              />
            </div>
          </div>

          {/* Delivery / Store Pickup Preference */}
          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1.5">
              Pickup or Delivery in Patna
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryPreference: 'pickup' })}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all ${
                  formData.deliveryPreference === 'pickup'
                    ? 'bg-[#191F2D] border-[#BEF8A1] text-[#BEF8A1]'
                    : 'bg-[#0A101E] border-[#303746] text-[#B7BBC5]'
                }`}
              >
                <Building2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="text-xs font-bold font-rajdhani uppercase">Store Pickup</div>
                  <div className="text-[10px] text-[#8B929E]">SP Verma Rd, Patna</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryPreference: 'delivery' })}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all ${
                  formData.deliveryPreference === 'delivery'
                    ? 'bg-[#191F2D] border-[#BEF8A1] text-[#BEF8A1]'
                    : 'bg-[#0A101E] border-[#303746] text-[#B7BBC5]'
                }`}
              >
                <Truck className="w-5 h-5 shrink-0" />
                <div>
                  <div className="text-xs font-bold font-rajdhani uppercase">Local Delivery</div>
                  <div className="text-[10px] text-[#8B929E]">Within Patna City</div>
                </div>
              </button>
            </div>
          </div>

          {/* Optional Message / Address */}
          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
              Delivery Address or Specific Request
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Deliver to Kankarbagh, or please keep unboxing video ready."
              className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-sm text-[#F5F5F7] placeholder-[#8B929E] focus:outline-none focus:border-[#BEF8A1]"
            />
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-base uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Generating WhatsApp Booking...</span>
              ) : (
                <>
                  <span>Send Booking to WhatsApp</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#8B929E] mt-2">
              No online advance payment needed. Pay in-store or on delivery.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
