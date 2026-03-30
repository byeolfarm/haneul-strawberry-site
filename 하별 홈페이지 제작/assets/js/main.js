document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var page = body.getAttribute("data-page") || "index";
  var menuToggle = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".site-navigation");
  var navigationLinks = document.querySelectorAll(".site-navigation a");
  var copyButtons = document.querySelectorAll("[data-copy-text]");
  var languageSelect = document.querySelector("#language-select");
  var storageKey = "byeolfarm-language";
  var currentLanguage = "ko";
  var supportedLanguages = ["ko", "en"];
  var futureLanguages = ["zh", "vi", "th"];

  var translations = {
    ko: {
      titles: {
        index: "하늘의별딸기 | 가족 체험형 딸기 농장",
        booking: "예약 / 가격 안내 | 하늘의별딸기",
        directions: "오시는 길 | 하늘의별딸기",
        guide: "방문 가이드 | 하늘의별딸기",
        faq: "FAQ | 하늘의별딸기"
      },
      common: {
        nav: ["홈", "예약 / 가격", "오시는 길", "방문 가이드", "FAQ"],
        navBook: "예약하기",
        mobileBook: "네이버 예약 바로가기",
        footerTagline: "가족이 함께 딸기를 따고 추억을 담아가는 체험형 딸기 농장",
        footerHeadings: ["연락처", "주소 / 운영", "페이지 바로가기"],
        footerLinks: ["홈", "예약 / 가격", "오시는 길", "방문 가이드", "FAQ"],
        menuOpen: "메뉴 열기",
        menuClose: "메뉴 닫기",
        languageLabel: "언어 선택",
        copySuccess: "주소가 복사되었습니다",
        copyFail: "복사에 실패했습니다"
      },
      pages: {
        index: {
          heroChips: ["2025-26 시즌 운영 중", "2026 화성시 로컬푸드 우수농가", "네이버 예약 운영"],
          sectionLabels: ["가족 체험형 딸기 농장", "농장 소개", "검증된 농가", "핵심 장점", "빠른 안내", "지금 예약하기"],
          heroSubtitle: "가족이 함께 딸기를 따고, 오래 남을 시간을 담아가는 체험형 딸기 농장",
          heroDescription: "2026년 화성시 로컬푸드 우수농장으로 선정된 깔끔하고 쾌적한 농장에서 아이와 함께 달콤한 하루를 경험해 보세요.",
          heroButtons: ["네이버 예약하기", "오시는 길 보기"],
          trustStrip: ["2026 화성시 로컬푸드 우수농가 선정", "거래 실적 · 안전성 · 현장 관리 기준을 통과한 검증 농가"],
          seasonStatus: "2025-26 시즌 운영 중",
          sectionTitles: [
            "딸기를 따는 시간까지 추억으로 남는 곳",
            "아이와 함께 방문하는 가족이 더 안심할 수 있는 이유",
            "하늘의별딸기가 사랑받는 이유",
            "방문 전 꼭 확인해 주세요",
            "가족과 함께 달콤한 하루를 준비해 보세요"
          ],
          introParagraphs: [
            "하늘의별딸기는 딸기 한 팩만 들고 돌아가는 곳이 아니라, 가족이 함께 딸기를 찾고, 따고, 웃으며 시간을 보내는 체험형 딸기 농장입니다.",
            "아이와 나란히 앉아 빨갛게 익은 열매를 고르고, 손끝으로 조심조심 따는 그 순간이 저희가 드리고 싶은 가장 소중한 체험입니다."
          ],
          awardLead: "2026 화성시 로컬푸드 우수농가 선정. 1,000여 농가 가운데 거래 실적부터 안전성, 현장 관리까지 기준을 통과한 농가의 딸기를 만나보세요.",
          awardList: [
            "거래 실적과 운영 신뢰를 함께 본 기준",
            "안전성과 현장 관리 상태를 확인한 농가",
            "아이와 함께 방문하는 가족이 더 안심할 수 있는 이유"
          ],
          awardStamp: "1,000여 농가 가운데 선정된 신뢰",
          featureHeadings: ["가족 중심 체험", "깔끔하고 쾌적한 농장", "기억에 남는 하루"],
          featureParagraphs: [
            "아이와 부모가 함께 움직이며 자연스럽게 추억을 만들 수 있는 체험 흐름으로 운영합니다.",
            "정돈된 체험 환경과 안정적인 동선으로 처음 방문하는 가족도 편안하게 머물 수 있습니다.",
            "단순 수확을 넘어, 오래 기억될 시간을 남기는 가족 나들이 장소가 되도록 준비합니다."
          ],
          quickHeadings: ["운영시간", "예약 안내", "방문 위치"],
          quickParagraphGroups: [
            ["오전 9시부터 오후 4시까지 운영합니다.", "기본 휴무일은 매주 월요일이며, 월요일이 공휴일인 경우 운영될 수 있습니다."],
            ["운영 일정과 예약 가능 여부는 네이버 스마트플레이스 예약 페이지에서 확인해 주세요."],
            ["경기도 화성시 만세구 팔탄면 노하길116번길 177-26", "우편번호 18576"]
          ],
          quickLinks: ["예약 / 가격 자세히 보기", "오시는 길 자세히 보기"],
          ctaDescription: "운영 일정과 예약 가능 여부는 네이버 스마트플레이스 예약 페이지를 통해 가장 정확하게 확인하실 수 있습니다.",
          ctaButtons: ["예약 페이지 열기", "자주 묻는 질문 보기"]
        },
        booking: {
          sectionLabels: ["예약 / 가격 안내", "체험 운영 안내", "추가 옵션", "특별 이벤트", "예약 바로가기"],
          pageTitle: "예약 / 가격 안내",
          heroSmallLabel: "대표 체험",
          productTitle: "설향 딸기 수확 체험",
          trustNote: "2026 화성시 로컬푸드 우수농가 선정 농장",
          heroDescription: "가족이 함께 설향 딸기를 직접 수확하며 시간을 보내는 대표 체험입니다.",
          heroSummaryLabels: ["입장 기준", "유아 기준", "기본 구성", "추가 수확"],
          heroSummaryTexts: [
            "사진만 찍는 보호자도 동일 요금 적용",
            "24개월 미만 무료 입장(증빙서류 지참)",
            "1인 500g 전용 팩 / 뚜껑이 닫히는 범위",
            "100g 단위 현장 결제 / 방문일 현장 시세 기준"
          ],
          heroButtons: ["네이버 예약하기", "운영 안내 보기"],
          operationTitle: "예약 전에 흐름을 간단히 확인해 주세요",
          addonSectionTitle: "인기 옵션 안내",
          eventTitle: "농장주의 깜짝 감성 스냅 선물",
          ctaTitle: "가장 정확한 운영 일정은 네이버 예약 페이지에서 확인해 주세요",
          infoHeadings: ["체험 시간", "운영 기준", "도착 안내"],
          infoLists: [
            ["토·일·공휴일 체험 시간 1시간 40분", "평일(화~금) 체험 시간 2시간 30분"],
            ["기본 휴무일은 매주 월요일이며, 월요일이 공휴일인 경우 운영될 수 있습니다.", "운영 일정과 예약 가능 여부는 네이버 스마트플레이스 예약 페이지에서 확인해 주세요."],
            ["원활한 진행을 위해 예약 시간 10분 전 도착을 권장합니다.", "늦게 도착하실 경우 감성 스냅 진행이 어려울 수 있습니다."]
          ],
          addonSmallLabel: "옵션명",
          addonTitle: "딸기 미니 컵케이크 만들기",
          addonParagraphs: [
            "구성: 미니 컵케이크 용기 + 생크림 + 카스테라 케이크",
            "내 손으로 딴 딸기로 세상에 하나뿐인 작은 디저트를 만들어보는 인기 옵션입니다."
          ],
          eventIntro: "감성 스냅은 하늘의별딸기가 예약 가족에게 드리는 무료 특별 이벤트입니다. 현장 운영 상황에 따라 진행 여부가 달라지며, 모든 방문객에게 상시 제공되는 기본 서비스는 아닙니다.",
          eventList: [
            "평일에는 예약 고객을 중심으로 운영됩니다.",
            "예약자에 한해 초상권 활용 동의서 작성 후 진행됩니다.",
            "주말에는 현장 상황에 따라 탄력적으로 운영되며, 예약 없이 진행되는 경우도 있습니다.",
            "기본 혜택으로 베스트컷 1매를 인화 사진으로 무료 증정해 드립니다.",
            "디지털 보정본은 원하시는 경우에 한해, 방문 후 아래 채널 중 한 곳에 사진 첨부 리뷰를 남겨 주신 예약자께 전송해 드립니다.",
            "가능 채널: 네이버 블로그 / 맘카페 / 당근 동네생활 / 인스타그램 게시글",
            "인스타그램 스토리를 포함한 스토리 업로드는 제외됩니다.",
            "리뷰 작성은 선택사항이며 강제가 아닙니다.",
            "감성 스냅은 무료 이벤트이므로 현장 상황에 따라 제공이 어려울 수 있습니다.",
            "현재 별도의 유료 촬영 서비스나 추가 결제형 보정본 판매는 운영하지 않습니다."
          ],
          ctaDescription: "예약 가능 여부와 운영일은 수시로 달라질 수 있으므로 방문 전 반드시 예약 페이지를 확인해 주세요.",
          ctaButtons: ["네이버 예약하기", "FAQ 보기"]
        },
        directions: {
          sectionLabels: ["오시는 길", "도착 안내"],
          pageTitle: "오시는 길",
          intro: "하늘의별딸기는 자가용 방문을 기준으로 찾아오시는 분들이 많습니다. 방문 전 네이버 지도를 통해 위치를 확인해 주세요.",
          cardTitles: ["주소 안내", "지도 확인", "주차 안내", "운영시간 안내", "연락처"],
          addressParagraphs: [
            "도로명 주소: 경기도 화성시 만세구 팔탄면 노하길116번길 177-26",
            "지번 주소: 경기도 화성시 만세구 팔탄면 노하리 1267-5",
            "우편번호: 18576"
          ],
          actionButtons: ["도로명 주소 복사하기", "전화 걸기", "네이버 지도 열기", "대표번호로 전화하기"],
          mapParagraphs: [
            "방문 전 길 찾기와 예약 페이지 확인을 한 번에 진행하실 수 있습니다.",
            "위 버튼으로 주소 복사, 전화 연결, 네이버 지도 이동을 바로 진행하실 수 있습니다."
          ],
          parkingParagraphs: ["농장 옆 도로에 가로주차해 주세요.", "진입로에는 주차하실 수 없습니다."],
          arrivalTitle: "예약 시간 10분 전 도착을 권장합니다",
          arrivalList: ["예약 시간 10분 전까지 도착해 주세요.", "지각 시 체험 시간 연장이 어렵고, 감성 스냅 이벤트 진행이 어려울 수 있습니다."],
          hoursParagraphs: [
            "영업시간은 오전 9시부터 오후 4시까지입니다.",
            "기본 휴무일은 매주 월요일입니다. 다만 월요일이 공휴일인 경우에는 정상 운영될 수 있습니다.",
            "운영 일정과 예약 가능 여부는 네이버 스마트플레이스 예약 페이지를 확인해 주세요."
          ],
          contactParagraphs: ["대표번호:", "이메일:"]
        },
        guide: {
          sectionLabels: ["방문 가이드"],
          pageTitle: "방문 가이드",
          intro: "방문 전에 아래 내용을 확인하시면 더 편안하고 즐거운 체험이 가능합니다.",
          quickTitle: "방문 전 빠른 체크",
          quickList: [
            "원활한 체험을 위해 예약 시간 10분 전 도착을 권장합니다.",
            "지각 시 체험 시간 연장은 불가합니다.",
            "반려동물은 동반하실 수 없습니다.",
            "체험존 내 가방 반입은 제한됩니다."
          ],
          cardTitles: ["체험 이용 안내", "가방 및 소지품 안내", "안전 안내", "현장 이용 안내", "우천 안내", "감성 스냅 안내"],
          cardLists: [
            [
              "제공된 전용 팩의 뚜껑이 완전히 닫히는 범위까지 담아가실 수 있습니다.",
              "초과 수확 시 추가 요금이 발생할 수 있습니다.",
              "추가 수확은 100g 단위로 현장 결제되며, 금액은 방문일 현장 시세 기준으로 안내됩니다.",
              "시식은 지정된 공간에서만 가능합니다."
            ],
            [
              "체험존 안으로는 가방을 들고 입장하실 수 없습니다.",
              "가방이나 소지품이 통로 또는 딸기에 닿지 않도록 협조 부탁드립니다.",
              "열매 보호와 안전한 이동 동선을 위해 카메라와 포대기도 같은 기준으로 제한됩니다.",
              "귀중품은 차량에 보관 후 입장해 주세요."
            ],
            [
              "벌 알레르기가 있으신 분은 예약 전 반드시 문의해 주세요.",
              "딸기, 꽃가루, 장미과 식물에 민감하신 분도 예약 전 미리 문의 부탁드립니다.",
              "수정벌을 자극하지 않도록 손을 가까이 대거나 놀라게 하지 않도록 주의해 주세요.",
              "이상 증상이 있을 경우 즉시 직원에게 알려 주세요.",
              "반려동물은 동반하실 수 없습니다."
            ],
            [
              "외부 음식은 간단한 간식만 가능합니다.",
              "발생한 쓰레기는 반드시 수거 부탁드립니다.",
              "원활한 체험을 위해 예약 시간 10분 전 도착을 권장합니다.",
              "지각 시 체험 시간 연장은 불가합니다."
            ],
            [
              "체험은 시설하우스 안에서 진행되므로 심한 재난 수준의 폭설·폭우가 아닌 이상 정상 진행됩니다.",
              "단, 안전상 운영이 어렵다고 판단되는 경우에는 별도 공지될 수 있습니다."
            ],
            [
              "감성 스냅은 예약 가족 대상의 무료 특별 이벤트입니다.",
              "모든 방문객에게 상시 제공되는 기본 서비스는 아닙니다.",
              "예약 시간 준수와 현장 운영 상황에 따라 제공 여부가 달라질 수 있습니다."
            ]
          ]
        },
        faq: {
          sectionLabels: ["FAQ", "추가 확인이 필요하신가요?"],
          pageTitle: "자주 묻는 질문",
          intro: "예약과 방문 전에 많이 궁금해하시는 내용을 한곳에 정리했습니다.",
          questions: [
            "예약은 어디서 하나요?",
            "보호자도 반드시 1인 1체험 결제를 해야 하나요?",
            "24개월 미만도 요금이 있나요?",
            "취소 및 환불 기준은 어떻게 되나요?",
            "딸기는 얼마나 담아갈 수 있나요?",
            "추가 수확은 가능한가요?",
            "컵케이크 만들기 옵션은 어떻게 이용하나요?",
            "체험존 안으로 가방을 들고 들어갈 수 있나요?",
            "주차는 어디에 해야 하나요?",
            "반려동물 동반이 가능한가요?",
            "늦게 도착하면 어떻게 되나요?",
            "비가 오면 체험이 가능한가요?",
            "감성 스냅은 모든 방문객에게 제공되나요?",
            "감성 스냅 디지털 사진은 어떻게 받을 수 있나요?"
          ],
          answers: [
            "예약과 결제는 네이버 스마트플레이스를 통해 진행됩니다.",
            "네. 사진만 찍는 보호자도 동일하게 1인 1체험 결제가 적용됩니다.",
            "24개월 미만은 증빙서류 지참 시 무료 입장 가능합니다.",
            "농장 사정으로 취소되는 경우에는 100% 환불됩니다. 고객 취소 및 변경 가능 여부와 수수료 기준은 예약 시 안내되는 네이버 예약 페이지 정책이 적용됩니다. 노쇼의 경우 환불이 불가합니다.",
            "1인당 500g 전용 팩 1개가 제공되며, 제공된 팩의 뚜껑이 완전히 닫히는 범위까지 담아가실 수 있습니다.",
            "가능합니다. 추가 수확분은 100g 단위로 현장 결제되며, 금액은 방문일 현장 시세 기준으로 안내됩니다.",
            "예약 시 또는 현장 안내에 따라 추가 옵션으로 이용하실 수 있습니다.",
            "체험존 안으로는 가방을 들고 입장하실 수 없습니다. 열매 보호와 이동 동선을 위해 카메라와 포대기도 같은 기준으로 제한됩니다.",
            "농장 옆 도로에 가로주차해 주세요. 진입로에는 주차하실 수 없습니다.",
            "반려동물은 동반하실 수 없습니다.",
            "체험 시간 연장은 불가하며, 감성 스냅 진행이 어려울 수 있습니다.",
            "네. 체험은 시설하우스 안에서 진행되므로 심한 재난 수준의 폭설·폭우가 아닌 이상 정상 진행됩니다. 단, 안전상 운영이 어렵다고 판단되는 경우에는 네이버 스마트플레이스를 통해 별도 안내드립니다.",
            "감성 스냅은 예약 가족을 대상으로 운영되는 무료 특별 이벤트이며, 현장 상황에 따라 제공 여부가 달라질 수 있습니다. 모든 방문객에게 상시 제공되는 기본 서비스는 아닙니다.",
            "기본 혜택으로 베스트컷 1매 인화 사진이 제공됩니다. 디지털 보정본은 원하시는 경우에 한해 네이버 블로그, 맘카페, 당근 동네생활, 인스타그램 게시글 중 한 곳에 사진 첨부 리뷰를 남겨 주시면 전송해 드립니다. 인스타그램 스토리는 제외되며, 별도 유료 촬영 서비스나 추가 결제형 보정본 판매는 운영하지 않습니다."
          ],
          ctaTitle: "예약 페이지에서 운영일과 가능 여부를 확인해 주세요",
          ctaDescription: "실시간 운영 상태와 예약 가능 날짜는 네이버 스마트플레이스 페이지가 가장 정확합니다.",
          ctaButtons: ["네이버 예약하기", "방문 가이드 보기"]
        }
      }
    },
    en: {
      titles: {
        index: "Haneul Strawberry | Family Strawberry Experience Farm",
        booking: "Booking / Pricing | Haneul Strawberry",
        directions: "Directions | Haneul Strawberry",
        guide: "Visit Guide | Haneul Strawberry",
        faq: "FAQ | Haneul Strawberry"
      },
      common: {
        nav: ["Home", "Booking / Pricing", "Directions", "Visit Guide", "FAQ"],
        navBook: "Book Now",
        mobileBook: "Book on Naver",
        footerTagline: "A family strawberry farm where picking fruit becomes a lasting memory.",
        footerHeadings: ["Contact", "Address / Hours", "Site Links"],
        footerLinks: ["Home", "Booking / Pricing", "Directions", "Visit Guide", "FAQ"],
        menuOpen: "Open menu",
        menuClose: "Close menu",
        languageLabel: "Select language",
        copySuccess: "Address copied",
        copyFail: "Copy failed"
      },
      pages: {
        index: {
          heroChips: ["Season Open", "2026 Hwaseong Best Local Food Farm", "Naver Booking"],
          sectionLabels: ["Family Strawberry Experience Farm", "About the Farm", "Verified Farm", "Why Families Choose Us", "Quick Info", "Book Now"],
          heroSubtitle: "A hands-on strawberry farm where families pick fruit together and take home a day to remember.",
          heroDescription: "Selected as a 2026 Hwaseong Local Food Best Farm, we offer a clean and comfortable space where families with children can enjoy a sweeter day out.",
          heroButtons: ["Book on Naver", "View Directions"],
          trustStrip: ["Selected as a 2026 Hwaseong Local Food Best Farm", "A verified farm that passed standards for transaction record, safety, and on-site management"],
          seasonStatus: "2025-26 season now open",
          sectionTitles: [
            "A place where strawberry picking becomes part of the memory",
            "Why families can feel more at ease here",
            "Why families remember Haneul Strawberry",
            "Please check before your visit",
            "Plan a sweet day out with your family"
          ],
          introParagraphs: [
            "Haneul Strawberry is more than a place where you leave with a pack of strawberries. It is a family experience farm where parents and children look, pick, and smile together.",
            "Sitting side by side with your child, choosing bright red fruit and carefully picking it by hand. That moment is the experience we value most."
          ],
          awardLead: "Selected as a 2026 Hwaseong Local Food Best Farm. Among more than 1,000 farms, ours was chosen through standards that reflect transaction record, safety, and on-site management.",
          awardList: [
            "Standards that reviewed both track record and operating trust",
            "A farm checked for safety and on-site management quality",
            "A reason families with children can feel more at ease"
          ],
          awardStamp: "Trusted among 1,000+ farms",
          featureHeadings: ["Family-centered experience", "Clean and comfortable farm", "A day worth remembering"],
          featureParagraphs: [
            "We operate the experience so parents and children can move together naturally and make memories side by side.",
            "A tidy environment and stable visitor flow help first-time families feel comfortable throughout the visit.",
            "We prepare the farm to be more than a picking stop, but a family outing worth remembering."
          ],
          quickHeadings: ["Hours", "Reservations", "Location"],
          quickParagraphGroups: [
            ["Open from 9:00 AM to 4:00 PM.", "Closed every Monday by default, but open when Monday is a public holiday."],
            ["Please check the Naver Smart Place reservation page for operating dates and availability."],
            ["177-26, Nohagil 116beon-gil, Paltan-myeon, Hwaseong-si, Gyeonggi-do", "Postal code 18576"]
          ],
          quickLinks: ["See booking / pricing", "See directions"],
          ctaDescription: "The Naver Smart Place reservation page is the most accurate place to check operating dates and reservation availability.",
          ctaButtons: ["Open booking page", "See FAQ"]
        },
        booking: {
          sectionLabels: ["Booking / Pricing", "Experience Details", "Add-on Option", "Special Event", "Book Now"],
          pageTitle: "Booking / Pricing",
          heroSmallLabel: "Signature Experience",
          productTitle: "Seolhyang Strawberry Picking Experience",
          trustNote: "Selected as a 2026 Hwaseong Local Food Best Farm",
          heroDescription: "Our signature family experience where you harvest Seolhyang strawberries together and spend meaningful time on the farm.",
          heroSummaryLabels: ["Entry Policy", "Infant Policy", "Included", "Extra Harvest"],
          heroSummaryTexts: [
            "Guardians taking photos are charged the same rate",
            "Under 24 months free with proof of age",
            "One 500g pack per person / fill within lid-closing range",
            "Paid on-site in 100g units / priced by the day’s rate"
          ],
          heroButtons: ["Book on Naver", "View details"],
          operationTitle: "Please check the flow before you book",
          addonSectionTitle: "Popular add-on",
          eventTitle: "The owner’s surprise lifestyle snap gift",
          ctaTitle: "The Naver reservation page is the most accurate place to check dates",
          infoHeadings: ["Experience Time", "Operating Schedule", "Arrival"],
          infoLists: [
            ["1 hour 40 minutes on weekends and public holidays", "2 hours 30 minutes on weekdays (Tue-Fri)"],
            ["Closed every Monday by default, but open when Monday is a public holiday.", "Please check the Naver Smart Place reservation page for operating dates and availability."],
            ["Arriving 10 minutes before your reservation time is recommended.", "If you arrive late, the lifestyle snap event may be difficult to proceed."]
          ],
          addonSmallLabel: "Add-on",
          addonTitle: "Mini Strawberry Cupcake Making",
          addonParagraphs: [
            "Includes: mini cupcake container + whipped cream + castella cake",
            "A popular add-on where you turn the strawberries you picked into a one-of-a-kind little dessert."
          ],
          eventIntro: "Lifestyle snaps are a free special event for booked families. Availability depends on on-site conditions, and it is not a basic service provided to every visitor at all times.",
          eventList: [
            "Weekdays are operated mainly for booked families.",
            "It is 진행 only for booked guests after signing a photo consent form.",
            "On weekends, availability can change flexibly depending on on-site conditions and may sometimes proceed without advance booking.",
            "One printed best shot is given free as the basic benefit.",
            "If requested, a digital retouched file will be sent after a photo-attached review is posted on one of the channels below.",
            "Available channels: Naver Blog / mom cafe / Danggeun neighborhood / Instagram post",
            "Instagram Stories and other story uploads are excluded.",
            "Posting a review is optional and never required.",
            "Because this is a free event, it may not be available depending on on-site conditions.",
            "There is no separate paid photo service or additional paid retouched file sale."
          ],
          ctaDescription: "Operating dates and availability may change, so please check the reservation page before your visit.",
          ctaButtons: ["Book on Naver", "View FAQ"]
        },
        directions: {
          sectionLabels: ["Directions", "Arrival"],
          pageTitle: "Directions",
          intro: "Most visitors come by car. Please check the location on Naver Map before your visit.",
          cardTitles: ["Address", "Map", "Parking", "Hours", "Contact"],
          addressParagraphs: [
            "Road address: 177-26, Nohagil 116beon-gil, Paltan-myeon, Hwaseong-si, Gyeonggi-do",
            "Lot address: 1267-5, Nohari, Paltan-myeon, Hwaseong-si, Gyeonggi-do",
            "Postal code: 18576"
          ],
          actionButtons: ["Copy road address", "Call now", "Open Naver Map", "Call main number"],
          mapParagraphs: [
            "You can check directions and the reservation page in one place before visiting.",
            "Use the buttons above to copy the address, call, or open Naver Map right away."
          ],
          parkingParagraphs: ["Please park parallel along the road next to the farm.", "Parking in the access lane is not allowed."],
          arrivalTitle: "Arriving 10 minutes before your reservation time is recommended",
          arrivalList: ["Please arrive by 10 minutes before your reservation time.", "If you are late, extending the experience time is difficult and the lifestyle snap event may not be possible."],
          hoursParagraphs: [
            "Open from 9:00 AM to 4:00 PM.",
            "Closed every Monday by default. If Monday is a public holiday, the farm may operate normally.",
            "Please check the Naver Smart Place reservation page for operating dates and availability."
          ],
          contactParagraphs: ["Main phone:", "Email:"]
        },
        guide: {
          sectionLabels: ["Visit Guide"],
          pageTitle: "Visit Guide",
          intro: "Please check the information below before your visit for a more comfortable and enjoyable experience.",
          quickTitle: "Quick Check Before You Visit",
          quickList: [
            "Arriving 10 minutes before your reservation time is recommended.",
            "If you arrive late, the experience time cannot be extended.",
            "Pets are not allowed.",
            "Bags are restricted inside the picking zone."
          ],
          cardTitles: ["Experience Rules", "Bags and Personal Items", "Safety", "On-site Use", "Rainy Day Notice", "Lifestyle Snap Notice"],
          cardLists: [
            [
              "You may take strawberries within the range where the lid of the provided pack fully closes.",
              "Extra harvesting may incur additional charges.",
              "Extra harvest is paid on-site in 100g units, based on the day’s rate.",
              "Tasting is allowed only in the designated area."
            ],
            [
              "You cannot enter the picking zone with a bag.",
              "Please help make sure bags or belongings do not touch the path or the strawberries.",
              "For fruit protection and safe movement, cameras and baby carriers follow the same restriction.",
              "Please keep valuables in your car before entering."
            ],
            [
              "If you have a bee allergy, please ask in advance before booking.",
              "If you are sensitive to strawberries, pollen, or plants in the rose family, please ask before booking as well.",
              "Please avoid reaching toward or startling the pollination bees.",
              "If you feel any unusual symptoms, inform staff immediately.",
              "Pets are not allowed."
            ],
            [
              "Only light snacks from outside are allowed.",
              "Please collect and take your trash with you.",
              "Arriving 10 minutes before your reservation time is recommended for a smoother experience.",
              "If you are late, the experience time cannot be extended."
            ],
            [
              "The experience takes place inside a greenhouse, so it normally proceeds unless there is severe disaster-level snow or rain.",
              "However, if operation is judged unsafe, a separate notice may be announced."
            ],
            [
              "Lifestyle snaps are a free special event for booked families.",
              "It is not a basic service provided to every visitor at all times.",
              "Availability depends on punctual arrival and on-site conditions."
            ]
          ]
        },
        faq: {
          sectionLabels: ["FAQ", "Need more help?"],
          pageTitle: "Frequently Asked Questions",
          intro: "We have gathered the questions visitors ask most often before booking and visiting.",
          questions: [
            "Where do I make a reservation?",
            "Do guardians also have to pay for the experience?",
            "Is there a fee for children under 24 months?",
            "What is the cancellation / refund / no-show policy?",
            "How much strawberry can I take home?",
            "Is extra harvesting available?",
            "How do I use the cupcake add-on?",
            "Can I bring a bag into the picking zone?",
            "Where should I park?",
            "Are pets allowed?",
            "What happens if I arrive late?",
            "Can the experience continue if it rains?",
            "Is the lifestyle snap provided to every visitor?",
            "How do I receive the digital lifestyle snap photo?"
          ],
          answers: [
            "Reservations and payment are handled through Naver Smart Place.",
            "Yes. Guardians who only take photos are charged the same one-person experience fee.",
            "Children under 24 months may enter free with proof of age.",
            "If the farm cancels, the booking is fully refunded. Customer cancellation and change policies follow the Naver reservation page. No-shows are not refundable.",
            "One 500g pack is provided per person, and you may take strawberries within the range where the lid fully closes.",
            "Yes. Extra harvest is paid on-site in 100g units, based on the day’s rate.",
            "It can be used as an add-on during booking or following on-site guidance.",
            "You cannot enter the picking zone with a bag. Cameras and baby carriers follow the same restriction to protect the fruit and keep walkways safe.",
            "Please park parallel along the road next to the farm. Parking in the access lane is not allowed.",
            "Pets are not allowed.",
            "The experience time cannot be extended, and the lifestyle snap event may not be possible.",
            "Yes. The experience usually proceeds inside the greenhouse unless there is severe disaster-level snow or rain. If operation is considered unsafe, notice will be given through Naver Smart Place.",
            "Lifestyle snaps are a free special event for booked families. Availability depends on on-site conditions and it is not a basic service provided to every visitor at all times.",
            "One printed best shot is included as the basic benefit. If requested, a digital retouched file will be sent when you post a photo-attached review on one of these channels: Naver Blog, mom cafe, Danggeun neighborhood, or an Instagram feed post. Instagram Stories are excluded, and there is no paid photo service or paid retouched file sale."
          ],
          ctaTitle: "Check the reservation page for dates and availability",
          ctaDescription: "The Naver Smart Place page is the most accurate place to check live operating status and reservation availability.",
          ctaButtons: ["Book on Naver", "View Visit Guide"]
        }
      }
    }
  };

  function queryAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function setText(node, text) {
    if (node) {
      node.textContent = text;
    }
  }

  function setTextList(nodes, values) {
    nodes.forEach(function (node, index) {
      if (values[index] !== undefined) {
        node.textContent = values[index];
      }
    });
  }

  function setMenuState(isOpen) {
    if (!menuToggle || !navigation) {
      return;
    }

    var common = translations[currentLanguage].common;

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? common.menuClose : common.menuOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    navigation.classList.toggle("is-open", isOpen);
  }

  function closeMenu() {
    setMenuState(false);
  }

  function copyText(button) {
    var common = translations[currentLanguage].common;
    var text = button.getAttribute("data-copy-text");
    var originalText = button.getAttribute("data-original-text") || button.textContent;
    var successText = button.getAttribute("data-copy-success") || common.copySuccess;

    if (!text) {
      return;
    }

    button.setAttribute("data-original-text", originalText);

    function showResult(message) {
      button.textContent = message;
      window.setTimeout(function () {
        button.textContent = originalText;
      }, 1800);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        showResult(successText);
      }).catch(function () {
        showResult(common.copyFail);
      });
      return;
    }

    var helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();

    try {
      document.execCommand("copy");
      showResult(successText);
    } catch (error) {
      showResult(common.copyFail);
    }

    document.body.removeChild(helper);
  }

  function applyCommonLanguage(lang) {
    var common = translations[lang].common;
    document.documentElement.lang = lang;
    document.title = translations[lang].titles[page] || document.title;

    setTextList(queryAll(".nav-list a"), common.nav);
    setText(document.querySelector(".nav-booking-button"), common.navBook);
    setText(document.querySelector(".mobile-booking-bar .button"), common.mobileBook);
    setText(document.querySelector(".footer-brand p"), common.footerTagline);
    setTextList(queryAll(".site-footer h3"), common.footerHeadings);
    setTextList(queryAll(".footer-links a"), common.footerLinks);

    if (languageSelect) {
      languageSelect.setAttribute("aria-label", common.languageLabel);
    }

    copyButtons.forEach(function (button) {
      button.setAttribute("data-copy-success", common.copySuccess);
      button.removeAttribute("data-original-text");
    });
  }

  function applyIndexLanguage(lang) {
    var pageData = translations[lang].pages.index;
    setTextList(queryAll(".hero-chip"), pageData.heroChips);
    setTextList(queryAll("main .section-label"), pageData.sectionLabels);
    setText(document.querySelector(".hero-subtitle"), pageData.heroSubtitle);
    setText(document.querySelector(".hero-description"), pageData.heroDescription);
    setTextList(queryAll(".hero-text .button-group a"), pageData.heroButtons);
    setText(document.querySelector(".trust-strip__title"), pageData.trustStrip[0]);
    setText(document.querySelector(".trust-strip__text"), pageData.trustStrip[1]);
    setText(document.querySelector(".season-status__text"), pageData.seasonStatus);
    setTextList(queryAll("main h2"), pageData.sectionTitles);
    setTextList(queryAll(".content-grid--intro .text-panel p"), pageData.introParagraphs);
    setText(document.querySelector(".award-proof-lead"), pageData.awardLead);
    setTextList(queryAll(".award-proof-list li"), pageData.awardList);
    setText(document.querySelector(".award-proof-stamp"), pageData.awardStamp);
    setTextList(queryAll(".feature-grid h3"), pageData.featureHeadings);
    setTextList(queryAll(".feature-grid p"), pageData.featureParagraphs);

    var infoCards = queryAll(".info-grid .info-card");
    var quickLinks = queryAll(".text-link");

    if (infoCards[0]) {
      setText(infoCards[0].querySelector("h3"), pageData.quickHeadings[0]);
      setTextList(queryAll(".info-grid .info-card:first-child p"), pageData.quickParagraphGroups[0]);
    }

    if (infoCards[1]) {
      setText(infoCards[1].querySelector("h3"), pageData.quickHeadings[1]);
      setText(infoCards[1].querySelector("p"), pageData.quickParagraphGroups[1][0]);
    }

    if (infoCards[2]) {
      setText(infoCards[2].querySelector("h3"), pageData.quickHeadings[2]);
      setTextList(queryAll(".info-grid .info-card:nth-child(3) p"), pageData.quickParagraphGroups[2]);
    }

    setTextList(quickLinks, pageData.quickLinks);
    setText(document.querySelector(".cta-card p:last-of-type"), pageData.ctaDescription);
    setTextList(queryAll(".cta-card .button-group a"), pageData.ctaButtons);
  }

  function applyBookingLanguage(lang) {
    var pageData = translations[lang].pages.booking;
    setTextList(queryAll("main .section-label"), pageData.sectionLabels);
    setText(document.querySelector(".section-heading--center h1"), pageData.pageTitle);
    setText(document.querySelector(".booking-hero-text .small-label"), pageData.heroSmallLabel);
    setText(document.querySelector(".booking-hero-text h2"), pageData.productTitle);
    setText(document.querySelector(".booking-trust-note"), pageData.trustNote);
    setText(document.querySelector(".booking-hero-text > p:not(.small-label):not(.booking-trust-note):not(.price-text)"), pageData.heroDescription);
    setTextList(queryAll(".booking-hero-summary__label"), pageData.heroSummaryLabels);

    queryAll(".booking-hero-summary__item").forEach(function (item, index) {
      var valueNode = item.querySelector("p:last-child");
      setText(valueNode, pageData.heroSummaryTexts[index]);
    });

    setTextList(queryAll(".booking-hero-actions a"), pageData.heroButtons);
    setText(document.querySelector("#booking-operation .section-heading h2"), pageData.operationTitle);
    setText(document.querySelector(".highlight-card--addon").closest("section").querySelector(".section-heading h2"), pageData.addonSectionTitle);
    setText(document.querySelector(".highlight-card--event").closest("section").querySelector(".section-heading h2"), pageData.eventTitle);
    setText(document.querySelector(".cta-card h2"), pageData.ctaTitle);
    setTextList(queryAll("#booking-operation .info-card h3"), pageData.infoHeadings);

    queryAll("#booking-operation .info-card").forEach(function (card, index) {
      setTextList(queryAll("#booking-operation .info-card:nth-child(" + (index + 1) + ") li"), pageData.infoLists[index]);
    });

    setText(document.querySelector(".highlight-card--addon .small-label"), pageData.addonSmallLabel);
    setText(document.querySelector(".highlight-card--addon h3"), pageData.addonTitle);
    setTextList(queryAll(".highlight-card--addon p:not(.small-label):not(.highlight-price)"), pageData.addonParagraphs);
    setText(document.querySelector(".highlight-card--event > p"), pageData.eventIntro);
    setTextList(queryAll(".highlight-card--event li"), pageData.eventList);
    setText(document.querySelector(".cta-card p:last-of-type"), pageData.ctaDescription);
    setTextList(queryAll(".cta-card .button-group a"), pageData.ctaButtons);
  }

  function applyDirectionsLanguage(lang) {
    var pageData = translations[lang].pages.directions;
    setTextList(queryAll("main .section-label"), pageData.sectionLabels);
    setText(document.querySelector(".section-heading--center h1"), pageData.pageTitle);
    setText(document.querySelector(".section-heading--center p:last-child"), pageData.intro);
    setTextList(queryAll(".info-grid h2"), pageData.cardTitles);
    setTextList(queryAll(".info-grid .info-card:first-child p"), pageData.addressParagraphs);
    setTextList(queryAll(".quick-action-group .button"), pageData.actionButtons);
    setTextList(queryAll(".info-grid .info-card:nth-child(2) p"), pageData.mapParagraphs);
    setTextList(queryAll(".info-grid .info-card:nth-child(3) p"), pageData.parkingParagraphs);
    setText(document.querySelector(".directions-layout h2"), pageData.arrivalTitle);
    setTextList(queryAll(".directions-layout li"), pageData.arrivalList);

    var secondGridCards = queryAll("main > section:last-of-type .info-card");

    if (secondGridCards[0]) {
      setText(secondGridCards[0].querySelector("h2"), pageData.cardTitles[3]);
      setTextList(queryAll("main > section:last-of-type .info-card:first-child p"), pageData.hoursParagraphs);
    }

    if (secondGridCards[1]) {
      setText(secondGridCards[1].querySelector("h2"), pageData.cardTitles[4]);
      var contactParagraphs = queryAll("main > section:last-of-type .info-card:nth-child(2) p");
      if (contactParagraphs[0]) {
        contactParagraphs[0].childNodes[0].textContent = pageData.contactParagraphs[0] + " ";
      }
      if (contactParagraphs[1]) {
        contactParagraphs[1].childNodes[0].textContent = pageData.contactParagraphs[1] + " ";
      }
      setText(document.querySelector(".quick-action-group a.button-secondary"), pageData.actionButtons[3]);
    }
  }

  function applyGuideLanguage(lang) {
    var pageData = translations[lang].pages.guide;
    setTextList(queryAll("main .section-label"), pageData.sectionLabels);
    setText(document.querySelector(".guide-hero h1"), pageData.pageTitle);
    setText(document.querySelector(".guide-hero .section-heading p:last-child"), pageData.intro);
    setText(document.querySelector(".policy-highlight__title"), pageData.quickTitle);
    setTextList(queryAll(".policy-highlight__list li"), pageData.quickList);
    setTextList(queryAll(".guide-card h2"), pageData.cardTitles);
    queryAll(".guide-card").forEach(function (card, index) {
      setTextList(card.querySelectorAll("li"), pageData.cardLists[index]);
    });
  }

  function applyFaqLanguage(lang) {
    var pageData = translations[lang].pages.faq;
    setTextList(queryAll("main .section-label"), pageData.sectionLabels);
    setText(document.querySelector(".section-heading--center h1"), pageData.pageTitle);
    setText(document.querySelector(".section-heading--center p:last-child"), pageData.intro);
    setTextList(queryAll(".faq-item summary"), pageData.questions);
    setTextList(queryAll(".faq-item p"), pageData.answers);
    setText(document.querySelector(".cta-card h2"), pageData.ctaTitle);
    setText(document.querySelector(".cta-card p:last-of-type"), pageData.ctaDescription);
    setTextList(queryAll(".cta-card .button-group a"), pageData.ctaButtons);
  }

  function applyLanguage(lang) {
    var selectedLanguage = supportedLanguages.indexOf(lang) > -1 ? lang : "ko";
    currentLanguage = selectedLanguage;

    applyCommonLanguage(selectedLanguage);

    if (page === "index") {
      applyIndexLanguage(selectedLanguage);
    }

    if (page === "booking") {
      applyBookingLanguage(selectedLanguage);
    }

    if (page === "directions") {
      applyDirectionsLanguage(selectedLanguage);
    }

    if (page === "guide") {
      applyGuideLanguage(selectedLanguage);
    }

    if (page === "faq") {
      applyFaqLanguage(selectedLanguage);
    }

    if (languageSelect) {
      languageSelect.value = selectedLanguage;
    }

    setMenuState(false);
  }

  if (menuToggle && navigation) {
    setMenuState(false);

    menuToggle.addEventListener("click", function () {
      var isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isExpanded);
    });

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 980) {
          closeMenu();
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (window.innerWidth >= 980) {
        return;
      }

      if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 980) {
        closeMenu();
      }
    });
  }

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      copyText(button);
    });
  });

  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      var selected = languageSelect.value;
      if (supportedLanguages.indexOf(selected) === -1) {
        selected = "ko";
      }

      localStorage.setItem(storageKey, selected);
      applyLanguage(selected);
    });
  }

  if (futureLanguages.length) {
    body.setAttribute("data-future-languages", futureLanguages.join(","));
  }

  applyLanguage(localStorage.getItem(storageKey) || "ko");
});
