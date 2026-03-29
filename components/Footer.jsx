'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      paddingTop: '80px',
    }}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: '#fff',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 600,
            }}>LuxeShop</p>
            <p style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.85rem',
              lineHeight: '1.9',
              maxWidth: '280px',
            }}>
              Curated luxury for those who understand that true style is never accidental.
            </p>
          </div>

          <div>
            <p style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}>Navigate</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Cart']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.85rem',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}>Follow</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Instagram', 'Pinterest', 'TikTok'].map(s => (
                <li key={s}>
                  <span style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: '40px',
          paddingBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            © 2025 LuxeShop. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}