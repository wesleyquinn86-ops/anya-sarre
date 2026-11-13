# Anya Sarre — hero photography

The dark monochrome hero edit is the starting point. The supplied original portrait is the reference for Anya’s identity, clothing, body proportions and expression. The surrounding scene and portrait framing have been extended/recomposed with AI. The team members in the extended scene should not be treated as documented photographs of Anya’s actual staff.

## Clean image exports

| Asset | Native dimensions | Aspect | Recommended use |
| --- | --- | --- | --- |
| assets/anya-sarre-hero-desktop.png | 1774 × 887 | 2:1 | Desktop master, no graphics |
| assets/anya-sarre-hero-desktop.webp | 1774 × 887 | 2:1 | Optimised desktop web image |
| assets/anya-sarre-hero-mobile.png | 1122 × 1402 | approximately 4:5 | Mobile master, no graphics |
| assets/anya-sarre-hero-mobile.webp | 1122 × 1402 | approximately 4:5 | Optimised mobile web image |

The photographs contain no baked headlines, logos, buttons or pink treatment. PNGs retain the native generated resolution; WebPs use quality 88 without resizing or additional cropping. Do not upscale them expecting new photographic detail.

## Focal points and crop guidance

Coordinates are percentages measured from the top-left of the image. Focal points refer to Anya’s eyes/upper face and are starting values for CSS alignment if slight cropping is required.

| Format | Face focal point | Text/wordmark safe area | Crop guidance |
| --- | --- | --- | --- |
| Desktop | x 71%, y 46% | x 4–29%, y 20–74% | Keep the 2:1 frame. Protect Anya’s hair, eyes, both earrings and shoulders, and the hair stylist’s raised hand/head. Avoid further vertical cropping: the cup reaches the lower edge. |
| Mobile | x 52%, y 49% | x 7–93%, y 4–12% | Use this dedicated portrait rather than cropping the desktop. Keep a 4:5 frame. The lower drink, neckline and own forearm should stay visible; the upper dark area is for branding. |

Use the mobile image below roughly 768px as a practical starting breakpoint, then check the actual layout. Both full compositions should normally be displayed with width:100%; height:auto. For a fixed-ratio image element, object-fit:cover with the same supplied aspect ratio avoids material cropping. If the container ratio changes, recheck the entire styling scene rather than relying on the focal point alone.

```html
<picture>
  <source media="(max-width: 767px)" srcset="assets/anya-sarre-hero-mobile.webp" type="image/webp">
  <source srcset="assets/anya-sarre-hero-desktop.webp" type="image/webp">
  <img class="hero-photo" src="assets/anya-sarre-hero-desktop.png" width="1774" height="887"
       alt="Black-and-white portrait of Anya Sarre holding an iced drink while a team styles her hair and makeup."
       fetchpriority="high">
</picture>
```

```css
.hero-photo { display:block; width:100%; height:auto; aspect-ratio:2 / 1;
  object-fit:cover; object-position:71% 46%; }
@media (max-width:767px) {
  .hero-photo { aspect-ratio:4 / 5; object-position:52% 49%; }
}
```

Do not stretch or horizontally mirror the photograph. Check intermediate widths, the top hair/comb overlap, both earrings, makeup brush and phone before approving any alternative crop.

## Separate composition preview

- anya-sarre-composition-preview.png shows desktop and mobile together with the proposed wordmark.
- anya-sarre-composition-preview.svg is self-contained and keeps photography and vector lettering in separate layers.
- assets/wordmark-study-stacked.svg and assets/wordmark-study-inline.svg are editable vector studies of the name, not a supplied or approved official logo.
- Proposed pink: **#F3A3BB**. Background around the images: **#F6F1EE**. Dark web backdrop: **#0B0B0C**.

Desktop uses stacked pink lettering in the left negative space. Mobile puts a single-line pink wordmark above the scene. Pink is applied to the separate graphic layer and surrounding rules only; the photos remain monochrome. The preview deliberately leaves Anya’s face and working hands unobstructed. Keep lettering live or as a separate SVG when building the site.

Visual checks covered visible finger counts, natural arm ownership, brush and comb shapes, phone/hair overlaps, earrings, rings, cup/straw, depth and consistent lighting. 
