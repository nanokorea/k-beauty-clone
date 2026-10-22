import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { products } from "@/data/site";
import { CARE_GOALS, SKIN_TYPES, type SoapRecommendationResult } from "@/lib/soap-recommend";
import { recommendSoap } from "@/lib/soap-recommend.functions";

export const Route = createFileRoute("/recommend")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "나에게 맞는 EI비누 찾기 | JUNCO CLASSIC 한국" },
      { name: "description", content: "피부 타입과 원하는 관리 효과를 고르면 나에게 맞는 JUNCO CLASSIC 미용비누를 이유와 함께 추천해 드립니다." },
      { property: "og:title", content: "나에게 맞는 EI비누 찾기 | JUNCO CLASSIC 한국" },
      { property: "og:description", content: "피부 타입과 관리 효과로 찾는 맞춤 JUNCO CLASSIC 비누 추천." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RecommendPage,
});

const chipBase = "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const chipOn = "border-primary bg-primary text-primary-foreground";
const chipOff = "border-border bg-secondary text-foreground hover:border-primary/60";

function RecommendPage() {
  const recommend = useServerFn(recommendSoap);
  const [skinType, setSkinType] = useState<(typeof SKIN_TYPES)[number] | null>(null);
  const [goals, setGoals] = useState<(typeof CARE_GOALS)[number][]>([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SoapRecommendationResult | null>(null);

  const toggleGoal = (g: (typeof CARE_GOALS)[number]) =>
    setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const canSubmit = !!skinType && goals.length > 0 && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skinType || goals.length === 0) return;
    setLoading(true);
    setResult(null);
    try {
      setResult(await recommend({ data: { skinType, goals, note: note.trim() || null } }));
    } catch {
      setResult({ ok: false, message: "추천 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-16">
        <SectionHeading title="나에게 맞는 EI비누 찾기" sub="SOAP FINDER" />
        <p className="mx-auto mt-6 max-w-[620px] text-center text-[15px] leading-7 text-foreground/80">
          피부 타입과 원하는 관리 효과를 골라 주세요. JUNCO CLASSIC 제품 중에서 잘 맞는 비누를 이유와 함께 추천해 드립니다.
        </p>

        <form onSubmit={onSubmit} className="mt-12 space-y-10 rounded-sm border border-border bg-card p-6 sm:p-10">
          <fieldset>
            <legend className="text-base font-semibold">1. 피부 타입</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKIN_TYPES.map((t) => (
                <button key={t} type="button" aria-pressed={skinType === t} onClick={() => setSkinType(t)} className={`${chipBase} ${skinType === t ? chipOn : chipOff}`}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-base font-semibold">2. 원하는 관리 효과 <span className="text-sm font-normal text-muted-foreground">(여러 개 선택 가능)</span></legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {CARE_GOALS.map((g) => (
                <button key={g} type="button" aria-pressed={goals.includes(g)} onClick={() => toggleGoal(g)} className={`${chipBase} ${goals.includes(g) ? chipOn : chipOff}`}>
                  {g}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="note" className="text-base font-semibold">3. 추가로 알려주실 고민 <span className="text-sm font-normal text-muted-foreground">(선택)</span></label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 300))}
              rows={3}
              placeholder="예: 세안 후 얼굴이 자주 땅겨요"
              className="mt-3 w-full rounded-sm border border-border bg-secondary px-4 py-3 text-sm focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">{note.length}/300</p>
          </div>

          <div className="text-center">
            <Button type="submit" size="lg" disabled={!canSubmit} className="min-w-48">
              {loading ? <><Loader2 className="size-4 animate-spin" /> 추천을 고르는 중…</> : <><Sparkles className="size-4" /> 추천 받기</>}
            </Button>
          </div>
        </form>

        {result && !result.ok ? (
          <p role="alert" className="mt-8 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
            {result.message}
          </p>
        ) : null}

        {result && result.ok ? (
          <section aria-live="polite" className="mt-14">
            <h2 className="text-center text-xl font-semibold">추천 제품</h2>
            <ol className="mt-8 space-y-6">
              {result.recommendations.map((r, i) => {
                const p = products.find((x) => x.slug === r.slug);
                if (!p) return null;
                return (
                  <li key={r.slug} className="grid gap-5 rounded-sm border border-border bg-card p-5 sm:grid-cols-[220px_1fr]">
                    <img src={p.image} alt={p.name} className="aspect-[3/2] w-full rounded-sm object-cover" />
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-primary">추천 {i + 1}</p>
                      <h3 className="mt-1 text-lg font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.sub}</p>
                      <p className="mt-3 text-[15px] leading-7 text-foreground/85">{r.reason}</p>
                      <Button asChild variant="outline" size="sm" className="mt-4">
                        <Link to="/products/$slug" params={{ slug: p.slug }}>제품 자세히 보기</Link>
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ol>
            {result.tip ? <p className="mt-8 rounded-sm bg-secondary px-5 py-4 text-sm leading-7 text-foreground/85">💡 {result.tip}</p> : null}
            <p className="mt-4 text-center text-xs text-muted-foreground">AI 추천은 참고용입니다. 피부에 이상이 있으면 사용을 중단하고 전문의와 상담해 주세요.</p>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
