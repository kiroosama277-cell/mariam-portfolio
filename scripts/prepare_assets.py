#!/usr/bin/env python3
"""Prepare all image assets for Mariam's portfolio update."""
import os
import subprocess
from PIL import Image

UP = "/home/z/my-project/upload"
PUB = "/home/z/my-project/public"
BRANDS = os.path.join(PUB, "brands")
WORK = os.path.join(PUB, "work")
os.makedirs(BRANDS, exist_ok=True)
os.makedirs(WORK, exist_ok=True)

# ---------- 1) Mariam's new photo -> about polaroid (4:5 crop) ----------
src = os.path.join(UP, "pasted_image_1791397382094.png")
im = Image.open(src).convert("RGB")
w, h = im.size  # 720x1280
# 4:5 crop, keep face in upper third
crop_h = int(w * 5 / 4)  # 900
top = 170
if top + crop_h > h:
    top = h - crop_h
im.crop((0, top, w, top + crop_h)).save(os.path.join(WORK, "mariam.jpg"), quality=90)
print("mariam.jpg saved", im.size)

# square-ish version for possible hero card use
im2 = Image.open(src).convert("RGB")
im2.crop((0, 150, w, 150 + w)).resize((520, 520), Image.LANCZOS).save(
    os.path.join(WORK, "mariam-sq.jpg"), quality=88
)
print("mariam-sq.jpg saved")

# ---------- 2) Logos -> public/brands (resized) ----------
logos = {
    "shutny.png": "pasted_image_1791396866029.png",
    "balbaa.png": "pasted_image_1791396881545.png",
    "kabbani_raw.png": "pasted_image_1791396892729.png",
    "costa.png": "pasted_image_1791396902312.png",
    "walgreens.png": "pasted_image_1791396912834.png",
    "zara.png": "pasted_image_1791396922445.png",
    "wahsh.png": "pasted_image_1791396931380.png",
    "bnb.png": "pasted_image_1791396953688.png",
    "goldmark.png": "pasted_image_1791396969204.png",
    "maestro.png": "pasted_image_1791396978351.png",
}
for out, name in logos.items():
    img = Image.open(os.path.join(UP, name)).convert("RGB")
    img.thumbnail((480, 480), Image.LANCZOS)
    img.save(os.path.join(BRANDS, out), quality=92)
    print("brand:", out, img.size)

# Kabbani: crop just the logo strip from the big cover (logo sits in top ~30%)
kb = Image.open(os.path.join(UP, "pasted_image_1791396892729.png")).convert("RGB")
kw, kh = kb.size  # 1280x1253
kb_crop = kb.crop((100, 60, 1180, 400))  # logo band
kb_crop.thumbnail((480, 480), Image.LANCZOS)
kb_crop.save(os.path.join(BRANDS, "kabbani.png"), quality=92)
print("brand: kabbani.png", kb_crop.size)

# ---------- 3) PDF covers (page 1) + gallery pages ----------
pdfs = [
    ("Buyer persona-مضغوط.pdf", "costa", [6, 12, 18, 24]),
    ("Classroom rules presentation in multicolor illustrative style-مضغوط.pdf", "english", [10, 20, 30, 40]),
    ("Red Minimalist Fashion Presentation.pdf", "kids", [10, 20, 30, 40, 50]),
]
for pdf, slug, pages in pdfs:
    path = os.path.join(UP, pdf)
    # cover
    subprocess.run(
        ["pdftoppm", "-f", "1", "-l", "1", "-r", "110", "-jpeg", "-jpegopt", "quality=85",
         "-singlefile", path, os.path.join(WORK, f"project-{slug}")],
        check=True,
    )
    print("cover: project-" + slug + ".jpg")
    # gallery pages
    for i, p in enumerate(pages, 1):
        subprocess.run(
            ["pdftoppm", "-f", str(p), "-l", str(p), "-r", "80", "-jpeg", "-jpegopt", "quality=80",
             "-singlefile", path, os.path.join(WORK, f"g-{slug}-{i}")],
            check=True,
        )
    print("gallery done:", slug)

print("ALL ASSETS READY")
