import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs'; // Signature verification needs Node crypto.

/**
 * Stripe webhook receiver.
 *
 * NOTE: this deliberately does NOT create an invoice for the setup fee. The
 * checkout session already bills the one-time setup price on the first invoice
 * alongside the first month — adding an invoice item here as well would charge
 * the client twice. (That was a live bug in the previous version of this file.)
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !endpointSecret) {
    return new NextResponse('Webhook not configured', { status: 400 });
  }

  const body = await req.arrayBuffer();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(body),
      signature,
      endpointSecret,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid signature';
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Onboarding hook: trigger a welcome email or CRM record here once
      // you've picked those tools.
      console.info('New client signed up', {
        sessionId: session.id,
        plan: session.metadata?.plan,
        email: session.customer_details?.email,
      });
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.info('Subscription cancelled', { subscriptionId: subscription.id });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
