#!/usr/bin/env python3
"""Re-render the BNB deck at high quality + upgrade project covers for the carousel."""
import subprocess, os, glob
from PIL import Image

PDF = None
for f in glob.glob("/home/z/my-project/upload/*.pdf"):
    if "Burger Shop" in f:
        PDF = f
        break
assert PDF, "BNB PDF not found"
OUT = "/home/z/my-project/public/work/slides/bnb"

# 1) re-render all 38 pages at 150dpi with quality 93 (fewer JPEG artifacts, same 3000px width)
os.makedirs(OUT, exist_ok=True)
subprocess.run(["pdftoppm", "-jpeg", "-jpegopt", "quality=93", "-r", "150", PDF,
                f"{OUT}/tmp"], check=True)
tmps = sorted(glob.glob(f"{OUT}/tmp-*.jpg"))
for i, f in enumerate(tmps, 1):
    dst = f"{OUT}/p-{i:02d}.jpg"
    os.replace(f, dst)
print("bnb re-rendered:", len(tmps), "pages")

# 2) refresh banner (cover, wide crop) from the new p-01
im = Image.open(f"{OUT}/p-01.jpg")  # 3000x1688
# banner-bnb is 1940x808 — same aspect crop from p-01
target = (1940, 808)
ar = target[0] / target[1]
w, h = im.size
ch = int(w / ar)
top = (h - ch) // 2
im.crop((0, top, w, top + ch)).resize(target, Image.LANCZOS).save(
    "/home/z/my-project/public/work/banner-bnb.jpg", quality=93)
print("banner refreshed")

for f in ["p-01.jpg", "p-19.jpg", "p-38.jpg"]:
    print(f, os.path.getsize(f"{OUT}/{f}") // 1024, "KB", Image.open(f"{OUT}/{f}").size)
