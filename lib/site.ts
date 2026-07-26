/**
 * Rocky Mountain Booking — single source of truth for everything you'll want
 * to change without touching component code.
 *
 * Every value below can be overridden with an environment variable, so you can
 * change the demo number or a Stripe link in the Vercel dashboard and redeploy
 * without editing this file at all.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  REPLACE THESE BEFORE LAUNCH — search the repo for "REPLACE_ME"
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Fallbacks used when no env var is set. Marked so they're easy to find. */
const REPLACE_ME = {
  /** Your demo number. 555-01xx is the reserved fictional range — it won't dial a real person. */
  phone: '+17195550142',
  email: 'hello@rockymountainbooking.com',
  /** Physical mailing address, required for SMS/carrier registration. */
  addressLine1: '[REPLACE_ME — street address]',
  addressLine2: 'Colorado Springs, CO [REPLACE_ME — ZIP]',
} as const;

/**
 * Formats +17195550142 -> (719) 555-0142 so we only ever store one canonical
 * number and never let the display copy drift from the dial target.
 */
function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, '');
  const local = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (local.length !== 10) return e164;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

const phoneE164 = process.env.NEXT_PUBLIC_DEMO_PHONE ?? REPLACE_ME.phone;

export const site = {
  name: 'Rocky Mountain Booking',
  legalName: 'Rocky Mountain Booking, LLC',
  city: 'Colorado Springs',
  state: 'CO',
  region: 'Colorado',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://rockymountainbooking.com',

  /** Canonical dial target for every click-to-call CTA on the site. */
  phone: {
    e164: phoneE164,
    display: formatPhone(phoneE164),
    href: `tel:${phoneE164}`,
  },

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? REPLACE_ME.email,

  /** Used in the compliance pages and the LocalBusiness structured data. */
  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 ?? REPLACE_ME.addressLine1,
    line2: process.env.NEXT_PUBLIC_ADDRESS_LINE2 ?? REPLACE_ME.addressLine2,
  },

  /**
   * Where the contact form POSTs. Formspree, Netlify Forms, Basin — anything
   * that accepts a normal form POST works. Leave unset and the form falls back
   * to a mailto: link so it never silently drops a lead.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',

  /**
   * Stripe. Two ways to run this, pick one:
   *
   *  1. PAYMENT LINKS (simplest) — create a Payment Link in the Stripe
   *     dashboard for each plan and paste the URLs into the env vars below.
   *     No secret keys in the app at all.
   *
   *  2. CHECKOUT SESSIONS — leave the links blank and set the price IDs in
   *     STRIPE_FOUNDING_* / STRIPE_STANDARD_* server env vars instead. The
   *     /api/checkout route builds the session (setup fee + subscription).
   */
  stripe: {
    foundingLink: process.env.NEXT_PUBLIC_STRIPE_FOUNDING_LINK ?? '',
    standardLink: process.env.NEXT_PUBLIC_STRIPE_STANDARD_LINK ?? '',
  },

  /** Business hours the AI covers — used in copy and structured data. */
  hoursPerWeek: 168,
} as const;

/** Plan definitions. Pricing page renders straight from this. */
export const plans = [
  {
    id: 'founding' as const,
    name: 'Founding Client',
    badge: 'Limited',
    monthly: 497,
    setup: 500,
    features: [
      '24/7 call answering',
      'Appointment booking to your calendar',
      'SMS confirmations',
      'Urgent calls transferred to your phone',
      'Local setup and support',
      'Rate locked 6 months',
    ],
    footnote: 'First 3 clients only, in exchange for a testimonial.',
    featured: true,
  },
  {
    id: 'standard' as const,
    name: 'Standard',
    badge: null,
    monthly: 697,
    setup: 500,
    features: [
      'Everything in Founding',
      'Priority support',
      'Monthly performance reporting',
    ],
    footnote: 'Month to month. 30 days notice to cancel.',
    featured: false,
  },
];

export type Plan = (typeof plans)[number];

/** Last updated date shown on the Privacy Policy and Terms pages. */
export const legalEffectiveDate = 'February 1, 2026';
