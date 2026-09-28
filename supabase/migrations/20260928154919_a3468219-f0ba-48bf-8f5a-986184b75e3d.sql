CREATE SEQUENCE IF NOT EXISTS public.profiles_member_no_seq;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS member_no integer;
WITH ordered AS (SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn FROM public.profiles)
UPDATE public.profiles p SET member_no = o.rn FROM ordered o WHERE p.id = o.id;
SELECT setval('public.profiles_member_no_seq', COALESCE((SELECT max(member_no) FROM public.profiles), 0) + 1, false);
ALTER TABLE public.profiles ALTER COLUMN member_no SET DEFAULT nextval('public.profiles_member_no_seq');
ALTER SEQUENCE public.profiles_member_no_seq OWNED BY public.profiles.member_no;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_member_no_key ON public.profiles(member_no);

ALTER TABLE public.order_items DROP CONSTRAINT order_items_order_id_fkey,
  ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE public.point_transactions DROP CONSTRAINT point_transactions_order_id_fkey,
  ADD CONSTRAINT point_transactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;

GRANT DELETE ON public.orders, public.order_items, public.inquiries TO authenticated;
CREATE POLICY orders_admin_delete ON public.orders FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY order_items_admin_delete ON public.order_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY inquiries_admin_delete ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));