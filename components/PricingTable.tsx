
'use client';
import { useState } from 'react';
import Magnetic from '@/components/motion/Magnetic';

export default function PricingTable() {
  const [loading, setLoading] = useState<'starter' | 'pro' | null>(null);

  async function handleBuy(tier: 'starter' | 'pro') {
    setLoading(tier);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout not configured yet. Set STRIPE keys and SITE_URL.');
      }
    } catch (e) {
      alert('Error starting checkout.');
    } finally {
      setLoading(null);
    }
  }

  const Btn = ({ tier, label }: any) => (
    <Magnetic>
      <button onClick={() => handleBuy(tier)} className="mt-6 w-full px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring disabled:opacity-50">
        {loading === tier ? 'Redirecting…' : label}
      </button>
    </Magnetic>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      <div className="rounded-xl border border-gray-100 p-6 bg-white shadow-card">
        <h3 className="text-xl font-semibold">Starter</h3>
        <p className="text-gray-600 mt-2">Up to 5 pages, subtle motion, Stripe link checkout.</p>
        <div className="mt-6 text-3xl font-bold">$1,000</div>
        <Btn tier="starter" label="Buy Starter" />
      </div>
      <div className="rounded-xl border border-gray-100 p-6 bg-white shadow-card">
        <h3 className="text-xl font-semibold">Pro</h3>
        <p className="text-gray-600 mt-2">Up to 10 pages, CMS-ready structure, premium motion pack.</p>
        <div className="mt-6 text-3xl font-bold">$1,600</div>
        <Btn tier="pro" label="Buy Pro" />
      </div>
    </div>
  );
}
