import { data, esc, button, closingCta, pv } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const rows = [
  ["Business", "Styled By Anya Inc. is Anya’s styling business.", "Current", "Beverly Hills Courier, Nov 12, 2024"],
  ["Television", "Frequent fashion and style expert on KTLA 5; host and curator of the special “Countdown to Gold: Getting Carpet Ready with Anya Sarre.”", "Recurring", "Beverly Hills Courier, 2024 · LOCAL Life"],
  ["Red carpet", "Clients styled for events including the Oscars, Golden Globes, Emmys and Grammys.", "Reported", "Beverly Hills Courier, Nov 12, 2024"],
  ["Speaking", "Speaker at TEDxHiltonHead Women.", "Date to confirm", "LOCAL Life Q+A"],
  ["Education", "University of Southern California; graduate degree from Parsons School of Design.", "—", "Beverly Hills Courier, Nov 12, 2024"],
  ["Television, earlier", "A 2016 profile lists Entertainment Tonight, Extra, The Insider, The Rachael Ray Show and STYLE Network among her appearances.", "Historical", "Ella+Mila, 2016"],
];

export default {
  path: "/about/",
  active: "about",
  title: "About Anya",
  description:
    "Meet Anya Sarre: Los Angeles celebrity fashion stylist, television style expert and brand influencer. Background, approach and credentials, each with its source.",
  body: `
${pageHero({
  kicker: "About Anya",
  title: "A stylist with a <em>stage voice.</em>",
  lead: "Los Angeles-based celebrity fashion stylist, television fashion, beauty and lifestyle expert, and brand influencer.",
  img: { src: "mobile", ratio: "4 / 5", pos: "52% 44%", scale: 1.35, alt: "Anya Sarre in black and white, wide-eyed, with windswept hair, hoop earrings and an iced drink.", sizes: "(min-width: 900px) 34vw, 90vw", priority: true },
})}

<section class="story" aria-labelledby="story-title">
  <div class="wrap story__grid">
    <div class="story__text">
      <p class="kicker">Who she is</p>
      <h2 id="story-title" class="section-title">Red-carpet expertise, <em>everyday language.</em></h2>
      <p>Anya grew up in the Bay Area, moved to Los Angeles for USC, then earned a graduate degree at Parsons School of Design. Today she works through Styled By Anya Inc., dressing clients for award-season events and explaining fashion to television audiences.</p>
      <p>Her point of view is simple: great style should be exciting and approachable, and a stylist with a big personality is allowed to have fun with it.</p>
      ${pv("The biography is assembled from published profiles. The official bio at anyasarre.com could not be read from the build environment, so personal details, awards and earlier corporate roles still need Anya’s review.")}
    </div>
    <dl class="glance">
      <div><dt>Based in</dt><dd>Los Angeles, California</dd></div>
      <div><dt>Business</dt><dd>Styled By Anya Inc.</dd></div>
      <div><dt>On air</dt><dd>KTLA 5 style expert</dd></div>
      <div><dt>Studied</dt><dd>USC · Parsons School of Design</dd></div>
      <div><dt>Instagram</dt><dd><a href="${esc(data.site.instagram.url)}" rel="noopener noreferrer" target="_blank">${esc(data.site.instagram.handle)}<span class="sr-only"> (opens in a new tab)</span></a></dd></div>
    </dl>
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
