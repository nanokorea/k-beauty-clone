import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useServerFn } from "@tanstack/react-start";
import { deleteMyAccount } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/mypage")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "마이페이지 | JUNCO CLASSIC 한국" },
      { name: "description", content: "회원 정보를 확인하고 배송지 정보를 수정하세요." },
      { property: "og:title", content: "마이페이지 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "회원 정보 및 배송지 수정." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MyPage,
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    postcode: "",
    address1: "",
    address2: "",
  });
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setEmail(data.user.email ?? "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();
      if (profile) {
        setForm({
          full_name: profile.full_name ?? "",
          phone: profile.phone ?? "",
          postcode: profile.postcode ?? "",
          address1: profile.address1 ?? profile.address ?? "",
          address2: profile.address2 ?? profile.address_detail ?? "",
        });
      }
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: data.user.id, email: data.user.email ?? null, ...form, address: form.address1, address_detail: form.address2 });
    setBusy(false);
    if (error) toast.error("저장에 실패했습니다.");
    else toast.success("회원 정보를 저장했습니다.");
  };

  const removeAccount = useServerFn(deleteMyAccount);
  const withdraw = async () => {
    if (!window.confirm("정말 회원 탈퇴하시겠습니까? 탈퇴 후에는 회원 정보가 삭제되며 복구할 수 없습니다.")) return;
    try {
      await removeAccount();
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      toast.success("회원 탈퇴가 완료되었습니다.");
      navigate({ to: "/", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "회원 탈퇴에 실패했습니다.");
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[640px] px-4 py-16">
        <SectionHeading title="마이페이지 · 정보 변경" sub="MY PAGE" />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/orders"
            className="rounded-sm border border-border px-5 py-2.5 text-sm transition-colors hover:bg-secondary"
          >
            주문 내역
          </Link>
          {isAdmin ? (
            <Link
              to="/admin"
              className="rounded-sm border border-primary px-5 py-2.5 text-sm text-primary transition-colors hover:bg-secondary"
            >
              관리자 화면
            </Link>
          ) : null}
          <button
            type="button"
            onClick={signOut}
            className="rounded-sm border border-border px-5 py-2.5 text-sm transition-colors hover:bg-secondary"
          >
            로그아웃
          </button>
        </div>

        <form className="mt-10 space-y-5" onSubmit={save}>
          <p className="text-sm text-muted-foreground">이메일: {email}</p>
          <label className="block text-sm font-medium">
            이름
            <input
              className={fieldClass}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </label>
          <label className="block text-sm font-medium">
            연락처
            <input
              className={fieldClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
              className={fieldClass}
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
            />
          </label>
          <label className="block text-sm font-medium">
            상세주소
            <input
              className={fieldClass}
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            정보 변경 저장
          </button>
        </form>
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-sm font-semibold">회원 탈퇴</h2>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">탈퇴 시 회원 정보는 즉시 삭제되며, 주문 내역은 관련 법령에 따라 보관될 수 있습니다.</p>
          <button type="button" onClick={withdraw} className="mt-4 rounded-sm border border-destructive px-5 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10">회원 탈퇴하기</button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
