
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { tier } = await request.json();
    const price = tier === 'pro' ? 160000 : 100000;
    const name = tier === 'pro' ? 'Pro Website Package' : 'Starter Website Package';
    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name }, unit_amount: price }, quantity: 1 }],
      success_url: `${siteUrl}/pricing?status=success`,
      cancel_url: `${siteUrl}/pricing?status=cancelled`,
      automatic_tax: { enabled: false },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: 'Checkout init failed' }, { status: 500 });
  }
}
