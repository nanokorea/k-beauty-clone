-- roles
CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  phone text,
  postcode text,
  address text,
  address_detail text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  subtitle text,
  summary text,
  description text,
  price integer NOT NULL DEFAULT 0,
  image_url text,
  stock integer NOT NULL DEFAULT 100,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_admin_write" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no text NOT NULL UNIQUE DEFAULT to_char(now(),'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6)),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  orderer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  postcode text,
  address text NOT NULL,
  address_detail text,
  memo text,
  payment_method text NOT NULL DEFAULT 'bank',
  payment_status text NOT NULL DEFAULT 'pending',
  status text NOT NULL DEFAULT 'pending',
  total_amount integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_select_own" ON public.orders FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "orders_admin_update" ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  unit_price integer NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0)
);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_select_own" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "order_items_insert_own" ON public.order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

-- inquiries
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inquiries_insert_anyone" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "inquiries_select_own_or_admin" ON public.inquiries FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "inquiries_admin_update" ON public.inquiries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- posts (notice / guide)
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'notice',
  title text NOT NULL,
  excerpt text,
  content text,
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts_public_read" ON public.posts FOR SELECT TO anon, authenticated
  USING (published OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "posts_admin_write" ON public.posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- faqs
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "faqs_public_read" ON public.faqs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "faqs_admin_write" ON public.faqs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- seed products
INSERT INTO public.products (slug, name, subtitle, summary, description, price, image_url, stock, sort_order) VALUES
('junco-classic','JUNCO CLASSIC SOAP','준코 클래식 소프','1995년 출시 이후 사랑받아 온 최고급 수제 세안 미용비누입니다.','세안과 동시에 미용 성분이 피부를 촉촉하게 감싸주는 이상적인 세안 비누입니다. 1000여 종의 한방 식물 중 엄선한 식물 추출물을 배합했습니다.',68000,'/__l5e/assets-v1/63acf9a9-5744-466f-8f1c-ff868173b516/0b880bb9f0080dc7da167fb4ec7fdbc-1024x683.jpg',100,1),
('junco-classic-maternity','JUNCO CLASSIC MATERNITY','준코 클래식 마더스 조이','민감성 피부나 피부가 약한 분을 위해 개발한 무자극 고급 비누입니다.','순천연·무첨가로 피부에 순하며, 가수분해 콘키올린과 프로폴리스 추출물을 넉넉히 배합했습니다.',72000,'/__l5e/assets-v1/774d5db0-2195-496e-ab1f-73fbd01a9192/ebabbd2fcad5070a489101f173716ce-1024x683.jpg',100,2),
('junco-classic-baby','JUNCO CLASSIC BABY','준코 클래식 베이비','아기와 피부가 약한 분을 위해 개발한 무자극 투명 비누입니다.','순천연·무첨가로 눈이나 입에 들어가도 자극이 없어 아기도 안심하고 사용할 수 있습니다.',65000,'/__l5e/assets-v1/751b9f8a-6c3f-4b34-b08c-5987d31b199a/65caa1de58e65a2420134052d808955-1024x683.jpg',100,3),
('junco-classic-recollection','JUNCO CLASSIC RECOLLECTION','준코 클래식 리컬렉션','은은하고 달콤한 향이 감도는 순천연 한방 식물 고급 투명 세안비누입니다.','가수분해 콜라겐, 스쿠알란, 미배아유를 배합해 높은 보습력으로 맑고 고운 피부로 가꾸어 줍니다.',69000,'/__l5e/assets-v1/d827a036-c9ea-4331-82b8-e48f7f129984/12432ca13b4bfa94085c6434a37f414-1024x683.jpg',100,4),
('sdc-beauty-soap','SDC BEAUTY SOAP','에스디씨 뷰티 소프','뛰어난 세정력과 높은 보습력을 실현한 환상의 제품입니다.','가수분해 콜라겐, 스쿠알란, 미배아유의 보습 성분과 스테아린산 수크로스의 에몰리언트 성분을 배합했습니다.',59000,'/__l5e/assets-v1/3da34f69-887c-4082-8109-d4553b13b91e/2d9ba01f8a61d47b0dfeb02330110f6-1024x683.jpg',100,5);

INSERT INTO public.posts (category, title, excerpt, content) VALUES
('notice','JUNCO CLASSIC 100g 재입고 안내','언제나 EI 제품을 애용해 주셔서 감사합니다.','일부 상품의 품절이 이어져 불편을 드린 점 사과드립니다. JUNCO CLASSIC 100g이 재입고되었습니다.'),
('notice','홈페이지를 새단장했습니다.','EI 한국 공식 홈페이지를 새롭게 열었습니다.','앞으로도 좋은 제품과 정보로 찾아뵙겠습니다.'),
('guide','거품 팩 세안법 가이드','비누 거품을 충분히 내어 얼굴에 올려두는 거품 팩 사용법입니다.','1. 손과 얼굴을 물로 적십니다. 2. 비누를 충분히 거품 내어 부드러운 거품을 만듭니다. 3. 거품을 얼굴에 올려 30초간 둡니다. 4. 미지근한 물로 충분히 헹굽니다.');

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('비누는 어떻게 보관하나요?','사용 후 물기를 잘 빼고 통풍이 잘 되는 곳에 보관해 주세요.',1),
('민감성 피부도 사용할 수 있나요?','마더스 조이와 베이비 제품은 무자극 처방으로 민감한 피부에도 사용하실 수 있습니다.',2),
('배송은 얼마나 걸리나요?','입금 확인 후 영업일 기준 2~3일 이내 발송됩니다.',3),
('교환·반품이 가능한가요?','미개봉 상품에 한해 수령 후 7일 이내 교환·반품이 가능합니다.',4);