import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${site.name} — Every call answered. Every appointment booked.`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social share card, generated at the edge so it always matches the current
 * phone number and city rather than being a stale exported JPEG.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0D1220 0%, #17203A 62%, #221B27 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <svg width="58" height="48" viewBox="0 0 48 40">
            <path d="M2 34 L14 12 L22 24 L30 8 L46 34 Z" fill="#C98F2E" />
            <path d="M2 34 L14 12 L26 34 Z" fill="#F5B84A" />
            <path d="M30 8 L35 15 L32 16 L30 14 L27.5 16 Z" fill="#F4EFE6" />
          </svg>
          {/* Satori requires an explicit display on any node with >1 child. */}
          <div style={{ display: 'flex', gap: '12px', fontSize: 34, fontWeight: 700 }}>
            <span style={{ color: '#F4EFE6' }}>Rocky Mountain</span>
            <span style={{ color: '#F5B84A' }}>Booking</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: '#F4EFE6',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            Every call answered.
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: '#F5B84A',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            Every appointment booked.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#8A99B8' }}>
          <span>{`24/7 AI phone answering · Built for you in ${site.city}, ${site.state}`}</span>
        </div>
      </div>
    ),
    size,
  );
}
