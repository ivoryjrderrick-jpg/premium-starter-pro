import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const siteUrl = process.env.SITE_URL || "http://localhost:3000";
    const monthly = process.env.STRIPE_MONTHLY_PRICE_ID; // $99/mo price ID
    const setup   = process.env.STRIPE_SETUP_PRICE_ID;   // $465 one-time price ID
    if (!monthly || !setup) throw new Error("Missing STRIPE price env vars");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        { price: setup,   quantity: 1 }, // $465 today
        { price: monthly, quantity: 1 }, // $99/mo
      ],
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      success_url: `${siteUrl}/pricing?status=success`,
      cancel_url: `${siteUrl}/pricing?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e:any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Checkout init failed" }, { status: 500 });
  }
}
