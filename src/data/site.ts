import productClassic from "@/assets/product-classic.jpg.asset.json";
import productMaternity from "@/assets/product-maternity.jpg.asset.json";
import productBaby from "@/assets/product-baby.jpg.asset.json";
import productRecollection from "@/assets/product-recollection.jpg.asset.json";
import productSdc from "@/assets/product-sdc.jpg.asset.json";
import productKakitannin from "@/assets/product-kakitannin-v2.jpg.asset.json";
import productPureCollagen from "@/assets/product-pure-collagen-v2.jpg.asset.json";

export type Product = {
  slug: string;
  name: string;
  sub: string;
  image: string;
  summary: string;
  body: string[];
  /** 상세 페이지 하단에 추가로 보여줄 이미지 */
  detailImages?: string[];
  /** "바로 구매하기" 외부 스토어 링크 */
  buyUrl?: string;
};



export const products: Product[] = [
  {
    slug: "junco-classic",
    name: "JUNCO CLASSIC SOAP",
    sub: "준코 클래식 소프",
    image: productClassic.url,
    summary:
      "1995년 출시 이후 사랑받아 온 최고급 수제 세안 미용비누로, '일본 제일의 비누 장인'이라 불리는 이시노 에이이치(石野栄一)의 가장 대표적인 작품입니다.",
    body: [
      "JUNCO CLASSIC은 세안과 동시에 비누에 담긴 미용 성분이 피부를 촉촉하게 감싸주는 이상적인 세안 비누입니다.",
      "민감한 피부부터 피부 나이가 신경 쓰이는 분까지, 폭넓은 연령대의 여성들에게 꾸준한 지지를 받아왔습니다.",
      "1000여 종의 한방 식물 중 엄선한 식물 추출물을 배합하고, 아시아인의 피부에 맞추어 개발한 획기적인 미용비누입니다.",
    ],
  },
  {
    slug: "junco-classic-clear-kakitannin",
    name: "JUNCO CLASSIC Clear Kakitannin",
    sub: "클리어 카키타닌",
    image: productKakitannin.url,
    buyUrl: "https://eisoap.com/shop/JUNCO%20CLASSIC%20Clear%20Kakitannin",
    summary:
      "자연에서 찾은 개운함! 일본 전통 장인의 손길로 만든 감탄닌(Persimmon) 프리미엄 보디 비누. 감 추출물의 소취 특성에 주목해 땀과 체취가 신경 쓰이는 일상의 보디 케어를 제안하며, 피부의 피지와 노폐물을 깨끗하게 씻어냅니다.",
    body: [
      "감 추출물(감 탄닌)의 깨끗한 세정력 — 감 탄닌 원료의 소취 특성과 비누의 세정 작용으로 땀과 체취가 신경 쓰이는 보디 케어를 생각했습니다. 원료 특성이 완제품의 탈취율이나 지속시간을 보장하지는 않습니다.",
      "일본 전통 수제 제조 방식 — 일본의 전통 비누 제조 기법으로 정성껏 만들고, 밀도 높은 풍성한 거품과 매일의 사용감을 생각했습니다.",
      "매일매일 부담 없는 데일리 보디 케어 — 샤워망(거품망)이 함께 구성되어 있어 거품이 잘 나며, 매일매일 샤워할 때 피부를 촉촉하고 매끄럽게 유지해 줍니다.",
    ],
  },
  {
    slug: "junco-classic-pure-collagen",
    name: "JUNCO CLASSIC Pure Collagen",
    sub: "준코 클래식 퓨어 콜라겐",
    image: productPureCollagen.url,
    buyUrl: "https://eisoap.com/shop/JUNCO%20CLASSIC%20Pure%20Collagen",
    summary:
      "비누 1개(100g)당 가수분해 콜라겐 5,000mg과 코엔자임 Q10을 담아, 세안 후의 촉촉한 마무리를 생각한 고보습 수제 세안비누입니다. 배합량은 공급사 제공 자료 기준입니다.",
    body: [
      "가수분해 콜라겐 배합 — 공급사 자료 기준 비누 1개(100g)당 5,000mg을 담았습니다. 피부 표면의 수분 유지와 부드러운 사용감을 생각한 보습 원료입니다.",
      "코엔자임 Q10 함유 — 항산화 특성으로 알려진 미용 원료를 배합했습니다. 원료의 특성이 완제품의 탄력·항산화 효과를 보장하지는 않습니다.",
      "밀도 높은 거품 — 동봉된 거품망으로 조밀한 거품을 만들어 피부의 피지와 노폐물을 부드럽게 씻어냅니다. 거품 팩 세안 후에는 미온수로 충분히 헹궈 주세요.",
      "전통 와쿠네리 제법 — 공급사 설명에 따르면 90일 이상 숙성·건조합니다. 미용 성분을 최대 30~40%까지 배합할 수 있다는 제법 설명은 완제품의 실제 배합률을 뜻하지 않습니다.",
    ],
  },

  {
    slug: "junco-classic-maternity",
    name: "JUNCO CLASSIC MATERNITY",
    sub: "준코 클래식 마터니티",
    image: productMaternity.url,
    buyUrl: "https://eisoap.com/shop/junco-classic-maternity-115g",
    summary:
      "JUNCO CLASSIC BABY를 기반으로 개발한, 민감성 피부나 피부가 약한 분을 위한 115g 고급 비누입니다. 로열젤리 추출물, 가수분해 콘키올린, 프로폴리스 추출물의 보습 성분을 담았습니다.",
    body: [
      "향료·색소·방부제를 일절 포함하지 않은 순천연·무첨가 제품입니다.",
      "로열젤리 추출물, 가수분해 콘키올린, 프로폴리스 추출물의 보습 성분을 배합했습니다.",
      "얼굴뿐 아니라 전신에 사용 가능하며, 이중 세안으로 메이크업 잔여물도 씻어낼 수 있습니다.",
      "임신 중이거나 출산 후의 여성, 피부가 약한 분께 추천합니다.",
    ],
  },
  {
    slug: "junco-classic-baby",
    name: "JUNCO CLASSIC BABY",
    sub: "준코 클래식 베이비",
    image: productBaby.url,
    buyUrl: "https://eisoap.com/shop/junco-classic-baby-100g",
    summary:
      "아기와 피부가 약한 분을 위해 개발한 무자극 투명 비누입니다.",
    body: [
      "순천연, 무첨가로 피부에 순하며 입이나 눈에 들어가도 무해하고 자극이 없습니다.",
      "아기는 물론 피부가 약한 분도 안심하고 사용하실 수 있습니다.",
    ],
  },
  {
    slug: "junco-classic-recollection",
    name: "JUNCO CLASSIC RECOLLECTION",
    sub: "준코 클래식 리컬렉션",
    image: productRecollection.url,
    buyUrl: "https://eisoap.com/shop/recollection-100g",
    summary:
      "70년 전 고급 투명비누의 그 시절 은은하고 달콤한 향이 감도는 순천연 한방 식물 고급 투명 세안비누입니다.",
    body: [
      "뛰어난 세정력을 지니면서도 가수분해 콜라겐, 스쿠알란, 미배아유 등을 배합했습니다.",
      "더 높은 보습력으로 맑고 고운 피부로 가꾸어 줍니다.",
    ],
  },
  {
    slug: "sdc-beauty-soap",
    name: "SDC BEAUTY SOAP",
    sub: "에스디씨 뷰티 소프",
    image: productSdc.url,
    summary:
      "뛰어난 세정력과 함께 높은 보습력을 실현한, 폭넓은 연령층에서 높은 평가를 받아 온 '환상의 제품'입니다.",
    body: [
      "가수분해 콜라겐, 스쿠알란, 미배아유의 보습 성분과 스테아린산 수크로스의 에몰리언트 성분을 배합했습니다.",
      "더 높은 보습력으로 건강하고 아름다운 피부를 만들어 줍니다.",
    ],
  },
];

export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  /** 공지에 넣을 사진 URL. 없으면 EI 마크가 표시됩니다. */
  image?: string;
};

export const news: NewsItem[] = [
  {
    title: "JUNCO CLASSIC 100g 재입고 안내",
    date: "2023년 12월 29일",
    excerpt:
      "언제나 EI 제품을 애용해 주셔서 진심으로 감사드립니다. 일부 상품의 품절이 이어져 큰 불편을 드린 점 깊이 사과드립니다.",
  },
  {
    title: "JUNCO CLASSIC 100g 입고 안내",
    date: "2023년 12월 19일",
    excerpt:
      "기다려 주신 EI JUNCO CLASSIC 100g 제품이 입고되었습니다. 많은 이용 부탁드립니다.",
  },
  {
    title: "홈페이지를 새단장했습니다.",
    date: "2023년 8월 12일",
    excerpt: "EI 한국 공식 홈페이지를 새롭게 열었습니다.",
  },
];

export const contact = {
  phone: "070-4517-0773",
  hours: "접수 시간: 10:00 ~ 17:00 (토·일·공휴일 및 연말연시 제외)",
};
