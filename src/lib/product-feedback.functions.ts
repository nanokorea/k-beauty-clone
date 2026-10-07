import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { products } from "@/data/site";
import type { Database } from "@/integrations/supabase/types";

const slugSchema = z.string().max(150).refine((slug) => products.some((p) => p.slug === slug), "상품을 찾을 수 없습니다.");
export const feedbackSchema = z.object({
  productSlug: slugSchema,
  kind: z.enum(["review", "question"]),
  title: z.string().trim().min(1, "제목을 입력해 주세요.").max(100),
  content: z.string().trim().min(1, "내용을 입력해 주세요.").max(3000),
  rating: z.number().int().min(1).max(5).nullable(),
}).refine((v) => v.kind === "review" ? v.rating !== null : v.rating === null, "별점을 선택해 주세요.");

export const listProductFeedback = createServerFn({ method: "GET" })
  .inputValidator(z.object({ productSlug: slugSchema }))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) throw new Error("후기를 불러올 수 없습니다.");
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data: rows, error } = await client.from("product_feedback")
      .select("id,product_slug,kind,title,content,author_label,rating,created_at")
      .eq("product_slug", data.productSlug).order("created_at", { ascending: false });
    if (error) throw new Error("후기와 질문을 불러오지 못했습니다.");
    return rows ?? [];
  });

export const createProductFeedback = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(feedbackSchema)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("product_feedback").insert({
      product_slug: data.productSlug, kind: data.kind, title: data.title,
      content: data.content, rating: data.rating, user_id: context.userId, author_label: "회원",
    });
    if (error) throw new Error(error.message.includes("잠시 후") ? "잠시 후 다시 등록해 주세요." : "등록하지 못했습니다. 다시 시도해 주세요.");
    return { ok: true };
  });