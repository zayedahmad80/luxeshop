'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import Toast from './Toast';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [toast, setToast] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  const wishlisted = isWishlisted(product.id);

  const tagClass = {
    Bestseller: 'tag-bestseller',
    New: 'tag-new',
    Limited: 'tag-limited',
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
    setToast(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
        <Link
          href={`/shop/${product.id}`}
          className="product-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>

          <div className="product-card-img-wrap">
            <img
              src={hovered ? product.hoverImage : product.image}
              alt={product.name}
            />
            <div className="product-card-overlay" />

            {/* Tag */}
            {product.tag && (
              <span className={tagClass[product.tag]}>{product.tag}</span>
            )}

            {/* Wishlist button */}
<button
  onClick={handleWishlist}
  style={{
    position: 'absolute',
    top: '14px', right: '14px',
    width: '34px', height: '34px',
    borderRadius: '50%',
    background: wishlisted
      ? 'rgba(220, 50, 50, 0.85)'
      : 'rgba(8,8,8,0.55)',
    backdropFilter: 'blur(10px)',
    border: wishlisted
      ? '1px solid rgba(255,100,100,0.4)'
      : '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: wishlisted ? '0.85rem' : '0.8rem',
    color: wishlisted ? '#fff' : 'rgba(255,255,255,0.7)',
    transition: 'all 0.25s ease',
    opacity: hovered || wishlisted ? 1 : 0,
    transform: hovered || wishlisted ? 'scale(1)' : 'scale(0.75)',
    boxShadow: wishlisted ? '0 4px 16px rgba(200,50,50,0.35)' : 'none',
  }}>
  {wishlisted ? '♥' : '♡'}
</button>

            {/* Quick add */}
            <button
              onClick={handleQuickAdd}
              className="product-card-quick">
              Quick Add
            </button>
          </div>

          <p className="product-card-cat">{product.category}</p>
          <h3 className="product-card-name">{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p className="product-card-price">${product.price}</p>
            {wishlisted && (
              <p style={{
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>Saved</p>
            )}
          </div>
        </Link>
      </motion.div>

      <Toast
        message={`${product.name} added to cart`}
        show={toast}
        onClose={() => setToast(false)}
      />
    </>
  );
}