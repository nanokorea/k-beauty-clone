import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Baby,
  Check,
  CircleHelp,
  DropletOff,
  Droplet,
  Droplets,
  Gem,
  Heart,
  Leaf,
  Lightbulb,
  Microscope,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  Sparkles,
  WandSparkles,
  Wind,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/data/site";
import { CARE_GOALS, SKIN_TYPES, type SoapRecommendationResult } from "@/lib/soap-recommend";
import { recommendSoap } from "@/lib/soap-recommend.functions";
import { cn } from "@/lib/utils";

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

type SkinType = (typeof SKIN_TYPES)[number];
type Goal = (typeof CARE_GOALS)[number];
type Icon = ComponentType<{ className?: string }>;
type Tone = "honey" | "sage" | "rose" | "earth";

const toneBg: Record<Tone, string> = {
  honey: "bg-finder-honey-soft text-finder-honey",
  sage: "bg-finder-sage-soft text-finder-sage",
  rose: "bg-finder-rose-soft text-finder-rose",
  earth: "bg-finder-ecru text-finder-earth",
};

const SKIN_META: Record<SkinType, { icon: Icon; desc: string; tone: Tone }> = {
  건성: { icon: DropletOff, desc: "수분 부족 · 세안 후 당김", tone: "honey" },
  지성: { icon: Droplet, desc: "유분 많음 · 번들거림", tone: "sage" },
  복합성: { icon: SlidersHorizontal, desc: "T존 유분 · U존 건조", tone: "earth" },
  민감성: { icon: ShieldCheck, desc: "쉽게 붉어짐 · 자극에 예민", tone: "rose" },
  중성: { icon: Smile, desc: "유수분 균형이 좋은 편", tone: "sage" },
  "잘 모르겠어요": { icon: CircleHelp, desc: "함께 찾아볼게요", tone: "earth" },
};

const GOAL_META: Record<Goal, { icon: Icon; tone: Tone }> = {
  "촉촉한 보습": { icon: Droplets, tone: "sage" },
  "피지·노폐물 세정": { icon: Sparkles, tone: "earth" },
  "탄력·피부 나이 케어": { icon: WandSparkles, tone: "honey" },
  "맑고 고운 피부결": { icon: Gem, tone: "rose" },
  "순하고 자극 적은 세안": { icon: Leaf, tone: "sage" },
  "땀·체취 케어(전신)": { icon: Wind, tone: "earth" },
  "아기·임산부 사용": { icon: Baby, tone: "rose" },
};

const QUICK_CONCERNS = [
  { label: "세안 후 당김", text: "세안 후 얼굴이 자주 당겨요" },
  { label: "모공·피지", text: "T존 모공과 피지가 고민이에요" },
  { label: "붉은기·자극", text: "작은 자극에도 피부가 쉽게 붉어져요" },
  { label: "칙칙한 피부결", text: "피부결이 거칠고 칙칙해 보여요" },
  { label: "땀 냄새", text: "땀 냄새와 체취가 신경 쓰여요" },
];

const LOADING_STEPS = ["선택하신 피부 타입을 살펴보고 있어요", "관리 효과와 제품 특징을 맞춰보고 있어요", "추천 이유를 정리하고 있어요"];

const NOTE_MAX = 300;

function StepTitle({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="flex size-8 items-center justify-center rounded-full bg-finder-ecru font-display text-sm font-bold text-finder-earth-deep ring-1 ring-finder-line">
        {n}
      </span>
      <span className="text-lg font-bold text-finder-ink sm:text-xl">{title}</span>
      {hint ? <span className="text-xs font-medium text-finder-rose">{hint}</span> : null}
    </div>
  );
}

