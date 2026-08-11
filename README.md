# Rocky Mountain Booking

Marketing site for Rocky Mountain Booking, LLC. AI phone answering and
appointment booking for service businesses. Based in Colorado Springs, CO,
serving clients nationwide.

**Astro 4, static output, TypeScript. One runtime dependency, no framework
components, no database, no cookies.**

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the built site
npm run check    # astro check (installs @astrojs/check on first run)
```

---

## Where to change things

Everything you will routinely edit lives in **`src/config/site.ts`**. Phone
number, email, both prices, the trade list, and the nav. There are **no
environment variables** — this is a static site with nothing to configure at
runtime, so nothing can be misconfigured at deploy time either.

| Task | File |
| --- | --- |
| Phone, email, city, service area | `src/config/site.ts` → `site` |
| Prices (standard, current, setup) | `src/config/site.ts` → `pricing` |
| Trade list | `src/config/site.ts` → `trades` |
| Nav links | `src/config/site.ts` → `nav` |
| Colours, fonts, spacing tokens | `src/styles/global.css` (`:root`) |
| Reusable blocks (phone mock, meters, chips) | `src/styles/blocks.css` |
| The three animations | `src/scripts/motion.ts` |
| Meta, JSON-LD, security-relevant `<head>` | `src/layouts/Base.astro` |
| Legal page shell | `src/layouts/Legal.astro` |

Changing a price in `site.ts` updates the pricing page, the count-up animation,
the math box, the Terms, and every meta description at once. Do not hardcode a
price anywhere else.

### Pages

| Route | |
| --- | --- |
| `/` | Missed calls → why → what changes → calendar → urgent transfer → what you get back → Review Bot → trades → founder → CTA |
| `/pricing` | Price box → what's included → interactive math → thirty days → FAQ → CTA |
| `/how-it-works` | Four steps, urgent handoff detail |
| `/who-we-serve` | The trades, and who it is not for |
| `/contact` | Three-field booking form, click-to-call |
| `/privacy`, `/terms`, `/sms-terms` | Compliance pages |
| `/sitemap.xml` | Generated from the pages that exist |

---

## Before you launch

| What | Status |
| --- | --- |
| **Street address** | Not published. Twilio rejection code 30445 expects a verifiable physical address. The footer and both legal pages currently show business name, city/state, phone and business-domain email. Decide on an address, then add it to `site.ts`, the footer, and `Legal.astro`. |
| **Attorney review** | Not done. `/privacy`, `/terms` and `/sms-terms` are written against carrier requirements and how the service actually runs, but they are not legal advice. The liability cap, the indemnity, and the retention periods are the parts worth paying for. |
| **Retention periods** | `/privacy` publishes 90 days for recordings and 12 months for transcripts. These are promises. Confirm the systems actually do it. |
| **Subprocessor list** | `/privacy` lists categories, not vendors. Confirm it matches what you actually use. |
| **Demo recording** | `public/audio/demo-call.mp3` does not exist. The player self-hides until it does; drop the file in and the section appears on its own. |
| **Cost-per-lead figure** | The `$199` stat on the homepage ("what one new lead costs on Google") needs a citable source. |
| **Hours of coverage** | Every page says answered around the clock. Confirm that matches how the assistant is actually configured — Terms §1 makes it contractual. |

### Carrier / TCR registration checklist

- [x] SMS Terms at `/sms-terms`, linked from the footer of every page
- [x] Privacy Policy with the "no mobile information shared for marketing" clause
- [x] Opt-in data / consent never shared with third parties, stated explicitly
- [x] STOP / HELP, message frequency, and rate disclosures
- [x] Consent captured where the number is collected, optional and unchecked
- [x] Consent wording and timestamp recorded with the submission
- [x] Business name, service area, business phone and business-domain email on every page
- [ ] Street address
- [ ] Attorney review

---

## Security

**Full detail, including the spend-cap runbook for the phone line, is in
[SECURITY.md](./SECURITY.md). Read that one before changing anything that
touches headers, forms, or the build.**

There is no database, no accounts, no sessions, no cookies, no uploads, no
server-side code, and nothing written to browser storage. Every page is
prebuilt HTML served from a CDN. That absence is the main defence: most web
vulnerabilities need state or a server to attack, and there is neither.

The short version of the thing people get wrong: **the website is not where the
money can be drained — the published phone number is.** Every call costs
telephony minutes plus AI tokens, and toll-free means you pay for the caller's
side too. Concurrency caps, call-duration limits and hard spend caps live in the
phone system, not here.

### What is actively in place

- **Security headers** in `vercel.json`, applied to every response:
  - `Content-Security-Policy` — `default-src 'self'` with `object-src 'none'`,
    `base-uri 'none'`, `frame-ancestors 'none'`, `form-action 'self'`, and
    `connect-src 'self'`. No external origin can be loaded or contacted.
  - `Strict-Transport-Security` — two years, `includeSubDomains`, `preload`
  - `X-Frame-Options: DENY` alongside `frame-ancestors` for older browsers
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` — camera, microphone, geolocation, payment, USB and
    the rest are switched off outright
  - `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy`
