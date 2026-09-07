import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "공지사항 — EI 한국" },
      { name: "description", content: "EI 제품의 입고 소식과 홈페이지 공지사항을 확인하세요." },
      { property: "og:title", content: "공지사항 — EI 한국" },
      { property: "og:description", content: "EI 제품의 입고 소식과 홈페이지 공지사항." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", "notice"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", "notice")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-14">
        <SectionHeading title="공지사항" sub="NOTICE" />
        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : (
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {(data ?? []).map((n) => (
              <li key={n.id} className="flex gap-5 py-6">
                {n.image_url ? (
                  <img src={n.image_url} alt={n.title} className="size-20 shrink-0 object-cover" loading="lazy" />
                ) : null}
                <div>
                  <p className="text-xs tracking-wide text-muted-foreground">
                    {new Date(n.created_at).toLocaleDateString("ko-KR")}
                  </p>
                  <h2 className="mt-2 text-base font-semibold text-foreground">{n.title}</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-foreground/85">
                    {n.content || n.excerpt}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
