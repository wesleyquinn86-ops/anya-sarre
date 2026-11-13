import { data, esc, closingCta, pv, pressList, stat, button } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const { tv, press, metrics } = data;
const credits = tv.credits;
const currencyLabel = { recurring: "Recurring · recent", historical: "Earlier · 2016 profile" };
const entries = press.entries.filter((e) => e.display);
const videos = press.videos || [];

export default {
  path: "/media/",
  active: "media",
  title: "Media & Press",
  description:
    "Television credits, hosting, speaking and press coverage for Anya Sarre, with roles, dates and sources, for producers and event organisers.",
  body: `
${pageHero({
  kicker: "Media & Press",
  title: "On air, on stage, <em>on record.</em>",
  lead: "Television, hosting, speaking and coverage, with the role and source for each.",
  img: { img: "03-desktop", ratio: "4 / 3", pos: "76% 32%", scale: 1, alt: "Concept portrait of Anya in emerald green with a statement necklace and one hand at her temple against a lilac background.", sizes: "(min-width: 900px) 44vw, 90vw", priority: true },
})}

<section class="tvlist" id="television" aria-labelledby="tvlist-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Television</p>
        <h2 id="tvlist-title" class="section-title">Credits, <em>dated honestly</em></h2>
      </div>
      <p class="section-sub">Appearances over the years. Each line says whether it is recent or from an earlier profile.</p>
    </div>
    <ul class="tvlist__rows">
      ${credits
        .map(
          (c) => `<li class="tvrow tvrow--${c.currency}">
        <p class="tvrow__show tv--${c.style}">${esc(c.show)}</p>
        <p class="tvrow__role">${esc(c.role)}</p>
        <p class="tvrow__net">${esc(c.network)}</p>
        <p class="tvrow__cur"><span class="chip chip--${c.currency}">${esc(currencyLabel[c.currency])}</span></p>
      </li>`
        )
        .join("")}
    </ul>
    ${pv("Recent roles outside KTLA 5, and the complete official credit list, need Anya’s confirmation. Show names are typeset; authentic show marks were not sourced.", "pv-note--tight")}
  </div>
</section>

<section class="speaking" id="speaking" aria-labelledby="speaking-title">
  <div class="wrap speaking__grid">
    <div>
      <p class="kicker kicker--pink">Hosting &amp; speaking</p>
      <h2 id="speaking-title" class="section-title">Comfortable with a <em>room.</em></h2>
    </div>
    <ul class="speaking__list">
      <li>
        <h3>Host &amp; curator · KTLA 5</h3>
        <p>“Countdown to Gold: Getting Carpet Ready with Anya Sarre,” an awards-season television special.</p>
        <p class="speaking__src">LOCAL Life Q+A · broadcast date to confirm</p>
      </li>
      <li>
        <h3>Speaker · TEDxHiltonHead Women</h3>
        <p>Anya’s TEDx talk is described as a highlight of her career. TEDx appears here, under speaking, rather than as a television credit.</p>
        <p class="speaking__src">LOCAL Life Q+A · talk title and date to confirm</p>
      </li>
    </ul>
  </div>
</section>

${
  videos.length
    ? `<section class="videos" id="videos" aria-labelledby="videos-title"><div class="wrap"><h2 id="videos-title" class="section-title">Selected videos</h2></div></section>`
    : pv("Selected videos: no verified, embeddable video was located, so there is no “watch” action yet. Add a video entry to src/data/press.json and the section renders automatically, with click-to-load playback.", "pv-note--page")
}

<section class="coverage" id="coverage" aria-labelledby="coverage-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Coverage</p>
        <h2 id="coverage-title" class="section-title">In the press</h2>
      </div>
      <p class="section-sub">The type of coverage is stated for each entry: a feature, an interview, a brand feature or a television segment.</p>
    </div>
    ${pressList(entries)}
    ${pv("Searches for Variety, The Hollywood Reporter, The Wall Street Journal, LA Confidential, Us Weekly, OK!, Life &amp; Style and Inside Weddings found no coverage of Anya, so none are listed. Anya’s official press pages could not be read; they may list more.", "pv-note--tight")}
  </div>
</section>

<section class="context" id="audience" aria-labelledby="context-title">
  <div class="wrap context__grid">
    <div>
      <p class="kicker">Programme context</p>
      <h2 id="context-title" class="section-title">The shows in <em>context</em></h2>
      <p>A programme’s audience is not the audience for any one segment. This figure describes the whole show.</p>
    </div>
    <div>
      ${stat({ ...metrics.programme, tone: "stat--context" })}
      <p class="context__caveat"><strong>Read carefully:</strong> this is Entertainment Tonight’s programme-wide figure from its publisher, not an audience or rating for any appearance by Anya. Segment ratings and demographics are not available.</p>
    </div>
  </div>
</section>

${closingCta({ title: "Booking a <em>style voice?</em>", text: "Tell Anya about the show, the date and the format." })}
`,
};
