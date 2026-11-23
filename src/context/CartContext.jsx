import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { analyticsService } from '../services/firebase/analyticsService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_booking_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dc_booking_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    // Generate unique cart item id based on product and variant
    const variantId = selectedVariant?.id || 'base';
    const cartItemId = `${product.id}_${variantId}`;

    const price = selectedVariant?.price || product.basePrice;
    const mrp = selectedVariant?.mrp || product.baseMrp;
    const sku = selectedVariant?.sku || product.sku;
    const stock = selectedVariant ? selectedVariant.stock : product.stock;
    const image = selectedVariant?.images?.[0] || product.images?.[0] || '/favicon.svg';

    if (stock <= 0) {
      toast.error('This product variation is currently out of stock!');
      return false;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        const updatedQty = Math.min(existing.quantity + quantity, stock);
        toast.success(`Updated quantity in booking cart (${updatedQty})`);
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: updatedQty } : item
        );
      } else {
        toast.success(`Added ${product.name} to booking cart!`);
        const newItem = {
          cartItemId,
          productId: product.id,
          productName: product.name,
          brandName: product.brandName,
          slug: product.slug,
          variantId: selectedVariant?.id || null,
          selectedAttributes: selectedVariant?.attributes || {},
          sku,
          price,
          mrp,
          image,
          stock,
          quantity: Math.min(quantity, stock),
        };
        // Track analytics
        analyticsService.trackAddToCart(newItem);
        return [...prev, newItem];
      }
    });

    return true;
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    toast.success('Item removed from booking cart');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const validQty = Math.min(newQty, item.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('dc_booking_cart');
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimatedPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        totalEstimatedPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
