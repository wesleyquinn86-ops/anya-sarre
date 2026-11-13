// Usage: node scripts/shots.mjs <outDir> <widths comma> <pages comma> [fullPage=1]
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
const require = createRequire("/opt/node22/lib/node_modules/");
const { chromium } = require("playwright");
const [out, widths = "1440,390", pages = "/", full = "1"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const w of widths.split(",").map(Number)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  const page = await ctx.newPage();
  for (const p of pages.split(",")) {
    await page.goto(`http://localhost:4173${p}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "*{animation-play-state:paused!important}" });
    await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
    await page.waitForTimeout(400);
    const name = (p === "/" ? "home" : p.replace(/\//g, "")) + `-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: full === "1" });
    console.log(name);
  }
  await ctx.close();
}
await browser.close();
