#!/usr/bin/env python3
"""Prepare assets for Mariam portfolio round 3:
1) Re-render all PDF pages at 150dpi -> public/work/slides/<proj>/NN.jpg (clear slideshow)
2) Brand logo cards (600x840 full-bleed) -> public/brands/card/*.jpg for the 3D carousel
"""
import subprocess, os
from PIL import Image

UP = "/home/z/my-project/upload"
PUB = "/home/z/my-project/public"
os.makedirs(f"{PUB}/work/slides", exist_ok=True)

PDFS = {
    "costa": "Buyer persona-مضغوط.pdf",
    "english": "Classroom rules presentation in multicolor illustrative style-مضغوط.pdf",
    "kids": "Red Minimalist Fashion Presentation.pdf",
}

for proj, pdf in PDFS.items():
    out = f"{PUB}/work/slides/{proj}"
    os.makedirs(out, exist_ok=True)
    subprocess.run(
        ["pdftoppm", "-r", "150", "-jpeg", "-jpegopt", "quality=82",
         f"{UP}/{pdf}", f"{out}/p"],
        check=True,
    )
    n = len([f for f in os.listdir(out) if f.endswith(".jpg")])
    print(f"{proj}: {n} pages rendered")

# ---- brand cards 600x840 full-bleed for the carousel ----
CARDS = [
    ("photo_1_2026-10-07_21-57-36.jpg", "shutny"),
    ("photo_2_2026-10-07_21-57-36.jpg", "balbaa"),
    ("photo_3_2026-10-07_21-57-36.jpg", "kabbani"),
    ("photo_4_2026-10-07_21-57-36.jpg", "costa"),
    ("photo_5_2026-10-07_21-57-36.jpg", "walgreens"),
    ("photo_6_2026-10-07_21-57-36.jpg", "zara"),
    ("photo_7_2026-10-07_21-57-36.jpg", "wahsh"),
    ("photo_8_2026-10-07_21-57-36.jpg", "bnb"),
    ("photo_9_2026-10-07_21-57-36.jpg", "goldmark"),
    ("photo_10_2026-10-07_21-57-36.jpg", "maestro"),
]
W, H = 600, 840
os.makedirs(f"{PUB}/brands/card", exist_ok=True)

for fname, name in CARDS:
    im = Image.open(f"{UP}/{fname}").convert("RGB")
    w, h = im.size
    ratio = W / H
    if min(w, h) < 500:
        # small source: pad centered on the dominant edge color
        px = im.load()
        corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
        bg = max(corners, key=lambda c: sum(c))
        scale = min((W * 0.92) / w, (H * 0.92) / h)
        nw, nh = int(w * scale), int(h * scale)
        im2 = im.resize((nw, nh), Image.LANCZOS)
        canvas = Image.new("RGB", (W, H), tuple(bg))
        canvas.paste(im2, ((W - nw) // 2, (H - nh) // 2))
        im = canvas
    else:
        # cover crop
        if w / h > ratio:
            nw = int(h * ratio)
            x = (w - nw) // 2
            im = im.crop((x, 0, x + nw, h))
        else:
            nh = int(w / ratio)
            y = (h - nh) // 2
            im = im.crop((0, y, w, y + nh))
        im = im.resize((W, H), Image.LANCZOS)
    im.save(f"{PUB}/brands/card/{name}.jpg", quality=88)
    print(f"card: {name} {im.size}")

print("done")
