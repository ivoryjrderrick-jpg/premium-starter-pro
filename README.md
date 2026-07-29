# Rocky Mountain Booking

Marketing site for Rocky Mountain Booking, LLC — done-for-you AI phone systems
for appointment-based businesses in Colorado Springs, CO.

Next.js 14 (App Router) · TypeScript · Tailwind · react-three-fiber.

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev                  # http://localhost:3000
```

---

## ⚠️ Before you launch

**Nothing renders as a placeholder.** The site is safe to deploy and safe to
submit for carrier review as-is. One item is still outstanding, but it degrades
rather than breaking:

| What | Where | Notes |
|---|---|---|
| **Street address** | `NEXT_PUBLIC_ADDRESS_LINE1/2` | Not set. `/privacy` and `/sms` currently show business name, city/state, email and phone — all real, just without a street line. Set it before submitting for carrier registration; reviewers expect a physical address. `next build` prints a warning until you do. |

### Carrier / TCR registration checklist

- [x] SMS Terms published at `/sms`, linked in the footer of every page
- [x] Privacy Policy at `/privacy` with the "no mobile information shared for
      marketing" clause
- [x] STOP / HELP, message frequency, and rate disclosures on `/sms`
- [x] Consent captured at the point the phone number is collected (contact
      form), optional and unchecked by default
- [x] Business description consistent between the site and both legal pages
- [ ] **Street address set** — the one remaining item
- [ ] Subprocessor list in `/privacy` matches what you actually use
- [ ] Retention periods in `lib/site.ts` match what your systems actually do
- [ ] Attorney review

The last three can't be verified from code. The retention periods in
particular are published promises — stating 90 days and keeping recordings
indefinitely is worse than publishing nothing.

### Open decisions (resolve with counsel — do not just pick a number)

**Call recording retention vs. proof of SMS consent.** `/privacy` publishes a
90-day deletion window for call recordings. Those same recordings are the
record of a caller's verbal opt-in to text messages, and TCPA claims routinely
arrive well after 90 days. Deleting on schedule means destroying the evidence
that consent was given; keeping recordings longer contradicts the published
policy. Both the number and the policy wording need to move together, and the
right answer depends on advice — so the 90 days in `lib/site.ts` has
deliberately been left alone.

One option worth raising with the attorney: retain a short structured consent
record (number, timestamp, the yes/no) separately from the audio, so the
recording can still be deleted at 90 days without losing the proof.

**Setup fee is $500 on both tiers.** `plans` in `lib/site.ts` sets `setup: 500`
for Founding and Standard alike, and both cards render "$500 one-time setup".
Flagged because planning documents had Standard higher than Founding. Unchanged
pending a decision — note that a *lower* setup fee is currently one of the few
things that does not differentiate the Founding tier.

**SMS is qualified, not live.** The Founding tier feature line reads "SMS
confirmations (activates once carrier registration completes)". Remove the
qualifier once A2P 10DLC clears.

Phone and email are live: `(877) 379-9412` and `contact@rockymountainbooking.com`.

### On the phone number

The site publishes **the demo bot's own line**, not a personal mobile. That's
deliberate — every CTA dials the product, so "call me" and "hear it answer a
call" are the same action, and a prospect experiences the escalation feature
before they've paid for it. The personal number belongs inside the phone
system as an escalation target, never on the page.

One open question: `877` is toll-free, which reads national. The positioning
is local. A `719` number would carry that better — see the note in the launch
checklist below.

Also worth doing: have an attorney read `/privacy` and `/terms` before launch,
particularly the liability cap and indemnity clauses. They're written to match
how the business actually operates, but they aren't legal advice.

---

## Where to change things

**Everything you'll routinely want to edit lives in `lib/site.ts`** — phone
number, email, address, Stripe links, form endpoint, and both pricing plans.
Every value there can also be overridden with an environment variable, so you
can change the demo number in the Vercel dashboard without touching code.

| Task | File |
|---|---|
| Phone, email, address, Stripe links | `lib/site.ts` (or env vars) |
| Prices, plan features, footnotes | `plans` array in `lib/site.ts` |
| Add testimonials | `TESTIMONIALS` array in `components/sections/SocialProof.tsx` |
| Pricing FAQ | `FAQS` array in `app/pricing/page.tsx` |
| Cost comparison figures | `components/pricing/CostComparison.tsx` |
| Brand colours | `tailwind.config.js` |

### Adding testimonials

`SocialProof.tsx` ships with an empty `TESTIMONIALS` array. While it's empty the
section shows an honest founding-client call-out. Add one entry and it switches
itself to a testimonial grid — no other file changes.

```ts
const TESTIMONIALS = [
  { quote: 'Booked four jobs the first weekend.',
    name: 'Dave R.', business: 'Summit Heating & Air', location: 'Colorado Springs, CO' },
];
```

---

## Pages

| Route | |
|---|---|
| `/` | Hero (3D scene) · problem · how it works · differentiators · who it's for · social proof · CTA |
| `/pricing` | Cost comparison → plans → FAQ → CTA + form |
| `/contact` | Click-to-call, email, contact form |
| `/privacy` | Privacy Policy, incl. carrier-required SMS disclosures |
| `/terms` | Terms of Service |

---

## The 3D hero

**Chosen approach: react-three-fiber, lazy-loaded, desktop-only. Measured cost
~205 KB gzipped — under the 300 KB budget.**

| Chunk | gzipped |
|---|---|
| three.js core | 161 KB |
| @react-three/fiber | 43 KB |
| **Total added JS** | **~205 KB** |

Critically, **that cost is not on the critical path for anyone**. Verified from
the build output: neither chunk appears in the first-load JS graph of any page.
The landing page's First Load JS is **96.7 KB**.

`drei` is not used. Every helper the scene needed (custom geometry, flat
shading, a render loop) is a handful of lines against core R3F, and dropping
drei saved bundle weight for no visual difference. The mountain is generated at
runtime from seeded ridged-noise rather than loaded as a model, so there's no
asset to fetch either. `CapsuleGeometry` is not used anywhere.

### The loading gate — `components/hero/HeroVisual.tsx`

The static SVG (`MountainStatic.tsx`, ~4 KB, zero JS) renders on first paint for
everyone. three.js loads **only** when all of these pass:

- viewport ≥ 768px
- `prefers-reduced-motion` is *not* set
- a WebGL context is actually obtainable

Because the dynamic import lives behind a state flag that starts `false`,
three.js is **never requested** on phones or for reduced-motion users — not
fetched-and-discarded, never requested at all.

Verified in a real browser:

| Scenario | three.js requests | `<canvas>` |
|---|---|---|
| Desktop 1440px | 2 | 1 |
| iPhone 13 | **0** | 0 |
| Desktop + `prefers-reduced-motion` | **0** | 0 |

The render loop also stops via `IntersectionObserver` once the hero scrolls out
of view, and DPR is capped at 1.75.

---

## Deploying

### Vercel (what this is built for)

Import the repo, add the environment variables from `.env.example`, deploy.
No configuration file needed — `next build` is detected automatically.

### Netlify

Works, but install `@netlify/plugin-nextjs` so the API routes become functions.
Static hosts without that plugin will break `/api/checkout` and the Stripe
webhook.

### Framer — you can't host this there

Framer is a closed visual builder. It doesn't run a Next.js codebase, so there
is no path to deploying this repo to Framer. Worth being blunt about the
tradeoffs:

- **Routing.** Framer has real multi-page routing, so the five pages are fine.
- **The 3D hero.** This is where it hurts. Framer's code components can't
  reliably code-split a 200 KB dependency behind a media-query gate, so you'd
  either ship three.js to phones or drop the 3D. `MountainStatic.tsx` is plain
  SVG and would port over fine on its own.
- **SEO.** Per-page metadata, JSON-LD, sitemap and robots are all handled here
  in code. In Framer you'd re-enter them by hand in the UI.
- **Compliance pages.** `/privacy` and `/terms` are long documents. They'd have
  to be pasted into Framer's editor and re-formatted.

**Recommendation:** point the domain at Vercel. If you want to keep Framer for
quick visual edits, use it for a separate landing page on a subdomain — don't
try to reproduce this site there.

---

## Stripe

Two options; pick one.

**Payment Links (simplest).** Create a Payment Link per plan in the Stripe
dashboard, put the URLs in `NEXT_PUBLIC_STRIPE_FOUNDING_LINK` /
`NEXT_PUBLIC_STRIPE_STANDARD_LINK`. The cards link straight to Stripe and
`/api/checkout` is never called. No secret keys in the app.

**Checkout Sessions.** Leave those blank and set `STRIPE_SECRET_KEY` plus the
three price IDs instead. `/api/checkout` builds a subscription session with the
one-time setup fee on the first invoice.

If neither is configured, the pricing CTAs fall back to `/contact` rather than
rendering dead buttons.

> The webhook deliberately does **not** create a separate invoice for the setup
> fee. The checkout session already bills it on the first invoice; the previous
> version of that file added it a second time, which double-charged.

---

## Contact form

Set `NEXT_PUBLIC_FORM_ENDPOINT` to any service that accepts a form POST
(Formspree, Basin, Netlify Forms). Left blank, the form opens the visitor's mail
client pre-filled, so a lead is never silently dropped. A honeypot field handles
basic spam.

---

## Security

There is no database, no user accounts, no sessions, no cookies, no uploads,
and nothing written to browser storage. That absence is the main reason the
attack surface here is small — most web vulnerabilities need state to attack.

What's actively in place:

- **Security headers** (`next.config.js`): CSP, HSTS with preload,
  `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`. `X-Powered-By` is disabled.
- **CSP allowlists the contact form endpoint only.** `connect-src` and
  `form-action` are derived from `NEXT_PUBLIC_FORM_ENDPOINT`. Set that variable
  and the origin is added automatically — hardcode nothing.
- **Webhook signatures verified** before the payload is parsed or trusted.
  Errors are returned generically so probing reveals nothing.
- **No secret ever reaches the browser.** Only `NEXT_PUBLIC_*` values do, and
  those are all intentionally public (phone, email, address, Stripe payment
  links). `STRIPE_SECRET_KEY` is server-only and has no fallback value — a
  missing key returns a clean 503 rather than failing obscurely.
- **Rate limiting** on `/api/checkout` (`lib/rate-limit.ts`). Per-instance, so
  it's a speed bump, not a global control. A hard limit belongs at the edge.
- **JSON-LD is escaped** (`lib/json-ld.ts`) so a value can never break out of
  its `<script>` tag.

### Keeping it that way

- `npm audit` before each deploy. Next.js in particular ships security releases
  often, and this project was upgraded from 14.2.5, which had a critical
  cache-poisoning advisory.
- Never commit `.env.local`. Only `.env.example` is tracked; `.gitignore`
  covers the rest.
- If a key is ever pasted into a commit, rotate it in the Stripe dashboard.
  Removing it from the code does not remove it from git history.
- Turn on Vercel's deployment protection and 2FA on GitHub, Vercel, and Stripe.
  For a site with no login, those accounts *are* the attack surface.

## Accessibility & performance notes

- Semantic landmarks, one `<h1>` per page, ordered heading levels
- Skip link, visible amber focus rings, 48px minimum touch targets
- `prefers-reduced-motion` respected globally, not just in the hero
- FAQ uses native `<details>`/`<summary>` — keyboard accessible, works with JS off
- No `localStorage` or `sessionStorage` anywhere
- `LocalBusiness` and `FAQPage` JSON-LD; per-page canonical tags; geo meta

Lighthouse note: mobile runs at a 412px viewport, which is below the 768px gate,
so the mobile audit never loads three.js at all.
