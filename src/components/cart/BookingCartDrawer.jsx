import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { BookingFormModal } from './BookingFormModal';
import { BookingSuccessModal } from './BookingSuccessModal';

export const BookingCartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalEstimatedPrice,
  } = useCart();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  if (!isCartOpen) return (
    <>
      <BookingFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={(booking) => setCompletedBooking(booking)}
      />
      {completedBooking && (
        <BookingSuccessModal
          booking={completedBooking}
          onClose={() => setCompletedBooking(null)}
        />
      )}
    </>
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity">
        <div
          className="fixed inset-y-0 right-0 max-w-full flex pl-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-screen max-w-md bg-[#121826] border-l border-[#303746] shadow-2xl flex flex-col">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#303746] flex items-center justify-between bg-[#0A101E]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#191F2D] rounded-lg text-[#BEF8A1]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-base text-[#F5F5F7]">
                    BOOKING CART
                  </h3>
                  <p className="text-xs text-[#8B929E]">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#8B929E] hover:text-[#F5F5F7] rounded-lg bg-[#191F2D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 bg-[#191F2D] rounded-full flex items-center justify-center mx-auto text-[#8B929E]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-orbitron text-base text-[#F5F5F7]">Your Cart is Empty</h4>
                  <p className="text-xs text-[#8B929E] max-w-xs mx-auto">
                    Browse our gaming PCs, laptops, and components to add items to your booking enquiry.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-4 py-2 bg-[#191F2D] hover:bg-[#252e42] text-[#BEF8A1] border border-[#303746] rounded font-rajdhani font-bold text-sm"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 bg-[#191F2D] border border-[#303746] rounded-xl flex gap-3 relative group"
                  >
                    <img
                      src={item.image || '/favicon.svg'}
                      alt={item.productName}
                      className="w-16 h-16 rounded-lg object-cover bg-[#0A101E] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#F5F5F7] line-clamp-2">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#8B929E] hover:text-red-400 p-1 shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Config details */}
                      {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                        <div className="text-[11px] text-[#8B929E] mt-1 space-x-1">
                          {Object.entries(item.selectedAttributes).map(([k, v]) => (
                            <span key={k} className="inline-block bg-[#0A101E] px-1.5 py-0.5 rounded text-[10px] text-[#B7BBC5]">
                              {v}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="font-rajdhani font-bold text-sm text-[#BEF8A1]">
                          {formatPrice(item.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#303746] rounded bg-[#0A101E]">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 hover:text-[#BEF8A1] text-[#8B929E]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#F5F5F7]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 hover:text-[#BEF8A1] text-[#8B929E]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#303746] bg-[#0A101E] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Estimated Total</span>
                  <span className="font-orbitron font-bold text-lg text-[#BEF8A1]">
                    {formatPrice(totalEstimatedPrice)}
                  </span>
                </div>

                <div className="text-[11px] text-[#8B929E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#BEF8A1]" />
                  <span>GST Invoice & Manufacturer Warranty included</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsFormOpen(true);
                    }}
                    className="w-full py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold uppercase tracking-wider text-sm rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all"
                  >
                    <span>Proceed to WhatsApp Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-1.5 text-xs text-[#8B929E] hover:text-red-400 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={(booking) => setCompletedBooking(booking)}
      />

      {/* Booking Success Modal */}
      {completedBooking && (
        <BookingSuccessModal
          booking={completedBooking}
          onClose={() => setCompletedBooking(null)}
        />
      )}
    </>
  );
};
