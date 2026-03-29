'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, color) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size && i.color === color
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, size, color, qty: 1 }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCart(prev => prev.filter(
      i => !(i.id === id && i.size === size && i.color === color)
    ));
  };

  const updateQty = (id, size, color, qty) => {
    if (qty < 1) return removeFromCart(id, size, color);
    setCart(prev => prev.map(i =>
      i.id === id && i.size === size && i.color === color
        ? { ...i, qty }
        : i
    ));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);