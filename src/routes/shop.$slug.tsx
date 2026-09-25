import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$slug")({
  head: () => ({
    meta: [
      { title: "상품 상세 | EI ONLINE STORE" },
      { name: "description", content: "JUNCO CLASSIC 수제 세안비누 상품 상세 정보입니다." },
      { property: "og:title", content: "상품 상세 | EI ONLINE STORE" },
      { property: "og:description", content: "JUNCO CLASSIC 수제 세안비누 상품 상세 정보." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    setQty(1);
  }, [slug]);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: related } = useQuery({
    queryKey: ["related", product?.category, slug],
    enabled: !!product,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("slug,name,image_url,price,subtitle")
        .eq("is_active", true)
        .neq("slug", slug)
        .order("sort_order")
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const soldOut = !!product && product.stock <= 0;
  const gallery = product ? (product.gallery?.length ? product.gallery : [product.image_url ?? ""]) : [];

  const addToCart = () => {
    if (!product) return;
    cart.add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image_url,
      },
      qty,
    );
    toast.success("장바구니에 담았습니다.");
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-4 py-12">
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : !product ? (
          <div className="text-center">
            <p className="text-sm">상품을 찾을 수 없습니다.</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              STORE로 돌아가기
            </Link>
          </div>
        ) : (
          <>
            <nav className="mb-8 text-xs text-muted-foreground">
              <Link to="/shop" className="hover:text-primary">
                EI ONLINE STORE
              </Link>
              <span className="mx-2">›</span>
              <span>{product.category}</span>
              <span className="mx-2">›</span>
              <span className="text-foreground/80">{product.name}</span>
            </nav>

            <div className="grid gap-10 md:grid-cols-2">
              <div>
                {gallery[active] ? (
                  <img
                    src={gallery[active]}
                    alt={product.name}
                    className="aspect-square w-full border border-border object-cover"
                  />
                ) : null}
                {gallery.length > 1 ? (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {gallery.map((g, i) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`aspect-square overflow-hidden border ${
                          i === active ? "border-primary" : "border-border"
                        }`}
                      >
                        <img src={g} alt="" className="size-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div>
                <p className="text-[11px] tracking-widest text-muted-foreground">{product.category}</p>
                <h1 className="mt-2 text-2xl font-semibold leading-relaxed">{product.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>

                <p className="mt-5 text-2xl text-primary">{formatPrice(product.price)}</p>
                {product.origin_price ? (
                  <p className="mt-1 text-xs text-muted-foreground">일본 공식 판매가 {product.origin_price}</p>
                ) : null}

                <p className={`mt-4 text-sm ${soldOut ? "text-muted-foreground" : "text-foreground"}`}>
                  {product.stock_note || (soldOut ? "품절" : "재고 있음")}
                </p>

                {product.spec ? (
                  <p className="mt-6 border-y border-border py-4 text-sm leading-7 text-foreground/85">
                    {product.spec}
                  </p>
                ) : null}

                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm">수량</span>
                  <div className="flex items-center border border-border">
                    <button type="button" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                      −
                    </button>
                    <span className="w-10 text-center text-sm">{qty}</span>
                    <button type="button" className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>
                      +
                    </button>
                  </div>
                </div>

                {soldOut ? (
                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground">현재 품절된 상품입니다.</p>
                    <Link
                      to="/contact"
                      className="mt-3 inline-flex rounded-sm border border-primary px-6 py-3 text-sm text-primary transition-colors hover:bg-secondary"
                    >
                      재입고 문의하기
                    </Link>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={addToCart}
                      className="rounded-sm border border-primary px-6 py-3 text-sm text-primary transition-colors hover:bg-secondary"
                    >
                      장바구니 담기
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart();
                        navigate({ to: "/cart" });
                      }}
                      className="rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      바로 구매하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            <section className="mt-16 border-t border-border pt-10">
              <h2 className="text-lg font-semibold">상품 설명</h2>
              <p className="mt-5 whitespace-pre-line text-[15px] leading-7 text-foreground/85">
                {product.description || product.summary}
              </p>

              {product.features ? (
                <div className="mt-8 bg-secondary p-6">
                  <h3 className="text-sm font-semibold">[ 상품 특징 ]</h3>
                  <p className="mt-3 text-[15px] leading-7 text-foreground/85">{product.features}</p>
                </div>
              ) : null}
            </section>

            {related && related.length > 0 ? (
              <section className="mt-16">
                <h2 className="text-lg font-semibold">다른 상품</h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to="/shop/$slug" params={{ slug: r.slug }} className="group block">
                        {r.image_url ? (
                          <img
                            src={r.image_url}
                            alt={r.name}
                            className="aspect-square w-full border border-border object-cover transition-opacity group-hover:opacity-90"
                            loading="lazy"
                          />
                        ) : null}
                        <p className="mt-3 text-sm font-medium group-hover:text-primary">{r.name}</p>
                        <p className="mt-1 text-sm text-primary">{formatPrice(r.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
