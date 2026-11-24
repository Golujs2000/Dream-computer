import React, { useState, useEffect, useRef } from 'react';
import { X, Printer, Send, Copy, Check, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatPrice } from '../../utils/formatters';
import { STANDARD_QUOTATION_ITEMS } from '../../utils/quotationItems';

export { STANDARD_QUOTATION_ITEMS };

export const QuotationModal = ({
  isOpen,
  onClose,
  initialCustomer = {},
  initialItems = {}, // Mapping of item name/id to { desc, qty, rate, amount } or array of { name, qty, rate, amount }
  title = 'Official Quotation Estimate',
}) => {
  const [customer, setCustomer] = useState({
    name: initialCustomer.name || '',
    phone: initialCustomer.phone || '',
    address: initialCustomer.address || 'Patna, Bihar',
    date: initialCustomer.date || new Date().toLocaleDateString('en-GB'),
  });

  // State for all 19 rows
  const [rows, setRows] = useState(() => {
    return STANDARD_QUOTATION_ITEMS.map((item) => ({
      ...item,
      desc: '',
      qty: '',
      rate: '',
      amount: '',
    }));
  });

  const [paymentReceived, setPaymentReceived] = useState('');
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  // Sync initial items when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (initialCustomer.name) {
      setCustomer((prev) => ({
        ...prev,
        name: initialCustomer.name || prev.name,
        phone: initialCustomer.phone || prev.phone,
        address: initialCustomer.address || prev.address,
      }));
    }

    // Populate rows if initial items provided
    const newRows = STANDARD_QUOTATION_ITEMS.map((item) => {
      const match = findMatchingItem(item, initialItems);
      if (match) {
        const qty = match.qty || 1;
        const rate = match.price || match.rate || 0;
        const amount = match.amount || rate * qty;
        return {
          ...item,
          desc: match.name || match.desc || '',
          qty: qty,
          rate: rate,
          amount: amount,
        };
      }
      return {
        ...item,
        desc: '',
        qty: '',
        rate: '',
        amount: '',
      };
    });

    setRows(newRows);
  }, [isOpen, initialItems, initialCustomer]);

  if (!isOpen) return null;

  // Helper to map custom PC or cart parts to standard rows
  function findMatchingItem(standardItem, items) {
    if (!items) return null;

    // If items is an object map e.g. { processor: {...}, gpu: {...} }
    if (!Array.isArray(items)) {
      const key = standardItem.id;
      if (items[key]) return items[key];

      // fuzzy match
      const foundKey = Object.keys(items).find(
        (k) =>
          k.toLowerCase().includes(standardItem.id) ||
          standardItem.name.toLowerCase().includes(k.toLowerCase())
      );
      if (foundKey) return items[foundKey];
      return null;
    }

    // If items is an array e.g. cart items
    return items.find((it) => {
      const n = (it.name || it.productName || '').toUpperCase();
      const s = standardItem.name.toUpperCase();
      if (s === 'PROCESSOR' && (n.includes('INTEL') || n.includes('RYZEN') || n.includes('CORE') || n.includes('CPU'))) return true;
      if (s === 'MOTHER BOARD' && (n.includes('MOTHERBOARD') || n.includes('B650') || n.includes('B760') || n.includes('Z790'))) return true;
      if (s === 'GRAPHIC CARD' && (n.includes('RTX') || n.includes('GPU') || n.includes('GRAPHIC') || n.includes('GEFORCE') || n.includes('RADEON'))) return true;
      if (s === 'RAM' && (n.includes('RAM') || n.includes('DDR4') || n.includes('DDR5') || n.includes('MEMORY'))) return true;
      if (s === 'SSD' && (n.includes('SSD') || n.includes('NVME') || n.includes('M.2'))) return true;
      if (s === 'SMPS' && (n.includes('SMPS') || n.includes('POWER SUPPLY') || n.includes('PSU') || n.includes('WATT'))) return true;
      if (s === 'ATX CABINET' && (n.includes('CABINET') || n.includes('CHASSIS') || n.includes('CASE'))) return true;
      if (s === 'MONITOR' && (n.includes('MONITOR') || n.includes('DISPLAY') || n.includes('INCH'))) return true;
      if (s === 'LAPTOP' && (n.includes('LAPTOP') || n.includes('NOTEBOOK'))) return true;
      if (s === 'DESKTOP' && (n.includes('DESKTOP') || n.includes('RIG') || n.includes('PC'))) return true;
      if (s === 'KEYBOARD' && n.includes('KEYBOARD')) return true;
      if (s === 'MOUSE' && n.includes('MOUSE')) return true;
      return n.includes(s);
    });
  }

  // Row update handlers
  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    if (field === 'qty' || field === 'rate') {
      const q = parseFloat(updated[index].qty) || 0;
      const r = parseFloat(updated[index].rate) || 0;
      updated[index].amount = q && r ? q * r : '';
    }

    setRows(updated);
  };

  // Calculations
  const totalAmount = rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  const paid = parseFloat(paymentReceived) || 0;
  const paymentDue = Math.max(0, totalAmount - paid);

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Copy Quotation Text for WhatsApp / SMS
  const handleCopy = () => {
    const activeRows = rows.filter((r) => r.amount || r.desc);
    let text = `*DREAM COMPUTER - OFFICIAL ESTIMATE*\n`;
    text += `GSTIN: 10GEBPB0233K1ZA\n`;
    text += `Customer (M/s): ${customer.name || 'Valued Customer'}\n`;
    text += `Mob: ${customer.phone || 'N/A'}\n`;
    text += `Date: ${customer.date}\n`;
    text += `------------------------------------\n`;
    activeRows.forEach((r) => {
      text += `• ${r.name}${r.desc ? ` (${r.desc})` : ''} x${r.qty || 1} = ₹${r.amount || r.rate}\n`;
    });
    text += `------------------------------------\n`;
    text += `*TOTAL ESTIMATE: ₹${totalAmount.toLocaleString('en-IN')}*\n`;
    if (paid > 0) {
      text += `Advance Received: ₹${paid.toLocaleString('en-IN')}\n`;
      text += `Balance Due: ₹${paymentDue.toLocaleString('en-IN')}\n`;
    }
    text += `Beside Westside Mall, SP Verma Road Chauraha, Patna\n`;
    text += `WhatsApp: 8292921078 | Phone: 8448474795`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Quotation copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp Send
  const handleWhatsAppShare = () => {
    const activeRows = rows.filter((r) => r.amount || r.desc);
    let text = `Hello Dream Computer! Please check my Quotation Estimate:\n\n`;
    text += `*Customer:* ${customer.name || 'Customer'}\n`;
    text += `*Phone:* ${customer.phone || 'N/A'}\n`;
    text += `*Date:* ${customer.date}\n\n`;
    text += `*Items:*\n`;
    activeRows.forEach((r) => {
      text += `- ${r.name}: ${r.desc ? `${r.desc} ` : ''}(Qty: ${r.qty || 1}) - ₹${r.amount || r.rate}\n`;
    });
    text += `\n*TOTAL: ₹${totalAmount.toLocaleString('en-IN')}*\n`;
    text += `\nPlease confirm component availability and best store discount.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918292921078?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex justify-center items-start p-2 sm:p-4 md:p-6">
      {/* Container with Print CSS Rules */}
      <div className="relative w-full max-w-4xl bg-[#121826] border border-[#303746] rounded-2xl shadow-2xl flex flex-col my-4">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="print:hidden p-4 bg-[#0A101E] border-b border-[#303746] rounded-t-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-base text-[#F5F5F7]">
                {title}
              </h3>
              <p className="text-xs text-[#8B929E]">
                Official Printed Format (GSTIN: 10GEBPB0233K1ZA)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-glow-subtle transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2 bg-[#191F2D] hover:bg-[#252e42] border border-[#303746] text-[#BEF8A1] font-rajdhani font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Estimate</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-[#191F2D] hover:bg-[#252e42] border border-[#303746] text-[#B7BBC5] hover:text-[#F5F5F7] rounded-lg text-xs flex items-center gap-1"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#8B929E] hover:text-[#F5F5F7] hover:bg-[#191F2D] rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* THE OFFICIAL QUOTATION SHEET (EXACT CLONE OF PRINTED PAD) */}
        {/* ======================================================== */}
        <div
          ref={printRef}
          id="dream-quotation-sheet"
          className="p-6 sm:p-8 bg-white text-[#0D235C] font-sans printable-quotation-sheet"
          style={{ minHeight: '850px' }}
        >
          {/* Header Top Row: GSTIN, Title, Phone/WA */}
          <div className="flex justify-between items-center text-[12px] font-bold border-b border-[#0D235C]/30 pb-2 mb-3">
            <div>
              <span>GSTIN : </span>
              <span className="font-mono text-[#003366] text-sm">10GEBPB0233K1ZA</span>
            </div>
            <div className="text-base uppercase tracking-widest underline decoration-2 font-black text-[#003366]">
              Quotation
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                📞 <strong>8448474795</strong>
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                💬 <strong>8292921078</strong>
              </span>
            </div>
          </div>

          {/* Business Branding Strip */}
          <div className="text-center my-3 relative">
            <div className="flex items-center justify-center gap-3">
              {/* Circular DC Monogram */}
              <div className="w-12 h-12 rounded-full border-2 border-[#003366] flex items-center justify-center font-serif font-black text-xl text-[#003366] shrink-0">
                DC
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#003366] leading-none">
                  DREAM COMPUTER
                </h1>
                <p className="text-xs font-bold text-[#0D235C] tracking-wide mt-0.5">
                  Computer, Laptop Sales & Service
                </p>
              </div>
            </div>

            {/* Badge Ribbon */}
            <div className="mt-1.5 inline-block px-4 py-0.5 bg-[#003366] text-white text-[11px] font-black uppercase tracking-widest rounded-sm">
              ⚡ GAMING PC & EDITING ⚡
            </div>

            {/* Address & Email */}
            <p className="text-[11px] text-[#222] font-semibold mt-1">
              Address :- Beside of Westside Mall, Near SBI ATM, S.P. Verma Road Chauraha, New Dakbunglow Main Road, Patna-01
            </p>
            <p className="text-[11px] text-[#003366] font-bold">
              E-Mail : kram56447@gmail.com
            </p>

            {/* Brands Horizontal Row as printed on the sheet */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2 pt-1 border-t border-b border-[#003366]/20 py-1 text-[11px] font-black text-[#555] tracking-wider uppercase">
              <span className="text-[#007DB8]">DELL</span>
              <span className="text-[#0096D6]">hp</span>
              <span className="text-[#C4004F]">LG</span>
              <span className="text-[#1428A0]">SAMSUNG</span>
              <span className="text-[#0071C5]">intel</span>
              <span className="text-[#83B81A]">acer</span>
              <span className="text-[#E2231A]">lenovo</span>
              <span className="text-[#000]">ASUS</span>
            </div>
          </div>

          {/* Customer Details Row */}
          <div className="grid grid-cols-12 gap-2 text-xs border border-[#003366] p-2 rounded my-3 bg-[#f8faff]">
            <div className="col-span-8 flex items-center gap-1.5">
              <span className="font-bold text-[#003366]">M/s</span>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Customer / Company Name"
                className="flex-1 border-b border-dotted border-[#003366] bg-transparent outline-none px-1 py-0.5 text-[#003366] font-semibold"
              />
            </div>
            <div className="col-span-4 flex items-center gap-1.5 justify-end">
              <span className="font-bold text-[#003366]">Date</span>
              <input
                type="text"
                value={customer.date}
                onChange={(e) => setCustomer({ ...customer, date: e.target.value })}
                className="w-24 border-b border-dotted border-[#003366] bg-transparent outline-none text-right px-1 py-0.5 text-[#003366] font-semibold"
              />
            </div>

            <div className="col-span-8 flex items-center gap-1.5">
              <span className="font-bold text-[#003366]">Address</span>
              <input
                type="text"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="Patna, Bihar"
                className="flex-1 border-b border-dotted border-[#003366] bg-transparent outline-none px-1 py-0.5 text-[#003366]"
              />
            </div>
            <div className="col-span-4 flex items-center gap-1.5 justify-end">
              <span className="font-bold text-[#003366]">Mob.</span>
              <input
                type="text"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="+91..."
                className="w-28 border-b border-dotted border-[#003366] bg-transparent outline-none text-right px-1 py-0.5 text-[#003366] font-semibold"
              />
            </div>
          </div>

          {/* The Itemized Table */}
          <div className="border border-[#003366] rounded overflow-hidden">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#003366] text-white font-bold text-center">
                  <th className="py-1 px-1.5 w-12 border-r border-white/30">Sl. No.</th>
                  <th className="py-1 px-2 border-r border-white/30 text-left">ITEM</th>
                  <th className="py-1 px-1.5 w-14 border-r border-white/30">Qty.</th>
                  <th className="py-1 px-2 w-24 border-r border-white/30">Rate</th>
                  <th className="py-1 px-2 w-28 text-right">@ Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const hasValue = row.amount || row.desc || row.rate;
                  return (
                    <tr
                      key={row.id || index}
                      className={`border-b border-[#003366]/30 ${
                        hasValue ? 'bg-blue-50/40 font-semibold' : index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      {/* Sl. No. */}
                      <td className="py-0.5 px-1.5 text-center border-r border-[#003366]/30 font-bold text-[#003366]">
                        {row.no}
                      </td>

                      {/* ITEM Name & Optional Specification description */}
                      <td className="py-0.5 px-2 border-r border-[#003366]/30">
                        <div className="flex items-center gap-1">
                          <span className="font-black text-[#003366] shrink-0 text-[11px] sm:text-xs">
                            {row.name}
                          </span>
                          <input
                            type="text"
                            value={row.desc}
                            onChange={(e) => handleRowChange(index, 'desc', e.target.value)}
                            placeholder="Specification / model..."
                            className="flex-1 bg-transparent border-0 outline-none px-1 text-[11px] text-[#222] font-normal placeholder:text-gray-300 print:placeholder:text-transparent"
                          />
                        </div>
                      </td>

                      {/* Qty */}
                      <td className="py-0.5 px-1 border-r border-[#003366]/30 text-center">
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) => handleRowChange(index, 'qty', e.target.value)}
                          placeholder=""
                          className="w-full text-center bg-transparent border-0 outline-none font-bold text-[#003366]"
                        />
                      </td>

                      {/* Rate */}
                      <td className="py-0.5 px-1 border-r border-[#003366]/30 text-right">
                        <input
                          type="number"
                          value={row.rate}
                          onChange={(e) => handleRowChange(index, 'rate', e.target.value)}
                          placeholder=""
                          className="w-full text-right bg-transparent border-0 outline-none font-medium text-[#003366]"
                        />
                      </td>

                      {/* @ Amount */}
                      <td className="py-0.5 px-2 text-right font-bold text-[#003366]">
                        {row.amount ? `₹${Number(row.amount).toLocaleString('en-IN')}` : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Summary & Signature Strip */}
          <div className="mt-3 grid grid-cols-12 gap-3 text-xs border-t-2 border-[#003366] pt-3">
            <div className="col-span-7 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#003366]">Payment Received :</span>
                <input
                  type="number"
                  value={paymentReceived}
                  onChange={(e) => setPaymentReceived(e.target.value)}
                  placeholder="₹ 0"
                  className="w-32 border-b border-dotted border-[#003366] bg-transparent outline-none px-1 py-0.5 font-bold text-[#003366]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#003366]">Payment Due :</span>
                <span className="font-bold text-red-600">
                  {paymentDue > 0 ? `₹${paymentDue.toLocaleString('en-IN')}` : '₹0'}
                </span>
              </div>
              <div className="pt-2 text-[10px] text-gray-500 italic">
                * Prices are inclusive of GST. Valid for 3 days from the date of quotation.
              </div>
            </div>

            <div className="col-span-5 flex flex-col justify-between items-end text-right">
              {/* Total Box */}
              <div className="w-full bg-[#003366] text-white px-3 py-1.5 rounded flex items-center justify-between text-sm font-black shadow-sm">
                <span>Total</span>
                <span className="text-base font-mono">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Signature */}
              <div className="mt-6 text-center border-t border-dotted border-[#003366] pt-1 w-40">
                <span className="text-xs font-bold text-[#003366] block italic">Signature</span>
                <span className="text-[9px] text-gray-500 block">Dream Computer Authorized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Print Styles Injection */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #dream-quotation-sheet, #dream-quotation-sheet * {
            visibility: visible !important;
          }
          #dream-quotation-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 15mm !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
};
