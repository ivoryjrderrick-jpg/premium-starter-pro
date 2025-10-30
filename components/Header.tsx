
'use client';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

const NavLink = ({ href, children }: any) => (
  <Link className="px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring" href={href}>
    {children}
  </Link>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Acme</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
        <div className="md:hidden">
          <button
            className="p-2 rounded-md border border-gray-200"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mnav"
          >
            ☰
          </button>
        </div>
      </div>
      <div id="mnav" className={clsx("md:hidden overflow-hidden transition-[max-height] duration-200", open ? "max-h-96" : "max-h-0")}>
        <div className="mx-auto max-w-6xl px-4 pb-4 flex flex-col gap-2">
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </div>
    </header>
  );
}
