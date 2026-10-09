import productSet from "@/assets/classic-detail-set.png.asset.json";
import soap from "@/assets/classic-detail-soap.jpg.asset.json";
import overhead from "@/assets/classic-detail-overhead.jpg.asset.json";
import artisan from "@/assets/classic-artisan.jpg.asset.json";
import productInformation from "@/assets/classic-product-information.jpg.asset.json";
import botanicals from "@/assets/classic-botanicals-clear.jpg";

const ingredients = [
  { name: "토르말린", text: "준코 클래식의 배합에 담긴 미네랄 원료" },
  { name: "감초 추출물", text: "피부를 생각한 식물 유래 보습·유연 성분" },
  { name: "인삼 추출물", text: "촉촉한 세안을 위한 한방 식물 추출물" },
];

export function ClassicDetail() {
  return (
    <div className="-mx-4 text-foreground">
      <section className="bg-detail-paper">
        <div className="mx-auto max-w-2xl px-6 pt-16 text-center sm:pt-20">
          <p className="text-xs text-oxide">EIICHI ISHINO · SINCE 1995</p>
          <h2 className="mt-5 text-3xl leading-relaxed sm:text-4xl">JUNCO CLASSIC</h2>
          <p className="mt-4 text-lg leading-8">준코 클래식 수제 세안 미용비누</p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">시간이 지나도 변하지 않는, 촉촉한 세안의 가치.</p>
        </div>
        <img src={productSet.url} alt="준코 클래식 붉은 원형 비누와 흰색 패키지, 동봉 거품망" width={768} height={768} className="mx-auto w-full max-w-[760px]" loading="lazy" />
        <div className="mx-auto max-w-[900px] px-6 pb-16 sm:pb-20">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-y border-border py-5 text-sm"><span>1995년 출시</span><span>일본 수제 비누</span><span>30종 이상의 천연 성분*</span><span>거품망 동봉</span></div>
          <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">* 성분 배합에 관한 내용은 제공된 제품 자료 기준입니다.</p>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <img src={artisan.url} alt="준코 클래식 비누와 패키지를 든 비누 장인 이시노 에이이치" width={267} height={416} className="mx-auto w-full max-w-[320px]" loading="lazy" />
          <div>
            <p className="text-xs text-oxide">THE SIGNATURE OF A SOAP MASTER</p>
            <h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">장인의 철학을 담은<br />대표작, 준코 클래식</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted-foreground">1995년 출시 이후 사랑받아 온 최고급 수제 세안 미용비누. ‘일본 제일의 비누 장인’이라 불리는 이시노 에이이치(石野栄一)의 가장 대표적인 작품입니다.</p>
            <p className="mt-4 text-[15px] leading-8 text-muted-foreground">피부가 민감한 분부터 피부 나이가 신경 쓰이는 분까지, 폭넓은 연령대의 여성들에게 꾸준한 지지를 받아왔습니다.</p>
            <p className="mt-8 border-t border-border pt-5 text-sm text-oxide">이시노 에이이치 · EIICHI ISHINO</p>
          </div>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-oxide">CLEANSE & MOISTURIZE</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">씻어내는 순간에도,<br />피부를 촉촉하게</h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-8 text-muted-foreground">JUNCO CLASSIC은 세안과 동시에 비누에 담긴 미용 성분이 피부를 촉촉하게 감싸주는 이상적인 세안 비누입니다.</p>
          <div className="mt-12 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <img src={soap.url} alt="준코 클래식의 붉은 비누와 선명한 JUNCO CLASSIC 각인" width={600} height={600} className="aspect-square w-full object-contain" loading="lazy" />
            <div className="space-y-7">
              {[
                ["01", "깨끗하게 씻고", "매일의 세안으로 피부의 노폐물을 부드럽게 씻어냅니다."],
                ["02", "촉촉함을 감싸고", "다양한 식물 추출물과 미용 성분을 배합해 보습·유연 케어를 생각했습니다."],
                ["03", "편안한 일상으로", "곱고 탄력 있는 거품으로 하루의 클렌징을 기분 좋게 마무리합니다."],
              ].map(([number, title, text]) => <div key={number} className="border-t border-border pt-5"><p className="text-xs text-oxide">{number}</p><h3 className="mt-3 text-lg">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-oxide">BOTANICAL FORMULA</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">자연에서 고르고,<br />피부를 생각해 담다</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-8 text-muted-foreground">1000여 종의 한방 식물 중 엄선한 식물 추출물을 배합하고, 아시아인의 피부에 맞추어 개발했습니다. 토르말린을 비롯한 30종 이상의 천연 성분으로 매일의 세안에 보습과 유연함을 더합니다.</p>
          <div className="mx-auto mt-10 max-w-[900px]">
            <img src={botanicals} alt="식물 원료와 맑은 물을 선명하게 보정한 이미지" width={1600} height={812} className="hidden w-full sm:block" loading="lazy" />
            <div className="grid gap-4 sm:hidden">
              <img src={botanicals} alt="선명하게 보정한 식물 원료 사진" width={800} height={812} className="aspect-square w-full object-cover object-left" loading="lazy" />
              <img src={botanicals} alt="숲과 맑은 물 사진" width={800} height={812} className="aspect-square w-full object-cover object-right" loading="lazy" />
            </div>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">{ingredients.map((ingredient) => <article key={ingredient.name} className="border-t border-border pt-5"><h3 className="text-lg">{ingredient.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{ingredient.text}</p></article>)}</div>
          <p className="mt-8 text-xs leading-6 text-muted-foreground">주요 배합 원료에 관한 공급사 제공 안내입니다. 원료의 특성이 완제품의 효능을 보장하지 않으며, 개인에 따라 사용감은 다를 수 있습니다. 전체 성분은 전성분표 탭에서 확인해 주세요.</p>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-xs text-oxide">A SIMPLE DAILY CLEANSING RITUAL</p>
            <h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">크림처럼 고운 거품,<br />매일의 세안 리추얼</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted-foreground">동봉된 거품망을 사용하면 곱고 탄력 있는 크림 같은 거품을 만들 수 있습니다. 비누를 직접 문지르기보다 충분히 낸 거품으로 부드럽게 세안해 주세요.</p>
            <ol className="mt-8 space-y-5">{[
              ["거품 내기", "비누와 거품망에 물을 묻혀 충분히 거품을 내 주세요."],
              ["부드럽게 세안", "거품을 얼굴에 올려 가볍게 마사지하듯 씻어 주세요."],
              ["헹구고 보관", "미온수로 충분히 헹군 뒤 비누의 물기를 빼서 보관해 주세요."],
            ].map(([title, text], index) => <li key={title} className="grid grid-cols-[24px_1fr] gap-3 border-t border-border pt-4"><span className="text-sm text-oxide">0{index + 1}</span><div><h3 className="text-base">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p></div></li>)}</ol>
          </div>
          <img src={overhead.url} alt="원형 받침 위 준코 클래식 비누의 전체 모양" width={600} height={600} className="aspect-square w-full object-contain" loading="lazy" />
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2">
          <img src={productInformation.url} alt="준코 클래식 붉은 비누와 거품을 담은 제품 안내 사진" width={663} height={417} className="mx-auto w-full" loading="lazy" />
          <div>
            <p className="text-xs text-oxide">PRODUCT INFORMATION</p><h2 className="mt-4 text-2xl">준코 클래식 제품 안내</h2>
            <dl className="mt-8 text-sm">{[["제품명", "JUNCO CLASSIC SOAP"], ["브랜드", "EIICHI ISHINO"], ["출시", "1995년"], ["제조국", "일본"], ["사용 용도", "세안용 미용비누"], ["구성 안내", "비누 · 동봉 거품망"]].map(([label, value]) => <div key={label} className="grid grid-cols-[80px_1fr] gap-4 border-b border-border py-4"><dt className="text-muted-foreground">{label}</dt><dd className="break-words leading-6">{value}</dd></div>)}</dl>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[900px] space-y-7 border-t border-border pt-8">
          <div><h3 className="text-base">품질 관련 안내</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">제공된 제품 자료에 따르면, 2017년 5월 9일 일본식품분석센터의 식품 안전 검사에 합격했습니다. 이는 공급사 자료에 따른 안내이며, 비누의 섭취 가능 여부나 눈에 대한 안전성, 완제품의 미백 효능을 보장하지 않습니다.</p></div>
        </div>
      </section>
    </div>
  );
}