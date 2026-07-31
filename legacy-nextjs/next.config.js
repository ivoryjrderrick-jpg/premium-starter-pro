/**
 * Security headers.
 *
 * This is a static marketing site: no database, no user accounts, no sessions,
 * no cookies, no uploads, and nothing stored in the browser. That removes most
 * of the usual attack surface on its own. What's left is mostly about stopping
 * the page being framed, sniffed, downgraded to HTTP, or injected into.
 */

/**
 * The contact form POSTs to a third-party service (Formspree/Basin/Netlify).
 * CSP blocks that by default, so the configured endpoint's origin is added to
 * connect-src and form-action — and nothing else is.
 */
function formEndpointOrigin() {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) return '';
  try {
    return new URL(endpoint).origin;
  } catch {
    // A malformed endpoint shouldn't take the build down; the form falls back
    // to mailto: anyway.
    return '';
  }
}

const formOrigin = formEndpointOrigin();

const csp = [
  "default-src 'self'",

  // Next.js injects inline bootstrap/hydration scripts, and the JSON-LD blocks
  // are inline too. A nonce-based policy would be stricter but requires
  // middleware on every request; for a site with no authentication and no user
  // input rendered to the page, that trade isn't worth the added moving parts.
  "script-src 'self' 'unsafe-inline'",

  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${formOrigin ? ` ${formOrigin}` : ''}`,

  // Where the browser is allowed to submit a form. Stripe is reached by
  // navigation, not form POST, so it doesn't belong here.
  `form-action 'self'${formOrigin ? ` ${formOrigin}` : ''}`,

  // Clickjacking protection. Nothing should ever frame this site.
  "frame-ancestors 'none'",
  "frame-src 'none'",

  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },

  // Two years, subdomains included, preload-eligible. Stops SSL-stripping.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Belt-and-braces alongside frame-ancestors, for older browsers.
  { key: 'X-Frame-Options', value: 'DENY' },

  // Stops the browser guessing a response is a script when it isn't.
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Nothing here needs these APIs. `payment=(self)` is left open in case
  // Stripe Elements is embedded later.
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), usb=(), magnetometer=(), payment=(self)',
  },

  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  // Don't advertise the framework and version to scanners.
  poweredByHeader: false,

  images: { formats: ['image/avif', 'image/webp'] },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },

      // The webhook and checkout endpoints should never be cached anywhere.
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
    ];
  },
};
