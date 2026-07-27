/**
 * Rocky Mountain Booking — single source of truth for everything you'll want
 * to change without touching component code.
 *
 * Every value below can be overridden with an environment variable, so you can
 * change the demo number or a Stripe link in the Vercel dashboard and redeploy
 * without editing this file at all.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  ONE THING LEFT BEFORE LAUNCH — search the repo for "REPLACE_ME"
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Street address. Set NEXT_PUBLIC_ADDRESS_LINE1/2 before submitting for carrier
 * registration — reviewers expect a physical address on the compliance pages.
 *
 * Until it's set, nothing bracketed is printed. The contact blocks fall back to
 * the business name, city/state, email and phone, which are all real. A page
 * that shows slightly less is fine; a page showing "[REPLACE_ME]" reads as
 * unfinished and gets rejected.
 */
const streetAddress = process.env.NEXT_PUBLIC_ADDRESS_LINE1?.trim() ?? '';
const addressLocality =
  process.env.NEXT_PUBLIC_ADDRESS_LINE2?.trim() || 'Colorado Springs, CO';

if (typeof window === 'undefined' && !streetAddress) {
  // Surfaces in `next build` output and in Vercel logs, so this can't be
  // quietly forgotten between now and carrier registration.
  console.warn(
    '[rmb] NEXT_PUBLIC_ADDRESS_LINE1 is not set — /privacy and /sms will omit ' +
      'the street address. Set it before submitting for carrier registration.',
  );
}

/**
 * Live values. These are real.
 *
 * One published number, answered two ways: the owner takes it during the day,
 * and the AI covers overnight. See `coverage` below — copy across the site
 * reads from it, so changing the hours here updates every page.
 *
 * The owner's personal mobile is deliberately NOT published. Callers reach the
 * business line; routing happens inside the phone system.
 */
const DEFAULTS = {
  phone: '+18773799412',
  email: 'contact@rockymountainbooking.com',
} as const;

/**
 * Formats +18773799412 -> (877) 379-9412 so we only ever store one canonical
 * number and never let the display copy drift from the dial target.
 */
function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, '');
  const local = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (local.length !== 10) return e164;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

const phoneE164 = process.env.NEXT_PUBLIC_DEMO_PHONE ?? DEFAULTS.phone;

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

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULTS.email,

  /** Used in the compliance pages and the LocalBusiness structured data. */
  address: {
    /** Empty until configured — render conditionally, never print it raw. */
    line1: streetAddress,
    line2: addressLocality,
    isComplete: Boolean(streetAddress),
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

  /**
   * How the published line is answered.
   *
   * The AI takes every call, at every hour — deliberately. A caller who wants a
   * person is transferred, and that transfer is the point: it's the escalation
   * feature working in front of a prospect rather than being described to them.
   *
   * `liveTransferHours` is the honest caveat. Outside them a transfer may not
   * be picked up, so the system takes details and texts instead of stranding
   * the caller. Copy reads from these strings so the story is told once.
   */
  coverage: {
    /** The AI answers every call, no exceptions. */
    answered: '24/7',
    /** When a live transfer will realistically reach a person. */
    liveTransferHours: '6am–10pm',
    timezone: 'Mountain Time',
  },

  /** Hours a client's own system covers, once installed — used in sales copy. */
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

/** Last updated date shown on the Privacy Policy, Terms and SMS Terms pages. */
export const legalEffectiveDate = 'July 27, 2026';

/**
 * Data retention periods published in the Privacy Policy.
 *
 * ⚠️  These MUST match what your systems actually do. Stating 90 days here and
 *     keeping recordings indefinitely is worse than publishing nothing — it's a
 *     written promise you're visibly breaking. Confirm each one against your
 *     telephony and storage providers before launch.
 */
export const retention = {
  callRecordings: '90 days',
  transcripts: '12 months',
  /** Kept for the agreement's duration, plus this long afterwards. */
  appointmentRecords: '12 months',
  /** Deletion/return window after a client agreement ends, on request. */
  offboarding: '30 days',
} as const;
