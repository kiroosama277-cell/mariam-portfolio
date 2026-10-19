#!/usr/bin/env python3
"""Build contact sheets (10 pages per sheet) for each deck so captions match real page content."""
import os
from PIL import Image

DECKS = {
    "costa": ("/home/z/my-project/public/work/slides/costa", 26),
    "english": ("/home/z/my-project/public/work/slides/english", 48),
    "kids": ("/home/z/my-project/public/work/slides/kids", 53),
    "bnb": ("/home/z/my-project/public/work/slides/bnb", 38),
}
OUT = "/home/z/my-project/scripts/sheets"
os.makedirs(OUT, exist_ok=True)

COLS, ROWS, W = 5, 2, 380
for deck, (dirpath, n) in DECKS.items():
    for start in range(0, n, COLS * ROWS):
        sheet = Image.new("RGB", (COLS * W + (COLS + 1) * 8, ROWS * int(W * 0.5625) + (ROWS + 1) * 30), "#222")
        for k in range(COLS * ROWS):
            p = start + k + 1
            if p > n:
                break
            f = os.path.join(dirpath, f"p-{p:02d}.jpg")
            im = Image.open(f)
            im.thumbnail((W, int(W * 0.5625)))
            x = 8 + (k % COLS) * (W + 8)
            y = 26 + (k // COLS) * (int(W * 0.5625) + 30)
            sheet.paste(im, (x, y))
        sp = f"{OUT}/{deck}_{start+1:02d}-{min(start+COLS*ROWS,n):02d}.jpg"
        sheet.save(sp, quality=80)
        print(sp)
