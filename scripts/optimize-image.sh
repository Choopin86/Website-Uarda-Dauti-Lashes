#!/usr/bin/env bash
# Resize and convert an image to WebP for use in public/media/pictures.
#
# Usage: scripts/optimize-image.sh <input-file> <output-file.webp> [max-dimension] [quality]
#
# max-dimension: largest side in pixels after resizing (default 1200).
#   Pick ~2x the image's largest CSS display width so it stays sharp on
#   retina screens without shipping more pixels than any layout needs.
# quality: WebP quality 0-100 (default 82).
#
# Requires: sips (macOS built-in) and cwebp (`brew install webp`).

set -euo pipefail

if [ $# -lt 2 ]; then
  echo "Usage: $0 <input-file> <output-file.webp> [max-dimension] [quality]" >&2
  exit 1
fi

input="$1"
output="$2"
max_dim="${3:-1200}"
quality="${4:-82}"

if [ ! -f "$input" ]; then
  echo "Input file not found: $input" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install it with: brew install webp" >&2
  exit 1
fi

tmp_resized="$(mktemp -t optimize-image).$(echo "$input" | sed 's/.*\.//')"
trap 'rm -f "$tmp_resized"' EXIT

sips -Z "$max_dim" "$input" --out "$tmp_resized" >/dev/null
cwebp -q "$quality" "$tmp_resized" -o "$output" >/dev/null 2>&1

before=$(stat -f%z "$input")
after=$(stat -f%z "$output")
echo "$input ($before bytes) -> $output ($after bytes)"
