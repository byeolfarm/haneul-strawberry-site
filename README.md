# 하늘의별딸기 공식 홈페이지

‘하루의 필름’ — 직접 촬영한 실사진과 한국어 상호를 중심으로 한 정적 다국어 홈페이지입니다.

배포 루트는 `site/`입니다. 기존 Cloudflare Workers Builds 연결을 사용합니다.

## 편집과 생성

- `src/film/base.html`: 세 장면의 화면·스크롤 연출
- `src/film/extra.css`: 방문 안내·다국어·예약 UI
- `src/film/content/*.json`: 언어별 운영 안내와 FAQ
- `src/film/film-translations.json`: 필름 장면 문구 번역
- `src/film/facts.json`: 공통 사실 정보
- `tools/build_film_site.py`: 6개 HTML·사이트맵·공개 정보 생성

Python 3에서 `python3 tools/build_film_site.py`를 실행합니다. 외부 패키지는 필요하지 않습니다. 공통 사실을 바꿀 때는 관련 언어별 본문과 번역도 함께 갱신합니다.

## 정보와 접근

1인 19,000원, 10:00–16:00, 월요일 기본 휴무·공휴일 월요일 정상 영업은 사용자가 확인한 기준입니다. 예약 링크는 네이버 플레이스 홈으로 연결됩니다. 예약 가능 날짜·잔여석을 생성하지 않습니다.

본문은 JavaScript 없이 읽을 수 있습니다. 모션 축소 또는 낮은 화면에서는 세 장면을 세로로 표시합니다. 언어별 HTML은 서버 응답에 번역 내용을 포함하고, 실제 언어 링크와 canonical/hreflang을 제공합니다. `site-info.json`, `llms.txt`는 공개 사실 정보의 보조 형식이며 검색 노출을 보장하지 않습니다.

기존 robots 및 보안 헤더 정책은 유지했습니다. 초기 제작 자료가 남아 있는 다른 루트 폴더는 이번 배포 대상이 아닙니다.
