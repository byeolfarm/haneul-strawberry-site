#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$ROOT_DIR/photo-source"
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

if ! command -v sips >/dev/null 2>&1; then
  echo "sips 명령을 찾을 수 없습니다. photo-source에 JPG 원본을 넣은 뒤 Codex에게 수동 반영을 요청해 주세요."
  exit 1
fi

find_source_file() {
  local number="$1"
  local ext

  for ext in jpg jpeg png JPG JPEG PNG; do
    if [[ -f "$SOURCE_DIR/$number.$ext" ]]; then
      echo "$SOURCE_DIR/$number.$ext"
      return 0
    fi
  done

  return 1
}

make_web_jpg() {
  local src="$1"
  local dest="$2"
  local max_size="$3"

  mkdir -p "$(dirname "$dest")"
  sips -s format jpeg -s formatOptions 82 -Z "$max_size" "$src" --out "$dest" >/dev/null
}

make_og_jpg() {
  local src="$1"
  local dest="$2"
  local temp="$TMP_DIR/og-temp.jpg"
  local width
  local height

  mkdir -p "$(dirname "$dest")"
  sips -s format jpeg -s formatOptions 84 -Z 1800 "$src" --out "$temp" >/dev/null

  width="$(sips -g pixelWidth "$temp" | awk '/pixelWidth/ {print $2}')"
  height="$(sips -g pixelHeight "$temp" | awk '/pixelHeight/ {print $2}')"

  if [[ "$width" -ge 1200 && "$height" -ge 630 ]]; then
    sips --cropToHeightWidth 630 1200 "$temp" --out "$dest" >/dev/null
  else
    sips -s format jpeg -s formatOptions 84 -z 630 1200 "$src" --out "$dest" >/dev/null
  fi
}

PHOTO_1="$(find_source_file 1 || true)"
PHOTO_2="$(find_source_file 2 || true)"
PHOTO_3="$(find_source_file 3 || true)"
PHOTO_4="$(find_source_file 4 || true)"
PHOTO_5="$(find_source_file 5 || true)"
PHOTO_6="$(find_source_file 6 || true)"

if [[ -z "$PHOTO_1" || -z "$PHOTO_2" || -z "$PHOTO_3" || -z "$PHOTO_4" || -z "$PHOTO_5" || -z "$PHOTO_6" ]]; then
  echo "photo-source 폴더에 1~6번 사진이 모두 있는지 확인해 주세요."
  echo "지원 확장자: jpg, jpeg, png"
  exit 1
fi

make_web_jpg "$PHOTO_1" "$ROOT_DIR/assets/images/home/home-hero-01.jpg" 2000
make_web_jpg "$PHOTO_2" "$ROOT_DIR/assets/images/home/home-experience-01.jpg" 2000
make_web_jpg "$PHOTO_3" "$ROOT_DIR/assets/images/booking/booking-program-01.jpg" 2000
make_web_jpg "$PHOTO_4" "$ROOT_DIR/assets/images/directions/directions-parking-01.jpg" 2000
make_web_jpg "$PHOTO_5" "$ROOT_DIR/assets/images/guide/guide-family-01.jpg" 2000
make_og_jpg "$PHOTO_6" "$ROOT_DIR/assets/images/common/og-image.jpg"

echo "사진 반영이 완료되었습니다."
echo "홈: assets/images/home/home-hero-01.jpg"
echo "홈 소개: assets/images/home/home-experience-01.jpg"
echo "예약: assets/images/booking/booking-program-01.jpg"
echo "오시는 길: assets/images/directions/directions-parking-01.jpg"
echo "방문 가이드: assets/images/guide/guide-family-01.jpg"
echo "공유 이미지: assets/images/common/og-image.jpg"
