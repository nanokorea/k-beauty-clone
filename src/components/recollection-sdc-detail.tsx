import recollectionScene from "@/assets/product-recollection.jpg.asset.json";
import recollectionOriginal from "@/assets/store-recollection.jpg.asset.json";
import recollectionSet from "@/assets/recollection-set.jpg.asset.json";
import recollectionFoam from "@/assets/recollection-foam.jpg.asset.json";
import sdcScene from "@/assets/product-sdc.jpg.asset.json";
import sdcOriginal from "@/assets/history-sdc.jpg.asset.json";
import sdcSet from "@/assets/sdc-set.jpg.asset.json";
import sdcCloseup from "@/assets/sdc-closeup.jpg.asset.json";

type DetailContent = {
  name: string;
  korean: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  original: string;
  scene: string;
  set: string;
  closeup: string;
  storyTitle: string;
  story: string[];
  points: { title: string; text: string }[];
  closeupTitle: string;
  closeupText: string;
  distinction: string;
};

const recollection: DetailContent = {
  name: "JUNCO CLASSIC RECOLLECTION",
  korean: "준코 클래식 리컬렉션",
  eyebrow: "A SCENT TO REMEMBER",
  headline: "향기로 기억하는,\n촉촉한 세안의 순간",
  introduction: "그 시절 고급 투명비누의 은은하고 달콤한 향. 아름다운 각인과 부드러운 거품으로 매일의 세안에 작은 여유를 더합니다.",
  original: recollectionOriginal.url,
  scene: recollectionScene.url,
  set: recollectionSet.url,
  closeup: recollectionFoam.url,
  storyTitle: "오래된 기억을,\n오늘의 한 조각에",
  story: [
    "RECOLLECTION은 70년 전 고급 투명비누의 은은하고 달콤한 향을 떠올리며 만든 세안비누입니다. 이름처럼 일상 속에 남아 있는 좋은 기억과 향기의 여운을 담았습니다.",
    "장미 무늬 패키지와 섬세한 인물 각인, 빛을 머금은 붉은 비누. 세정력과 보습을 함께 생각한 한 조각으로 매일의 클렌징을 완성합니다.",
  ],
  points: [
    { title: "은은하고 달콤한 향", text: "추억 속 고급 투명비누를 떠올리는 향으로 세안하는 순간을 기분 좋게 채워 줍니다. 전성분에는 향료가 포함되어 있습니다." },
    { title: "세정과 보습의 균형", text: "가수분해 콜라겐, 스쿠알란, 쌀배아오일을 배합해 깨끗한 세정과 세안 후 부드러운 피부 감촉을 생각했습니다." },
    { title: "섬세한 투명 비누", text: "맑은 비누의 질감과 정교한 각인에 장인의 정성을 담았습니다. 곱고 풍성하게 낸 거품으로 부드럽게 씻어 주세요." },
  ],
  closeupTitle: "풍성한 거품에 담긴,\n부드러운 마무리",
  closeupText: "가볍고 풍성한 거품으로 피부의 피지와 노폐물을 씻어냅니다. 비누를 직접 문지르기보다 충분히 거품을 낸 뒤, 손에 덜어 부드럽게 세안해 주세요.",
  distinction: "은은하고 달콤한 향의 투명 세안비누",
};

const sdc: DetailContent = {
  name: "SDC BEAUTY SOAP",
  korean: "에스디씨 뷰티 소프",
  eyebrow: "THE BEAUTY OF BALANCE",
  headline: "깨끗하게 씻고,\n촉촉함을 생각하다",
  introduction: "뛰어난 세정력과 높은 보습력의 조화. 오랫동안 폭넓은 연령층의 사랑을 받아 온 SDC의 투명 미용비누입니다.",
  original: sdcOriginal.url,
  scene: sdcScene.url,
  set: sdcSet.url,
  closeup: sdcCloseup.url,
  storyTitle: "기본에 충실한,\n미용비누의 아름다움",
  story: [
    "SDC BEAUTY SOAP은 뛰어난 세정력과 함께 높은 보습력을 실현한 제품으로, 폭넓은 연령층에서 높은 평가를 받아 온 ‘환상의 제품’입니다.",
    "가수분해 콜라겐, 스쿠알란, 쌀배아오일의 보습 성분과 수크로오스스테아레이트의 피부 유연 성분을 배합했습니다. 매일의 세안에서 깨끗함과 부드러움을 함께 생각합니다.",
  ],
  points: [
    { title: "깨끗한 매일의 세정", text: "충분히 낸 거품으로 피부 표면의 피지와 노폐물을 부드럽게 씻어내는 투명 고형 세안비누입니다." },
    { title: "보습 성분의 조화", text: "가수분해 콜라겐, 스쿠알란, 쌀배아오일에 글리세린과 수크로오스를 더해 세안 후의 촉촉한 감촉을 생각했습니다." },
    { title: "부드러운 피부 감촉", text: "수크로오스스테아레이트는 피부를 부드럽게 하는 유연 성분입니다. 세정만이 아니라 세안 후의 마무리까지 고려했습니다." },
  ],
  closeupTitle: "맑은 비누,\n섬세한 장인의 손길",
  closeupText: "빛을 머금은 투명한 비누에 아름다운 인물 각인을 새겼습니다. 매일 사용하는 한 조각의 질감과 모양에도, 오래 이어 온 비누 만들기의 정성을 담았습니다.",
  distinction: "세정력과 보습의 균형을 생각한 투명 세안비누",
};

const moisturizingIngredients = [
  ["HYDROLYZED COLLAGEN", "가수분해 콜라겐", "피부의 수분 유지와 부드러운 감촉을 위한 보습 성분"],
  ["SQUALANE", "스쿠알란", "피부를 유연하게 가꾸는 보습 성분"],
  ["RICE GERM OIL", "쌀배아오일", "쌀의 배아에서 얻은 오일로 피부 유연 성분"],
];

