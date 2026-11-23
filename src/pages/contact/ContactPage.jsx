import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { STORE_INFO } from '../../services/seo/seoConfig';
import { getWhatsAppUrl } from '../../services/whatsapp/whatsappService';
import { analyticsService } from '../../services/firebase/analyticsService';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Hardware Purchase',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }

    analyticsService.trackEvent('contact_form_submit', {
      subject: formData.subject,
    });

    const text = `*New Contact Enquiry from Website*\n👤 Name: ${formData.name}\n📱 Phone: ${formData.phone}\n📋 Subject: ${formData.subject}\n💬 Message: ${formData.message}`;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank');
    toast.success('Opening WhatsApp with your enquiry...');
  };

  return (
    <>
      <Helmet>
        <title>Contact Dream Computer Patna | Store Location & WhatsApp</title>
        <meta
          name="description"
          content="Visit Dream Computer at SP Verma Road, Patna. Open Monday to Sunday 9 AM to 9 PM. Call or WhatsApp +91 84484 74795 for custom PC builds and repair quotes."
        />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-12 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-[#F5F5F7] uppercase">
              VISIT OUR PATNA SHOWROOM
            </h1>
            <p className="text-xs sm:text-sm text-[#8B929E] mt-2 font-inter">
              Connect with our senior computer engineers and custom PC builders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Store Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#121826] border border-[#303746] rounded-2xl p-6 sm:p-8 space-y-5">
                <h3 className="font-orbitron font-bold text-lg text-[#F5F5F7] uppercase">
                  STORE DETAILS
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#BEF8A1] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#F5F5F7]">Address</div>
                      <p className="text-xs text-[#B7BBC5] leading-relaxed">
                        Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Near SBI ATM, opposite Westside Mall lane, Patna, Bihar – 800001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                    <div>
                      <div className="font-bold text-[#F5F5F7]">Phone / WhatsApp</div>
                      <a href="tel:+918448474795" className="text-xs text-[#BEF8A1] hover:underline">
                        +91 84484 74795
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#BEF8A1] shrink-0" />
                    <div>
                      <div className="font-bold text-[#F5F5F7]">Business Hours</div>
                      <p className="text-xs text-[#B7BBC5]">Monday – Sunday: 9:00 AM – 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#303746]/60">
                  <a
                    href="https://wa.me/918448474795"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all"
                  >
                    <span>Instant WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Map embed */}
              <div className="bg-[#121826] border border-[#303746] rounded-2xl p-2 h-64 overflow-hidden">
                <iframe
                  title="Dream Computer Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2843.6215253365717!2d85.1366854741696!3d25.609550914878046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed594ad8cd8e63%3A0x9b99e4c82865469b!2sDream%20Computer!5e1!3m2!1sen!2sin!4v1795421348090!5m2!1sen!2sin"
                  className="w-full h-full rounded-xl border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Quick Contact / Request Form */}
            <div className="lg:col-span-7 bg-[#121826] border border-[#303746] rounded-2xl p-6 sm:p-8">
              <h3 className="font-orbitron font-bold text-lg text-[#F5F5F7] uppercase mb-1">
                SEND AN ENQUIRY
              </h3>
              <p className="text-xs text-[#8B929E] mb-6">
                Tell us what hardware or repair service you are looking for.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9835012345"
                      className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                    Enquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                  >
                    <option value="Custom Gaming PC Build">Custom Gaming PC Build</option>
                    <option value="Laptop Purchase Enquiry">Laptop Purchase Enquiry</option>
                    <option value="Chip-Level Repair Service">Chip-Level Repair Service</option>
                    <option value="Hardware Upgrade (RAM/SSD)">Hardware Upgrade (RAM/SSD)</option>
                    <option value="Accessories & Chargers">Accessories & Chargers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                    Message / Specifications
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your requirements, preferred budget, or issue with your computer..."
                    className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-3 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
