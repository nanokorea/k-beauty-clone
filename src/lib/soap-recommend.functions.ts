import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CARE_GOALS, SKIN_TYPES, type SoapRecommendationResult } from "./soap-recommend";

const inputSchema = z.object({
  skinType: z.enum(SKIN_TYPES),
  goals: z.array(z.enum(CARE_GOALS)).min(1, "원하는 관리 효과를 하나 이상 선택해 주세요.").max(CARE_GOALS.length),
  note: z.string().trim().max(300).nullable(),
});

export const recommendSoap = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<SoapRecommendationResult> => {
    const { getRequest } = await import("@tanstack/react-start/server");
    const { runSoapRecommendation } = await import("./soap-recommend.server");
    return runSoapRecommendation({ ...data, note: data.note || null }, getRequest()?.signal);
  });
