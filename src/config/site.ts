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
   * Public profiles. These also go into the LocalBusiness `sameAs` array, which
   * is how search engines tie the profile to the business rather than treating
   * it as an unrelated account with a similar name.
   */
  social: {
    instagram: {
      handle: '@rockymountainbooking',
      url: 'https://www.instagram.com/rockymountainbooking/',
    },
  },

  /**
   * The business is based in Colorado Springs and serves clients anywhere in
   * the country — the phone system does not care where the shop is.
   * `city`/`state` above remain the registered location; this is coverage.
   *
   * Keep this in step with what was filed with Twilio: 30445 wants an address
   * OR a service area that matches the registration exactly.
   */
  serviceArea: 'United States',
  serviceAreaLabel: 'Based in Colorado Springs. Serving businesses anywhere in the U.S.',

  /**
   * Demo recording for the homepage player. Drop the file at public/audio/.
   * If it is missing or fails to load, the whole section hides itself rather
   * than showing a dead player.
   */
  demoAudio: '/audio/demo-call.mp3',
} as const;

/**
 * When DJ is free for a call.
 *
 * THIS IS THE ONLY PLACE TO EDIT AVAILABILITY. The calendar, the slot list and
 * the disabled dates are all derived from it.
 *
 * Times are wall-clock in `timezone`, so they stay correct across daylight
 * saving without anyone editing them twice a year. Visitors outside Mountain
 * Time are shown the converted time in their own zone as well, because the site
 * now serves clients nationwide and "2:00 PM" means two different things in
 * Denver and Boston.
 *
 * Important: with no server there is no live calendar and no lock on a slot.
 * A submission is a REQUEST for a time, which DJ confirms. The UI says exactly
 * that. Do not reword it into a confirmed booking unless real scheduling gets
 * wired up — see the note in Booking.astro.
 */
export const availability = {
  timezone: 'America/Denver',
  timezoneLabel: 'Mountain Time',
  durationMins: 30,
  /** Nothing bookable inside this many hours, so there is time to see it. */
  leadTimeHours: 12,
  /** How far ahead the calendar will page. */
  horizonDays: 60,
  /** 0 = Sunday … 6 = Saturday. Omit a day to make it unbookable. */
  slots: {
    1: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
    2: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
    3: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
    4: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
    5: ['09:00', '10:00', '11:00', '13:00'],
  } as Record<number, readonly string[]>,
  /** Dates off, YYYY-MM-DD. Holidays, trips, anything already booked solid. */
  blackouts: ['2026-11-26', '2026-11-27', '2026-12-24', '2026-12-25', '2027-01-01'],
} as const;

/**
 * Pricing.
 *
 * `standard` is the current list price and `current` is the current offer on it.
 * It is NOT a historical price — never render it as "was" or "originally".
 * The struck-through figure must be labelled as the standard rate.
 */
export const pricing = {
  standard: 399,
  current: 249,
  setup: 299,
  currency: 'USD',
} as const;

/**
 * Trades shown in the chip row and on /who-we-serve.
 *
 * Display only — these are deliberately NOT links. Eleven near-identical
 * per-trade pages would be thin content, and one honest page covering all of
 * them says the same thing without the SEO risk.
 */
export const trades = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Garage Door',
  'Restoration',
  'Auto Repair',
  'Towing',
  'Landscaping',
  'Pest Control',
  'Cleaning',
] as const;

/** Nav destinations, shared by the mobile menu and the footer. */
export const nav = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/who-we-serve', label: 'Who We Serve' },
  { href: '/contact', label: 'Book a Call' },
] as const;
