'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { products } from '../../../data/products';
import { useCart } from '../../../components/CartContext';
import ProductCard from '../../../components/ProductCard';
import Link from 'next/link';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p className="section-heading" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.15)', marginBottom: '24px' }}>
          Product not found
        </p>
        <Link href="/shop" className="btn-outline">Back to Shop</Link>
      </div>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container">

        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '56px',
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase'
        }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.25)', transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" style={{ color: 'rgba(255,255,255,0.25)', transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>
            Shop
          </Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{product.name}</span>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '80px', marginBottom: '120px', alignItems: 'start'
        }}>

          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <div style={{
              aspectRatio: '3/4', overflow: 'hidden',
              background: '#111', marginBottom: '12px'
            }}>
              <img src={product.gallery[activeImg]} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.6s ease' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {product.gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{
                    aspectRatio: '1', overflow: 'hidden', cursor: 'pointer',
                    border: `1px solid ${activeImg === i ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    background: 'none', padding: 0,
                    transition: 'border-color 0.2s',
                  }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
            style={{ paddingTop: '16px' }}>
            <p style={{
              color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px'
            }}>{product.category}</p>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontStyle: 'italic', color: '#fff',
              lineHeight: 1.1, marginBottom: '16px',
            }}>{product.name}</h1>

            <p style={{
              fontSize: '1.4rem', color: 'rgba(255,255,255,0.5)',
              marginBottom: '40px', fontWeight: 300,
            }}>${product.price}</p>

            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '32px' }} />

            <p style={{
              color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem',
              lineHeight: '1.9', marginBottom: '40px'
            }}>{product.description}</p>

            {/* Colors */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{
                color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px'
              }}>
                Color {selectedColor && <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '8px' }}>— {selectedColor}</span>}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '8px 18px',
                      border: `1px solid ${selectedColor === color ? '#fff' : 'rgba(255,255,255,0.12)'}`,
                      background: selectedColor === color ? 'rgba(255,255,255,0.06)' : 'transparent',
                      color: selectedColor === color ? '#fff' : 'rgba(255,255,255,0.4)',
                      fontSize: '0.78rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px'
              }}>
                Size {selectedSize && <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '8px' }}>— {selectedSize}</span>}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    style={{
                      width: '48px', height: '48px',
                      border: `1px solid ${selectedSize === size ? '#fff' : 'rgba(255,255,255,0.12)'}`,
                      background: selectedSize === size ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: selectedSize === size ? '#fff' : 'rgba(255,255,255,0.4)',
                      fontSize: '0.8rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              style={{
                width: '100%', padding: '18px',
                fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                cursor: !selectedSize || !selectedColor ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                border: added ? '1px solid rgba(255,255,255,0.2)' : 'none',
                background: added
                  ? 'rgba(255,255,255,0.1)'
                  : !selectedSize || !selectedColor
                  ? 'rgba(255,255,255,0.06)'
                  : '#fff',
                color: added
                  ? '#fff'
                  : !selectedSize || !selectedColor
                  ? 'rgba(255,255,255,0.2)'
                  : '#080808',
                fontWeight: 500,
              }}>
              {added ? '✓ Added to Cart'
                : !selectedSize || !selectedColor
                ? 'Select Size & Color'
                : 'Add to Cart'}
            </button>

            {/* Details */}
            <div style={{
              marginTop: '48px', paddingTop: '48px',
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px'
              }}>Details</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {product.details.map((d, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: '12px',
                    color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.15)', marginTop: '2px' }}>—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '64px', marginBottom: '48px'
            }}>
              <span className="section-eyebrow">You may also like</span>
              <h2 className="section-heading" style={{ fontStyle: 'italic' }}>Related Pieces</h2>
            </div>
            <div className="products-grid">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}