import { data, esc, button, photo, tvMarquee, mastheads, closingCta, spin, sparkle, squiggle, arrow, pv, stat } from "../templates/components.mjs";
import { config } from "../config.mjs";

const m = data.images;
const set = (slot, ext) => m[slot].widths.map((w) => `/img/${slot}-${w}.${ext} ${w}w`).join(", ");

const heroPicture = `<picture class="hero__picture">
      <source media="(max-width: 767px)" type="image/avif" srcset="${set("hero-mobile", "avif")}" sizes="100vw">
      <source media="(max-width: 767px)" type="image/webp" srcset="${set("hero-mobile", "webp")}" sizes="100vw">
      <source type="image/avif" srcset="${set("hero-desktop", "avif")}" sizes="100vw">
      <source type="image/webp" srcset="${set("hero-desktop", "webp")}" sizes="100vw">
      <img class="hero__photo" src="/img/hero-desktop-1774.webp" width="1774" height="887" fetchpriority="high"
           alt="Black-and-white portrait of Anya Sarre holding an iced drink while a team styles her hair and makeup.">
    </picture>`;

const press = data.press.entries.filter((e) => e.display);
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
    <h1 class="hero__name"><span>Anya</span> <span>Sarre</span></h1>
    ${spin}
  </div>
  <div class="wrap hero__copy">
    <p class="kicker kicker--pink">Los Angeles · Celebrity fashion stylist · TV style expert</p>
    <div class="hero__row">
      <p class="hero__lead">Red-carpet polish. <em>Real-life advice.</em></p>
      <div class="hero__aside">
        <p>Anya styles for award season, explains fashion on air, and makes great clothes feel doable. Producers, brands and private clients are all welcome.</p>
        <div class="btn-row">${button("Work with Anya", "/contact/", "solid")}<a class="btn btn--ghost" href="#work"><span>See the work</span>${arrow}</a></div>
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
        <p>Fashion, beauty and lifestyle collaborations, with sourced audience figures and clear notes on what each number means.</p>
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
        ${photo({ src: "desktop", ratio: "4 / 3", pos: "70% 42%", scale: 1.5, alt: "", sizes: "(min-width: 900px) 50vw, 100vw", cls: "work__photo" })}
        <div class="work__body">
          <p class="work__cat">Red-carpet styling</p>
          <h3 class="work__title">Award-season work</h3>
          <p>Clients dressed for events including the Oscars, Golden Globes, Emmys and Grammys.</p>
          <p class="work__src">Beverly Hills Courier, November 12, 2024</p>
          <a class="text-link" href="/styling/">Explore styling ${arrow}</a>
        </div>
      </article>
      <article class="work__tile work__tile--pink">
        <p class="work__cat">Television &amp; hosting</p>
        <h3 class="work__title">Countdown to Gold</h3>
        <p>A KTLA 5 special hosted and curated by Anya: <em>Getting Carpet Ready with Anya Sarre</em>.</p>
        <p class="work__src">LOCAL Life Q+A · KTLA 5</p>
        <a class="text-link" href="/media/#television">Television credits ${arrow}</a>
      </article>
      <article class="work__tile work__tile--lilac">
        <p class="work__cat">Speaking</p>
        <h3 class="work__title">TEDxHiltonHead Women</h3>
        <p>Speaker at TEDxHiltonHead Women, described as a career highlight.</p>
        <p class="work__src">LOCAL Life Q+A · date to be confirmed</p>
        <a class="text-link" href="/media/#speaking">Speaking ${arrow}</a>
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
    ${photo({ src: "mobile", ratio: "4 / 5", pos: "52% 46%", scale: 1.25, alt: "Close portrait of Anya Sarre in black and white, wide-eyed, with windswept hair and hoop earrings.", sizes: "(min-width: 900px) 40vw, 100vw", cls: "bio__photo" })}
    <div class="bio__text">
      <p class="kicker">The short version</p>
      <h2 id="bio-title" class="section-title">Hollywood training. <em>Human advice.</em></h2>
      <p>Anya Sarre is a Los Angeles-based celebrity fashion stylist, television fashion, beauty and lifestyle expert, and brand influencer. Her business, Styled By Anya Inc., styles clients for award-season events and beyond.</p>
      <p>She grew up in the Bay Area, studied at USC, and holds a graduate degree from Parsons School of Design.</p>
      <div class="btn-row">${button("Read Anya’s story", "/about/", "dark")}</div>
    </div>
  </div>
</section>

<section class="featured" aria-labelledby="featured-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker kicker--pink">In the press</p>
        <h2 id="featured-title" class="section-title">Featured in</h2>
      </div>
      <p class="section-sub">Each entry shows what kind of coverage it is, so a profile is never mistaken for a byline.</p>
    </div>
    ${mastheads(press)}
    ${pv("Typeset outlet names stand in for official mastheads, which could not be sourced from the build environment. Variety, The Hollywood Reporter, WSJ, LA Confidential, Us Weekly, OK!, Life &amp; Style and Inside Weddings are not shown because no coverage of Anya was found for them. See docs/SOURCES.md.", "pv-note--dark")}
  </div>
</section>

${closingCta({ title: "Ready for the <em>big night,</em> the big show, or the big campaign?" , text: "Tell Anya what you’re planning and which route fits best."})}
`,
};
