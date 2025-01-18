'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserCart } from '@/lib/data';

interface CartContextType {
  totalItems: number;
  updateCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  totalItems: 0,
  updateCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [totalItems, setTotalItems] = useState(0);

  const updateCart = async () => {
    try {
      const cart = await getUserCart();
      setTotalItems(cart.data?.items.length || 0);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ totalItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}