import hero from "@/assets/pure-collagen-hero-clean.jpg";
import scene from "@/assets/pure-collagen-scene.jpg.asset.json";
import productSet from "@/assets/pure-collagen-set.jpg.asset.json";
import sorbitol from "@/assets/pure-collagen-sorbitol.jpg.asset.json";
import olive from "@/assets/pure-collagen-olive.jpg.asset.json";
import squalane from "@/assets/pure-collagen-squalane.jpg.asset.json";
import q10 from "@/assets/pure-collagen-q10.jpg.asset.json";
import wet from "@/assets/pure-collagen-step-wet.jpg.asset.json";
import foam from "@/assets/pure-collagen-step-foam.jpg.asset.json";
import remove from "@/assets/pure-collagen-step-remove.jpg.asset.json";
import wash from "@/assets/pure-collagen-step-wash.jpg.asset.json";
import first from "@/assets/pure-collagen-generation-one.jpg.asset.json";
import second from "@/assets/pure-collagen-generation-two.jpg.asset.json";
import third from "@/assets/pure-collagen-generation-three.jpg.asset.json";

const ingredients = [
  { name: "소르비톨", english: "SORBITOL", image: sorbitol.url, text: "수분을 끌어당기는 보습 원료" },
  { name: "올리브 열매 오일", english: "OLIVE FRUIT OIL", image: olive.url, text: "부드러운 사용감을 위한 식물 유래 오일" },
  { name: "스쿠알란", english: "SQUALANE", image: squalane.url, text: "피부의 유연함을 생각한 에몰리언트 성분" },
  { name: "코엔자임 Q10", english: "COENZYME Q10", image: q10.url, text: "항산화 특성으로 알려진 미용 원료" },
];
const steps = [
  { title: "물에 적시기", image: wet.url, text: "비누와 동봉된 거품망에 물을 충분히 묻혀 주세요." },
  { title: "풍성하게 거품 내기", image: foam.url, text: "거품망으로 비누를 가볍게 문질러 조밀한 거품을 만들어 주세요." },
  { title: "거품만 모으기", image: remove.url, text: "비누를 꺼낸 뒤 거품망의 거품을 손에 모아 주세요." },
  { title: "부드럽게 세안하기", image: wash.url, text: "거품을 얼굴에 올려 부드럽게 씻고, 미온수로 충분히 헹궈 주세요." },
];

