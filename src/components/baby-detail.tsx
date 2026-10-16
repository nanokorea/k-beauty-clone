import original from "@/assets/baby-original.jpg.asset.json";
import overhead from "@/assets/baby-overhead.jpg.asset.json";
import closeup from "@/assets/baby-closeup.jpg.asset.json";
import leaf from "@/assets/baby-leaf.jpg.asset.json";
import net from "@/assets/baby-net.jpg.asset.json";
import ritual from "@/assets/baby-ritual.jpg.asset.json";

const features = [
  { image: overhead.url, eyebrow: "01 · DEVELOPED WITH CARE", title: "아기의 피부에서 시작한 생각", text: "아기와 피부가 약한 분의 매일을 생각하며 개발한 투명 비누입니다. 비누 장인 이시노 에이이치가 의과대학 피부과 전문의와 공동 개발했습니다." },
  { image: leaf.url, eyebrow: "02 · THOUGHTFUL INGREDIENTS", title: "꼼꼼하게 고르고, 순함을 생각하다", text: "순천연·무첨가를 제품의 특징으로, 한방 식물 중 엄선한 추출 성분을 사용했습니다." },
  { image: net.url, eyebrow: "03 · CREAMY LATHER", title: "곱고 크리미한 거품으로", text: "비누에 물을 묻혀 거품망으로 충분히 거품을 내 주세요. 부드러운 거품을 피부에 가볍게 펴 바르고, 문지르는 힘을 줄여 부드럽게 씻어냅니다." },
];

export function BabyDetail() {
  return <div className="-mx-4 text-foreground">
    <section className="bg-detail-paper">
      <img src={ritual.url} alt="투명한 준코 클래식 베이비 비누와 초록 잎" width={1152} height={768} className="mx-auto w-full max-w-[1000px]" loading="lazy" />
      <div className="mx-auto max-w-2xl px-6 py-14 text-center sm:py-20"><p className="text-xs text-oxide">GENTLE BEGINNINGS · JUNCO CLASSIC</p><h2 className="mt-5 text-3xl leading-relaxed sm:text-4xl">준코 클래식 베이비</h2><p className="mt-5 text-base leading-8 text-muted-foreground">아기와 연약한 피부를 생각한<br />맑고 부드러운 매일의 세정</p><div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 border-y border-border py-5 text-sm"><span>100g</span><span>Made in Japan</span><span>투명 비누</span></div></div>
    </section>
    <section className="bg-detail-blush px-6 py-16 sm:py-24"><div className="mx-auto max-w-[900px]"><p className="text-center text-xs text-oxide">THE BABY DIFFERENCE</p><h2 className="mt-4 text-center text-2xl leading-relaxed sm:text-3xl">작은 피부를 위한, 세심한 선택</h2><div className="mt-12 space-y-14 sm:space-y-20">{features.map((feature, i) => <article key={feature.eyebrow} className="grid items-center gap-8 md:grid-cols-2"><img src={feature.image} alt={feature.title} width={1152} height={768} className={`w-full ${i % 2 ? "md:order-2" : ""}`} loading="lazy" /><div><p className="text-xs text-oxide">{feature.eyebrow}</p><h3 className="mt-4 text-xl leading-8 sm:text-2xl">{feature.title}</h3><p className="mt-5 text-[15px] leading-8 text-muted-foreground">{feature.text}</p></div></article>)}</div></div></section>
    <section className="bg-detail-paper"><img src={closeup.url} alt="JUNCO CLASSIC Baby 각인이 보이는 원본 비누 확대 사진" width={1152} height={768} className="mx-auto w-full max-w-[1000px]" loading="lazy" /><div className="mx-auto max-w-2xl px-6 py-14 text-center"><p className="text-xs text-oxide">CLEAR SOAP · SIMPLE RITUAL</p><h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">맑은 한 조각에 담은 정성</h2><p className="mt-5 text-[15px] leading-8 text-muted-foreground">투명한 비누의 질감과 섬세한 각인.<br />매일 만나는 한 조각에도 장인의 마음을 담았습니다.</p></div></section>
    <section className="bg-detail-blush px-6 py-16 sm:py-24"><div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-2"><img src={original.url} alt="준코 클래식 베이비 100g 비누와 유모차 그림 패키지" width={1152} height={768} className="w-full" loading="lazy" /><div><p className="text-xs text-oxide">PRODUCT INFORMATION</p><h2 className="mt-4 text-2xl">베이비 제품 안내</h2><dl className="mt-7 text-sm">{[["제품명", "JUNCO CLASSIC BABY"], ["내용량", "100g"], ["제조국", "일본"], ["제품 형태", "투명 고형 비누"], ["개발 대상", "아기와 피부가 약한 분"]].map(([label, value]) => <div key={label} className="grid grid-cols-[80px_1fr] gap-4 border-b border-border py-4"><dt className="text-muted-foreground">{label}</dt><dd className="leading-6">{value}</dd></div>)}</dl></div></div></section>
    <section className="bg-detail-paper px-6 py-16 sm:py-20"><div className="mx-auto max-w-[900px]"><p className="text-center text-xs text-oxide">DAILY CLEANSING</p><h2 className="mt-4 text-center text-2xl">부드러운 거품, 간결한 세정</h2><ol className="mt-10 grid gap-8 sm:grid-cols-3">{[["충분히 거품 내기", "비누와 거품망을 물에 적셔 곱고 풍성한 거품을 만들어 주세요."], ["가볍게 씻기", "손에 덜어낸 거품으로 피부를 부드럽게 씻어 주세요."], ["헹구고 건조하기", "미온수로 충분히 헹군 뒤 비누는 물기가 잘 빠지는 곳에서 건조해 주세요."]].map(([title, text], i) => <li key={title} className="border-t border-border pt-5"><span className="text-2xl text-oxide">0{i + 1}</span><h3 className="mt-4 text-base">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></li>)}</ol></div></section>
  </div>;
}