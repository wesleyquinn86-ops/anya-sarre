# Anya Sarre: concept website (private preview)

> **Status: unsolicited proposal, not published.**
> Prepared by **Built By Wes** (Wesley Quinn) as an independent concept for cold outreach to Anya Sarre. It is **not commissioned, not approved or endorsed by Anya Sarre, and not live.** The preview is `noindex`. Publishing is a separate instruction.

Six-page editorial site: **Home, Meet Anya, Styling, Media & Press, Brand Partnerships, Talk to Anya** (`/about/` → `/meet-anya/` and `/contact/` → `/talk-to-anya/` via `public/_redirects`). Static HTML/CSS/JS with no runtime framework, built for Cloudflare Pages.

## Quick start

```bash
npm install
npm run build        # private noindex preview -> dist/
npm run preview      # http://localhost:4173 (PORT=... to change)
npm run check        # static checks: links, headings, alt text, SEO tags, JSON-LD
npm run verify       # browser checks (needs Playwright, see below)
```

`npm run verify` builds a second copy with a *mocked* form endpoint (a `.invalid` host intercepted inside the browser), so no real enquiry is ever sent. It looks for Playwright in `node_modules`, `/opt/node22/lib/node_modules`, or `PLAYWRIGHT_PATH`.

## What the approved identity pack drives

| From the pack | Where it is used |
| --- | --- |
| **Direction 01, Sculpted Masthead** wordmark (primary, compact, stacked SVG) | Header, footer, hero lettering, favicon, social image |
| Palette: plum, ivory, rose, blush, dusty pink, lilac, peach | Colour tokens in `src/css/styles.css`; pink leads, plum gives weight |
| Bricolage Grotesque 600 + DM Sans (self-hosted, OFL) | Headings and body |
| Hero options (desktop 2:1 + mobile 4:5) | Inner pages use options 02, 03, 04, 05, 08, 09, 10; the **home hero is concept 2** from the earlier hero set, chosen as the classiest (see `docs/ASSETS.md`) |
| Crop and focal-point guidance, alt text | Hero placement and per-page crops, checked at every breakpoint |

All pack imagery is **AI-assisted** (reconstructions with invented scenes; not documentary photographs) and needs Anya's approval before publication. See [`docs/ASSETS.md`](docs/ASSETS.md).

## Configuration (all at build time)

| Variable | Purpose |
| --- | --- |
| `BUILD_MODE` | `preview` (default: noindex, preview chrome, draft items) or `production` |
| `SITE_URL` | Production origin, no trailing slash. Drives canonical, Open Graph, JSON-LD, sitemap. **Required for production** |
| `FORM_ENDPOINT` | URL that accepts JSON `POST`s. Without it **no form is rendered** (no simulated success) |
| `CONTACT_EMAIL`, `CONTACT_EMAIL_MEDIA`, `CONTACT_EMAIL_BRANDS`, `CONTACT_EMAIL_STYLING` | Verified addresses; become `mailto:` routes. Production needs `FORM_ENDPOINT` or `CONTACT_EMAIL` |
| `HERO` | Home banner: `1` studio portrait (default) or `2` three-layer parallax. The preview shows a switch (and a one-time note popup) so Anya can compare; **production has no switch and uses this value**, so set `HERO=2` once she chooses it |
| `OUT_DIR` | Output directory (default `dist`) |
| `PREVIEW_NOTES=1` | Show the yellow “Preview note” boxes (hidden by default; they hold the review caveats that also live in `docs/`) |

Production example:

```bash
BUILD_MODE=production SITE_URL=https://example.com CONTACT_EMAIL=… FORM_ENDPOINT=… npm run build && OUT_DIR=dist npm run check
```

The production build **refuses to run** without `SITE_URL` and an enquiry route. `npm run check` then **fails while any “to confirm” placeholder wording remains in public copy**, so launch is gated on [`docs/LAUNCH-CONFIRMATIONS.md`](docs/LAUNCH-CONFIRMATIONS.md). Production also omits preview notes and unconfirmed services, and writes `sitemap.xml` and an allowing `robots.txt`.

## Cloudflare Pages

