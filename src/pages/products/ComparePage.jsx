import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Scale, X, ShoppingCart, MessageSquare, ArrowRight } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { buildProductEnquiryMessage, getWhatsAppUrl } from '../../services/whatsapp/whatsappService';

export const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  // Extract all unique specification keys across all compared products
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((p) => (p.specifications ? Object.keys(p.specifications) : []))
    )
  );

  return (
    <>
      <Helmet>
        <title>Hardware Specification Comparison | Dream Computer Patna</title>
        <meta
          name="description"
          content="Compare gaming laptops, custom PC specifications, processors, and graphics cards side-by-side at Dream Computer."
        />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-10 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#303746] gap-4">
            <div>
              <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
                HARDWARE SPECIFICATION COMPARISON
              </h1>
              <p className="text-xs text-[#8B929E] mt-1">
                Comparing {compareList.length} of 4 maximum hardware units side-by-side.
              </p>
            </div>
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-4 py-2 bg-[#121826] hover:bg-red-950/40 text-red-400 border border-[#303746] rounded text-xs font-rajdhani font-bold uppercase transition-colors"
              >
                Clear Comparison
              </button>
            )}
          </div>

          {compareList.length === 0 ? (
            <div className="text-center py-20 bg-[#121826] border border-[#303746] rounded-2xl space-y-4">
              <div className="w-16 h-16 bg-[#191F2D] rounded-full flex items-center justify-center mx-auto text-[#8B929E]">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-[#F5F5F7]">No Products in Comparison</h3>
              <p className="text-xs text-[#8B929E] max-w-sm mx-auto">
                Click the compare icon on product cards or detail pages to review specifications side-by-side.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded shadow-glow-subtle transition-all"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto border border-[#303746] rounded-2xl bg-[#121826] shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#303746] bg-[#0A101E]">
                    <th className="p-4 w-48 text-xs font-rajdhani font-bold uppercase text-[#8B929E]">
                      Hardware Info
                    </th>
                    {compareList.map((p) => (
                      <th key={p.id} className="p-4 align-top w-64 border-l border-[#303746]/50">
                        <div className="relative space-y-3">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -top-1 -right-1 p-1 bg-[#191F2D] text-[#8B929E] hover:text-red-400 rounded border border-[#303746]"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={p.images?.[0] || '/favicon.svg'}
                            alt={p.name}
                            className="w-24 h-24 object-contain rounded-lg bg-[#121826] p-2 mx-auto"
                          />
                          <div className="text-xs font-rajdhani font-bold uppercase text-[#BEF8A1]">
                            {p.brandName}
                          </div>
                          <Link
                            to={`/product/${p.slug}`}
                            className="text-sm font-bold text-[#F5F5F7] hover:text-[#BEF8A1] line-clamp-2 block"
                          >
                            {p.name}
                          </Link>
                          <div className="font-orbitron font-bold text-base text-[#BEF8A1]">
                            {formatPrice(p.basePrice)}
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                              onClick={() => addToCart(p, p.variants?.[0] || null, 1)}
                              className="py-1.5 px-2 bg-[#191F2D] hover:bg-[#252e42] text-[11px] font-rajdhani font-bold uppercase text-[#F5F5F7] rounded border border-[#303746] flex items-center justify-center gap-1"
                            >
                              <ShoppingCart className="w-3 h-3 text-[#BEF8A1]" />
                              <span>Cart</span>
                            </button>
                            <a
                              href={getWhatsAppUrl(buildProductEnquiryMessage(p))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-1.5 px-2 bg-[#BEF8A1] text-[11px] font-rajdhani font-bold uppercase text-[#0A101E] rounded flex items-center justify-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3 fill-current" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303746]/50 text-xs">
                  {/* SKU Row */}
                  <tr className="hover:bg-[#191F2D]/50">
                    <td className="p-3 font-semibold text-[#8B929E] font-rajdhani uppercase">
                      SKU Code
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 font-mono text-[#F5F5F7] border-l border-[#303746]/50">
                        {p.sku}
                      </td>
                    ))}
                  </tr>

                  {/* Stock Row */}
                  <tr className="hover:bg-[#191F2D]/50">
                    <td className="p-3 font-semibold text-[#8B929E] font-rajdhani uppercase">
                      Store Availability
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 border-l border-[#303746]/50">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.stock > 0
                              ? 'text-emerald-400 bg-emerald-950/60'
                              : 'text-rose-400 bg-rose-950/60'
                          }`}
                        >
                          {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic specs rows */}
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="hover:bg-[#191F2D]/50">
                      <td className="p-3 font-semibold text-[#B7BBC5] font-rajdhani uppercase">
                        {key}
                      </td>
                      {compareList.map((p) => (
                        <td
                          key={p.id}
                          className="p-3 text-[#F5F5F7] border-l border-[#303746]/50 font-inter"
                        >
                          {p.specifications?.[key] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
