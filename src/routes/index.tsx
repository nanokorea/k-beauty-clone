import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { products, contact } from "@/data/site";
import heroClassic from "@/assets/hero-classic-clean.jpg";
import heroBaby from "@/assets/hero-baby-clean.jpg";
import aboutImg from "@/assets/about-ei.jpg.asset.json";
import howtoImg from "@/assets/howto.jpg.asset.json";
import contactBanner from "@/assets/contact-banner.jpg.asset.json";
import eiMark from "@/assets/ei-mark.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EI JUNCO CLASSIC 한국 공식 | 일본 미용비누" },
      {
        name: "description",
        content:
          "일본 제일의 비누 장인 이시노 에이이치가 만든 미용비누 JUNCO CLASSIC. 한방 식물 추출물과 콜라겐을 담은 고급 세안 비누 한국 공식 사이트.",
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

const slides = [
  {
    image: heroClassic,
    eyebrow: "EI JUNCO CLASSIC",
    title: "피부 본연의 아름다움",
    description: "엄선한 식물 성분과 장인의 정성으로 완성한 일본 프리미엄 미용비누",
    alt: "붉은 JUNCO CLASSIC 미용비누와 장미 꽃잎",
  },
  {
    image: heroBaby,
    eyebrow: "JUNCO CLASSIC BABY",
    title: "가족을 위한 순한 세안",
    description: "소중한 피부를 생각한 부드럽고 정갈한 데일리 클렌징",
    alt: "유리 접시 위 JUNCO CLASSIC BABY 비누",
  },
];

function Hero() {
  const [i, setI] = useState(0);
  const activeSlide = slides[i] ?? slides[0];
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  if (!activeSlide) return null;

  return (
    <section className="relative overflow-hidden border-b border-antique-gold/35 bg-porcelain">
      <div className="mx-auto grid min-h-[680px] max-w-[1500px] lg:grid-cols-12">
        <div className="relative z-10 flex items-center px-6 py-16 sm:px-10 lg:col-span-5 lg:px-16 lg:py-20 xl:px-24">
          <div className="max-w-[520px]">
            <p className="mb-7 text-xs font-bold uppercase text-oxide">{activeSlide.eyebrow}</p>
            <h1 className="break-keep text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {activeSlide.title}
            </h1>
            <p className="mt-7 max-w-md text-base font-medium leading-8 text-ink/75 sm:text-lg">
              {activeSlide.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button asChild size="lg" className="h-13 rounded-sm bg-oxide px-9 font-semibold text-primary-foreground shadow-none hover:bg-oxide/90">
                <Link to="/shop">제품 만나보기</Link>
              </Button>
              <Link to="/about" className="group inline-flex items-center gap-4 text-sm font-bold text-ink">
                EI 이야기
                <span className="h-px w-10 bg-antique-gold transition-all group-hover:w-16" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[480px] overflow-hidden bg-secondary lg:col-span-7 lg:min-h-[680px]">
          {slides.map((slide, idx) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-porcelain to-transparent lg:block" />
        </div>
      </div>
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 sm:left-10 lg:left-auto lg:right-10">
        {slides.map((slide, idx) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`슬라이드 ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 w-12 rounded-full border border-ink/15 transition-colors ${
              idx === i ? "bg-oxide" : "bg-background/80"
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
        <Hero />

        <section className="bg-card py-20">
          <SectionHeading title="EI에 대하여" sub="About EI" />
          <div className="mx-auto mt-12 grid max-w-[1100px] items-start gap-10 px-4 md:grid-cols-2">
            <Link to="/about">
              <img
                src={aboutImg.url}
                alt="비누 장인 이시노 에이이치"
                className="w-full rounded-sm object-cover shadow-sm transition-opacity hover:opacity-90"
              />
            </Link>
            <div className="space-y-4 text-[15px] leading-8 text-foreground/85">
              <p>
                '일본 제일의 비누 아저씨'로 친근하게 불리는 이시노 에이이치 씨는 반세기가 넘도록
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
                이시노 에이이치 씨가 개발한 미용비누는 NHK를 비롯해 신문, 『비마녀 Beauty』,
                『크로와상』 등 수많은 매체와 여성지에 소개되었습니다. 그 높은 품질로 뷰티
                관계자와 배우, 모델을 비롯한 많은 분들이 애용하고 있습니다.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center rounded-sm border border-primary px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <SectionHeading title="JUNCO CLASSIC 시리즈" sub="JUNCO CLASSIC Series" />
          <div className="mx-auto mt-12 max-w-[1100px] space-y-16 px-4">
            {products.map((p, idx) => (
              <div
                key={p.slug}
                className={`grid items-center gap-8 md:grid-cols-2 ${
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
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-primary">- {p.sub} -</p>
                  <p className="mt-5 text-[15px] leading-8 text-foreground/85">{p.summary}</p>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="mt-6 inline-flex items-center rounded-sm border border-primary px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    제품 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/60 py-16">
          <div className="mx-auto max-w-[700px] px-4 text-center">
            <img
              src={howtoImg.url}
              alt="올바른 한방 거품 팩 세안법"
              className="mx-auto w-full rounded-sm"
              loading="lazy"
            />
            <p className="mt-6 text-lg font-semibold">올바른 한방·거품 팩 세안법</p>
            <Link
              to="/how-to-wash"
              className="mt-5 inline-flex items-center rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              자세히 보기
            </Link>
          </div>
        </section>

        <section className="py-20">
          <SectionHeading title="공지사항" sub="NOTICE" />
          <div className="mx-auto mt-10 max-w-[900px] px-4">
            {noticesLoading ? (
              <p className="py-10 text-center text-sm text-muted-foreground">불러오는 중…</p>
            ) : (notices ?? []).length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">등록된 공지가 없습니다.</p>
            ) : (
              <ul className="divide-y divide-border border-y border-border">
                {(notices ?? []).map((n) => (
                  <li key={n.id}>
                    <Link to="/news" className="flex gap-5 py-6 transition-colors hover:bg-secondary/40">
                      <img
                        src={n.image_url ?? eiMark.url}
                        alt={n.image_url ? n.title : ""}
                        className="size-20 shrink-0 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-xs tracking-wide text-muted-foreground">
                          {new Date(n.created_at).toLocaleDateString("ko-KR")}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-foreground">{n.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-7 text-foreground/85">
                          {n.excerpt || n.content}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 text-center">
              <Link
                to="/news"
                className="inline-flex items-center rounded-sm border border-primary px-8 py-3 text-sm text-primary transition-colors hover:bg-secondary"
              >
                공지사항 전체 보기
              </Link>
            </div>
          </div>
        </section>


        <section>
          <img src={contactBanner.url} alt="" className="w-full object-cover" loading="lazy" />
        </section>

        <section className="py-20">
          <SectionHeading title="문의하기" sub="Contact" />
          <div className="mx-auto mt-10 max-w-[900px] px-4 text-center">
            <p className="text-[15px] font-medium">
              의뢰 및 업무 내용에 대한 문의는 언제든지 편하게 연락해 주세요
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <a
                href={`tel:${contact.phone}`}
                className="rounded-sm border border-border bg-card px-6 py-8 transition-colors hover:border-primary"
              >
                <span className="block text-3xl font-semibold text-primary">{contact.phone}</span>
                <span className="mt-3 block text-xs text-muted-foreground">{contact.hours}</span>
              </a>
              <Link
                to="/contact"
                className="rounded-sm border border-border bg-card px-6 py-8 transition-colors hover:border-primary"
              >
                <span className="block text-lg font-semibold">문의 폼으로 문의하기</span>
                <span className="mt-3 block text-xs text-muted-foreground">
                  영업일 기준 3일 이내에 담당자가 연락드립니다
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
