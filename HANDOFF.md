# Handoff — Rocky Mountain Booking marketing site

**Last updated:** 2026-07-31 · **Head:** `10146da` · **Branch:** `claude/rmb-site-rebuild-2mbwo3`

Read this before touching anything. It covers what the project is, what state
it's in, the decisions that are already settled (and why), and the traps that
have already cost a day.

---

## 1. What this is

Marketing site for **Rocky Mountain Booking, LLC** — AI phone answering and
appointment booking for service businesses. Based in Colorado Springs, CO,
serving clients **nationwide**.

Owner is **DJ**: solo founder, military veteran, software engineer. He has
**zero customers.** That single fact constrains most of the copy — see §5.

**Stack:** Astro 4.16.18 (`^4.16.18`; 4.16.19 is the latest 4.x), static output,
TypeScript. One runtime dependency (`astro`). No framework components, no server
code, no database, no cookies.

```bash
npm install
npm run dev      # localhost:4321
npm run build    # -> dist/
npm run preview
```

---

## 2. ⚠️ Branch situation — read this first

There are **two different applications in this repo.**

| Branch | What's on it | Status |
| --- | --- | --- |
| `main` (**default**) | The **old Next.js 14 app** | 🔴 Has live, unauthenticated Stripe endpoints |
| `claude/rmb-site-rebuild-2mbwo3` | The Astro rebuild — all real work | 🟢 Clean |

**The repository is PUBLIC.** GitHub homepage points at
`premium-starter-pro.vercel.app`, which builds from `main`.

### The single highest-priority action

`main` is a **direct ancestor** of the work branch, so the merge is a
fast-forward — no conflicts are possible:

```bash
curl -i -X POST https://premium-starter-pro.vercel.app/api/checkout   # expect 404
git checkout main
git merge --ff-only claude/rmb-site-rebuild-2mbwo3
git push origin main
```

That deletes 37 files, including `app/api/checkout/route.ts`,
`app/api/stripe/webhook/route.ts`, `middleware.ts`, `lib/stripe.ts`.

**Why it matters** (from the security audit, see `SECURITY.md`):

- `POST /api/checkout` on `main` is **unauthenticated, unrate-limited, no CSRF,
  no origin check** and calls the Stripe API on every request. A loop of `curl`
  costs real money in Vercel invocations and Stripe API load.
- The webhook creates a **second** invoice for a setup fee the checkout session
  already billed — **every customer charged twice.** The old README claimed this
  was fixed. It was not. The note was written; the code never changed.
- `next@14.2.5` is 30 patches behind (`14.2.35`), with published CVEs.

Also: **rotate `STRIPE_SECRET_KEY`** if it was ever set on that Vercel project.
It never leaked — all 33 commits were scanned and contain only
`sk_test_placeholder` — but an endpoint nobody knew was live has been holding it.

**Never push to `main` without DJ's explicit say-so.** All work goes on
`claude/rmb-site-rebuild-2mbwo3`.

---

## 3. Where things live

**`src/config/site.ts` is the single source of truth.** Phone, email, prices,
trades, nav, Instagram. Change a price there and the pricing page, count-up
animation, math box, Terms, and every meta description follow. **Never hardcode
a price anywhere else.**

| Thing | File |
| --- | --- |
| Phone, email, city, service area, socials, prices, trades, nav | `src/config/site.ts` |
| Design tokens, reset, typography, reveal system | `src/styles/global.css` (`:root`) |
| **Desktop layout** | `src/styles/desktop.css` (global classes only — see below) |
| Reusable blocks (phone mock, meters, chips, portrait) | `src/styles/blocks.css` |
| The three animations | `src/scripts/motion.ts` |
| **When DJ is free** | `availability` in `src/config/site.ts` |
| Booking widget (3 steps) | `src/components/Booking.astro` |
| Date/time + timezone maths | `src/scripts/booking.ts` |
| Meta, JSON-LD, OG tags, the `.js` bootstrap | `src/layouts/Base.astro` |
| Legal page shell | `src/layouts/Legal.astro` |
| Security headers + caching | `vercel.json` (**config, not code — port it if you leave Vercel**) |

