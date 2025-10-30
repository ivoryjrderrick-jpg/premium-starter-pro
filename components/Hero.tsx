
'use client';
import ParallaxHero from '@/components/motion/ParallaxHero';
import Magnetic from '@/components/motion/Magnetic';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <ParallaxHero>
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 text-center grain">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          Premium websites that feel effortless
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
        >
          Clean type. Subtle motion. Stripe-ready checkout. Built to ship fast.
        </motion.p>
        <motion.div
          className="mt-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
        >
          <Magnetic><Link href="/pricing" className="px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring">View Pricing</Link></Magnetic>
          <Magnetic strength={0.18}><a href="#features" className="px-6 py-3 rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring">See Features</a></Magnetic>
        </motion.div>
      </div>
    </ParallaxHero>
  );
}
