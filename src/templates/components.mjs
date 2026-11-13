import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readJson = (p) => JSON.parse(readFileSync(path.join(root, p), "utf8"));
export const data = {
  site: readJson("src/data/site.json"),
  tv: readJson("src/data/tv.json"),
  press: readJson("src/data/press.json"),
  metrics: readJson("src/data/metrics.json"),
  images: readJson("src/data/images.json"),
};

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- small primitives ---------- */
export const arrow = `<svg class="arrow" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M4 12h15M13 5.5 19.5 12 13 18.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>`;
export const sparkle = (cls = "") => `<svg class="sparkle ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0c.8 7.2 4.8 11.2 12 12-7.200.8-11.2 4.800-12 12-.8-7.200-4.800-11.200-12-12C7.200 11.200 11.200 7.200 12 0Z" fill="currentColor"/></svg>`;
export const squiggle = `<svg class="squiggle" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M2 6c8-8 12 8 20 0s12 8 20 0 12 8 20 0 12 8 20 0 12 8 20 0 12 8 16 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`;

export function button(label, href, variant = "solid", extra = "") {
  return `<a class="btn btn--${variant}" href="${esc(href)}"${extra}><span>${esc(label)}</span>${arrow}</a>`;
}

/** Visible only in the private preview; never shipped in a production build. */
export const pv = (text, cls = "") =>
  config.preview ? `<p class="pv-note ${cls}"><strong>Preview note</strong> ${text}</p>` : "";

/* ---------- wordmark (supplied vector study, recoloured via currentColor) ---------- */
const wordmarkCache = {};
export function wordmark(kind = "inline", cls = "") {
  if (!wordmarkCache[kind]) {
    // Supplied logo files (assets/brand/anya-sarre-primary-light.svg is the recolourable master).
    const svg = readFileSync(path.join(root, "assets/brand/anya-sarre-primary-light.svg"), "utf8").replace(/<title>[\s\S]*?<\/title>/, "");
    const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    wordmarkCache[kind] = { viewBox, inner };
  }
  const { viewBox, inner } = wordmarkCache[kind];
  return `<svg class="wordmark wordmark--${kind} ${cls}" viewBox="${viewBox}" role="img" aria-label="Anya Sarre" focusable="false" fill="currentColor">${inner}</svg>`;
}

/* ---------- photography ---------- */
const sourceFor = { desktop: "hero-desktop", mobile: "hero-mobile" };
function srcset(slot, ext) {
  const m = data.images[slot];
  return m.widths.map((w) => `/img/${slot}-${w}.${ext} ${w}w`).join(", ");
}
/**
 * Cropped view of a supplied photograph. Cropping is CSS-only (object-position + scale)
 * so the supplied compositions are never altered. `src` picks the desktop (2:1) or mobile (4:5) master.
 */
export function photo({ src = "desktop", ratio = "4 / 5", pos = "50% 50%", scale = 1, alt = "", sizes = "100vw", cls = "", priority = false, label = "" }) {
  const slot = sourceFor[src];
  const m = data.images[slot];
  const mid = m.widths.includes(1280) ? 1280 : m.widths[m.widths.length - 1];
  const style = `--ratio:${ratio};--pos:${pos};--scale:${scale}`;
  return `<figure class="photo ${cls}" style="${style}">
  <picture>
    <source type="image/avif" srcset="${srcset(slot, "avif")}" sizes="${esc(sizes)}">
    <source type="image/webp" srcset="${srcset(slot, "webp")}" sizes="${esc(sizes)}">
    <img src="/img/${slot}-${mid}.webp" width="${m.width}" height="${m.height}" alt="${esc(alt)}"${priority ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>
  </picture>${label ? `<figcaption class="photo__tag">${esc(label)}</figcaption>` : ""}
</figure>`;
}

/* ---------- statistics ---------- */
const statusLabel = { provisional: "Provisional · third-party", "verified-as-reported-by-publisher": "As reported by publisher" };
export function stat({ display, unit = "", label, source, period, status, note = "", tone = "" }) {
  return `<div class="stat ${tone}">
  <p class="stat__value"><span>${esc(display)}</span>${unit ? `<small>${esc(unit)}</small>` : ""}</p>
  <p class="stat__label">${esc(label)}</p>
  <p class="stat__src">Source: <a href="${esc(source.url)}" rel="noopener noreferrer" target="_blank">${esc(source.name)}<span class="sr-only"> (opens in a new tab)</span></a> · ${esc(period)} · <em>${esc(statusLabel[status] || status)}</em></p>
  ${note ? `<p class="stat__note">${esc(note)}</p>` : ""}
</div>`;
}

