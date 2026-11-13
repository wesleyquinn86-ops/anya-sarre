import { data, esc, closingCta, pv, pressList, stat, pressEntries, visibleVideos, videoGrid, logoMark, photo } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const { tv, press, metrics } = data;
const credits = tv.credits;
const chipLabel = (c) => (c.currency === "recurring" ? "Recurring · recent" : c.currency === "per-bio" ? "Per Anya’s bio" : `Earlier · ${c.era}`);
const entries = pressEntries();
const videos = visibleVideos();

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
      <p class="section-sub">Appearances over the years. Each line says whether it is recent or earlier, and roles come from the sources named on the Meet Anya page.</p>
    </div>
    <ul class="tvlist__rows">
      ${credits
        .map(
          (c) => `<li class="tvrow tvrow--${c.currency}">
        <p class="tvrow__show">${c.logo ? logoMark(c.logo) : `<span class="tvrow__name">${esc(c.show)}</span>`}</p>
        <p class="tvrow__role">${esc(c.role)}</p>
        <p class="tvrow__net">${esc(c.network)}</p>
        <p class="tvrow__cur"><span class="chip chip--${c.currency}">${esc(chipLabel(c))}</span></p>
      </li>`
        )
        .join("")}
    </ul>
    ${pv("Credits come from Anya’s old official-site archive (segment stills and clips, press scans), which mostly dates from about 2008–2017; only KTLA 5 is evidenced as recent. Home &amp; Family, VH1 and CBS 2 are shown from their logos on the old Watch Anya page, which has no segment for them in the archive. Logos are traced to single-colour marks from that page, used on the site owner’s instruction.", "pv-note--tight")}
  </div>
</section>

<section class="speaking" id="speaking" aria-labelledby="speaking-title">
  <div class="wrap speaking__grid">
    <div class="speaking__lead">
      <p class="kicker kicker--pink">Hosting &amp; speaking</p>
      <h2 id="speaking-title" class="section-title">Comfortable with a <em>room.</em></h2>
      ${photo({ img: "support-media-television-hosting", ratio: "1 / 1", pos: "50% 50%", scale: 1, alt: "Broadcast microphone resting on a rose folio in a softly lit studio.", sizes: "(min-width: 900px) 30vw, 90vw", cls: "speaking__photo", label: "Illustrative still life" })}
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
    ? `<section class="videos" id="videos" aria-labelledby="videos-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Watch</p>
        <h2 id="videos-title" class="section-title">Anya <em>on air</em></h2>
      </div>
      <p class="section-sub">Four KTLA 5 segments from Anya’s own archive. Nothing loads or plays until you press play.</p>
    </div>
    ${videoGrid(videos)}
    ${pv("These are broadcaster clips from Anya’s old Watch Anya archive. Air dates are not recorded, usage rights from KTLA/CBS are unconfirmed, and there are no captions or transcripts yet. The clips are kept out of the public repository, and a production build hides them until each entry is marked rights: “cleared” in press.json.", "pv-note--tight")}
  </div>
</section>`
    : pv("Selected videos: no clip files are present in this build (they are gitignored broadcaster footage). Add entries to press.json and files to public/video/ and the section renders with click-to-load playback.", "pv-note--page")
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
    <div class="coverage__grid">
      <div>${pressList(entries)}</div>
      <aside class="coverage__aside">
        ${photo({ img: "support-media-oscars-award-season", ratio: "4 / 5", pos: "50% 40%", scale: 1, alt: "Gold Oscar statuette on a blush ledge with ivory ribbon and rose fabric.", sizes: "(min-width: 900px) 24vw, 90vw", cls: "coverage__photo", label: "Illustrative still life" })}
        <p class="coverage__cap">An illustration of award season. It does not represent an award won by Anya.</p>
      </aside>
    </div>
    ${pv("Print entries are read from page scans on Anya’s official Press page, so they link there rather than to the publishers. The Wall Street Journal was searched for and not found. Several more magazines and websites appear in the same archive but their pages were not read.", "pv-note--tight")}
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
