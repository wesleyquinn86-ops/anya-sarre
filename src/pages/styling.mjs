import { esc, button, closingCta, pv, photo, arrow } from "../templates/components.mjs";
import { pageHero, visible } from "./_shared.mjs";

const services = [
  {
    id: "red-carpet",
    title: "Red-carpet &amp; event styling",
    text: "Looks for award-season and event moments. Reported work includes the Oscars, Golden Globes, Emmys and Grammys.",
    source: "Beverly Hills Courier, Nov 12, 2024 · Variety feature, Oct 24, 2008",
    status: "confirmed",
    tone: "pink",
    img: { img: "support-styling-evening-accessories", ratio: "5 / 4", pos: "50% 50%", scale: 1, alt: "Blush evening clutch, satin sandals and silver earrings with lilac silk." },
  },
  {
    id: "personal",
    title: "Personal styling &amp; makeovers",
    text: "For private clients: considered looks for the appearances, seasons and occasions that matter to you. A 944 Magazine profile calls her a celebrity wardrobe expert and makeover maven.",
    source: "944 Magazine profile (undated) · Styled By Anya Inc.",
    status: "confirmed",
    tone: "lilac",
    img: { img: "05-mobile", ratio: "5 / 4", pos: "55% 78%", scale: 1.5, alt: "Detail of a voluminous ivory ruffled skirt from a concept portrait of Anya." },
  },
  {
    id: "weddings-events",
    title: "Weddings, showers &amp; events",
    text: "Styling for weddings, bridal and baby showers, and events. A section of Anya’s old official site covered them.",
    source: "Old official site: “Weddings, Showers & Events” (about 2010–2013 pages)",
    status: "to-confirm",
    note: "Appears in the old site's navigation with baby-shower, bridal-shower, wedding and event galleries, but the pages are years old. Confirm that Anya still offers this and what it covers.",
    tone: "butter",
    img: null,
  },
  {
    id: "wardrobe",
    title: "Wardrobe &amp; closet edits",
    text: "A fresh look at what you own: what stays, what goes, and what is missing.",
    source: "Web-press headlines “Same Closet, New You!” and “Survive Closet Clean-Out Craziness” (c. 2011)",
    status: "to-confirm",
    note: "Supported only by article headlines from the old Web Press page, not by a service description. Confirm against Anya.",
    tone: "mint",
    img: { img: "support-styling-wardrobe-edit", ratio: "5 / 4", pos: "50% 45%", scale: 1, alt: "Ivory tailoring, blush silk and lilac knitwear on a curated clothes rail." },
  },
  {
    id: "shopping",
    title: "Personal shopping",
    text: "Shopping with a plan, so every piece earns its place.",
    source: "Variety feature: “she shops ’til she drops” (Oct 24, 2008)",
    status: "to-confirm",
    note: "The Variety feature shows her shopping for red-carpet clients; a personal-shopping service for private clients is not documented. Confirm.",
    tone: "pink",
    img: null,
  },
].filter(visible);

export default {
  path: "/styling/",
  active: "styling",
  title: "Styling",
  description:
    "Red-carpet and personal styling from Los Angeles celebrity stylist Anya Sarre, through Styled By Anya Inc. Explore services and start an enquiry.",
  body: `
${pageHero({
  kicker: "Styling",
  title: "Dressed for the <em>moment.</em>",
  lead: "Red-carpet standards, applied to real calendars. Styling through Styled By Anya Inc.",
  img: { img: "05-desktop", ratio: "4 / 3", pos: "66% 40%", scale: 1, alt: "Concept portrait of Anya in a cream bodice and voluminous ivory ruffled skirt on a pale blush studio floor.", sizes: "(min-width: 900px) 44vw, 90vw", priority: true },
})}

<section class="services" aria-labelledby="services-title">
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">Services</p>
      <h2 id="services-title" class="section-title">What Anya can <em>style</em></h2>
    </div>
    <ul class="services__list">
      ${services
        .map(
          (s, i) => `<li class="service service--${s.tone}${s.img ? "" : " service--text"}">
        <div class="service__body">
          <p class="service__num" aria-hidden="true">0${i + 1}</p>
          <h3 class="service__title">${s.title}</h3>
          <p>${esc(s.text)}</p>
          <p class="service__src">${esc(s.source)}</p>
          ${s.status !== "confirmed" && s.note ? pv(esc(s.note), "pv-note--tight") : ""}
        </div>
        ${s.img && s.img.alt !== undefined ? photo({ ...s.img, sizes: "(min-width: 900px) 40vw, 90vw", cls: "service__photo" }) : ""}
      </li>`
        )
        .join("")}
    </ul>
  </div>
</section>

<section class="seen" aria-labelledby="seen-title">
  <div class="wrap seen__grid">
    <div>
      <p class="kicker kicker--pink">Where the work shows up</p>
      <h2 id="seen-title" class="section-title">Seen on the carpet <em>and on air</em></h2>
    </div>
    <ul class="seen__list">
      <li><strong>Award season</strong> Clients dressed for the Oscars, Golden Globes, Emmys and Grammys <span>Beverly Hills Courier, 2024</span></li>
      <li><strong>Television</strong> Hosts and curates “Countdown to Gold: Getting Carpet Ready with Anya Sarre” on KTLA 5 <span>LOCAL Life</span></li>
      <li><strong>Always on</strong> Style advice on Instagram at <a href="https://www.instagram.com/anyasarre/" rel="noopener noreferrer" target="_blank">@anyasarre<span class="sr-only"> (opens in a new tab)</span></a></li>
    </ul>
    ${pv("No client names, testimonials, prices or before-and-after results are shown because none were verified. Add approved client work when Anya supplies it.", "pv-note--dark")}
  </div>
</section>

<section class="prompts" aria-labelledby="prompts-title">
  <div class="wrap prompts__grid">
    <div>
      <p class="kicker">Start the conversation</p>
      <h2 id="prompts-title" class="section-title">What to tell Anya</h2>
    </div>
    <ul class="prompts__list">
      <li>The event or season, and the date</li>
      <li>Where you are and where you’re going</li>
      <li>How you want to feel when you walk in</li>
      <li>Anything you already love, or never want to see again</li>
    </ul>
    <div class="btn-row">${button("Enquire about styling", "/contact/?route=styling#enquiry", "dark")}</div>
  </div>
</section>

${closingCta({ title: "Your next look <em>starts here.</em>", text: "Send a few details and Anya will take it from there." })}
`,
};
