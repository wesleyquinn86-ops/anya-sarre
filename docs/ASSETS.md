# Asset inventory

## Approved identity pack

Source: `Anya-Sarre-Concept-Asset-Pack.zip` (Drive, 70 MB), prepared by Wesley Quinn / Built By Wes, 13 Nov 2026. It was designated **the approved pack for this concept** on 13 Nov 2026. Its own README is kept at `assets/pack/README-START-HERE.md`; it states the pack is an independent concept, **not an approved rebrand** by Anya.

| Pack folder | In the repo | Used for |
| --- | --- | --- |
| `01-Identity/wordmarks/svg` (primary, compact, stacked × dark/light/pink) | `assets/pack/01-Identity/` (SVG + transparent PNG) | **Direction 01, Sculpted Masthead.** Inline SVG recoloured via `currentColor`: *primary* in the header, *stacked* in the hero (desktop) and footer, *compact* in the mobile hero. Genuine vector paths. Decorative where adjacent text supplies the name “Anya Sarre” |
| `01-Identity/brand-tokens.css`, `palette.json` | same | Colour tokens in `src/css/styles.css`: plum `#2B1728`, ivory `#FFF9F6`, rose `#B52B62`, blush `#F2CED8`, dusty pink `#CF91A6`, lilac `#DED5EC`, peach `#F6DBCE` |
| `06-Fonts` | `public/fonts/` (self-hosted) + OFL texts | Bricolage Grotesque (headings, 600, optical size 48; the width axis is used for the condensed marquee names) and DM Sans (body, UI). SIL OFL; licence texts are kept with the fonts |
| `02-Heroes/desktop`, `mobile` (JPEG exports) | `assets/source/hero-NN-{desktop,mobile}.jpg` → `public/img/` (AVIF + WebP, 480–native widths, never upscaled) | See hero allocation below. The PNG masters (~46 MB) stay in Drive |
| `04-Handover` (crop guidance, inventory, contrast ratios, prompts, PDF) | `assets/pack/04-Handover/` | Focal points, copy zones, alt text (reused for the hero) |
| `05-Supporting-Graphics` (open frame, rule, curved tail) | `assets/pack/05-Supporting-Graphics/` | **Not used yet.** The pack asks for one gestural motif per composition, used sparingly |
| `03-Previews` | not copied (Drive) | Reference only |

### Hero allocation (8 of the 10 options)

| Option | Provenance (per pack) | Where used |
| --- | --- | --- |
| **01** Backstage / monochrome | Source-based AI reconstruction | **Home hero** (recommended pairing with Direction 01); a face crop in Selected work |
| 02 Jewellery / pink | Source-based AI reconstruction | Brand Partnerships header |
| 03 Emerald / lilac | Source-based AI reconstruction | Media & Press header |
| 04 Silver / beauty | Source-based AI reconstruction | About header |
| 05 Ivory / couture | Source-based AI reconstruction (lowest-resolution reference, 279×352) | Styling header and red-carpet service crop |
| 08 Rose studio | New AI concept portrait | Contact header |
| 09 L.A. daylight | New AI concept portrait | Home short bio |
| 10 The stylist's edit | New AI concept still life (no person) | Styling, personal-styling service |
| 06 Atelier, 07 Bridal edit | **TV-derived** reconstructions | **Deliberately not used**: they could be mistaken for broadcast stills |

The README advises one hero rather than a carousel; the site uses one home hero and a different option as each inner page's header image.

Placement follows the pack: desktop and mobile files from the **same option**; hero 01 shown at its delivered 2:1 and 4:5 ratios; the wordmark sits in the desktop left field (copy zone 5–37%) and the mobile top field (3–16%); supporting copy sits below the mobile photograph. Other crops use CSS `object-position` and scale from the pack's focal points and are checked per page.

### Contrast on the photograph (measured, hero 01)

Plum against the pixels behind the lettering: desktop wordmark median **7.6:1** (5th percentile 4.1:1, darkest 1% 3.4:1, which is acceptable for large display type); desktop tagline **6.2:1** at worst-1%; mobile wordmark **6.2:1** at worst-1%. Pack palette ratios: plum on ivory 16.0, plum on dusty pink 6.6, ivory on rose 5.8, rose on ivory 5.8. Small text on dusty pink uses plum (not the muted tone) to stay AA; axe checks all pages.

## Disclosure carried into the site

All pack imagery is AI-assisted: **reconstructions from small source photographs, with invented scenes, assistants and details; options 08–10 are newly imagined.** The footer says so, alt text describes pictures without claiming the people shown are Anya's team, and the Instagram/other photography is never mixed in. **Approval of likeness, jewellery detail and permission to use the source photographs are Anya's to give** (pack README), and replacing any option she dislikes with licensed original photography is expected before publication.

## Still missing or temporary

| Needed | Status |
| --- | --- |
| Official publication mastheads, TV network/show marks | Not sourced (pack leaves them out on purpose). Outlet and show names are typeset |
| Verified video | Candidates exist in the wider Drive folder (see `docs/SOURCES.md`); none is published on the site yet |
| High-resolution original photography | Recommended before launch (option 05's reference is only 279×352) |
| The pre-existing Styled by Anya seal | Assessed by the pack but not redrawn or included; not used |
| Social image | `public/og.jpg`, built from hero 01 + the stacked wordmark (`node scripts/brand-assets.mjs`) |
