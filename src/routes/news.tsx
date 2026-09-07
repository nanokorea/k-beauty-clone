import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "공지사항 — EI 한국" },
      {
        name: "description",
        content: "EI 제품의 입고 소식과 홈페이지 공지사항을 확인하세요.",
      },
      { property: "og:title", content: "공지사항 — EI 한국" },
      {
        property: "og:description",
        content: "EI 제품의 입고 소식과 홈페이지 공지사항을 확인하세요.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-14">
      <SectionHeading title="공지사항" sub="NOTICE" />
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {news.map((n) => (
          <li key={n.title} className="py-6">
            <p className="text-xs tracking-wide text-muted-foreground">
              {n.date}
            </p>
            <h2 className="mt-2 text-base font-semibold text-foreground">
              {n.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {n.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
