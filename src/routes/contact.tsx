import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { contact } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "문의하기 | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content: "JUNCO CLASSIC 제품 구매 및 유통 문의는 문의 폼 또는 전화로 연락해 주세요.",
      },
      { property: "og:title", content: "문의하기 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "제품 및 유통 문의 안내." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from("inquiries").insert({
      ...form,
      user_id: userData.user?.id ?? null,
    });
    setBusy(false);
    if (error) {
      toast.error("문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title="문의하기" sub="Contact" />
        <div className="mx-auto mt-12 max-w-[720px] px-4">
          <div className="rounded-sm border border-border bg-card p-6 text-center">
            <p className="text-3xl font-semibold text-primary">{contact.phone}</p>
            <p className="mt-2 text-xs text-muted-foreground">{contact.hours}</p>
          </div>

          {sent ? (
            <p className="mt-10 rounded-sm border border-primary bg-secondary/60 p-6 text-center text-sm">
              문의가 접수되었습니다. 영업일 기준 3일 이내에 담당자가 연락드립니다.
            </p>
          ) : (
            <form className="mt-10 space-y-5" onSubmit={submit}>
              <label className="block text-sm font-medium">
                이름
                <input
                  required
                  className={fieldClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="홍길동"
                />
              </label>
              <label className="block text-sm font-medium">
                이메일
                <input
                  required
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </label>
              <label className="block text-sm font-medium">
                연락처
                <input
                  className={fieldClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="010-0000-0000"
                />
              </label>
              <label className="block text-sm font-medium">
                회사/상호 (선택)
                <input
                  className={fieldClass}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </label>
              <label className="block text-sm font-medium">
                제목
                <input
                  className={fieldClass}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="예: 도매 문의"
                />
              </label>
              <label className="block text-sm font-medium">
                문의 내용
                <textarea
                  required
                  rows={6}
                  className={fieldClass}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="문의하실 내용을 적어 주세요."
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                문의 보내기
              </button>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
