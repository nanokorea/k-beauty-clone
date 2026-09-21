import { createFileRoute } from "@tanstack/react-router";
import { Flower2, Gem, Globe2, HandHeart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollHighlight, StickyHighlight } from "@/components/scroll-highlight";
import historyImage from "@/assets/brand-history-original.jpg.asset.json";
import heritageWorkshopImage from "@/assets/brand-heritage-workshop.jpg.asset.json";
import heritageRecordImage from "@/assets/brand-heritage-record.jpg.asset.json";
import heritageFamilyImage from "@/assets/brand-heritage-family.jpg.asset.json";
import secondGenerationImage from "@/assets/brand-second-generation-highlighted.jpg.asset.json";
import eiichiPortraitImage from "@/assets/brand-eiichi-portrait.jpg.asset.json";
import eiichiMediaImage from "@/assets/brand-eiichi-media.jpg.asset.json";
import soapsImage from "@/assets/brand-soaps.jpg.asset.json";

export const Route = createFileRoute("/brand-story")({
  head: () => ({
    meta: [
      { title: "Brand Story | EI JUNCO CLASSIC 한국" },
      {
        name: "description",
        content: "1930년부터 3대에 걸쳐 이어 온 EIICHI ISHINO의 비누 장인정신과 브랜드 철학을 소개합니다.",
      },
      { property: "og:title", content: "Brand Story | EI JUNCO CLASSIC 한국" },
      {
        property: "og:description",
        content: "Three Generations, One Purpose. 1930년부터 이어진 EIICHI ISHINO의 비누 이야기.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandStoryPage,
});

const values = [
  {
    icon: HandHeart,
    en: "CRAFTED WITH CARE",
    title: "장인의 손으로",
    body: "비누 한 장마다 정성과 경험을 담아 세심하게 만듭니다.",
  },
  {
    icon: Gem,
    en: "THREE GENERATIONS",
    title: "3대에 걸친 계승",
    body: "한 세대의 기술과 철학을 다음 세대로 온전히 이어갑니다.",
  },
  {
    icon: Flower2,
    en: "FINE INGREDIENTS",
    title: "엄선한 원료",
    body: "피부를 먼저 생각하며 좋은 원료와 균형 잡힌 배합을 탐구합니다.",
  },
  {
    icon: Globe2,
    en: "BEAUTY FOR TOMORROW",
    title: "더 나은 내일",
    body: "오랜 전통 위에 새로운 연구를 더해 더 좋은 비누를 만듭니다.",
  },
];

function HeritageIntro() {
  return (
    <div>
      <ScrollHighlight>
        <p className="text-xs font-medium uppercase text-primary">Our Heritage · Since 1930</p>
      </ScrollHighlight>
      <ScrollHighlight delay={1}>
        <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">그 시작은……</h2>
      </ScrollHighlight>
      <div className="mt-7 h-px w-16 bg-antique-gold" />
      <ScrollHighlight delay={2}>
        <p className="mt-7 text-[15px] leading-7 text-foreground/80 sm:text-base">
          1930년, 이시노 에이이치(石野栄一) 선생의 아버지인 이시노 에이지(石野栄治)가 상하이
          쿤밍로(昆明路)의 작은 공방에서 비누를 만들기 시작한 이래, 3대에 걸쳐 오직 ‘피부를 위한
          진짜 비누’만을 연구해 온 가문의 역사가 담겨 있습니다.
        </p>
      </ScrollHighlight>
    </div>
  );
}

function HeritageCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[570px] pb-16 pr-10 sm:pb-24 sm:pr-20 lg:mx-0">
      <div className="aspect-[4/5] w-[78%] overflow-hidden bg-secondary shadow-sm">
        <img
          src={heritageWorkshopImage.url}
          alt="1930년 상하이 쿤밍로의 이시노 가문 공방"
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 right-0 aspect-[4/3] w-[58%] overflow-hidden border-[8px] border-background bg-background shadow-md sm:border-[12px]">
        <img
          src={heritageRecordImage.url}
          alt="이시노 가문의 역사가 기록된 일본 호적 문서"
          className="size-full object-cover object-top"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function HeritageFirstGeneration() {
  return (
    <ScrollHighlight className="mx-auto max-w-[570px] border-t border-antique-gold/35 pt-28 lg:mx-0 lg:pt-36">
      <p className="text-[11px] font-medium uppercase text-primary">First Generation · 1930</p>
      <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">제1대 | 창립과 기틀 (이시노 에이지)</h3>
      <p className="mt-4 text-[15px] leading-7 text-foreground/80">
        1930년 상하이에서 전통 비누 제조 기술을 바탕으로 사업을 시작하였으며, 1940년 일본으로
        귀국하여 일본 사이타마현 코시가야시에서 가문의 제누기술 기틀을 마련 하였습니다.
      </p>
    </ScrollHighlight>
  );
}

function HeritageFamilyPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`w-2/3 overflow-hidden bg-secondary shadow-sm ${className}`}>
      <img
        src={heritageFamilyImage.url}
        alt="어린 시절 이시노 에이이치와 아버지 이시노 에이지"
        className="w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function HeritageSecondGenerationPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-10 w-[87%] overflow-hidden bg-secondary shadow-sm lg:mt-24 ${className}`}>
      <img
        src={secondGenerationImage.url}
        alt="이시노 에이이치(石野栄一)와 함께한 공방 단체 사진"
        className="w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function HeritageSecondGeneration({ className = "" }: { className?: string }) {
  return (
    <ScrollHighlight
      className={`mx-auto max-w-[570px] border-t border-antique-gold/35 pt-16 lg:mx-0 lg:pt-20 ${className}`}
    >
      <p className="text-[11px] font-medium uppercase text-primary">Second Generation</p>
      <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
        제2대 | 기술 완성과 발전 EI 브랜드의 시작 (이시노 에이이치, 石野栄一)
      </h3>
      <p className="mt-4 text-[15px] leading-7 text-foreground/80">
        1973년 주식회사 SDC(에스디씨)를 설립하여 50년 이상 비누 외길을 걸어왔으며, 설립 이후 비누의 기획, 제조, 판매를
        전개해 온 전문 기업입니다.
        <br />
        타사 브랜드의 제품을 개발·생산해 주는 OEM(주문자 위탁 생산) 방식을 중심으로 성장해 왔습니다.
        <br />
        이 시기에 수많은 일본 수제 명품을 탄생 시켰습니다.
      </p>
    </ScrollHighlight>
  );
}

function SecondGenerationLegacy() {
  return (
    <section className="overflow-hidden border-y border-antique-gold/25 bg-secondary/30 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <ScrollHighlight className="max-w-[680px]">
          <p className="text-[11px] font-medium uppercase text-primary">The Master of Japanese Soap</p>
          <h2 className="mt-3 text-2xl font-bold leading-9 text-ink sm:text-3xl">
            일본 수제비누의 거장
            <br />
            이시노 에이이치(石野栄一)
          </h2>
          <div className="mt-7 h-px w-16 bg-antique-gold" />
          <div className="mt-7 space-y-6 text-[15px] leading-7 text-foreground/80 sm:text-base">
            <p>
              일본 언론 및 미디어(NHK 등)에서 ‘일본 최고의 비누 장인(日本一の石けんおじさん)’과
              “일본비누 아저씨”로 소개될 만큼 독보적인 입지를 구축했습니다.
            </p>
            <p>
              유명 명품 비누들의 레시피를 직접 개발하고 OEM 제조를 주도해 온 이시노 에이이치(石野栄一)
              선생이 자신의 이름을 직접 내걸고(EI = Eiichi ISHINO) 탄생시킨 유일한 독자 브랜드가 바로
              EI입니다.
            </p>
          </div>
        </ScrollHighlight>

        <ScrollHighlight delay={1} className="mx-auto w-full max-w-[530px]">
          <div className="relative pb-[28%] pl-[19%] pt-[4%]">
            <div className="ml-auto aspect-[4/5] w-[76%] overflow-hidden bg-secondary shadow-sm">
              <img
                src={eiichiMediaImage.url}
                alt="이시노 에이이치(石野栄一)를 소개한 일본 언론 기사"
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-0 aspect-[3/4] w-[62%] overflow-hidden border-[8px] border-background bg-background shadow-md sm:border-[12px]">
              <img
                src={eiichiPortraitImage.url}
                alt="JUNCO CLASSIC 비누를 든 이시노 에이이치(石野栄一)"
                className="size-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollHighlight>
      </div>
    </section>
  );
}

function BrandStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-antique-gold/30 bg-secondary/45">
          <div className="mx-auto grid min-h-[560px] max-w-[1440px] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex items-center px-6 py-16 sm:px-12 lg:px-20">
              <div className="max-w-xl">
                <p className="text-xs font-medium uppercase text-primary">Brand Story · Since 1930</p>
                <h1 className="mt-5 text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">EIICHI ISHINO</h1>
                <div className="my-7 h-px w-16 bg-antique-gold" />
                <p className="text-2xl font-semibold leading-9 text-ink sm:text-3xl">
                  3대를 이어온 100년의 장인 정신과 집념.
                </p>
                <p className="mt-3 font-display text-base text-primary">Three Generations, One Purpose.</p>
                <p className="mt-7 max-w-md text-[15px] leading-7 text-foreground/80">
                  1930년부터 이어진 이시노 가문의 집념.
                  <br />
                  세대를 이어온 기술과 피부를 향한 진심으로 오늘도 좋은 비누 한 조각을 만듭니다.
                </p>
              </div>
            </div>
            <div className="relative min-h-[390px] overflow-hidden lg:min-h-[560px]">
              <img
                src={historyImage.url}
                alt="1930년 상하이에서 시작한 EIICHI ISHINO의 옛 공방"
                className="absolute inset-0 size-full object-cover object-left"
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
          {/* Mobile: Our Heritage 문구 → 공방·호적 사진 → First Generation 문구 → 사진3 */}
          <div className="mx-auto flex max-w-[1240px] flex-col gap-14 lg:hidden">
            <HeritageIntro />
            <HeritageCollage />
            <HeritageFirstGeneration />
            <HeritageFamilyPhoto className="w-2/3" />
          </div>

          {/* Desktop: 기존 2단 레이아웃 유지 */}
          <div className="mx-auto hidden max-w-[1240px] gap-14 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <HeritageCollage />
              <HeritageFirstGeneration />
            </div>
            <div className="max-w-[650px]">
              <HeritageIntro />
              <HeritageFamilyPhoto className="mt-[480px] w-2/3" />
            </div>
          </div>
        </section>

        {/* Second Generation: 사진(왼쪽) + 문구(오른쪽) 나란히 배치 */}
        <section className="px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <HeritageSecondGenerationPhoto className="mx-auto lg:mx-0" />
            <HeritageSecondGeneration />
          </div>
        </section>

        <SecondGenerationLegacy />

        <section className="border-y border-antique-gold/25 bg-secondary/45 px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <img
                src={soapsImage.url}
                alt="3대의 기술로 완성한 EIICHI ISHINO 비누"
                className="aspect-[5/4] w-full rounded-sm object-cover shadow-sm"
                loading="lazy"
              />
            </div>
            <StickyHighlight
              eyebrow="Our Philosophy"
              title="좋은 비누 한 장을 위해"
              lines={[
                "3대가 이어온 것은 제조법만이 아닙니다.",
                "피부를 존중하는 마음, 원료를 고르는 기준,",
                "매일 더 나은 결과를 향해 나아가는 자세까지 함께 계승합니다.",
              ]}
            >
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-antique-gold/30 bg-antique-gold/30 sm:grid-cols-2">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.en} className="bg-background p-6">
                      <Icon className="size-7 text-primary" strokeWidth={1.4} aria-hidden="true" />
                      <p className="mt-4 text-[10px] font-medium text-primary">{value.en}</p>
                      <h3 className="mt-1 text-lg font-bold text-ink">{value.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/70">{value.body}</p>
                    </div>
                  );
                })}
              </div>
            </StickyHighlight>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}