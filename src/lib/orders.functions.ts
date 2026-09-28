import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const orderSchema = z.object({
  orderer_name: z.string().trim().min(1).max(50),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().max(255).optional().default(""),
  postcode: z.string().trim().max(20).optional().default(""),
  address: z.string().trim().min(1).max(300),
  address_detail: z.string().trim().max(300).optional().default(""),
  memo: z.string().trim().max(500).optional().default(""),
  payment_method: z.enum(["bank", "card", "kakao"]),
  points: z.number().int().min(0).max(100000000).default(0),
  items: z
    .array(z.object({ productId: z.string().uuid(), quantity: z.number().int().min(1).max(999) }))
    .min(1)
    .max(50),
});

// Places a member or guest order. Prices and point balance are verified on the server.
export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let userId: string | null = null;
    const auth = getRequestHeader("authorization");
    if (auth?.startsWith("Bearer ")) {
      const { data: u } = await supabaseAdmin.auth.getUser(auth.slice(7));
      userId = u.user?.id ?? null;
    }
    if (!userId && data.points > 0) throw new Error("포인트는 회원만 사용할 수 있습니다.");
    if (!userId && !data.email) throw new Error("비회원 주문은 이메일을 입력해 주세요.");

    const ids = data.items.map((i) => i.productId);
    const { data: products, error: pErr } = await supabaseAdmin
      .from("products")
      .select("id, name, price, stock, is_active")
      .in("id", ids);
    if (pErr) throw new Error("상품 정보를 확인하지 못했습니다.");

    let subtotal = 0;
    const lines = data.items.map((i) => {
      const p = products?.find((x) => x.id === i.productId);
      if (!p || !p.is_active) throw new Error("판매하지 않는 상품이 포함되어 있습니다.");
      if (p.stock <= 0) throw new Error(`${p.name} 상품이 품절되었습니다.`);
      subtotal += p.price * i.quantity;
      return { product_id: p.id, product_name: p.name, unit_price: p.price, quantity: i.quantity };
    });

    let points = 0;
    if (userId && data.points > 0) {
      const { data: tx } = await supabaseAdmin.from("point_transactions").select("amount").eq("user_id", userId);
      const balance = (tx ?? []).reduce((s, t) => s + t.amount, 0);
      points = Math.min(data.points, balance, subtotal);
    }

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        orderer_name: data.orderer_name,
        phone: data.phone,
        email: data.email || null,
        postcode: data.postcode,
        address: data.address,
        address_detail: data.address_detail,
        memo: data.memo,
        payment_method: data.payment_method,
        total_amount: subtotal - points,
        points_used: points,
      })
      .select("id, order_no, total_amount")
      .single();
    if (error || !order) throw new Error("주문 처리 중 오류가 발생했습니다.");

    const { error: iErr } = await supabaseAdmin
      .from("order_items")
      .insert(lines.map((l) => ({ ...l, order_id: order.id })));
    if (iErr) throw new Error("주문 상품 저장 중 오류가 발생했습니다.");

    if (userId && points > 0) {
      await supabaseAdmin.from("point_transactions").insert({
        user_id: userId,
        amount: -points,
        reason: `주문 사용 (${order.order_no})`,
        order_id: order.id,
      });
    }

    return { orderNo: order.order_no, total: order.total_amount, points, guest: !userId };
  });
