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
          <li key={n.title} className="flex gap-5 py-6">
            {n.image ? (
              <img
                src={n.image}
                alt={n.title}
                className="size-20 shrink-0 rounded-sm object-cover"
                loading="lazy"
              />
            ) : null}
            <div>
              <p className="text-xs tracking-wide text-muted-foreground">
                {n.date}
              </p>
              <h2 className="mt-2 text-base font-semibold text-foreground">
                {n.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {n.excerpt}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
