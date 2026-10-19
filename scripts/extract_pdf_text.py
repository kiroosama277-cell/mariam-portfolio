#!/usr/bin/env python3
"""Extract per-page text from the 3 project PDFs to write real captions."""
import subprocess, os, re, json

BASE = "/home/z/my-project/upload"
PDFS = {
    "costa": "Buyer persona-مضغوط.pdf",
    "english": "Classroom rules presentation in multicolor illustrative style-مضغوط.pdf",
    "kids": "Red Minimalist Fashion Presentation.pdf",
}

out = {}
for key, name in PDFS.items():
    path = os.path.join(BASE, name)
    pages = int(re.search(r"Pages:\s+(\d+)", subprocess.run(
        ["pdfinfo", path], capture_output=True, text=True).stdout).group(1))
    arr = []
    for p in range(1, pages + 1):
        r = subprocess.run(
            ["pdftotext", "-f", str(p), "-l", str(p), "-layout", path, "-"],
            capture_output=True, text=True)
        txt = " ".join(r.stdout.split())
        arr.append(txt[:260])
    out[key] = arr

with open("/home/z/my-project/scripts/pdf_pages.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)

for k, arr in out.items():
    print(f"===== {k} ({len(arr)} pages) =====")
    for i, t in enumerate(arr, 1):
        print(f"[{i:02d}] {t[:150]}")
    print()
