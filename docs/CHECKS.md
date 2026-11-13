# Checks performed, and limits

Run on 13 November 2026 against the final preview build, **re-run after the site was re-skinned to the approved identity pack** (all 260 browser checks and 650 static checks pass on the re-skinned build).

## Automated (re-runnable)

**`npm run check`: 650 static checks, all passing.** Per page: `lang`, title, meta description, exactly one `h1`, no skipped heading levels, landmarks, skip link, social tags, favicon, `noindex` (preview), every `<img>` has `alt` plus `width`/`height`, every internal link and `#anchor` resolves, every local asset exists, external `_blank` links carry `noopener`, JSON-LD parses, no `undefined`/`NaN` leaking into copy. Plus `_headers`, `og.png`, `favicon.svg`, no sitemap in preview.

**`npm run verify`: 260 browser checks (Chromium via Playwright), all passing.**
* All 6 pages × widths **320, 390, 768, 1024, 1440**: zero console errors/warnings, zero failed or 4xx requests, no horizontal overflow, all images decode, navigation inline ≥1200px; below that a Menu button that opens, lists all links and closes on Escape.
* **axe-core** (WCAG 2.0/2.1/2.2 A+AA and best-practice) on all 6 pages at 390 and 1440: zero violations after fixes (earlier runs caught low-contrast italics on pink, a non-landmark notice bar, and un-focusable scrollable tables; all fixed).
* **Hero (pack option 01)**: mobile master below 768px and desktop above; ratios 4:5 / 2:1; the wordmark box sits inside the pack's copy zones (desktop left field, mobile top field) and clear of the face at 1440/1024/768/767/390. Contrast against the photograph was measured separately (see `docs/ASSETS.md`).
* **Marquee**: sits directly below the hero; animates; visible Pause/Resume; manual pause persists after the pointer leaves; resume works while hovered; hover pauses; keyboard focus pauses; duplicate loop list is `aria-hidden` with no focusable content and equal width (seamless); **reduced-motion emulation** shows a static wrapped list with no control; **JavaScript disabled** shows no animation.
* **Keyboard**: first Tab stop is a visible skip link that moves focus to `main`; first 40 Tab stops all show a focus outline.
* **Contact form**, with the endpoint mocked in-browser (`.invalid` host; nothing real contacted): with no endpoint no form is rendered; route preselected from `?route=`; empty and invalid submits are blocked with `aria-invalid` errors and send nothing; HTTP 500 and network failure show an error and keep the typed data; success is shown only after a 2xx; payload excludes the honeypot; honeypot submissions are dropped.
* External links announce “opens in a new tab”.

**Production gates (manual commands, outputs inspected):** a production build without `SITE_URL`, or without `FORM_ENDPOINT`/`CONTACT_EMAIL`, exits non-zero. A configured build emits canonical + absolute Open Graph URLs, `index, follow`, `sitemap.xml`, an allowing `robots.txt`, JSON-LD `url`, and contains no preview chrome or unconfirmed services. `npm run check` on it then correctly fails on remaining “to confirm” wording.

## Visual inspection (screenshots reviewed)

* **1440px**: all six pages, full length.
* **390px**: all six pages, full length (the credentials table was clipped; now stacks).
* **1024, 1200px and 768px**: home hero and header (the nav wrapped at 1024; breakpoint raised).
* Re-inspected after each CSS/SEO change set; the social image and favicon were viewed directly.
* Found and fixed visually: Menu button showing on desktop, oversized closing headline, footer alignment, repeated face crops on Styling, cropped face on Partnerships, tile empty space, clipped mobile table.

## Performance (uncompressed, from build output)

Home first load ≈ **174 KB desktop / 171 KB mobile** including HTML (31 KB), CSS (40 KB), JS (7 KB), two preloaded fonts (63 KB) and the AVIF hero. The full `dist/` is 2.6 MB, mostly responsive image variants that only load on demand. No third-party scripts, fonts or trackers.

## Not done / limitations

* **Official site unread** (blocked by the site's bot protection; I did not circumvent it). Biography, awards, TV list, press and videos are therefore not verified against it. Most biographical facts are from search summaries of third-party pages that were not opened.
* Browsers: **Chromium only.** No Safari, Firefox or real-device testing; no iOS/Android hardware checks.
* **No screen-reader session** (VoiceOver/NVDA/JAWS). axe and structural checks catch only part of accessibility; the marquee announcement behaviour is verified by DOM structure, not by listening.
* **No Lighthouse/Core Web Vitals run** (no network-throttled lab); figures above are file sizes.
* Widths **320 and intermediate sizes** were checked for overflow and console errors but not all inspected visually.
* External links (Courier, LOCAL Life, Ella+Mila, KTLA, Instagram, Fohr, Paramount) were **not fetched** by the test suite; link text matches the located URLs only.
* The form was tested only against a mocked endpoint. CORS, spam protection and delivery of a real endpoint are untested. **No real enquiry was submitted.**
* The Cloudflare package was built and validated locally; it has **not been deployed** to Cloudflare.
* The environment's network allowlist was extended (with approval) for four research hosts; the official site remained unreachable regardless.
