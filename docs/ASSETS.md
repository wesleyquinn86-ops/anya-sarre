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

### Hero allocation

**Home hero: concept 2 from the earlier hero set** (pure-white studio, 1942×809, 2.4:1; Drive file `anya sarre hero image concept2.png`), chosen on 13 Nov 2026 as the classiest of five concept frames (concepts 1–5 in Drive). Desktop shows the full frame; **mobile is a 4:5 crop of the same photograph** (647×809, native pixels, not upscaled: x 1090–1737 of the frame, which keeps her face, brush, comb and phone hands) because no mobile version of this frame exists. A true mobile composition from the same shoot would be sharper on 3× phones. The wordmark sits in the clear left field on desktop and above the photograph on mobile, so nothing overlays her face.

The approved pack's own **option 01** (grey backstage, two assistants, no drink) is no longer used on the site. Its README describes it as a correction of the earlier frames, which it says contained **ambiguous hands, a cup and extra disconnected hands**. The chosen frame was therefore checked on screen at 1440 and 390 for hand/finger plausibility, but it carries the risk the pack author flagged and **needs Anya's and a retoucher's eye**.

Inner-page header images come from the approved pack:

| Option | Provenance (per pack) | Where used |
| --- | --- | --- |
| 02 Jewellery / pink | Source-based AI reconstruction | Brand Partnerships header |
| 03 Emerald / lilac | Source-based AI reconstruction | Media & Press header |
| 04 Silver / beauty | Source-based AI reconstruction | About header |
| 05 Ivory / couture | Source-based AI reconstruction (lowest-resolution reference, 279×352) | Styling header and red-carpet service crop |
| 08 Rose studio | New AI concept portrait | Contact header |
| 09 L.A. daylight | New AI concept portrait | Home short bio |
| 10 The stylist's edit | New AI concept still life (no person) | Styling, personal-styling service |
| 01 Backstage; 06 Atelier; 07 Bridal edit | 01 source-based; 06 and 07 **TV-derived** reconstructions | **Not used.** 06 and 07 could be mistaken for broadcast stills |

Home hero crops reuse the chosen frame for the Selected work tile. The pack advises one hero rather than a carousel; the site uses one home hero and a different image as each inner page's header.

Placement follows the pack's principles: desktop and mobile versions of the same image; the delivered aspect ratios shown without extra cropping where possible; supporting copy below the mobile photograph. Other crops use CSS `object-position` and scale from the pack's focal points and are checked per page.

### Contrast on the photograph (measured)

Plum against the pixels behind the lettering on the chosen home hero: see the figures in `docs/CHECKS.md` (all well above AA for the wordmark and tagline; on mobile the wordmark sits on the ivory page, not on the photograph). Pack palette ratios: plum on ivory 16.0, plum on dusty pink 6.6, ivory on rose 5.8, rose on ivory 5.8. Small text on dusty pink uses plum (not the muted tone) to stay AA; axe checks all pages.

## Disclosure carried into the site

All pack imagery is AI-assisted: **reconstructions from small source photographs, with invented scenes, assistants and details; options 08–10 are newly imagined.** The footer says so, alt text describes pictures without claiming the people shown are Anya's team, and the Instagram/other photography is never mixed in. **Approval of likeness, jewellery detail and permission to use the source photographs are Anya's to give** (pack README), and replacing any option she dislikes with licensed original photography is expected before publication.

## Still missing or temporary

| Needed | Status |
| --- | --- |
| Official publication mastheads | Not sourced; outlet names are typeset |
| TV show marks | **Done.** The ten show logos from Anya's old Watch Anya page (`assets/logos/`, copied to `public/img/logos/`) are used in the marquee and Media ledger, with the show name as alt text. They are small originals (≤240 px wide, shown at ≤ half native height to stay sharp), some on white or coloured backgrounds, so each sits on a white or plum plate. The ET mark is the older “ET HD” version. Used on the site owner's instruction; the networks' rights are theirs |
| Video | Four KTLA clips from the wider Drive archive are on the Media page in the preview only (gitignored, rights unconfirmed, no captions); see `docs/SOURCES.md` |
| High-resolution original photography | Recommended before launch (option 05's reference is only 279×352) |
| The pre-existing Styled by Anya seal | Assessed by the pack but not redrawn or included; not used |
| Social image | `public/og.jpg`, built from hero 01 + the stacked wordmark (`node scripts/brand-assets.mjs`) |
