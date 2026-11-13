import { data, esc, button, photo, tvMarquee, mastheads, closingCta, wordmark, arrow, pv, pressEntries, visibleVideos, hasStill, featuredBanner } from "../templates/components.mjs";
import { config } from "../config.mjs";

const m = data.images;
const set = (slot, ext) => m[slot].widths.map((w) => `/img/${slot}-${w}.${ext} ${w}w`).join(", ");

const heroPicture = `<picture class="hero__picture">
      <source media="(max-width: 767px)" type="image/avif" srcset="${set("hero-home-mobile", "avif")}" sizes="100vw">
      <source media="(max-width: 767px)" type="image/webp" srcset="${set("hero-home-mobile", "webp")}" sizes="100vw">
      <source type="image/avif" srcset="${set("hero-home-desktop", "avif")}" sizes="100vw">
      <source type="image/webp" srcset="${set("hero-home-desktop", "webp")}" sizes="100vw">
      <img class="hero__photo" src="/img/hero-home-desktop-1942.webp" width="1942" height="809" fetchpriority="high"
           alt="Black-and-white concept portrait of Anya on a white studio background, holding an iced drink while a team styles her hair and makeup.">
    </picture>`;

const press = pressEntries().filter((e) => e.featured).sort((a, b) => (b.sort || 0) - (a.sort || 0));
const hasVideo = visibleVideos().length > 0;
const followers = data.metrics.followers;

