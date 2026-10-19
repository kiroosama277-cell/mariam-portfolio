#!/usr/bin/env python3
"""Zoom crops for reading Arabic text + missing slide crops."""
from PIL import Image
import os

SRC = "/home/z/my-project"
OUT = f"{SRC}/frames_text"
os.makedirs(OUT, exist_ok=True)

CROPS = [
    # calendar post cards (frame_11 = 50s)
    (f"{SRC}/frames/frame_11.jpg", "cal_top.png",    (25, 120, 1005, 300)),
    (f"{SRC}/frames/frame_11.jpg", "cal_bot.png",    (25, 340, 1005, 520)),
    # f_027 top cards 03/04
    (f"{SRC}/frames_dense/f_027.jpg", "cal_34.png",  (25, 60, 1005, 215)),
    (f"{SRC}/frames_dense/f_027.jpg", "cal_56.png",  (25, 240, 1005, 440)),
    # content plan captions f_028
    (f"{SRC}/frames_dense/f_028.jpg", "plan_a.png",  (25, 95, 515, 420)),
    (f"{SRC}/frames_dense/f_028.jpg", "plan_b.png",  (525, 490, 1010, 742)),
    # f_029 captions
    (f"{SRC}/frames_dense/f_029.jpg", "plan_c.png",  (25, 62, 515, 360)),
    (f"{SRC}/frames_dense/f_029.jpg", "plan_d.png",  (525, 380, 1010, 742)),
    # f_030 card E + slide23
    (f"{SRC}/frames_dense/f_030.jpg", "plan_e.png",  (25, 62, 515, 300)),
    # ad script overlay card f_031
    (f"{SRC}/frames_dense/f_031.jpg", "overlay.png", (25, 60, 515, 340)),
    # abaya notes f_034 bottom + f_035 top
    (f"{SRC}/frames_dense/f_034.jpg", "ab_note1.png",(25, 590, 1005, 742)),
    (f"{SRC}/frames_dense/f_035.jpg", "ab_note2.png",(25, 60, 1005, 230)),
    # abaya sales captions f_036
    (f"{SRC}/frames_dense/f_036.jpg", "ab_sales.png",(25, 60, 1005, 345)),
    # services faint text under cards (b_01 top)
    (f"{SRC}/frames_zoom/b_01.jpg",   "svc_note.png",(25, 60, 1005, 130)),
    # strategy section heading area f_024 top (before cards)
    (f"{SRC}/frames_dense/f_023.jpg", "strat_head.png",(25, 440, 1005, 742)),
    # objectives cards frame_10 bottom
    (f"{SRC}/frames/frame_10.jpg",    "obj.png",     (25, 555, 1005, 742)),
]

for src, name, box in CROPS:
    img = Image.open(src).crop(box)
    w, h = img.size
    img = img.resize((w * 3, h * 3), Image.LANCZOS)
    img.save(f"{OUT}/{name}")
    print("OK", name, img.size)
