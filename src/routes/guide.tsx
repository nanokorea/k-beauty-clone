import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollHighlight } from "@/components/scroll-highlight";
import portrait from "@/assets/features-ei-portrait.jpg.asset.json";
import soapsPhoto from "@/assets/features-ei-soaps-photo.jpg.asset.json";
import cert1 from "@/assets/features-cert1.jpg.asset.json";
import cert2 from "@/assets/features-cert2.jpg.asset.json";
import cert3 from "@/assets/features-cert3.jpg.asset.json";

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

const certificates = [
  { img: cert1.url, caption: "코시가야시 시장 표창장" },
  { img: cert2.url, caption: "일본 적십자사 감사장" },
  { img: cert3.url, caption: "코시가야시 시장 감사장" },
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
          {/* 상단 액자 */}
          <div className="relative mt-6 border border-[#e3d7bd] bg-story-ivory px-6 py-10 md:px-12">
            <Corner className="left-3 top-3" />
            <Corner className="right-3 top-3 rotate-90" />
            <Corner className="bottom-3 right-3 rotate-180" />
            <Corner className="bottom-3 left-3 -rotate-90" />
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end">
              <img
                src={portrait.url}
                alt="이시노 에이이치(石野栄一)"
                className="w-[180px] shrink-0"
              />
              <ScrollHighlight className="text-center sm:text-left">
                <p className="font-serif text-[34px] leading-none tracking-[0.1em] text-ink">
                  石 野 栄 一
                </p>
                <p className="mt-3 text-[13px] tracking-[0.3em] text-primary">
                  Eiichi Ishino
                </p>
                <p className="mt-6 text-[17px] font-semibold text-[#8b6d3a]">
                  일본 수제비누의 아버지 — 이시노 에이이치(石野栄一) 선생
                </p>
              </ScrollHighlight>
            </div>
          </div>

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

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute size-6 border-l border-t border-[#d8c49a] ${className}`}
    />
  );
}
