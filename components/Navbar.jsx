'use client';
import Link from 'next/link';
import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          color: '#fff',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          LuxeShop
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="nav-links-desktop">
          {[['/', 'Home'], ['/shop', 'Shop'], ['/shop?cat=Outerwear', 'Outerwear'], ['/shop?cat=Dresses', 'Dresses']].map(([href, label]) => (
            <Link key={href} href={href} style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/cart" style={{ position: 'relative' }}>
            <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: '-8px', right: '-8px',
                  width: '16px', height: '16px',
                  background: '#fff', color: '#080808',
                  fontSize: '9px', fontWeight: 700,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {itemCount}
              </motion.span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'none' }}
            className="hamburger-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: '#080808',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '40px',
            }}>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Cart']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  color: 'rgba(255,255,255,0.8)',
                  fontStyle: 'italic',
                }}>
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}