import { data, esc, closingCta, pv, stat, arrow, photo, icon, button, markFromFile, unscriptedLogos, hasStill } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const { metrics } = data;
const fmt = new Intl.NumberFormat("en-US");

const reasons = [
  { icon: "tv", title: "A trusted face on air", text: "KTLA 5 style expert, with Style Smart segments on LA Unscripted and a record on Entertainment Tonight and The Insider." },
  { icon: "star", title: "Red-carpet credibility", text: "Dresses clients for the Oscars, Golden Globes and Emmys, so a brand borrows real award-season authority." },
  { icon: "tag", title: "Brand-side know-how", text: "Has worked inside brands as Chief Accessories Stylist for ShoeDazzle and Fashion Director for YouCeleb." },
  { icon: "mic", title: "Comfortable with a room", text: "TEDx speaker who has hosted events for Diane von Furstenberg. She can front a launch, not just post about it." },
];

const stills = (slot) => hasStill(slot);
const formats = [
  {
    icon: "chat", tone: "pink", title: "Social content",
    pitch: "Reels and posts that sound like Anya, not like an ad.",
    get: "Product-led Reels, styling tips and shopping edits for fashion, beauty and lifestyle brands.",
    proof: "Instagram @anyasarre",
    img: { img: "support-partnerships-makeup-beauty", ratio: "16 / 10", pos: "50% 45%", alt: "Rose makeup compact, powder brush, lipstick and neutral eyeshadow in soft sunlight.", label: "Illustrative still life" },
  },
  {
    icon: "tv", tone: "lilac", title: "Television & hosting",
    pitch: "Your product, explained by a face Los Angeles already trusts.",
    get: "Sponsored segments, specials and on-air integrations, including Style Smart on KTLA 5’s LA Unscripted.",
    proof: "KTLA 5 · LA Unscripted · Countdown to Gold",
    img: stills("still-ktla-morning-news")
      ? { img: "still-ktla-morning-news", ratio: "16 / 10", pos: "52% 28%", alt: "Anya Sarre on the KTLA 5 Morning News set, smiling in a sequined top and crystal earrings." }
      : { img: "support-media-television-hosting", ratio: "16 / 10", pos: "50% 55%", alt: "Broadcast microphone resting on a rose folio in a softly lit studio.", label: "Illustrative still life" },
  },
  {
    icon: "mic", tone: "blush", title: "Events & appearances",
    pitch: "A host who can hold a room and fill a feed.",
    get: "Hosting, panels, talks and in-store or launch appearances.",
    proof: "TEDx speaker · hosted events for Diane von Furstenberg",
    img: stills("still-tedx-stage")
      ? { img: "still-tedx-stage", ratio: "16 / 10", pos: "72% 40%", alt: "Anya Sarre speaking on a TEDx stage in a black top and gold pleated skirt, with large red TEDx letters behind her." }
      : null,
  },
  {
    icon: "hanger", tone: "peach", title: "Styling collaborations",
    pitch: "Put the product on the carpet.",
    get: "Wardrobe and red-carpet styling tied to a launch, a campaign or an event, with accessories a specialty.",
    proof: "Styled By Anya Inc. · ShoeDazzle accessories",
    img: { img: "support-styling-evening-accessories", ratio: "16 / 10", pos: "50% 50%", alt: "Blush evening clutch, satin sandals and silver earrings with lilac silk.", label: "Illustrative still life" },
  },
  {
    icon: "pen", tone: "lilac", title: "Expert commentary & features",
    pitch: "Trend talk that editors and audiences quote.",
    get: "Quotes, Q&As and trend perspective for editorial and brand storytelling.",
    proof: "Variety · Life & Style · OK! · Us Weekly",
    img: { img: "support-partnerships-fragrance-skincare", ratio: "16 / 10", pos: "50% 45%", alt: "Clear perfume bottle and ivory skincare jar beside a lilac glass dish.", label: "Illustrative still life" },
  },
];

