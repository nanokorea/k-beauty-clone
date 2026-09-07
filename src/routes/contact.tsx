import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { contact } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "문의하기 | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content: "JUNCO CLASSIC 제품 및 유통 문의는 문의 폼 또는 전화로 연락해 주세요.",
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
            <form
              className="mt-10 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="block text-sm font-medium">
                이름
                <input required className={fieldClass} placeholder="홍길동" />
              </label>
              <label className="block text-sm font-medium">
                이메일
                <input required type="email" className={fieldClass} placeholder="you@example.com" />
              </label>
              <label className="block text-sm font-medium">
                연락처
                <input className={fieldClass} placeholder="010-0000-0000" />
              </label>
              <label className="block text-sm font-medium">
                문의 내용
                <textarea required rows={6} className={fieldClass} placeholder="문의하실 내용을 적어 주세요." />
              </label>
              <button
                type="submit"
                className="w-full rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
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
