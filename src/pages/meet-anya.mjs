import { data, esc, button, closingCta, pv, photo } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const rows = [
  ["Business", "Anya heads Styled By Anya Inc.", "Current", "Anya’s bio · Beverly Hills Courier, Nov 12, 2024"],
  ["Television", "Breaks down red-carpet trends on KTLA 5, Entertainment Tonight and Extra; host and curator of the KTLA 5 special “Countdown to Gold: Getting Carpet Ready with Anya Sarre.”", "Recurring", "Anya’s bio · Courier, 2024 · LOCAL Life · KTLA clips in her archive"],
  ["Entertainment Tonight & The Insider", "Credited as head fashion stylist for Entertainment Tonight, The Insider and ET on MTV; presenter of The Insider’s “Look For Less” segments.", "Historical", "944 Magazine (undated) · Life & Style, Jun 15, 2009 · The Hollywood Reporter, Jul 19, 2010"],
  ["Brand roles", "Chief Accessories Stylist for ShoeDazzle; Fashion Director for YouCeleb.", "Per Anya’s bio", "Anya’s bio · archive: ShoeDazzle jewelry collection and YouCeleb “Makeover Monday” columns (c. 2011)"],
  ["Award", "“Best Fashion Stylist for TV,” POSHGLAM Awards.", "Per Anya’s bio", "Anya’s bio · archive: a PoshGlam web feature on her"],
  ["Red carpet", "Clients styled for the Oscars, Golden Globes and Emmys; Variety profiled her award-weekend styling.", "Reported", "Anya’s bio · Courier, 2024 · Variety, Oct 24, 2008"],
  ["Writing & events", "Has written for Us Weekly and OK!; hosted events for Diane von Furstenberg.", "Per Anya’s bio", "Anya’s bio · archive: Us Weekly and OK! pages, a DVF event invitation"],
  ["Teaching", "Teaches styling at FIDM; guest lectures at USC.", "Per Anya’s bio", "Anya’s bio"],
  ["Speaking", "TEDx speaker (TEDxHiltonHead Women).", "Date to confirm", "Anya’s bio · LOCAL Life Q+A"],
  ["Education", "University of Southern California (B.A., communications); Parsons School of Design fashion program.", "—", "944 Magazine Q&A · Courier, 2024"],
  ["Other television", "The Rachael Ray Show, Home & Family, VH1, CBS 2, KCAL 9, Hollywood Today Live (April 22, 2016) and The Hollywood Reporter (China), shown from clips and the show logos on her old Watch Anya page.", "Historical", "Anya’s official Watch Anya archive"],
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
      ${photo({ img: "10-desktop", ratio: "4 / 5", pos: "74% 58%", scale: 1.6, alt: "Pastel fashion still life with a pink satin shoe, lilac cube, blush fabric, silver earrings and makeup brushes.", sizes: "(min-width: 900px) 30vw, 90vw", cls: "story__photo" })}
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
    <div class="section-head">
      <p class="kicker">Approach</p>
      <h2 id="approach-title" class="section-title">How the work feels</h2>
    </div>
    <ol class="approach__list">
      <li class="approach__item approach__item--pink"><span class="approach__num" aria-hidden="true">1</span><h3>Hollywood standards</h3><p>Red-carpet polish: fit, finish and a clear point of view on every look.</p></li>
      <li class="approach__item approach__item--lilac"><span class="approach__num" aria-hidden="true">2</span><h3>Plain-spoken advice</h3><p>Practical guidance anyone can use, from someone who explains style on television.</p></li>
      <li class="approach__item approach__item--mint"><span class="approach__num" aria-hidden="true">3</span><h3>Personality first</h3><p>Expressive, warm and a little quirky. Clothes should sound like the person wearing them.</p></li>
    </ol>
    ${pv("Approach copy is proposal wording that reflects the working brief. Anya should approve or rewrite it.")}
  </div>
</section>

<section class="ledger" aria-labelledby="ledger-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Credentials</p>
        <h2 id="ledger-title" class="section-title">The record, <em>with receipts</em></h2>
      </div>
      <p class="section-sub">Current work is separated from historical credits, and every row names its source.</p>
    </div>
    <div class="table-wrap" tabindex="0" role="region" aria-label="Credentials table, scrollable">
      <table class="ledger__table">
        <caption class="sr-only">Anya Sarre credentials with status and source</caption>
        <thead><tr><th scope="col">Area</th><th scope="col">Detail</th><th scope="col">Status</th><th scope="col">Source</th></tr></thead>
        <tbody>
          ${rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td data-label="Detail">${esc(r[1])}</td><td data-label="Status"><span class="chip chip--${r[2].toLowerCase().replace(/[^a-z]+/g, "-")}">${esc(r[2])}</span></td><td data-label="Source">${esc(r[3])}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>
</section>

${closingCta({ title: "Say hello to <em>Anya.</em>", text: "Share a few lines about the project and Anya can point you to the right route." })}
`,
};
