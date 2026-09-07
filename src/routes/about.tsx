import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import aboutImg from "@/assets/about-ei.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "EI에 대하여 | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content:
          "반세기 넘게 비누 업계를 이끌어 온 장인 이시노 에이이치와 EI 브랜드의 이야기를 소개합니다.",
      },
      { property: "og:title", content: "EI에 대하여 | JUNCO CLASSIC 한국" },
      {
        property: "og:description",
        content: "비누 장인 이시노 에이이치와 EI 브랜드 이야기.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title="EI에 대하여" sub="About EI" />
        <div className="mx-auto mt-12 max-w-[900px] space-y-6 px-4 text-[15px] leading-8 text-foreground/85">
          <img src={aboutImg.url} alt="비누 장인 이시노 에이이치" className="w-full rounded-sm" />
          <p>
            '일본 제일의 비누 아저씨'로 친근하게 불리는 이시노 에이이치 씨는 반세기가 넘도록 비누
            업계를 이끌어 온 제일인자입니다. 오랜 세월 쌓아온 풍부한 지식과 경험을 바탕으로 언제나
            소비자의 눈높이에서 비누를 만들며 수많은 제품을 개발해 왔습니다.
          </p>
          <p>
            수많은 브랜드 비누를 탄생시킨 이시노 씨는 그 집대성으로 자신의 이름을 딴 브랜드
            'EI'를 시작했습니다.
          </p>
          <p>
            EI 브랜드는 한방 식물 추출물과 콜라겐 등의 미용 성분을 아낌없이 배합하여 높은 보습력을
            실현한 다양한 미용비누를 선보이고 있습니다.
          </p>
          <p>
            이시노 에이이치 씨가 개발한 미용비누는 NHK를 비롯해 신문, 『비마녀 Beauty』,
            『크로와상』 등 수많은 매체와 여성지에 소개되었습니다. 그 높은 품질로 뷰티 관계자와
            배우, 모델을 비롯한 많은 분들이 애용하고 있습니다.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
