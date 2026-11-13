"""Converts the colour show logos in assets/logos/ into single-colour vector SVGs (assets/logos/mono/*.svg).

Each logo gets its own "ink" rule because the originals are tiny rasters on different backgrounds
(white JPEG, coloured JPEG, transparent PNG). The ink map is upscaled, softened and traced with potrace,
so the result is a crisp, recolourable shape (the site paints it with CSS `currentColor`).

Dev tool, not part of the site build. Needs: pip install potracer numpy pillow
Usage: python scripts/logos-to-mono.py [id ...]
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter
import potrace

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets/logos")
OUT = os.path.join(SRC, "mono")
SCALE = 6


def smooth(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def load(path):
    im = Image.open(path).convert("RGBA")
    im = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32) / 255.0
    rgb, alpha = a[..., :3], a[..., 3]
    return rgb, alpha


def lum(rgb):
    return 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]


def non_white(rgb, alpha):
    flat = rgb * alpha[..., None] + (1 - alpha[..., None])
    return (1 - flat).max(axis=2)


def saturation(rgb):
    mx, mn = rgb.max(axis=2), rgb.min(axis=2)
    return np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0), mx


# id: (file, rule)  rule(rgb, alpha) -> ink map in 0..1
def rule_light_on_dark(lo=0.5, hi=0.68):
    return lambda rgb, alpha: smooth(lum(rgb), lo, hi) * alpha


def rule_dark_on_light(rgb, alpha):  # black type on a transparent / white ground
    flat = rgb * alpha[..., None] + (1 - alpha[..., None])
    return smooth(1 - lum(flat), 0.55, 0.75)


def rule_non_white(rgb, alpha):  # coloured/black mark on white, white details knocked out
    return smooth(non_white(rgb, alpha), 0.12, 0.25)


def rule_glossy_on_white(rgb, alpha):  # glossy mark with a faint reflection/streaks on white: ignore the haze
    return smooth(non_white(rgb, alpha), 0.32, 0.46)


def trim_sides(rule, frac):  # drop thin frame lines at the left/right edges of the source image
    def f(rgb, alpha):
        ink = rule(rgb, alpha)
        w = ink.shape[1]
        ink[:, : int(w * frac)] = 0
        ink[:, int(w * (1 - frac)) :] = 0
        return ink
    return f


def rule_ink_on_cream(rgb, alpha):  # deep-red line art on a cream page (crops from the partner deck)
    return smooth(non_white(rgb, alpha), 0.32, 0.5)


def rule_saturated(rgb, alpha):  # coloured banner on a grey ground, white type knocked out
    s, v = saturation(rgb)
    return smooth(s, 0.35, 0.5) * smooth(v, 0.3, 0.45)


def rule_silhouette_knockout(lo=0.9, hi=0.97):  # transparent PNG: solid shape, near-white details knocked out
    return lambda rgb, alpha: smooth(alpha, 0.4, 0.6) * (1 - smooth(lum(rgb), lo, hi))


def rule_alpha_bright(lo=0.45, hi=0.62):  # transparent PNG: keep the bright details of a dark disc
    return lambda rgb, alpha: smooth(lum(rgb * alpha[..., None]) / np.maximum(alpha, 1e-3) * (alpha > 0.5), lo, hi)


LOGOS = {
    "ktla-5": ("ktla-5.png", rule_light_on_dark(0.55, 0.75)),
    "entertainment-tonight": ("entertainment-tonight.png", rule_alpha_bright(0.5, 0.7)),
    "the-insider": ("the-insider.png", rule_dark_on_light),
    "the-rachael-ray-show": ("the-rachael-ray-show.jpg", rule_glossy_on_white),
    "home-and-family": ("home-and-family.png", rule_saturated),
    "vh1": ("vh1.png", rule_non_white),
    "cbs-2": ("cbs-2.png", rule_silhouette_knockout(0.92, 0.98)),
    "kcal-9": ("kcal-9.png", rule_silhouette_knockout(0.9, 0.96)),
    "hollywood-today-live": ("hollywood-today-live.jpg", rule_light_on_dark(0.55, 0.7)),
    "la-unscripted": ("la-unscripted.png", rule_ink_on_cream),
    "style-smart": ("style-smart.png", rule_ink_on_cream),
    "nexstar": ("nexstar.png", rule_ink_on_cream),
    "the-hollywood-reporter": ("the-hollywood-reporter.jpg", trim_sides(rule_light_on_dark(0.5, 0.7), 0.12)),
}


def trace(ink):
    im = Image.fromarray((np.clip(ink, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(SCALE * 0.28))
    bm = np.asarray(im) > 127
    ys, xs = np.where(bm)
    pad = SCALE * 2
    y0, y1, x0, x1 = max(ys.min() - pad, 0), min(ys.max() + pad, bm.shape[0]), max(xs.min() - pad, 0), min(xs.max() + pad, bm.shape[1])
    bm = bm[y0:y1, x0:x1]
    path = potrace.Bitmap(~bm).trace(turdsize=SCALE * SCALE, alphamax=1.0, opticurve=True, opttolerance=0.5)
    d = []
    for curve in path:
        sp = curve.start_point
        d.append(f"M{sp.x:.1f} {sp.y:.1f}")
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f"L{seg.c.x:.1f} {seg.c.y:.1f}L{seg.end_point.x:.1f} {seg.end_point.y:.1f}")
            else:
                d.append(f"C{seg.c1.x:.1f} {seg.c1.y:.1f} {seg.c2.x:.1f} {seg.c2.y:.1f} {seg.end_point.x:.1f} {seg.end_point.y:.1f}")
        d.append("Z")
    h, w = bm.shape
    return w, h, "".join(d), bm


def main(ids):
    os.makedirs(OUT, exist_ok=True)
    for k in ids or LOGOS:
        fn, rule = LOGOS[k]
        rgb, alpha = load(os.path.join(SRC, fn))
        w, h, d, bm = trace(rule(rgb, alpha))
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="#fff"><path fill-rule="evenodd" d="{d}"/></svg>\n'
        open(os.path.join(OUT, f"{k}.svg"), "w").write(svg)
        print(f"{k}: viewBox {w}x{h}, {len(svg)//1024} KB")


if __name__ == "__main__":
    main(sys.argv[1:])
