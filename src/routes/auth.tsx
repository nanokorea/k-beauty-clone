import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: { zonecode: string; roadAddress: string; jibunAddress: string }) => void;
      }) => { open: () => void };
    };
  }
}

const POSTCODE_SCRIPT_ID = "daum-postcode-script";

function loadPostcodeScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.daum?.Postcode) return resolve();
    const existing = document.getElementById(POSTCODE_SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = POSTCODE_SCRIPT_ID;
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("주소 검색 창을 불러오지 못했습니다."));
    document.head.appendChild(script);
  });
}
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { TERMS_OF_SERVICE } from "@/data/terms";
import { checkUsername, signInWithUsername } from "@/lib/account.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "로그인 · 회원가입 | JUNCO CLASSIC 한국" },
      { name: "description", content: "아이디와 비밀번호로 이용하는 회원 로그인 및 약관 동의 회원가입 페이지입니다." },
      { property: "og:title", content: "로그인 · 회원가입 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "아이디 회원 로그인 및 약관 동의 회원가입." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const rowClass = "flex flex-col gap-1 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:gap-4";
const labelClass = "w-36 shrink-0 text-sm font-semibold";
const inputClass =
  "w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/mypage", replace: true });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-16">
        <SectionHeading title={mode === "login" ? "로그인" : "회원가입"} sub="MEMBER" />
        {mode === "login" ? <LoginForm /> : <SignupForm />}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-8 w-full text-center text-sm text-muted-foreground underline"
        >
          {mode === "login" ? "회원가입" : "이미 계정이 있어요 · 로그인"}
        </button>
      </main>
      <SiteFooter />
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const loginByUsername = useServerFn(signInWithUsername);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (userId.includes("@")) {
        const { error } = await supabase.auth.signInWithPassword({ email: userId.trim(), password });
        if (error) throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        const tokens = await loginByUsername({ data: { username: userId, password } });
        const { error } = await supabase.auth.setSession({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        });
        if (error) throw error;
      }
      toast.success("로그인되었습니다.");
      navigate({ to: "/mypage" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "로그인에 실패했습니다.");
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
    <div className="mx-auto mt-10 max-w-[420px]">
      <form className="space-y-4" onSubmit={submit}>
        <label className="block text-sm font-medium">
          아이디 (또는 이메일)
          <input
            required
            className={`mt-2 ${inputClass}`}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
            autoComplete="username"
          />
        </label>
        <label className="block text-sm font-medium">
          비밀번호
          <input
            required
            type="password"
            className={`mt-2 ${inputClass}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          로그인
        </button>
      </form>
      <button
        type="button"
        onClick={google}
        className="mt-4 w-full rounded-sm border border-border px-8 py-3 text-sm transition-colors hover:bg-secondary"
      >
        구글 계정으로 계속하기
      </button>
    </div>
  );
}

type Agreements = {
  age14: boolean;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  adEmail: boolean;
  adSms: boolean;
};

function SignupForm() {
  const navigate = useNavigate();
  const verifyUsername = useServerFn(checkUsername);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
    email: "",
    phone: "",
  });
  const [agree, setAgree] = useState<Agreements>({
    age14: false,
    terms: false,
    privacy: false,
    marketing: false,
    adEmail: false,
    adSms: false,
  });
  const [busy, setBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree.age14 || !agree.terms || !agree.privacy) {
      toast.error("필수 항목에 모두 동의해 주세요.");
      return;
    }
    if (form.password !== form.password2) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    setBusy(true);
    try {
      const { available } = await verifyUsername({ data: { username: form.username } });
      if (!available) throw new Error("이미 사용 중인 아이디입니다.");

      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: form.name,
            username: form.username.trim(),
            phone: form.phone,
            age14_agreed: agree.age14,
            terms_agreed: agree.terms,
            privacy_agreed: agree.privacy,
            marketing_agreed: agree.marketing,
            ad_email_agreed: agree.adEmail,
            ad_sms_agreed: agree.adSms,
          },
        },
      });
      if (error) throw error;
      if (data.session) navigate({ to: "/mypage" });
      else setEmailSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "가입 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  if (emailSent) {
    return (
      <p className="mt-10 rounded-sm border border-primary bg-secondary/60 p-6 text-center text-sm leading-7">
        입력하신 이메일로 인증 메일을 보냈습니다.
        <br />
        메일의 링크를 눌러 가입을 완료해 주세요.
      </p>
    );
  }

  return (
    <form className="mt-10 space-y-10" onSubmit={submit}>
      <div className="border-t border-border">
        <div className={rowClass}>
          <span className={labelClass}>이름</span>
          <input required className={inputClass} value={form.name} onChange={set("name")} placeholder="홍길동" />
        </div>
        <div className={rowClass}>
          <span className={labelClass}>아이디</span>
          <input
            required
            className={inputClass}
            value={form.username}
            onChange={set("username")}
            placeholder="영문·숫자 4~20자"
            autoComplete="username"
          />
        </div>
        <div className={rowClass}>
          <span className={labelClass}>비밀번호</span>
          <input
            required
            type="password"
            minLength={6}
            className={inputClass}
            value={form.password}
            onChange={set("password")}
            placeholder="6자 이상"
            autoComplete="new-password"
          />
        </div>
        <div className={rowClass}>
          <span className={labelClass}>비밀번호 확인</span>
          <input
            required
            type="password"
            minLength={6}
            className={inputClass}
            value={form.password2}
            onChange={set("password2")}
            autoComplete="new-password"
          />
        </div>
        <div className={rowClass}>
          <span className={labelClass}>이메일</span>
          <input
            required
            type="email"
            className={inputClass}
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
          />
        </div>
        <div className={rowClass}>
          <span className={labelClass}>휴대폰번호</span>
          <input
            required
            className={inputClass}
            value={form.phone}
            onChange={set("phone")}
            placeholder="010-0000-0000"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={agree.age14}
            onChange={(e) => setAgree({ ...agree, age14: e.target.checked })}
          />
          만 14세 이상입니다. (필수)
        </label>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          * 회원가입에 필요한 최소한의 정보만 입력 받음으로써 고객님의 개인정보 수집을 최소화하고
          <br />
          편리한 회원가입을 제공합니다.
        </p>
      </div>

      <section>
        <h2 className="text-sm font-semibold">이용약관</h2>
        <div className="mt-2 h-48 overflow-auto whitespace-pre-line rounded-sm border border-border bg-card p-4 text-xs leading-6 text-muted-foreground">
          {TERMS_OF_SERVICE}
        </div>
        <label className="mt-2 flex items-center justify-end gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree.terms}
            onChange={(e) => setAgree({ ...agree, terms: e.target.checked })}
          />
          위의 <b>‘이용약관’</b>에 동의합니다.
        </label>
      </section>

      <section>
        <h2 className="text-sm font-semibold">[필수] 개인정보 수집·이용 동의</h2>
        <table className="mt-3 w-full border-collapse text-center text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="border border-border p-2">목적</th>
              <th className="border border-border p-2">항목</th>
              <th className="border border-border p-2">보유기간</th>
              <th className="border border-border p-2">동의</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">회원제 서비스 이용 / 본인확인</td>
              <td className="border border-border p-2">이름, 아이디, 비밀번호, 이메일, 휴대 전화</td>
              <td className="border border-border p-2 font-semibold">회원 탈퇴 후 즉시</td>
              <td className="border border-border p-2">
                <input
                  type="checkbox"
                  checked={agree.privacy}
                  onChange={(e) => setAgree({ ...agree, privacy: e.target.checked })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          * 서비스 제공을 위한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold">[선택] 개인정보 수집·이용 동의</h2>
        <table className="mt-3 w-full border-collapse text-center text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="border border-border p-2">목적</th>
              <th className="border border-border p-2">항목</th>
              <th className="border border-border p-2">보유기간</th>
              <th className="border border-border p-2">동의</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">마케팅 활용(이벤트, 맞춤형 광고)</td>
              <td className="border border-border p-2">휴대폰, 이메일, 쿠키정보</td>
              <td className="border border-border p-2 font-semibold">회원 탈퇴 후 즉시</td>
              <td className="border border-border p-2">
                <input
                  type="checkbox"
                  checked={agree.marketing}
                  onChange={(e) => setAgree({ ...agree, marketing: e.target.checked })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          * 동의하지 않으셔도 쇼핑몰 서비스는 이용하실 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold">[선택] 광고성 정보 수신 동의</h2>
        <table className="mt-3 w-full border-collapse text-center text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="border border-border p-2">수신</th>
              <th className="border border-border p-2">목적</th>
              <th className="border border-border p-2">항목</th>
              <th className="border border-border p-2">보유기간</th>
              <th className="border border-border p-2">동의</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">이메일</td>
              <td className="border border-border p-2 font-semibold">마케팅 및 광고 활용을 위한 정보 수신 동의</td>
              <td className="border border-border p-2">이메일</td>
              <td className="border border-border p-2 font-semibold">철회 후 즉시</td>
              <td className="border border-border p-2">
                <input
                  type="checkbox"
                  checked={agree.adEmail}
                  onChange={(e) => setAgree({ ...agree, adEmail: e.target.checked })}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2">SMS</td>
              <td className="border border-border p-2 font-semibold">마케팅 및 광고 활용을 위한 정보 수신 동의</td>
              <td className="border border-border p-2">휴대 전화</td>
              <td className="border border-border p-2 font-semibold">철회 후 즉시</td>
              <td className="border border-border p-2">
                <input
                  type="checkbox"
                  checked={agree.adSms}
                  onChange={(e) => setAgree({ ...agree, adSms: e.target.checked })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          * 동의하지 않으셔도 쇼핑몰 서비스는 이용하실 수 있습니다.
        </p>
      </section>

      <button
        type="submit"
        disabled={busy}
        className="mx-auto block w-full max-w-[620px] bg-foreground px-8 py-4 text-sm font-bold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        동의하고 가입하기
      </button>
    </form>
  );
}
