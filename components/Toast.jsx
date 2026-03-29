'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 40, x: '-50%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            zIndex: 9998,
            background: '#fff',
            color: '#080808',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            minWidth: '280px',
          }}>
          <span style={{ fontSize: '1rem' }}>✓</span>
          <p style={{
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 500,
            flex: 1,
          }}>{message}</p>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(0,0,0,0.3)', fontSize: '1rem', lineHeight: 1,
          }}>✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}