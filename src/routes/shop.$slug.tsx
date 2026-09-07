import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$slug")({
  head: () => ({
    meta: [
      { title: "상품 상세 | JUNCO CLASSIC 한국" },
      { name: "description", content: "JUNCO CLASSIC 수제 세안비누 상품 상세 정보입니다." },
      { property: "og:title", content: "상품 상세 | JUNCO CLASSIC 한국" },
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
      <main className="mx-auto max-w-[1100px] px-4 py-16">
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : !product ? (
          <div className="text-center">
            <p className="text-sm">상품을 찾을 수 없습니다.</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              스토어로 돌아가기
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full border border-border object-cover"
              />
            ) : null}
            <div>
              <p className="text-xs tracking-widest text-muted-foreground">{product.subtitle}</p>
              <h1 className="mt-2 text-2xl font-semibold">{product.name}</h1>
              <p className="mt-4 text-xl text-primary">{formatPrice(product.price)}</p>
              <p className="mt-6 whitespace-pre-line text-sm leading-7 text-foreground/85">
                {product.description || product.summary}
              </p>

              <div className="mt-8 flex items-center gap-3">
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
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
