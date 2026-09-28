import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { placeOrder } from "@/lib/orders.functions";
import { formatPrice, useCart } from "@/lib/cart";
import { contact } from "@/data/site";

export const Route = createFileRoute("/checkout")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "주문서 작성 | JUNCO CLASSIC 한국" },
      { name: "description", content: "배송지와 결제 방법을 입력하고 주문을 완료하세요." },
      { property: "og:title", content: "주문서 작성 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "배송지 입력 및 결제 방법 선택." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
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
  const [done, setDone] = useState<{ orderNo: string; method: Method; total: number; guest: boolean } | null>(null);
  const { userId, loading } = useAuth();
  const [guest, setGuest] = useState(false);
  const [balance, setBalance] = useState(0);
  const [usePoints, setUsePoints] = useState(0);
  const submitOrder = useServerFn(placeOrder);
  const pointsApplied = Math.min(usePoints, balance, total);
  const payable = total - pointsApplied;

  useEffect(() => {
    if (!userId) {
      setBalance(0);
      return;
    }
    supabase
      .from("point_transactions")
      .select("amount")
      .eq("user_id", userId)
      .then(({ data }) => setBalance((data ?? []).reduce((s, t) => s + t.amount, 0)));
  }, [userId]);

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
        address: profile?.address1 ?? profile?.address ?? f.address,
        address_detail: profile?.address2 ?? profile?.address_detail ?? f.address_detail,
      }));
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setBusy(true);
    try {
      const result = await submitOrder({
        data: {
          ...form,
          payment_method: method,
          points: pointsApplied,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        },
      });
      clear();
      setDone({ orderNo: result.orderNo, method, total: result.total, guest: result.guest });
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
            <p className="mt-4">결제 금액 <strong>{formatPrice(done.total)}</strong></p>
            {done.guest ? (
              <p className="mt-4 text-muted-foreground">
                비회원 주문입니다. 주문번호를 꼭 보관해 주세요. 주문 확인·변경은 고객센터 {contact.phone}로 문의해 주세요.
              </p>
            ) : (
              <Link to="/orders" className="mt-6 inline-block text-sm text-primary underline">
                내 주문 내역 보기
              </Link>
            )}
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

        {!loading && !userId && !guest && items.length > 0 ? (
          <div className="mx-auto mt-12 max-w-[420px] space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              회원으로 주문하시면 가입 축하 5,000포인트와 구매 금액의 5% 적립 혜택을 받으실 수 있습니다.
            </p>
            <Link
              to="/auth"
              className="block rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              회원 로그인 / 회원가입
            </Link>
            <button
              type="button"
              onClick={() => setGuest(true)}
              className="block w-full rounded-sm border border-border px-8 py-3 text-sm transition-colors hover:bg-secondary"
            >
              비회원으로 구매하기
            </button>
          </div>
        ) : items.length === 0 ? (
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
            <div className="flex justify-between text-sm">
              <span>상품 금액</span>
              <span>{formatPrice(total)}</span>
            </div>
            {userId ? (
              <div className="rounded-sm border border-border bg-secondary/40 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">포인트 사용</span>
                  <span className="text-muted-foreground">보유 {balance.toLocaleString("ko-KR")}P</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    min={0}
                    max={Math.min(balance, total)}
                    className={`${fieldClass} mt-0`}
                    value={usePoints || ""}
                    onChange={(e) => setUsePoints(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                    placeholder="사용할 포인트"
                  />
                  <button
                    type="button"
                    onClick={() => setUsePoints(Math.min(balance, total))}
                    className="shrink-0 rounded-sm border border-border px-4 text-sm hover:bg-secondary"
                  >
                    전액 사용
                  </button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">배송 완료 시 결제 금액의 5%가 포인트로 적립됩니다.</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">비회원 주문입니다. 주문 안내를 받을 이메일을 꼭 입력해 주세요.</p>
            )}
            {pointsApplied > 0 ? (
              <div className="flex justify-between text-sm">
                <span>포인트 할인</span>
                <span>-{formatPrice(pointsApplied)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-base font-semibold">
              <span>총 결제 금액</span>
              <span className="text-primary">{formatPrice(payable)}</span>
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
                required={!userId}
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
              {formatPrice(payable)} 결제하기
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
