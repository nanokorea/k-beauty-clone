import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "제품 활용 가이드 | JUNCO CLASSIC 한국" },
      { name: "description", content: "JUNCO CLASSIC 비누를 200% 활용하는 방법과 관리 팁을 소개합니다." },
      { property: "og:title", content: "제품 활용 가이드 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "비누 활용법과 관리 팁 모음." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", "guide"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", "guide")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-16">
        <SectionHeading title="제품 활용 가이드" sub="GUIDE" />
        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : (
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {(data ?? []).map((p) => (
              <li key={p.id} className="flex gap-5 py-6">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="size-20 shrink-0 object-cover" loading="lazy" />
                ) : null}
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString("ko-KR")}
                  </p>
                  <h2 className="mt-2 text-base font-semibold">{p.title}</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-foreground/85">
                    {p.content || p.excerpt}
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
