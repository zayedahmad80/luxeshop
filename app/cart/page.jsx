'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../components/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [form, setForm] = useState({
    name: '', address: '', city: '',
    postcode: '', phone: '', country: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.postcode.trim()) e.postcode = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.country.trim()) e.country = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    clearCart();
    setStep('success');
  };

  // ── Success page ──
  if (step === 'success') return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 24px', background: '#080808'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', maxWidth: '520px' }}>

        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
          style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 40px',
            fontSize: '1.8rem', color: 'rgba(255,255,255,0.6)'
          }}>
          ✓
        </motion.div>

        <p style={{
          fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)', marginBottom: '20px'
        }}>Order Confirmed</p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontStyle: 'italic', color: '#fff',
          lineHeight: 1.1, marginBottom: '24px'
        }}>Thank You,<br />{form.name.split(' ')[0]}.</h1>

        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem',
          lineHeight: '1.9', marginBottom: '12px'
        }}>
          Your order has been placed successfully.
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem',
          lineHeight: '1.9', marginBottom: '48px'
        }}>
          We'll dispatch your items to <em>{form.address}, {form.city}</em> within 2–3 business days.
          A confirmation will be sent to your phone.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </motion.div>
    </div>
  );

  // ── Empty cart ──
  if (cart.length === 0 && step === 'cart') return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '0 24px'
    }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontStyle: 'italic', color: 'rgba(255,255,255,0.05)',
          marginBottom: '24px', lineHeight: 1
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

  const shipping = total >= 200 ? 0 : 12;
  const grandTotal = total + shipping;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '48px' }}>
          <span className="section-eyebrow">
            {step === 'cart' ? 'Your Selection' : 'Checkout'}
          </span>
          <h1 className="section-heading" style={{
            fontStyle: 'italic', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)'
          }}>
            {step === 'cart' ? 'Shopping Cart' : 'Delivery Details'}
          </h1>
        </motion.div>

        {/* Step indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '56px'
        }}>
          {['Cart', 'Checkout'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                opacity: (step === 'cart' && i === 0) || (step === 'checkout' && i === 1) ? 1 : 0.3
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)',
                  background: (step === 'cart' && i === 0) || (step === 'checkout' && i === 1)
                    ? 'rgba(255,255,255,0.08)' : 'transparent'
                }}>{i + 1}</div>
                <span style={{
                  fontSize: '0.68rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)'
                }}>{s}</span>
              </div>
              {i === 0 && (
                <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── CART STEP ── */}
        {step === 'cart' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '64px', alignItems: 'start'
          }}>
            {/* Items */}
            <div>
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: '16px', paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px'
              }}>
                {['Product', 'Size / Color', 'Qty', 'Total'].map(h => (
                  <p key={h} style={{
                    color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase'
                  }}>{h}</p>
                ))}
              </div>

              <AnimatePresence>
                {cart.map(item => (
                  <motion.div key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
                    style={{
                      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      gap: '16px', padding: '24px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      alignItems: 'center'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={item.image} alt={item.name}
                        style={{ width: '64px', height: '80px', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <p style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '4px' }}>{item.name}</p>
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginBottom: '8px' }}>${item.price}</p>
                        <button onClick={() => removeFromCart(item.id, item.size, item.color)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0
                          }}>Remove</button>
                      </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                      {item.size} · {item.color}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)}
                        style={{
                          width: '26px', height: '26px', background: 'none',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1rem'
                        }}>−</button>
                      <span style={{ color: '#fff', fontSize: '0.85rem', minWidth: '14px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)}
                        style={{
                          width: '26px', height: '26px', background: 'none',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1rem'
                        }}>+</button>
                    </div>
                    <p style={{ color: '#fff', fontSize: '0.85rem' }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '32px', marginBottom: '16px'
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                  fontStyle: 'italic', color: '#fff', marginBottom: '28px'
                }}>Order Summary</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.83rem' }}>Subtotal</span>
                    <span style={{ color: '#fff', fontSize: '0.83rem' }}>${total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.83rem' }}>Shipping</span>
                    <span style={{ color: '#fff', fontSize: '0.83rem' }}>{shipping === 0 ? 'Free' : `$${shipping}.00`}</span>
                  </div>
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '16px', display: 'flex', justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.88rem' }}>Total</span>
                    <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.88rem' }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', marginBottom: '20px' }}>
                    Add ${(200 - total).toFixed(0)} more for free shipping
                  </p>
                )}
              </div>

              {/* Proceed button */}
              <button
                onClick={() => setStep('checkout')}
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center', padding: '18px', cursor: 'pointer', border: 'none' }}>
                Proceed to Checkout →
              </button>

              <Link href="/shop" style={{
                display: 'block', textAlign: 'center', marginTop: '16px',
                color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem',
                letterSpacing: '0.12em', textTransform: 'uppercase'
              }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* ── CHECKOUT STEP ── */}
        {step === 'checkout' && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr',
            gap: '64px', alignItems: 'start'
          }}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>

                {/* Full Name */}
                <div>
                  <label style={{
                    color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    display: 'block', marginBottom: '8px'
                  }}>Full Name *</label>
                  <input
                    type="text" placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="form-input"
                    style={{ borderColor: errors.name ? 'rgba(200,50,50,0.5)' : undefined }}
                  />
                  {errors.name && <p style={{ color: 'rgba(200,80,80,0.8)', fontSize: '0.72rem', marginTop: '6px' }}>{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label style={{
                    color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    display: 'block', marginBottom: '8px'
                  }}>Phone Number *</label>
                  <input
                    type="tel" placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="form-input"
                    style={{ borderColor: errors.phone ? 'rgba(200,50,50,0.5)' : undefined }}
                  />
                  {errors.phone && <p style={{ color: 'rgba(200,80,80,0.8)', fontSize: '0.72rem', marginTop: '6px' }}>{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <label style={{
                    color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    display: 'block', marginBottom: '8px'
                  }}>Street Address *</label>
                  <input
                    type="text" placeholder="123 Street Name"
                    value={form.address}
                    onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                    className="form-input"
                    style={{ borderColor: errors.address ? 'rgba(200,50,50,0.5)' : undefined }}
                  />
                  {errors.address && <p style={{ color: 'rgba(200,80,80,0.8)', fontSize: '0.72rem', marginTop: '6px' }}>{errors.address}</p>}
                </div>

                {/* City + Postcode */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{
                      color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      display: 'block', marginBottom: '8px'
                    }}>City *</label>
                    <input
                      type="text" placeholder="New York"
                      value={form.city}
                      onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                      className="form-input"
                      style={{ borderColor: errors.city ? 'rgba(200,50,50,0.5)' : undefined }}
                    />
                    {errors.city && <p style={{ color: 'rgba(200,80,80,0.8)', fontSize: '0.72rem', marginTop: '6px' }}>{errors.city}</p>}
                  </div>
                  <div>
                    <label style={{
                      color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      display: 'block', marginBottom: '8px'
                    }}>Postcode *</label>
                    <input
                      type="text" placeholder="10001"
                      value={form.postcode}
                      onChange={e => setForm(p => ({ ...p, postcode: e.target.value }))}
                      className="form-input"
                      style={{ borderColor: errors.postcode ? 'rgba(200,50,50,0.5)' : undefined }}
                    />
                    {errors.postcode && <p style={{ color: 'rgba(200,80,80,0.8)', fontSize: '0.72rem', marginTop: '6px' }}>{errors.postcode}</p>}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label style={{
                    color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    display: 'block', marginBottom: '8px'
                  }}>Country *</label>
                  <input
                    type="text" placeholder="United States"
                    value={form.country}
                    onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                    className="form-input"
                    style={{ borderColor: errors.country ? 'rgba(200,50,50,0.5)' : undefined }}
                  />
                  {errors.country && <p style={{ color: 'rgba(200,80,80,0.8)', fontSize: '0.72rem', marginTop: '6px' }}>{errors.country}</p>}
                </div>
              </div>

              <button type="submit" className="btn-primary"
                style={{ width: '100%', textAlign: 'center', padding: '18px', cursor: 'pointer', border: 'none' }}>
                Place Order — ${grandTotal.toFixed(2)}
              </button>

              <button type="button" onClick={() => setStep('cart')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'block', textAlign: 'center', marginTop: '16px', width: '100%',
                  color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase'
                }}>
                ← Back to Cart
              </button>
            </form>

            {/* Order summary sidebar */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.07)', padding: '32px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                  fontStyle: 'italic', color: '#fff', marginBottom: '24px'
                }}>Your Order</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} style={{
                      display: 'flex', gap: '12px', alignItems: 'center'
                    }}>
                      <img src={item.image} alt={item.name}
                        style={{ width: '48px', height: '60px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ color: '#fff', fontSize: '0.8rem', marginBottom: '3px' }}>{item.name}</p>
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem' }}>
                          {item.size} · {item.color} · x{item.qty}
                        </p>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>Subtotal</span>
                    <span style={{ color: '#fff', fontSize: '0.8rem' }}>${total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>Shipping</span>
                    <span style={{ color: '#fff', fontSize: '0.8rem' }}>{shipping === 0 ? 'Free' : `$${shipping}.00`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fff', fontWeight: 500 }}>Total</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}