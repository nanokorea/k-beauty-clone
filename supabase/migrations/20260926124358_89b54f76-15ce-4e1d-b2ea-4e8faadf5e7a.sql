DROP POLICY IF EXISTS "posts_public_read" ON public.posts;
CREATE POLICY "posts_anon_read" ON public.posts FOR SELECT TO anon USING (published);
CREATE POLICY "posts_auth_read" ON public.posts FOR SELECT TO authenticated USING (published OR public.has_role(auth.uid(),'admin'));