* Framework preset: none. **Build command** `npm install && npm run build`. **Output directory** `dist`. Node 22.
* A prebuilt copy of the preview is in `deliverables/anya-sarre-preview-dist.zip` (direct upload).
* `dist/_headers` sets security headers, a CSP, long-cache for fonts/images, and `X-Robots-Tag: noindex` in preview. `dist/robots.txt` disallows everything in preview.
* **Keep the preview private.** `noindex` stops indexing but not access. Put the preview URL behind Cloudflare Access (or a similar gate) before sharing links.
* `wrangler.jsonc` is included for `wrangler pages deploy`.

## Content is data

| File | Holds |
| --- | --- |
| `src/data/tv.json` | Television credits (each with its official logo) and speaking, with currency and sources |
| `src/data/press.json` | Coverage entries (type, date, URL, evidence) and `videos` (broadcaster clips; see below) |
| `src/data/metrics.json` | Every displayed figure with label, source, period, status; plus figures recorded but not displayed |
| `src/data/site.json` | Name, tagline, navigation, education, Instagram |
| `src/templates/components.mjs` | Shared marquee, statistic, press, masthead, photo-crop and CTA components |

To add a verified video, add an object to `videos` in `press.json`. To add photography, drop exports in `assets/source/` named `hero-NN-desktop.jpg` / `hero-NN-mobile.jpg` and run `npm run images` (AVIF + WebP at several widths, never upscaled), then reference them with `photo({ img: "NN-desktop", … })`.

## Videos and the public repository

The four KTLA clips are **broadcaster footage whose rights are unconfirmed**, and **this GitHub repository is public**, so `public/video/` is gitignored and never committed. Videos render only when the files exist locally; production also needs `"rights": "cleared"` per clip. Two zips are produced:

* `deliverables/anya-sarre-preview-dist.zip` (committed): `SKIP_VIDEO=1 OUT_DIR=dist-novideo node scripts/build.mjs`, no clips.
* `private-deliverables/anya-sarre-preview-with-videos.zip` (gitignored, local only): the full `dist/` with clips (24 MB).

**Make the repository private** before sharing links (GitHub → Settings → Danger zone → Change visibility).

The press-page scans (105 magazine and web page images) and the two real photographs (KTLA Morning News, TEDx) are handled the same way: `assets/private/` and `public/img/still-*` are gitignored and ship only in the private zip; production needs `STILLS_CLEARED=1` (photos) / `PRESS_CLEARED=1` (press scans). Process scans with `node scripts/press.mjs`.

## Home banner options

Option 1 is the studio portrait. Option 2 is a three-layer parallax built from `public/img/parallax/` (backdrop, wordmark, portrait; separate desktop and mobile compositions; notes in `assets/parallax/`). As the page scrolls the layers move at three different paces (backdrop 0.78x, portrait 0.92x, name 1.35x of the scroll), with a gentle pointer drift on desktop. The backdrop extends above the stage so no edge is ever exposed, the layers rest exactly in place at the top, and reduced-motion visitors get the still composition. In the preview, a note from Wes opens once as a popup, a pill at the bottom of the screen switches between the options (choice remembered; `?hero=2` and `?note=1` force them), and its Note button reopens the message.

## Tickers (auto-scrolling bands)

The television band and the "As featured in" banner share one component: `ticker()` in `src/templates/components.mjs`, enhanced by `src/js/main.js`. Each ticker is independent (own pause state and screen-reader name). The script measures one list, clones it to fill any width (checked at 390, 1440 and 2560px) and loops by exactly one list width, so there is no visible join. The banner is slower and runs the opposite way. To add a ticker, call `ticker({ id, title, name, listLabel, itemsHtml, direction, speed })`.

## Accessibility and motion

Skip link, landmarks, one `h1` per page, visible focus, 44px+ targets, reduced-motion support, and no motion without JavaScript. Every ticker has a visible Pause/Resume control that names what it controls, pauses on hover and keyboard focus, idles when off-screen, falls back to a static wrapped list for reduced motion and without JavaScript, and its cloned loop copies are `aria-hidden` with no tab stops. Links inside a moving ticker are skipped by Tab while it moves (a moving target cannot be tabbed to) and remain clickable; a static link to the same place is always offered, and in reduced-motion mode they are normal tab stops.

## Further reading

[`docs/SOURCES.md`](docs/SOURCES.md) · [`docs/ASSETS.md`](docs/ASSETS.md) · [`docs/LAUNCH-CONFIRMATIONS.md`](docs/LAUNCH-CONFIRMATIONS.md) · [`docs/CHECKS.md`](docs/CHECKS.md)
