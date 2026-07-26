'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import MountainStatic from './MountainStatic';

/**
 * Decides whether the hero gets the real 3D range or stays on the SVG.
 *
 * The gate is the whole point: `next/dynamic` splits MountainScene into its own
 * chunk, and that chunk is only ever *requested* when this component actually
 * renders <MountainScene />. Because we render it behind a state flag that
 * starts false and only flips after the media queries pass, three.js is never
 * fetched on phones or for reduced-motion users — not fetched-then-discarded,
 * never requested at all.
 */
const MountainScene = dynamic(() => import('./MountainScene'), {
  ssr: false,
  loading: () => null,
});

const DESKTOP = '(min-width: 768px)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export default function HeroVisual() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia(REDUCED_MOTION);

    // A WebGL context check keeps us from mounting a Canvas that can only fail
    // (older machines, hardware acceleration disabled, some remote desktops).
    function hasWebGL(): boolean {
      try {
        const canvas = document.createElement('canvas');
        return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
      } catch {
        return false;
      }
    }

    function evaluate() {
      const ok = desktop.matches && !reduced.matches && hasWebGL();
      setEnabled(ok);
      if (!ok) setReady(false);
    }

    evaluate();

    // Re-evaluate on resize and on OS motion-preference changes, so rotating a
    // tablet or toggling the setting takes effect without a reload.
    desktop.addEventListener('change', evaluate);
    reduced.addEventListener('change', evaluate);
    return () => {
      desktop.removeEventListener('change', evaluate);
      reduced.removeEventListener('change', evaluate);
    };
  }, []);

  // Stop rendering frames once the hero is off screen — no reason to burn GPU
  // while someone reads the pricing comparison.
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { rootMargin: '120px' },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      // Decorative: the headline beside it carries the meaning, and the SVG
      // already exposes its own descriptive label to assistive tech.
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* The artwork is a bottom-anchored band, not a full-bleed background —
          it reads as a horizon and leaves the headline on clean navy. */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] sm:h-[72%]">
        {/* Always painted, so the hero is never empty while three.js loads. */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <MountainStatic animated={!enabled} />
        </div>

        {enabled ? (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <MountainScene onReady={() => setReady(true)} paused={paused} />
          </div>
        ) : null}
      </div>

      {/* Scrims. Vertical keeps the top of the hero dark and the bottom seamless;
          horizontal (desktop only) protects contrast behind the left-aligned copy. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy/60" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-navy via-navy/45 to-transparent md:block" />
    </div>
  );
}
