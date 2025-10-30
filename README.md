
# Premium Starter **Pro** — Highest-Quality Package (Built-In)

**What you get:**
- Next.js App Router + Tailwind
- **Premium Motion Pack** included:
  - Page transitions (AnimatePresence)
  - Magnetic buttons
  - Parallax hero
  - Section reveal animations
  - Scroll progress bar
  - Reduced-motion aware smooth scrolling (Lenis)
- **Polish & Ops**: SEO helper, dynamic OG image, robots/sitemap, 404/500
- **Checkout**: Stripe Checkout (Apple/Google Pay)
- **A11y**: Skip link, focus rings, keyboard-friendly nav

## Quickstart
```bash
npm i
```
Create `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
SITE_URL=http://localhost:3000
```
Run:
```bash
npm run dev
```

## Customize
- Colors: `tailwind.config.js`
- Fonts: add `<link>` in `app/layout.tsx` or self-host under `/public/fonts` and reference in CSS
- Logo/copy: `components/Header.tsx`, `components/Footer.tsx`, `components/Hero.tsx`
- Pages: `app/*/page.tsx`

## Production
- Deploy to Vercel, set env vars, set `SITE_URL` to live domain
- In Stripe, create Products/Prices and switch to fixed `price: 'price_...'` IDs

## Targets
- LCP < 2.0s (4G), CLS ~0, 60fps animation
- Motion durations ~220ms; respect prefers-reduced-motion