function HeritageSoapDetail({ content }: { content: DetailContent }) {
  return <div className="-mx-4 text-foreground">
    <section className="bg-detail-paper">
      <img src={content.original} alt={`${content.korean} 비누와 패키지 원본 사진`} className="mx-auto h-auto w-full max-w-[1000px]" loading="lazy" />
      <div className="mx-auto max-w-2xl px-6 py-14 text-center sm:py-20">
        <p className="text-xs text-oxide">{content.eyebrow}</p>
        <h2 className="mt-5 text-3xl leading-relaxed sm:text-4xl">{content.korean}</h2>
        <p className="mt-5 whitespace-pre-line text-xl leading-9 sm:text-2xl">{content.headline}</p>
        <p className="mt-6 text-[15px] leading-8 text-muted-foreground">{content.introduction}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 border-y border-border py-5 text-sm"><span>100g</span><span>Made in Japan</span><span>투명 세안비누</span></div>
      </div>
    </section>

    <section className="bg-detail-blush px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-[950px] items-center gap-10 md:grid-cols-2">
        <img src={content.scene} alt={`${content.korean}의 각인과 투명한 질감을 보여주는 제품 사진`} width={1024} height={683} className="w-full" loading="lazy" />
        <div><p className="text-xs text-oxide">THE SOAP STORY</p><h2 className="mt-4 whitespace-pre-line text-2xl leading-relaxed sm:text-3xl">{content.storyTitle}</h2>{content.story.map((paragraph) => <p key={paragraph} className="mt-5 text-[15px] leading-8 text-muted-foreground">{paragraph}</p>)}</div>
      </div>
      <ol className="mx-auto mt-14 grid max-w-[950px] gap-8 md:grid-cols-3">{content.points.map((point, index) => <li key={point.title} className="border-t border-border pt-6"><span className="text-2xl text-oxide">0{index + 1}</span><h3 className="mt-4 text-lg leading-7">{point.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{point.text}</p></li>)}</ol>
    </section>

    <section className="bg-detail-paper px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[950px]"><p className="text-center text-xs text-oxide">MOISTURIZING INGREDIENTS</p><h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">피부를 생각한 주요 보습 성분</h2>
        <dl className="mt-12 divide-y divide-border border-y border-border">{moisturizingIngredients.map(([english, korean, text]) => <div key={english} className="grid gap-4 py-7 sm:grid-cols-[1fr_1.2fr]"><dt><span className="block text-xs text-oxide">{english}</span><span className="mt-2 block text-xl font-medium">{korean}</span></dt><dd className="self-center text-sm leading-7 text-muted-foreground">{text}</dd></div>)}</dl>
      </div>
    </section>

    <section className="bg-detail-blush">
      <div className="mx-auto grid max-w-[1000px] items-center md:grid-cols-2"><img src={content.closeup} alt={content === recollection ? "풍성한 거품 위에 놓인 리컬렉션 비누" : "SDC 뷰티 소프의 투명한 질감과 인물 각인 확대 사진"} className="h-auto w-full" loading="lazy" /><div className="px-6 py-12 md:px-10"><p className="text-xs text-oxide">{content === recollection ? "SOFT LATHER" : "CRAFTED WITH CARE"}</p><h2 className="mt-4 whitespace-pre-line text-2xl leading-relaxed sm:text-3xl">{content.closeupTitle}</h2><p className="mt-5 text-[15px] leading-8 text-muted-foreground">{content.closeupText}</p></div></div>
    </section>

    <section className="bg-detail-paper px-6 py-16 sm:py-24"><div className="mx-auto grid max-w-[950px] items-center gap-10 md:grid-cols-2"><img src={content.set} alt={`${content.korean} 비누, 패키지와 거품망 구성 사진`} className="h-auto w-full" loading="lazy" /><div><p className="text-xs text-oxide">PRODUCT INFORMATION</p><h2 className="mt-4 text-2xl">제품 안내</h2><dl className="mt-7 text-sm">{[["제품명", content.name], ["내용량", "100g"], ["제조국", "일본"], ["제품 형태", "투명 고형 비누"], ["사용 부위", "얼굴 세안"], ["제품 특징", content.distinction]].map(([label, value]) => <div key={label} className="grid grid-cols-[72px_1fr] gap-4 border-b border-border py-4"><dt className="text-muted-foreground">{label}</dt><dd className="break-words leading-6">{value}</dd></div>)}</dl></div></div></section>

    <section className="bg-detail-blush px-6 py-16 sm:py-20"><div className="mx-auto max-w-[950px]"><p className="text-center text-xs text-oxide">A SIMPLE DAILY RITUAL</p><h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">매일의 세안, 세 가지 순서</h2><ol className="mt-10 grid gap-8 sm:grid-cols-3">{[["충분히 거품 내기", "비누와 거품망을 물에 적신 뒤 가볍게 문질러 풍성한 거품을 만들어 주세요."], ["부드럽게 세안하기", "손에 덜어낸 거품으로 피부를 부드럽게 씻고 미온수로 충분히 헹궈 주세요."], ["물기를 빼고 보관하기", "사용한 비누는 물기가 잘 빠지는 비누 받침에 놓아 건조해 주세요."]].map(([title, text], index) => <li key={title} className="border-t border-border pt-5"><span className="text-2xl text-oxide">0{index + 1}</span><h3 className="mt-4 text-base leading-7">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></li>)}</ol></div></section>
  </div>;
}

export function RecollectionDetail() { return <HeritageSoapDetail content={recollection} />; }
export function SdcDetail() { return <HeritageSoapDetail content={sdc} />; }