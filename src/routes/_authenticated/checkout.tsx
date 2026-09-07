import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice, useCart } from "@/lib/cart";
import { contact } from "@/data/site";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "주문서 작성 | JUNCO CLASSIC 한국" },
      { name: "description", content: "배송지와 결제 방법을 입력하고 주문을 완료하세요." },
      { property: "og:title", content: "주문서 작성 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "배송지 입력 및 결제 방법 선택." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

type Method = "bank" | "card" | "kakao";

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    orderer_name: "",
    phone: "",
    email: "",
    postcode: "",
    address: "",
    address_detail: "",
    memo: "",
  });
  const [method, setMethod] = useState<Method>("bank");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ orderNo: string; method: Method } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();
      setForm((f) => ({
        ...f,
        orderer_name: profile?.full_name ?? f.orderer_name,
        phone: profile?.phone ?? f.phone,
        email: profile?.email ?? data.user.email ?? f.email,
        postcode: profile?.postcode ?? f.postcode,
        address: profile?.address ?? f.address,
        address_detail: profile?.address_detail ?? f.address_detail,
      }));
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("로그인이 필요합니다.");

      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          orderer_name: form.orderer_name,
          phone: form.phone,
          email: form.email,
          postcode: form.postcode,
          address: form.address,
          address_detail: form.address_detail,
          memo: form.memo,
          payment_method: method,
          total_amount: total,
        })
        .select()
        .single();
      if (error) throw error;

      const { error: itemsError } = await supabase.from("order_items").insert(
        items.map((i) => ({
          order_id: order.id,
          product_id: i.productId,
          product_name: i.name,
          unit_price: i.price,
          quantity: i.quantity,
        })),
      );
      if (itemsError) throw itemsError;

      clear();
      setDone({ orderNo: order.order_no, method });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "주문 처리 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-[640px] px-4 py-16">
          <SectionHeading title="주문이 접수되었습니다" sub="ORDER COMPLETE" />
          <div className="mt-10 rounded-sm border border-border bg-card p-6 text-sm leading-7">
            <p>
              주문번호 <strong className="text-primary">{done.orderNo}</strong>
            </p>
            {done.method === "bank" ? (
              <div className="mt-4">
                <p className="font-medium">무통장 입금 안내</p>
                <p className="mt-2 text-muted-foreground">
                  아래 계좌로 입금해 주시면 확인 후 배송이 시작됩니다.
                  <br />
                  입금 계좌: 국민은행 000000-00-000000 (예금주: EI KOREA)
                  <br />
                  입금 금액: 주문 금액 전액 / 문의: {contact.phone}
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="font-medium">
                  {done.method === "card" ? "신용카드 결제" : "카카오페이 결제"} 안내
                </p>
                <p className="mt-2 text-muted-foreground">
                  현재 결제창 연동 준비 중입니다. 담당자가 결제 안내를 위해 연락드립니다.
                </p>
              </div>
            )}
            <Link to="/orders" className="mt-6 inline-block text-sm text-primary underline">
              내 주문 내역 보기
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-4 py-16">
        <SectionHeading title="주문서 작성" sub="CHECKOUT" />

        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">장바구니가 비어 있습니다.</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
              상품 보러 가기
            </Link>
          </div>
        ) : (
          <form className="mt-12 space-y-5" onSubmit={submit}>
            <ul className="divide-y divide-border border-y border-border">
              {items.map((i) => (
                <li key={i.productId} className="flex justify-between py-3 text-sm">
                  <span>
                    {i.name} × {i.quantity}
                  </span>
                  <span>{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-base font-semibold">
              <span>총 결제 금액</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>

            <label className="block text-sm font-medium">
              받는 분
              <input
                required
                className={fieldClass}
                value={form.orderer_name}
                onChange={(e) => setForm({ ...form, orderer_name: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              연락처
              <input
                required
                className={fieldClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="010-0000-0000"
              />
            </label>
            <label className="block text-sm font-medium">
              이메일
              <input
                type="email"
                className={fieldClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              우편번호
              <input
                className={fieldClass}
                value={form.postcode}
                onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              주소
              <input
                required
                className={fieldClass}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              상세주소
              <input
                className={fieldClass}
                value={form.address_detail}
                onChange={(e) => setForm({ ...form, address_detail: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              배송 메모
              <textarea
                rows={3}
                className={fieldClass}
                value={form.memo}
                onChange={(e) => setForm({ ...form, memo: e.target.value })}
              />
            </label>

            <fieldset className="space-y-2 pt-2">
              <legend className="text-sm font-medium">결제 방법</legend>
              {[
                { key: "bank", label: "무통장 입금" },
                { key: "card", label: "신용카드" },
                { key: "kakao", label: "카카오페이" },
              ].map((m) => (
                <label key={m.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="method"
                    checked={method === m.key}
                    onChange={() => setMethod(m.key as Method)}
                  />
                  {m.label}
                </label>
              ))}
            </fieldset>

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {formatPrice(total)} 결제하기
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
