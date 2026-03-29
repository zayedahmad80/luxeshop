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
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">The Collection</p>
          <h1 className="font-display text-6xl md:text-7xl italic text-white">All Pieces</h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0 space-y-10">
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-4">Search</p>
            <input
              type="text" placeholder="Search pieces..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-sm placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-4">Category</p>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button onClick={() => setActiveCategory(cat)}
                    className={`text-sm transition-colors duration-200 ${
                      activeCategory === cat ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}>
                    {cat}
                    {activeCategory === cat && <span className="ml-2 text-white/30">—</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-4">
              Max Price — <span className="text-white">${priceMax}</span>
            </p>
            <input type="range" min={50} max={600} step={10}
              value={priceMax} onChange={e => setPriceMax(+e.target.value)}
              className="w-full accent-white"
            />
          </div>

          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-4">Sort By</p>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-3 rounded-sm focus:outline-none">
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <p className="text-white/30 text-xs tracking-[0.1em]">{filtered.length} pieces</p>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-display text-4xl italic text-white/20 mb-4">Nothing found</p>
              <p className="text-white/30 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex items-center justify-center">
      <p className="font-display text-2xl italic text-white/30">Loading...</p>
    </div>}>
      <ShopContent />
    </Suspense>
  );
}