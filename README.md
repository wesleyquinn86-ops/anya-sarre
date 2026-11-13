# Anya Sarre: concept website (private preview)

> **Status: unsolicited proposal, not published.**
> Prepared by **Built By Wes** (Wesley Quinn) as an independent concept for cold outreach to Anya Sarre. It is **not commissioned, not approved or endorsed by Anya Sarre, and not live.** The preview is `noindex`. Publishing is a separate instruction.

Six-page editorial site: **Home, About, Styling, Media & Press, Brand Partnerships, Contact**. Static HTML/CSS/JS with no runtime framework, built for Cloudflare Pages.

## Quick start

```bash
npm install
npm run build        # private noindex preview -> dist/
npm run preview      # http://localhost:4173 (PORT=... to change)
npm run check        # static checks: links, headings, alt text, SEO tags, JSON-LD
npm run verify       # browser checks (needs Playwright, see below)
```

`npm run verify` builds a second copy with a *mocked* form endpoint (a `.invalid` host intercepted inside the browser), so no real enquiry is ever sent. It looks for Playwright in `node_modules`, `/opt/node22/lib/node_modules`, or `PLAYWRIGHT_PATH`.

## What the supplied graphics pack drives

| From the pack | Where it is used |
| --- | --- |
| Dark monochrome hero, desktop 2:1 and dedicated mobile 4:5 | Home hero (art-directed `<picture>`, switches at 767px), plus CSS-only crops on every inner page |
| Proposed pink `#F3A3BB`, cream `#F6F1EE`, dark `#0B0B0C` | Colour tokens in `src/css/styles.css` |
| Wordmark vector studies (superseded) and the later five supplied logo SVGs | Header/footer wordmark, favicon and social image use the supplied logo SVGs. The hero name is still live uppercase Bodoni Moda (earlier study direction), to be re-cut to the new lettering |
| Focal points and safe areas (`assets/brand/crop-settings.json`) | Hero `object-position` and wordmark placement, asserted by `npm run verify` |

Photographs are never edited, recoloured or stretched; cropping is CSS (`object-position` + scale). See [`docs/ASSETS.md`](docs/ASSETS.md) for the inventory and what is still missing.

## Configuration (all at build time)

| Variable | Purpose |
| --- | --- |
| `BUILD_MODE` | `preview` (default: noindex, preview chrome, draft items) or `production` |
| `SITE_URL` | Production origin, no trailing slash. Drives canonical, Open Graph, JSON-LD, sitemap. **Required for production** |
| `FORM_ENDPOINT` | URL that accepts JSON `POST`s. Without it **no form is rendered** (no simulated success) |
| `CONTACT_EMAIL`, `CONTACT_EMAIL_MEDIA`, `CONTACT_EMAIL_BRANDS`, `CONTACT_EMAIL_STYLING` | Verified addresses; become `mailto:` routes. Production needs `FORM_ENDPOINT` or `CONTACT_EMAIL` |
| `OUT_DIR` | Output directory (default `dist`) |

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
| `src/data/tv.json` | Television credits and speaking, with currency and sources |
| `src/data/press.json` | Coverage entries (type, date, URL, evidence) and a `videos` array (empty: no verified video yet) |
| `src/data/metrics.json` | Every displayed figure with label, source, period, status; plus figures recorded but not displayed |
| `src/data/site.json` | Name, navigation, education, Instagram |
| `src/templates/components.mjs` | Shared marquee, statistic, press, masthead, photo-crop and CTA components |

To add a verified video, add an object to `videos` in `press.json`. To add photography, drop masters in `assets/source/` and run `npm run images` (AVIF + WebP at several widths, never upscaled).

## Accessibility and motion

Skip link, landmarks, one `h1` per page, visible focus, 44px+ targets, reduced-motion support, and no motion without JavaScript. The television marquee has a visible Pause/Resume control, pauses on hover and keyboard focus, has a static readable list for reduced motion, and its duplicate loop copy is `aria-hidden` with no focusable content.

## Further reading

[`docs/SOURCES.md`](docs/SOURCES.md) · [`docs/ASSETS.md`](docs/ASSETS.md) · [`docs/LAUNCH-CONFIRMATIONS.md`](docs/LAUNCH-CONFIRMATIONS.md) · [`docs/CHECKS.md`](docs/CHECKS.md)
