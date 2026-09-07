import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "자주 묻는 질문 | JUNCO CLASSIC 한국" },
      { name: "description", content: "비누 사용법, 보관법, 배송과 교환에 대한 자주 묻는 질문입니다." },
      { property: "og:title", content: "자주 묻는 질문 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "사용법·보관법·배송·교환 안내." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[820px] px-4 py-16">
        <SectionHeading title="자주 묻는 질문" sub="FAQ" />
        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : (
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {(data ?? []).map((f) => {
              const isOpen = open === f.id;
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-medium">{f.question}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <p className="pb-5 text-sm leading-7 text-foreground/80">{f.answer}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
