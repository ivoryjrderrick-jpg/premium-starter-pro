
'use client';
import Reveal from '@/components/motion/Reveal';

const features = [
  { title: 'Smooth motion', desc: 'Framer Motion reveals, route transitions, magnetic buttons.' },
  { title: 'Parallax hero', desc: 'Tasteful depth that respects reduced motion.' },
  { title: 'Stripe Checkout', desc: 'Apple Pay / Google Pay via secure sessions.' },
  { title: 'A11y first', desc: 'Skip link, focus rings, keyboard-friendly nav.' },
  { title: 'SEO + OG', desc: 'SEO helper + dynamic OG image route.' },
  { title: 'Perf', desc: 'Image optimization, code split, minimal CLS.' },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.04}>
            <div className="rounded-xl border border-gray-100 p-6 shadow-card bg-white h-full">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
