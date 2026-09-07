import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { products, contact } from "@/data/site";
import slide1 from "@/assets/slide1-optimized.jpg.asset.json";
import slide2 from "@/assets/slide2-optimized.jpg.asset.json";
import slide3 from "@/assets/slide3-optimized.jpg.asset.json";
import mobileHero1 from "@/assets/mobile-hero-1.jpg.asset.json";
import mobileHero2 from "@/assets/mobile-hero-2.jpg.asset.json";
import mobileHero3 from "@/assets/mobile-hero-3.jpg.asset.json";
import mobileHero4 from "@/assets/mobile-hero-4.jpg.asset.json";
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

const desktopSlides = [slide1.url, slide2.url, slide3.url];
const mobileSlides = [mobileHero1.url, mobileHero2.url, mobileHero3.url, mobileHero4.url];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      const slideCount = window.matchMedia("(min-width: 640px)").matches
        ? desktopSlides.length
        : mobileSlides.length;
      setI((v) => (v + 1) % slideCount);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-antique-gold/35 bg-porcelain">
      <div className="relative aspect-[4/5] w-full sm:hidden">
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
      <div className="relative hidden aspect-[1004/350] w-full sm:block">
        {desktopSlides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`JUNCO CLASSIC 배너 ${idx + 1}`}
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
              idx === i % desktopSlides.length ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="flex h-9 items-center justify-center gap-2 sm:hidden">
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
      <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center gap-2 sm:flex">
        {desktopSlides.map((src, idx) => (
          <button
            key={src}
            type="button"
            aria-label={`슬라이드 ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 w-10 rounded-full border border-ink/15 transition-colors ${
              idx === i % desktopSlides.length ? "bg-oxide" : "bg-background/85"
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
