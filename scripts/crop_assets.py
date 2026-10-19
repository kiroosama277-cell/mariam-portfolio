#!/usr/bin/env python3
"""Crop real work images from the portfolio video frames."""
from PIL import Image
import os

SRC = "/home/z/my-project"
OUT = f"{SRC}/public/work"
os.makedirs(OUT, exist_ok=True)

# (source_frame, output_name, box(l,t,r,b))
CROPS = [
    # avatar + about photo
    (f"{SRC}/frames_dense/f_003.jpg",  "avatar.jpg",      (54, 34, 98, 78)),
    (f"{SRC}/frames_zoom/a_05.jpg",    "about.jpg",       (33, 148, 390, 585)),
    # project card image (BNB) - from case study banner frame (clean, no pills)
    (f"{SRC}/frames_dense/f_018.jpg",  "banner-bnb.jpg",  (32, 338, 1002, 742)),
    (f"{SRC}/frames_dense/f_014.jpg",  "project-bnb.jpg", (26, 137, 486, 420)),
    # slides
    (f"{SRC}/frames/frame_08.jpg",     "slide03.jpg",     (32, 458, 478, 710)),
    (f"{SRC}/frames_dense/f_020.jpg",  "slide04.jpg",     (532, 472, 984, 740)),
    (f"{SRC}/frames_dense/f_021.jpg",  "slide05.jpg",     (32, 468, 984, 740)),
    (f"{SRC}/frames_dense/f_022.jpg",  "slide06.jpg",     (32, 150, 484, 404)),
    (f"{SRC}/frames_dense/f_022.jpg",  "slide07.jpg",     (548, 520, 944, 740)),
    (f"{SRC}/frames_dense/f_023.jpg",  "slide08.jpg",     (548, 220, 944, 444)),
    (f"{SRC}/frames_dense/f_024.jpg",  "slide09.jpg",     (30, 402, 486, 660)),
    (f"{SRC}/frames_dense/f_024.jpg",  "slide10.jpg",     (532, 492, 984, 740)),
    (f"{SRC}/frames_dense/f_028.jpg",  "slide19.jpg",     (532, 130, 984, 384)),
    (f"{SRC}/frames_dense/f_029.jpg",  "slide21.jpg",     (532, 62, 984, 294)),
    (f"{SRC}/frames_dense/f_029.jpg",  "slide22.jpg",     (30, 422, 508, 678)),
    (f"{SRC}/frames_dense/f_030.jpg",  "slide23.jpg",     (532, 62, 984, 254)),
    (f"{SRC}/frames_dense/f_031.jpg",  "slide25.jpg",     (526, 132, 744, 248)),
    (f"{SRC}/frames_dense/f_031.jpg",  "slide26.jpg",     (776, 132, 984, 248)),
    (f"{SRC}/frames_dense/f_031.jpg",  "reel-big.jpg",    (32, 352, 984, 740)),
    (f"{SRC}/frames/frame_13.jpg",     "slide27.jpg",     (32, 2, 988, 148)),
    (f"{SRC}/frames_dense/f_032.jpg",  "slide33.jpg",     (30, 517, 508, 740)),
    (f"{SRC}/frames_dense/f_032.jpg",  "slide34.jpg",     (532, 517, 984, 740)),
    (f"{SRC}/frames_dense/f_034.jpg",  "slide32.jpg",     (32, 78, 984, 574)),
    (f"{SRC}/frames/frame_14.jpg",     "abaya-aw1.jpg",   (30, 547, 508, 740)),
    (f"{SRC}/frames/frame_14.jpg",     "abaya-aw2.jpg",   (532, 577, 984, 740)),
    (f"{SRC}/frames_dense/f_035.jpg",  "slide35.jpg",     (30, 267, 484, 524)),
    (f"{SRC}/frames_dense/f_035.jpg",  "slide36.jpg",     (532, 347, 984, 574)),
    (f"{SRC}/frames_dense/f_036.jpg",  "slide38.jpg",     (532, 62, 984, 128)),
]

for src, name, box in CROPS:
    img = Image.open(src)
    img = img.crop(box)
    # upscale 2x for better display quality
    w, h = img.size
    img = img.resize((w * 2, h * 2), Image.LANCZOS)
    img.save(f"{OUT}/{name}", quality=90)
    print(f"OK {name} {img.size}")

print("Done:", len(CROPS), "assets")