export default {
  path: "/",
  active: "home",
  title: "Home",
  description:
    "Anya Sarre is a Los Angeles celebrity fashion stylist and television style expert. Red-carpet polish, approachable advice. Explore styling, media and hosting, and brand partnerships.",
  body: `
<section class="hero" aria-label="Introduction">
  <div class="hero__stage">
    ${heroPicture}
    <h1 class="hero__name"><span class="sr-only">Anya Sarre</span>${wordmark("stacked", "hero__mark hero__mark--stacked", { label: false })}${wordmark("compact", "hero__mark hero__mark--compact", { label: false })}</h1>
    <p class="hero__tag">Fashion / Beauty / Lifestyle</p>
  </div>
  <div class="wrap hero__copy">
    <p class="kicker">Los Angeles · Celebrity fashion stylist · TV style expert</p>
    <div class="hero__row">
      <p class="hero__lead">Hollywood polish. <em>Human warmth.</em></p>
      <div class="hero__aside">
        <p>Anya styles for award season, explains fashion on air, and makes great clothes feel doable. Producers, brands and private clients are all welcome.</p>
        <div class="btn-row">${button("Work with Anya", "/talk-to-anya/", "solid")}<a class="btn btn--ghost" href="${hasVideo ? "/media/#videos" : "#work"}"><span>${hasVideo ? "Watch Anya on air" : "See the work"}</span>${arrow}</a></div>
      </div>
    </div>
  </div>
</section>

${tvMarquee()}

<section class="statement" aria-labelledby="statement-title">
  <div class="wrap statement__grid">
    <h2 id="statement-title" class="statement__title">She knows what works on a red carpet. <em>She’ll tell you what works on a Tuesday.</em></h2>
    <p class="statement__text">Styled By Anya Inc. brings Hollywood standards to the questions everyone has: what to wear, what to skip, and how to walk in feeling like yourself.</p>
  </div>
</section>

<section class="routes" aria-labelledby="routes-title">
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">Choose your route</p>
      <h2 id="routes-title" class="section-title">Three ways to work with Anya</h2>
    </div>
    <div class="routes__grid">
      <article class="route route--pink">
        <p class="route__num" aria-hidden="true">01</p>
        <h3 class="route__title">Producers &amp; event organisers</h3>
        <p>A style voice at home on live television and in front of a room. Review television credits, hosting and speaking.</p>
        <a class="route__link" href="/media/">Media &amp; Press ${arrow}</a>
      </article>
      <article class="route route--lilac">
        <p class="route__num" aria-hidden="true">02</p>
        <h3 class="route__title">Brands &amp; agencies</h3>
        <p>Fashion, beauty and lifestyle collaborations, including Style Smart segments on KTLA 5’s LA Unscripted, with sourced figures and clear notes on what each number means.</p>
        <p class="route__stat"><strong>${esc(followers.display)}</strong> Instagram followers <span>Fohr · Nov 13, 2026 · provisional</span></p>
        <a class="route__link" href="/partnerships/">Brand Partnerships ${arrow}</a>
      </article>
      <article class="route route--butter">
        <p class="route__num" aria-hidden="true">03</p>
        <h3 class="route__title">Private clients</h3>
        <p>Styling for the events and everyday moments that matter, from the red carpet to the rest of your calendar.</p>
        <a class="route__link" href="/styling/">Styling ${arrow}</a>
      </article>
    </div>
  </div>
</section>

<section class="work" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Selected work</p>
        <h2 id="work-title" class="section-title">Seen, styled, <em>spoken</em></h2>
      </div>
      <p class="section-sub">Credits and coverage Anya’s public record supports, each with its source.</p>
    </div>
    <div class="work__grid">
      <article class="work__tile work__tile--big">
        ${photo({ img: "support-media-oscars-award-season", ratio: "4 / 3", pos: "50% 30%", scale: 1, alt: "Gold Oscar statuette on a blush ledge with ivory ribbon and rose fabric.", sizes: "(min-width: 900px) 50vw, 100vw", cls: "work__photo", label: "Illustrative still life" })}
        <div class="work__body">
          <p class="work__cat">Red-carpet styling</p>
          <h3 class="work__title">Award-season work</h3>
          <p>Clients dressed for events including the Oscars, Golden Globes, Emmys and Grammys.</p>
          <p class="work__src">Beverly Hills Courier, November 12, 2024</p>
          <a class="text-link" href="/styling/">Explore styling ${arrow}</a>
        </div>
      </article>
      <article class="work__tile work__tile--pink${hasStill("still-ktla-morning-news") ? " work__tile--photo" : ""}">
        ${hasStill("still-ktla-morning-news") ? photo({ img: "still-ktla-morning-news", ratio: "16 / 9", pos: "52% 30%", scale: 1, alt: "Anya Sarre on the KTLA 5 Morning News set, smiling in a sequined top and crystal earrings.", sizes: "(min-width: 900px) 36vw, 94vw", cls: "work__still" }) : ""}
        <div class="work__body">
          <p class="work__cat">Television &amp; hosting</p>
          <h3 class="work__title">Countdown to Gold</h3>
          <p>A KTLA 5 special hosted and curated by Anya: <em>Getting Carpet Ready with Anya Sarre</em>.</p>
          <p class="work__src">LOCAL Life Q+A · KTLA 5</p>
          <a class="text-link" href="/media/#television">Television credits ${arrow}</a>
        </div>
      </article>
      <article class="work__tile work__tile--lilac${hasStill("still-tedx-stage") ? " work__tile--photo" : ""}">
        ${hasStill("still-tedx-stage") ? photo({ img: "still-tedx-stage", ratio: "16 / 9", pos: "72% 40%", scale: 1, alt: "Anya Sarre speaking on a TEDx stage in a black top and gold pleated skirt, with large red TEDx letters behind her.", sizes: "(min-width: 900px) 36vw, 94vw", cls: "work__still" }) : ""}
        <div class="work__body">
          <p class="work__cat">Speaking</p>
          <h3 class="work__title">TEDxHiltonHead Women</h3>
          <p>Speaker at TEDxHiltonHead Women, described as a career highlight.</p>
          <p class="work__src">LOCAL Life Q+A</p>
          <a class="text-link" href="/media/#speaking">Speaking ${arrow}</a>
        </div>
      </article>
      <article class="work__tile work__tile--ink">
        <p class="work__cat">On-air expert</p>
        <h3 class="work__title">KTLA 5 style expert</h3>
        <p>A frequent fashion and style expert on KTLA 5 in Los Angeles.</p>
        <p class="work__src">Beverly Hills Courier, 2024</p>
      </article>
    </div>
  </div>
</section>

<section class="bio" aria-labelledby="bio-title">
  <div class="wrap bio__grid">
    ${photo({ img: "09-mobile", ratio: "4 / 5", pos: "60% 31%", scale: 1, alt: "Daylight concept portrait of Anya in black against a warm plaster wall with palms at the edge.", sizes: "(min-width: 900px) 40vw, 100vw", cls: "bio__photo" })}
    <div class="bio__text">
      <p class="kicker">The short version</p>
      <h2 id="bio-title" class="section-title">Hollywood training. <em>Human advice.</em></h2>
      <p>Anya Sarre is a Los Angeles-based celebrity fashion stylist, television fashion, beauty and lifestyle expert, and brand influencer. She heads Styled By Anya Inc., dressing stars for the Oscars, Golden Globes and Emmys.</p>
      <p>She grew up in the Bay Area, moved to Los Angeles for USC, then polished her eye at Parsons School of Design.</p>
      <div class="btn-row">${button("Meet Anya", "/meet-anya/", "dark")}</div>
    </div>
  </div>
</section>

${featuredBanner()}

${closingCta({ title: "Ready for the <em>big night,</em> the big show, or the big campaign?" , text: "Tell Anya what you’re planning and which route fits best."})}
`,
};
