// Browser verification (Playwright + axe-core). Starts its own static servers; never contacts a real form endpoint.
// Usage: npm run verify            (expects playwright to be resolvable; see NODE_PATH note in README)
import { createRequire } from "node:module";
import { spawn, execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let playwright;
for (const base of [root + "/", "/opt/node22/lib/node_modules/", process.env.PLAYWRIGHT_PATH ? process.env.PLAYWRIGHT_PATH + "/" : ""]) {
  if (!base) continue;
  try { playwright = createRequire(base)("playwright"); break; } catch { /* try next location */ }
}
if (!playwright) { console.error("playwright not found. Install it or set PLAYWRIGHT_PATH to its node_modules parent."); process.exit(2); }
const { chromium } = playwright;
const axeSource = readFileSync(path.join(root, "node_modules/axe-core/axe.min.js"), "utf8");

const results = [];
const note = (area, ok, detail = "") => { results.push({ area, ok, detail }); if (!ok) console.log(`  ✗ ${area} ${detail}`); };

// ---- build the two variants -----------------------------------------------------------
const run = (env) => execFileSync("node", ["scripts/build.mjs"], { cwd: root, env: { ...process.env, ...env }, stdio: "pipe" });
run({ OUT_DIR: "dist" });
const FORM = "https://forms.invalid/enquiry"; // .invalid never resolves; requests are intercepted anyway
run({ OUT_DIR: "dist-test", FORM_ENDPOINT: FORM, CONTACT_EMAIL: "test@example.invalid" });
const servers = [];
const serve = (dist, port) => { const p = spawn("node", ["scripts/serve.mjs"], { cwd: root, env: { ...process.env, DIST: dist, PORT: String(port) }, stdio: "ignore" }); servers.push(p); };
serve("dist", 4181); serve("dist-test", 4182);
await new Promise((r) => setTimeout(r, 1200));
const BASE = "http://localhost:4181", BASE_FORM = "http://localhost:4182";

const PAGES = ["/", "/meet-anya/", "/styling/", "/media/", "/partnerships/", "/talk-to-anya/"];
const WIDTHS = [320, 390, 768, 1024, 1440];
const browser = await chromium.launch();

async function openPage(ctx, url) {
  const page = await ctx.newPage();
  const errors = [], failed = [];
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("requestfailed", (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.url()} ${r.status()}`); });
  await page.goto(url, { waitUntil: "networkidle" });
  return { page, errors, failed };
}

// ---- 1. every page x width: console, overflow, images, nav -----------------------------
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, reducedMotion: "no-preference" });
  for (const p of PAGES) {
    const { page, errors, failed } = await openPage(ctx, BASE + p);
    const tag = `${p} @${w}`;
    await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
    await page.waitForTimeout(250);
    note(`console clean ${tag}`, errors.length === 0, errors.join(" | "));
    note(`no failed requests ${tag}`, failed.length === 0, failed.join(" | "));
    const over = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const bad = [...document.querySelectorAll("body *")].filter((el) => { const r = el.getBoundingClientRect(); return r.width && (r.right > vw + 1 || r.left < -1) && !el.closest(".marquee__viewport, .table-wrap, .sr-only, .hp, .badge, .photo"); }).slice(0, 3).map((e) => e.tagName + "." + e.className);
      return { sw: document.documentElement.scrollWidth, vw, bad };
    });
    note(`no horizontal overflow ${tag}`, over.sw <= over.vw && over.bad.length === 0, JSON.stringify(over));
    const imgs = await page.evaluate(() => [...document.images].filter((i) => !i.closest("details:not([open]), dialog")).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    note(`images decode ${tag}`, imgs.length === 0, imgs.join(","));
    // navigation visibility
    const nav = await page.evaluate(() => {
      const t = document.querySelector("[data-nav-toggle]"), n = document.querySelector("[data-nav]");
      const vis = (e) => e && getComputedStyle(e).display !== "none" && e.getBoundingClientRect().width > 0;
      return { toggle: vis(t), nav: vis(n) };
    });
    if (w >= 1200) note(`desktop nav inline ${tag}`, nav.nav && !nav.toggle, JSON.stringify(nav));
    else {
      note(`mobile nav collapsed + toggle ${tag}`, nav.toggle && !nav.nav, JSON.stringify(nav));
      await page.click("[data-nav-toggle]");
      const open = await page.evaluate(() => ({ exp: document.querySelector("[data-nav-toggle]").getAttribute("aria-expanded"), links: [...document.querySelectorAll("[data-nav] a")].filter((a) => a.getBoundingClientRect().height > 0).length }));
      note(`mobile nav opens ${tag}`, open.exp === "true" && open.links >= 7, JSON.stringify(open));
      await page.keyboard.press("Escape");
      const closed = await page.getAttribute("[data-nav-toggle]", "aria-expanded");
      note(`mobile nav closes on Escape ${tag}`, closed === "false");
    }
    await page.close();
  }
  await ctx.close();
}

// ---- 2. accessibility (axe) at phone + desktop --------------------------------------------
for (const w of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  for (const p of PAGES) {
    const { page } = await openPage(ctx, BASE + p);
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] }, resultTypes: ["violations"] }));
    const v = res.violations.map((x) => `${x.id}(${x.nodes.length}): ${x.nodes.slice(0, 2).map((n) => n.target.join(" ")).join("; ")}`);
    note(`axe ${p} @${w}`, v.length === 0, v.join(" || "));
    await page.close();
  }
  await ctx.close();
}

// ---- 3. hero art direction + wordmark safe area ----------------------------------------------
for (const [w, mobile] of [[1440, false], [1024, false], [768, false], [767, true], [390, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const { page } = await openPage(ctx, BASE + "/");
  const m = await page.evaluate(() => {
    const img = document.querySelector(".hero__photo"), stage = document.querySelector(".hero__stage"), h1 = [...document.querySelectorAll(".hero__mark")].find((e) => e.getBoundingClientRect().width > 0); // the visible logo, not its padded heading box
    const s = stage.getBoundingClientRect(), r = h1.getBoundingClientRect(), i = img.getBoundingClientRect();
    return { src: img.currentSrc, ratio: i.width / i.height, above: r.bottom <= i.top + 1, l: (r.left - s.left) / s.width, rt: (r.right - s.left) / s.width, t: (r.top - s.top) / s.height, b: (r.bottom - s.top) / s.height, pos: getComputedStyle(img).objectPosition };
  });
  note(`home hero uses ${mobile ? "mobile" : "desktop"} master @${w}`, mobile ? /hero-home-mobile/.test(m.src) : /hero-home-desktop/.test(m.src), m.src);
  note(`hero ratio ${mobile ? "4:5" : "2.4:1"} @${w}`, mobile ? Math.abs(m.ratio - 0.8) < 0.02 : Math.abs(m.ratio - 2.4) < 0.03, String(m.ratio));
  if (mobile) note(`mobile: compact wordmark sits above the photo, nothing overlays the face @${w}`, m.above && m.l >= 0.02 && m.rt <= 0.98, JSON.stringify(m));
  else note(`wordmark inside the clear left field (<35% of width, clear of the stylist and face) @${w}`, m.l >= 0.04 && m.rt <= 0.31 && m.t >= 0.15 && m.b <= 0.85, JSON.stringify(m));
  await page.close(); await ctx.close();
}

// ---- 4. marquee behaviour --------------------------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  const { page } = await openPage(ctx, BASE + "/");
  const state = () => page.evaluate(() => { const t = document.querySelector("[data-marquee-track]"); const cs = getComputedStyle(t); return { name: cs.animationName, play: cs.animationPlayState, label: document.querySelector("[data-marquee-label]").textContent, st: document.querySelector("[data-marquee]").dataset.state }; });
  let s = await state();
  note("marquee animates by default", s.name === "marquee" && s.play === "running", JSON.stringify(s));
  note("marquee sits directly after hero", await page.evaluate(() => document.querySelector(".hero").nextElementSibling === document.querySelector("[data-marquee]")));
  note("marquee has visible pause control", await page.isVisible("[data-marquee-toggle]"));
  await page.click("[data-marquee-toggle]"); // mouse is hovering the control here
  s = await state(); note("pause button pauses (while hovered)", s.play === "paused" && s.label === "Resume", JSON.stringify(s));
  await page.mouse.move(5, 5); await page.waitForTimeout(100);
  s = await state(); note("manual pause persists after pointer leaves", s.play === "paused" && s.label === "Resume", JSON.stringify(s));
  await page.click("[data-marquee-toggle]"); s = await state();
  note("resume button resumes even while hovered", s.play === "running" && s.label === "Pause", JSON.stringify(s));
  await page.mouse.move(5, 5); await page.waitForTimeout(100);
  await page.hover(".marquee__viewport"); await page.waitForTimeout(100);
  s = await state(); note("hover pauses", s.play === "paused", JSON.stringify(s));
  await page.mouse.move(5, 5); await page.waitForTimeout(100);
  s = await state(); note("leaving hover resumes", s.play === "running", JSON.stringify(s));
  // keyboard focus pauses
  await page.focus("[data-marquee-toggle]");
  await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(100);
  s = await state(); note("keyboard focus pauses", s.play === "paused", JSON.stringify(s));
  await page.keyboard.press("Enter"); await page.waitForTimeout(100);
  s = await state(); note("Enter on focused Pause keeps it paused (label Resume)", s.play === "paused" && s.label === "Resume", JSON.stringify(s));
  await page.keyboard.press("Enter"); await page.waitForTimeout(100);
  s = await state(); note("Enter on focused Resume runs despite focus", s.play === "running" && s.label === "Pause", JSON.stringify(s));
  // no duplicate announcements / keyboard stops
  const a11y = await page.evaluate(() => {
    const copy = document.querySelector(".marquee__list--copy");
    const track = document.querySelector("[data-marquee-track]");
    const focusables = track.querySelectorAll("a, button, input, select, textarea, [tabindex]");
    return { copyHidden: copy.getAttribute("aria-hidden") === "true", focusables: focusables.length, readable: [...document.querySelectorAll(".marquee__list:not([aria-hidden]) li")].length, total: document.querySelectorAll(".marquee li").length };
  });
  note("duplicate list hidden from assistive tech", a11y.copyHidden && a11y.readable * 2 === a11y.total, JSON.stringify(a11y));
  note("no keyboard stops inside scrolling track", a11y.focusables === 0, String(a11y.focusables));
  // loop is seamless: two equal lists
  const eq = await page.evaluate(() => { const [a, b] = document.querySelectorAll(".marquee__list"); return Math.abs(a.getBoundingClientRect().width - b.getBoundingClientRect().width) < 1; });
  note("loop lists are equal width (seamless)", eq);
  await page.close(); await ctx.close();

  const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const rp = await openPage(rctx, BASE + "/");
  const rm = await rp.page.evaluate(() => {
    const t = document.querySelector("[data-marquee-track]"), cs = getComputedStyle(t);
    const copy = getComputedStyle(document.querySelector(".marquee__list--copy")).display;
    const list = document.querySelector(".marquee__list");
    return { anim: cs.animationName, copy, btn: getComputedStyle(document.querySelector("[data-marquee-toggle]")).display, wrap: getComputedStyle(list).flexWrap, items: [...list.querySelectorAll("li")].every((li) => li.getBoundingClientRect().right <= innerWidth), overflow: document.documentElement.scrollWidth <= innerWidth };
  });
  note("reduced motion: static, wrapped, readable list", rm.anim === "none" && rm.copy === "none" && rm.btn === "none" && rm.wrap === "wrap" && rm.items && rm.overflow, JSON.stringify(rm));
  await rp.page.close(); await rctx.close();

  const nctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const np = await nctx.newPage(); await np.goto(BASE + "/", { waitUntil: "load" });
  const nj = await np.evaluate(() => null).catch(() => null);
  const njState = await np.$eval("[data-marquee-track]", (t) => getComputedStyle(t).animationName);
  note("no-JS: marquee does not animate (no uncontrollable motion)", njState === "none", njState);
  await np.close(); await nctx.close();
}

// ---- 5. keyboard: skip link + visible focus ----------------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const { page } = await openPage(ctx, BASE + "/");
  await page.keyboard.press("Tab"); await page.waitForTimeout(300);
  const first = await page.evaluate(() => { const a = document.activeElement, r = a.getBoundingClientRect(); return { cls: a.className, top: r.top, w: r.width }; });
  note("first Tab stop is a visible skip link", /skip-link/.test(first.cls) && first.top >= 0, JSON.stringify(first));
  await page.keyboard.press("Enter");
  note("skip link moves focus to main", await page.evaluate(() => document.activeElement.id === "main"));
  let bad = 0, stops = 0;
  await page.focus("body");
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab"); stops++;
    const vis = await page.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return true; const cs = getComputedStyle(a); return cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2; });
    if (!vis) bad++;
  }
  note("focus indicator visible on first 40 tab stops", bad === 0, `${bad}/${stops} without outline`);
  await page.close(); await ctx.close();
}

// ---- 6. contact form: truthful states (endpoint mocked in-browser) ------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
  // Preview with no endpoint: the form exists and validates, but must never claim to send anything.
  const off = await openPage(await browser.newContext({ viewport: { width: 1440, height: 900 } }), BASE + "/talk-to-anya/");
  const reqs = []; off.page.on("request", (r) => { if (!r.url().startsWith(BASE)) reqs.push(r.url()); });
  note("not-live form is present and no number or sms link anywhere on the page", (await off.page.locator("form#enquiry-form").count()) === 1 && (await off.page.locator('a[href^="sms:"], a[href^="tel:"]').count()) === 0 && !/\b310[.\s-]?867/.test(await off.page.content()));
  await off.page.click("[data-submit]");
  note("not-live form: empty submit shows validation errors", (await off.page.locator(".field__err:visible").count()) === 3);
  await off.page.fill("#f-name", "Test Person"); await off.page.fill("#f-email", "tester@example.invalid"); await off.page.fill("#f-msg", "This is an automated test message with enough characters.");
  await off.page.click("[data-submit]"); await off.page.waitForTimeout(250);
  const nl = await off.page.textContent("[data-form-status]");
  note("not-live form: says it isn't live, never claims success, sends nothing", /isn.t live/i.test(nl) && !/thank you|your enquiry has been sent/i.test(nl) && reqs.length === 0, nl + " | " + reqs.join(","));
  note("not-live form: offers a pre-filled mailto", (await off.page.locator('[data-form-status] a[href^="mailto:"]').count()) === 1);
  await off.page.close();

  const { page } = await openPage(ctx, BASE_FORM + "/talk-to-anya/?route=brands");
  let posts = 0, mode = "ok", lastBody = null;
  await page.route(FORM, async (route) => {
    const req = route.request();
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "POST" } });
    posts++; lastBody = req.postData();
    if (mode === "abort") return route.abort("failed");
    return route.fulfill({ status: mode === "ok" ? 200 : 500, headers: { "access-control-allow-origin": "*", "content-type": "application/json" }, body: "{}" });
  });
  note("route preselected from ?route=brands", await page.isChecked('input[name="route"][value="brands"]'));
  await page.click("[data-submit]");
  note("empty submit: errors shown, nothing sent", posts === 0 && (await page.locator(".field__err:visible").count()) === 3 && (await page.getAttribute("#f-name", "aria-invalid")) === "true");
  await page.fill("#f-name", "Test Person"); await page.fill("#f-email", "not-an-email"); await page.fill("#f-msg", "Short");
  await page.click("[data-submit]");
  note("invalid email/short message blocked", posts === 0 && (await page.textContent('[data-err="email"]')).includes("valid"));
  await page.fill("#f-email", "tester@example.invalid"); await page.fill("#f-msg", "This is an automated test message with enough characters.");
  mode = "500"; await page.click("[data-submit]"); await page.waitForTimeout(300);
  let live = await page.textContent("[data-form-status]");
  note("server error shows error state, form data kept", posts === 1 && /not sent/i.test(live) && (await page.inputValue("#f-name")) === "Test Person", live);
  note("error state offers fallback email", /test@example\.invalid/.test(live));
  mode = "abort"; await page.click("[data-submit]"); await page.waitForTimeout(300);
  live = await page.textContent("[data-form-status]"); note("network failure shows error state", posts === 2 && /not sent/i.test(live), live);
  mode = "ok"; await page.click("[data-submit]"); await page.waitForTimeout(300);
  live = await page.textContent("[data-form-status]");
  const body = JSON.parse(lastBody || "{}");
  note("success only after 2xx response", posts === 3 && /has been sent/i.test(live) && body.route === "brands" && body.email === "tester@example.invalid" && !("company_website" in body), live + " " + lastBody);
  note("form resets after success", (await page.inputValue("#f-name")) === "");
  await page.evaluate(() => { document.querySelector('[name="company_website"]').value = "spam"; });
  await page.fill("#f-name", "Bot"); await page.fill("#f-email", "bot@example.invalid"); await page.fill("#f-msg", "x".repeat(30));
  const before = posts; await page.click("[data-submit]"); await page.waitForTimeout(200);
  note("honeypot submission dropped", posts === before);
  await page.close(); await ctx.close();
}

// ---- 6b. selected videos: click-to-load, no autoplay/preload, keyboard operable ------------------------------------
{
  const { existsSync } = await import("node:fs");
  const chromePath = ["/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) => existsSync(p));
  const hasClips = existsSync(path.join(root, "public/video"));
  if (!hasClips) note("videos: skipped (no local clips; they are gitignored)", true);
  else {
    // Page-level behaviour in the default browser: nothing requested until the visitor presses play.
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const media = [];
    page.on("request", (r) => { if (/\.mp4(\?|$)/.test(r.url())) media.push(r.url()); });
    await page.goto(BASE + "/media/", { waitUntil: "networkidle" });
    const n = await page.locator(".video__play").count();
    note("media page shows 4 click-to-load videos", n === 4, String(n));
    note("no video element and no .mp4 request before the visitor presses play", (await page.locator("video").count()) === 0 && media.length === 0, media.join(","));
    note("video links are keyboard-reachable with accessible names", await page.evaluate(() => [...document.querySelectorAll(".video__play")].every((a) => a.textContent.trim().length > 20 && a.tabIndex >= 0)));
    const home = await openPage(ctx, BASE + "/");
    note("home hero offers “Watch Anya on air” only because clips exist", (await home.page.locator('.hero .btn--ghost').innerText()).includes("Watch Anya on air"));
    await home.page.close(); await page.close(); await ctx.close();
    if (!chromePath) note("videos: playback test skipped (no H.264-capable browser found)", true);
    else {
      const chrome = await chromium.launch({ executablePath: chromePath, args: ["--no-sandbox"] });
      const c2 = await chrome.newContext({ viewport: { width: 1440, height: 900 } });
      const p2 = await c2.newPage();
      await p2.goto(BASE + "/media/", { waitUntil: "networkidle" });
      await p2.focus(".video__play >> nth=0");
      await p2.keyboard.press("Enter");
      await p2.waitForSelector("video.video__player", { timeout: 8000 });
      await p2.waitForTimeout(1500);
      const st = await p2.evaluate(() => { const v = document.querySelector("video.video__player"); return { controls: v.controls, paused: v.paused, t: v.currentTime, ready: v.readyState, label: v.getAttribute("aria-label"), focused: document.activeElement === v, err: !!document.querySelector(".video__error") }; });
      note("Enter on the poster loads a controllable player, focuses it and starts playback", st.controls && st.focused && !st.err && (!st.paused || st.t > 0) && st.ready >= 2, JSON.stringify(st));
      await p2.evaluate(() => document.querySelector("video.video__player").pause());
      await p2.focus(".video__play >> nth=0");
      await p2.keyboard.press("Enter"); await p2.waitForTimeout(800);
      const paused = await p2.evaluate(() => [...document.querySelectorAll("video.video__player")].filter((v) => !v.paused).length);
      note("only one video plays at a time", paused <= 1, String(paused));
      await chrome.close();
    }
  }
}

// ---- 6c. real photographs (private stills): Hosting & speaking ---------------------------------------------------
{
  const { existsSync } = await import("node:fs");
  if (!existsSync(path.join(root, "assets/private/ktla-morning-news.jpg"))) note("stills: skipped (private photos not present)", true);
  else {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const { page } = await openPage(ctx, BASE + "/media/");
    await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
    await page.waitForTimeout(700);
    const imgs = await page.evaluate(() => [...document.querySelectorAll(".spcard__photo img")].map((i) => ({ alt: i.alt.length, ok: i.complete && i.naturalWidth > 0, w: i.naturalWidth })));
    note("Hosting & speaking shows the KTLA and TEDx photographs with real alt text", imgs.length === 2 && imgs.every((i) => i.alt > 40 && i.ok), JSON.stringify(imgs));
    await page.close(); await ctx.close();
  }
}

// ---- 6d. press archive + Featured in (needs local scans) ---------------------------------------------------------
{
  const { existsSync } = await import("node:fs");
  if (!existsSync(path.join(root, "public/press"))) note("press archive: skipped (scans not present)", true);
  else {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const { page } = await openPage(ctx, BASE + "/media/");
    const first = page.locator("#press-variety a[data-lightbox]").first();
    note("archive: every publication has a section and an index link", (await page.locator(".archive__index a").count()) >= 30 && (await page.locator(".outlet").count()) >= 17);
    await first.scrollIntoViewIfNeeded(); await first.focus(); await page.keyboard.press("Enter");
    await page.waitForSelector("dialog.lightbox[open]", { timeout: 4000 });
    await page.waitForFunction(() => { const i = document.querySelector(".lightbox__img"); return i && i.complete && i.naturalWidth > 0; });
    note("lightbox opens, focuses Close, shows a caption", (await page.evaluate(() => document.activeElement.hasAttribute("data-close"))) && /Variety/.test(await page.textContent(".lightbox__cap")));
    await page.keyboard.press("Escape"); await page.waitForTimeout(150);
    note("Esc closes the lightbox and returns focus to the scan", (await page.locator("dialog.lightbox[open]").count()) === 0 && (await page.evaluate(() => document.activeElement.hasAttribute("data-lightbox"))));
    const ok = page.locator("#press-ok a[data-lightbox]").first();
    await ok.scrollIntoViewIfNeeded(); await ok.click(); await page.waitForSelector("dialog.lightbox[open]");
    await page.keyboard.press("ArrowRight"); await page.waitForTimeout(100);
    note("arrow keys move between pages of the same publication", /2 of \d+/.test(await page.textContent(".lightbox__cap")) && /OK!/.test(await page.textContent(".lightbox__cap")));
    await page.keyboard.press("Escape");
    const hv = await openPage(ctx, BASE + "/");
    const roll = await hv.page.evaluate(() => ({ n: document.querySelectorAll(".roll__item").length, linked: document.querySelectorAll(".roll__link").length, logos: document.querySelectorAll('.roll [role="img"]').length }));
    note("Featured in lists publication titles (and logos where available), all linked", roll.n >= 25 && roll.linked === roll.n && roll.logos >= 1, JSON.stringify(roll));
    const target = await hv.page.getAttribute('.roll__link[href="/media/#press-variety"]', "href");
    note("Featured in links go to the matching archive section", target === "/media/#press-variety" && (await page.locator("#press-variety").count()) === 1);
    await hv.page.close(); await page.close(); await ctx.close();
  }
}

// ---- 7. external links + a11y of names -------------------------------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  for (const p of PAGES) {
    const { page } = await openPage(ctx, BASE + p);
    const bad = await page.evaluate(() => [...document.querySelectorAll("a[target=_blank]")].filter((a) => !/noopener/.test(a.rel) || !/opens in a new tab/i.test(a.textContent)).map((a) => a.href));
    note(`external links safe + announced ${p}`, bad.length === 0, bad.join(","));
    await page.close();
  }
  await ctx.close();
}

await browser.close();
servers.forEach((s) => s.kill());
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} browser checks passed`);
if (failed.length) { console.log("Failures:"); failed.forEach((f) => console.log(` - ${f.area}: ${f.detail}`)); process.exit(1); }
