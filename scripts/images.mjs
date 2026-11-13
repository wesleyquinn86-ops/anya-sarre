// Generates responsive AVIF + WebP sets from assets/source/*.{png,jpg} into public/img
// and records dimensions in src/data/images.json. Never upscales. Never crops or recolours:
// cropping is done in CSS so the supplied compositions stay intact.
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assets/source");
const outDir = path.join(root, "public/img");
const TARGET_WIDTHS = [480, 720, 960, 1280, 1600, 1774];
await mkdir(outDir, { recursive: true });

const manifest = {};
for (const file of (await readdir(srcDir)).sort()) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const slot = file.replace(/\.(png|jpe?g)$/i, "").replace(/^anya-sarre-/, "");
  const img = sharp(path.join(srcDir, file));
  const { width, height } = await img.metadata();
  const widths = [...new Set(TARGET_WIDTHS.filter((w) => w < width).concat(width))].sort((a, b) => a - b);
  for (const w of widths) {
    const base = sharp(path.join(srcDir, file)).resize({ width: w, withoutEnlargement: true });
    await base.clone().webp({ quality: 84, effort: 5 }).toFile(path.join(outDir, `${slot}-${w}.webp`));
    await base.clone().avif({ quality: 58, effort: 4 }).toFile(path.join(outDir, `${slot}-${w}.avif`));
  }
  manifest[slot] = { width, height, widths };
  console.log(`${slot}: ${width}x${height} -> ${widths.join(", ")}`);
}
await writeFile(path.join(root, "src/data/images.json"), JSON.stringify(manifest, null, 2) + "\n");
