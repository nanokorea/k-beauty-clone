ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS postcode text,
  ADD COLUMN IF NOT EXISTS address1 text,
  ADD COLUMN IF NOT EXISTS address2 text;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;