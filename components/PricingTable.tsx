"use client";
import { useState } from "react";

export default function PricingTable() {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout init failed");
      window.location.href = data.url;
    } catch (err) {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
      <p className="text-gray-600 mt-3">
        Pay once to build, then a simple monthly care plan.
      </p>

      <div className="mt-10 rounded-2xl border bg-white/50 shadow-sm backdrop-blur">
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Website Build + Care</h2>
          <p className="text-gray-600 mt-2">
            One-time setup: <strong>$465</strong> · Then <strong>$99/mo</strong> hosting & care
            (updates, monitoring, and priority fixes included).
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold">$465</span>
            <span className="text-gray-500">one-time</span>
            <span className="text-gray-400">·</span>
            <span className="text-xl font-semibold">$99</span>
            <span className="text-gray-500">/mo</span>
          </div>

          <ul className="mt-6 space-y-2 text-gray-700">
            <li>• Premium animations & responsive design</li>
            <li>• Stripe checkout wired and tested</li>
            <li>• Domain, SSL, analytics, contact form</li>
            <li>• Ongoing care & updates for $99/mo</li>
          </ul>

          <button
            onClick={handleBuy}
            className="mt-8 w-full rounded-md bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 focus:outline-none focus:ring"
            disabled={loading}
          >
            {loading ? "Redirecting…" : "Buy & Subscribe"}
          </button>

          <p className="mt-3 text-xs text-gray-500">
            You’ll see a single Stripe checkout showing $465 today and a $99/mo subscription.
            Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
