#!/usr/bin/env python3
"""Build one labeled contact sheet per uploaded video so we can
review content and pick poster frames in a single glance."""
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw

VIDS = [
    ("upload/video_2026-10-19_19-40-21.mp4", [2, 12, 24, 36]),
    ("upload/video_2026-10-19_19-40-28.mp4", [2, 6, 11, 15]),
    ("upload/video_2026-10-19_19-40-31.mp4", [2, 6, 10, 14]),
]
OUT = Path("frames/vid")
OUT.mkdir(parents=True, exist_ok=True)
ROOT = Path("/home/z/my-project")

for idx, (rel, stamps) in enumerate(VIDS, 1):
    src = ROOT / rel
    frames = []
    for t in stamps:
        f = OUT / f"v{idx}_t{t}.jpg"
        subprocess.run(
            ["ffmpeg", "-v", "quiet", "-ss", str(t), "-i", str(src),
             "-frames:v", "1", "-q:v", "4", str(f), "-y"],
            check=True,
        )
        frames.append((t, Image.open(f)))

    tw, th = 360, 640  # uniform tile size (portrait 9:16-ish)
    sheet = Image.new("RGB", (tw * 2 + 30, th * 2 + 30), "white")
    draw = ImageDraw.Draw(sheet)
    for k, (t, im) in enumerate(frames):
        im2 = im.resize((tw, th))
        x = (k % 2) * (tw + 30) + 10
        y = (k // 2) * (th + 30) + 10
        sheet.paste(im2, (x, y))
        draw.rectangle([x, y, x + 74, y + 26], fill="black")
        draw.text((x + 8, y + 6), f"t={t}s", fill="white")
    sheet.save(OUT / f"sheet_v{idx}.jpg", quality=88)
    print(f"sheet_v{idx}.jpg <- {rel}")
