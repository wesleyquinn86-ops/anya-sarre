// Static checks over dist/: structure, links, images, SEO tags, structured data. No dependencies.
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.resolve(root, process.env.OUT_DIR || "dist");
const failures = [];
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) failures.push(msg); };
const exists = (p) => stat(p).then(() => true, () => false);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const htmlFiles = (await walk(dist)).filter((f) => f.endsWith(".html"));
const robotsTxt = await readFile(path.join(dist, "robots.txt"), "utf8");
const preview = /Disallow: \/\s*$/m.test(robotsTxt);

const idsByFile = {};
const pages = {};
for (const f of htmlFiles) {
  const html = await readFile(f, "utf8");
  const rel = "/" + path.relative(dist, f).replace(/index\.html$/, "");
  pages[rel] = html;
  idsByFile[rel] = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
}

for (const [rel, html] of Object.entries(pages)) {
  const tag = `[${rel}]`;
  ok(/<html lang="en-US">/.test(html), `${tag} missing lang="en-US"`);
  ok(/<title>[^<]{10,}<\/title>/.test(html), `${tag} missing/short <title>`);
  ok(/<meta name="description" content="[^"]{50,}/.test(html), `${tag} missing/short meta description`);
  ok((html.match(/<h1[\s>]/g) || []).length === 1, `${tag} must have exactly one <h1>`);
  ok(/<main id="main"/.test(html) && /<header/.test(html) && /<footer/.test(html) && /<nav[^>]+aria-label/.test(html), `${tag} missing landmarks`);
  ok(/class="skip-link"/.test(html), `${tag} missing skip link`);
  ok(/og:title/.test(html) && /og:image/.test(html) && /twitter:card/.test(html), `${tag} missing social tags`);
  ok(/rel="icon"/.test(html), `${tag} missing favicon`);
  if (preview) {
    ok(/<meta name="robots" content="noindex/.test(html), `${tag} preview must be noindex`);
    ok(!/rel="canonical"/.test(html) || true, "");
  } else {
    ok(/<meta name="robots" content="index/.test(html), `${tag} production must be indexable`);
    ok(/rel="canonical" href="https?:\/\//.test(html), `${tag} production needs absolute canonical`);
    ok(!/preview-bar|pv-note/.test(html), `${tag} production still contains preview chrome`);
    const visibleText = html.replace(/<script[\s\S]*?<\/script>/g, "");
    ok(!/to be confirmed|to confirm|date to confirm/i.test(visibleText), `${tag} production copy still contains a "to confirm" placeholder (see docs/LAUNCH-CONFIRMATIONS.md)`);
  }
  // heading order: never skip a level downward
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let prev = 0, skipped = false;
  for (const l of levels) { if (prev && l > prev + 1) skipped = true; prev = l; }
  ok(!skipped, `${tag} heading levels skip (${levels.join(",")})`);
  // images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    ok(/\salt="/.test(m[0]), `${tag} <img> without alt: ${m[0].slice(0, 80)}`);
    ok(/\swidth="\d+"/.test(m[0]) && /\sheight="\d+"/.test(m[0]), `${tag} <img> without width/height (layout shift)`);
  }
  // links
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>/g)) {
    const href = m[1];
    ok(href !== "" && href !== "#", `${tag} empty href`);
    if (/^https?:\/\//.test(href)) {
      if (/target="_blank"/.test(m[0])) ok(/rel="[^"]*noopener/.test(m[0]), `${tag} external _blank link without noopener: ${href}`);
      continue;
    }
    if (href.startsWith("mailto:")) continue;
    const [p0, hash] = href.split("#");
    const [pathname] = p0.split("?");
    const target = pathname === "" ? rel : pathname;
    const file = target.endsWith("/") ? path.join(dist, target, "index.html") : path.join(dist, target);
    ok(await exists(file), `${tag} broken internal link: ${href}`);
    if (hash && idsByFile[target]) ok(idsByFile[target].has(hash), `${tag} missing anchor target: ${href}`);
  }
  // local assets
  for (const m of html.matchAll(/(?:src|href|srcset)="(\/[^"]+)"/g)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0].split("?")[0];
      if (!u.startsWith("/") || u.endsWith("/") || !/\.[a-z0-9]+$/i.test(u)) continue;
      ok(await exists(path.join(dist, u)), `${tag} missing asset: ${u}`);
    }
  }
  // json-ld
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); ok(j["@context"] === "https://schema.org", `${tag} JSON-LD context`); }
    catch { ok(false, `${tag} JSON-LD does not parse`); }
  }
  ok(!/undefined|\[object|NaN/.test(html.replace(/<script[\s\S]*?<\/script>/g, "")), `${tag} contains "undefined"/"[object"/"NaN"`);
}

ok(await exists(path.join(dist, "_headers")), "missing _headers");
ok(await exists(path.join(dist, "og.png")), "missing og.png");
ok(await exists(path.join(dist, "favicon.svg")), "missing favicon.svg");
if (preview) {
  ok(!(await exists(path.join(dist, "sitemap.xml"))), "preview must not ship a sitemap");
  ok(/X-Robots-Tag: noindex/.test(await readFile(path.join(dist, "_headers"), "utf8")), "preview _headers must send X-Robots-Tag: noindex");
} else {
  ok(await exists(path.join(dist, "sitemap.xml")), "production needs sitemap.xml");
}

console.log(`${preview ? "preview" : "production"} build: ${Object.keys(pages).length} HTML files, ${checks} checks`);
if (failures.length) { console.error("FAILED:\n - " + failures.join("\n - ")); process.exit(1); }
console.log("All static checks passed.");
