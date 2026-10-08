import snow from "@/assets/maternity-snow.jpg.asset.json";
import craft from "@/assets/maternity-craft.jpg.asset.json";
import packaging from "@/assets/maternity-package.jpg.asset.json";
import royalJelly from "@/assets/maternity-royal-jelly.jpg.asset.json";
import propolis from "@/assets/maternity-propolis.jpg.asset.json";
import conchiolin from "@/assets/maternity-conchiolin.jpg.asset.json";
import original from "@/assets/maternity-original.jpg.asset.json";
import pointFoam from "@/assets/maternity-point-foam.jpg.asset.json";
import pointPlantOils from "@/assets/maternity-point-plant-oils.jpg.asset.json";
import pointWakuneri from "@/assets/maternity-point-wakuneri.jpg.asset.json";
import pointPurified from "@/assets/maternity-point-purified.jpg.asset.json";
import pointRitual from "@/assets/maternity-point-ritual.jpg.asset.json";
import { StickyHighlight } from "@/components/scroll-highlight";

const points = [
  {
    no: "01",
    image: pointFoam.url,
    title: "쫀쫀하고 촘촘한 크리미 거품",
    text: "거품망에 문지르면 풍성하고 부드러운 생크림 같은 거품이 만들어집니다. 거품을 얼굴에 올려 가볍게 마사지하듯 세안하세요.",
  },
  {
    no: "02",
    image: pointPlantOils.url,
    title: "식물성 오일로 만든 비누 베이스",
    text: "9가지 식물성 오일 유래 지방산과 해수 유래 가성소다로 만든 식물성 비누 베이스를 사용했습니다. 공급사 자료 기준 pH 8의 약알칼리성으로 부드럽게 세정합니다.",
    note: "※ pH 값은 공급사 제공 자료 기준입니다.",
  },
  {
    no: "03",
    image: pointWakuneri.url,
    title: "와쿠네리(枠練り) 제법 · 90일 숙성",
    text: "비누 반죽을 틀에 넣어 서서히 열을 가하고 자연 냉각·자연 건조하는 일본 전통 방식입니다. 약 90일간 숙성시켜 단단하고 오래 쓰기 좋은 비누로 완성합니다.",
  },
  {
    no: "04",
    image: pointPurified.url,
    title: "정제수로 완성한 깨끗한 베이스",
    text: "제조 과정에서 역삼투압(RO) 필터 방식으로 정제한 물을 사용합니다.",
    note: "※ 공급사 제공 자료 기준입니다.",
  },
  {
    no: "05",
    image: pointRitual.url,
    title: "한 개로 즐기는 올인원 세안",
    text: "얼굴 세안은 물론 거품을 올려 두는 거품 팩, 바디 세정까지. 115g 한 개로 하루 2회 사용 시 약 4개월간 쓸 수 있어요.",
    note: "※ 사용 기간은 사용량·환경에 따라 달라질 수 있습니다.",
  },
];

