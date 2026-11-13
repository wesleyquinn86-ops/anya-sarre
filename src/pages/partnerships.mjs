import { data, esc, closingCta, pv, stat, arrow } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const { metrics } = data;
const fmt = new Intl.NumberFormat("en-US");

const formats = [
  { t: "Social content", d: "Reels and posts in Anya’s voice, for fashion, beauty and lifestyle products.", e: "Instagram @anyasarre", tone: "pink" },
  { t: "Television &amp; hosting integrations", d: "A recognizable on-air style expert for segments, specials and sponsored moments.", e: "KTLA 5 · Countdown to Gold", tone: "lilac" },
  { t: "Events &amp; appearances", d: "Hosting, panels and talks with a stylist who can hold a room.", e: "TEDxHiltonHead Women", tone: "mint" },
  { t: "Styling collaborations", d: "Wardrobe and red-carpet styling tied to a launch, campaign or event.", e: "Styled By Anya Inc.", tone: "butter" },
  { t: "Expert commentary &amp; features", d: "Quotes, Q&amp;As and trend perspective for editorial and brand storytelling.", e: "LOCAL Life · Beverly Hills Courier", tone: "peach" },
];

export default {
  path: "/partnerships/",
  active: "partnerships",
  title: "Brand Partnerships",
  description:
    "Collaborate with Anya Sarre: fashion, beauty and lifestyle partnerships backed by television credibility. Sourced audience figures, each labelled with its source and date.",
  body: `
${pageHero({
  kicker: "Brand Partnerships",
  title: "Brands that want a <em>point of view.</em>",
  lead: "Fashion, beauty and lifestyle collaborations, led by a stylist with television credibility and a big personality.",
  img: { img: "02-desktop", ratio: "4 / 3", pos: "76% 28%", scale: 1, alt: "Anya in pink holding statement jewellery in both raised hands against a pink studio background.", sizes: "(min-width: 900px) 44vw, 90vw", priority: true },
})}

<section class="formats" aria-labelledby="formats-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Ways to collaborate</p>
        <h2 id="formats-title" class="section-title">Five formats, <em>one voice</em></h2>
      </div>
      <p class="section-sub">Each format points to public work it builds on.</p>
    </div>
    <ul class="formats__grid">
      ${formats.map((f, i) => `<li class="format format--${f.tone}"><p class="format__n" aria-hidden="true">0${i + 1}</p><h3>${f.t}</h3><p>${f.d}</p><p class="format__e">Builds on: ${f.e}</p></li>`).join("")}
    </ul>
    ${pv("Formats are proposals drawn from Anya’s public work, not a confirmed rate card. No past clients, prices or campaign results are shown because none were verified.", "pv-note--tight")}
  </div>
</section>

<section class="audience" id="audience" aria-labelledby="audience-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker kicker--pink">Audience, sourced</p>
        <h2 id="audience-title" class="section-title">Four different numbers, <em>kept apart</em></h2>
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
        <p class="context__caveat"><strong>Not Anya’s audience.</strong> It describes a whole television programme. It is shown because Entertainment Tonight appears among Anya’s television credits, with the date of that credit still to be confirmed.</p>
      </article>

      <article class="audience__cell audience__cell--missing" aria-labelledby="aud-missing">
        <h3 id="aud-missing" class="audience__label">4 · Not yet available</h3>
        <ul class="missing">
          <li>Ratings for any individual television segment</li>
          <li>Verified unique reach and impressions</li>
          <li>Audience demographics confirmed as Anya’s own</li>
          <li>Campaign results</li>
        </ul>
        <p class="audience__lead">A current media kit with Instagram Insights is the right source. Request it through the enquiry form.</p>
      </article>
    </div>
  </div>
</section>

${closingCta({ title: "Have a launch, a line or a <em>campaign</em> in mind?", text: "Tell Anya about the brand, the product and the timeline." })}
`,
};
