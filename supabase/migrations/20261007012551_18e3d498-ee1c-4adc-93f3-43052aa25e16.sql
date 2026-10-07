CREATE TABLE public.product_feedback (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_slug text NOT NULL CHECK (char_length(product_slug) BETWEEN 1 AND 150),
 user_id uuid NOT NULL,
 kind text NOT NULL CHECK (kind IN ('review','question')),
 title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 100),
 content text NOT NULL CHECK (char_length(btrim(content)) BETWEEN 1 AND 3000),
 author_label text NOT NULL DEFAULT '회원',
 rating integer CHECK (rating BETWEEN 1 AND 5),
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK ((kind = 'review' AND rating IS NOT NULL) OR (kind = 'question' AND rating IS NULL))
);
GRANT SELECT (id, product_slug, kind, title, content, author_label, rating, created_at) ON public.product_feedback TO anon;
GRANT SELECT, INSERT, DELETE ON public.product_feedback TO authenticated;
GRANT ALL ON public.product_feedback TO service_role;
ALTER TABLE public.product_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY feedback_public_read ON public.product_feedback FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY feedback_own_insert ON public.product_feedback FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND author_label = '회원');
CREATE POLICY feedback_own_delete ON public.product_feedback FOR DELETE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE INDEX feedback_product_date ON public.product_feedback(product_slug, created_at DESC);
CREATE OR REPLACE FUNCTION public.limit_product_feedback() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(NEW.user_id::text, 0));
 IF EXISTS (SELECT 1 FROM public.product_feedback WHERE user_id = NEW.user_id AND created_at > now() - interval '30 seconds') THEN
  RAISE EXCEPTION '잠시 후 다시 등록해 주세요.';
 END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER product_feedback_limit BEFORE INSERT ON public.product_feedback FOR EACH ROW EXECUTE FUNCTION public.limit_product_feedback();