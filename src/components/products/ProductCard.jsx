import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, ShoppingCart, MessageSquare, ShieldCheck } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { buildProductEnquiryMessage, getWhatsAppUrl } from '../../services/whatsapp/whatsappService';
import { analyticsService } from '../../services/firebase/analyticsService';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { addToCart } = useCart();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const discount = calculateDiscount(product.baseMrp, product.basePrice);
  const inStock = (product.stock || 0) > 0;

  const handleWhatsAppDirect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    analyticsService.trackWhatsAppClick('product_card_direct', product.sku);
    const msg = buildProductEnquiryMessage(product);
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.variants?.[0] || null, 1);
  };

  return (
    <div className="group relative bg-[#121826] hover:bg-[#191F2D] border border-[#303746] hover:border-[#BEF8A1]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-glow-subtle">
      {/* Badges Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.bestSeller && (
          <span className="px-2 py-0.5 text-[10px] font-bold font-rajdhani uppercase tracking-wider bg-[#BEF8A1] text-[#0A101E] rounded">
            Best Seller
          </span>
        )}
        {product.featured && !product.bestSeller && (
          <span className="px-2 py-0.5 text-[10px] font-bold font-rajdhani uppercase tracking-wider bg-blue-600 text-white rounded">
            Featured
          </span>
        )}
        {discount > 0 && (
          <span className="px-2 py-0.5 text-[10px] font-bold font-rajdhani uppercase tracking-wider bg-red-600/90 text-white rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`p-2 rounded-lg bg-[#0A101E]/80 border border-[#303746] hover:border-[#BEF8A1] transition-colors ${
            isLiked ? 'text-red-500 fill-red-500' : 'text-[#8B929E] hover:text-[#F5F5F7]'
          }`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCompare(product);
          }}
          className={`p-2 rounded-lg bg-[#0A101E]/80 border border-[#303746] hover:border-[#BEF8A1] transition-colors ${
            isCompared ? 'text-[#BEF8A1]' : 'text-[#8B929E] hover:text-[#F5F5F7]'
          }`}
          title="Compare Specs"
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/product/${product.slug}`} className="relative pt-[75%] bg-[#0A101E] overflow-hidden block">
        <img
          src={product.images?.[0] || '/favicon.svg'}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Stock status */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#8B929E] font-rajdhani font-semibold uppercase tracking-wider">
              {product.brandName || 'Dream Computer'}
            </span>
            <span
              className={`text-[10px] font-bold font-rajdhani uppercase px-1.5 py-0.5 rounded ${
                inStock
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'
                  : 'text-rose-400 bg-rose-950/40 border border-rose-800/40'
              }`}
            >
              {inStock ? 'In Stock (Patna)' : 'Out of Stock'}
            </span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="font-bold text-sm text-[#F5F5F7] group-hover:text-[#BEF8A1] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Short specification snippet */}
          {product.shortDescription && (
            <p className="text-xs text-[#8B929E] line-clamp-1 mt-1 font-inter">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Pricing and Action row */}
        <div className="pt-2 border-t border-[#303746]/60">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-orbitron font-bold text-lg text-[#BEF8A1]">
              {formatPrice(product.basePrice)}
            </span>
            {product.baseMrp && product.baseMrp > product.basePrice && (
              <span className="text-xs text-[#8B929E] line-through font-inter">
                {formatPrice(product.baseMrp)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickAdd}
              disabled={!inStock}
              className="py-2 px-2 bg-[#191F2D] hover:bg-[#222a3d] border border-[#303746] hover:border-[#BEF8A1] text-xs font-rajdhani font-bold uppercase text-[#F5F5F7] rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#BEF8A1]" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="py-2 px-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] text-xs font-rajdhani font-bold uppercase rounded flex items-center justify-center gap-1.5 shadow-glow-subtle transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
