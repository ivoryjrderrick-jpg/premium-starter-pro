import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { site } from '@/lib/site';

/**
 * Checkout session builder.
 *
 * Only needed if you're NOT using Stripe Payment Links. If you set
 * NEXT_PUBLIC_STRIPE_FOUNDING_LINK / NEXT_PUBLIC_STRIPE_STANDARD_LINK, the
 * pricing cards link straight to Stripe and this route is never called.
 *
 * Required env vars for this path:
 *   STRIPE_SECRET_KEY
 *   STRIPE_SETUP_PRICE_ID           one-time, $500
 *   STRIPE_FOUNDING_PRICE_ID        recurring monthly, $497
 *   STRIPE_STANDARD_PRICE_ID        recurring monthly, $697
 */

const MONTHLY_PRICE_ENV: Record<string, string | undefined> = {
  founding: process.env.STRIPE_FOUNDING_PRICE_ID,
  standard: process.env.STRIPE_STANDARD_PRICE_ID,
};

export async function POST(request: Request) {
  try {
    const { plan } = (await request.json().catch(() => ({}))) as { plan?: string };
    const planId = plan === 'standard' ? 'standard' : 'founding';

    const monthly = MONTHLY_PRICE_ENV[planId];
    const setup = process.env.STRIPE_SETUP_PRICE_ID;

    if (!monthly || !setup) {
      return NextResponse.json(
        { error: 'Checkout is not configured yet.' },
        { status: 503 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      // In subscription mode a one-time price is billed on the first invoice,
      // so the setup fee and the first month are charged together — exactly once.
      line_items: [
        { price: setup, quantity: 1 },
        { price: monthly, quantity: 1 },
      ],
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      metadata: { plan: planId },
      success_url: `${site.url}/contact?status=success`,
      cancel_url: `${site.url}/pricing?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session creation failed:', error);
    return NextResponse.json({ error: 'Checkout failed.' }, { status: 500 });
  }
}
