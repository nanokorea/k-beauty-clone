import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, NoObjectGeneratedError, Output, jsonSchema, streamText } from "ai";
import { products } from "@/data/site";
import { createLovableAiGatewayRunIdFetch } from "./ai-run-id.server";
import {
  FLAGSHIP_SLUG,
  MAX_RECOMMENDATIONS,
  buildCatalog,
  ensureFlagship,
  normalizeRecommendations,
  type RawRecommendation,
  type SoapRecommendationInput,
  type SoapRecommendationResult,
} from "./soap-recommend";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

type ModelOutput = {
  analysis: string;
  recommendations: RawRecommendation[];
  flagshipReason: string;
  flagshipKeyPoints: string[];
  tip: string;
};

const keyPointsSchema = { type: "array", items: { type: "string" } } as const;

export async function runSoapRecommendation(input: SoapRecommendationInput, signal?: AbortSignal): Promise<SoapRecommendationResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { ok: false, message: "추천 기능 설정이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요." };

  const slugs = products.map((p) => p.slug);
  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const instructions = [
    "당신은 일본 수제 미용비누 브랜드 EI(이시노 에이이치)의 한국 공식 스토어 상담원입니다.",
    "아래 제품 목록에 있는 제품만 추천하세요. 목록에 없는 제품이나 성분을 지어내지 마세요.",
    `고객의 피부 타입과 원하는 관리 효과에 가장 잘 맞는 제품을 1~${MAX_RECOMMENDATIONS}개, 잘 맞는 순서대로 고르세요.`,
    `JUNCO CLASSIC SOAP(slug: ${FLAGSHIP_SLUG})은 브랜드의 대표 제품으로, 민감한 피부부터 피부 나이가 신경 쓰이는 분까지 폭넓게 맞는 기본 세안 비누입니다. 고객 조건에 특별히 맞지 않는 이유가 없다면 가능한 한 추천 목록에 포함하고, 비슷하게 맞는 제품이 있다면 JUNCO CLASSIC SOAP을 더 앞 순서에 두세요.`,
    "JUNCO CLASSIC Pure Collagen은 고객이 탄력·피부 나이 케어나 강한 보습을 분명히 원할 때 위주로 추천하고, 단순 보습이나 순한 세안만 원할 때 습관적으로 1순위에 두지 마세요.",
    "analysis에는 고객이 고른 피부 타입·관리 효과·고민을 바탕으로 세안 시 신경 쓸 점을 한국어 2~3문장으로 따뜻하게 정리하세요. 진단처럼 단정하지 마세요.",
    "reason에는 고객 조건과 제품 특징을 연결해 왜 맞는지 한국어 2~3문장으로 친절하게 설명하세요.",
    "keyPoints에는 제품 목록의 소개·특징에 실제로 적힌 성분이나 특징만 골라 2~3개의 짧은 한국어 키워드(각 12자 이내, # 없이)로 쓰세요. 목록에 없는 성분은 쓰지 마세요.",
    "flagshipReason에는 이 고객에게 JUNCO CLASSIC SOAP이 어떤 점에서 도움이 되는지 한국어 2~3문장으로 써 주세요. recommendations에 이미 포함했어도 반드시 작성하세요. flagshipKeyPoints도 같은 규칙으로 작성하세요.",
    "질병 치료·완치·의학적 효능을 약속하지 말고, 화장품 비누로서의 사용감과 특징 위주로 설명하세요.",
    "tip에는 거품망으로 충분히 거품을 내 부드럽게 세안하는 등 사용 팁을 한국어 1~2문장으로 쓰고, 피부 질환이 있으면 전문의와 상담하라는 안내를 덧붙이세요.",
    "",
    "[제품 목록]",
    buildCatalog(products),
  ].join("\n");

  const userText = [
    `피부 타입: ${input.skinType}`,
    `원하는 관리 효과: ${input.goals.join(", ")}`,
    input.note ? `추가 고민: ${input.note}` : "추가 고민: 없음",
  ].join("\n");

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      instructions,
      messages: [{ role: "user", content: userText }],
      ...(signal ? { abortSignal: signal } : {}),
      maxRetries: 0,
      output: Output.object({
        schema: jsonSchema<ModelOutput>({
          type: "object",
          additionalProperties: false,
          required: ["analysis", "recommendations", "flagshipReason", "flagshipKeyPoints", "tip"],
          properties: {
            analysis: { type: "string" },
            recommendations: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["slug", "reason", "keyPoints"],
                properties: { slug: { type: "string", enum: slugs }, reason: { type: "string" }, keyPoints: keyPointsSchema },
              },
            },
            flagshipReason: { type: "string" },
            flagshipKeyPoints: keyPointsSchema,
            tip: { type: "string" },
          },
        }),
      }),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const output = await result.output;
    const recommendations = ensureFlagship(
      normalizeRecommendations(output.recommendations ?? [], slugs),
      output.flagshipReason ?? "",
      output.flagshipKeyPoints ?? [],
    );
    if (recommendations.length === 0) return { ok: false, message: "추천 결과를 만들지 못했습니다. 조건을 바꿔 다시 시도해 주세요." };
    return { ok: true, analysis: (output.analysis ?? "").trim(), recommendations, tip: (output.tip ?? "").trim() };
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      return { ok: false, message: "추천 결과를 만들지 못했습니다. 다시 시도해 주세요." };
    }
    if (APICallError.isInstance(error)) {
      console.error("soap recommendation gateway error", error.statusCode, error.message);
      if (error.statusCode === 429) return { ok: false, message: "요청이 많아 잠시 후 다시 시도해 주세요." };
      if (error.statusCode === 402 || error.statusCode === 403) return { ok: false, message: "지금은 추천 기능을 사용할 수 없습니다. 잠시 후 다시 시도해 주세요." };
    } else {
      console.error("soap recommendation error", error);
    }
    return { ok: false, message: "추천 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
