// Generates responsive AVIF + WebP sets from assets/source/*.{png,jpg} into public/img
// and records dimensions in src/data/images.json. Never upscales. Never crops or recolours:
// cropping is done in CSS so the supplied compositions stay intact.
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
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
  const srcTime = (await stat(path.join(srcDir, file))).mtimeMs;
  const fresh = async (f) => stat(f).then((st) => st.mtimeMs >= srcTime, () => false); // incremental: skip up-to-date outputs
  for (const w of widths) {
    const webp = path.join(outDir, `${slot}-${w}.webp`), avif = path.join(outDir, `${slot}-${w}.avif`);
    const base = sharp(path.join(srcDir, file)).resize({ width: w, withoutEnlargement: true });
    if (!(await fresh(webp))) await base.clone().webp({ quality: 84, effort: 5 }).toFile(webp);
    if (!(await fresh(avif))) await base.clone().avif({ quality: 58, effort: 4 }).toFile(avif);
  }
  manifest[slot] = { width, height, widths };
  console.log(`${slot}: ${width}x${height} -> ${widths.join(", ")}`);
}
await writeFile(path.join(root, "src/data/images.json"), JSON.stringify(manifest, null, 2) + "\n");
