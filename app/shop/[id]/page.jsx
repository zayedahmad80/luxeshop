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
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <p className="font-display text-5xl italic text-white/20 mb-4">Product not found</p>
        <Link href="/shop" className="text-white/50 hover:text-white text-sm underline">Back to shop</Link>
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
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12 text-white/30 text-xs tracking-[0.1em] uppercase">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">

          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <div className="aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
              <img src={product.gallery[activeImg]} alt={product.name}
                className="w-full h-full object-cover transition-all duration-700" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden border transition-colors duration-200 ${
                    activeImg === i ? 'border-white/60' : 'border-white/10 hover:border-white/30'
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
            className="flex flex-col justify-center">
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-4">{product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl italic text-white mb-2">{product.name}</h1>
            <p className="text-white/60 text-2xl mb-8">${product.price}</p>

            <div className="w-12 h-px bg-white/20 mb-8" />

            <p className="text-white/50 text-sm leading-relaxed mb-10">{product.description}</p>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-4">
                Color {selectedColor && <span className="text-white/60 ml-2">— {selectedColor}</span>}
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`text-xs px-4 py-2 border transition-colors duration-200 ${
                      selectedColor === color
                        ? 'border-white text-white'
                        : 'border-white/15 text-white/40 hover:border-white/40'
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-4">
                Size {selectedSize && <span className="text-white/60 ml-2">— {selectedSize}</span>}
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-sm border transition-colors duration-200 ${
                      selectedSize === size
                        ? 'border-white text-white bg-white/10'
                        : 'border-white/15 text-white/40 hover:border-white/40'
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`w-full py-5 text-xs tracking-[0.25em] uppercase transition-all duration-300 ${
                added
                  ? 'bg-white/20 text-white border border-white/20'
                  : !selectedSize || !selectedColor
                  ? 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-white/90'
              }`}>
              {added ? '✓ Added to Cart' : !selectedSize || !selectedColor ? 'Select Size & Color' : 'Add to Cart'}
            </button>

            {/* Details */}
            <div className="mt-12 pt-12 border-t border-white/8">
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-6">Details</p>
              <ul className="space-y-3">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                    <span className="text-white/20 mt-1">—</span>
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
            <div className="border-t border-white/5 pt-16 mb-12">
              <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">You may also like</p>
              <h2 className="font-display text-4xl italic text-white">Related Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}