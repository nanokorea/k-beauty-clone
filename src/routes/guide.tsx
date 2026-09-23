import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollHighlight } from "@/components/scroll-highlight";
import soapsPhoto from "@/assets/features-ei-soaps-photo.jpg.asset.json";
import step1 from "@/assets/feat-step1.jpg.asset.json";
import step2 from "@/assets/feat-step2.jpg.asset.json";
import step3 from "@/assets/feat-step3.jpg.asset.json";
import step4 from "@/assets/feat-step4.jpg.asset.json";
import ing1 from "@/assets/feat-ing1.jpg.asset.json";
import ing2 from "@/assets/feat-ing2.jpg.asset.json";
import ing3 from "@/assets/feat-ing3.jpg.asset.json";
import ing4 from "@/assets/feat-ing4.jpg.asset.json";
import ing5 from "@/assets/feat-ing5.jpg.asset.json";
import pureWater from "@/assets/feat-pure.jpg.asset.json";
import plantsImg from "@/assets/feat-plants.jpg.asset.json";
import beforeImg from "@/assets/feat-before.jpg.asset.json";
import afterImg from "@/assets/feat-after.jpg.asset.json";
import soapImg from "@/assets/feat-soap.jpg.asset.json";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "EI soap는? | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content:
          "일본 수제비누의 아버지 이시노 에이이치(石野栄一)가 만든 최고급 수제비누의 특징 — 계면활성 처방과 틀 제조법(框錬製法)을 소개합니다.",
      },
      { property: "og:title", content: "EI soap는? | JUNCO CLASSIC 한국" },
      {
        property: "og:description",
        content: "최고급 수제비누의 특징: 계면활성 처방과 틀 제조법.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

const comparison = [
  { label: "제조 방식", frame: "전 천연 숙성 제조", machine: "기계 제조" },
  { label: "기본 원료", frame: "75% (함유 비율)", machine: "98% (함유 비율)" },
  { label: "영양 정수", frame: "25% (함유 비율)", machine: "2% (함유 비율)" },
  {
    label: "생산 과정",
    frame: "부드러운 가열 · 자연 냉각 · 자연 건조",
    machine: "급속 가열 · 급속 냉각 · 급속 건조",
  },
  {
    label: "거품 특징",
    frame: "거품이 곱고 풍성하며 매끄러운 감촉",
    machine: "거품이 굵고 적으며 거친 감촉",
  },
  { label: "성형 · 광택", frame: "수작업", machine: "기계" },
  {
    label: "비누 보존성",
    frame: "쉽게 녹거나 변형되지 않아 오래 보관·사용 가능",
    machine: "쉽게 녹고 변형됨",
  },
];


function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-[1000px] px-4 pt-8 text-xs text-muted-foreground">
          홈 &gt; EI soap는?
        </div>

        <div className="mx-auto max-w-[1000px] px-4 pb-20">
          {/* 소개 본문 + 사진 */}

          <div className="mt-12 grid items-start gap-10 md:grid-cols-[1fr_300px]">
            <ScrollHighlight className="space-y-5 border-t border-[#ddd] pt-8 text-[15px] leading-7 text-foreground/85">
              <p>
                50여 년 동안 이시노 에이이치(石野栄一) 선생이 개발한 '수제비누'는 천여 종에
                이릅니다. HACCI 꿀 비누, Penelopi Moon 문라이트 비누, Moisteane 등 이름난
                브랜드의 비누가 모두 그의 손에서 태어났습니다.
              </p>
              <p>
                이시노 에이이치(石野栄一)가 만든 '비누의 전설'은 NHK와 『마이니치신문』 등
                권위 있는 매체에서 꾸준히 깊이 있게 다루어 왔습니다.
              </p>
              <p>
                그의 '수제비누'는 최고급 품질과 독보적인 효과로 일본 황실과 정·재계, 예술계의
                명사와 사회 저명인사들에게 사랑받고 있습니다.
              </p>
              <p>
                이시노 에이이치(石野栄一)라는 이름은 이미 일본 수제비누의 '대명사'가
                되었습니다.
              </p>
            </ScrollHighlight>
            <img
              src={soapsPhoto.url}
              alt="이시노 에이이치(石野栄一)와 수제비누"
              className="mx-auto w-full max-w-[300px]"
              loading="lazy"
            />
          </div>

          {/* 최고급 수제비누의 강점 */}
          <h2 className="mt-16 border-b border-[#c9b489] pb-3 text-2xl font-bold text-ink sm:text-3xl">
            최고급 수제비누만의 특별한 강점
          </h2>

          <div className="mt-8 inline-block bg-[#a98c48] px-4 py-1.5 text-sm font-semibold text-white">
            강점 1 : 계면활성 처방
          </div>

          <div className="mt-8 grid items-center gap-6 sm:grid-cols-3">
            <Bubble title="수분과 결합" sub="피부의 수분을 붙잡아 줍니다" tone="orange" />
            <ScrollHighlight className="rounded-full border border-[#c9b489] px-6 py-10 text-center">
              <p className="font-serif text-lg text-ink">계면활성 처방</p>
              <p className="mt-3 text-[13px] leading-7 text-foreground/85">
                이시노 에이이치(石野栄一) 선생은 세안 비누의 원료를 연구하면서, 업계에 없던
                독자적인 세정 성분인 '계면활성' 처방을 개발해 업계의 빈자리를 채웠습니다.
              </p>
            </ScrollHighlight>
            <Bubble title="유분과 결합" sub="피부의 과한 유분을 흡수합니다" tone="gold" />
          </div>

          <p className="mt-8 text-center font-serif text-xl tracking-[0.15em] text-ink">
            · 한층 산뜻하고 촉촉하게 ·
          </p>

          {/* 거품의 3요소 + 세정 원리 4단계 */}
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { t: "섬세함", d: "섬세한 거품일수록 흡착력이 강합니다" },
              { t: "탄력", d: "마찰로 인한 각질층 손상을 막아 줍니다" },
              { t: "농도", d: "알맞은 농도가 흡착력을 높여 줍니다" },
            ].map((f) => (
              <ScrollHighlight key={f.t} className="text-center">
                <p className="border-b border-[#a98c48] pb-2 text-lg font-bold text-ink">{f.t}</p>
                <p className="mt-3 text-[14px] leading-7 text-foreground/85">{f.d}</p>
              </ScrollHighlight>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                img: step1.url,
                d: "지름 0.001mm의 촘촘한 거품이 새롭게 개발한 계면활성 성분과 영양·미용·보습 성분을 감싸 모공 깊숙이 스며듭니다.",
              },
              {
                img: step2.url,
                d: "계면활성 성분이 모공 속 노폐물과 피지를 분해해 흡착하고, 동시에 거품 속 영양·미용 성분이 피부 깊은 층까지 전달됩니다.",
              },
              {
                img: step3.url,
                d: "노폐물과 피지가 흡착되어 배출되는 동시에 보습 성분이 수분을 잡아 오래 촉촉함을 유지합니다.",
              },
              {
                img: step4.url,
                d: "이렇게 세정·영양 케어·장시간 보습이 하나로 이어지는 이시노 선생의 피부 미용 철학이 완성됩니다.",
              },
            ].map((s, i) => (
              <ScrollHighlight key={i} delay={i % 3}>
                <img src={s.img} alt={`세정 원리 ${i + 1}단계`} className="w-full" loading="lazy" />
                <p className="mt-3 text-[13px] leading-7 text-foreground/85">{s.d}</p>
              </ScrollHighlight>
            ))}
          </div>


          <div className="mt-14 inline-block bg-[#a98c48] px-4 py-1.5 text-sm font-semibold text-white">
            강점 2 : 틀 제조법(框錬製法)
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-[160px_1fr]">
            <h3 className="font-serif text-2xl text-ink">틀 제조법</h3>
            <ScrollHighlight>
              <p className="text-[15px] leading-7 text-foreground/85">
                이시노 에이이치(石野栄一) 선생은 수제비누의 '틀 제조법(框錬製法)'이라는
                시대를 앞서간 생산 공정을 독자적으로 만들어 냈습니다. 이 공법은 일반 세안
                비누의 영양 성분이 적고 효과가 단조로웠던 한계를 해결하는 동시에, 세안과
                피부 관리, 오래가는 아름다움을 하나로 아울렀습니다. 틀 제조법으로 만든 JUNCO
                CLASSIC은 보기에도 맑고 투명하며 부드럽습니다.
              </p>
            </ScrollHighlight>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] text-center text-[14px]">
              <thead>
                <tr>
                  <th className="w-[26%]" />
                  <th className="bg-[#fdf6e6] px-4 py-4 font-serif text-lg tracking-[0.2em] text-ink">
                    틀 제조법
                  </th>
                  <th className="px-4 py-4 font-serif text-lg tracking-[0.2em] text-ink">
                    기계 제조법
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 text-left text-[15px] text-ink">· {row.label}</td>
                    <td className="bg-[#fdf6e6] px-4 py-4 leading-7 text-foreground/85">
                      {row.frame}
                    </td>
                    <td className="px-4 py-4 leading-7 text-foreground/85">{row.machine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Bubble({
  title,
  sub,
  tone,
}: {
  title: string;
  sub: string;
  tone: "orange" | "gold";
}) {
  return (
    <div
      className={`mx-auto flex size-[170px] flex-col items-center justify-center rounded-full border text-center ${
        tone === "orange" ? "border-[#e08a3c]" : "border-[#a98c48]"
      }`}
    >
      <p
        className={`font-serif text-xl ${
          tone === "orange" ? "text-[#e08a3c]" : "text-[#a98c48]"
        }`}
      >
        {title}
      </p>
      <p className="mt-2 px-4 text-[12px] leading-6 text-foreground/80">{sub}</p>
    </div>
  );
}
