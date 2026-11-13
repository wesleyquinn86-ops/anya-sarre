import { esc, button, closingCta, pv, photo, arrow } from "../templates/components.mjs";
import { pageHero, visible } from "./_shared.mjs";

const services = [
  {
    id: "red-carpet",
    title: "Red-carpet &amp; event styling",
    text: "Looks for award-season and event moments. Reported work includes the Oscars, Golden Globes, Emmys and Grammys.",
    source: "Beverly Hills Courier, Nov 12, 2024",
    status: "confirmed",
    tone: "pink",
    img: { src: "desktop", ratio: "5 / 4", pos: "80% 100%", scale: 2.3, alt: "Black off-the-shoulder tulle-trimmed dress and a hand holding an iced drink, from a portrait of Anya Sarre." },
  },
  {
    id: "personal",
    title: "Personal styling",
    text: "For private clients: considered looks for the appearances, seasons and occasions that matter to you.",
    source: "Styled By Anya Inc. · service details to confirm",
    status: "to-confirm",
    note: "Service category is part of the working brief. Session format, process and pricing are not stated in any source and need Anya’s confirmation.",
    tone: "lilac",
    img: { src: "mobile", ratio: "4 / 5", pos: "52% 49%", scale: 1, alt: "" },
  },
  {
    id: "wardrobe",
    title: "Wardrobe &amp; closet edits",
    text: "A fresh look at what you own: what stays, what goes, and what is missing.",
    source: "To confirm against the official Styling page",
    status: "to-confirm",
    note: "Included as a proposed service. Not verified; the official Styling page could not be read.",
    tone: "mint",
    img: null,
  },
  {
    id: "shopping",
    title: "Personal shopping",
    text: "Shopping with a plan, so every piece earns its place.",
    source: "To confirm against the official Styling page",
    status: "to-confirm",
    note: "Included as a proposed service. Not verified.",
    tone: "butter",
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
  img: { src: "desktop", ratio: "4 / 3", pos: "72% 62%", scale: 1.25, alt: "Anya Sarre in a black-and-white portrait, in an off-the-shoulder dress with tulle trim, while her hair and makeup are finished.", sizes: "(min-width: 900px) 44vw, 90vw", priority: true },
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