export default {
  path: "/partnerships/",
  active: "partnerships",
  title: "Brand Partnerships: Style Smart on KTLA 5’s LA Unscripted",
  description:
    "Partner with Anya Sarre on Style Smart segments on KTLA 5’s LA Unscripted: primetime broadcast, KTLA.com livestream, worldwide viewing on the KTLA 5 app, and optional national distribution across Nexstar’s 115+ markets.",
  body: `
${pageHero({
  kicker: "Brand Partnerships",
  title: "Brands that want a <em>point of view.</em>",
  lead: "Fashion, beauty and lifestyle collaborations, led by a stylist with television credibility and a big personality.",
  img: { img: "02-desktop", ratio: "4 / 3", pos: "76% 28%", scale: 1, alt: "Anya in pink holding statement jewellery in both raised hands against a pink studio background.", sizes: "(min-width: 900px) 44vw, 90vw", priority: true },
})}

<section class="unscripted" id="unscripted" aria-labelledby="unscripted-title">
  <div class="wrap unscripted__grid">
    <div class="unscripted__main">
      <div class="unscripted__logos">${unscriptedLogos().map((l) => markFromFile(l)).join("")}</div>
      <p class="kicker kicker--pink">Featured opportunity</p>
      <h2 id="unscripted-title" class="section-title">Style Smart on <em>LA Unscripted</em></h2>
      <p class="unscripted__lead">Put your brand in front of Los Angeles on KTLA 5, presented the way only Anya can. Style Smart segments air on KTLA 5’s LA Unscripted, and can travel to markets across the country.</p>
      <p>We partner with you to create your segment. You choose the segment type, whether to feature a brand representative, and the key products, points and offers to highlight.</p>
      <div class="btn-row">${button("Enquire about a feature", "/talk-to-anya/?route=brands#enquiry", "solid")}</div>
    </div>
    <div class="unscripted__side">
      <p class="unscripted__eyebrow">Optional national reach</p>
      <ul class="unscripted__stats">${data.metrics.programmes.unscripted.stats.map((x) => `<li><strong>${esc(x.display)}</strong><span>${esc(x.label)}</span></li>`).join("")}</ul>
      <p class="unscripted__note">Nexstar Media Group’s national footprint, from Anya’s partner deck (2026). A segment can be extended across these markets as an add-on; the figures describe the network, not an audience for one segment.</p>
    </div>
  </div>
  <div class="wrap unscripted__inc">
    <h3 class="unscripted__inc-title">Every feature includes</h3>
    <ul class="unscripted__includes">
      <li>${icon("tv")}<span>Primetime broadcast on KTLA 5</span></li>
      <li>${icon("play")}<span>Livestream on KTLA.com</span></li>
      <li>${icon("globe")}<span>Worldwide viewing on the KTLA 5 app</span></li>
      <li>${icon("camera")}<span>Premium production and an HD copy of your segment</span></li>
      <li>${icon("chat")}<span>Social amplification beyond the broadcast</span></li>
    </ul>
    <p class="unscripted__ctx">LA Unscripted is KTLA 5’s Los Angeles lifestyle show, launched in September 2020 and covering local spots, food and style (<a href="https://nexstar.tv/ktla-to-launch-la-unscripted-fall-2020" rel="noopener noreferrer" target="_blank">Nexstar<span class="sr-only"> (opens in a new tab)</span></a>).</p>
  </div>
</section>

<section class="why" aria-labelledby="why-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Why Anya</p>
        <h2 id="why-title" class="section-title">Four reasons brands <em>book her</em></h2>
      </div>
      <p class="section-sub">Television credibility, red-carpet access, brand experience and stage presence in one person.</p>
    </div>
    <ul class="why__grid">
      ${reasons.map((r) => `<li class="why__item"><span class="why__icon">${icon(r.icon)}</span><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p></li>`).join("")}
    </ul>
  </div>
</section>

<section class="formats" aria-labelledby="formats-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Ways to collaborate</p>
        <h2 id="formats-title" class="section-title">Five ways to work <em>with Anya</em></h2>
      </div>
      <p class="section-sub">Pick one, or combine them into a campaign. Each is built on work she has already done in public.</p>
    </div>
    <ul class="formats__grid">
      ${formats
        .map(
          (f) => `<li class="format format--${f.tone}${f.img ? "" : " format--noimg"}">
        ${f.img ? `<div class="format__media">${photo({ ...f.img, sizes: "(min-width: 900px) 30vw, 94vw", cls: "format__photo" })}<span class="format__badge">${icon(f.icon)}</span></div>` : `<div class="format__media format__media--icon"><span class="format__badge format__badge--big">${icon(f.icon)}</span></div>`}
        <div class="format__body">
          <h3>${esc(f.title)}</h3>
          <p class="format__pitch">${esc(f.pitch)}</p>
          <p class="format__get"><strong>You get</strong> ${esc(f.get)}</p>
          <p class="format__e"><strong>Built on</strong> ${esc(f.proof)}</p>
        </div>
      </li>`
        )
        .join("")}
    </ul>
    ${pv("Formats are proposals drawn from Anya’s public work, not a confirmed rate card. No past clients, prices or campaign results are shown because none were verified.", "pv-note--tight")}
  </div>
</section>

<section class="roles" aria-labelledby="roles-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Brand experience</p>
        <h2 id="roles-title" class="section-title">Roles on <em>the brand side</em></h2>
      </div>
      <p class="section-sub">Anya has worked inside brands as well as alongside them, according to her bio.</p>
    </div>
    <ul class="roles__list">
      <li><h3>ShoeDazzle</h3><p class="roles__title">Chief Accessories Stylist</p><p class="roles__src">Anya’s bio · archive: “Must Haves by Anya Sarre Jewelry for ShoeDazzle” and an Entertainment Tonight segment on the brand (c. 2011)</p></li>
      <li><h3>YouCeleb</h3><p class="roles__title">Fashion Director</p><p class="roles__src">Anya’s bio · archive: her “Makeover Monday” columns on YouCeleb.com (2011)</p></li>
    </ul>
    ${pv("Both titles come from Anya’s bio; the archive shows the work (a jewelry collection, weekly columns) but not the titles. Confirm titles, dates and whether the roles are current.", "pv-note--tight")}
  </div>
</section>
<section class="audience" id="audience" aria-labelledby="audience-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker kicker--pink">Audience, sourced</p>
        <h2 id="audience-title" class="section-title">Three different numbers, <em>kept apart</em></h2>
      </div>
      <p class="section-sub">Followers, single-post views and programme audiences measure different things, so they are never added together.</p>
    </div>

    <div class="audience__grid">
      <article class="audience__cell audience__cell--followers" aria-labelledby="aud-followers">
        <h3 id="aud-followers" class="audience__label">1 · Followers</h3>
        ${stat({ ...metrics.followers, tone: "stat--dark" })}
      </article>

      <article class="audience__cell audience__cell--reels" aria-labelledby="aud-reels">
        <h3 id="aud-reels" class="audience__label">2 · Selected Reel views</h3>
        <p class="audience__lead">Individual posts from the last month. These are examples, not averages, and not guaranteed campaign performance.</p>
        <div class="table-wrap" tabindex="0" role="region" aria-label="Selected Reel views table, scrollable">
          <table class="reels">
            <caption class="sr-only">Selected Instagram Reel view counts, October 10 to November 10, 2026</caption>
            <thead><tr><th scope="col">Published</th><th scope="col">Reel</th><th scope="col" class="num">Views</th></tr></thead>
            <tbody>
              ${metrics.reels
                .slice()
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .map((r) => `<tr><td><time datetime="${r.date}">${esc(r.dateLabel)}</time></td><td><a href="${esc(r.url)}" rel="noopener noreferrer" target="_blank">${esc(r.topic)}<span class="sr-only"> (opens in a new tab)</span></a></td><td class="num"><strong>${esc(fmt.format(r.views))}</strong></td></tr>`)
                .join("")}
            </tbody>
          </table>
        </div>
        <p class="stat__src">Source: <a href="${esc(metrics.reelsMeta.source.url)}" rel="noopener noreferrer" target="_blank">${esc(metrics.reelsMeta.source.name)}<span class="sr-only"> (opens in a new tab)</span></a> · ${esc(metrics.reelsMeta.period)} · <em>Provisional · third-party</em></p>
        ${pv(esc(metrics.reelsMeta.discrepancy), "pv-note--tight pv-note--dark")}
      </article>

      <article class="audience__cell audience__cell--context" aria-labelledby="aud-context">
        <h3 id="aud-context" class="audience__label">3 · Programme context</h3>
        ${stat({ ...metrics.programme })}
      </article>
    </div>
  </div>
</section>

${closingCta({ title: "Have a launch, a line or a <em>campaign</em> in mind?", text: "Tell Anya about the brand, the product and the timeline." })}
`,
};
