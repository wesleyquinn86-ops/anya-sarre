import { data, esc, closingCta, pv, pressList, stat, pressEntries, visibleVideos, videoGrid, logoMark, photo, hasStill, bigStages, icon, pressArchive, hasPressArchive } from "../templates/components.mjs";
import { pageHero } from "./_shared.mjs";

const { tv, press, metrics } = data;
const credits = tv.credits;
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
        <h2 id="tvlist-title" class="section-title">On the <em>small screen</em></h2>
      </div>
      <p class="section-sub">The shows Anya has appeared on, with her role where it is documented. Sources are named on the Meet Anya page.</p>
    </div>
    <ul class="tvlist__rows">
      ${credits
        .map(
          (c) => `<li class="tvrow">
        <p class="tvrow__show">${c.logo ? logoMark(c.logo) : `<span class="tvrow__name">${esc(c.show)}</span>`}</p>
        <p class="tvrow__role">${esc(c.role)}</p>
        <p class="tvrow__net">${esc(c.network)}</p>
      </li>`
        )
        .join("")}
    </ul>
    ${pv("Credits come from Anya’s old official-site archive (segment stills and clips, press scans), which mostly dates from about 2008–2017; only KTLA 5 is evidenced as recent. Home &amp; Family, VH1 and CBS 2 are shown from their logos on the old Watch Anya page, which has no segment for them in the archive. Logos are traced to single-colour marks from that page, used on the site owner’s instruction.", "pv-note--tight")}
  </div>
</section>

${bigStages({ id: "audience" })}

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

${
  hasStill("still-ktla-morning-news") && hasStill("still-tedx-stage")
    ? `<section class="speaking" id="speaking" aria-labelledby="speaking-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker kicker--pink">Hosting &amp; speaking</p>
        <h2 id="speaking-title" class="section-title">Comfortable with a <em>room.</em></h2>
      </div>
      <p class="section-sub">On a live morning-news set and on a TEDx stage.</p>
    </div>
    <ul class="speaking__cards">
      <li class="spcard">
        ${photo({ img: "still-ktla-morning-news", ratio: "16 / 9", pos: "52% 30%", scale: 1, alt: "Anya Sarre smiling on the KTLA 5 Morning News set in a sequined top and long crystal earrings, with an on-screen banner reading Anya Sarre @AnyaSarre.", sizes: "(min-width: 900px) 48vw, 94vw", cls: "spcard__photo" })}
        <div class="spcard__body">
          <h3>Host &amp; curator · KTLA 5</h3>
          <p>“Countdown to Gold: Getting Carpet Ready with Anya Sarre,” an awards-season television special. Pictured on KTLA 5 Morning News.</p>
          <p class="speaking__src">LOCAL Life Q+A · KTLA 5</p>
        </div>
      </li>
      <li class="spcard">
        ${photo({ img: "still-tedx-stage", ratio: "16 / 9", pos: "72% 40%", scale: 1, alt: "Anya Sarre speaking on a TEDx stage in a black top and a gold pleated skirt, holding notes, with large red TEDx letters behind her.", sizes: "(min-width: 900px) 48vw, 94vw", cls: "spcard__photo" })}
        <div class="spcard__body">
          <h3>Speaker · TEDxHiltonHead Women</h3>
          <p>Anya has taken the stage as a TEDx speaker. A LOCAL Life profile calls the talk a highlight of her career.</p>
          <p class="speaking__src">LOCAL Life Q+A</p>
        </div>
      </li>
    </ul>
  </div>
</section>`
    : `<section class="speaking" id="speaking" aria-labelledby="speaking-title">
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
        <p class="speaking__src">LOCAL Life Q+A</p>
      </li>
      <li>
        <h3>Speaker · TEDxHiltonHead Women</h3>
        <p>Anya has taken the stage as a TEDx speaker. A LOCAL Life profile calls the talk a highlight of her career.</p>
        <p class="speaking__src">LOCAL Life Q+A</p>
      </li>
    </ul>
  </div>
</section>`
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
      </aside>
    </div>
    ${pv("Print entries are read from page scans on Anya’s official Press page, so they link there rather than to the publishers. The Wall Street Journal was searched for and not found. Several more magazines and websites appear in the same archive but their pages were not read.", "pv-note--tight")}
  </div>
</section>

${hasPressArchive() ? pressArchive() : ""}

${closingCta({ title: "Booking a <em>style voice?</em>", text: "Tell Anya about the show, the date and the format." })}
`,
};
