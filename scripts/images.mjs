// Generates responsive AVIF + WebP sets into public/img and records dimensions. Never upscales or crops:
// cropping is CSS-only so supplied compositions stay intact.
//   assets/source/*.{png,jpg}   -> public/img/<slot>-<w>.{avif,webp}   -> src/data/images.json (committed)
//   assets/private/*.{png,jpg}  -> public/img/still-<name>-<w>.*       -> src/data/images.private.json (gitignored)
// "private" holds rights-sensitive photographs (broadcast frames, event stills): kept out of git (the repo is public).
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/img");
const TARGET_WIDTHS = [480, 720, 960, 1280, 1600, 1774];
await mkdir(outDir, { recursive: true });

async function run(srcDir, prefix, manifestFile) {
  const manifest = {};
  for (const file of (await readdir(srcDir).catch(() => [])).sort()) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const slot = prefix + file.replace(/\.(png|jpe?g)$/i, "").replace(/^anya-sarre-/, "");
    const { width, height } = await sharp(path.join(srcDir, file)).metadata();
    const widths = [...new Set(TARGET_WIDTHS.filter((w) => w < width).concat(width))].sort((a, b) => a - b);
    const srcTime = (await stat(path.join(srcDir, file))).mtimeMs;
    const fresh = async (f) => stat(f).then((st) => st.mtimeMs >= srcTime, () => false); // incremental
    for (const w of widths) {
      const webp = path.join(outDir, `${slot}-${w}.webp`), avif = path.join(outDir, `${slot}-${w}.avif`);
      const base = sharp(path.join(srcDir, file)).resize({ width: w, withoutEnlargement: true });
      if (!(await fresh(webp))) await base.clone().webp({ quality: 84, effort: 5 }).toFile(webp);
      if (!(await fresh(avif))) await base.clone().avif({ quality: 58, effort: 4 }).toFile(avif);
    }
    manifest[slot] = { width, height, widths };
    console.log(`${slot}: ${width}x${height} -> ${widths.join(", ")}`);
  }
  if (Object.keys(manifest).length || prefix === "") await writeFile(path.join(root, manifestFile), JSON.stringify(manifest, null, 2) + "\n");
}
await run(path.join(root, "assets/source"), "", "src/data/images.json");
await run(path.join(root, "assets/private"), "still-", "src/data/images.private.json");
