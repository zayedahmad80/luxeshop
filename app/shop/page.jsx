'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { products, categories } from '../../data/products';
import ProductCard from '../../components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceMax, setPriceMax] = useState(600);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && categories.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  let filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = p.price <= priceMax;
    return matchCat && matchSearch && matchPrice;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '64px' }}>
          <span className="section-eyebrow">The Collection</span>
          <h1 className="section-heading" style={{ fontStyle: 'italic', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
            All Pieces
          </h1>
        </motion.div>

        <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <aside style={{ width: '200px', flexShrink: 0, position: 'sticky', top: '100px' }}>

            {/* Search */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px'
              }}>Search</p>
              <input
                type="text" placeholder="Search pieces..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="form-input"
                style={{ borderRadius: 0 }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px'
              }}>Category</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.35)',
                        fontSize: '0.85rem', padding: 0,
                        transition: 'color 0.2s',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                      {cat}
                      {activeCategory === cat && (
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>—</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px'
              }}>
                Max Price — <span style={{ color: 'rgba(255,255,255,0.6)' }}>${priceMax}</span>
              </p>
              <input
                type="range" min={50} max={600} step={10}
                value={priceMax} onChange={e => setPriceMax(+e.target.value)}
                style={{ width: '100%', accentColor: '#fff' }}
              />
            </div>

            {/* Sort */}
            <div>
              <p style={{
                color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px'
              }}>Sort By</p>
              <select
                value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="form-input"
                style={{ borderRadius: 0 }}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            <p style={{
              color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem',
              letterSpacing: '0.1em', marginBottom: '32px'
            }}>
              {filtered.length} pieces
            </p>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <p className="section-heading" style={{
                  fontStyle: 'italic', color: 'rgba(255,255,255,0.1)',
                  marginBottom: '16px'
                }}>Nothing found</p>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="products-grid-3">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="section-heading" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.2)' }}>
          Loading...
        </p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}