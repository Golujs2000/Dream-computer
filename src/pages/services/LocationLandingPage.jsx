import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../../services/whatsapp/whatsappService';
import { STORE_INFO } from '../../services/seo/seoConfig';

const LOCATION_PAGE_CONFIGS = {
  'computer-shop-patna': {
    title: 'Best Computer Shop in Patna | Dream Computer SP Verma Road',
    h1: 'PREMIER COMPUTER & HARDWARE SHOP IN PATNA',
    description: 'Looking for the best computer shop in Patna? Dream Computer at SP Verma Road offers branded laptops, custom gaming PCs, graphic cards, monitors, and genuine components with official brand warranties.',
    features: [
      'Largest in-store inventory of graphics cards & processors in Patna',
      'Authorized distributor pricing with GST tax invoices',
      'Instant store pickup at New Dak Bunglow Road / SP Verma Road junction',
      'Same-day custom PC assembly and diagnostic services',
    ],
    faqs: [
      {
        q: 'Where is Dream Computer located in Patna?',
        a: 'We are located at Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Near SBI ATM, opposite Westside Mall lane, Patna – 800001.',
      },
      {
        q: 'Do all computer parts come with manufacturer warranty in Patna?',
        a: 'Yes, 100% of our products come with official manufacturer warranties and authorized tax invoices valid across India.',
      },
    ],
  },
  'laptop-shop-patna': {
    title: 'Laptop Shop in Patna | Branded Gaming & Business Laptops',
    h1: 'OFFICIAL LAPTOP SHOWROOM IN PATNA',
    description: 'Buy ASUS ROG, Lenovo Legion, HP Omen, Acer Predator, and Dell laptops in Patna at best prices with authorized store warranty and free unboxing testing.',
    features: [
      'Latest 14th Gen Intel and AMD Ryzen 7000/8000 Series laptops',
      'RTX 4050, 4060, 4070, 4080 Gaming laptops in stock',
      'Complimentary SSD file migration from your old laptop',
      'Zero-cost advice on RAM and storage upgrades',
    ],
    faqs: [
      {
        q: 'Can I test laptops in person before buying in Patna?',
        a: 'Yes! Walk into our SP Verma Road showroom to see displays, keyboard feel, and thermals in real life.',
      },
      {
        q: 'Do you offer laptop repair and warranty support in Patna?',
        a: 'Yes, we provide authorized manufacturer support guidance and in-house chip-level hardware maintenance.',
      },
    ],
  },
  'gaming-pc-builder-patna': {
    title: 'Gaming PC Builder in Patna | Custom 4K Rigs & Workstations',
    h1: 'CUSTOM GAMING PC BUILDER IN PATNA',
    description: 'Custom PC building specialist in Patna. Handcrafted gaming PCs, streaming setups, and 3D architectural workstations built with pride and 48-hour bench testing.',
    features: [
      'Free PC assembly with purchase of components',
      'Stress-tested with Cinebench, 3DMark, and Furmark',
      'Custom ARGB lighting and cable combing included',
      'Individual warranty cards for each component',
    ],
    faqs: [
      {
        q: 'How long does custom PC building take in Patna?',
        a: 'Most custom builds are completed, cable-managed, and bench-tested within 4 to 24 hours at our SP Verma Road shop.',
      },
      {
        q: 'Can I bring my own parts for assembly?',
        a: 'Yes, our technicians offer professional assembly and thermal paste repasting services for custom components.',
      },
    ],
  },
  'chip-level-repair-patna': {
    title: 'Chip Level Laptop Repair in Patna | Motherboard Micro-Soldering',
    h1: 'CHIP-LEVEL LAPTOP & MOTHERBOARD REPAIR PATNA',
    description: 'Expert chip-level motherboard repair, short-circuit diagnostics, MOSFET replacement, and liquid spill recovery in Patna at Dream Computer SP Verma Road.',
    features: [
      'Advanced microscope micro-soldering station',
      'Fixed motherboard repair instead of costly complete replacement',
      'No-fix no-fee diagnostic policy',
      '30-day warranty on all repaired motherboard components',
    ],
    faqs: [
      {
        q: 'What is chip-level repair?',
        a: 'Chip-level repair involves diagnosing and replacing individual damaged electronic components (like ICs, capacitors, MOSFETs) on a circuit board rather than replacing the entire board.',
      },
      {
        q: 'Can you fix water-damaged laptops in Patna?',
        a: 'Yes, we perform ultrasonic circuit cleaning and trace rebuilding for water and liquid spilled laptops.',
      },
    ],
  },
  'laptop-repair-patna': {
    title: 'Laptop Repair in Patna | Screen, Battery & Hinge Repair',
    h1: 'FAST & RELIABLE LAPTOP REPAIR IN PATNA',
    description: 'Fast laptop screen replacement, battery replacement, keyboard repair, and broken hinge fabrication in Patna at SP Verma Road.',
    features: [
      'High refresh rate 144Hz & 165Hz screens in stock',
      'Original brand batteries with 1-year replacement warranty',
      'Structural hinge repair with precision resin moulding',
      'Transparent estimates with zero hidden charges',
    ],
    faqs: [
      {
        q: 'How quickly can a laptop screen be replaced in Patna?',
        a: 'In most cases, we replace screens within 2 to 4 hours depending on the panel type.',
      },
    ],
  },
  'computer-accessories-patna': {
    title: 'Computer Accessories Shop in Patna | Keyboards, Mice, Chargers',
    h1: 'COMPUTER ACCESSORIES & LAPTOP CHARGERS PATNA',
    description: 'Original laptop chargers, mechanical gaming keyboards, high-DPI mice, studio headsets, and cabling at Dream Computer Patna.',
    features: [
      'Original HP, Dell, Lenovo, and ASUS laptop chargers with warranty',
      'Hot-swappable mechanical keyboards and gaming mice',
      'Thermal Grizzly Kryonaut & Arctic MX-4 thermal paste',
      'DisplayPort 1.4, HDMI 2.1, and CAT6 networking cables',
    ],
    faqs: [
      {
        q: 'Are original chargers available for all laptop brands?',
        a: 'Yes, we stock 65W, 90W, 135W, 230W, and Type-C chargers for all major laptop brands in Patna.',
      },
    ],
  },
  'custom-pc-building-services': {
    title: 'Custom PC Building Services Patna | Dream Computer',
    h1: 'CUSTOM PC BUILDING SERVICES IN PATNA',
    description: 'Professional PC configuration and building services in Patna. Consult our master hardware engineers for the highest performance per rupee.',
    features: [
      'Free compatibility review before purchasing',
      'Custom liquid cooling & fan curve optimization',
      'Dual-boot Linux & Windows setups configured',
      'In-store unboxing and setup guidance',
    ],
    faqs: [
      {
        q: 'Can I consult your team on WhatsApp before visiting the store?',
        a: 'Yes! Send your budget or intended games/software to +91 84484 74795 for an instant part list.',
      },
    ],
  },
};

