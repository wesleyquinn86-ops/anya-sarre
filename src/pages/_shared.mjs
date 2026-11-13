import { esc, photo } from "../templates/components.mjs";
import { config } from "../config.mjs";

/** Production builds only show confirmed items; the preview shows drafts with a visible status. */
export const visible = (item) => config.preview || item.status === "confirmed";

/** Dark page header with a cropped view of the supplied photography. */
export function pageHero({ kicker, title, lead, img }) {
  return `<section class="page-hero">
  <div class="wrap page-hero__grid">
    <div class="page-hero__text">
      <p class="kicker">${esc(kicker)}</p>
      <h1 class="page-hero__title">${title}</h1>
      <p class="page-hero__lead">${lead}</p>
    </div>
    ${photo({ ...img, cls: `page-hero__photo ${img.cls || ""}` })}
  </div>
</section>`;
}
