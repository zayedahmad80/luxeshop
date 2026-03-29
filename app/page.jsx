'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }
  }),
};

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=90"
          alt="Hero" className="hero-bg-img"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.span
            variants={fadeUp} custom={0} initial="hidden" animate="show"
            className="hero-tagline">
            New Collection — 2025
          </motion.span>
          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="show"
            className="hero-title">
            <em>Dress with</em><br />
            <span style={{ fontStyle: 'normal', fontWeight: 600 }}>Intention.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="show"
            className="hero-subtitle">
            Curated luxury for those who understand that true style is never accidental.
          </motion.p>
          <motion.div
            variants={fadeUp} custom={3} initial="hidden" animate="show"
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn-primary">Shop Collection</Link>
            <Link href="/shop?cat=Dresses" className="btn-outline">View Dresses</Link>
          </motion.div>
        </div>
        <div className="scroll-hint">
          <span className="scroll-hint-text">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="scroll-hint-line" />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee-section">
        <div className="animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {['Crafted with Intention', 'Timeless Design', 'Sustainable Luxury', 'Free Shipping Over $200', 'New Arrivals Weekly', 'Curated for You'].map((text, j) => (
                <span key={j} className="marquee-item">
                  {text}
                  <span className="marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section-pad">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px' }}>
            <div>
              <span className="section-eyebrow">Handpicked</span>
              <h2 className="section-heading" style={{ fontStyle: 'italic' }}>Featured Pieces</h2>
            </div>
            <Link href="/shop" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
              View All →
            </Link>
          </motion.div>
          <div className="products-grid">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section-pad-sm">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ marginBottom: '48px' }}>
            <span className="section-eyebrow">Shop by category</span>
            <h2 className="section-heading" style={{ fontStyle: 'italic' }}>Collections</h2>
          </motion.div>
          <div className="categories-grid">
            {[
              { label: 'Outerwear', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85' },
              { label: 'Dresses', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85' },
              { label: 'Tops', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85' },
            ].map((cat, i) => (
              <motion.div key={cat.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <Link href={`/shop?cat=${cat.label}`} className="cat-card">
                  <img src={cat.img} alt={cat.label} />
                  <div className="cat-overlay" />
                  <div className="cat-label">
                    <p className="cat-label-eyebrow">Category</p>
                    <h3 className="cat-label-name">{cat.label}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="section-pad" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div className="story-grid">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1 }}>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85"
                alt="Brand story"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="section-eyebrow">Our Philosophy</span>
              <h2 className="section-heading" style={{ fontStyle: 'italic', marginBottom: '32px' }}>
                Fashion is the armor to survive everyday life.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: '1.9', marginBottom: '20px' }}>
                We believe in pieces that last — not just seasons, but decades. Each item in our collection is sourced from ateliers that share our commitment to craft, sustainability, and quiet luxury.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem', lineHeight: '1.9', marginBottom: '48px' }}>
                No logos. No noise. Just exceptional materials and timeless silhouettes that let you do the talking.
              </p>
              <Link href="/shop" className="btn-outline" style={{ alignSelf: 'flex-start' }}>
                Explore Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-pad">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="section-eyebrow">What they say</span>
            <h2 className="section-heading" style={{ fontStyle: 'italic' }}>Our Community</h2>
          </motion.div>
          <div className="testimonials-grid">
            {[
              { name: 'Amara L.', text: 'The Obsidian coat is the single best purchase I have made in ten years of fashion. I wear it every single day.' },
              { name: 'Sofia K.', text: 'Finally a brand that understands quiet luxury. Every piece feels intentional. Nothing feels disposable.' },
              { name: 'Mei T.', text: 'The satin dress made me feel like I was wearing art. The quality is extraordinary for the price.' },
            ].map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                className="testimonial-card">
                <p className="testimonial-stars">★ ★ ★ ★ ★</p>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-author">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}