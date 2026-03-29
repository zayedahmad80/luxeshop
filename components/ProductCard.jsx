'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  const tagColors = {
    Bestseller: 'bg-white/10 text-white/70',
    New: 'bg-white text-black',
    Limited: 'bg-amber-900/40 text-amber-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
      <Link href={`/shop/${product.id}`} className="group block">
        <div
          className="relative overflow-hidden aspect-[3/4] bg-zinc-900 rounded-sm mb-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          <img
            src={hovered ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

          {product.tag && (
            <span className={`absolute top-4 left-4 text-[10px] tracking-[0.12em] uppercase px-3 py-1 rounded-full ${tagColors[product.tag]}`}>
              {product.tag}
            </span>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 left-4 right-4">
            <div className="bg-white text-black text-xs tracking-[0.15em] uppercase text-center py-3 rounded-sm font-medium">
              Quick View
            </div>
          </motion.div>
        </div>

        <div className="space-y-1">
          <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase">{product.category}</p>
          <h3 className="font-display text-white text-lg italic group-hover:text-white/70 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}