function RecommendPage() {
  const recommend = useServerFn(recommendSoap);
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<SoapRecommendationResult | null>(null);
  const [submitted, setSubmitted] = useState<{ skinType: SkinType; goals: Goal[] } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const toggleGoal = (g: Goal) => setGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const addConcern = (text: string) =>
    setNote((prev) => (prev.includes(text) ? prev : (prev.trim() ? `${prev.trim()}, ${text}` : text).slice(0, NOTE_MAX)));

  useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);
    const id = window.setInterval(() => setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 1800);
    return () => window.clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (loading || result) outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loading, result]);

  const canSubmit = !!skinType && goals.length > 0 && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skinType || goals.length === 0) return;
    setLoading(true);
    setResult(null);
    setSubmitted({ skinType, goals });
    try {
      setResult(await recommend({ data: { skinType, goals, note: note.trim() || null } }));
    } catch {
      setResult({ ok: false, message: "추천 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setResult(null);
    setSubmitted(null);
    setSkinType(null);
    setGoals([]);
    setNote("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-finder-ecru">
      <SiteHeader />
      <main className="relative overflow-hidden">
        {/* soft soap-bubble glows */}
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-16 size-96 rounded-full bg-finder-sage-soft blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-[-6rem] top-[28rem] size-80 rounded-full bg-finder-rose-soft blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-finder-honey-soft blur-3xl" />

        <div className="relative mx-auto max-w-[900px] px-4 py-14 sm:py-20">
          {/* Intro */}
          <section className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-finder-cream px-4 py-1.5 text-xs font-medium tracking-wide text-finder-earth-deep shadow-finder-lift ring-1 ring-finder-line sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-finder-sage opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-finder-sage" />
              </span>
              SOAP FINDER · 1:1 맞춤 추천
            </span>
            <h1 className="mt-5 text-3xl leading-tight text-finder-ink sm:text-4xl md:text-5xl">
              나에게 맞는 <span className="font-display italic text-finder-earth">EI비누</span> 찾기
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-finder-ink/75">
              피부 타입과 원하는 관리 효과를 골라 주세요. JUNCO CLASSIC 제품 중에서 잘 맞는 비누를 이유와 함께 추천해 드립니다.
            </p>
          </section>

          {/* Questionnaire */}
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="mt-12 scroll-mt-28 space-y-12 rounded-[2rem] bg-finder-cream/90 p-6 shadow-finder-soft ring-1 ring-finder-line backdrop-blur sm:p-10"
          >
            <fieldset>
              <legend className="w-full">
                <StepTitle n={1} title="피부 타입을 선택해 주세요" hint="* 필수" />
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {SKIN_TYPES.map((t) => {
                  const { icon: IconCmp, desc, tone } = SKIN_META[t];
                  const on = skinType === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSkinType(t)}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finder-earth",
                        on
                          ? "border-finder-earth bg-finder-ecru shadow-finder-lift ring-2 ring-finder-earth/30"
                          : "border-finder-line bg-finder-cream hover:border-finder-earth/50 hover:shadow-finder-lift",
                      )}
                    >
                      {on ? (
                        <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-finder-earth text-finder-on-deep">
                          <Check className="size-2.5" />
                        </span>
                      ) : null}
                      <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", toneBg[tone])}>
                        <IconCmp className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-finder-ink">{t}</span>
                        <span className="block text-[11px] leading-tight text-finder-ink/55">{desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="w-full">
                <StepTitle n={2} title="원하는 관리 효과를 선택해 주세요" hint="여러 개 선택 가능" />
              </legend>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {CARE_GOALS.map((g) => {
                  const { icon: IconCmp, tone } = GOAL_META[g];
                  const on = goals.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleGoal(g)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border py-2 pl-2 pr-4 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finder-earth",
                        on
                          ? "border-finder-earth-deep bg-finder-earth-deep text-finder-on-deep shadow-finder-lift"
                          : "border-finder-line bg-finder-cream text-finder-ink hover:border-finder-earth/50 hover:bg-finder-ecru",
                      )}
                    >
                      <span className={cn("flex size-7 items-center justify-center rounded-full", on ? "bg-finder-on-deep/15 text-finder-on-deep" : toneBg[tone])}>
                        {on ? <Check className="size-3.5" /> : <IconCmp className="size-3.5" />}
                      </span>
                      {g}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="note" className="block">
                <StepTitle n={3} title="추가로 알려주실 피부 고민이 있나요?" hint="선택" />
              </label>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1 text-xs text-finder-ink/60">
                  <Lightbulb className="size-3.5 text-finder-honey" /> 자주 찾는 고민
                </span>
                {QUICK_CONCERNS.map((c) => {
                  const used = note.includes(c.text);
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => addConcern(c.text)}
                      disabled={used}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finder-earth",
                        used
                          ? "border-finder-sage/40 bg-finder-sage-soft text-finder-sage"
                          : "border-finder-line bg-finder-ecru text-finder-ink/80 hover:border-finder-rose/60 hover:bg-finder-rose-soft",
                      )}
                    >
                      {used ? "✓" : "+"} {c.label}
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
                  rows={3}
                  placeholder="예: 환절기마다 볼이 건조해지고, 세안 후 당김 없이 촉촉했으면 좋겠어요."
                  className="w-full resize-none rounded-2xl border border-finder-line bg-finder-ecru px-4 pb-8 pt-4 text-sm text-finder-ink placeholder:text-finder-ink/35 transition-colors focus:bg-finder-cream focus:outline-none focus:ring-2 focus:ring-finder-earth/50"
                />
                <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-finder-ink/40">
                  {note.length}/{NOTE_MAX}
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "mx-auto flex w-full items-center justify-center gap-2.5 rounded-2xl bg-finder-earth px-10 py-4 text-base font-medium text-finder-on-deep transition-all duration-300 hover:bg-finder-earth-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finder-earth focus-visible:ring-offset-2 sm:w-auto sm:text-lg",
                  canSubmit ? "finder-glow" : "cursor-not-allowed opacity-50",
                )}
              >
                <Sparkles className="size-5" />
                {loading ? "추천을 고르는 중…" : "AI 맞춤 비누 추천받기"}
              </button>
              {!skinType || goals.length === 0 ? (
                <p className="mt-3 text-xs text-finder-ink/50">피부 타입과 관리 효과를 하나 이상 골라 주세요.</p>
              ) : null}
            </div>
          </form>

          <div ref={outputRef} className="scroll-mt-28" data-reveal-managed>
            {loading ? <LoadingCard step={loadingStep} /> : null}

            {result && !result.ok ? (
              <p role="alert" className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-center text-sm text-destructive">
                {result.message}
              </p>
            ) : null}

            {result && result.ok && submitted ? <ResultView result={result} submitted={submitted} onReset={onReset} /> : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function LoadingCard({ step }: { step: number }) {
  return (
    <div role="status" className="finder-rise mt-12 rounded-[2rem] bg-finder-cream/90 px-6 py-14 text-center shadow-finder-soft ring-1 ring-finder-line backdrop-blur">
      <div className="relative mx-auto mb-7 size-20">
        <div className="absolute inset-0 rounded-full border-4 border-finder-line border-t-finder-earth motion-safe:animate-spin" />
        <div className="absolute inset-3 rounded-full bg-finder-ecru" />
        <Droplets className="absolute inset-0 m-auto size-7 text-finder-earth motion-safe:animate-bounce" />
      </div>
      <p className="text-xl font-bold text-finder-ink">피부 조건에 맞는 비누를 찾고 있어요</p>
      <ul className="mx-auto mt-5 max-w-xs space-y-2 text-left text-sm">
        {LOADING_STEPS.map((s, i) => (
          <li key={s} className={cn("flex items-center gap-2 transition-colors duration-500", i <= step ? "text-finder-ink/80" : "text-finder-ink/30")}>
            <span className={cn("flex size-4 shrink-0 items-center justify-center rounded-full", i < step ? "bg-finder-sage text-finder-on-deep" : i === step ? "bg-finder-earth/20" : "bg-finder-line")}>
              {i < step ? <Check className="size-2.5" /> : i === step ? <span className="size-1.5 rounded-full bg-finder-earth motion-safe:animate-pulse" /> : null}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function KeyTags({ tags, tone = "earth" }: { tags: string[]; tone?: Tone }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((k) => (
        <span key={k} className={cn("rounded-full px-3 py-1 text-xs font-medium", toneBg[tone])}>
          #{k}
        </span>
      ))}
    </div>
  );
}

function ResultView({
  result,
  submitted,
  onReset,
}: {
  result: Extract<SoapRecommendationResult, { ok: true }>;
  submitted: { skinType: SkinType; goals: Goal[] };
  onReset: () => void;
}) {
  const items = result.recommendations
    .map((r) => ({ rec: r, product: products.find((p) => p.slug === r.slug) }))
    .filter((x): x is { rec: typeof x.rec; product: NonNullable<typeof x.product> } => !!x.product);
  const [best, ...rest] = items;
  const SkinIcon = SKIN_META[submitted.skinType].icon;

  return (
    <section aria-live="polite" className="finder-rise mt-12 overflow-hidden rounded-[2rem] bg-finder-cream shadow-finder-soft ring-1 ring-finder-line">
      {/* Header */}
      <div className="relative bg-finder-earth-deep px-6 py-8 text-finder-on-deep sm:px-10 sm:py-10">
        <span aria-hidden className="pointer-events-none absolute right-6 top-4 font-display text-6xl font-bold tracking-widest opacity-10 sm:text-7xl">
          JUNCO
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-finder-on-deep/10 px-3 py-1 text-xs ring-1 ring-finder-on-deep/20">
          <Check className="size-3.5" /> 분석 완료
        </span>
        <h2 className="mt-3 text-2xl text-finder-on-deep sm:text-3xl">고객님을 위한 맞춤 비누</h2>
        <p className="mt-2 max-w-xl text-sm text-finder-on-deep/75">선택하신 피부 조건과 고민을 바탕으로 JUNCO CLASSIC 제품 중에서 골랐어요.</p>
      </div>

      <div className="space-y-8 p-6 sm:p-10">
        {/* Skin analysis */}
        <div className="rounded-3xl bg-finder-sage-soft/70 p-5 ring-1 ring-finder-sage/20 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-bold text-finder-ink">
            <ScanFace className="size-4 text-finder-sage" /> 피부 타입 분석
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-finder-cream px-3 py-1 text-xs font-semibold text-finder-ink ring-1 ring-finder-line">
              <SkinIcon className="size-3.5 text-finder-sage" /> {submitted.skinType}
            </span>
            {submitted.goals.map((g) => (
              <span key={g} className="rounded-full bg-finder-cream/70 px-3 py-1 text-xs text-finder-ink/75">
                {g}
              </span>
            ))}
          </div>
          {result.analysis ? <p className="mt-3 text-[15px] leading-7 text-finder-ink/85">{result.analysis}</p> : null}
        </div>

        {/* Best match */}
        {best ? (
          <article className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <div className="group relative overflow-hidden rounded-3xl bg-finder-ecru ring-1 ring-finder-line">
                <img src={best.product.image} alt={best.product.name} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-finder-sage px-3 py-1 text-[11px] font-bold tracking-wider text-finder-on-deep shadow-finder-lift">
                  BEST MATCH
                </span>
              </div>
            </div>
            <div className="space-y-4 md:col-span-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-finder-earth">추천 1 · Recommended Soap</p>
                <h3 className="mt-1 text-2xl text-finder-ink">{best.product.name}</h3>
                <p className="text-sm text-finder-ink/55">{best.product.sub}</p>
              </div>
              <KeyTags tags={best.rec.keyPoints} />
              <div className="rounded-2xl bg-finder-ecru p-4 ring-1 ring-finder-line sm:p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-finder-ink">
                  <Microscope className="size-4 text-finder-earth" /> 추천 이유
                </p>
                <p className="text-sm leading-7 text-finder-ink/85">{best.rec.reason}</p>
              </div>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Link
                  to="/products/$slug"
                  params={{ slug: best.product.slug }}
                  className="flex-1 rounded-xl bg-finder-earth-deep px-6 py-3 text-center text-sm font-medium text-finder-on-deep transition-colors hover:bg-finder-ink"
                >
                  제품 자세히 보기
                </Link>
                <button
                  type="button"
                  onClick={onReset}
                  className="flex items-center justify-center gap-2 rounded-xl border border-finder-line bg-finder-cream px-5 py-3 text-sm font-medium text-finder-ink transition-colors hover:bg-finder-ecru"
                >
                  <RotateCcw className="size-4" /> 다시 해보기
                </button>
              </div>
            </div>
          </article>
        ) : null}

        {/* Other matches */}
        {rest.length > 0 ? (
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-finder-ink">
              <Heart className="size-4 text-finder-rose" /> 함께 잘 맞는 비누
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map(({ rec, product }, i) => (
                <article key={rec.slug} className="flex flex-col overflow-hidden rounded-3xl bg-finder-cream ring-1 ring-finder-line transition-shadow hover:shadow-finder-lift">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="aspect-[3/2] w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-finder-cream/90 px-2.5 py-1 text-[11px] font-bold text-finder-earth-deep">추천 {i + 2}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h3 className="text-lg text-finder-ink">{product.name}</h3>
                      <p className="text-xs text-finder-ink/55">{product.sub}</p>
                    </div>
                    <KeyTags tags={rec.keyPoints} tone={i === 0 ? "rose" : "sage"} />
                    <p className="flex-1 text-sm leading-7 text-finder-ink/80">{rec.reason}</p>
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="self-start rounded-full border border-finder-line px-4 py-1.5 text-xs font-medium text-finder-ink transition-colors hover:bg-finder-ecru"
                    >
                      제품 자세히 보기
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {result.tip ? (
          <div className="flex gap-3 rounded-2xl bg-finder-honey-soft p-5 ring-1 ring-finder-honey/20">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-finder-honey" />
            <p className="text-sm leading-7 text-finder-ink/85">
              <span className="font-bold text-finder-ink">사용 팁 · </span>
              {result.tip}
            </p>
          </div>
        ) : null}

        <p className="text-center text-xs text-finder-ink/45">추천 결과는 참고용입니다. 피부에 이상이 있으면 사용을 중단하고 전문의와 상담해 주세요.</p>
      </div>
    </section>
  );
}