**Current values:** `$399` standard / `$249` current / `$299` setup ·
`+18773799412` → `(877) 379-9412` · `contact@rockymountainbooking.com` ·
`@rockymountainbooking`

**Two views, one site.** Mobile-first CSS with desktop layouts above 720px and
1000px — same HTML, same URL, same content. There is no separate desktop build
and there should never be one.

**Pages:** `/` `/pricing` `/how-it-works` `/who-we-serve` `/contact`
`/privacy` `/terms` `/sms-terms` `/sitemap.xml` (generated from files that exist)

---

## 4. Settled decisions — do not re-litigate

- **No assistant name.** It was called "Sam"; that is not its name. The line
  answers as **"Your Business"** in the mocks. Prose says "it."
- **Two CTAs only.** **"Test a call"** → `tel:` (the AI). **"Book a call"** →
  `/contact` (books DJ personally). Rendered as `.cta-pair`: one gold button,
  one link beneath. "Audit" is retired.
- **Nationwide, not local.** Colorado Springs is the *address*, not the service
  area. Nothing may imply a client must be nearby.
- **Trades are display-only.** Deliberately **not** links — 11 near-identical
  pages would be thin content. `/for/[trade]` pages were built and deleted.
  Don't rebuild them.
- **No em dashes in visible copy.** DJ: *"a big give away"* for AI. They're fine
  in code comments. En dash in numeric ranges (`5–9%`) is correct typography.
- **Prices live in config.** Only in config.

---

## 5. Copy rules that are non-negotiable

Because there are **zero customers**, none of these may ever appear:

- ❌ Testimonials, reviews, star ratings, client counts, client logos, case studies
- ❌ Refund, money-back, or guarantee language *(the offer is a real
  month-to-month trial, not a guarantee — keep `/pricing` and Terms §3 in step)*
- ❌ Countdown timers or manufactured scarcity
- ❌ Review Bot outcome claims — **mechanism only.** What it does, never what it
  will achieve
- ❌ Which AI platform is used, uptime percentages, what happens if DJ is
  unavailable

Research figures are allowed **only** when labelled as industry research with
the "not a promise about your business" fineprint. See §7 on `/` for the one
unsourced number still outstanding.

---

## 6. Traps that already cost time

Every one of these was a real bug. Don't rediscover them.

1. **`visibility` is a discrete property.** In a `transition` shorthand it flips
   at the **end** of duration + delay. To reveal with it, give it its own `0s`
   duration and the same delay as its partner property.
2. **A full-screen overlay with `display: flex` overrides `[hidden]`.** The
   mobile menu once swallowed **every click on the site.** `Nav.astro` animates
   `opacity`/`transform`/`visibility` instead of toggling the attribute.
3. **Never fade text from `opacity: 0` if it's in the viewport on load.** Every
   intermediate frame is a genuine contrast failure — a11y tooling reads the
   blended colour and it really is unreadable at 40% through. This cost
   `/pricing` its accessibility score twice. The standard-rate block is masked
   and slides; the badge uses a `visibility` step. Below-the-fold reveals are
   fine, since audits don't scroll.
4. **The `<h1>` must never start at `opacity: 0`.** Chrome records no LCP
   candidate and performance scores **0**. `global.css` exempts the first block
   of the first section.
5. **Reveals are scoped to a `.js` class** set before first paint. Without it, a
   script failure leaves a blank page. `/contact` once rendered completely empty
   this way. Same pattern gates the price box's starting state.
6. **`format-detection: telephone=no`** in `Base.astro` stops iOS auto-linking
   the fake numbers in the call mocks. The mock numbers are `(000) 000-0000` on
   purpose — a realistic-looking number can belong to a real person.
7. **Vercel framework detection.** Any leftover `next.config.js` /
   `next-env.d.ts` makes Vercel claim "No Next.js version detected."
   `vercel.json` pins `framework: astro`.
