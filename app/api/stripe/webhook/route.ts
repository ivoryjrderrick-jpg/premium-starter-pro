import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Use the same API version you pinned in lib/stripe.ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const runtime = "nodejs"; // needed for crypto in Vercel

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.arrayBuffer();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(body), sig, endpointSecret);
  } catch (err: any) {
    // Invalid signature
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const customerId = session.customer as string;
      if (!customerId) throw new Error("Missing customer id on session");

      // one-time setup fee price
      const setupPriceId = process.env.STRIPE_SETUP_PRICE_ID!;
      if (!setupPriceId) throw new Error("STRIPE_SETUP_PRICE_ID missing");

      // Add a one-time invoice item for $465
      await stripe.invoiceItems.create({
        customer: customerId,
        price: setupPriceId,
        description: `Website setup fee (${session.metadata?.planTier ?? "starter"})`,
      });

      // Create & auto-charge the invoice immediately
      await stripe.invoices.create({
        customer: customerId,
        collection_method: "charge_automatically",
        auto_advance: true,
      });

      // TODO: send welcome email / create CRM record, etc.
    } catch (err) {
      console.error("Webhook post-checkout handling failed:", err);
    }
  }

  return NextResponse.json({ received: true });
}
