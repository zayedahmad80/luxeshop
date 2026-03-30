'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageZoom({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      {/* Main image */}
      <div
        onClick={() => setZoomed(true)}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'zoom-in',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            display: 'block',
          }}
        />

        {/* Zoom hint */}
        <div style={{
          position: 'absolute',
          bottom: '14px', right: '14px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <svg width="11" height="11" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path strokeLinecap="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
          <span style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.58rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>Zoom</span>
        </div>
      </div>

      {/* Fullscreen zoom */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoomed(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(12px)',
              zIndex: 99990,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '40px',
            }}>

            <motion.img
              src={src}
              alt={alt}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '85vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                cursor: 'default',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              }}
            />

            {/* Close */}
            <button
              onClick={() => setZoomed(false)}
              style={{
                position: 'fixed',
                top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
                width: '44px', height: '44px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                borderRadius: '50%',
                transition: 'all 0.2s',
                zIndex: 99991,
              }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}