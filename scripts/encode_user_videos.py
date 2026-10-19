#!/usr/bin/env python3
"""
Encode Mariam's 3 real motion videos for the web section.

- All are already H.264 but far too heavy (40MB / 14.5MB) for the site.
- Re-encode: libx264 CRF 24 preset slow, capped 3Mbps, AAC 128k audio kept,
  +faststart so playback starts while the file streams.
- Posters: hand-picked frame per video (reviewed via contact sheets),
  saved as 720w JPEG q85.

Output: public/work/videos/motion-0{1,2,3}.mp4 + .jpg
(The old PinGrab reference files at motion-01.* are overwritten.)
"""
import subprocess
from pathlib import Path

ROOT = Path("/home/z/my-project")
OUT = ROOT / "public/work/videos"
OUT.mkdir(parents=True, exist_ok=True)

JOBS = [
    # (source, output-num, poster-timestamp)
    (ROOT / "upload/video_2026-10-19_19-40-21.mp4", "01", 24),
    (ROOT / "upload/video_2026-10-19_19-40-28.mp4", "02", 15),
    (ROOT / "upload/video_2026-10-19_19-40-31.mp4", "03", 10),
]

for src, num, poster_t in JOBS:
    mp4 = OUT / f"motion-{num}.mp4"
    jpg = OUT / f"motion-{num}.jpg"

    subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(src),
         "-c:v", "libx264", "-crf", "24", "-preset", "slow",
         "-maxrate", "3M", "-bufsize", "6M",
         "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "128k",
         "-movflags", "+faststart",
         str(mp4), "-y"],
        check=True,
    )
    subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", str(poster_t), "-i", str(src),
         "-frames:v", "1", "-q:v", "3", "-vf", "scale=720:-2",
         str(jpg), "-y"],
        check=True,
    )
    print(f"motion-{num}: {mp4.stat().st_size/1048576:.1f}MB  poster {jpg.stat().st_size/1024:.0f}KB")

print("done")
