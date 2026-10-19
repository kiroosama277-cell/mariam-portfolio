#!/usr/bin/env python3
"""
Package the Mariam portfolio Next.js project into a clean, ready-to-run zip.

Output: /home/z/my-project/download/mariam-portfolio.zip
Zip root: mariam-portfolio/  (so unzipping creates one tidy folder)

Included: all app code (src/), all assets (public/), prisma schema + db,
every config file, .env, asset-prep python scripts.
Excluded: node_modules, .next build cache, git history, sandbox/verification
folders (frames*, verify, upload, download, examples, tests, skills, backups).
"""
import os
import shutil
import zipfile
from pathlib import Path

ROOT = Path("/home/z/my-project")
STAGE = ROOT / ".zipstage"
NAME = "mariam-portfolio"
OUT = ROOT / "download" / "mariam-portfolio.zip"

EXCLUDE_DIRS = {
    "node_modules", ".next", ".backup", ".git", ".zscripts", ".zipstage",
    "frames", "frames2", "frames3", "frames_ref", "frames_ref2",
    "verify", "upload", "download", "examples", "tests", "skills", "agent-ctx",
}
EXCLUDE_FILES = {
    "worklog.md", "Caddyfile", "dev.log", "server.log", "tsconfig.tsbuildinfo",
}
# inside scripts/ keep only the asset-prep tooling
SCRIPTS_KEEP_EXT = {".py", ".json"}


def copy_tree(src: Path, dst: Path) -> int:
    """Recursively copy src -> dst honoring the exclusion rules. Returns file count.
    dst is the destination DIRECTORY and is created if missing."""
    dst.mkdir(parents=True, exist_ok=True)
    n = 0
    for entry in sorted(src.iterdir()):
        if entry.is_dir():
            if entry.name in EXCLUDE_DIRS:
                continue
            n += copy_tree(entry, dst / entry.name)
        else:
            if entry.name in EXCLUDE_FILES or entry.suffix == ".zip":
                continue
            # scripts/: keep only .py/.json tooling (drop screenshots & contact sheets)
            if (ROOT / "scripts") in entry.parents:
                if entry.suffix not in SCRIPTS_KEEP_EXT:
                    continue
            shutil.copy2(entry, dst / entry.name)
            n += 1
    return n


def main() -> None:
    if STAGE.exists():
        shutil.rmtree(STAGE)
    stage_proj = STAGE / NAME
    stage_proj.mkdir(parents=True)

    total = copy_tree(ROOT, stage_proj)

    if not (stage_proj / "package.json").exists():
        raise SystemExit("staging failed — package.json missing")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    if OUT.exists():
        OUT.unlink()

    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for path in sorted(stage_proj.rglob("*")):
            if path.is_file():
                zf.write(path, path.relative_to(STAGE).as_posix())

    # integrity check
    with zipfile.ZipFile(OUT) as zf:
        bad = zf.testzip()
        names = zf.namelist()
    assert bad is None, f"corrupt member: {bad}"

    shutil.rmtree(STAGE)

    size_mb = OUT.stat().st_size / 1024 / 1024
    print(f"OK {OUT}")
    print(f"size: {size_mb:.1f} MB | files: {len(names)} | integrity: clean")
    top = sorted({n.split('/')[1] for n in names if '/' in n and n.split('/')[1]})
    print("zip root contents:", ", ".join(top))


if __name__ == "__main__":
    main()
