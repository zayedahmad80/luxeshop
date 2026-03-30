'use client';
import { motion, AnimatePresence } from 'framer-motion';

const sizeData = [
  { size: 'XS', bust: '32"', waist: '24"', hips: '34"', uk: '6', eu: '34' },
  { size: 'S',  bust: '34"', waist: '26"', hips: '36"', uk: '8', eu: '36' },
  { size: 'M',  bust: '36"', waist: '28"', hips: '38"', uk: '10', eu: '38' },
  { size: 'L',  bust: '38"', waist: '30"', hips: '40"', uk: '12', eu: '40' },
  { size: 'XL', bust: '40"', waist: '32"', hips: '42"', uk: '14', eu: '42' },
];

export default function SizeGuide({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 9990,
              cursor: 'pointer',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9991,
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '48px',
              width: '90%',
              maxWidth: '580px',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}>

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'flex-start',
              justifyContent: 'space-between', marginBottom: '36px'
            }}>
              <div>
                <p style={{
                  color: 'rgba(255,255,255,0.35)', fontSize: '0.62rem',
                  letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px'
                }}>Sizing</p>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: '2rem',
                  fontStyle: 'italic', color: '#fff'
                }}>Size Guide</h2>
              </div>
              <button onClick={onClose} style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', transition: 'all 0.2s',
                flexShrink: 0,
              }}>✕</button>
            </div>

            {/* Tip */}
            <div style={{
              background: 'rgba(200,144,42,0.08)',
              border: '1px solid rgba(200,144,42,0.15)',
              padding: '16px 20px', marginBottom: '32px',
            }}>
              <p style={{
                color: 'rgba(200,144,42,0.9)', fontSize: '0.78rem', lineHeight: '1.7'
              }}>
                💡 For the best fit, measure over your undergarments. If between sizes, we recommend sizing up.
              </p>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Size', 'Bust', 'Waist', 'Hips', 'UK', 'EU'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        textAlign: 'left',
                        fontWeight: 400,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row, i) => (
                    <tr key={row.size} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      transition: 'background 0.2s',
                    }}>
                      {[row.size, row.bust, row.waist, row.hips, row.uk, row.eu].map((val, j) => (
                        <td key={j} style={{
                          padding: '14px 16px',
                          color: j === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
                          fontSize: j === 0 ? '0.88rem' : '0.82rem',
                          fontWeight: j === 0 ? 500 : 400,
                        }}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to measure */}
            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{
                color: 'rgba(255,255,255,0.35)', fontSize: '0.62rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px'
              }}>How to measure</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['Bust', 'Measure around the fullest part of your chest.'],
                  ['Waist', 'Measure around the narrowest part of your torso.'],
                  ['Hips', 'Measure around the fullest part of your hips.'],
                ].map(([label, desc]) => (
                  <div key={label} style={{ display: 'flex', gap: '12px' }}>
                    <span style={{
                      color: '#C8902A', fontSize: '0.72rem',
                      minWidth: '48px', fontWeight: 500,
                    }}>{label}</span>
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: '1.6' }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}