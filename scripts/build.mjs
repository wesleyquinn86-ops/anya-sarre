// Static build: renders pages from src/ into dist/ for Cloudflare Pages.
import { mkdir, rm, cp, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { config } from "../src/config.mjs";
import { layout, JS_FLAG } from "../src/templates/layout.mjs";
import { visibleVideos, stillsAllowed } from "../src/templates/components.mjs";
import { readdir } from "node:fs/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.resolve(root, process.env.OUT_DIR || "dist");
const hash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 10);

// ---- launch gates -------------------------------------------------------------
if (!config.preview) {
  const problems = [];
  if (!config.siteUrl) problems.push("SITE_URL is required for a production build (canonical, sitemap, social URLs).");
  if (!config.formEndpoint && !config.emails.general && !config.emails.media) problems.push("Set FORM_ENDPOINT and/or CONTACT_EMAIL: there is no verified way to enquire.");
  if (problems.length) {
    console.error("Production build blocked:\n - " + problems.join("\n - "));
    process.exit(1);
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });
await cp(path.join(root, "public"), dist, { recursive: true });
// Rights-sensitive stills (still-*): ship only when allowed.
if (!stillsAllowed()) for (const f of await readdir(path.join(dist, "img")).catch(() => [])) if (f.startsWith("still-")) await rm(path.join(dist, "img", f), { force: true });
// Broadcaster footage: ship only clips the page actually offers (preview: all local clips; production: only rights "cleared"; SKIP_VIDEO=1: none).
{
  const allowed = new Set(visibleVideos().flatMap((v) => [v.file, v.poster]));
  const dir = path.join(dist, "video");
  for (const f of await readdir(dir).catch(() => [])) if (!allowed.has(`video/${f}`)) await rm(path.join(dir, f), { force: true });
  if ((await readdir(dir).catch(() => ["x"])).length === 0) await rm(dir, { recursive: true, force: true });
}

const css = await readFile(path.join(root, "src/css/styles.css"));
const js = await readFile(path.join(root, "src/js/main.js"));
await writeFile(path.join(dist, "assets/styles.css"), css);
await writeFile(path.join(dist, "assets/main.js"), js);
const ctx = { cssHash: hash(css), jsHash: hash(js) };

const pageNames = ["home", "meet-anya", "styling", "media", "partnerships", "talk-to-anya"];
const pages = [];
for (const name of pageNames) {
  const mod = await import(pathToFileURL(path.join(root, `src/pages/${name}.mjs`)));
  pages.push(mod.default);
}
for (const page of pages) {
  const html = layout({ page, ctx });
  const out = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, page.path, "index.html");
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
}

// 404
const notFound = {
  path: "/404.html",
  active: "",
  title: "Page not found",
  description: "That page could not be found. Head back to the homepage or get in touch with Anya Sarre.",
  body: `<section class="page-hero"><div class="wrap"><p class="kicker kicker--pink">404</p><h1 class="page-hero__title">That look <em>didn’t make the cut.</em></h1><p class="page-hero__lead">The page you’re after doesn’t exist. Try the <a href="/">homepage</a> or <a href="/talk-to-anya/">talk to Anya</a>.</p></div></section>`,
};
await writeFile(path.join(dist, "404.html"), layout({ page: notFound, ctx }));

// ---- crawler + hosting files --------------------------------------------------
const flagHash = createHash("sha256").update(JS_FLAG).digest("base64");
const formOrigin = config.formEndpoint ? new URL(config.formEndpoint).origin : "";
const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'sha256-${flagHash}'`,
  `connect-src 'self' ${formOrigin}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' " + formOrigin,
].join("; ");
const headers = [
  "/*",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
  `  Content-Security-Policy: ${csp}`,
  ...(config.preview ? ["  X-Robots-Tag: noindex, nofollow, noarchive"] : []),
  "",
  "/fonts/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "/img/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "/assets/*",
  "  Cache-Control: public, max-age=3600",
  "",
].join("\n");
await writeFile(path.join(dist, "_headers"), headers);

if (config.preview) {
  await writeFile(path.join(dist, "robots.txt"), "# Private concept preview. Not for indexing.\nUser-agent: *\nDisallow: /\n");
} else {
  const urls = pages.map((p) => `  <url><loc>${config.siteUrl}${p.path}</loc></url>`).join("\n");
  await writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
}

console.log(`Built ${pages.length + 1} pages in ${config.mode} mode -> ${path.relative(root, dist)}/ (${config.preview ? "noindex" : "indexable, " + config.siteUrl})`);
