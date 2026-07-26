'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from '@/components/Logo';
import { site } from '@/lib/site';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile panel on navigation so the menu never persists across pages.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the panel and returns focus to the toggle, so keyboard users
  // aren't stranded inside a menu they can't see.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-navy/85 backdrop-blur-md">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-cream"
        >
          <Logo className="h-7 w-8" />
          <span className="text-[15px] leading-tight sm:text-base">
            Rocky Mountain <span className="text-amber">Booking</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'text-amber'
                    : 'text-slateLight hover:bg-cream/5 hover:text-cream'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.phone.href}
            className="ml-2 rounded-xl bg-amber px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-amber-bright"
            data-analytics="click-to-call"
          >
            {site.phone.display}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 rounded-lg p-2.5 text-cream md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* `hidden` (not off-screen positioning) so collapsed links leave the tab order. */}
      <div id="mobile-nav" hidden={!open} className="border-t border-cream/10 md:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-3">
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-lg px-2 py-3 text-base ${
                      active ? 'text-amber' : 'text-cream'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={site.phone.href}
            className="mb-1 mt-2 flex min-h-[48px] items-center justify-center rounded-xl bg-amber px-4 py-3 font-semibold text-navy"
            data-analytics="click-to-call"
          >
            Call {site.phone.display}
          </a>
        </nav>
      </div>
    </header>
  );
}