export function MaternityDetail() {
  return (
    <div className="maternity-detail -mx-4 text-foreground">
      <section className="bg-detail-paper">
        <img src={snow.url} alt="진주빛 마터니티 비누의 하트 각인" width={800} height={800} className="mx-auto w-full max-w-[800px]" loading="lazy" />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
          <p className="text-xs text-primary">EIICHI ISHINO · JUNCO CLASSIC</p>
          <h2 className="mt-5 text-3xl leading-relaxed sm:text-4xl">준코 클래식 마터니티</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">민감한 피부를 생각한, 진주빛 데일리 세안</p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 border-y border-border py-5 text-sm"><span>115g</span><span>Made in Japan</span><span>향료 무첨가</span><span>색소 무첨가</span><span>방부제 무첨가</span></div>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-start gap-10 lg:grid-cols-2">
          <div data-reveal-managed>
            <StickyHighlight eyebrow="FOR YOUR SKIN" title="순수하게, 부드럽게" lines={["피부가 민감해지는 순간에도,", "매일의 세안은 편안할 수 있도록.", "로열젤리 추출물, 가수분해 콘키올린,", "프로폴리스 추출물의 보습 성분으로", "피부를 건강하게 유지해 줍니다."]} />
          </div>
          <img src={original.url} alt="마터니티 비누 원본 제품 사진" width={768} height={768} className="w-full lg:sticky lg:top-32" loading="lazy" />
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-primary">WHY ISHINO SOAP</p>
          <h2 className="mt-4 text-center text-2xl sm:text-3xl">이시노 비누가 특별한 이유</h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">제조 방식부터 원료까지, 5가지 포인트</p>
          <div className="mt-14 space-y-16 sm:space-y-24">{points.map((point, i) => <div key={point.no} className="grid items-center gap-8 md:grid-cols-2">
            <img src={point.image} alt={point.title} className={`aspect-square w-full rounded-sm object-cover ${i % 2 ? "md:order-2" : ""}`} loading="lazy" />
            <div>
              <p className="text-3xl font-semibold text-oxide">{point.no}</p>
              <h3 className="mt-3 text-xl leading-8 sm:text-2xl">{point.title}</h3>
              <p className="mt-5 text-[15px] leading-8 text-muted-foreground">{point.text}</p>
              {point.note && <p className="mt-3 text-xs leading-6 text-muted-foreground/80">{point.note}</p>}
            </div>
          </div>)}</div>
          <p className="mt-14 text-center text-xs leading-6 text-muted-foreground">위 내용은 공급사 제공 자료를 기준으로 작성되었습니다.</p>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-primary">KEY INGREDIENTS</p><h2 className="mt-4 text-center text-2xl sm:text-3xl">피부를 생각한 주요 보습 성분</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">{[
            [royalJelly.url, "로열젤리 추출물", "촉촉한 세안을 위한 보습 성분"],
            [conchiolin.url, "가수분해 콘키올린", "진주 유래의 보습 성분"],
            [propolis.url, "프로폴리스 추출물", "피부를 건강하게 유지하는 보습 성분"],
          ].map(([image, title, text]) => <article key={title}><img src={image} alt={title} className="aspect-[2/1] w-full object-cover" loading="lazy" /><h3 className="mt-5 text-base">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div>
          <p className="mt-8 text-center text-xs leading-6 text-muted-foreground">주요 배합 성분 안내입니다. 전성분표는 자료 등록 후 별도 안내합니다.</p>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2">
          <img src={packaging.url} alt="준코 클래식 마터니티 비누와 패키지" className="w-full" loading="lazy" />
          <div><p className="text-xs text-primary">PRODUCT INFORMATION</p><h2 className="mt-4 text-2xl">매일 만나는 115g의 순수함</h2>
            <dl className="mt-8 text-sm">{[["제품명", "JUNCO CLASSIC MATERNITY"], ["내용량", "115g"], ["제조국", "일본"], ["사용 부위", "얼굴 · 전신"], ["추천 대상", "민감성 피부, 피부가 약한 분, 임신 중이거나 출산 후의 여성"]].map(([label, value]) => <div key={label} className="grid grid-cols-[80px_1fr] gap-4 border-b border-border py-4"><dt className="text-muted-foreground">{label}</dt><dd className="leading-6">{value}</dd></div>)}</dl>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[900px] border-t border-border pt-8"><h3 className="text-base">품질 관련 안내</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">제공된 제품 자료에 따르면, 2017년 5월 9일 일본식품분석센터의 식품 안전 검사에 합격했습니다. 이는 섭취 가능 여부나 눈에 대한 안전성을 보장하는 안내가 아닙니다.</p></div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24"><div className="mx-auto max-w-[900px]">
        <p className="text-center text-xs text-primary">HOW TO USE</p><h2 className="mt-4 text-center text-2xl sm:text-3xl">매일의 부드러운 클렌징</h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-3">{[["거품 내기", "비누를 물에 적셔 충분히 거품을 내 주세요."], ["부드럽게 세안", "거품으로 얼굴과 몸을 부드럽게 씻어 주세요. 메이크업 잔여물은 이중 세안으로 마무리해 주세요."], ["헹구고 보관", "미온수로 충분히 헹군 뒤, 물기가 잘 빠지는 곳에 비누를 보관해 주세요."]].map(([title, text], i) => <li key={title} className="border-t border-border pt-5"><span className="text-2xl text-primary">0{i + 1}</span><h3 className="mt-3 text-base">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></li>)}</ol>
        <div className="mt-12 border-t border-border pt-8"><h3 className="text-sm">사용 시 주의사항</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">눈과 입에 들어가지 않도록 주의하세요. 눈에 들어간 경우 깨끗한 물로 씻어 주세요. 사용 중 자극이나 이상 증상이 나타나면 사용을 중단하고 전문가와 상담하세요. 개인에 따라 사용감은 다를 수 있습니다.</p></div>
      </div></section>
    </div>
  );
}