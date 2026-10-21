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

export type SoapRecommendationInput = {
  skinType: string;
  goals: string[];
  note: string | null;
};

export type RawRecommendation = { slug: string; reason: string };

export type SoapRecommendation = { slug: string; reason: string };

export type SoapRecommendationResult =
  | { ok: true; recommendations: SoapRecommendation[]; tip: string }
  | { ok: false; message: string };

/** 모델에 전달할 제품 정보(이 사이트에 등록된 내용만 사용). */
export function buildCatalog(items: Product[]): string {
  return items
    .map((p) => [`- slug: ${p.slug}`, `  이름: ${p.name} (${p.sub})`, `  소개: ${p.summary}`, ...p.body.map((b) => `  특징: ${b}`)].join("\n"))
    .join("\n");
}

/** 등록된 제품만, 중복 없이, 최대 3개까지 남깁니다. */
export function normalizeRecommendations(raw: RawRecommendation[], validSlugs: string[]): SoapRecommendation[] {
  const seen = new Set<string>();
  const out: SoapRecommendation[] = [];
  for (const r of raw) {
    const reason = r.reason?.trim();
    if (!validSlugs.includes(r.slug) || seen.has(r.slug) || !reason) continue;
    seen.add(r.slug);
    out.push({ slug: r.slug, reason });
    if (out.length >= MAX_RECOMMENDATIONS) break;
  }
  return out;
}
