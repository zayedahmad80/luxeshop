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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', maxWidth: '480px' }}>
        <p style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.15)', marginBottom: '32px' }}>✓</p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontStyle: 'italic', color: '#fff', marginBottom: '24px'
        }}>Order Confirmed</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', lineHeight: '1.9', marginBottom: '48px' }}>
          Thank you. Your order has been placed and will be dispatched within 2–3 business days. A confirmation will be sent to your email.
        </p>
        <Link href="/shop" className="btn-outline">Continue Shopping</Link>
      </motion.div>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontStyle: 'italic', color: 'rgba(255,255,255,0.06)', marginBottom: '24px', lineHeight: 1
        }}>Empty</p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontStyle: 'italic', color: '#fff', marginBottom: '16px'
        }}>Your cart is empty</h1>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', marginBottom: '48px' }}>
          Nothing has been added yet.
        </p>
        <Link href="/shop" className="btn-primary">Browse Collection</Link>
      </motion.div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '64px' }}>
          <span className="section-eyebrow">Your Selection</span>
          <h1 className="section-heading" style={{ fontStyle: 'italic', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
            Shopping Cart
          </h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Cart Items */}
          <div>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '16px', paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '8px',
            }}>
              {['Product', 'Size / Color', 'Qty', 'Total'].map(h => (
                <p key={h} style={{
                  color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase'
                }}>{h}</p>
              ))}
            </div>

            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '16px', padding: '28px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    alignItems: 'center',
                  }}>

                  {/* Product */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={item.image} alt={item.name}
                      style={{ width: '72px', height: '88px', objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#fff', fontSize: '0.88rem', marginBottom: '6px' }}>{item.name}</p>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>${item.price}</p>
                      <button onClick={() => removeFromCart(item.id, item.size, item.color)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          padding: '4px 0', marginTop: '8px', transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Size/Color */}
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                    {item.size} · {item.color}
                  </p>

                  {/* Qty */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                      style={{
                        width: '28px', height: '28px', background: 'none',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                        fontSize: '1rem', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>−</button>
                    <span style={{ color: '#fff', fontSize: '0.88rem', minWidth: '16px', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                      style={{
                        width: '28px', height: '28px', background: 'none',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                        fontSize: '1rem', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>+</button>
                  </div>

                  {/* Total */}
                  <p style={{ color: '#fff', fontSize: '0.88rem' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary + Form */}
          <div style={{ position: 'sticky', top: '120px' }}>

            {/* Summary */}
            <div style={{
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '36px', marginBottom: '24px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                fontStyle: 'italic', color: '#fff', marginBottom: '32px'
              }}>Order Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>Subtotal</span>
                  <span style={{ color: '#fff', fontSize: '0.85rem' }}>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>Shipping</span>
                  <span style={{ color: '#fff', fontSize: '0.85rem' }}>
                    {total >= 200 ? 'Free' : '$12.00'}
                  </span>
                </div>
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  paddingTop: '20px',
                  display: 'flex', justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>Total</span>
                  <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>
                    ${(total >= 200 ? total : total + 12).toFixed(2)}
                  </span>
                </div>
              </div>

              {total < 200 && (
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                  Add ${(200 - total).toFixed(0)} more for free shipping
                </p>
              )}
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                fontStyle: 'italic', color: '#fff', marginBottom: '24px'
              }}>Delivery Details</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your name' },
                  { key: 'email', label: 'Email', placeholder: 'your@email.com' },
                  { key: 'address', label: 'Address', placeholder: 'Street, City, Postcode' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{
                      color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      display: 'block', marginBottom: '8px'
                    }}>{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn-primary"
                style={{ width: '100%', textAlign: 'center', padding: '18px' }}>
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}