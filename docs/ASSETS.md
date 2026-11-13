# Asset inventory

## Supplied (`Anya-Sarre-Hero-Pack.zip`, received 13 Nov 2026)

| File in pack | In project | Used for |
| --- | --- | --- |
| `assets/anya-sarre-hero-desktop.png` (1774×887, 2:1) | `assets/source/` → `public/img/hero-desktop-*.{avif,webp}` | Home hero ≥768px; CSS crops on inner pages |
| `assets/anya-sarre-hero-mobile.png` (1122×1402, ~4:5) | `assets/source/` → `public/img/hero-mobile-*.{avif,webp}` | Home hero <768px; portrait crops (About, Bio, Contact, Styling, Partnerships) |
| `assets/anya-sarre-hero-*.webp` | not used directly | Regenerated at responsive widths from the PNG masters |
| `assets/wordmark-study-inline.svg`, `-stacked.svg` | `assets/brand/` | Header/footer wordmark (recoloured via `currentColor`), favicon, social image. The pack calls these *studies*, **not an approved logo** |
| `crop-settings.json`, `README-crop-guidance.md` | `assets/brand/` | Focal points and safe areas, enforced by `scripts/verify.mjs` |
| `anya-sarre-composition-preview.png/.svg` | PNG in `assets/brand/` | Reference only |
| Proposed colours (`#F3A3BB`, `#F6F1EE`, `#0B0B0C`) | CSS tokens | Palette. Supporting pastels (lilac, mint, butter, peach) are proposal choices |

Responsive images: AVIF + WebP at 480/720/960/1280/1600/native, never upscaled (`npm run images`). `width`/`height` are set; the hero is `fetchpriority="high"`, all other images lazy.

## Disclosure carried into the site

The pack states the **scene around Anya was extended/recomposed with AI** and that the **team members shown are not documented photographs of Anya's staff.** The footer says so, alt text describes the picture without claiming those people are her team, and this must be approved by Anya (see launch confirmations). Image-use rights/credits for the original portrait are not stated in the pack.

## Missing or temporary

| Needed | Status | Temporary treatment |
| --- | --- | --- |
| Approved logo and variations | **Received later (13 Nov, five SVGs):** `anya-sarre-primary-{dark,light}.svg`, `anya-sarre-compact-{dark,light,pink}.svg` in `assets/brand/`. Mixed-case “Anya Sarre”, plain paths, fills `#291C2A` dark, `#ED7BA5` pink, `#FFF8F2` light. Now used for the header and footer wordmark (recoloured via `currentColor`), favicon glyph and social image. **Not yet applied:** the large hero name is still live uppercase Bodoni Moda from the earlier study direction and **no longer matches** this lettering; the site palette still uses the earlier proposed pink `#F3A3BB`/dark `#0B0B0C` rather than `#ED7BA5`/`#291C2A`/`#FFF8F2`. Waiting on the guidelines and the fourth colour before re-toning. No stacked version was supplied, so a stacked hero lockup would need to be cut from the supplied paths or supplied |
| Brand guide and typography guidance | Only three hex values and crop notes | **Bodoni Moda** (display, matches the Didone wordmark) + **DM Sans** (body), both SIL OFL, self-hosted in `public/fonts/` |
| Supporting editorial graphics | None supplied | CSS shapes (rounded blocks, arch crop, hard shadows, rotating “Styled By Anya Inc.” badge, sparkles) |
| Additional photography (work, TV stills, red-carpet) | None supplied. Note: the chat message displayed light-background and studio variants of the hero, but only the dark desktop and mobile files were in the zip | Inner pages reuse CSS crops of the two supplied masters (different regions/scales) |
| Television show marks/posters, official publication mastheads | Not sourced (sites unreachable; rights unconfirmed) | Typeset names |
| Verified video | None found | No “watch” action; the Selected videos section renders automatically once `press.json` has an entry |
| Social image | Built from the hero + wordmark (`public/og.png`, 1200×630) | Rebuild with `node scripts/brand-assets.mjs` if the hero or wordmark changes |