8. **Astro scoped CSS + runtime classes.** `.rise.in .mi-box` scopes fine
   because `.rise` is authored in the file. For a class set on `<html>` (`.js`)
   you need `:global(.js) .thing`.
9. **Astro scoped CSS does not reach elements built with `createElement`.**
   They never get the `data-astro-cid-*` attribute, so scoped rules miss them
   entirely and they render with browser defaults. The whole booking calendar
   rendered unstyled this way. Use `.ancestor :global(.generated-class)` — the
   ancestor stays scoped so nothing leaks.
10. **`role="grid"` contracts to contain `role="row"`/`role="gridcell"`.**
    Declaring it on a plain button grid drops accessibility to 93. Ordinary
    buttons need no role; the container just needs `role="group"` and a name.
11. **Converting a wall-clock time into an instant is a two-pass fixed point,
    and the direction matters.** It must be `utc += target - asRead`. The
    mirror-image form diverges on the second pass and shifts every result by a
    whole UTC offset — a 9:00 AM slot rendered as 3:00 PM. `booking.ts` has the
    round-trip cases; re-run them if you touch it.
12. **Desktop rules for a component-scoped class must live in that component.**
    Astro compiles `.foo` inside a component's `<style>` to `.foo[data-astro-cid-x]`,
    which outranks a plain `.foo` in a global sheet no matter the load order.
    `desktop.css` therefore covers global classes only; `Nav`, `Footer`,
    `Booking`, `pricing.astro` and `index.astro` carry their own `@media`
    blocks. The header of `desktop.css` lists them.
13. **`grid-row: 1 / -1` needs explicit rows.** With auto-placement, `-1`
    resolves against the rows that exist at that moment, not the ones the
    content will need. The founder portrait spanned one row and the whole block
    collapsed. Declare `grid-template-rows` and place every child by hand.
14. **`Astro.url.pathname` has a trailing slash.** It is `/pricing/` while
    `nav` stores `/pricing`, so a raw `===` marked only the homepage as current.
    `Nav.astro` strips it before comparing.
15. **Never leave `playwright` or `sharp` in `package.json`.** Install for a
   task, uninstall after, then `git checkout -- package-lock.json`.

---

## 7. Outstanding — nothing here is done

### Blocking launch

| # | Item | Notes |
| --- | --- | --- |
| 1 | **Merge to `main`** | §2. Closes six audit findings in one fast-forward. |
| 2 | **Street address** | Twilio rejection code **30445** expects one. **Do not invent it — this is DJ's decision and he has said so explicitly.** Goes in `site.ts`, `Footer.astro`, `Legal.astro`. |
| 3 | **Attorney review** | All three legal pages. Especially the liability cap, the indemnity, and retention periods. |
| 4 | **Spend caps** | Telephony + LLM + Vercel. See `SECURITY.md`. |

### Booking widget — what it is and is not

`/contact` has a Calendly-style three-step flow: month → time slots → details.
It is **entirely native**; a Calendly or Cal.com embed would need `frame-src`,
`script-src` and `connect-src` opened to a third party, undoing the header work
and handing that third party every visitor.

**There is no server, so there is no live calendar and no lock on a slot.** Two
people can request the same time and neither is told. Every string says
*request*, and DJ confirms. **Do not reword it to "booked"** — the first
double-booking would make the site a liar. If real scheduling is ever wanted,
the Cal.com trade-off is written up at the top of `Booking.astro`.

Times are authored in Mountain wall-clock and shown converted to the visitor's
own zone beside them, because the site serves clients nationwide.

### Content owed

