import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import howtoImg from "@/assets/howto.jpg.asset.json";

export const Route = createFileRoute("/how-to-wash")({
  head: () => ({
    meta: [
      { title: "올바른 거품 팩 세안법 | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content: "JUNCO CLASSIC 미용비누를 200% 활용하는 한방 거품 팩 세안법을 단계별로 안내합니다.",
      },
      { property: "og:title", content: "올바른 거품 팩 세안법 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "한방 거품 팩 세안법 단계별 안내." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowToWash,
});

const steps = [
  { t: "1. 손과 얼굴을 미온수로 적십니다", d: "34도 전후의 미온수가 가장 좋습니다." },
  { t: "2. 비누를 충분히 거품 냅니다", d: "거품망을 사용하면 촘촘하고 탄력 있는 거품을 만들 수 있습니다." },
  { t: "3. 거품을 얼굴에 올립니다", d: "손이 피부에 닿지 않도록 거품으로 감싸듯 올려 주세요." },
  { t: "4. 30초 ~ 1분 거품 팩", d: "거품 상태로 잠시 두어 미용 성분이 피부에 스며들게 합니다." },
  { t: "5. 미온수로 충분히 헹굽니다", d: "헤어라인과 턱선까지 남김없이 헹궈 주세요." },
  { t: "6. 부드럽게 물기를 닦습니다", d: "수건으로 문지르지 말고 가볍게 눌러 물기를 제거합니다." },
];

function HowToWash() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title="올바른 한방·거품 팩 세안법" sub="How to wash" />
        <div className="mx-auto mt-12 max-w-[820px] px-4">
          <img src={howtoImg.url} alt="거품 팩 세안법" className="w-full rounded-sm" />
          <ol className="mt-10 space-y-5">
            {steps.map((s) => (
              <li key={s.t} className="rounded-sm border border-border bg-card p-5">
                <p className="font-semibold text-primary">{s.t}</p>
                <p className="mt-2 text-[15px] leading-8 text-foreground/85">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