/* ---------- television marquee ---------- */
export function tvMarquee() {
  const item = (c) =>
    `<li class="tv tv--${c.style}"><span class="tv__name">${esc(c.show)}</span>${c.currency === "recurring" ? `<span class="tv__tag">Recurring expert</span>` : ""}</li>`;
  const sparkleItem = ""; // separators are drawn with CSS so they are not announced
  const list = data.tv.credits.map(item).join(sparkleItem);
  return `<section class="marquee" aria-labelledby="tv-title" data-marquee>
  <div class="marquee__head">
    <h2 id="tv-title" class="marquee__title">Seen on television</h2>
    <p class="marquee__note">Appearances over the years. Not every credit is current.</p>
    <button class="marquee__toggle" type="button" data-marquee-toggle hidden aria-label="Pause scrolling television credits"><span class="marquee__icon" aria-hidden="true"></span><span data-marquee-label>Pause</span></button>
  </div>
  <div class="marquee__viewport">
    <div class="marquee__track" data-marquee-track>
      <ul class="marquee__list" aria-label="Television credits">${list}</ul>
      <ul class="marquee__list marquee__list--copy" aria-hidden="true">${list}</ul>
    </div>
  </div>
  ${config.preview ? `<p class="pv-note pv-note--tight"><strong>Preview note</strong> Credit list compiled from third-party sources, with only KTLA 5 recent. Reconcile with Anya’s official list before launch. Typeset names stand in for show marks.</p>` : ""}
</section>`;
}

/* ---------- press / publications ---------- */
export function pressList(entries, { compact = false } = {}) {
  return `<ul class="press ${compact ? "press--compact" : ""}">${entries
    .map(
      (e) => `<li class="press__item">
    <p class="press__type"><span>${esc(e.type)}</span></p>
    <div class="press__body">
      <p class="press__outlet press__outlet--${e.mastheadStyle}">${esc(e.outlet)}</p>
      <h3 class="press__title"><a href="${esc(e.url)}" rel="noopener noreferrer" target="_blank">${esc(e.title)}<span class="sr-only"> (opens in a new tab)</span></a></h3>
      <p class="press__meta">${esc(e.typeDetail)} · ${e.date ? `<time datetime="${esc(e.date)}">${esc(e.dateLabel)}</time>` : esc(e.dateLabel)}</p>
    </div>
  </li>`
    )
    .join("")}</ul>`;
}

export function mastheads(entries) {
  return `<ul class="mastheads">${entries
    .map(
      (e) => `<li><a class="masthead masthead--${e.mastheadStyle}" href="${esc(e.url)}" rel="noopener noreferrer" target="_blank"><span class="masthead__name">${esc(e.outlet)}</span><span class="masthead__type">${esc(e.type)}${e.date ? ` · ${esc(e.dateLabel)}` : ""}</span><span class="sr-only"> — ${esc(e.title)} (opens in a new tab)</span></a></li>`
    )
    .join("")}</ul>`;
}

/* ---------- closing enquiry band ---------- */
export function closingCta({ kicker = "Ready when you are", title = "Let’s make something good-looking.", text = "Tell Anya about the show, the brand, or the big night.", routeLinks = true } = {}) {
  return `<section class="closing" aria-labelledby="closing-title">
  <div class="wrap closing__grid">
    <div>
      <p class="kicker">${esc(kicker)}</p>
      <h2 id="closing-title" class="closing__title">${title}</h2>
      <p class="closing__text">${esc(text)}</p>
    </div>
    <div class="closing__actions">
      ${button("Work with Anya", "/contact/", "dark")}
      ${routeLinks ? `<ul class="closing__routes"><li><a href="/contact/?route=media#enquiry">Media &amp; hosting</a></li><li><a href="/contact/?route=brands#enquiry">Brand partnerships</a></li><li><a href="/contact/?route=styling#enquiry">Personal styling</a></li></ul>` : ""}
    </div>
  </div>
</section>`;
}

export const spin = `<svg class="badge" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><path id="badge-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0"/></defs><circle cx="60" cy="60" r="58" fill="currentColor" opacity="0"/><text><textPath href="#badge-circle" startOffset="0">Styled By Anya Inc. ✦ Los Angeles ✦ Styled By Anya Inc. ✦ Los Angeles ✦</textPath></text><path d="M60 44c1.2 10.800 5.200 14.800 16 16-10.800 1.200-14.800 5.200-16 16-1.200-10.800-5.200-14.800-16-16 10.800-1.200 14.800-5.200 16-16Z" fill="currentColor"/></svg>`;
