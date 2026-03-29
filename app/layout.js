'use client';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../components/CartContext';
import { WishlistProvider } from '../components/WishlistContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body style={{ background: '#080808', color: '#fff', overflowX: 'hidden' }}>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}>
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}