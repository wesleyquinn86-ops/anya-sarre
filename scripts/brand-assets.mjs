// Builds favicon set and the 1200x630 social preview from the approved pack.
// Photography is only resized/cropped; the plum lettering is composited as vector.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLUM = "#2B1728", BLUSH = "#F2CED8";
const wm = (k) => readFile(path.join(root, `assets/pack/01-Identity/wordmarks/svg/anya-sarre-${k}-dark.svg`), "utf8");

// Favicon: blush "A" (the sculpted masthead's own A) on a plum tile.
const stacked = await wm("stacked");
const aPath = stacked.match(/<path[^>]*aria-label="A"[^>]*\sd="([^"]+)"/)[1];
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${PLUM}"/><g transform="translate(12.5 11) scale(0.21)" fill="${BLUSH}"><path fill-rule="evenodd" d="${aPath}"/></g></svg>`;
await writeFile(path.join(root, "public/favicon.svg"), fav);
await sharp(Buffer.from(fav)).resize(32, 32).png().toFile(path.join(root, "public/favicon-32.png"));
await sharp(Buffer.from(fav)).resize(180, 180).png().toFile(path.join(root, "public/apple-touch-icon.png"));

// Social preview: hero 01 desktop, covered to 1200x630 from the left, stacked wordmark in the quiet left field.
const W = 1200, H = 630;
const base = sharp(path.join(root, "assets/source/hero-01-desktop.jpg")).resize({ width: W, height: H, fit: "cover", position: "left" });
const scale = H / 887; // the photo is scaled by this; the wordmark sits at 5% / 34% of the *scaled* stage width
const stageW = 1774 * scale;
const wmW = Math.round(0.34 * stageW), wmH = Math.round((wmW * 533) / 750);
const wmSvg = Buffer.from(stacked.replace(/ width="[^"]*" height="[^"]*"/, ` width="${wmW}" height="${wmH}"`));
const wmPng = await sharp(wmSvg).png().toBuffer();
await base
  .composite([{ input: wmPng, left: Math.round(0.05 * stageW), top: Math.round(0.53 * H - wmH / 2) }])
  .jpeg({ quality: 88 })
  .toFile(path.join(root, "public/og.jpg"));
console.log("brand assets written");