| # | Item | Notes |
| --- | --- | --- |
| 5 | **Cost-per-lead source** | The `$199` stat on `/` ("what one new lead costs on Google") has no citation. It is **not** the price — it just happens to match. Cite it or cut it. |
| 6 | **Demo recording** | `public/audio/demo-call.mp3`. The section is decided at **build time** and is simply absent until the file exists. Drop it in, rebuild, it appears. |
| 7 | **Confirm the hours** | Every page says answered around the clock, and **Terms §1 makes that contractual.** DJ once said the bot covers 10pm–6am and he takes the rest (commit `7662717`), then the site moved to 24/7 (`79c2997`). That was deliberate, but it needs confirming against how the assistant is actually configured. |
| 8 | **Retention periods** | `/privacy` promises 90 days for recordings, 12 months for transcripts. These are published promises. Confirm the systems do it. |
| 9 | **Subprocessor list** | `/privacy` lists categories, not vendors. Confirm it matches reality. |
| 10 | **Real availability** | `availability.slots` in `site.ts` is Mon–Fri 9/10/11/1/2/3 Mountain (Fri ends at 1). Set it to DJ's actual hours, and add trips and holidays to `blackouts`. |

### Known and accepted

- **Consent record is client-side.** Improved (wording + timestamp now come from
  compiled script, not editable hidden inputs) but **not tamper-proof** — anyone
  can edit their own browser. Real fix needs a server. The phone system's
  recorded verbal opt-in is the authoritative one.
- **CSP has `script-src 'unsafe-inline'`.** Deliberate; reasoning in
  `SECURITY.md`. No injection vector exists — no user input is rendered, no
  query params are read, no third-party code loads.
- **`npm audit` shows 4 advisories.** All in Astro's build toolchain
  (`esbuild`/`vite` = dev server only; `sharp` = only with `astro:assets`, which
  this site doesn't use). Nothing vulnerable ships. `npm audit fix` can't clear
  them without an Astro major upgrade — that's a migration, not a patch.

---

## 8. Verification before any merge

```bash
npm ci && npm run build && npm run preview   # :4321
```

**Standing bar: Lighthouse mobile performance and accessibility above 95 on
every page. Report both when done.**

Current: `/` 98/100/100/100 · `/pricing` 98–100/100/100/100 ·
`/how-it-works` 99 · `/who-we-serve` 99 · `/contact` 99 · legal pages 100.
*(perf / a11y / best-practices / SEO)*

```bash
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  npx lighthouse http://localhost:4321/ --only-categories=performance,accessibility \
  --chrome-flags="--headless=new --no-sandbox" --quiet
```

Also check, at 320/375/390/768/1280: no horizontal scroll, exactly one `<h1>`,
no broken images, no console errors, no 4xx. Menu opens, traps focus, closes on
Escape, and doesn't swallow clicks afterwards. Contact submit stays disabled
until `#agree` is ticked and is **not** enabled by `#sms_consent` alone (TCPA —
messaging consent must never gate service).

**Test the CSP by serving the build behind the real headers**, not by reading
`vercel.json`. A CSP that breaks the site in production is worse than none.

After deploy:
```bash
curl -sI https://rockymountainbooking.com | grep -iE 'content-security|strict-transport|x-frame'
```

---

## 9. Working with DJ

- **"You over explain a lot. Keep it simple."** Short answers. Lead with what
  changed, not how you got there.
- **"Build the rest, don't ask for the next steps."** He wants work delivered,
  not options presented. Make the routine call and say what you did.
- He gives correction batches, sometimes several mid-turn. Handle them all.
- When he says *"flag, don't change"* — flag it and move on.
- He is technical. Don't soften real problems.

**The sharpest lesson from the audit, worth carrying:** the old README stated
the setup-fee double-charge *had been fixed*. The code still charged twice. The
note was written; the fix never was. **Verify against behaviour, never against
the comment above it** — especially where the code was AI-generated.

---

## 10. Further reading in this repo

- **`SECURITY.md`** — architecture, header rationale, the phone-line spend
  runbook, account hardening, and what the old Next.js version shipped
- **`README.md`** — setup, where to change things, pre-launch table, a11y notes
- **`design-reference/`** — the approved static concepts (`homepage.html`,
  `pricing.html`) the build was derived from, plus the legacy Next.js legal
  pages kept for copy reference. Not built, not served.