export function PureCollagenDetail() {
  return (
    <div className="-mx-4 text-foreground">
      <section className="bg-detail-paper">
        <div className="mx-auto max-w-2xl px-6 pt-16 text-center sm:pt-20">
          <p className="text-xs text-oxide">JUNCO CLASSIC · PURE COLLAGEN</p>
          <h2 className="mt-5 text-3xl leading-relaxed sm:text-4xl">준코 클래식 퓨어 콜라겐</h2>
          <p className="mt-5 text-lg leading-8">씻어낸 뒤에도 생각하는,<br />피부의 촉촉함</p>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground">가수분해 콜라겐과 코엔자임 Q10을 담은<br className="hidden sm:block" /> 100g 고보습 수제 세안비누.</p>
        </div>
        <img src={hero} alt="진주와 유리 받침 위 퓨어 콜라겐 비누의 선명한 각인" width={1254} height={1254} className="mx-auto mt-8 w-full max-w-[800px]" loading="lazy" />
        <div className="mx-auto max-w-[900px] px-6 py-12">
          <dl className="grid grid-cols-3 gap-3 border-y border-border py-6 text-center">
            {[['100g', '비누 1개'], ['5,000mg', '가수분해 콜라겐'], ['Q10', '코엔자임']].map(([value, label]) => <div key={value}><dt className="text-xl font-semibold text-oxide sm:text-3xl">{value}</dt><dd className="mt-3 text-xs leading-6 sm:text-sm">{label}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1000px] items-center gap-10 md:grid-cols-2 md:gap-14">
          <img src={scene.url} alt="퓨어 콜라겐 비누와 흰색 패키지, 거품망" width={1086} height={634} className="w-full" loading="lazy" />
          <div>
            <p className="text-xs text-oxide">HYDROLYZED COLLAGEN · 5,000mg</p>
            <h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">한 조각에 담은<br />콜라겐 보습 케어</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted-foreground">비누 1개(100g)당 가수분해 콜라겐 5,000mg을 배합했습니다. 가수분해 콜라겐은 콜라겐을 작은 단위로 분해한 보습 원료로, 피부 표면의 수분 유지와 부드러운 사용감을 생각한 성분입니다.</p>
            <p className="mt-4 text-[15px] leading-8 text-muted-foreground">코엔자임 Q10도 함께 담아, 깨끗하게 씻는 순간과 세안 후의 촉촉한 마무리를 모두 생각했습니다.</p>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">원료의 특성에 관한 설명이며, 씻어내는 비누가 피부 속 콜라겐을 보충하거나 완제품의 탄력·항산화 효과를 보장한다는 의미는 아닙니다. 사용감은 개인에 따라 다를 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-center text-xs text-oxide">MOISTURE IN THE FORMULA</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">피부를 생각해 담은<br />미용·보습 성분</h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-8 text-muted-foreground">콜라겐의 보습에 부드러운 오일과 미용 원료를 더해, 매일의 세안을 편안한 시간으로 만듭니다.</p>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {ingredients.map((item) => <article key={item.name}><img src={item.image} alt={`${item.name} 원료 연출 사진`} width={374} height={241} className="aspect-[3/2] w-full object-cover" loading="lazy" /><p className="mt-5 text-[10px] text-oxide">{item.english}</p><h3 className="mt-2 text-base sm:text-lg">{item.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-center text-xs text-oxide">A DENSE & CREAMY FOAM</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">쫀쫀한 거품으로,<br />부드러운 세안 리추얼</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-8 text-muted-foreground">동봉된 거품망으로 풍성하고 조밀한 거품을 만들어 보세요. 거품을 얼굴에 올리는 ‘거품 팩 세안’으로 피부의 피지와 노폐물을 부드럽게 씻어냅니다. 오래 올려두기보다 세안 후 충분히 헹궈 주세요.</p>
          <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => <li key={step.title}><img src={step.image} alt={`퓨어 콜라겐 세안법 ${i + 1}: ${step.title}`} width={570} height={322} className="aspect-[3/2] w-full object-cover" loading="lazy" /><p className="mt-5 text-sm text-oxide">0{i + 1}</p><h3 className="mt-2 text-lg">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p></li>)}
          </ol>
          <p className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">거품망은 거품을 내는 용도로 사용하고 얼굴에 직접 문지르지 않습니다. 사용 후에는 비누와 거품망의 물기를 빼고 건조한 곳에 보관해 주세요.</p>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-oxide">THREE GENERATIONS · ONE PURPOSE</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">시간과 정성으로 완성하는<br />전통 와쿠네리 제법</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-8 text-muted-foreground">1930년부터 이어진 삼대의 비누 만들기. 비누 장인 이시노 에이이치의 전통 틀 제조법으로, 한 조각을 만들기까지 충분한 숙성과 건조의 시간을 기다립니다.</p>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6">{[[first.url,'1대 · 시작'],[second.url,'2대 · 이시노 에이이치'],[third.url,'3대 · 계승']].map(([image,label]) => <figure key={label}><img src={image} alt={label} width={240} height={317} className="aspect-[3/4] w-full object-cover" loading="lazy" /><figcaption className="mt-4 text-center text-xs leading-6 sm:text-sm">{label}</figcaption></figure>)}</div>
          <div className="mt-12 grid gap-8 border-y border-border py-8 sm:grid-cols-2"><div><p className="text-3xl font-semibold text-oxide">90일 이상</p><h3 className="mt-3 text-lg">충분한 숙성·건조</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">90일 이상 숙성·건조하여 밀도 높고 단단한 비누로 완성합니다.</p></div><div><p className="text-3xl font-semibold text-oxide">30~40%</p><h3 className="mt-3 text-lg">미용 성분을 담는 제법</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">전통 틀 제조법으로 미용 성분을 넉넉히 담아 완성합니다.</p></div></div>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-center text-xs text-oxide">PRODUCT INFORMATION</p>
          <h2 className="mt-4 text-center text-2xl sm:text-3xl">퓨어 콜라겐 제품 안내</h2>
          <img src={productSet.url} alt="퓨어 콜라겐 원형 비누, 제품 상자와 동봉 거품망 구성" width={1137} height={557} className="mt-10 w-full" loading="lazy" />
          <dl className="mx-auto mt-8 max-w-[760px] text-sm">{[['제품명','JUNCO CLASSIC Pure Collagen'],['내용량','100g · 비누 1개'],['주요 배합','가수분해 콜라겐 5,000mg · 코엔자임 Q10'],['제조국','일본'],['용도','세안용 미용비누'],['구성','비누 · 제품 상자 · 거품망']].map(([label,value]) => <div key={label} className="grid grid-cols-[76px_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[100px_1fr]"><dt className="text-muted-foreground">{label}</dt><dd className="break-words leading-6">{value}</dd></div>)}</dl>
        </div>
      </section>
    </div>
  );
}