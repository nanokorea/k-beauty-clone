import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "로그인 · 회원가입 | JUNCO CLASSIC 한국" },
      { name: "description", content: "JUNCO CLASSIC 한국 회원 로그인 및 이메일 회원가입 페이지입니다." },
      { property: "og:title", content: "로그인 · 회원가입 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "회원 로그인 및 이메일 회원가입." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/mypage", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("로그인되었습니다.");
        navigate({ to: "/mypage" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/mypage" });
        } else {
          setEmailSent(true);
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "처리 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("구글 로그인에 실패했습니다.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/mypage" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[460px] px-4 py-16">
        <SectionHeading title={mode === "login" ? "로그인" : "회원가입"} sub="MEMBER" />

        {emailSent ? (
          <p className="mt-10 rounded-sm border border-primary bg-secondary/60 p-6 text-center text-sm leading-6">
            입력하신 이메일로 인증 메일을 보냈습니다.
            <br />
            메일의 링크를 눌러 가입을 완료해 주세요.
          </p>
        ) : (
          <>
            <form className="mt-10 space-y-5" onSubmit={submit}>
              {mode === "signup" ? (
                <label className="block text-sm font-medium">
                  이름
                  <input
                    required
                    className={fieldClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                  />
                </label>
              ) : null}
              <label className="block text-sm font-medium">
                이메일
                <input
                  required
                  type="email"
                  className={fieldClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label className="block text-sm font-medium">
                비밀번호
                <input
                  required
                  type="password"
                  minLength={6}
                  className={fieldClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {mode === "login" ? "로그인" : "가입하기"}
              </button>
            </form>

            <button
              type="button"
              onClick={google}
              className="mt-4 w-full rounded-sm border border-border px-8 py-3 text-sm transition-colors hover:bg-secondary"
            >
              구글 계정으로 계속하기
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="mt-6 w-full text-center text-sm text-muted-foreground underline"
            >
              {mode === "login" ? "이메일로 회원가입" : "이미 계정이 있어요 · 로그인"}
            </button>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
