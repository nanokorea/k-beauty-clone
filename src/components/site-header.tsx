import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import logoBar from "@/assets/ei-junco-logo-sharp.png.asset.json";
import eiHomeMark from "@/assets/ei-home-mark.png.asset.json";
import { products } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";

const navLinkClass =
  "relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-[15px] font-normal tracking-wide text-ink transition-colors hover:text-oxide";

const topBarLinkClass =
  "whitespace-nowrap text-[11px] font-light tracking-wide text-porcelain/80 transition-colors hover:text-porcelain";

type MenuLink = { label: string; to: string; params?: Record<string, string> };

const brandMenu: MenuLink[] = [
  { label: "브랜드 스토리", to: "/brand-story" },
  { label: "장인 이시노 에이이치 (石野栄一)", to: "/about" },
];

const guideMenu: MenuLink[] = [
  { label: "올바른 거품 팩 세안법", to: "/how-to-wash" },
  { label: "제품 활용 가이드", to: "/guide" },
];

const supportMenu: MenuLink[] = [
  { label: "공지사항", to: "/news" },
  { label: "자주 묻는 질문", to: "/faq" },
  { label: "1:1 문의", to: "/contact" },
];

function Dropdown({ label, items }: { label: string; items: MenuLink[] }) {
  return (
    <div className="group relative">
      <button className={navLinkClass} type="button">
        {label}
        <ChevronDown className="size-3.5 opacity-60" />
      </button>
      <div className="invisible absolute left-1/2 z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <ul className="rounded-sm border border-border bg-background py-2 shadow-lg">
          {items.map((item) => (
            <li key={`${item.to}-${item.label}`}>
              <Link
                to={item.to}
                params={item.params as never}
                className="block px-4 py-2.5 text-sm font-normal text-ink transition-colors hover:bg-secondary hover:text-oxide"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { session, isAdmin } = useAuth();

  const shopMenu: MenuLink[] = [
    { label: "전체 상품", to: "/shop" },
    ...products.map((p) => ({
      label: p.name,
      to: "/products/$slug",
      params: { slug: p.slug },
    })),
  ];

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
      {/* 상단 검정색 안내 바 */}
      <div className="bg-ink text-porcelain">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-5 py-1.5 lg:px-8">
          <span className={topBarLinkClass}>일본 프리미엄 미용비누</span>
          <Link
            to="/"
            className="inline-flex rounded-sm ring-1 ring-porcelain/20 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain"
            aria-label="홈으로 이동"
          >
            <img src={eiHomeMark.url} alt="EI 홈" className="size-7 object-cover sm:size-8" />
          </Link>
          <div className="flex items-center justify-end gap-4">
            {isAdmin ? (
              <Link to="/admin" className={`${topBarLinkClass} hover:text-porcelain`}>
                관리자
              </Link>
            ) : null}
            <span className={topBarLinkClass}>EI 공식몰</span>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="EI JUNCO CLASSIC 홈">
          <img
            src={logoBar.url}
            alt="EI JUNCO CLASSIC"
            className="h-auto w-[230px] object-contain sm:w-[280px] xl:w-[300px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          <Link to="/shop" className={`${navLinkClass} text-oxide`}>
            SHOP
          </Link>
          <Dropdown label="제품" items={shopMenu} />
          <Dropdown label="브랜드" items={brandMenu} />
          <Dropdown label="사용 가이드" items={guideMenu} />
          <Dropdown label="고객센터" items={supportMenu} />
        </nav>

        <div className="hidden items-center gap-5 text-ink xl:flex">
          <Link
            to="/shop"
            className="inline-flex items-center transition-colors hover:text-oxide"
            aria-label="검색"
          >
            <Search className="size-5" />
          </Link>
          <Link
            to={session ? "/mypage" : "/auth"}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-normal text-ink transition-colors hover:text-oxide"
          >
            <User className="size-5" />
            {session ? "MY" : "로그인"}
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-normal text-ink transition-colors hover:text-oxide"
          >
            <ShoppingCart className="size-5" />
            장바구니
            {count > 0 ? (
              <span className="ml-0.5 rounded-full bg-oxide px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1 text-ink xl:hidden">
          <Link to="/shop" className="inline-flex items-center p-2" aria-label="검색">
            <Search className="size-5" />
          </Link>
          <Link to="/cart" className="relative inline-flex items-center p-2">
            <ShoppingCart className="size-5" />
            {count > 0 ? (
              <span className="absolute right-0 top-0 rounded-full bg-oxide px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-sm border border-border bg-background p-2"
            aria-label="메뉴"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background xl:hidden">
          <div className="mx-auto max-w-[1400px] px-4 pb-6">
            <div className="flex items-center gap-3 border-b border-border py-3 text-[13px]">
              {session ? (
                <Link to="/mypage" onClick={close}>
                  마이페이지
                </Link>
              ) : (
                <>
                  <Link to="/auth" onClick={close}>
                    로그인
                  </Link>
                  <span className="text-ink/25">|</span>
                  <Link to="/auth" onClick={close}>
                    회원가입
                  </Link>
                </>
              )}
              <span className="text-ink/25">|</span>
              <Link to="/orders" onClick={close}>
                주문조회
              </Link>
              {isAdmin ? (
                <>
                  <span className="text-ink/25">|</span>
                  <Link to="/admin" onClick={close} className="font-semibold text-oxide">
                    관리자
                  </Link>
                </>
              ) : null}
            </div>

            <MobileGroup title="SHOP" items={shopMenu} onNavigate={close} />
            <MobileGroup title="브랜드" items={brandMenu} onNavigate={close} />
            <MobileGroup title="사용 가이드" items={guideMenu} onNavigate={close} />
            <MobileGroup title="고객센터" items={supportMenu} onNavigate={close} />
            <MobileGroup
              title="MY"
              items={[
                { label: "마이페이지", to: "/mypage" },
                { label: "주문내역", to: "/orders" },
                { label: "장바구니", to: "/cart" },
              ]}
              onNavigate={close}
            />
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: MenuLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-border py-4">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-oxide">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={`${item.to}-${item.label}`}>
            <Link
              to={item.to}
              params={item.params as never}
              onClick={onNavigate}
              className="block py-1.5 text-sm text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

