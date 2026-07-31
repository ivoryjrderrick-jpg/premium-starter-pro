import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs'; // Signature verification needs Node crypto.
export const dynamic = 'force-dynamic';

/**
 * Stripe webhook receiver.
 *
 * Every request is verified against STRIPE_WEBHOOK_SECRET before it is trusted.
 * That signature check is the only thing standing between this public URL and
 * anyone who can POST to it, so it must run before the payload is parsed or
 * acted on — never reorder it.
 *
 * NOTE: this deliberately does NOT create an invoice for the setup fee. The
 * checkout session already bills the one-time setup price on the first invoice
 * alongside the first month — adding an invoice item here as well would charge
 * the client twice. (That was a live bug in the previous version of this file.)
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !signature || !endpointSecret) {
    return new NextResponse('Webhook not configured', { status: 400 });
  }

  // The exact raw body is required — any re-serialisation invalidates the
  // signature, so this must not be req.json().
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch {
    // Don't echo the underlying error — it can confirm details of the secret
    // format to someone probing the endpoint.
    return new NextResponse('Invalid signature', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Onboarding hook: trigger a welcome email or CRM record here once
      // you've picked those tools.
      console.info('New client signed up', {
        sessionId: session.id,
        plan: session.metadata?.plan,
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
