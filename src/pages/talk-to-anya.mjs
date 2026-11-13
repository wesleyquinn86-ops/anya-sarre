import { data, esc, icon, button } from "../templates/components.mjs";
import { config } from "../config.mjs";
import { pageHero } from "./_shared.mjs";

const routes = [
  { id: "media", title: "Media &amp; hosting", who: "Producers, event organisers and editors", subject: "Media and hosting enquiry", tone: "pink", email: config.emails.media },
  { id: "brands", title: "Brand partnerships", who: "Brands and agencies", subject: "Brand partnership enquiry", tone: "lilac", email: config.emails.brands },
  { id: "styling", title: "Personal styling", who: "Private clients", subject: "Personal styling enquiry", tone: "butter", email: config.emails.styling },
];

const formMarkup = () => `<form class="form" id="enquiry-form" ${config.formEndpoint ? `action="${esc(config.formEndpoint)}" method="post"` : 'action="#"'} novalidate data-endpoint="${esc(config.formEndpoint)}"${config.emails.general ? ` data-fallback-email="${esc(config.emails.general)}"` : ""}>
      <div class="form__live" role="status" aria-live="polite" data-form-status></div>
      <fieldset class="form__routes">
        <legend>Who is this for?</legend>
        <div class="rpanels">
          ${routes.map((r, i) => `<label class="rpanel rpanel--${r.tone}"><input type="radio" name="route" value="${r.id}" data-subject="${esc(r.subject)}"${i === 0 ? " checked" : ""}><span class="rpanel__title">${r.title}</span><span class="rpanel__who">${r.who}</span><span class="rpanel__tick" aria-hidden="true">${icon("check")}</span></label>`).join("")}
        </div>
      </fieldset>
      <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" required><p class="field__err" data-err="name" hidden></p></div>
      <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required><p class="field__err" data-err="email" hidden></p></div>
      <div class="field"><label for="f-org">Company or show <span class="opt">(optional)</span></label><input id="f-org" name="organisation" type="text" autocomplete="organization"></div>
      <div class="field"><label for="f-msg">What are you planning?</label><textarea id="f-msg" name="message" rows="6" required minlength="20"></textarea><p class="field__hint">Dates, format and timeline help most.</p><p class="field__err" data-err="message" hidden></p></div>
      <div class="hp" aria-hidden="true"><label>Leave this empty <input name="company_website" type="text" tabindex="-1" autocomplete="off"></label></div>
      <button class="btn btn--dark" type="submit" data-submit><span>Send enquiry</span></button>
    </form>`;

const emailPanel = () => `<div class="form-off">
      <h3>Email Anya</h3>
      <p>The quickest way to reach Anya about a segment, a booking or a styling enquiry.</p>
      <div class="btn-row">
        ${config.emails.general ? button(`Email ${config.emails.general}`, `mailto:${config.emails.general}?subject=${encodeURIComponent("Enquiry via anyasarre.com")}`, "dark") : ""}
        <a class="btn btn--ghost-dark" href="${esc(data.site.instagram.url)}" rel="noopener noreferrer" target="_blank"><span>Instagram ${esc(data.site.instagram.handle)}<span class="sr-only"> (opens in a new tab)</span></span></a>
      </div>
    </div>`;

// Live only with a configured endpoint. In the preview (no endpoint) the form is built and validates but sends nothing:
// on submit it says so and offers a pre-filled email instead. A production build without an endpoint shows the email panel.
const form = config.formEndpoint || config.preview ? formMarkup() : emailPanel();

export default {
  path: "/talk-to-anya/",
  active: "talk",
  title: "Talk to Anya",
  description: "Talk to Anya Sarre: enquiry routes for media and hosting, brand partnerships, sponsored segments and personal styling.",
  body: `
${pageHero({
  kicker: "Talk to Anya",
  title: "Talk to <em>Anya.</em>",
  lead: "Tell Anya what you have in mind, and who it is for. She will take it from there.",
  img: { img: "08-mobile", ratio: "4 / 5", pos: "50% 33%", scale: 1, alt: "Concept portrait of Anya seated in black with an ornate statement necklace against a rose studio wall.", sizes: "(min-width: 900px) 30vw, 80vw", priority: true, cls: "page-hero__photo--narrow" },
})}

<section class="enquiry" id="enquiry" aria-labelledby="enquiry-title">
  <div class="wrap">
    <div class="enquiry__head">
      <p class="kicker kicker--pink">Send an enquiry</p>
      <h2 id="enquiry-title" class="section-title">Tell Anya <em>what you’re planning</em></h2>
      <p>${config.emails.general ? `Prefer email? <a href="mailto:${esc(config.emails.general)}?subject=${encodeURIComponent("Enquiry via anyasarre.com")}">${esc(config.emails.general)}</a>. ` : ""}Based in ${esc(data.site.location)}. Also on Instagram at <a href="${esc(data.site.instagram.url)}" rel="noopener noreferrer" target="_blank">${esc(data.site.instagram.handle)}<span class="sr-only"> (opens in a new tab)</span></a>.</p>
    </div>
    <div class="enquiry__form">${form}</div>
  </div>
</section>
`,
};
