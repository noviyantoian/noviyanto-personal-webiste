#!/bin/bash
# Generate ilustrasi artikel blog lewat codex CLI.
# Output PNG mentah -> scripts/seed/raw/<key>.png
# Prompt dibaca dari prompts.tsv (kolom: key <TAB> subject).
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
RAW="$ROOT/scripts/seed/raw"
GEN="$HOME/.codex/generated_images"
mkdir -p "$RAW"

STYLE='Format: 3:2 landscape.
Style: editorial vector illustration, flat modern, clean geometry, minimal, generous whitespace, soft subtle depth, thin consistent linework.
Strict palette, use only these: white background #FFFFFF, light gray surfaces #F3F4F6 and #E5E7EB, dark charcoal linework #111827, amber accent #F59E0B, orange accent #F97316.
Absolutely no text, no words, no letters, no numbers, no logos, no watermark anywhere in the image.'

newest() { find "$GEN" -type f -name '*.png' -exec stat -f '%m %N' {} \; | sort -rn | head -1 | cut -d' ' -f2-; }

while IFS=$'\t' read -r -u 3 key subject; do
  [ -z "${key:-}" ] && continue
  if [ -f "$RAW/$key.png" ]; then echo "SKIP  $key (sudah ada)"; continue; fi
  before="$(newest)"
  echo "GEN   $key ..."
  codex exec -s read-only --skip-git-repo-check -C "$RAW" \
    "Use your image generation tool to create exactly ONE image. Do not write any files or code.

$STYLE

Subject: $subject" </dev/null >/dev/null 2>&1
  after="$(newest)"
  if [ -n "$after" ] && [ "$after" != "$before" ]; then
    cp "$after" "$RAW/$key.png"
    echo "OK    $key -> $(basename "$after")"
  else
    echo "FAIL  $key (tidak ada gambar baru)"
  fi
done 3< "$ROOT/scripts/seed/prompts.tsv"
echo "SELESAI. File di $RAW:"
ls -1 "$RAW"
