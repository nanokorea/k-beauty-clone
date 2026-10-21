import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, NoObjectGeneratedError, Output, jsonSchema, streamText } from "ai";
import { products } from "@/data/site";
import { createLovableAiGatewayRunIdFetch } from "./ai-run-id.server";
import {
  MAX_RECOMMENDATIONS,
  buildCatalog,
  normalizeRecommendations,
  type RawRecommendation,
  type SoapRecommendationInput,
  type SoapRecommendationResult,
} from "./soap-recommend";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

type ModelOutput = { recommendations: RawRecommendation[]; tip: string };

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
    "reason에는 고객 조건과 제품 특징을 연결해 왜 맞는지 한국어 2~3문장으로 친절하게 설명하세요.",
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
      abortSignal: signal,
      maxRetries: 0,
      output: Output.object({
        schema: jsonSchema<ModelOutput>({
          type: "object",
          additionalProperties: false,
          required: ["recommendations", "tip"],
          properties: {
            recommendations: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["slug", "reason"],
                properties: { slug: { type: "string", enum: slugs }, reason: { type: "string" } },
              },
            },
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
    const recommendations = normalizeRecommendations(output.recommendations ?? [], slugs);
    if (recommendations.length === 0) return { ok: false, message: "추천 결과를 만들지 못했습니다. 조건을 바꿔 다시 시도해 주세요." };
    return { ok: true, recommendations, tip: (output.tip ?? "").trim() };
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
