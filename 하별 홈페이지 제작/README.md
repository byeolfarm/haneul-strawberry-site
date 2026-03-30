# 하늘의별딸기 공식 홈페이지 1차본

이 폴더는 `하늘의별딸기` 공식 홈페이지의 정적(static) 1차 완성본입니다.

React, Next.js, Vue, DB 없이 순수 `HTML / CSS / JavaScript`만 사용했습니다.  
브라우저에서 `index.html` 파일을 바로 열어도 기본 구조를 확인할 수 있고, 초보자도 각 파일을 직접 열어 수정할 수 있도록 단순하게 정리했습니다.

## 폴더 구조

```text
index.html
booking.html
directions.html
guide.html
faq.html
assets/
  css/
    style.css
  js/
    main.js
  images/
    home/
    booking/
    directions/
    guide/
    common/
```

## 어떤 파일을 수정하면 되나요?

### 1. 메인 문구, 페이지 내용 수정

- `index.html`: 메인 화면, 소개 문구, 시즌 상태, 핵심 장점
- `booking.html`: 가격, 체험 상품, 옵션, 감성 스냅 안내
- `directions.html`: 주소, 주차, 운영시간, 연락처
- `guide.html`: 방문 전 유의사항, 안전 안내
- `faq.html`: 자주 묻는 질문과 답변

각 HTML 파일 안에는 아래처럼 자주 바뀌는 부분에 주석을 넣어 두었습니다.

```html
<!-- 가격 수정 시작 -->
<p class="price-text">1인 18,000원</p>
<!-- 가격 수정 끝 -->
```

이런 방식으로 `가격`, `연락처`, `운영시간`, `시즌 상태`, `주소` 주변을 쉽게 찾을 수 있습니다.

### 2. 디자인 수정

- `assets/css/style.css`

색상, 버튼 모양, 여백, 카드 디자인, 모바일/PC 레이아웃을 이 파일에서 수정할 수 있습니다.

처음 수정할 때는 아래 항목부터 보면 쉽습니다.

- `:root`
  색상과 기본 폰트, 공통 값이 들어 있습니다.
- `.button`
  버튼 크기와 모양입니다.
- `.site-header`, `.site-footer`
  공통 헤더와 푸터 스타일입니다.
- `.mobile-booking-bar`
  모바일 하단 고정 예약 버튼 영역입니다.

### 3. 메뉴 버튼 동작 수정

- `assets/js/main.js`

현재는 아래 기능만 들어 있습니다.

- 모바일 햄버거 메뉴 열기 / 닫기
- 메뉴 바깥 클릭 시 닫기
- 화면이 커지면 메뉴 상태 정리

복잡한 스크립트는 넣지 않았기 때문에 초보자도 비교적 쉽게 관리할 수 있습니다.

### 4. 이미지 교체

이미지 폴더는 아래 경로를 기준으로 나누어 두었습니다.

- `assets/images/home/`
- `assets/images/booking/`
- `assets/images/directions/`
- `assets/images/guide/`
- `assets/images/common/`

현재 홈페이지는 아래 최종 JPG 파일명을 기준으로 이미지를 읽습니다.

- `assets/images/home/home-hero-01.jpg`
  메인 첫 화면에 넣을 대표 농장 전경 또는 가족 체험 분위기 사진
- `assets/images/home/home-experience-01.jpg`
  부모와 아이가 함께 딸기를 고르거나 수확하는 체험 사진
- `assets/images/booking/booking-program-01.jpg`
  설향 딸기 수확 체험 구성이나 전용 팩이 잘 보이는 사진
- `assets/images/directions/directions-parking-01.jpg`
  농장 입구, 주변 도로, 주차 위치를 이해하기 쉬운 현장 사진
- `assets/images/guide/guide-family-01.jpg`
  방문 가이드 분위기에 맞는 가족 동선 또는 체험 안내 사진
- `assets/images/common/og-image.jpg`
  공유용 대표 이미지로 사용할 브랜드 대표 사진

`favicon`은 별도 파일로 아래 경로를 유지합니다.

- `assets/images/common/favicon.svg`

## 사진 넣는 방법

사용자는 `photo-source` 폴더에 사진만 넣으면 됩니다.

넣는 파일명은 아주 단순하게 아래 6개입니다.

- `photo-source/1.jpg`
- `photo-source/2.jpg`
- `photo-source/3.jpg`
- `photo-source/4.jpg`
- `photo-source/5.jpg`
- `photo-source/6.jpg`

번호별 의미는 아래와 같습니다.

