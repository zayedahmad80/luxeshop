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
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=90"
            alt="Hero"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#080808]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            variants={fadeUp} custom={0} initial="hidden" animate="show"
            className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-8">
            New Collection — 2025
          </motion.p>
          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="show"
            className="font-display text-6xl md:text-8xl lg:text-[9rem] text-white leading-[0.95] italic mb-8">
            Dress with<br />
            <span className="not-italic font-semibold">Intention.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="show"
            className="text-white/50 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-12">
            Curated luxury for those who understand that true style is never accidental.
          </motion.p>
          <motion.div
            variants={fadeUp} custom={3} initial="hidden" animate="show"
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop"
              className="bg-white text-black text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/90 transition-colors duration-300">
              Shop Collection
            </Link>
            <Link href="/shop?cat=Dresses"
              className="border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-white/70 transition-colors duration-300">
              View Dresses
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {['Crafted with Intention', 'Timeless Design', 'Sustainable Luxury', 'Free Shipping Over $200', 'New Arrivals Weekly', 'Curated for You'].map((text, j) => (
                <span key={j} className="flex items-center gap-8 px-8">
                  <span className="font-display text-lg italic text-white/20">{text}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-16">
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Handpicked</p>
            <h2 className="font-display text-5xl md:text-6xl italic text-white">Featured Pieces</h2>
          </div>
          <Link href="/shop" className="text-white/50 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors hidden md:block">
            View All →
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 max-w-7xl mx-auto pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-12">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Shop by category</p>
          <h2 className="font-display text-5xl md:text-6xl italic text-white">Collections</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Outerwear', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85' },
            { label: 'Dresses', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85' },
            { label: 'Tops', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85' },
          ].map((cat, i) => (
            <motion.div key={cat.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <Link href={`/shop?cat=${cat.label}`} className="group relative block overflow-hidden aspect-[4/5] bg-zinc-900">
                <img src={cat.img} alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-2">Category</p>
                  <h3 className="font-display text-3xl italic text-white">{cat.label}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="border-t border-white/5 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85"
              alt="Brand story"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}>
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-6">Our Philosophy</p>
            <h2 className="font-display text-5xl md:text-6xl italic text-white leading-tight mb-8">
              Fashion is the armor to survive everyday life.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              We believe in pieces that last — not just seasons, but decades. Each item in our collection is sourced from ateliers that share our commitment to craft, sustainability, and quiet luxury.
            </p>
            <p className="text-white/30 text-sm leading-relaxed mb-10">
              No logos. No noise. Just exceptional materials and timeless silhouettes that let you do the talking.
            </p>
            <Link href="/shop"
              className="inline-block border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-white/60 transition-colors duration-300">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-20">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">What they say</p>
          <h2 className="font-display text-5xl italic text-white">Our Community</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Amara L.', text: 'The Obsidian coat is the single best purchase I have made in ten years of fashion. I wear it every single day.', rating: 5 },
            { name: 'Sofia K.', text: 'Finally a brand that understands quiet luxury. Every piece feels intentional. Nothing feels disposable.', rating: 5 },
            { name: 'Mei T.', text: 'The satin dress made me feel like I was wearing art. The quality is extraordinary for the price.', rating: 5 },
          ].map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
              className="border border-white/8 p-8 rounded-sm">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-white/60 text-xs">★</span>
                ))}
              </div>
              <p className="font-display text-xl italic text-white/80 leading-relaxed mb-8">"{t.text}"</p>
              <p className="text-white/30 text-xs tracking-[0.15em] uppercase">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}