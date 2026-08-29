# D&M Web Design — agency site

Project-local instructions, and the **canonical** context file for this repo. Read natively by
Codex and by Antigravity's agent; Claude Code reads it via the `@AGENTS.md` import in
`CLAUDE.md`.

## What this is

D&M Web Design's own agency website — a Bulgarian-language marketing site for a Plovdiv web
studio. Its job is to convert visitors into **booked discovery calls**. The differentiator it
sells is a free homepage demo built before the client pays anything.

- **Live URL:** https://dm-web-design.vercel.app (no custom domain purchased yet)
- **Repo:** https://github.com/dmdigitalpartners/dm-web-design
- **Deploys via:** Vercel, on push to `main`
- **Language:** Bulgarian only. All UI copy, labels and metadata are Bulgarian.

## Stack

- Next.js 16.2 (App Router, Turbopack) · React 19.2 · TypeScript strict
- **Package manager: npm** — the lockfile is `package-lock.json`. Do not introduce pnpm,
  yarn or bun here, and do not delete the lockfile.
- Tailwind CSS v4 (CSS-first config in `app/globals.css`, no `tailwind.config`)
- shadcn/ui (`base-nova` style) on Base UI · lucide icons · `motion` for animation
- Resend for the contact form · Cal.com embed for booking · Vercel Analytics + Speed Insights

## Commands

```bash
npm ci             # install exactly per lockfile
npm run dev        # http://localhost:3000
npm run build      # must pass before any deploy
npm run lint
npx tsc --noEmit   # typecheck (no npm script for this)
```

## Layout

- `app/(marketing)/` — all public pages; `app/api/contact/` — the form handler
- `components/marketing/` — page sections · `components/layout/` — Navbar, Footer
- `components/ui/` — shadcn primitives; regenerate via shadcn rather than hand-editing
- `lib/data/*.ts` — **all page copy lives here**, not inline in components
- `scripts/*.mjs` — the verification harness (see below)

## Content

`lib/data/` is the source of truth for copy. Change wording there, not in JSX.

Bulgarian typography: quotes are `„…“` (U+201E / U+201C), not ASCII `"`. `scripts/fix-quotes.mjs`
repairs the common mistake. Bulgarian words are long — check headings for wrapping at 390px.

**Never invent business facts.** Prices, client counts, results, testimonials and credentials
are real claims about a real business. `lib/site-config.ts` deliberately leaves `phone` and the
social URLs empty, and the components render nothing rather than a placeholder — keep that
pattern. Empty means "not yet", not "make something up".

## Design direction

The palette, its dark/light values and its **measured WCAG contrast ratios** are documented in
`app/globals.css`. Read that block before changing any colour — it is the brand source of truth.

- Carbon Black `#0b0b0c` / Bone White `#f7f5f1`, Aged Gold `#b8935a` accent, Muted Sage
- Gold is contrast-sensitive: raw `#b8935a` fails AA as text on light, so `--gold` resolves to
  the deepened `#80622f` in light mode. Use the token, never the raw hex.
- Both dark and light modes ship. Anything visual must be checked in both.
- Target: WCAG AA.

> `app/globals.css` cites a `BRAND_GUIDE.md` that is not in this repo and never has been.
> Treat the CSS comments as canonical until that guide is actually written.

## Verification harness

This repo has real browser verification. Use it — do not assert that a page looks right.

```bash
npm run dev                                   # must be running first
node scripts/shoot.mjs http://localhost:3000/ home        # desktop+mobile × dark+light → .shots/
node scripts/link-sweep.mjs                   # every internal link returns 200
node scripts/a11y-sweep.mjs                   # axe-core over all routes, both themes
node scripts/check-shell.mjs                  # mobile menu, Escape, console errors
node scripts/check-contact.mjs                # contact form validation + failure state
```

The four sweep scripts default to `http://localhost:3000` and honour `BASE_URL` to target another
port: `BASE_URL=http://localhost:3100 node scripts/a11y-sweep.mjs`. **Confirm the port you point at
is actually this repo** (check the page title) — `:3000` is easy to find occupied by another project.

Two traps when capturing screenshots:

- A `fullPage` screenshot does not scroll, so `Reveal`'s IntersectionObserver never fires and
  revealed sections photograph as blank bands. Scroll to the bottom first. This is a capture
  artifact, **not** a rendering bug — `Reveal` paints visible on the server and only hides
  below-fold content after mount, so no visitor ever sees a blank band.
- Do not run `npm run build` while `next dev` is running; they share `.next` and the dev server
  starts serving 500s.

`.shots/` is gitignored. The Playwright MCP is also available for ad-hoc inspection, and the
`visual-qa-reviewer` agent for a structured pass.

Asset scripts (`process-logo.mjs`, `process-portraits.mjs`, `capture-work.mjs`) are one-time
generators whose outputs are already committed. Do not re-run them casually —
`process-portraits.mjs` reads from a OneDrive path that no longer exists on this machine.

## Environment variables

Names only — never values, never in this file. `.env.local` is gitignored and stays that way.

| Variable | Purpose | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, OG tags | Update when a real domain is connected |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com booking event | |
| `RESEND_API_KEY` | Contact form delivery (server-only) | Unset → form shows an email fallback, by design |
| `CONTACT_EMAIL` | Where submissions are delivered | |

## Known state

`npm run lint` currently reports **2 pre-existing errors** (`react-hooks/set-state-in-effect` in
`Navbar.tsx`, `Reveal.tsx`) and 1 unused-import warning. (It was 3: `CountUp.tsx` carried the
third and was deleted when the proof strip that was its only caller was removed.) These come from a rule
that eslint-config-next 16 newly enforces; the code predates it. They are not caused by your
change — but do not add new ones, and do not silence the rule to make the check pass.

## Content Security Policy

`next.config.ts` sets a strict CSP. Any new third-party script, iframe, font or API call must be
added to the matching directive or it will be silently blocked in production. Check the browser
console after adding one.

## Before you call it done

- [ ] `npm run build` passes — **show the output, do not assert it**
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` introduces no new problems beyond the 3 known errors
- [ ] Checked at 390px, 768px and 1440px, in **both** dark and light mode
- [ ] No console errors
- [ ] Screenshot or `visual-qa-reviewer` pass on any page that changed visually

## Do not

- Do not push or deploy unless asked.
- Do not upgrade dependencies as a side effect of unrelated work.
- Do not add sections, pages or abstractions that were not asked for. Marketing pages convert
  by being shorter, not by demonstrating the stack.
- Do not commit `.env*`, real client data, or credentials.
- Do not hardcode copy into components — it belongs in `lib/data/`.

## Code Review Rules

<Read by Codex when it reviews this repo.>

- Flag only gaps affecting **correctness, security, or the stated requirements**. Not style, not
  speculation, not pre-existing issues, not intentional behaviour changes.
- Every finding must name a concrete failing scenario or call path demonstrable from the code.
- Use P0–P3 priorities. Report `No findings.` rather than inventing issues.
- Prefer few high-confidence findings over many uncertain ones.
