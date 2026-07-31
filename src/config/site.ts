/**
 * Rocky Mountain Booking — single source of truth.
 *
 * Phone number and both prices live here and nowhere else. Change them here and
 * every page, every tel: link, and the price animation all follow.
 */

/** Formats +18773799412 -> (877) 379-9412 so display can never drift from the dial target. */
function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, '');
  const local = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (local.length !== 10) return e164;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

const PHONE_E164 = '+18773799412';

export const site = {
  name: 'Rocky Mountain Booking',
  legalName: 'Rocky Mountain Booking, LLC',
  /** Used in copy and in the LocalBusiness block. */
  city: 'Colorado Springs',
  state: 'CO',
  region: 'Colorado',
  url: 'https://rockymountainbooking.com',

  phone: {
    e164: PHONE_E164,
    display: formatPhone(PHONE_E164),
    href: `tel:${PHONE_E164}`,
  },

  /**
   * Business-domain email, not free mail — Twilio rejection code 30445 requires
   * the business be verifiable from the site.
   */
  email: 'contact@rockymountainbooking.com',

  /**
   * Service area stands in for a street address until one is published.
   * 30445 also wants an address OR service area that matches the Twilio
   * registration exactly — keep these in step with what was filed.
   */
  serviceArea: ['Colorado Springs', 'Pueblo', 'Monument', 'Fountain', 'Castle Rock'],
} as const;

/**
 * Pricing.
 *
 * `standard` is the current list price and `current` is the current offer on it.
 * It is NOT a historical price — never render it as "was" or "originally".
 * The struck-through figure must be labelled as the standard rate.
 */
export const pricing = {
  standard: 299,
  current: 149,
  setup: 299,
  currency: 'USD',
} as const;

/** The eleven trades with their own pages, and the order they appear in the chip row. */
export const trades = [
  { slug: 'hvac', name: 'HVAC' },
  { slug: 'plumbing', name: 'Plumbing' },
  { slug: 'electrical', name: 'Electrical' },
  { slug: 'roofing', name: 'Roofing' },
  { slug: 'garage-door', name: 'Garage Door' },
  { slug: 'restoration', name: 'Restoration' },
  { slug: 'auto-repair', name: 'Auto Repair' },
  { slug: 'towing', name: 'Towing' },
  { slug: 'landscaping', name: 'Landscaping' },
  { slug: 'pest-control', name: 'Pest Control' },
  { slug: 'cleaning', name: 'Cleaning' },
] as const;

/** Nav destinations, shared by the mobile menu and the footer. */
export const nav = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/contact', label: 'Contact' },
] as const;
