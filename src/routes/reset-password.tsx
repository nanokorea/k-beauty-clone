import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "비밀번호 재설정 | Ei 미용비누" },
      { name: "description", content: "가입한 이메일로 받은 링크를 통해 새 비밀번호를 설정합니다." },
      { property: "og:title", content: "비밀번호 재설정 | Ei 미용비누" },
      { property: "og:description", content: "새 비밀번호 설정 페이지." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

const inputClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 6) { toast.error("비밀번호는 6자 이상 입력해 주세요."); return; }
    if (pw !== pw2) { toast.error("비밀번호가 일치하지 않습니다."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) { toast.error("비밀번호를 변경하지 못했습니다. 링크를 다시 요청해 주세요."); return; }
    toast.success("비밀번호가 변경되었습니다.");
    navigate({ to: "/mypage" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[420px] px-4 py-16">
        <SectionHeading title="비밀번호 재설정" sub="RESET PASSWORD" />
        {ready ? (
          <form onSubmit={submit} className="mt-10 space-y-4">
            <label className="block text-sm font-medium">
              새 비밀번호
              <input required type="password" className={inputClass} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
            </label>
            <label className="block text-sm font-medium">
              새 비밀번호 확인
              <input required type="password" className={inputClass} value={pw2} onChange={(e) => setPw2(e.target.value)} autoComplete="new-password" />
            </label>
            <button type="submit" disabled={busy} className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground disabled:opacity-60">
              비밀번호 변경
            </button>
          </form>
        ) : (
          <p className="mt-10 text-center text-sm leading-7 text-muted-foreground">
            이메일로 받은 비밀번호 재설정 링크를 통해 접속해 주세요.
            <br />
            문제가 계속되면 고객센터 070-4517-0773으로 연락해 주세요.
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
