import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { ScrollHighlight } from "@/components/scroll-highlight";
import { products } from "@/data/site";
import correctedFourthHero from "@/assets/pc-hero-4-corrected.jpg";
import cleanedFourthMobileHero from "@/assets/mobile-hero-4-clean.jpg";

const desktopSlides = ["/pc-hero-1.jpg", "/pc-hero-2.jpg", "/pc-hero-3.jpg", correctedFourthHero];
const mobileSlides = [
  "/mobile-hero-v2-1.jpg",
  "/mobile-hero-v2-2.jpg",
  "/mobile-hero-v2-3.jpg",
  cleanedFourthMobileHero,
];



import aboutImg from "@/assets/about-ei.jpg.asset.json";
import homeBottomBanner from "@/assets/home-bottom-kakitannin-v2.png.asset.json";
import eiMarkSquare from "@/assets/ei-mark-hero.png.asset.json";
import mobileHeroMark from "@/assets/ei-mobile-hero-mark.png.asset.json";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "일본비누,수제비누,일본 명품수제비누,Ei 비누,준코,일본미용비누" },
      {
        name: "description",
        content: "일본 제일의 비누 장인이 만든 미용비누 JUNCO 시리즈. 수제비누, 일본 명품 수제비누, Ei 비누, 준코클래식, 일본 미용비누",
      },
      { property: "og:title", content: "일본비누,수제비누,일본 명품수제비누,Ei 비누,준코,일본미용비누" },
      {
        property: "og:description",
        content: "일본 제일의 비누 장인이 만든 미용비누 JUNCO 시리즈. 수제비누, 일본 명품 수제비누, Ei 비누, 준코클래식, 일본 미용비누",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://eisoap.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://eisoap.com/" }],
  }),
  component: Home,
});

function HeroLinks({ positionClass }: { positionClass: string }) {
  const linkClass =
    "pointer-events-auto whitespace-nowrap rounded-sm border border-ink/25 bg-background/85 px-4 py-2 text-[11px] font-normal tracking-wide text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-oxide hover:text-primary-foreground sm:px-5 sm:py-2.5 sm:text-[13px]";
  return (
    <div className={`absolute z-20 flex -translate-x-1/2 gap-2 sm:gap-3 ${positionClass}`}>
      <Link to="/brand-story" className={linkClass}>
        Brand History
      </Link>
      <Link to="/guide" className={linkClass}>
        EI 미용비누는?
      </Link>
    </div>
  );
}

function HeroOrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" aria-hidden="true">
      <span className="h-px w-14 bg-antique-gold/80 sm:w-24" />
      <span className="text-[9px] leading-none text-antique-gold sm:text-[11px]">◆</span>
      <span className="h-px w-14 bg-antique-gold/80 sm:w-24" />
    </div>
  );
}

function SecondSlideCaption({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={
        mobile
          ? "pointer-events-none absolute left-[6%] right-[6%] top-[12%] z-10 text-oxide drop-shadow-[0_1px_6px_rgba(255,250,240,0.6)]"
          : "pointer-events-none absolute left-[5.5%] top-[8%] z-10 max-w-[58%] text-oxide drop-shadow-[0_1px_6px_rgba(255,250,240,0.6)]"
      }
    >
      <HeroOrnamentDivider />
      <p
        className={`mt-3 text-center font-light leading-[1.45] sm:mt-4 ${
          mobile ? "text-[20px]" : "text-[clamp(22px,2.6vw,40px)]"
        }`}
      >
        <img
          src={eiMarkSquare.url}
          alt="EI 마크"
          className="mr-2 inline-block h-[1.15em] w-auto -translate-y-[0.12em] sm:mr-3"
        />
        비누 한 조각을 만들기 위해,
      </p>
      <p
        className={`font-semibold leading-[1.35] ${
          mobile ? "text-[22px]" : "text-[clamp(26px,3vw,46px)]"
        }`}
      >
        100일의 시간이 필요합니다.
      </p>
      <div className="mt-3 sm:mt-4">
        <HeroOrnamentDivider />
      </div>
    </div>
  );
}

function DesktopHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % desktopSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative hidden overflow-hidden border-b border-antique-gold/35 bg-porcelain sm:block">
      <div className="relative aspect-[1600/720] w-full">
        {desktopSlides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`JUNCO CLASSIC 배너 ${idx + 1}`}
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink/65 via-ink/20 to-transparent transition-opacity duration-700 motion-reduce:transition-none ${i === 1 ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
        <div className={`transition-opacity duration-700 motion-reduce:transition-none ${i === 1 ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== 1}>
          <SecondSlideCaption />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2">
        {desktopSlides.map((src, idx) => (
          <button
            key={src}
            type="button"
            aria-label={`슬라이드 ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 w-10 rounded-full border border-ink/15 transition-colors ${
              idx === i ? "bg-oxide" : "bg-background/85"
            }`}
          />
        ))}
      </div>
      <HeroLinks positionClass="left-[27%] top-[84%]" />
    </section>
  );
}

function MobileHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % mobileSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-antique-gold/35 bg-porcelain sm:hidden">
      <div className="relative mx-auto aspect-[4/5] w-full">
        {mobileSlides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`JUNCO CLASSIC 모바일 배너 ${idx + 1}`}
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div
          className={`pointer-events-none absolute left-[5%] right-[5%] top-[11%] z-10 flex items-center justify-center gap-2.5 text-oxide transition-opacity duration-700 motion-reduce:transition-none ${
            i === 0 ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== 0}
        >
          <img src={mobileHeroMark.url} alt="EI" className="size-12 shrink-0 object-contain" />
          <p className="text-[24px] font-medium leading-none">비누는 조금 다릅니다.</p>
        </div>
        <img
          src={mobileHeroMark.url}
          alt="EI 마크"
          className={`pointer-events-none absolute left-[5%] top-[8%] z-10 h-14 w-auto object-contain transition-opacity duration-700 motion-reduce:transition-none sm:h-16 ${
            i === 3 ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== 3}
        />
        <div className={`transition-opacity duration-700 motion-reduce:transition-none ${i === 1 ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== 1}>
          <SecondSlideCaption mobile />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2">
        {mobileSlides.map((src, idx) => (
          <button
            key={src}
            type="button"
            aria-label={`슬라이드 ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 w-8 rounded-full border border-ink/15 transition-colors ${
              idx === i ? "bg-oxide" : "bg-background/85"
            }`}
          />
        ))}
      </div>
    </section>
  );
}



function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <DesktopHero />
        <MobileHero />

        <section className="bg-story-ivory py-20">
          <SectionHeading title="EI에 대하여" sub="About EI" />
          <div className="mx-auto mt-12 grid max-w-[1100px] items-start gap-10 px-4 md:grid-cols-2">
            <Link to="/about">
              <img
                src={aboutImg.url}
                alt="비누 장인 이시노 에이이치(石野栄一)"
                className="w-full rounded-sm object-cover shadow-sm transition-opacity hover:opacity-90"
              />
            </Link>
            <ScrollHighlight className="space-y-4 text-[15px] leading-7 text-foreground/85">
              <p>
                '일본 제일의 비누 아저씨「日本一の石鹸おじさん」'로 친근하게 불리는 이시노 에이이치(石野栄一) 씨는 반세기가 넘도록
                비누 업계를 이끌어 온 제일인자입니다. 오랜 세월 쌓아온 풍부한 지식과 경험을
                바탕으로 언제나 소비자의 눈높이에서 비누를 만들며 수많은 제품을 개발해 왔습니다.
              </p>
              <p>
                수많은 브랜드 비누를 탄생시킨 이시노 씨는 그 집대성으로 자신의 이름을 딴 브랜드
                'EI'를 시작했습니다.
              </p>
              <p>
                EI 브랜드는 한방 식물 추출물과 콜라겐 등의 미용 성분을 아낌없이 배합하여 높은
                보습력을 실현한 다양한 미용비누를 선보이고 있습니다.
              </p>
              <p>
                이시노 에이이치(石野栄一) 씨가 개발한 미용비누는 NHK를 비롯해 신문, 『비마녀 Beauty』,
                『크로와상』 등 수많은 매체와 여성지에 소개되었습니다. 그 높은 품질로 뷰티
                관계자와 배우, 모델을 비롯한 많은 분들이 애용하고 있습니다.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center rounded-sm border border-primary px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                자세히 보기
              </Link>
            </ScrollHighlight>
          </div>
        </section>

        <section className="bg-background pt-20">
          <SectionHeading title="JUNCO CLASSIC 시리즈" sub="JUNCO CLASSIC Series" />
          <div className="mt-12">
            {products.map((p, idx) => (
              <div key={p.slug} className={idx % 2 === 0 ? "bg-background py-12" : "bg-story-ivory py-12"}>
              <div
                className={`mx-auto grid max-w-[1100px] items-center gap-8 px-4 md:grid-cols-2 ${
                  idx % 2 === 1 ? "md:[&>a]:order-2" : ""
                }`}
              >
                <Link to="/products/$slug" params={{ slug: p.slug }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full rounded-sm object-cover shadow-sm transition-opacity hover:opacity-90"
                    loading="lazy"
                  />
                </Link>
                <ScrollHighlight delay={idx % 2}>
                  <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-primary">- {p.sub} -</p>
                  <p className="mt-5 text-[15px] leading-7 text-foreground/85">{p.summary}</p>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="mt-6 inline-flex items-center rounded-sm border border-primary px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    제품 보기
                  </Link>
                </ScrollHighlight>
              </div>
              </div>
            ))}
          </div>
        </section>


        <section className="relative">
          <img
            src={homeBottomBanner.url}
            alt="JUNCO CLASSIC 비누 제품 컬렉션"
            className="w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute left-[6%] right-[6%] top-[9%] z-10 text-oxide drop-shadow-[0_1px_6px_rgba(255,250,240,0.6)] sm:left-[5.5%]">
            <p className="text-[20px] font-light leading-[1.45] sm:text-[clamp(22px,2.6vw,40px)]">
              비누 하나로 완성하는
            </p>
            <p className="mt-1 text-[22px] font-semibold leading-[1.35] sm:text-[clamp(26px,3vw,46px)]">
              데일리 케어
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
