import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wrench, Zap, Cpu, ShieldCheck, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { buildRepairEnquiryMessage, getWhatsAppUrl } from '../../services/whatsapp/whatsappService';

export const ServicesPage = () => {
  const servicesList = [
    {
      title: 'Chip-Level Motherboard Repair',
      desc: 'Precision micro-soldering, short-circuit diagnostics, power IC / charging IC replacement, and liquid damage recovery for high-end laptops and desktops.',
      turnaround: '24 – 48 Hours',
    },
    {
      title: 'Gaming Laptop GPU & Thermal Servicing',
      desc: 'BGA chip reflow, VRAM replacement, liquid metal or Thermal Grizzly Kryonaut application, fan replacement, and complete ultrasonic cooling overhaul.',
      turnaround: 'Same Day / 24 Hours',
    },
    {
      title: 'Display & High-Refresh Screen Replacement',
      desc: '120Hz, 144Hz, 165Hz, and 240Hz IPS & OLED laptop screen replacements for ASUS ROG, Lenovo Legion, Acer Predator, Dell Alienware, and HP Omen.',
      turnaround: '2 – 4 Hours',
    },
    {
      title: 'SSD & RAM Performance Upgrades',
      desc: 'Blazing fast Gen4 NVMe M.2 SSD installations, RAM expansion (up to 64GB DDR5), seamless OS cloning with zero data loss.',
      turnaround: '1 Hour Express',
    },
    {
      title: 'Original Chargers & Battery Replacement',
      desc: '100% genuine laptop chargers (65W, 135W, 230W, 330W) and replacement battery packs with manufacturer warranty.',
      turnaround: 'Instant in Store',
    },
    {
      title: 'Custom PC Assembly & Cable Management',
      desc: 'Professional computer building, custom water cooling loops, BIOS updating, XMP/EXPO memory tuning, and Windows optimization.',
      turnaround: 'Same Day',
    },
  ];

  const handleEnquireService = (title) => {
    const msg = buildRepairEnquiryMessage(title, 'I need service diagnosis in Patna.');
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Laptop & Desktop Chip-Level Repair in Patna | Dream Computer</title>
        <meta
          name="description"
          content="Patna's premier chip-level motherboard repair, screen replacement, gaming laptop GPU servicing, and SSD upgrades at SP Verma Road, Patna."
        />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-12 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#121826] border border-[#BEF8A1]/40 text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Certified Engineering Lab • Patna</span>
            </div>
            <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-[#F5F5F7] uppercase">
              CHIP-LEVEL REPAIR & HARDWARE UPGRADES
            </h1>
            <p className="text-xs sm:text-sm text-[#8B929E] mt-2 font-inter leading-relaxed">
              Why spend ₹40,000+ replacing a motherboard when our Patna micro-soldering specialists can repair the faulty circuit for a fraction of the cost?
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {servicesList.map((srv, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#121826] border border-[#303746] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#BEF8A1]/50 transition-all hover:shadow-glow-subtle"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#191F2D] border border-[#303746] flex items-center justify-center text-[#BEF8A1]">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="font-rajdhani font-bold text-lg text-[#F5F5F7]">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#8B929E] font-inter leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#303746]/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#BEF8A1]">
                    ⏱ {srv.turnaround}
                  </span>
                  <button
                    onClick={() => handleEnquireService(srv.title)}
                    className="px-3 py-1.5 bg-[#191F2D] hover:bg-[#BEF8A1] text-[#F5F5F7] hover:text-[#0A101E] border border-[#303746] hover:border-[#BEF8A1] text-xs font-rajdhani font-bold uppercase rounded transition-all"
                  >
                    Enquire WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Process */}
          <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 sm:p-10 mb-12">
            <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-[#F5F5F7] uppercase mb-6 text-center">
              OUR 4-STEP TRANSPARENT REPAIR PROCESS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#BEF8A1] text-[#0A101E] font-bold font-orbitron flex items-center justify-center mx-auto text-sm">
                  1
                </div>
                <h4 className="font-rajdhani font-bold text-sm text-[#F5F5F7] uppercase">Store Drop-off</h4>
                <p className="text-xs text-[#8B929E]">Bring device to SP Verma Road, Patna with job receipt.</p>
              </div>

              <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#BEF8A1] text-[#0A101E] font-bold font-orbitron flex items-center justify-center mx-auto text-sm">
                  2
                </div>
                <h4 className="font-rajdhani font-bold text-sm text-[#F5F5F7] uppercase">Lab Diagnosis</h4>
                <p className="text-xs text-[#8B929E]">Microscope inspection and power rail multimeter testing.</p>
              </div>

              <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#BEF8A1] text-[#0A101E] font-bold font-orbitron flex items-center justify-center mx-auto text-sm">
                  3
                </div>
                <h4 className="font-rajdhani font-bold text-sm text-[#F5F5F7] uppercase">Quote Approval</h4>
                <p className="text-xs text-[#8B929E]">We notify exact cost via WhatsApp before any repair begins.</p>
              </div>

              <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#BEF8A1] text-[#0A101E] font-bold font-orbitron flex items-center justify-center mx-auto text-sm">
                  4
                </div>
                <h4 className="font-rajdhani font-bold text-sm text-[#F5F5F7] uppercase">QC Testing & Delivery</h4>
                <p className="text-xs text-[#8B929E]">Stress-tested with 30-day store repair warranty.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
