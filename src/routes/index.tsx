import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { ScrollHighlight } from "@/components/scroll-highlight";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/data/site";

const desktopSlides = ["/pc-hero-1.jpg", "/pc-hero-2.jpg", "/pc-hero-3.jpg", "/pc-hero-4.jpg"];
const mobileSlides = [
  "/mobile-hero-v2-1.jpg",
  "/mobile-hero-v2-2.jpg",
  "/mobile-hero-v2-3.jpg",
  "/mobile-hero-v2-4.jpg",
];



import aboutImg from "@/assets/about-ei.jpg.asset.json";
import homeBottomBanner from "@/assets/home-bottom-kakitannin-v2.png.asset.json";
import eiMark from "@/assets/ei-mark.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EI JUNCO CLASSIC 한국 공식 | 일본 미용비누" },
      {
        name: "description",
        content:
          "일본 제일의 비누 장인 이시노 에이이치(石野栄一)가 만든 미용비누 JUNCO CLASSIC. 한방 식물 추출물과 콜라겐을 담은 고급 세안 비누 한국 공식 사이트.",
      },
      { property: "og:title", content: "EI JUNCO CLASSIC 한국 공식" },
      {
        property: "og:description",
        content: "한방 식물 추출물과 미용 성분을 담은 일본 고급 세안 미용비누.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

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
  const { data: notices, isLoading: noticesLoading } = useQuery({
    queryKey: ["posts", "notice", "home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", "notice")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

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


        <section>
          <img
            src={homeBottomBanner.url}
            alt="JUNCO CLASSIC 비누 제품 컬렉션"
            className="w-full object-cover"
            loading="lazy"
          />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
