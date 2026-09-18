import { createFileRoute } from "@tanstack/react-router";
import { Flower2, Gem, Globe2, HandHeart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import historyImage from "@/assets/brand-history-original.jpg.asset.json";
import heritageWorkshopImage from "@/assets/brand-heritage-workshop.jpg.asset.json";
import heritageRecordImage from "@/assets/brand-heritage-record.jpg.asset.json";
import heritageFamilyImage from "@/assets/brand-heritage-family.jpg.asset.json";
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
              <HeritageFamilyPhoto className="mt-10 w-2/3" />
            </div>
          </div>
        </section>

        <section className="border-y border-antique-gold/25 bg-secondary/45 px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <img
                src={soapsImage.url}
                alt="3대의 기술로 완성한 EIICHI ISHINO 비누"
                className="aspect-[5/4] w-full rounded-sm object-cover shadow-sm"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-primary">Our Philosophy</p>
              <h2 className="mt-3 text-3xl font-bold leading-10 text-ink">좋은 비누 한 장을 위해</h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-foreground/75">
                3대가 이어온 것은 제조법만이 아닙니다. 피부를 존중하는 마음, 원료를 고르는 기준,
                그리고 매일 더 나은 결과를 향해 나아가는 자세까지 함께 계승합니다.
              </p>
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
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}