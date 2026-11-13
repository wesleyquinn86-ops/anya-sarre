// Processes the private press-page scans (assets/private/press/*) into public/press/<name>-{thumb,full}.webp.
// Scans are rights-sensitive, so assets/private and public/press are gitignored; the site renders the archive only when they exist.
import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "assets/private/press");
const out = path.join(root, "public/press");
await mkdir(out, { recursive: true });
let n = 0;
const dims = {};
for (const f of (await readdir(src).catch(() => [])).sort()) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  const name = f.replace(/\.[^.]+$/, "");
  const t = (await stat(path.join(src, f))).mtimeMs;
  const fresh = async (p) => stat(p).then((s) => s.mtimeMs >= t, () => false);
  const thumb = path.join(out, `${name}-thumb.webp`), full = path.join(out, `${name}-full.webp`);
  if (!(await fresh(full))) {
    const base = sharp(path.join(src, f)).rotate();
    await base.clone().resize({ width: 520, withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumb);
    await base.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(full);
    n++;
  }
  const tm = await sharp(thumb).metadata(), fm = await sharp(full).metadata();
  dims[name] = { tw: tm.width, th: tm.height, fw: fm.width, fh: fm.height };
}
await writeFile(path.join(root, "src/data/press-archive.dims.private.json"), JSON.stringify(dims) + "\n");
console.log(`press scans processed: ${n}`);
