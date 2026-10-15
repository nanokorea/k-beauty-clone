import main from "@/assets/kakitannin-main.png.asset.json";
import scene from "@/assets/kakitannin-scene.jpg.asset.json";
import botanicals from "@/assets/kakitannin-botanicals.jpg.asset.json";
import foam from "@/assets/kakitannin-foam.jpg.asset.json";
import rinse from "@/assets/kakitannin-rinse.jpg.asset.json";
import pancilHero from "@/assets/kakitannin-pancil-hero.jpg.asset.json";
import pancilPeople from "@/assets/kakitannin-pancil-people.jpg.asset.json";
import wet from "@/assets/kakitannin-step-wet.jpg.asset.json";
import lather from "@/assets/kakitannin-step-foam.jpg.asset.json";
import remove from "@/assets/kakitannin-step-remove.jpg.asset.json";
import wash from "@/assets/kakitannin-step-wash.jpg.asset.json";
import set from "@/assets/kakitannin-set.jpg.asset.json";

const odorCare = [
  ["01", "땀 자체보다, 피부에 남은 원인", "땀은 대부분 물로 이루어져 있지만, 피부에 남은 땀·피지 등이 피부의 미생물에 의해 분해되면서 냄새가 생길 수 있습니다. 운동 후나 더운 날의 샤워는 냄새의 원인이 되는 잔여물을 씻어내는 데 중요합니다."],
  ["02", "감 탄닌이 냄새를 만나는 방식", "감의 떫은맛을 내는 탄닌은 폴리페놀의 한 종류입니다. 감 탄닌 원료에 관한 연구에서는 일부 냄새 성분과 결합하거나 상호작용해 냄새를 줄이는 특성이 보고되어 있습니다. 향으로 냄새를 덮는 것과는 다른, 원료의 소취 특성에 주목한 접근입니다."],
  ["03", "거품으로 씻고, 물로 헹구는 개운함", "비누의 거품은 피부에 남은 피지와 노폐물을 물과 함께 씻어내도록 돕습니다. 감 추출물을 배합한 클리어 카키타닌은 이러한 세정 과정으로 땀과 체취가 신경 쓰이는 일상의 목욕 케어를 제안합니다."],
];

const pancilMechanism = [
  ["1", "페놀성 수산기(-OH)의 강력한 결합력", "감 탄닌 속 무수한 -OH 기가 악취 유발 성분과 즉각적으로 화학 결합을 형성합니다."],
  ["2", "근본적인 악취 화학 중화", "냄새 성분을 캡처하고 변형시켜, 악취가 발생하지 않는 안정된 상태로 바꿉니다."],
  ["3", "지속적인 억제력", "모공 주변의 피지 산화를 방지하고 유해균 증식을 억제해 상쾌함이 오랫동안 유지되도록 돕습니다."],
];

const pancilOdors = [
  ["2-노네날", "2-Nonenal", "40대 이후 발생하는 노화 체취, 묵은 냄새를 케어합니다."],
  ["이소발레르산", "Isovaleric Acid", "땀 냄새와 발 냄새의 원인 물질을 중화합니다."],
  ["암모니아 · 트리메틸아민", "Ammonia / Trimethylamine", "알칼리성 악취와 땀 냄새 원인 분자를 케어합니다."],
  ["아세트알데히드", "Acetaldehyde", "담배 냄새와 숙취 관련 체취를 케어합니다."],
];

const steps = [
  { image: wet.url, title: "거품망 적시기", text: "거품망과 비누를 물에 충분히 적셔 주세요." },
  { image: lather.url, title: "풍성하게 거품 내기", text: "거품망 안에서 비누를 문질러 곱고 풍성한 거품을 만듭니다." },
  { image: remove.url, title: "비누 꺼내기", text: "비누를 꺼낸 뒤 망에 남은 거품을 모아 주세요." },
  { image: wash.url, title: "씻고 충분히 헹구기", text: "거품을 몸에 부드럽게 펴 바르고 물로 충분히 헹궈 주세요." },
];

