# Security

## Reporting

Email <contact@rockymountainbooking.com>. There is no bug bounty, but a real
report gets a real answer.

---

## What this application is

A statically generated marketing site. Every route is prebuilt HTML served from
a CDN.

There is **no server-side code, no API, no database, no user accounts, no
sessions, no cookies, no file uploads, and nothing written to browser storage.**
Whole classes of vulnerability — SQL injection, IDOR, broken access control,
session fixation, mass assignment, SSRF — need something this application does
not have. That absence is the primary control, and it is worth protecting.

**The single most important rule: keep it that way.** Every serverless function
added here becomes a publicly callable, billable endpoint. That is not
hypothetical — see the history note at the bottom.

### The 7 KB of JavaScript that does ship

Three scroll/count animations, a mobile menu, an audio player, and the contact
form handler. It reads no URL parameters, no cookies, no storage, and no
`postMessage`. It contains no `eval`, no `new Function`, and no `innerHTML`.
Verify after any change:

```bash
npm run build
grep -rE "eval\(|new Function|innerHTML|localStorage|document\.cookie|URLSearchParams" dist/_astro/*.js
# expect no output
```

---

## Where the money can actually be drained

**Not through the website.** Through the phone line, which is published on every
page and is supposed to be called by strangers.

Every inbound call costs telephony minutes, speech-to-text, LLM tokens, and
text-to-speech. The number is toll-free, so **you pay for the caller's side
too.** An autodialer running concurrent calls overnight is a four-figure bill,
and nothing in a Content-Security-Policy can stop it. These controls live in
the telephony and AI stack, not in this repository.

### Required controls

| Control | Why |
| --- | --- |
| **Hard spend cap with auto-suspend** on the telephony account | An alert that arrives at 3am is not a control. The account must stop spending on its own. |
| **Hard monthly cap** on the LLM/voice provider | Same reasoning. A budget alert is not a budget. |
| **Concurrency cap** (start around 5–10 simultaneous AI calls) | Bounds the worst case no matter how many numbers dial in. Overflow goes to voicemail. |
| **Max call duration** (3–5 minutes, hard cutoff) | Token burn is per-second. An open line left running is the cheapest attack there is. |
| **Per-ANI rate limit** (same number more than ~3 times an hour) | Sends repeat dialers to a recording before the AI is ever invoked. |
| **Anomaly blocking** | Sequential caller IDs, invalid/spoofed ANI, and repeated sub-5-second hangups are dialer signatures. Drop before answering. |

### Worth considering

A local number instead of toll-free. On a toll-free line **you** pay for inbound
minutes; on a local DID the caller does. That single change makes mass-dialing
cost the attacker money instead of you, which is the strongest deterrent
available.

### Platform spend limits

Set these too. They are the backstop when something upstream goes wrong.

- **Vercel** — Settings → Billing → spend limit, plus bandwidth alerts
- **Telephony** — billing alerts *and* a triggered suspend action
- **LLM provider** — hard cap, not a soft alert

---

## Accounts are the real attack surface

There is no login on this site, so nobody can break into it. They break into the
places that can *change* it.

- **2FA on GitHub, Vercel, the domain registrar, the telephony account, Stripe,
  and Google Workspace.** Authenticator app, not SMS — SMS 2FA falls to SIM
  swapping, which is a phone-company attack, and you run a phone company
  adjacent business.
- **Protect the default branch.** No direct pushes, no unreviewed deploys.
- **Registrar lock on the domain.** Losing the domain loses everything attached
  to it, including email.
- **This repository is public.** Anything committed is world-readable forever,
  including in history. Never commit a key. If one is ever committed, **rotate
  it** — deleting the commit does not unpublish it.

---

## HTTP security headers

Set in `vercel.json`, applied to every response. If you move off Vercel, these
are **configuration, not code** — they will not come with you. Port them.

