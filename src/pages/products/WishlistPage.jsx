import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../../components/products/ProductCard';

export const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <>
      <Helmet>
        <title>My Wishlist | Dream Computer Patna</title>
        <meta name="description" content="Saved computer hardware and gaming gear at Dream Computer Patna." />
      </Helmet>

      <div className="bg-[#0A101E] min-h-screen py-12 border-b border-[#303746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#303746]">
            <div>
              <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-[#F5F5F7] uppercase">
                SAVED HARDWARE ({wishlist.length})
              </h1>
              <p className="text-xs text-[#8B929E] mt-1">
                Keep track of your dream gaming laptop, PC parts, or workstation components.
              </p>
            </div>
            <Link
              to="/products"
              className="px-4 py-2 bg-[#121826] hover:bg-[#191F2D] text-[#BEF8A1] border border-[#303746] rounded text-xs font-rajdhani font-bold uppercase"
            >
              Browse More
            </Link>
          </div>

          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#121826] border border-[#303746] rounded-2xl space-y-4">
              <div className="w-16 h-16 bg-[#191F2D] rounded-full flex items-center justify-center mx-auto text-[#8B929E]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-[#F5F5F7]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#8B929E] max-w-sm mx-auto">
                Explore our catalog of custom gaming PCs, RTX laptops, and accessories to save items for later.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded shadow-glow-subtle transition-all"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
