import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readJson = (p) => JSON.parse(readFileSync(path.join(root, p), "utf8"));
const readJsonIf = (p) => (existsSync(path.join(root, p)) ? readJson(p) : {});
export const data = {
  site: readJson("src/data/site.json"),
  tv: readJson("src/data/tv.json"),
  press: readJson("src/data/press.json"),
  metrics: readJson("src/data/metrics.json"),
  images: { ...readJson("src/data/images.json"), ...readJsonIf("src/data/images.private.json") },
  bio: readJson("src/data/bio.json"),
  // Gitignored (public repo); absent in public-safe builds.
  contact: process.env.SKIP_VIDEO === "1" ? {} : readJsonIf("src/data/contact.private.json"),
  pressArchive: readJson("src/data/press-archive.json"),
  pressDims: readJsonIf("src/data/press-archive.dims.private.json"),
};

/** Videos render only when their files exist locally (they are gitignored broadcaster footage); production also needs rights "cleared". */
export const visibleVideos = () =>
  process.env.SKIP_VIDEO === "1" ? [] : (data.press.videos || []).filter((v) => existsSync(path.join(root, "public", v.file)) && (config.preview || v.rights === "cleared"));
/** Rights-sensitive photographs (slots named still-*): present only in local/private builds; production also needs STILLS_CLEARED=1. */
export const stillsAllowed = () => process.env.SKIP_VIDEO !== "1" && (config.preview || process.env.STILLS_CLEARED === "1");
export const hasStill = (slot) => stillsAllowed() && Boolean(data.images[slot]) && existsSync(path.join(root, "public/img", `${slot}-${data.images[slot].widths[0]}.webp`));
/** Press-page scans (public/press/*, gitignored for rights): shown in preview when present; production needs PRESS_CLEARED=1. */
export const pressArchiveAllowed = () => process.env.SKIP_VIDEO !== "1" && (config.preview || process.env.PRESS_CLEARED === "1");
export const hasPressArchive = () => pressArchiveAllowed() && Object.keys(data.pressDims).length > 0;
export const pressEntries = () => data.press.entries.filter((e) => e.display).slice().sort((a, b) => (b.sort || 0) - (a.sort || 0));

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- small primitives ---------- */
const ICONS = {
  tv: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="m8 3 4 4 4-4"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.6-1.4 7.2L12 18l4.8 2.8-1.4-7.2"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  tag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  pen: '<path d="m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z"/><path d="m14.5 6.5 3 3"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h7"/>',
  hanger: '<path d="M12 8a2.2 2.2 0 1 0-2.2-2.2M12 8v3L3.4 17.2a1 1 0 0 0 .6 1.8h16a1 1 0 0 0 .6-1.8L12 11"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
  camera: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2.5v9L17 14"/>',
  sparkles: '<path d="M12 3c.6 4.6 3.4 7.4 8 8-4.600.6-7.400 3.400-8 8-.6-4.600-3.400-7.400-8-8 4.600-.6 7.400-3.400 8-8z"/>',
};
export const icon = (name, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

export const arrow = `<svg class="arrow" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M4 12h15M13 5.5 19.5 12 13 18.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>`;
export const sparkle = (cls = "") => `<svg class="sparkle ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0c.8 7.2 4.8 11.2 12 12-7.200.8-11.2 4.800-12 12-.8-7.200-4.800-11.200-12-12C7.200 11.200 11.200 7.200 12 0Z" fill="currentColor"/></svg>`;
export const squiggle = `<svg class="squiggle" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M2 6c8-8 12 8 20 0s12 8 20 0 12 8 20 0 12 8 20 0 12 8 20 0 12 8 16 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`;

export function button(label, href, variant = "solid", extra = "") {
  return `<a class="btn btn--${variant}" href="${esc(href)}"${extra}><span>${esc(label)}</span>${arrow}</a>`;
}

/** Visible only in the private preview; never shipped in a production build. */
export const pv = (text, cls = "") =>
  config.preview && process.env.PREVIEW_NOTES === "1" ? `<p class="pv-note ${cls}"><strong>Preview note</strong> ${text}</p>` : "";

/* ---------- wordmark (approved pack: Direction 01, Sculpted Masthead, genuine vector paths) ---------- */
const wordmarkCache = {};
/**
 * Inline SVG wordmark, recoloured through currentColor so one file serves every surface.
 * kind: "primary" | "compact" | "stacked". When `label` is false the SVG is decorative and the
 * adjacent text supplies the accessible name "Anya Sarre".
 */
export function wordmark(kind = "primary", cls = "", { label = true } = {}) {
  if (!wordmarkCache[kind]) {
    const svg = readFileSync(path.join(root, `assets/pack/01-Identity/wordmarks/svg/anya-sarre-${kind}-dark.svg`), "utf8");
    const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
    const inner = svg
      .replace(/^[\s\S]*?<svg[^>]*>/, "")
      .replace(/<\/svg>\s*$/, "")
      .replace(/<title>[\s\S]*?<\/title>/, "")
      .replace(/ aria-label="[^"]*"/g, "")
      .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"');
    wordmarkCache[kind] = { viewBox, inner };
  }
  const { viewBox, inner } = wordmarkCache[kind];
  const a11y = label ? 'role="img" aria-label="Anya Sarre"' : 'aria-hidden="true"';
  return `<svg class="wordmark wordmark--${kind} ${cls}" viewBox="${viewBox}" ${a11y} focusable="false">${inner}</svg>`;
}

/* ---------- photography ---------- */
function srcset(slot, ext) {
  const m = data.images[slot];
  return m.widths.map((w) => `/img/${slot}-${w}.${ext} ${w}w`).join(", ");
}
/**
 * Cropped view of a supplied hero export. `img` is "<option>-<desktop|mobile>", e.g. "01-mobile".
 * Cropping is CSS-only (object-position + scale) so the supplied compositions are never altered.
 */
export function photo({ img, ratio = "4 / 5", pos = "50% 50%", scale = 1, alt = "", sizes = "100vw", cls = "", priority = false, label = "" }) {
  const slot = /^(support-|still-)/.test(img) ? img : `hero-${img}`;
  const m = data.images[slot];
  if (!m) throw new Error(`Unknown image slot: ${slot}`);
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
/** Single-colour show mark, painted in the surrounding text colour through a CSS mask. The name is the accessible name. */
export function logoMark(logo, { named = true } = {}) {
  const a11y = named ? `role="img" aria-label="${esc(logo.alt)}"` : "";
  return `<span class="tv__logo" ${a11y} style="--logo:url(/${esc(logo.file)});--logo-h:${logo.displayHeight}px;--logo-ar:${logo.width}/${logo.height}"></span>`;
}

/**
 * Reusable auto-scrolling ticker. Server-rendered as a static, wrapped list (what no-JS and reduced-motion visitors get);
 * src/js/main.js enhances it: measures one list, clones it to fill any screen width, and loops it seamlessly.
 *  - name: what the pause button controls, read by assistive tech ("television credits")
 *  - direction: "left" (default) or "right"; speed: pixels per second
 */
export function ticker({ id, title, name, listLabel, itemsHtml, direction = "left", speed = 60, cls = "", headExtra = "", foot = "" }) {
  return `<section class="marquee ${cls}" aria-labelledby="${id}-title" data-marquee data-marquee-name="${esc(name)}" data-direction="${direction}" data-speed="${speed}">
  <div class="marquee__head">
    <h2 id="${id}-title" class="marquee__title">${title}</h2>
    <button class="marquee__toggle" type="button" data-marquee-toggle hidden aria-label="Pause scrolling ${esc(name)}"><span class="marquee__icon" aria-hidden="true"></span><span data-marquee-label>Pause</span></button>
    ${headExtra}
  </div>
  <div class="marquee__viewport">
    <div class="marquee__track" data-marquee-track>
      <ul class="marquee__list" aria-label="${esc(listLabel)}">${itemsHtml}</ul>
    </div>
  </div>
  ${foot}
</section>`;
}

export function tvMarquee() {
  // Official show marks from Anya's Watch Anya page, as single-colour masks. Credits without a mark stay out (a typeset stand-in would be the wrong typeface).
  const items = data.tv.credits.filter((c) => c.logo).map((c) => `<li class="tv">${logoMark(c.logo)}</li>`).join("");
  return ticker({ id: "tv", title: "Seen on television", name: "television credits", listLabel: "Television credits", itemsHtml: items, speed: 70 });
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
      (e) => `<li><a class="masthead masthead--${e.mastheadStyle}" href="${esc(e.url)}" rel="noopener noreferrer" target="_blank"><span class="masthead__name">${esc(e.outlet)}</span><span class="masthead__type">${esc(e.type)}${/^Undated/.test(e.dateLabel) ? "" : ` · ${esc(e.dateLabel)}`}</span><span class="sr-only"> — ${esc(e.title)} (opens in a new tab)</span></a></li>`
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
      ${button("Work with Anya", "/talk-to-anya/", "dark")}
      ${routeLinks ? `<ul class="closing__routes"><li><a href="/talk-to-anya/?route=media#enquiry">Media &amp; hosting</a></li><li><a href="/talk-to-anya/?route=brands#enquiry">Brand partnerships</a></li><li><a href="/talk-to-anya/?route=styling#enquiry">Personal styling</a></li></ul>` : ""}
    </div>
  </div>
</section>`;
}

/* ---------- selected videos: click-to-load, no autoplay, no preload ---------- */
const mmss = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
export function videoGrid(videos) {
  return `<ul class="videos__grid">${videos
    .map(
      (v) => `<li class="video">
    <a class="video__play" href="/${esc(v.file)}" data-video-src="/${esc(v.file)}" data-video-poster="/${esc(v.poster)}" data-video-title="${esc(v.title)}">
      <img src="/${esc(v.poster)}" width="${v.width}" height="${v.height}" alt="" loading="lazy" decoding="async">
      <span class="video__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
      <span class="video__dur" aria-hidden="true">${mmss(v.seconds)}</span>
      <span class="sr-only">Play video: ${esc(v.title)}, ${esc(v.outlet)}, ${Math.floor(v.seconds / 60)} minutes ${v.seconds % 60} seconds. Opens the video file if scripting is off.</span>
    </a>
    <div class="video__cap"><h3>${esc(v.title)}</h3><p>${esc(v.outlet)} · ${esc(v.dateLabel)}</p></div>
  </li>`
    )
    .join("")}</ul>`;
}

/* ---------- programme panels: official marks + the numbers each publisher reports ---------- */
const svgDims = (file) => {
  const t = readFileSync(path.join(root, "public", file), "utf8");
  const [, w, h] = t.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  return { width: Math.round(w), height: Math.round(h) };
};
export const markFromFile = ({ file, alt, h }) => logoMark({ file, alt, displayHeight: h, ...svgDims(file) });

const sourceLinks = (sources) =>
  sources.map((x) => (x.url ? `<a href="${esc(x.url)}" rel="noopener noreferrer" target="_blank">${esc(x.name)}<span class="sr-only"> (opens in a new tab)</span></a>` : esc(x.name))).join(" · ");

export function showCard({ id, logos, title, lead, extra = "" }) {
  const p = data.metrics.programmes[id];
  return `<article class="showcard showcard--${id}">
  <div class="showcard__logos">${logos.map((l) => markFromFile(l)).join("")}</div>
  <h3 class="showcard__title">${title}</h3>
  <p class="showcard__lead">${lead}</p>
  <ul class="showcard__stats">${p.stats.map((x) => `<li><strong>${esc(x.display)}</strong><span>${esc(x.label)}</span></li>`).join("")}</ul>
  ${extra}
  <p class="showcard__src">Source: ${sourceLinks(p.sources)} · ${esc(p.period)}.</p>
  <p class="showcard__note">${esc(p.note)}</p>
</article>`;
}

export const unscriptedLogos = () => data.metrics.programmes.unscripted.logos;

/* ---------- "Featured in": publication titles only, as white marks where a clean logo exists ---------- */
const FEATURED = ["variety", "the-hollywood-reporter", "us-weekly", "ok", "life-and-style", "tv-guide", "los-angeles-confidential", "inside-weddings"]; // major, recognisable titles only; the full list lives in the press archive
const OFFSITE = {
  "beverly-hills-courier": { name: "Beverly Hills Courier", url: "https://beverlyhillscourier.com/2024/11/12/the-stylists-shaping-beverly-hills" },
  "local-life": { name: "LOCAL Life", url: "https://www.locallifesc.com/qa-celebrity-connection-anya-sarre/" },
};
function publicationItems() {
  const byslug = Object.fromEntries(data.pressArchive.outlets.map((o) => [o.slug, o]));
  const archive = hasPressArchive();
  return FEATURED.map((slug) => {
    const o = byslug[slug] || OFFSITE[slug];
    if (!o) return "";
    const logoFile = `img/logos/pub-${slug}.svg`;
    const hasLogo = existsSync(path.join(root, "public", logoFile));
    const label = hasLogo ? logoMark({ file: logoFile, alt: o.name, ...svgDims(logoFile), displayHeight: 34 }) : `<span class="pub__name">${esc(o.name)}</span>`;
    const href = OFFSITE[slug]?.url || (archive && byslug[slug] ? `/media/#press-${slug}` : "");
    const ext = OFFSITE[slug] ? ` rel="noopener noreferrer" target="_blank"` : "";
    const sr = OFFSITE[slug] ? `<span class="sr-only"> (opens in a new tab)</span>` : "";
    return `<li class="pub">${href ? `<a class="pub__link" href="${esc(href)}"${ext}>${label}${sr}</a>` : label}</li>`;
  }).join("");
}

