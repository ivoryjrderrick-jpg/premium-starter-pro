
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Acme — Premium Starter Pro';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0B0B0C 0%, #111827 100%)',
          color: 'white',
          letterSpacing: -1
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800 }}>Premium Starter Pro</div>
        <div style={{ fontSize: 24, opacity: 0.9 }}>Next.js • Tailwind • Motion • Stripe</div>
      </div>
    ),
    size
  );
}