export const LocationLandingPage = () => {
  const { slug } = useParams();
  const config = LOCATION_PAGE_CONFIGS[slug] || LOCATION_PAGE_CONFIGS['computer-shop-patna'];

  const waEnquiryUrl = getWhatsAppUrl(
    `Hello Dream Computer Patna! I am looking for information regarding ${config.h1}.`
  );

  return (
    <>
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-12 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A101E] border border-[#BEF8A1]/40 text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>SP Verma Road • Patna, Bihar</span>
              </div>

              <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-[#F5F5F7] uppercase leading-tight">
                {config.h1}
              </h1>

              <p className="text-sm sm:text-base text-[#B7BBC5] font-inter leading-relaxed">
                {config.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <a
                  href={waEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded-lg flex items-center gap-2 shadow-glow-subtle transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp Enquiry (+91 84484 74795)</span>
                </a>

                <Link
                  to="/products"
                  className="px-6 py-3 bg-[#191F2D] hover:bg-[#252e42] text-[#F5F5F7] border border-[#303746] font-rajdhani font-bold text-sm uppercase rounded-lg flex items-center gap-2 transition-all"
                >
                  <span>Explore Hardware Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="mb-14">
            <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-[#F5F5F7] uppercase mb-6">
              WHY PATNA HARDWARE BUYERS CHOOSE DREAM COMPUTER
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#121826] border border-[#303746] rounded-xl flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#BEF8A1] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#F5F5F7] font-inter">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location FAQs */}
          <div className="bg-[#121826] border border-[#303746] rounded-2xl p-8 mb-12">
            <h2 className="font-orbitron font-bold text-xl text-[#F5F5F7] uppercase mb-6">
              FREQUENTLY ASKED QUESTIONS IN PATNA
            </h2>
            <div className="space-y-4">
              {config.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl space-y-1.5">
                  <h4 className="font-rajdhani font-bold text-base text-[#BEF8A1]">
                    {faq.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#B7BBC5] font-inter leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Store Address Footprint */}
          <div className="p-6 bg-[#0A101E] border border-[#303746] rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#BEF8A1] shrink-0" />
              <div className="text-xs text-[#B7BBC5]">
                <strong className="text-[#F5F5F7]">Dream Computer Store:</strong>{' '}
                Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Patna – 800001
              </div>
            </div>
            <a
              href="tel:+918448474795"
              className="text-xs font-rajdhani font-bold text-[#BEF8A1] hover:underline shrink-0"
            >
              Call Store: +91 84484 74795
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
