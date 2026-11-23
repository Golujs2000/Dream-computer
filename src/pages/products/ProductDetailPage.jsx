import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShoppingCart,
  MessageSquare,
  Share2,
  ShieldCheck,
  Truck,
  Building2,
  Heart,
  Scale,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { ProductGallery } from '../../components/products/ProductGallery';
import { ProductVariantSelector } from '../../components/products/ProductVariantSelector';
import { ProductSpecsTable } from '../../components/products/ProductSpecsTable';
import { ProductCard } from '../../components/products/ProductCard';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import {
  buildProductEnquiryMessage,
  getWhatsAppUrl,
} from '../../services/whatsapp/whatsappService';
import { getProductSchema } from '../../services/seo/schemas';
import { analyticsService } from '../../services/firebase/analyticsService';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'description', 'warranty'

  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const item = await dbService.getBySlug('products', slug);
        if (item) {
          setProduct(item);
          // Set initial variant if variants exist
          if (item.hasVariants && item.variants && item.variants.length > 0) {
            setSelectedVariant(item.variants[0]);
          } else {
            setSelectedVariant(null);
          }

          // Track analytics product view
          analyticsService.trackProductView(item);

          // Fetch related products from same category
          const allCat = await dbService.getAll('products', { categoryId: item.categoryId });
          setRelatedProducts(allCat.filter((p) => p.id !== item.id).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load product detail', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#303746] border-t-[#BEF8A1] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-rajdhani text-[#8B929E] uppercase tracking-wider">
          Loading hardware details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-orbitron font-bold text-2xl text-[#F5F5F7] mb-2">Product Not Found</h2>
        <p className="text-sm text-[#8B929E] mb-6">
          The requested hardware item may have been relocated or updated.
        </p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-[#BEF8A1] text-[#0A101E] font-rajdhani font-bold rounded uppercase"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Active pricing & stock calculated from selected variation or base
  const activePrice = selectedVariant?.price ?? product.basePrice;
  const activeMrp = selectedVariant?.mrp ?? product.baseMrp;
  const activeSku = selectedVariant?.sku ?? product.sku;
  const activeStock = selectedVariant ? (selectedVariant.stock ?? 0) : (product.stock ?? 0);
  const discount = calculateDiscount(activeMrp, activePrice);
  const inStock = activeStock > 0;

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Direct WhatsApp Book
  const handleDirectWhatsAppBook = () => {
    analyticsService.trackWhatsAppClick('product_detail_book', activeSku);
    const msg = buildProductEnquiryMessage(product, selectedVariant);
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    const success = addToCart(product, selectedVariant, quantity);
    if (success) {
      setIsCartOpen(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Dream Computer Patna!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.seo?.title || `${product.name} in Patna | Dream Computer`}</title>
        <meta
          name="description"
          content={product.seo?.description || product.shortDescription || product.description}
        />
        <meta name="keywords" content={product.seo?.keywords} />
        <script type="application/ld+json">
          {JSON.stringify(getProductSchema(product, selectedVariant))}
        </script>
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-8 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-rajdhani uppercase font-semibold text-[#8B929E] mb-6">
            <Link to="/" className="hover:text-[#BEF8A1]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products" className="hover:text-[#BEF8A1]">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/products?category=${product.categoryId}`}
              className="hover:text-[#BEF8A1]"
            >
              {product.categoryName || 'Hardware'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F5F5F7] truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* Product Detail Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#121826] border border-[#303746] rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
            {/* Left Column: Gallery */}
            <div className="lg:col-span-6">
              <ProductGallery
                images={selectedVariant?.images?.length ? selectedVariant.images : product.images}
                productName={product.name}
              />
            </div>

            {/* Right Column: Information & Configuration */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                {/* Brand and Stock Status */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#BEF8A1] font-rajdhani font-bold uppercase tracking-widest">
                    {product.brandName}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-rajdhani font-bold uppercase ${
                      inStock
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/40'
                        : 'text-rose-400 bg-rose-950/60 border border-rose-800/40'
                    }`}
                  >
                    {inStock ? `In Stock (${activeStock} Units in Patna)` : 'Out of Stock'}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="font-orbitron font-bold text-xl sm:text-2xl text-[#F5F5F7] leading-snug">
                  {product.name}
                </h1>

                {/* SKU Badge */}
                <div className="text-xs text-[#8B929E] mt-1 font-mono">
                  SKU: <span className="text-[#B7BBC5]">{activeSku}</span>
                </div>
              </div>

              {/* Pricing Block */}
              <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl flex items-baseline gap-3">
                <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-[#BEF8A1]">
                  {formatPrice(activePrice)}
                </span>
                {activeMrp && activeMrp > activePrice && (
                  <span className="text-sm text-[#8B929E] line-through font-inter">
                    {formatPrice(activeMrp)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-rajdhani font-bold bg-red-600/90 text-white rounded">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-xs sm:text-sm text-[#B7BBC5] font-inter leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Dynamic Variations Selector */}
              <ProductVariantSelector
                product={product}
                selectedVariant={selectedVariant}
                onVariantChange={(v) => setSelectedVariant(v)}
              />

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#303746] rounded-lg bg-[#0A101E]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:text-[#BEF8A1] text-[#8B929E]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-[#F5F5F7]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(activeStock || 10, quantity + 1))}
                      className="p-2 hover:text-[#BEF8A1] text-[#8B929E]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="py-3.5 bg-[#191F2D] hover:bg-[#252e42] border border-[#303746] hover:border-[#BEF8A1] text-[#F5F5F7] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#BEF8A1]" />
                    <span>Add to Booking Cart</span>
                  </button>

                  <button
                    onClick={handleDirectWhatsAppBook}
                    className="py-3.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Book via WhatsApp</span>
                  </button>
                </div>

                {/* Auxiliary Actions (Wishlist, Compare, Share) */}
                <div className="flex items-center justify-between pt-2 border-t border-[#303746]/60 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`flex items-center gap-1.5 font-semibold ${
                        isLiked ? 'text-red-400' : 'text-[#8B929E] hover:text-[#F5F5F7]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{isLiked ? 'Saved' : 'Wishlist'}</span>
                    </button>

                    <button
                      onClick={() => addToCompare(product)}
                      className={`flex items-center gap-1.5 font-semibold ${
                        isCompared ? 'text-[#BEF8A1]' : 'text-[#8B929E] hover:text-[#F5F5F7]'
                      }`}
                    >
                      <Scale className="w-4 h-4" />
                      <span>{isCompared ? 'In Compare' : 'Compare'}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-[#8B929E] hover:text-[#BEF8A1] font-semibold"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Patna Store Promises */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#303746]/60 text-xs text-[#8B929E]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                  <span>Pickup: SP Verma Road, Patna</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#BEF8A1] shrink-0" />
                  <span>100% Tax Invoice & Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs Section */}
          <div className="bg-[#121826] border border-[#303746] rounded-2xl p-6 sm:p-8 mb-12">
            <div className="flex items-center gap-6 border-b border-[#303746] pb-4 mb-6">
              <button
                onClick={() => setActiveTab('specs')}
                className={`font-orbitron font-bold text-sm uppercase tracking-wider pb-2 -mb-4 transition-colors ${
                  activeTab === 'specs'
                    ? 'text-[#BEF8A1] border-b-2 border-[#BEF8A1]'
                    : 'text-[#8B929E] hover:text-[#F5F5F7]'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`font-orbitron font-bold text-sm uppercase tracking-wider pb-2 -mb-4 transition-colors ${
                  activeTab === 'description'
                    ? 'text-[#BEF8A1] border-b-2 border-[#BEF8A1]'
                    : 'text-[#8B929E] hover:text-[#F5F5F7]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                className={`font-orbitron font-bold text-sm uppercase tracking-wider pb-2 -mb-4 transition-colors ${
                  activeTab === 'warranty'
                    ? 'text-[#BEF8A1] border-b-2 border-[#BEF8A1]'
                    : 'text-[#8B929E] hover:text-[#F5F5F7]'
                }`}
              >
                Warranty & Services
              </button>
            </div>

            {activeTab === 'specs' && (
              <ProductSpecsTable specifications={product.specifications} />
            )}

            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none text-sm text-[#B7BBC5] font-inter leading-relaxed space-y-4">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-4 text-sm text-[#B7BBC5] font-inter">
                <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl space-y-2">
                  <h4 className="font-rajdhani font-bold text-base text-[#F5F5F7] uppercase">
                    Authorized Store Warranty Guarantee
                  </h4>
                  <p className="text-xs text-[#8B929E] leading-relaxed">
                    All computer parts and laptops sold by Dream Computer come with manufacturer brand warranty cards and GST tax invoices valid across authorized service centers in Patna and India.
                  </p>
                </div>
                <div className="p-4 bg-[#0A101E] border border-[#303746] rounded-xl space-y-2">
                  <h4 className="font-rajdhani font-bold text-base text-[#F5F5F7] uppercase">
                    In-Store Testing & Free Assistance
                  </h4>
                  <p className="text-xs text-[#8B929E] leading-relaxed">
                    When you pick up hardware from our SP Verma Road showroom, our technicians will unbox, perform initial boot checks, and help you register your official warranty for zero charge.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Hardware Section */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-orbitron font-bold text-xl text-[#F5F5F7] uppercase">
                RELATED HARDWARE IN PATNA
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