| Header | What it does |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'` with `object-src`, `base-uri`, `frame-ancestors` and `frame-src` set to `'none'`, plus `form-action 'self'` and `connect-src 'self'`. No external script can load, no external host can be contacted, the page cannot be framed, and a form cannot be redirected off-site. |
| `Strict-Transport-Security` | Two years, `includeSubDomains`, `preload`. Blocks HTTPS-stripping. Submit at <https://hstspreload.org> once the domain has served it for a while. |
| `X-Frame-Options: DENY` | Clickjacking protection for browsers predating `frame-ancestors`. |
| `X-Content-Type-Options: nosniff` | Stops a browser second-guessing a declared content type. |
| `Referrer-Policy` | Cross-origin requests get the origin only, never the full path. |
| `Permissions-Policy` | Camera, microphone, geolocation, payment and USB are switched off outright rather than merely unused. |
| `Cross-Origin-Opener-Policy` / `-Resource-Policy` | Isolates the browsing context; stops other origins embedding these assets. |

### The one deliberate loosening

`script-src` and `style-src` include `'unsafe-inline'`. A small inline script in
`<head>` marks the document as scripted before first paint, and Astro inlines
the stylesheet for speed. Hashing both would break the site silently the next
time anyone edits either.

The trade is narrow here: **no user input is rendered into any page, no query
parameter is read, and no third-party code loads.** There is no injection vector
for `'unsafe-inline'` to widen. The directives doing the real work on a static
site — no external scripts, no framing, no outbound connections, no base-tag
hijacking, no form redirection — are all strict.

If you ever add analytics or an embed, **do not relax `default-src`.** Add the
one origin to the one directive that needs it.

### Verify after every deploy

```bash
curl -sI https://rockymountainbooking.com | \
  grep -iE 'content-security|strict-transport|x-frame|x-content-type|referrer|permissions'
```

---

## The contact form

It has **no endpoint.** Submission is handled in script and handed to the
visitor's own mail client via `mailto:`. Nothing is posted anywhere, so there is
no endpoint to flood and no inbox to fill by automation. The form deliberately
carries no `method` and no `action`, so a script failure cannot cause the
browser to post a phone number to a host that will only log it.

Values are escaped with `encodeURIComponent`, so mailto header injection is not
possible. Status text is set with `textContent`, never `innerHTML`.

### Known limitation: consent records

The SMS consent wording and timestamp are generated by the compiled script, not
read from hidden form fields — as fields they were editable in devtools, which
made the "record" a string the submitter chose.

This is an improvement, **not a guarantee.** Anyone can still edit anything
inside their own browser. Tamper-resistant consent capture requires a server
writing the record at submission time, which this site deliberately does not
have. Treat the emailed record as good-faith evidence and rely on the phone
system's own recorded verbal opt-in as the authoritative one.

---

## Dependencies

One runtime dependency: `astro`. Run `npm audit` before each deploy and **read
the output rather than reacting to the count.**

Current advisories are all inside Astro's build toolchain — `esbuild`/`vite`
(local dev server only) and `sharp`/libvips (only runs with `astro:assets` image
optimisation, which this site does not use; every image is a plain `<img>` from
`public/`). Nothing vulnerable is served to a visitor.

`npm audit fix` cannot clear them without an Astro major-version upgrade. That is
a migration, not a patch. Do it deliberately, never on the eve of a launch.

Verify what actually ships:

```bash
npm run build && ls dist/_astro/
# expect only this project's own hoisted.*.js and *.css
```

---

## History worth remembering

This repository previously hosted a Next.js application. It shipped
`POST /api/checkout` — **unauthenticated, unrate-limited, no CSRF token, no
origin check** — that called the Stripe API on every request. Anyone could have
run it in a loop and generated serverless invocations, Stripe API load, and junk
Checkout Sessions at your expense.

Its webhook also created a *second* invoice for a setup fee the checkout session
had already billed, charging every customer twice. The README of that version
claimed the double-charge had been fixed. It had not been. The note was written;
the code was never changed.

Both were removed when the site was rebuilt as static. Two lessons:

1. **An endpoint nobody links to is still a live endpoint.** Nothing in the UI
   called it by the end. It was still one `curl` away.
2. **A comment saying something is fixed is not evidence it is fixed.** Verify
   against behaviour, not against documentation — especially where the code was
   AI-generated.
