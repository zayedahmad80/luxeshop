'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'fixed', inset: 0,
            background: '#080808',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
          }}>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: '#fff',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>LuxeShop</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              width: '100%', height: '1px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '1px', overflow: 'hidden'
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(to right, #C8902A, #E8B84B)',
                  borderRadius: '1px',
                  width: `${Math.min(progress, 100)}%`,
                  boxShadow: '0 0 8px rgba(200,144,42,0.6)',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.05em',
            }}>
            Curated with intention.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}