import type { Product } from "@/data/site";

export const SKIN_TYPES = ["건성", "지성", "복합성", "민감성", "중성", "잘 모르겠어요"] as const;

export const CARE_GOALS = [
  "촉촉한 보습",
  "피지·노폐물 세정",
  "탄력·피부 나이 케어",
  "맑고 고운 피부결",
  "순하고 자극 적은 세안",
  "땀·체취 케어(전신)",
  "아기·임산부 사용",
] as const;

export const MAX_RECOMMENDATIONS = 3;
export const MAX_KEY_POINTS = 3;

export type SoapRecommendationInput = {
  skinType: string;
  goals: string[];
  note: string | null;
};

export type RawRecommendation = { slug: string; reason: string; keyPoints?: string[] };

export type SoapRecommendation = { slug: string; reason: string; keyPoints: string[] };

export type SoapRecommendationResult =
  | { ok: true; analysis: string; recommendations: SoapRecommendation[]; tip: string }
  | { ok: false; message: string };

/** 모델에 전달할 제품 정보(이 사이트에 등록된 내용만 사용). */
export function buildCatalog(items: Product[]): string {
  return items
    .map((p) => [`- slug: ${p.slug}`, `  이름: ${p.name} (${p.sub})`, `  소개: ${p.summary}`, ...p.body.map((b) => `  특징: ${b}`)].join("\n"))
    .join("\n");
}

/** 특징 태그: 앞의 # 제거, 공백 정리, 빈 값·중복 제거, 최대 3개. */
export function normalizeKeyPoints(raw: string[] | undefined): string[] {
  const out: string[] = [];
  for (const k of raw ?? []) {
    const v = (k ?? "").replace(/^#+/, "").replace(/\s+/g, " ").trim();
    if (!v || out.includes(v)) continue;
    out.push(v);
    if (out.length >= MAX_KEY_POINTS) break;
  }
  return out;
}

/** 등록된 제품만, 중복 없이, 최대 3개까지 남깁니다. */
export function normalizeRecommendations(raw: RawRecommendation[], validSlugs: string[]): SoapRecommendation[] {
  const seen = new Set<string>();
  const out: SoapRecommendation[] = [];
  for (const r of raw) {
    const reason = r.reason?.trim();
    if (!validSlugs.includes(r.slug) || seen.has(r.slug) || !reason) continue;
    seen.add(r.slug);
    out.push({ slug: r.slug, reason, keyPoints: normalizeKeyPoints(r.keyPoints) });
    if (out.length >= MAX_RECOMMENDATIONS) break;
  }
  return out;
}

/** 대표 제품(JUNCO CLASSIC SOAP)의 slug. */
export const FLAGSHIP_SLUG = "junco-classic";

/**
 * 대표 제품이 추천 목록에 없으면 반드시 포함시킵니다.
 * 자리가 남으면 뒤에 추가하고, 3개가 꽉 차 있으면 마지막 추천을 대표 제품으로 바꿉니다.
 */
export function ensureFlagship(
  recs: SoapRecommendation[],
  flagshipReason: string,
  flagshipKeyPoints: string[] = [],
  flagshipSlug: string = FLAGSHIP_SLUG,
): SoapRecommendation[] {
  const reason = flagshipReason?.trim();
  if (recs.some((r) => r.slug === flagshipSlug) || !reason) return recs;
  const flagship = { slug: flagshipSlug, reason, keyPoints: normalizeKeyPoints(flagshipKeyPoints) };
  if (recs.length < MAX_RECOMMENDATIONS) return [...recs, flagship];
  return [...recs.slice(0, MAX_RECOMMENDATIONS - 1), flagship];
}
