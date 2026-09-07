import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "관리자 | JUNCO CLASSIC 한국" },
      { name: "description", content: "상품, 주문, 문의, 게시판을 관리하는 관리자 전용 화면입니다." },
      { property: "og:title", content: "관리자 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "상품·주문·문의·게시판 관리." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const fieldClass =
  "w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

const STATUSES = [
  { key: "pending", label: "입금/결제 대기" },
  { key: "paid", label: "결제 완료" },
  { key: "preparing", label: "상품 준비중" },
  { key: "shipping", label: "배송중" },
  { key: "delivered", label: "배송 완료" },
  { key: "cancelled", label: "주문 취소" },
];

type Tab = "products" | "orders" | "inquiries" | "posts";

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("products");

  if (loading) {
    return <p className="py-24 text-center text-sm text-muted-foreground">확인 중…</p>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-[640px] px-4 py-24 text-center">
          <p className="text-sm">관리자만 접근할 수 있는 화면입니다.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-4 py-14">
        <SectionHeading title="관리자" sub="ADMIN" />
        <div className="mt-10 flex flex-wrap gap-2">
          {[
            { key: "products", label: "상품 관리" },
            { key: "orders", label: "주문 관리" },
            { key: "inquiries", label: "견적 문의" },
            { key: "posts", label: "공지 · 가이드" },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key as Tab)}
              className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
                tab === t.key
                  ? "border-primary bg-secondary text-primary"
                  : "border-border hover:bg-secondary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "products" ? <ProductsAdmin /> : null}
          {tab === "orders" ? <OrdersAdmin /> : null}
          {tab === "inquiries" ? <InquiriesAdmin /> : null}
          {tab === "posts" ? <PostsAdmin /> : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ProductsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  const [form, setForm] = useState({
    slug: "",
    name: "",
    subtitle: "",
    description: "",
    price: 0,
    image_url: "",
    stock: 100,
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("products").insert(form);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("상품을 등록했습니다.");
      setForm({ slug: "", name: "", subtitle: "", description: "", price: 0, image_url: "", stock: 100 });
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async (payload: { id: string; values: Record<string, unknown> }) => {
      const { error } = await supabase.from("products").update(payload.values).eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("수정했습니다.");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("삭제했습니다.");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  return (
    <div className="space-y-8">
      <form
        className="grid gap-3 border border-border bg-card p-5 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <input required className={fieldClass} placeholder="주소용 이름 (예: junco-new)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input required className={fieldClass} placeholder="상품명" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={fieldClass} placeholder="부제" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        <input className={fieldClass} type="number" placeholder="가격" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        <input className={fieldClass} placeholder="사진 주소(URL)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <input className={fieldClass} type="number" placeholder="재고" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
        <textarea className={`${fieldClass} sm:col-span-2`} rows={3} placeholder="상품 설명" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="rounded-sm bg-primary px-6 py-2 text-sm text-primary-foreground sm:col-span-2">
          상품 등록
        </button>
      </form>

      <ul className="space-y-3">
        {(data ?? []).map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-3 border border-border bg-card p-4">
            {p.image_url ? <img src={p.image_url} alt={p.name} className="size-14 object-cover" /> : null}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.slug}</p>
            </div>
            <input
              className="w-28 rounded-sm border border-input px-2 py-1 text-sm"
              type="number"
              defaultValue={p.price}
              onBlur={(e) => update.mutate({ id: p.id, values: { price: Number(e.target.value) } })}
            />
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                defaultChecked={p.is_active}
                onChange={(e) => update.mutate({ id: p.id, values: { is_active: e.target.checked } })}
              />
              노출
            </label>
            <button
              type="button"
              className="text-xs text-destructive underline"
              onClick={() => {
                if (confirm("이 상품을 삭제할까요?")) remove.mutate(p.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrdersAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const setStatus = useMutation({
    mutationFn: async (payload: { id: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: payload.status })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("배송 상태를 변경했습니다.");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  return (
    <ul className="space-y-4">
      {(data ?? []).map((o) => (
        <li key={o.id} className="border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{o.order_no}</p>
              <p className="text-xs text-muted-foreground">
                {o.orderer_name} · {o.phone} · {new Date(o.created_at).toLocaleString("ko-KR")}
              </p>
            </div>
            <select
              className="rounded-sm border border-input px-2 py-1 text-sm"
              value={o.status}
              onChange={(e) => setStatus.mutate({ id: o.id, status: e.target.value })}
            >
              {STATUSES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {o.postcode} {o.address} {o.address_detail}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {o.order_items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.product_name} × {it.quantity}
                </span>
                <span>{formatPrice(it.unit_price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-right text-sm font-semibold text-primary">
            {formatPrice(o.total_amount)} · {o.payment_method === "bank" ? "무통장" : o.payment_method === "card" ? "카드" : "카카오페이"}
          </p>
        </li>
      ))}
    </ul>
  );
}

function InquiriesAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const setStatus = useMutation({
    mutationFn: async (payload: { id: string; status: string }) => {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: payload.status })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-inquiries"] }),
  });

  return (
    <ul className="space-y-4">
      {(data ?? []).map((q) => (
        <li key={q.id} className="border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium">
              {q.name} · {q.email} {q.phone ? `· ${q.phone}` : ""}
            </p>
            <select
              className="rounded-sm border border-input px-2 py-1 text-xs"
              value={q.status}
              onChange={(e) => setStatus.mutate({ id: q.id, status: e.target.value })}
            >
              <option value="new">신규</option>
              <option value="in_progress">처리중</option>
              <option value="done">완료</option>
            </select>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(q.created_at).toLocaleString("ko-KR")}
          </p>
          {q.subject ? <p className="mt-3 text-sm font-medium">{q.subject}</p> : null}
          <p className="mt-2 whitespace-pre-line text-sm leading-6">{q.message}</p>
        </li>
      ))}
    </ul>
  );
}

function PostsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const [form, setForm] = useState({
    category: "notice",
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("posts").insert(form);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("등록했습니다.");
      setForm({ category: "notice", title: "", excerpt: "", content: "", image_url: "" });
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("삭제했습니다.");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
    },
  });

  return (
    <div className="space-y-8">
      <form
        className="grid gap-3 border border-border bg-card p-5"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <select
          className={fieldClass}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="notice">공지사항</option>
          <option value="guide">제품 활용 가이드</option>
        </select>
        <input required className={fieldClass} placeholder="제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className={fieldClass} placeholder="요약" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <input className={fieldClass} placeholder="사진 주소(URL)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <textarea className={fieldClass} rows={5} placeholder="내용" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <button className="rounded-sm bg-primary px-6 py-2 text-sm text-primary-foreground">등록</button>
      </form>

      <ul className="space-y-3">
        {(data ?? []).map((p) => (
          <li key={p.id} className="flex items-center gap-3 border border-border bg-card p-4">
            <span className="rounded-sm bg-secondary px-2 py-1 text-xs text-primary">
              {p.category === "notice" ? "공지" : "가이드"}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">{p.title}</span>
            <button
              type="button"
              className="text-xs text-destructive underline"
              onClick={() => {
                if (confirm("이 글을 삭제할까요?")) remove.mutate(p.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