/** "As featured in": slim, calm, auto-scrolling banner of the major titles only (the full list lives in the press archive). */
export function featuredBanner() {
  const more = hasPressArchive() ? `<a class="marquee__more" href="/media/#press-archive">Browse the full press archive ${arrow}</a>` : "";
  return ticker({
    id: "featured", title: "As featured in", name: "publication names", listLabel: "Major publications that have featured Anya",
    itemsHtml: publicationItems(), direction: "right", speed: 42, cls: "marquee--banner", headExtra: more,
  });
}

/* ---------- press archive: scans of Anya's press pages, grouped by publication, with a lightbox ---------- */
const ARCHIVE_VISIBLE = 6;
export function pressArchive() {
  const dims = data.pressDims;
  const outlets = data.pressArchive.outlets.filter((o) => o.items.some((i) => dims[i.file]));
  const total = outlets.reduce((n, o) => n + o.items.filter((i) => dims[i.file]).length, 0);
  const fig = (o, i) => {
    const d = dims[i.file];
    const cap = [i.type, i.title].filter(Boolean).join(" · ");
    const text = `${o.name}${i.dateLabel ? `, ${i.dateLabel}` : ""}${cap ? `. ${cap}` : ""}`;
    return `<li class="scan"><a class="scan__link" href="/press/${esc(i.file)}-full.webp" data-lightbox data-group="${o.kind === "online" ? "online" : esc(o.slug)}" data-caption="${esc(text)}" data-w="${d.fw}" data-h="${d.fh}">
      <img src="/press/${esc(i.file)}-thumb.webp" width="${d.tw}" height="${d.th}" alt="Scan of ${esc(o.name)}${i.dateLabel ? `, ${esc(i.dateLabel)}` : ""}${i.title ? `: ${esc(i.title)}` : ""}" loading="lazy" decoding="async">
      <span class="sr-only"> (opens a larger view)</span></a>
      <p class="scan__cap">${i.dateLabel ? `<span>${esc(i.dateLabel)}</span>` : ""}${i.title ? ` ${esc(i.title)}` : ""}</p></li>`;
  };
  const block = (o) => {
    const its = o.items.filter((i) => dims[i.file]);
    const shown = its.slice(0, ARCHIVE_VISIBLE), rest = its.slice(ARCHIVE_VISIBLE);
    return `<article class="outlet" id="press-${esc(o.slug)}" aria-labelledby="h-${esc(o.slug)}">
    <header class="outlet__head"><h3 id="h-${esc(o.slug)}" class="outlet__name">${esc(o.name)}</h3><p class="outlet__count">${its.length} ${its.length === 1 ? "page" : "pages"}</p></header>
    <div class="outlet__body"><ul class="scans">${shown.map((i) => fig(o, i)).join("")}</ul>
    ${rest.length ? `<details class="outlet__more"><summary>Show ${rest.length} more ${o.name} pages</summary><ul class="scans">${rest.map((i) => fig(o, i)).join("")}</ul></details>` : ""}</div>
  </article>`;
  };
  // Online features are one page each from many small sites, so they sit together in one wall, each captioned with its site name.
  const onlineBlock = (os) => {
    const figs = os.flatMap((o) => o.items.filter((i) => dims[i.file]).map((i, n) => ({ o, i, n })));
    const li = ({ o, i, n }) => fig(o, i).replace('<li class="scan">', `<li class="scan"${n === 0 ? ` id="press-${esc(o.slug)}"` : ""}>`).replace('<p class="scan__cap">', `<p class="scan__cap"><b class="scan__site">${esc(o.name)}</b> `);
    return `<article class="outlet" id="press-online" aria-labelledby="h-online">
    <header class="outlet__head"><h3 id="h-online" class="outlet__name">Online features</h3><p class="outlet__count">${figs.length} pages from ${os.length} sites</p></header>
    <div class="outlet__body"><ul class="scans">${figs.map(li).join("")}</ul></div>
  </article>`;
  };
  const group = (kind, title) => {
    const os = outlets.filter((o) => o.kind === kind);
    if (!os.length) return "";
    return `<div class="archive__group"><h3 class="archive__group-title">${title}</h3>${kind === "online" ? onlineBlock(os) : os.map(block).join("")}</div>`;
  };
  const idx = outlets.map((o) => `<li><a href="#press-${esc(o.slug)}">${esc(o.name)}</a></li>`).join("");
  return `<section class="archive" id="press-archive" aria-labelledby="archive-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="kicker">Press archive</p>
        <h2 id="archive-title" class="section-title">The clippings, <em>in full</em></h2>
      </div>
      <p class="section-sub">${total} pages from ${outlets.length} publications, scanned from Anya’s own press pages. Select any page to read it.</p>
    </div>
    <nav class="archive__index" aria-label="Jump to a publication"><ul>${idx}</ul></nav>
    ${group("print", "In print")}
    ${group("online", "Online")}
  </div>
</section>`;
}
