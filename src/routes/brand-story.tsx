import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/brand-story")({
  head: () => ({
    meta: [
      { title: "Brand Story | EI JUNCO CLASSIC 한국" },
      { name: "description", content: "EI JUNCO CLASSIC의 브랜드 이야기와 철학을 소개합니다." },
      { property: "og:title", content: "Brand Story | EI JUNCO CLASSIC 한국" },
      { property: "og:description", content: "EI JUNCO CLASSIC의 브랜드 이야기와 철학." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BrandStoryPage,
});

function BrandStoryPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-16">
        <SectionHeading title="Brand Story" sub="브랜드 이야기" />
        <div className="mt-12 space-y-6 text-[15px] leading-7 text-foreground/85">
          <p>브랜드 스토리 내용을 이곳에 추가해 주세요.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