- `1.jpg` = 홈 첫 화면 대표 사진
- `2.jpg` = 홈 소개 / 체험 사진
- `3.jpg` = 예약 / 가격 대표 사진
- `4.jpg` = 오시는 길 / 주차 안내 사진
- `5.jpg` = 방문 가이드 대표 사진
- `6.jpg` = SNS / 카카오톡 / 네이버 공유용 OG 이미지 원본 사진

가능하면 `JPG / JPEG / PNG`를 사용하는 것이 가장 안전합니다.

- `RAW(CR3)`나 `HEIC`는 실행 환경에 따라 자동 변환이 되지 않을 수 있습니다.
- 사진은 가로형이 가장 잘 맞습니다.
- 너무 작은 사진은 피하고, 가급적 긴 변 1600px 이상을 권장합니다.
- `og-image`는 최종적으로 `1200 x 630` 비율이 가장 적합합니다.

사진을 실제 운영 파일로 반영하는 가장 쉬운 방법은 아래 둘 중 하나입니다.

1. `photo-source`에 `1.jpg ~ 6.jpg`를 넣고 루트의 `./apply-photos.sh`를 실행합니다.
2. 또는 `photo-source`에 사진만 넣어 두고 Codex에게 사진 반영 작업을 요청합니다.

자동 반영 스크립트는 원본을 덮어쓰지 않고, 최종 파일만 `assets/images` 쪽에 생성합니다.
이 스크립트는 macOS 기본 이미지 도구인 `sips`를 사용합니다. 다른 환경에서는 자동 변환이 제한될 수 있으며, 그 경우에는 `photo-source`에 사진만 넣어 두고 Codex에게 반영을 요청하면 됩니다.

번호와 최종 파일 매핑은 아래와 같습니다.

- `1` -> `assets/images/home/home-hero-01.jpg`
- `2` -> `assets/images/home/home-experience-01.jpg`
- `3` -> `assets/images/booking/booking-program-01.jpg`
- `4` -> `assets/images/directions/directions-parking-01.jpg`
- `5` -> `assets/images/guide/guide-family-01.jpg`
- `6` -> `assets/images/common/og-image.jpg`

실사진으로 교체할 때는:

1. `photo-source`에 사진을 넣고
2. `./apply-photos.sh`를 실행하면 됩니다.

사진을 다시 교체할 때도 같은 방식입니다.

1. `photo-source`의 `1.jpg ~ 6.jpg`만 새 사진으로 바꾸고
2. `./apply-photos.sh`를 다시 실행하면 최종 이미지가 새 사진으로 덮어써집니다.

현재 프로젝트에는 JPG 플레이스홀더도 함께 준비해 두므로, 실사진 준비 전에도 화면이 깨지지 않습니다.

## GitHub 업로드와 Cloudflare Pages 연결

현재 이 프로젝트는 이미 배포 가능한 파일이 루트에 모두 들어 있는 순수 정적 사이트입니다.

- 프레임워크가 없습니다.
- 별도 빌드 도구가 없습니다.
- 서버 코드가 없습니다.
- 루트 파일 자체가 배포 대상입니다.

현재 폴더에 `.git` 저장소가 없어도 문제 없습니다.  
초보자는 GitHub 웹 업로드 방식으로 시작해도 되고, 익숙하면 `git push` 방식으로 올려도 됩니다.

GitHub에 올리는 가장 쉬운 방법:

1. GitHub에서 새 저장소를 만듭니다.
2. `Add file` > `Upload files`를 선택합니다.
3. 현재 프로젝트 파일 전체를 업로드합니다.
4. `Commit changes`를 눌러 저장소를 완성합니다.

터미널로 push 하는 방법:

```bash
git init
git add .
git commit -m "Initial static site"
git branch -M main
git remote add origin https://github.com/사용자이름/저장소이름.git
git push -u origin main
```

Cloudflare Pages 연결 순서:

1. Cloudflare 대시보드 로그인
2. `Workers & Pages` 이동
3. `Pages` 선택
4. `Import an existing Git repository` 또는 `Connect to Git` 선택
5. GitHub 저장소 연결
6. 배포 브랜치는 보통 `main`으로 선택
7. 첫 배포 실행

이 프로젝트의 Pages 설정 기준:

- 이 프로젝트는 빌드 과정 없는 정적 사이트입니다.
- 프레임워크 preset은 선택하지 않거나 `None`에 가깝게 두면 됩니다.
- Build command는 비워 두는 것이 기본입니다.
- Cloudflare 화면 버전에 따라 Build command 입력이 강제되면 `exit 0`을 사용할 수 있습니다.
- Root directory는 저장소 루트를 그대로 사용하면 됩니다.
- 별도 빌드 산출물 폴더가 없으므로, 이 프로젝트는 루트 자체가 배포 대상입니다.

추가 메모:

