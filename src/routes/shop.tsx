import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "EI ONLINE STORE | JUNCO CLASSIC 한국" },
      { name: "description", content: "JUNCO CLASSIC, BABY, MATERNITY, SDC BEAUTY SOAP, RECOLLECTION 수제 세안비누 전 제품을 온라인으로 주문하세요." },
      { property: "og:title", content: "EI ONLINE STORE | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "일본 수제 세안비누 EI 전 제품 온라인 주문." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

const ALL = "전체 상품";

function ShopPage() {
  const [cat, setCat] = useState(ALL);

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

  const categories = useMemo(() => {
    const list: string[] = [];
    for (const p of data ?? []) {
      if (p.category && !list.includes(p.category)) list.push(p.category);
    }
    return [ALL, ...list];
  }, [data]);

  const items = (data ?? []).filter((p) => cat === ALL || p.category === cat);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title="EI ONLINE STORE" sub="온라인 스토어" />

        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-center gap-2 px-4">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-sm border px-4 py-2 text-xs tracking-wide transition-colors ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : (
          <div className="mx-auto mt-10 grid max-w-[1200px] gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
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
                    className="aspect-square w-full object-cover transition-transform group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-5">
                  <p className="text-[11px] tracking-widest text-muted-foreground">{p.category}</p>
                  <h2 className="mt-2 text-base font-semibold">{p.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
                  <p className="mt-3 text-sm text-primary">{formatPrice(p.price)}</p>
                  {p.stock <= 0 ? (
                    <p className="mt-2 text-xs text-muted-foreground">{p.stock_note || "품절"}</p>
                  ) : null}
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
