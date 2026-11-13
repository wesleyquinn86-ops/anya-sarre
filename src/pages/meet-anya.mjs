import { data, esc, button, closingCta, pv, photo, icon, arrow } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

// No status or timeline column; rows are grouped by theme.
const groups = [
  {
    title: "At work",
    rows: [
      ["briefcase", "Business", "Anya heads Styled By Anya Inc.", "Anya’s bio · Beverly Hills Courier, Nov 12, 2024"],
      ["tv", "Television", "Breaks down red-carpet trends on KTLA 5, Entertainment Tonight and Extra. Presents Style Smart segments on KTLA 5’s LA Unscripted, and is host and curator of the KTLA 5 special “Countdown to Gold: Getting Carpet Ready with Anya Sarre.”", "Anya’s bio · Courier, 2024 · LOCAL Life · KTLA clips in her archive"],
      ["star", "Red carpet", "Dresses clients for the Oscars, Golden Globes and Emmys. Variety profiled her award-weekend styling.", "Anya’s bio · Courier, 2024 · Variety, Oct 24, 2008"],
      ["book", "Teaching", "Teaches styling at FIDM and guest lectures at USC.", "Anya’s bio"],
    ],
  },
  {
    title: "Brands, media & recognition",
    rows: [
      ["tv", "Entertainment Tonight & The Insider", "Credited as head fashion stylist for Entertainment Tonight, The Insider and ET on MTV, and presenter of The Insider’s “Look For Less” segments.", "944 Magazine · Life & Style, Jun 15, 2009 · The Hollywood Reporter, Jul 19, 2010"],
      ["tag", "Brand roles", "Chief Accessories Stylist for ShoeDazzle and Fashion Director for YouCeleb.", "Anya’s bio · ShoeDazzle jewelry collection and YouCeleb “Makeover Monday” columns in her archive"],
      ["award", "Award", "“Best Fashion Stylist for TV,” POSHGLAM Awards.", "Anya’s bio · a PoshGlam web feature on her in her archive"],
      ["pen", "Writing & events", "Has written for Us Weekly and OK! and hosted events for Diane von Furstenberg.", "Anya’s bio · Us Weekly and OK! pages and a DVF event invitation in her archive"],
      ["mic", "Speaking", "TEDx speaker, at TEDxHiltonHead Women.", "Anya’s bio · LOCAL Life Q+A"],
      ["tv", "More television", "The Rachael Ray Show, Home & Family, VH1, CBS 2, KCAL 9, Hollywood Today Live and The Hollywood Reporter (China).", "Clips and show logos on her old Watch Anya page"],
    ],
  },
  {
    title: "Education",
    rows: [["cap", "Education", "University of Southern California (B.A., communications), then the fashion program at Parsons School of Design.", "944 Magazine Q&A · Courier, 2024"]],
  },
];

const pillars = [
  {
    tone: "pink",
    icon: "award",
    title: "Hollywood standards",
    text: "Red-carpet polish: fit, finish and a clear point of view on every look.",
    quote: "A major award weekend involves 48 hours of glittering madness.",
    cite: "Variety, October 24, 2008",
    img: { img: "support-styling-evening-accessories", ratio: "16 / 10", pos: "66% 40%", scale: 1.35 },
    href: "/styling/",
    link: "Red-carpet styling",
  },
  {
    tone: "lilac",
    icon: "chat",
    title: "Plain-spoken advice",
    text: "Practical guidance anyone can use, from someone who explains style on television.",
    quote: "Layer long necklaces to lengthen and slim your silhouette.",
    cite: "Life & Style, June 15, 2009",
    img: { img: "support-styling-wardrobe-edit", ratio: "16 / 10", pos: "60% 45%", scale: 1.4 },
    href: "/media/#coverage",
    link: "Anya in the press",
  },
  {
    tone: "blush",
    icon: "sparkles",
    title: "Personality first",
    text: "Expressive, warm and a little quirky. Clothes should sound like the person wearing them.",
    quote: "My personal style is feminine, flirty and glam.",
    cite: "944 Magazine, “Woman of Power”",
    img: { img: "support-partnerships-makeup-beauty", ratio: "16 / 10", pos: "62% 24%", scale: 1.4 },
    href: "/partnerships/",
    link: "Work together",
  },
];

