/**
 * Faceted mountain range, pure SVG (~4KB, no JS).
 *
 * This is the *default* hero visual, not a degraded fallback: it renders on
 * first paint for everyone, and on small screens or under prefers-reduced-motion
 * it's the only thing that ever renders — three.js is never fetched.
 *
 * The drift animation is CSS-only and is neutralised by the global
 * prefers-reduced-motion rule in globals.css.
 */
export default function MountainStatic({ animated = true }: { animated?: boolean }) {
  const drift = animated ? 'motion-safe:animate-drift' : '';

  return (
    <svg
      viewBox="0 0 800 420"
      // Anchored to the bottom and scaled to fit the width, so the range always
      // reads as a horizon line. Using `slice` here would crop into the middle
      // of the geometry on narrow screens and render as abstract triangles.
      preserveAspectRatio="xMidYMax meet"
      className="absolute bottom-0 left-0 w-full"
      role="img"
      aria-label="Stylised low-poly illustration of a golden mountain range at dusk"
    >
      <defs>
        {/* Fades to fully transparent at the top so the letterboxed area above
            the artwork blends into the page background with no visible seam. */}
        <linearGradient id="rmb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1220" stopOpacity="0" />
          <stop offset="45%" stopColor="#17203A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#221B27" stopOpacity="0.9" />
        </linearGradient>

        <radialGradient id="rmb-glow" cx="0.56" cy="0.62" r="0.5">
          <stop offset="0%" stopColor="#F5B84A" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#C98F2E" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0D1220" stopOpacity="0" />
        </radialGradient>

        {/* Far ridge sits closest to the navy background — atmospheric depth. */}
        <linearGradient id="rmb-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B7A99" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1A2237" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="rmb-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C98F2E" />
          <stop offset="48%" stopColor="#6E5A3E" />
          <stop offset="100%" stopColor="#141B2D" />
        </linearGradient>

        <linearGradient id="rmb-lit" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFCB6B" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F5B84A" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="rmb-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D2740" />
          <stop offset="100%" stopColor="#0B1019" />
        </linearGradient>
      </defs>

      <rect width="800" height="420" fill="url(#rmb-sky)" />
      <rect width="800" height="420" fill="url(#rmb-glow)" />

      {/* ── Far ridge ─────────────────────────────────────────────────────── */}
      <g className={drift} style={{ animationDuration: '34s' }}>
        <path
          d="M0 300 L80 200 L128 242 L196 150 L250 205 L318 168 L372 228 L448 142 L512 212 L580 178 L648 236 L720 196 L800 252 L800 420 L0 420 Z"
          fill="url(#rmb-far)"
        />
      </g>

      {/* ── Mid ridge: the hero range, faceted with lit west faces ───────── */}
      <g>
        <path
          d="M0 336 L96 238 L158 286 L236 200 L300 268 L372 222 L440 282 L520 208 L596 272 L680 238 L760 290 L800 268 L800 420 L0 420 Z"
          fill="url(#rmb-mid)"
        />

        {/* Sunlit faces — each is peak → previous valley → base directly below. */}
        <path d="M96 238 L0 336 L96 336 Z" fill="url(#rmb-lit)" opacity="0.5" />
        <path d="M236 200 L158 286 L236 336 Z" fill="url(#rmb-lit)" opacity="0.75" />
        <path d="M372 222 L300 268 L372 336 Z" fill="url(#rmb-lit)" opacity="0.5" />
        <path d="M520 208 L440 282 L520 336 Z" fill="url(#rmb-lit)" opacity="0.85" />
        <path d="M680 238 L596 272 L680 336 Z" fill="url(#rmb-lit)" opacity="0.45" />

        {/* Snow caps on the two tallest peaks. */}
        <path d="M236 200 L258 226 L246 231 L236 222 L224 232 L212 224 Z" fill="#F4EFE6" opacity="0.92" />
        <path d="M520 208 L541 233 L530 238 L520 230 L508 239 L497 231 Z" fill="#F4EFE6" opacity="0.92" />

        {/* Shadowed east faces keep the range from reading flat. */}
        <path d="M236 200 L300 268 L236 336 Z" fill="#0D1220" opacity="0.34" />
        <path d="M520 208 L596 272 L520 336 Z" fill="#0D1220" opacity="0.34" />
      </g>

      {/* ── Near ridge: dark foreground mass anchoring the composition ────── */}
      <g className={drift} style={{ animationDuration: '22s', animationDirection: 'reverse' }}>
        <path
          d="M0 380 L110 306 L190 352 L272 290 L356 346 L440 304 L528 356 L616 308 L706 354 L800 322 L800 420 L0 420 Z"
          fill="url(#rmb-near)"
        />
        <path d="M272 290 L190 352 L272 420 Z" fill="#F5B84A" opacity="0.07" />
        <path d="M616 308 L528 356 L616 420 Z" fill="#F5B84A" opacity="0.06" />
      </g>
    </svg>
  );
}