export function KakitanninDetail() {
  return (
    <div className="-mx-4 break-keep text-foreground">
      <section className="bg-detail-paper">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-20">
          <p className="text-xs text-oxide">JUNCO CLASSIC · CLEAR KAKITANNIN</p>
          <h2 className="mt-5 text-3xl leading-relaxed sm:text-4xl">자연에서 찾은 개운함!</h2>
          <p className="mt-5 text-lg leading-8">일본 전통 장인의 손길로 만든<br />감탄닌(Persimmon) 프리미엄 목욕 비누</p>
        </div>
        <img src={main.url} alt="클리어 카키타닌 호박빛 원형 비누, 흰색 패키지, 거품망과 감 열매" width={970} height={600} className="w-full" loading="lazy" />
        <div className="mx-auto max-w-[900px] px-6 py-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-y border-border py-5 text-sm"><span>일본산 수제 비누</span><span>감 추출물 · 차 카테킨</span><span>목욕용 · 100g</span><span>거품망 구성</span></div>
        </div>
      </section>

      <section className="bg-story-ivory px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-oxide">PANCIL · PATENTED PERSIMMON TANNIN</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">특허받은 감 탄닌 소취 원료<br />판실(PANCIL) 적용</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium leading-8">향으로 덮지 않고,<br />악취 분자를 직접 중화합니다</p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-8 text-muted-foreground">단순히 향으로 덮는 것이 아니라, 감 탄닌이 악취 분자 자체와 결합해 중화합니다. 감 탄닌 비누로 매일 씻는 습관을 시작해 보세요.</p>
          <img src={pancilHero.url} alt="준코 클래식 클리어 카키타닌 비누, 제품 박스, 거품망 구성" className="mt-10 w-full" loading="lazy" />
          <h3 className="mt-14 text-center text-xl leading-relaxed">판실(PANCIL)의 과학적 작동 원리</h3>
          <p className="mt-3 text-center text-sm text-muted-foreground">결합하고, 중화하고, 오래 유지합니다. 세 단계로 작동합니다.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{pancilMechanism.map(([number, title, text]) => <article key={number} className="border-t border-border pt-6"><p className="text-sm text-oxide">{number}</p><h4 className="mt-4 text-lg leading-7">{title}</h4><p className="mt-4 text-sm leading-8 text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-oxide">4 ODORS PANCIL CARES FOR</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">판실이 케어하는 4가지 체취</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-8 text-muted-foreground">판실의 감 탄닌이 각 악취 분자와 결합해 중화하는 과정을 확인해 보세요.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">{pancilOdors.map(([name, en, text]) => <article key={name} className="border border-border bg-detail-paper p-6"><h3 className="text-lg font-semibold leading-7">{name}</h3><p className="mt-1 text-xs text-oxide">{en}</p><p className="mt-4 text-sm leading-8 text-muted-foreground">{text}</p></article>)}</div>
          <div className="mt-10 border-y border-border py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-oxide" />감 탄닌의 수산기(-OH)</span>
              <span className="text-muted-foreground">+</span>
              <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-muted-foreground" />악취 분자</span>
              <span className="text-muted-foreground">→</span>
              <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full border border-oxide" />결합 후 안정 상태</span>
            </div>
            <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">감 탄닌의 수산기(-OH)가 악취 분자와 결합하면, 냄새가 발생하지 않는 안정된 상태로 바뀝니다.</p>
          </div>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-xs text-oxide">PERSIMMON TANNIN · DEODORIZING CARE</p>
          <h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">땀과 체취가 신경 쓰이는 날,<br />감 탄닌의 개운한 세정</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-8 text-muted-foreground">활동 후 남은 땀, 피부에 쌓인 피지와 노폐물. 클리어 카키타닌은 감 추출물의 소취 특성과 비누의 세정력을 생각한 데일리 목욕 비누입니다.</p>
          <img src={scene.url} alt="감 열매와 함께 놓인 클리어 카키타닌 비누와 거품망 세트" className="mt-10 w-full" loading="lazy" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">{odorCare.map(([number, title, text]) => <article key={number} className="border-t border-border pt-6"><p className="text-sm text-oxide">{number}</p><h3 className="mt-4 text-lg leading-7">{title}</h3><p className="mt-4 text-sm leading-8 text-muted-foreground">{text}</p></article>)}</div>
          <div className="mt-10 border-y border-border py-6 text-sm leading-7 text-muted-foreground">
            <p className="font-medium text-foreground">탈취는 향으로 가리는 것과 다릅니다.</p>
            <p className="mt-3">여기서 말하는 탈취·소취는 냄새 성분을 줄이는 원료의 특성과 세정으로 냄새의 원인을 씻어내는 케어를 뜻합니다. 이 비누는 땀 분비를 억제하는 제품이 아닙니다.</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs"><a href="https://www.rilis.co.jp/products/about-pancil.php" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">감 탄닌 원료의 소취 특성 참고자료 ↗</a><a href="https://cosmetic-ingredients.org/deodrant-agents/persimmon-tannin/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">감 탄닌 성분 해설 ↗</a></div>
          </div>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2 md:gap-14">
          <img src={botanicals.url} alt="감 열매와 차 잎, 호박빛 클리어 카키타닌 비누" className="w-full" loading="lazy" />
          <div><p className="text-xs text-oxide">BOTANICAL BODY CARE</p><h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">감에서 찾고,<br />차에서 더한 산뜻함</h2>
            <dl className="mt-8 space-y-7"><div className="border-t border-border pt-5"><dt className="text-lg font-semibold">감 추출물 · 감 탄닌</dt><dd className="mt-3 text-sm leading-8 text-muted-foreground">자연적으로 탄닌을 함유한 감 추출물을 배합했습니다. 감 탄닌의 소취 특성에 주목해, 땀냄새와 체취가 신경 쓰이는 목욕 시 세정을 생각했습니다.</dd></div><div className="border-t border-border pt-5"><dt className="text-lg font-semibold">차 카테킨 · 폴리페놀</dt><dd className="mt-3 text-sm leading-8 text-muted-foreground">녹차 유래 카테킨을 함께 담았습니다. 식물 유래 성분을 더한 산뜻한 데일리 목욕 케어입니다.</dd></div></dl>
          </div>
        </div>
      </section>

      <section className="bg-detail-paper px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]"><p className="text-center text-xs text-oxide">A SIMPLE DAILY BODY RITUAL</p><h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">쫀쫀한 거품으로 씻고,<br />개운함으로 하루를 마무리</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2"><figure><img src={foam.url} alt="클리어 카키타닌과 거품망으로 만든 풍성한 거품" className="aspect-square w-full object-cover" loading="lazy" /><figcaption className="mt-5"><h3 className="text-lg">밀도 높은 풍성한 거품</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">함께 구성된 거품망으로 곱고 풍성한 거품을 손쉽게 만듭니다. 거품을 충분히 내어 부드럽게 몸을 씻어 주세요.</p></figcaption></figure><figure><img src={rinse.url} alt="물에 젖은 호박빛 클리어 카키타닌 비누" className="aspect-square w-full object-cover" loading="lazy" /><figcaption className="mt-5"><h3 className="text-lg">가볍고 산뜻한 헹굼</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">운동 후, 땀이 많은 날, 하루의 끝에. 피부의 노폐물을 씻어내고 촉촉하고 매끄러운 사용감을 생각한 데일리 목욕 케어입니다.</p></figcaption></figure></div>
          <h3 className="mt-16 border-t border-border pt-8 text-xl">거품망과 함께하는 네 단계</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">손으로 거품을 내면 거품이 굵고 펴 바르는 데 시간이 더 걸리지만, 거품망을 쓰면 더 곱고 풍성한 거품이 쉽고 빠르게 완성됩니다.</p><ol className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">{steps.map((step) => <li key={step.title}><img src={step.image} alt={step.title} className="aspect-square w-full object-cover" loading="lazy" /><h4 className="mt-2 text-sm font-semibold leading-6">{step.title}</h4><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p></li>)}</ol><p className="mt-8 text-sm leading-7 text-muted-foreground">손으로도 거품을 낼 수 있습니다. 사용 후에는 비누와 거품망의 물기를 빼서 보관해 주세요.</p>
        </div>
      </section>

      <section className="bg-detail-blush px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2"><img src={pancilPeople.url} alt="비누로 씻는 남성, 여성, 중년 부부, 가족" className="w-full" loading="lazy" /><div><p className="text-xs text-oxide">FOR EVERYONE, EVERY DAY</p><h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">남녀노소,<br />매일 쓰는 목욕 케어</h2><p className="mt-6 text-sm leading-8 text-muted-foreground">남성, 여성, 중년 이후, 온 가족까지 함께 쓸 수 있습니다. 활동적인 일상과 바쁜 하루의 끝, 중년 이후의 체취가 신경 쓰이는 날에도 매일의 목욕으로 개운하게 씻어 보세요.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm"><span>활동적인 일상</span><span>바쁜 하루</span><span>중년 이후</span><span>온 가족의 매일 케어</span></div></div></div>
      </section>

      <section className="bg-story-ivory px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2"><img src={set.url} alt="클리어 카키타닌 비누 한 개, 패키지와 거품망 구성" className="w-full" loading="lazy" /><div><p className="text-xs text-oxide">PRODUCT INFORMATION</p><h2 className="mt-4 text-2xl leading-relaxed">클리어 카키타닌 제품 안내</h2><dl className="mt-8 text-sm">{[["제품명", "JUNCO CLASSIC Clear Kakitannin"], ["제조국", "일본"], ["내용량", "100g"], ["사용 용도", "목욕 비누"], ["구성", "비누 1개 · 거품망 1개"], ["주요 성분", "감 추출물(감 탄닌) · 차 카테킨"], ["적용 원료", "판실(PANCIL) 감 탄닌 소취 원료"]].map(([label, value]) => <div key={label} className="grid grid-cols-[76px_1fr] gap-4 border-b border-border py-4"><dt className="text-muted-foreground">{label}</dt><dd className="break-words leading-7">{value}</dd></div>)}</dl></div></div>
      </section>
    </div>
  );
}