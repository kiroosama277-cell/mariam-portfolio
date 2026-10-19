#!/usr/bin/env python3
"""
Optimize all deck slide images (public/work/slides/*) for the web.
They were rendered from PDFs at 150dpi -> 3000x1688, but the site
never displays them wider than ~520px, so they are ~6x oversized
(67MB total -> slides appear very late on project pages).

Strategy:
  1. Copy originals to /home/z/my-project/.backup/slides_orig/ (insurance)
  2. Resize in place: max width 1600px (LANCZOS) -> still 3x display size
  3. Re-encode: JPEG quality 80, progressive, optimized, stripped metadata
"""
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path("/home/z/my-project/public/work/slides")
BACKUP = Path("/home/z/my-project/.backup/slides_orig")
MAX_W = 1600
QUALITY = 80

def human(n: int) -> str:
    return f"{n/1024/1024:.1f}MB" if n >= 1024 * 1024 else f"{n/1024:.0f}KB"

def main() -> None:
    files = sorted(ROOT.glob("*/*.jpg"))
    assert files, "no slide images found"
    BACKUP.mkdir(parents=True, exist_ok=True)

    before_total = sum(f.stat().st_size for f in files)
    print(f"{len(files)} slides, before = {human(before_total)}")

    for f in files:
        rel = f.relative_to(ROOT)          # e.g. bnb/p-01.jpg
        dst = BACKUP / rel
        if not dst.exists():               # keep the very first original
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, dst)

        im = Image.open(f).convert("RGB")
        w, h = im.size
        if w > MAX_W:
            im = im.resize((MAX_W, round(h * MAX_W / w)), Image.LANCZOS)
        im.save(f, "JPEG", quality=QUALITY, optimize=True, progressive=True)

    after_total = sum(f.stat().st_size for f in files)
    per_dir = {}
    for f in files:
        d = f.parent.name
        per_dir[d] = per_dir.get(d, 0) + f.stat().st_size
    for d, s in sorted(per_dir.items()):
        print(f"  {d:8s} -> {human(s)}")
    print(f"after  = {human(after_total)}  ({before_total/max(after_total,1):.1f}x smaller)")

    # sanity: every file still opens
    for f in files:
        with Image.open(f) as im:
            im.verify()
    print("all images verified OK")

if __name__ == "__main__":
    main()
