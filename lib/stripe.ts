import Stripe from 'stripe';

/**
 * Stripe client.
 *
 * Deliberately NOT falling back to a fake key. The previous version defaulted
 * to "sk_test_placeholder", which meant a missing environment variable produced
 * confusing Stripe API errors at request time instead of an obvious
 * misconfiguration. Now the route checks `stripe` is present and returns a
 * clean 503 instead.
 *
 * The API version is intentionally omitted so the SDK uses the version pinned
 * to your Stripe account, which is what the dashboard shows.
 */
const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = secretKey ? new Stripe(secretKey) : null;

/** Narrow helper so route handlers fail predictably when Stripe isn't set up. */
export function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return stripe;
}
