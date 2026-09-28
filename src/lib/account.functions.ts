import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const usernameSchema = z
  .string()
  .trim()
  .min(4, "아이디는 4자 이상이어야 합니다.")
  .max(20, "아이디는 20자 이하여야 합니다.")
  .regex(/^[a-zA-Z0-9_]+$/, "아이디는 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.");

export const checkUsername = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string }) =>
    z.object({ username: z.string().max(100) }).parse(data),
  )
  .handler(async ({ data }) => {
    const parsed = usernameSchema.safeParse(data.username);
    if (!parsed.success) return { available: false, valid: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .ilike("username", parsed.data)
      .maybeSingle();
    if (error) throw new Error("아이디 확인 중 오류가 발생했습니다.");
    return { available: !row, valid: true };
  });

export const signInWithUsername = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) =>
    z
      .object({
        username: z.string().trim().min(1).max(64),
        password: z.string().min(1).max(200),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .ilike("username", data.username)
      .maybeSingle();

    const email = row?.email;
    if (!email) throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");

    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key },
      body: JSON.stringify({ email, password: data.password }),
    });
    if (!res.ok) throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    const session = (await res.json()) as { access_token: string; refresh_token: string };
    return { access_token: session.access_token, refresh_token: session.refresh_token };
  });

export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(context.userId);
    if (error) throw new Error("회원 탈퇴 처리 중 오류가 발생했습니다.");
    return { ok: true };
  });
