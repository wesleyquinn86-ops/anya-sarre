// Builds favicon set and the 1200x630 social preview from the supplied hero + wordmark study.
// Photography is only resized/cropped; pink lettering is composited as vector.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PINK = "#F3A3BB";
const INK = "#0B0B0C";

// Favicon: pink disc with the dark monogram "A" glyph taken from the supplied wordmark study.
const stacked = await readFile(path.join(root, "assets/brand/wordmark-study-stacked.svg"), "utf8");
const firstPath = stacked.match(/<path[^>]*transform="translate\(0,0\)"[^>]*d="([^"]+)"/)[1];
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${INK}"/><g transform="translate(14 49) scale(0.0475 -0.0475)" fill="${PINK}"><path d="${firstPath}"/></g></svg>`;
await writeFile(path.join(root, "public/favicon.svg"), fav);
await sharp(Buffer.from(fav)).resize(32, 32).png().toFile(path.join(root, "public/favicon-32.png"));
await sharp(Buffer.from(fav)).resize(180, 180).png().toFile(path.join(root, "public/apple-touch-icon.png"));

// Social preview: desktop hero resized to 1200 wide, cropped to 630 tall at the guided focal band.
const W = 1200, H = 630;
const hero = await sharp(path.join(root, "assets/source/anya-sarre-hero-desktop.png")).resize({ width: W }).toBuffer({ resolveWithObject: true });
const top = Math.round((hero.info.height - H) * 0.5); // 600 tall -> keep full frame; resize to cover if shorter
let base = sharp(hero.data);
if (hero.info.height < H) base = sharp(path.join(root, "assets/source/anya-sarre-hero-desktop.png")).resize({ width: W, height: H, fit: "cover", position: "right" });
else base = base.extract({ left: 0, top, width: W, height: H });
const wm = await readFile(path.join(root, "assets/brand/wordmark-study-stacked.svg"), "utf8");
const vb = wm.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
const ratio = Number(vb[2]) / Number(vb[1]);
const wmW = 330;
const wmSvg = Buffer.from(wm.replace("<svg ", `<svg width="${wmW}" height="${Math.round(wmW * ratio)}" `));
const wmPng = await sharp(wmSvg).png().toBuffer();
await base
  .composite([{ input: wmPng, left: 48, top: Math.round((H - wmW * ratio) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public/og.png"));
console.log("brand assets written");
