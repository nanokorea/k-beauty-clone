CREATE TABLE public.point_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  reason text NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.point_transactions TO authenticated;
GRANT ALL ON public.point_transactions TO service_role;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY points_select_own_or_admin ON public.point_transactions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY points_admin_insert ON public.point_transactions FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX point_transactions_user_idx ON public.point_transactions(user_id);

ALTER TABLE public.orders
  ADD COLUMN points_used integer NOT NULL DEFAULT 0,
  ADD COLUMN points_earned integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.handle_order_points()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE earn integer;
BEGIN
  IF NEW.user_id IS NULL OR NEW.status IS NOT DISTINCT FROM OLD.status THEN RETURN NEW; END IF;
  IF NEW.status = 'delivered' AND NEW.points_earned = 0 THEN
    earn := floor(NEW.total_amount * 0.05);
    IF earn > 0 THEN
      INSERT INTO public.point_transactions(user_id, amount, reason, order_id)
      VALUES (NEW.user_id, earn, '구매 적립 (' || NEW.order_no || ')', NEW.id);
      NEW.points_earned := earn;
    END IF;
  ELSIF NEW.status = 'cancelled' THEN
    IF NEW.points_used > 0 THEN
      INSERT INTO public.point_transactions(user_id, amount, reason, order_id)
      VALUES (NEW.user_id, NEW.points_used, '주문 취소 포인트 반환 (' || NEW.order_no || ')', NEW.id);
      NEW.points_used := 0;
    END IF;
    IF NEW.points_earned > 0 THEN
      INSERT INTO public.point_transactions(user_id, amount, reason, order_id)
      VALUES (NEW.user_id, -NEW.points_earned, '주문 취소 적립 회수 (' || NEW.order_no || ')', NEW.id);
      NEW.points_earned := 0;
    END IF;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER orders_points BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_order_points();

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  m jsonb := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
BEGIN
  INSERT INTO public.profiles (
    id, email, full_name, username, phone,
    postcode, address1, address2,
    terms_agreed_at, privacy_agreed_at, age14_agreed_at,
    marketing_agreed_at, ad_email_agreed_at, ad_sms_agreed_at
  )
  VALUES (
    NEW.id, NEW.email,
    COALESCE(m->>'full_name', m->>'name'),
    NULLIF(m->>'username', ''),
    NULLIF(m->>'phone', ''),
    NULLIF(m->>'postcode', ''),
    NULLIF(m->>'address1', ''),
    NULLIF(m->>'address2', ''),
    CASE WHEN (m->>'terms_agreed') = 'true' THEN now() END,
    CASE WHEN (m->>'privacy_agreed') = 'true' THEN now() END,
    CASE WHEN (m->>'age14_agreed') = 'true' THEN now() END,
    CASE WHEN (m->>'marketing_agreed') = 'true' THEN now() END,
    CASE WHEN (m->>'ad_email_agreed') = 'true' THEN now() END,
    CASE WHEN (m->>'ad_sms_agreed') = 'true' THEN now() END
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  IF lower(NEW.email) = 'songinjai@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  INSERT INTO public.point_transactions (user_id, amount, reason)
  VALUES (NEW.id, 5000, '회원가입 축하 포인트');

  RETURN NEW;
END;
$function$;