import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "자주 묻는 질문 | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content: "JUNCO CLASSIC 미용비누의 사용법, 보관법, 배송에 대한 자주 묻는 질문을 모았습니다.",
      },
      { property: "og:title", content: "자주 묻는 질문 | JUNCO CLASSIC 한국" },
      {
        property: "og:description",
        content: "JUNCO CLASSIC 미용비누에 대한 자주 묻는 질문과 답변.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

const faqs = [
  {
    q: "어떤 피부 타입에도 사용할 수 있나요?",
    a: "네. 건성, 지성, 복합성은 물론 민감성 피부까지 사용하실 수 있습니다. 피부가 특히 예민한 분께는 MATERNITY 또는 BABY 제품을 추천드립니다.",
  },
  {
    q: "하루에 몇 번 사용하면 좋을까요?",
    a: "아침과 저녁, 하루 두 번의 세안을 권장합니다. 충분히 거품을 내어 거품으로 감싸듯 부드럽게 세안해 주세요.",
  },
  {
    q: "비누는 어떻게 보관하나요?",
    a: "사용 후에는 물기를 잘 털어내고 통풍이 잘 되는 곳에 보관해 주세요. 물에 잠긴 상태로 두면 비누가 쉽게 물러집니다.",
  },
  {
    q: "임신 중에도 사용할 수 있나요?",
    a: "네. JUNCO CLASSIC MATERNITY는 임신·출산기의 예민한 피부를 위해 개발된 무자극 제품입니다.",
  },
  {
    q: "한국에서 어떻게 구매하나요?",
    a: "온라인 스토어를 통해 주문하실 수 있습니다. 대량 구매나 유통 문의는 문의 폼으로 연락해 주세요.",
  },
];

function Faq() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title="자주 묻는 질문" sub="FAQ" />
        <dl className="mx-auto mt-12 max-w-[820px] space-y-6 px-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-sm border border-border bg-card p-6">
              <dt className="font-semibold text-primary">Q. {f.q}</dt>
              <dd className="mt-3 text-[15px] leading-8 text-foreground/85">A. {f.a}</dd>
            </div>
          ))}
        </dl>
      </main>
      <SiteFooter />
    </div>
  );
}
