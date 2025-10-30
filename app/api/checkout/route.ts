import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { tier } = await req.json().catch(() => ({ tier: "starter" }));
    const siteUrl = process.env.SITE_URL || "http://localhost:3000";
    const monthlyPrice = process.env.STRIPE_MONTHLY_PRICE_ID!;
    if (!monthlyPrice) throw new Error("STRIPE_MONTHLY_PRICE_ID missing");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: monthlyPrice, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${siteUrl}/pricing?status=success`,
      cancel_url: `${siteUrl}/pricing?status=cancelled`,
      metadata: { planTier: tier ?? "starter" },
      subscription_data: { metadata: { planTier: tier ?? "starter" } },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Checkout init failed" }, { status: 500 });
  }
}