export default {
  path: "/meet-anya/",
  active: "meet",
  title: "Meet Anya",
  description:
    "Meet Anya Sarre: Los Angeles celebrity fashion stylist, television style expert and brand influencer. Background, approach and credentials, each with its source.",
  body: `
${pageHero({
  kicker: "Meet Anya",
  title: "A stylist with a <em>stage voice.</em>",
  lead: "Los Angeles-based celebrity fashion stylist, television fashion, beauty and lifestyle expert, and brand influencer.",
  img: { img: "04-mobile", ratio: "4 / 5", pos: "65% 44%", scale: 1, alt: "Black-and-white three-quarter concept portrait of Anya with wavy blonde hair and a large crystal earring.", sizes: "(min-width: 900px) 34vw, 90vw", priority: true },
})}

<section class="story" aria-labelledby="story-title">
  <div class="wrap story__grid">
    <div class="story__text">
      <p class="kicker">Who she is</p>
      <h2 id="story-title" class="section-title">${data.bio.heading}</h2>
      ${data.bio.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("\n      ")}
      ${pv("This is Anya’s updated bio, used as written. Several claims (the ShoeDazzle and YouCeleb titles, the POSHGLAM award, FIDM and USC teaching, Extra, writing for Us Weekly and OK!) are not documented in the archive, so check each against Anya before launch. See docs/SOURCES.md.")}
    </div>
    <div class="story__side">
      ${photo({ img: "02-mobile", ratio: "4 / 5", pos: "50% 36%", scale: 1, alt: "Anya in pink holding statement jewelry in both raised hands against a pink studio background.", sizes: "(min-width: 900px) 30vw, 90vw", cls: "story__photo" })}
      <dl class="glance">
        <div><dt>Based in</dt><dd>Los Angeles, California</dd></div>
        <div><dt>Heads</dt><dd>Styled By Anya Inc.</dd></div>
        <div><dt>On air</dt><dd>KTLA, Entertainment Tonight, Extra</dd></div>
        <div><dt>Studied</dt><dd>USC · Parsons School of Design</dd></div>
        <div><dt>Instagram</dt><dd><a href="${esc(data.site.instagram.url)}" rel="noopener noreferrer" target="_blank">${esc(data.site.instagram.handle)}<span class="sr-only"> (opens in a new tab)</span></a></dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="approach" aria-labelledby="approach-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Approach</p>
        <h2 id="approach-title" class="section-title">How the work <em>feels</em></h2>
      </div>
      <p class="section-sub">Three ideas Anya keeps coming back to, each in her own words from the press.</p>
    </div>
    <ul class="pillars">
      ${pillars
        .map(
          (p) => `<li class="pillar pillar--${p.tone}">
        <div class="pillar__media">
          ${photo({ ...p.img, alt: "", sizes: "(min-width: 900px) 30vw, 90vw", cls: "pillar__photo" })}
          <span class="pillar__badge">${icon(p.icon)}</span>
        </div>
        <div class="pillar__body">
          <h3 class="pillar__title">${esc(p.title)}</h3>
          <p>${esc(p.text)}</p>
          <figure class="pillar__quote">
            <blockquote><p>“${esc(p.quote)}”</p></blockquote>
            <figcaption>${esc(p.cite)}</figcaption>
          </figure>
          <a class="pillar__link" href="${p.href}">${esc(p.link)} ${arrow}</a>
        </div>
      </li>`
        )
        .join("")}
    </ul>
    ${pv("The three principles are proposal wording; the quotes are Anya’s own words from the press scans in her archive. Anya should approve or rewrite the principles.")}
  </div>
</section>

<section class="ledger" aria-labelledby="ledger-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Credentials</p>
        <h2 id="ledger-title" class="section-title">The record, <em>with receipts</em></h2>
      </div>
      <p class="section-sub">Where Anya works, the brands and media behind her, and where she studied. Every row names its source.</p>
    </div>
    <div class="table-wrap" tabindex="0" role="region" aria-label="Credentials table, scrollable">
      <table class="ledger__table">
        <caption class="sr-only">Anya Sarre credentials with their sources, grouped into work, brands and media, and education</caption>
        <thead><tr><th scope="col">Area</th><th scope="col">Detail</th><th scope="col">Source</th></tr></thead>
        ${groups
          .map(
            (g) => `<tbody>
          <tr class="ledger__group"><th scope="colgroup" colspan="3">${esc(g.title)}</th></tr>
          ${g.rows.map((r) => `<tr><th scope="row"><div class="ledger__area"><span class="ledger__icon">${icon(r[0])}</span><span>${esc(r[1])}</span></div></th><td>${esc(r[2])}</td><td data-label="Source">${esc(r[3])}</td></tr>`).join("\n          ")}
        </tbody>`
          )
          .join("\n        ")}
      </table>
    </div>
  </div>
</section>

${closingCta({ title: "Say hello to <em>Anya.</em>", text: "Share a few lines about the project and Anya can point you to the right route." })}
`,
};
