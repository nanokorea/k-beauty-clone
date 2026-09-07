import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "장바구니 | JUNCO CLASSIC 한국" },
      { name: "description", content: "장바구니에 담은 JUNCO CLASSIC 상품을 확인하고 주문하세요." },
      { property: "og:title", content: "장바구니 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "장바구니 상품 확인 및 주문." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, setQuantity, remove } = useCart();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-16">
        <SectionHeading title="장바구니" sub="CART" />
        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">장바구니가 비어 있습니다.</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              상품 보러 가기
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-12 divide-y divide-border border-y border-border">
              {items.map((i) => (
                <li key={i.productId} className="flex items-center gap-4 py-5">
                  {i.image ? (
                    <img src={i.image} alt={i.name} className="size-20 shrink-0 object-cover" />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="mt-1 text-sm text-primary">{formatPrice(i.price)}</p>
                  </div>
                  <div className="flex items-center border border-border">
                    <button type="button" className="px-3 py-1.5" onClick={() => setQuantity(i.productId, i.quantity - 1)}>
                      −
                    </button>
                    <span className="w-9 text-center text-sm">{i.quantity}</span>
                    <button type="button" className="px-3 py-1.5" onClick={() => setQuantity(i.productId, i.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i.productId)}
                    className="text-xs text-muted-foreground underline"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">총 결제 예정 금액</span>
              <span className="text-xl font-semibold text-primary">{formatPrice(total)}</span>
            </div>

            <Link
              to="/checkout"
              className="mt-8 block rounded-sm bg-primary px-8 py-3 text-center text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              주문서 작성하기
            </Link>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
