import { createFileRoute } from "@tanstack/react-router";
import { Flower2, Gem, Globe2, HandHeart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import historyImage from "@/assets/brand-history.jpg.asset.json";
import firstGenerationImage from "@/assets/brand-generation-1.jpg.asset.json";
import secondGenerationImage from "@/assets/brand-generation-2.jpg.asset.json";
import thirdGenerationImage from "@/assets/brand-generation-3.jpg.asset.json";
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

const generations = [
  {
    overline: "FIRST GENERATION · 1930",
    title: "비누의 길을 열다",
    image: firstGenerationImage.url,
    alt: "EIICHI ISHINO 창업 1대의 옛 사진",
    body: "1930년 상하이 쿤밍로의 작은 공방에서 비누 사업을 시작했습니다. 아버지 곁에서 전통 비누 제조 기술을 익힌 경험이 한 세기를 향한 여정의 출발점이 되었습니다.",
  },
  {
    overline: "SECOND GENERATION · 1934",
    title: "기술을 깊게 다듬다",
    image: secondGenerationImage.url,
    alt: "비누의 향과 품질을 확인하는 2대 장인",
    body: "1934년 상하이에서 태어난 2대 장인은 어린 시절부터 아버지의 공방에서 비누를 가까이했습니다. 끊임없는 연구와 감각으로 가문의 제조 기술을 한층 발전시켰습니다.",
  },
  {
    overline: "THIRD GENERATION · TODAY",
    title: "다음 세대로 이어가다",
    image: thirdGenerationImage.url,
    alt: "공방에서 비누를 연구하고 만드는 3대 장인",
    body: "전통을 지키되 멈추지 않습니다. 정교한 배합과 제조 공정을 이어받아 오늘의 피부를 위한 더 순하고 완성도 높은 비누를 연구합니다.",
  },
];

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
                  3대의 계승,
                  <br />한결같은 비누의 길
                </p>
                <p className="mt-3 font-display text-base text-primary">Three Generations, One Purpose.</p>
                <p className="mt-7 max-w-md text-[15px] leading-7 text-foreground/80">
                  1930년부터 이어진 장인정신. 세대를 거쳐 축적한 기술과 피부를 향한 진심으로,
                  우리는 오늘도 좋은 비누 한 장을 완성합니다.
                </p>
              </div>
            </div>
            <div className="relative min-h-[390px] overflow-hidden lg:min-h-[560px]">
              <img
                src={historyImage.url}
                alt="1930년 상하이에서 시작한 EIICHI ISHINO의 옛 공방"
                className="absolute inset-0 size-full object-cover object-left"
              />
              <div className="absolute inset-x-0 bottom-0 bg-ink/80 px-6 py-5 text-porcelain sm:left-auto sm:right-8 sm:bottom-8 sm:w-80 sm:rounded-sm">
                <p className="font-display text-2xl font-bold">1930, SHANGHAI</p>
                <p className="mt-1 text-sm font-medium">비누를 향한 약속이 시작된 곳</p>
                <p className="mt-3 text-xs leading-5 text-porcelain/75">
                  작은 공방에서 시작된 성실한 제조와 연구의 정신은 3대에 걸쳐 이어지고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center">
              <p className="text-xs font-medium uppercase text-primary">Our Heritage</p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">세대를 잇는 장인정신</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-foreground/70">
                한 사람의 손에서 다음 사람의 손으로, 비누를 대하는 정직한 태도와 섬세한 기술을 이어왔습니다.
              </p>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {generations.map((generation) => (
                <article key={generation.overline}>
                  <div className="mx-auto aspect-[4/5] max-w-[290px] overflow-hidden rounded-[50%] border border-antique-gold/35 bg-secondary">
                    <img
                      src={generation.image}
                      alt={generation.alt}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-7 border-t border-antique-gold/35 pt-6 text-center">
                    <p className="text-[11px] font-medium text-primary">{generation.overline}</p>
                    <h3 className="mt-2 text-xl font-bold text-ink">{generation.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-foreground/75">{generation.body}</p>
                  </div>
                </article>
              ))}
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