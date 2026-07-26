/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1220',
          // Lifted surfaces for cards and bands sitting on the base navy.
          800: '#131A2C',
          700: '#1A2237',
          600: '#232D46',
        },
        amber: {
          DEFAULT: '#F5B84A',
          bright: '#FFCB6B',
          deep: '#C98F2E',
        },
        cream: '#F4EFE6',
        slateMuted: '#6B7A99',
        slateLight: '#8A99B8',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 0 rgba(244,239,230,0.06) inset, 0 18px 40px -24px rgba(0,0,0,0.9)',
        amber: '0 10px 30px -12px rgba(245,184,74,0.45)',
      },
      borderRadius: {
        xl: '14px',
      },
      keyframes: {
        // Used by the static SVG mountain so the reduced-motion / small-screen
        // fallback still has a little life without loading three.js.
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(-1.5%, 0, 0)' },
        },
      },
      animation: {
        drift: 'drift 26s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
