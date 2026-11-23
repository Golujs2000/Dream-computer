import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Cpu, CheckCircle2, MessageSquare, ShoppingCart, RefreshCw, Sparkles, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatPrice } from '../../utils/formatters';
import { buildCustomPcEnquiryMessage, getWhatsAppUrl } from '../../services/whatsapp/whatsappService';
import { analyticsService } from '../../services/firebase/analyticsService';
import { useCart } from '../../context/CartContext';

const PC_PARTS = {
  processor: [
    { name: 'Intel Core i5-13400F (10 Cores, 16 Threads)', price: 16990 },
    { name: 'Intel Core i7-14700K (20 Cores, 28 Threads)', price: 38490 },
    { name: 'AMD Ryzen 5 7600X (6 Cores, 12 Threads)', price: 19990 },
    { name: 'AMD Ryzen 7 7800X3D (World\'s Best Gaming CPU)', price: 42990 },
  ],
  motherboard: [
    { name: 'MSI PRO B760M-A WiFi DDR5', price: 15490 },
    { name: 'ASUS ROG STRIX Z790-F Gaming WiFi', price: 39990 },
    { name: 'MSI MAG B650 Tomahawk WiFi AM5', price: 21990 },
    { name: 'Gigabyte B650 AORUS Elite AX', price: 23490 },
  ],
  graphics: [
    { name: 'MSI GeForce RTX 4060 Ventus 2X 8GB', price: 29990 },
    { name: 'ZOTAC GeForce RTX 4070 Super Twin Edge 12GB', price: 59990 },
    { name: 'MSI GeForce RTX 4070 Ti Super 16GB Gaming X', price: 84990 },
    { name: 'ASUS ROG Strix GeForce RTX 4080 Super 16GB', price: 119990 },
  ],
  ram: [
    { name: 'Corsair Vengeance 16GB (1x16GB) DDR5 5600MHz', price: 5290 },
    { name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', price: 10990 },
    { name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6000MHz', price: 21990 },
  ],
  storage: [
    { name: 'WD Blue SN580 1TB NVMe PCIe 4.0 SSD', price: 6290 },
    { name: 'Samsung 990 PRO 1TB Gen4 NVMe SSD (7450 MB/s)', price: 10490 },
    { name: 'Samsung 990 PRO 2TB Gen4 NVMe SSD', price: 17990 },
  ],
  cooler: [
    { name: 'DeepCool AG400 ARGB Single Tower Air Cooler', price: 2190 },
    { name: 'DeepCool LS720 360mm ARGB AIO Liquid Cooler', price: 9490 },
    { name: 'Corsair iCUE LINK H150i RGB 360mm Liquid Cooler', price: 18990 },
  ],
  powersupply: [
    { name: 'DeepCool PM750D 750W 80 Plus Gold', price: 6490 },
    { name: 'Corsair RM850e 850W 80+ Gold Fully Modular ATX 3.0', price: 10990 },
    { name: 'Corsair RM1000x 1000W 80+ Gold Fully Modular', price: 16990 },
  ],
  cabinet: [
    { name: 'Ant Esports ICE-112 Mid-Tower ARGB Case', price: 3490 },
    { name: 'Lian Li O11 Dynamic EVO Dual Chamber Case', price: 13990 },
    { name: 'NZXT H9 Flow Dual-Chamber Panoramic Glass', price: 15990 },
  ],
};

export const CustomPcBuilderPage = () => {
  const [selectedParts, setSelectedParts] = useState({
    processor: PC_PARTS.processor[1],
    motherboard: PC_PARTS.motherboard[0],
    graphics: PC_PARTS.graphics[1],
    ram: PC_PARTS.ram[1],
    storage: PC_PARTS.storage[1],
    cooler: PC_PARTS.cooler[1],
    powersupply: PC_PARTS.powersupply[1],
    cabinet: PC_PARTS.cabinet[1],
  });

  const { addToCart, setIsCartOpen } = useCart();

  const handleSelect = (category, item) => {
    setSelectedParts((prev) => ({ ...prev, [category]: item }));
  };

  const totalPrice = Object.values(selectedParts).reduce((sum, item) => sum + (item?.price || 0), 0);

  const handleWhatsAppEnquiry = () => {
    analyticsService.trackWhatsAppClick('pc_builder_submit');
    const configMap = {};
    Object.entries(selectedParts).forEach(([cat, item]) => {
      configMap[cat.toUpperCase()] = `${item.name} (₹${item.price.toLocaleString('en-IN')})`;
    });
    configMap['ESTIMATED TOTAL'] = `₹${totalPrice.toLocaleString('en-IN')}`;

    const msg = buildCustomPcEnquiryMessage(configMap);
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  const handleAddCustomPcToCart = () => {
    const customRigProduct = {
      id: `custom-pc-${Date.now()}`,
      name: `Custom PC Rig (${selectedParts.processor.name.split('(')[0]} + ${selectedParts.graphics.name.split('(')[0]})`,
      brandName: 'Dream Computer Signature Build',
      slug: 'custom-gaming-rig',
      basePrice: totalPrice,
      baseMrp: Math.round(totalPrice * 1.15),
      sku: 'DC-CUSTOM-RIG',
      stock: 5,
      images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'],
    };

    const variant = {
      id: `custom-spec-${Date.now()}`,
      sku: 'DC-CUSTOM-RIG',
      price: totalPrice,
      mrp: Math.round(totalPrice * 1.15),
      stock: 5,
      attributes: {
        CPU: selectedParts.processor.name.split('(')[0].trim(),
        GPU: selectedParts.graphics.name.split('(')[0].trim(),
        RAM: selectedParts.ram.name.split('(')[0].trim(),
      },
    };

    addToCart(customRigProduct, variant, 1);
    setIsCartOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Custom Gaming PC Builder in Patna | Dream Computer</title>
        <meta
          name="description"
          content="Configure your dream custom gaming PC and workstation in Patna. Pick your Intel or AMD CPU, RTX 40-Series GPU, and get an instant WhatsApp quote with free assembly!"
        />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-10 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#121826] border border-[#BEF8A1]/40 text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Hardware Studio</span>
            </div>
            <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-[#F5F5F7] uppercase">
              CUSTOM GAMING PC BUILDER
            </h1>
            <p className="text-xs sm:text-sm text-[#8B929E] mt-2 font-inter">
              Pick each high-end component. 100% genuine components, free professional cable management, and stress-testing at SP Verma Road, Patna.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Component Selectors */}
            <div className="lg:col-span-8 space-y-6">
              {Object.entries(PC_PARTS).map(([category, items]) => {
                const currentSelected = selectedParts[category];

                return (
                  <div
                    key={category}
                    className="p-5 bg-[#121826] border border-[#303746] rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#303746]">
                      <h3 className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase tracking-wider">
                        {category}
                      </h3>
                      <span className="text-xs font-rajdhani font-bold text-[#BEF8A1]">
                        {formatPrice(currentSelected?.price || 0)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {items.map((item, idx) => {
                        const isSelected = currentSelected?.name === item.name;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelect(category, item)}
                            className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between gap-2 ${
                              isSelected
                                ? 'bg-[#191F2D] border-[#BEF8A1] shadow-glow-subtle'
                                : 'bg-[#0A101E] border-[#303746] hover:border-[#8B929E]'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-semibold text-[#F5F5F7] leading-snug">
                                {item.name}
                              </div>
                              <div className="text-[11px] font-rajdhani font-bold text-[#BEF8A1] mt-1">
                                {formatPrice(item.price)}
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-[#BEF8A1] shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Build Summary & Live Total */}
            <div className="lg:col-span-4 bg-[#121826] border border-[#303746] rounded-2xl p-6 sticky top-28 shadow-2xl space-y-5">
              <div className="pb-4 border-b border-[#303746]">
                <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
                  BUILD SPECIFICATION
                </h3>
                <p className="text-xs text-[#8B929E]">Complimentary Patna Store Assembly</p>
              </div>

              {/* Parts list mini */}
              <div className="space-y-2.5 text-xs">
                {Object.entries(selectedParts).map(([cat, item]) => (
                  <div key={cat} className="flex justify-between items-start gap-2">
                    <span className="text-[#8B929E] uppercase font-rajdhani font-bold shrink-0">
                      {cat.slice(0, 4)}:
                    </span>
                    <span className="text-[#F5F5F7] text-right truncate">
                      {item.name.split('(')[0]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-[#303746] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">
                    Assembly & Cable Management:
                  </span>
                  <span className="text-xs font-rajdhani font-bold text-emerald-400 uppercase">
                    FREE (₹0)
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-rajdhani uppercase font-bold text-[#F5F5F7]">
                    Estimated Hardware Total:
                  </span>
                  <span className="font-orbitron font-extrabold text-xl text-[#BEF8A1]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Build to WhatsApp</span>
                </button>

                <button
                  onClick={handleAddCustomPcToCart}
                  className="w-full py-3 bg-[#191F2D] hover:bg-[#252e42] border border-[#303746] hover:border-[#BEF8A1] text-[#F5F5F7] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-4 h-4 text-[#BEF8A1]" />
                  <span>Add to Booking Cart</span>
                </button>
              </div>

              <div className="p-3 bg-[#0A101E] border border-[#303746] rounded-lg text-[11px] text-[#8B929E] space-y-1">
                <p>• All parts include authorized GST invoice.</p>
                <p>• 48-Hour benchmark & thermals stress-test included.</p>
                <p>• Free physical pickup at SP Verma Road showroom.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