- GitHub 저장소와 연결한 뒤에는 commit / push 때마다 Pages가 자동 재배포됩니다.
- `_redirects`는 현재 구조에서 꼭 필요하지 않아 추가하지 않았습니다.
- `pages.dev` 임시 주소를 커스텀 도메인으로 넘기는 리다이렉트는 Cloudflare 쪽 설정으로 별도 처리할 수 있습니다.

## 꼭 알아둘 점

- 모든 예약 버튼과 지도 확인 버튼은 같은 네이버 링크로 연결되어 있습니다.
- SEO 기본 메타태그와 구조화 데이터가 들어 있습니다.
- 홈에는 `LocalBusiness` JSON-LD가 들어 있습니다.
- FAQ에는 `FAQPage` JSON-LD가 들어 있습니다.
- 현재 각 HTML의 `canonical`은 상대경로로 들어 있습니다.
- 실제 배포 도메인이 확정되면, 배포 전에 반드시 절대경로로 변경해 주세요.
- 예시: `https://example.com/booking.html`
- 배포 전에 `index.html`, `booking.html`, `directions.html`, `guide.html`, `faq.html`의 canonical을 모두 실제 운영 도메인 기준 절대경로로 바꾸는 것을 권장합니다.

## 도메인 연결 후 반드시 바꿔야 하는 항목

실제 `.com` 도메인이 연결되면 아래 항목은 꼭 절대경로로 정리해 주세요.

- 각 페이지의 `canonical`
- 각 페이지에 추가할 `og:url`
- 각 페이지의 `og:image`
- 홈 `LocalBusiness` JSON-LD 안의 `image`
- 추후 JSON-LD에 `url` 또는 `logo`를 넣을 경우 해당 절대경로

예시:

- `https://www.example.com/`
- `https://www.example.com/booking.html`
- `https://www.example.com/assets/images/common/og-image.jpg`

도메인 연결 방식 기본 정리:

- apex `.com` 도메인(`example.com`)을 쓰려면 해당 도메인이 Cloudflare zone 안에 있어야 합니다.
- `www.example.com` 같은 서브도메인은 일반적으로 CNAME 기반 연결이 가능합니다.
- 커스텀 도메인을 Pages 프로젝트에 먼저 연결한 뒤 DNS가 정상 반영되는지 확인하는 흐름이 가장 안전합니다.

## 배포 전 체크 항목

- `photo-source` 사진이 최신인지 확인
- `./apply-photos.sh`를 다시 실행했는지 확인
- 메인 / 예약 / 오시는 길 / 가이드 페이지 사진이 정상 노출되는지 확인
- `og-image.jpg`가 최신 사진으로 반영되었는지 확인
- 실제 운영 도메인으로 `canonical`을 절대경로로 변경했는지 확인
- 모바일에서 하단 예약 바와 본문이 겹치지 않는지 확인

## 배포 완료 후 최종 확인 순서

- `pages.dev` 임시 주소에서 사이트가 정상 열리는지 확인
- 커스텀 도메인을 연결했는지 확인
- 각 페이지 `canonical`을 절대경로로 바꿨는지 확인
- `og:url`과 `og:image`를 최종 도메인 기준으로 다시 확인
- 홈 `LocalBusiness` JSON-LD 절대경로를 다시 확인
- 모바일에서 예약 버튼 / 전화 링크 / 지도 링크를 눌러 확인
- 필요하면 `pages.dev` 주소는 Cloudflare 쪽 리다이렉트 설정으로 커스텀 도메인에 정리

## 초보자용 빠른 수정 가이드

### 가격 바꾸기

- `booking.html` 열기
- `가격 수정 시작` 주석 찾기
- 금액만 바꾸기

### 시즌 상태 바꾸기

- `index.html` 열기
- `시즌 상태 문구 수정 시작` 주석 찾기
- 한 줄 문구만 수정

### 연락처 바꾸기

- 각 HTML 파일 하단의 푸터에서 `연락처 수정 시작` 주석 찾기
- 전화번호와 이메일 변경

### 운영시간 바꾸기

- `index.html`, `directions.html`, 각 페이지 푸터의 `운영시간 수정 시작` 또는 `주소 및 운영시간 수정 시작` 주석 찾기
- 문구 수정

## 실행 방법

아주 간단합니다.

1. 이 폴더에서 `index.html`을 더블클릭합니다.
2. 브라우저에서 페이지가 열리는지 확인합니다.
3. 다른 메뉴도 눌러서 링크가 잘 이동하는지 확인합니다.

실제 운영 시에는 웹호스팅 또는 정적 파일 업로드가 가능한 서비스에 이 폴더 전체를 올리면 됩니다.
