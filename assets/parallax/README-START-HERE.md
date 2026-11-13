# Anya Sarre — three-layer parallax hero

Prepared for Wesley Quinn / Built By Wes. This is a new hero asset set for the existing proposed website. It does not modify the live site or replace the master brand pack.

## The three elements

Each responsive folder contains three aligned PNG canvases. Place them at the same width and height, directly on top of one another:

| Order | File | Content | Background |
| --- | --- | --- | --- |
| Back / z-index 0 | `01-background.png` | Soft blush, sunlit wall | Opaque |
| Middle / z-index 1 | `02-wordmark.png` | Existing Anya Sarre vector lettering in plum | Transparent |
| Front / z-index 2 | `03-anya-cutout.png` | Anya separated from the supplied wall | Transparent |

**Desktop:** 2400 × 1200 px / 2:1. **Mobile:** 1080 × 1350 px / 4:5. Use the dedicated mobile set below about 768px; do not crop the complete desktop scene into a portrait window.

The canvases are aligned for their named size: keep each complete layer at 100% of the hero and do not trim or stretch layers individually. Her hair crosses the lower edge of the wordmark to establish foreground depth while her face remains clear.

## Preview and web-ready files

- `previews/desktop-combined-preview.png` and `previews/mobile-combined-preview.png` show the assembled resting compositions. These are previews, not the layers to animate.
- `previews/parallax-motion-preview.webp` demonstrates the relative movement.
- Open `parallax-preview.html` to try the actual pointer/scroll effect. It is self-contained: all six responsive image sources are embedded, so it works as a standalone file. No package installation or network connection is needed.
- Each `web-ready` subfolder contains a JPEG background, genuine vector SVG lettering and a transparent WebP portrait. The extra wordmark WebP is an alternative where SVG upload is unsupported. For site loading, prefer these lighter exports over PNG.

## Brand and composition

Use the current selected palette, read from the latest handover: rose **#B52B62**, blush **#F2CED8**, ivory **#FFF9F6**, plum **#2B1728**. The wordmark is exactly the existing custom vector artwork from that pack, not a new font setting. The photographic backdrop varies naturally around blush and ivory, with a subtle palm shadow at the upper left.

The foreground was extracted from the supplied `Anya in warm Los Angeles daylight-20.png`; its generated cutout source is retained in `source-assets/anya-native-cutout.png` at 1122 × 1402 px. Keep her existing body proportions, expression, outfit and necklace. The empty background was generated at 1774 × 887 px and resized for the final canvases. Increasing export size does not create extra source detail.

## Parallax placement

The supplied demo uses only these three visible layers. The name moves a little faster than the background, and the portrait moves more slowly in the opposite direction. Keep movement subtle:

| Layer | Relative pointer travel | Scale / overscan |
| --- | --- | --- |
| Background | -0.25 × pointer offset | 1.06 |
| Wordmark | -0.75 × pointer offset | 1.00 |
| Portrait | +0.25 × pointer offset | 1.04 |

Pointer offsets are capped at ±18px horizontally and ±14px vertically; small additional scroll offsets are provided. Keep the container `position:relative; overflow:hidden`, layers absolute, and transform origins centred. The slight background/portrait overscan prevents empty borders or the lower crop being exposed during movement. Disable motion under `prefers-reduced-motion: reduce` as in the demo. Keep a normal, accessible page heading in the site's HTML; the displayed wordmark is artwork.

Desktop wordmark bounds: x 70, y 90, width 2260 px. Foreground source placement and mobile positions are recorded in `placement.json`. Exact raster dimensions and transparency are in `asset-inventory.csv`.

There are no headlines, buttons or navigation baked into the photograph or background layer. The site's headline, intro copy and calls to action can be added separately, using the open space beside Anya. The combined previews include only the three requested elements.