- **No third-party resources at all.** Fonts are self-hosted, there is no
  analytics script, no tag manager, no CDN-hosted library, no embedded video.
  Nothing on the page can be changed by anyone but you.
- **JSON-LD is escaped** in `Base.astro` so a config value can never terminate
  its own `<script>` tag.
- **The contact form has no endpoint.** It opens the visitor's mail client. No
  data is posted anywhere, so there is no endpoint to abuse and no inbox to
  flood. A honeypot field handles trivial bots.
- **Form input is never rendered back into the page.** Status text is set with
  `textContent`, never `innerHTML`.

### An honest note on the CSP

`script-src` and `style-src` include `'unsafe-inline'`. Two things need it: a
tiny inline script in `<head>` that marks the document as scripted before first
paint, and the stylesheet Astro inlines for speed. Removing it would mean
either hashing those blocks — which breaks the site silently the next time
anyone edits them — or an extra render-blocking request.

This is a deliberate trade-off and a small one here: the site renders no user
input, accepts no query parameters, and loads no third-party code, so there is
no injection vector for `'unsafe-inline'` to widen. The parts of the CSP that
do the real work on a static site — no external scripts, no framing, no
outbound connections, no base-tag hijacking, no form redirection — are all
strict.

If you ever add analytics or an embed, do **not** relax `default-src`. Add the
one origin to the one directive it needs.

### Keeping it that way

The accounts are the real attack surface. For a site with no login, whoever
controls the GitHub repo, the Vercel project, or the domain registrar controls
the site.

1. **Turn on 2FA** on GitHub, Vercel, the domain registrar, and Google
   Workspace. Use an authenticator app, not SMS.
2. **Protect the default branch** on GitHub so nothing merges without review.
3. **Run `npm audit` before each deploy**, and read the results rather than
   reacting to the count. As of the last check it reports four advisories, all
   inside Astro's own build toolchain: `esbuild`/`vite` (affects the local dev
   server only) and `sharp`/libvips (only runs if you use `astro:assets` image
   optimisation, which this site does not — every image is a plain `<img>` from
   `public/`). Nothing vulnerable is served to a visitor; the shipped bundle is
   this project's own scripts and CSS and nothing else. `npm audit fix` cannot
   clear them without upgrading Astro across major versions, which is a
   migration, not a patch. Do it deliberately, not on the eve of a launch.
4. **Never commit a `.env` file.** This project has no environment variables;
   if that changes, `.gitignore` already covers them.
5. **Enable HSTS preload** at <https://hstspreload.org> once the domain has
   served the header over HTTPS for a while. The header is already set.
6. **Verify the headers after the first deploy**:
   ```bash
   curl -sI https://rockymountainbooking.com | grep -iE 'content-security|strict-transport|x-frame|x-content-type|referrer|permissions'
   ```

---

## Accessibility and performance

Lighthouse mobile targets are performance and accessibility **above 95** on
every page. Check before merging anything that touches layout or animation.

- Semantic landmarks, one `<h1>` per page, ordered heading levels
- Skip link, gold focus rings on every interactive element, 48px touch targets
- `prefers-reduced-motion` honoured by all three animations
- Reveal animations are scoped to a `.js` class set before first paint, so a
  script failure shows the whole page rather than a blank one
- The first block of the first section never animates — it holds the `<h1>`,
  which is the LCP element, and hiding it meant Chrome recorded no LCP at all
- Nothing that animates into view fades text from `opacity: 0` while it is
  inside the viewport on load. Partial opacity is a real contrast failure for
  the duration of the fade — see the note in `pricing.astro`

### Two things that will bite you

**`visibility` is a discrete property.** In a `transition` shorthand it flips at
the *end* of duration plus delay, not the start. To reveal something with it,
give it its own `0s` duration and the same delay as the property it
accompanies.

**A full-screen overlay with `display: flex` overrides `[hidden]`.** The mobile
menu once swallowed every click on the site this way. `Nav.astro` animates
`opacity`/`transform`/`visibility` instead of toggling the attribute.

---

## Deploying

Vercel, from `vercel.json`. Import the repo and deploy — framework, build
command, output directory and all headers are in that file. No dashboard
configuration needed, and nothing to set as an environment variable.

Any static host works. If you move off Vercel, **port `vercel.json`'s `headers`
block to the new host** — those headers are configuration, not code, and they
will not come along on their own.
