import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [
      { title: "주문 내역 | JUNCO CLASSIC 한국" },
      { name: "description", content: "내가 주문한 JUNCO CLASSIC 상품과 배송 상태를 확인하세요." },
      { property: "og:title", content: "주문 내역 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "주문 및 배송 상태 확인." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

export const STATUS_LABEL: Record<string, string> = {
  pending: "입금/결제 대기",
  paid: "결제 완료",
  preparing: "상품 준비중",
  shipping: "배송중",
  delivered: "배송 완료",
  cancelled: "주문 취소",
};

function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-16">
        <SectionHeading title="주문 내역" sub="MY ORDERS" />
        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : (data ?? []).length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">주문 내역이 없습니다.</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              상품 보러 가기
            </Link>
          </div>
        ) : (
          <ul className="mt-12 space-y-6">
            {(data ?? []).map((o) => (
              <li key={o.id} className="border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">주문번호 {o.order_no}</p>
                  <span className="rounded-sm bg-secondary px-3 py-1 text-xs text-primary">
                    {STATUS_LABEL[o.status] ?? o.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(o.created_at).toLocaleDateString("ko-KR")}
                </p>
                <ul className="mt-4 space-y-1 text-sm">
                  {o.order_items.map((it) => (
                    <li key={it.id} className="flex justify-between">
                      <span>
                        {it.product_name} × {it.quantity}
                      </span>
                      <span>{formatPrice(it.unit_price * it.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-right text-sm font-semibold text-primary">
                  {formatPrice(o.total_amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
