'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../components/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) return;
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md">
        <p className="text-white/20 text-5xl mb-8">✓</p>
        <h1 className="font-display text-5xl italic text-white mb-6">Order Confirmed</h1>
        <p className="text-white/50 text-sm leading-relaxed mb-10">
          Thank you. Your order has been placed and will be dispatched within 2–3 business days.
        </p>
        <Link href="/shop"
          className="inline-block border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-white/50 transition-colors">
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="text-center">
        <p className="font-display text-6xl italic text-white/10 mb-6">Empty</p>
        <h1 className="font-display text-4xl italic text-white mb-4">Your cart is empty</h1>
        <p className="text-white/40 text-sm mb-10">Nothing has been added yet.</p>
        <Link href="/shop"
          className="inline-block bg-white text-black text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/90 transition-colors">
          Browse Collection
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Your Selection</p>
          <h1 className="font-display text-6xl italic text-white">Shopping Cart</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Cart Items */}
          <div className="lg:col-span-3 space-y-0">
            <div className="border-b border-white/8 pb-4 mb-6 hidden md:grid grid-cols-4 gap-4">
              {['Product', 'Size / Color', 'Qty', 'Total'].map(h => (
                <p key={h} className="text-white/25 text-[10px] tracking-[0.15em] uppercase">{h}</p>
              ))}
            </div>

            <AnimatePresence>
              {cart.map(item => (
                <motion.div key={`${item.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 border-b border-white/5 items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">{item.name}</p>
                      <p className="text-white/40 text-xs">${item.price}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">{item.size} · {item.color}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                      className="w-7 h-7 border border-white/15 text-white/50 hover:border-white/40 hover:text-white text-sm transition-colors">
                      −
                    </button>
                    <span className="text-white text-sm w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                      className="w-7 h-7 border border-white/15 text-white/50 hover:border-white/40 hover:text-white text-sm transition-colors">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm">${(item.price * item.qty).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-white/20 hover:text-white/60 text-xs tracking-widest uppercase transition-colors">
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary + Form */}
          <div className="lg:col-span-2">
            <div className="border border-white/8 p-8 mb-8">
              <h2 className="font-display text-2xl italic text-white mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Shipping</span>
                  <span className="text-white">{total >= 200 ? 'Free' : '$12.00'}</span>
                </div>
                <div className="border-t border-white/8 pt-4 flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-white font-medium">
                    ${(total >= 200 ? total : total + 12).toFixed(2)}
                  </span>
                </div>
              </div>
              {total < 200 && (
                <p className="text-white/30 text-xs">
                  Add ${(200 - total).toFixed(0)} more for free shipping
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-xl italic text-white mb-6">Delivery Details</h3>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your name' },
                { key: 'email', label: 'Email', placeholder: 'your@email.com' },
                { key: 'address', label: 'Address', placeholder: 'Street, City, Postcode' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-white/30 text-[10px] tracking-[0.15em] uppercase block mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 placeholder:text-white/20 transition-colors"
                  />
                </div>
              ))}
              <button type="submit"
                className="w-full bg-white text-black text-xs tracking-[0.25em] uppercase py-5 mt-4 hover:bg-white/90 transition-colors">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}