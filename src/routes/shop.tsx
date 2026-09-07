import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "온라인 스토어 | JUNCO CLASSIC 한국" },
      { name: "description", content: "JUNCO CLASSIC 수제 세안비누를 온라인으로 주문하세요." },
      { property: "og:title", content: "온라인 스토어 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "JUNCO CLASSIC 수제 세안비누 온라인 주문." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title="온라인 스토어" sub="STORE" />
        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : (
          <div className="mx-auto mt-12 grid max-w-[1200px] gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((p) => (
              <Link
                key={p.id}
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="group block border border-border bg-card"
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-5">
                  <p className="text-xs tracking-widest text-muted-foreground">{p.subtitle}</p>
                  <h2 className="mt-2 text-base font-semibold">{p.name}</h2>
                  <p className="mt-3 text-sm text-primary">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
