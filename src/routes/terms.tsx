import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { TERMS_OF_SERVICE } from "@/data/terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "이용약관 — EI 공식몰" },
      { name: "description", content: "주식회사 SILION EI 공식몰 이용약관입니다." },
      { property: "og:title", content: "이용약관 — EI 공식몰" },
      { property: "og:description", content: "EI 공식몰 이용약관" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-14">
        <SectionHeading title="이용약관" sub="TERMS OF SERVICE" />
        <div className="mt-10 whitespace-pre-line text-sm leading-7 text-foreground/85">{TERMS_OF_SERVICE}</div>
      </main>
      <SiteFooter />
    </div>
  ),
});
