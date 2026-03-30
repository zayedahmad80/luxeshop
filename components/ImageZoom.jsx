'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageZoom({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <>
      {/* Main image with zoom cursor */}
      <div
        ref={imgRef}
        onClick={() => setZoomed(true)}
        onMouseMove={handleMouseMove}
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
          }}
        />

        {/* Zoom hint */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path strokeLinecap="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
          <span style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>Zoom</span>
        </div>
      </div>

      {/* Fullscreen zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setZoomed(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(12px)',
                zIndex: 9990,
                cursor: 'zoom-out',
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setZoomed(false)}
              style={{
                position: 'fixed',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9991,
                width: '90vw',
                maxWidth: '800px',
                maxHeight: '90vh',
                cursor: 'zoom-out',
                overflow: 'hidden',
              }}>
              <img
                src={src}
                alt={alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxHeight: '90vh',
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setZoomed(false)}
                style={{
                  position: 'absolute',
                  top: '16px', right: '16px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  width: '40px', height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                }}>✕</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}