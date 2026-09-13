ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username text,
  ADD COLUMN IF NOT EXISTS terms_agreed_at timestamptz,
  ADD COLUMN IF NOT EXISTS privacy_agreed_at timestamptz,
  ADD COLUMN IF NOT EXISTS age14_agreed_at timestamptz,
  ADD COLUMN IF NOT EXISTS marketing_agreed_at timestamptz,
  ADD COLUMN IF NOT EXISTS ad_email_agreed_at timestamptz,
  ADD COLUMN IF NOT EXISTS ad_sms_agreed_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_idx ON public.profiles (lower(username)) WHERE username IS NOT NULL;

CREATE OR REPLACE FUNCTION public.email_for_username(_username text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM public.profiles WHERE lower(username) = lower(trim(_username)) LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.email_for_username(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.email_for_username(text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.username_available(_username text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = lower(trim(_username)))
$$;

REVOKE ALL ON FUNCTION public.username_available(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.username_available(text) TO anon, authenticated;

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
    terms_agreed_at, privacy_agreed_at, age14_agreed_at,
    marketing_agreed_at, ad_email_agreed_at, ad_sms_agreed_at
  )
  VALUES (
    NEW.id, NEW.email,
    COALESCE(m->>'full_name', m->>'name'),
    NULLIF(m->>'username', ''),
    NULLIF(m->>'phone', ''),
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

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE lower(email) = 'songinjai@gmail.com'
ON CONFLICT DO NOTHING;