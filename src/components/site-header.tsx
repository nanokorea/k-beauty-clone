import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, ShoppingCart, User, X } from "lucide-react";
import logoBar from "@/assets/logo-bar.jpg.asset.json";
const headerBgUrl = "/header-bg.jpg";
import { products } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";

const navLinkClass =
  "relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-[13px] font-light tracking-wide text-ink transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-oxide after:transition-transform hover:text-oxide hover:after:scale-x-100";

const utilLinkClass =
  "whitespace-nowrap text-[11px] text-ink/70 transition-colors hover:text-oxide";

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
        <ul className="rounded-sm border border-antique-gold/35 bg-porcelain py-2 shadow-lg">
          {items.map((item) => (
            <li key={`${item.to}-${item.label}`}>
              <Link
                to={item.to}
                params={item.params as never}
                className="block px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-secondary hover:text-oxide"
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
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { session, isAdmin } = useAuth();

  useEffect(() => {
    let frameId: number | null = null;

    const updateHeader = () => {
      frameId = null;
      const scrollTop = window.scrollY;

      setScrolled((current) => {
        if (!current && scrollTop > 96) return true;
        if (current && scrollTop < 24) return false;
        return current;
      });
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateHeader);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

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
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-antique-gold/35 bg-porcelain/95 shadow-md backdrop-blur-xl"
          : "border-antique-gold/25 bg-porcelain shadow-sm"
      }`}
    >
      {/* 이미지 배경: 스크롤 전에만 표시 */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${headerBgUrl})` }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-porcelain/80 transition-opacity duration-700 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 상단 유틸리티 바 */}
      <div
        className={`relative hidden border-b border-antique-gold/20 xl:block ${
          scrolled ? "h-0 overflow-hidden opacity-0" : "opacity-100"
        } transition-all duration-500`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-end gap-4 px-5 py-1.5 lg:px-8">
          {session ? (
            <Link to="/mypage" className={utilLinkClass}>
              마이페이지
            </Link>
          ) : (
            <>
              <Link to="/auth" className={utilLinkClass}>
                로그인
              </Link>
              <span className="text-ink/25">|</span>
              <Link to="/auth" className={utilLinkClass}>
                회원가입
              </Link>
            </>
          )}
          <span className="text-ink/25">|</span>
          <Link to="/orders" className={utilLinkClass}>
            주문조회
          </Link>
          <span className="text-ink/25">|</span>
          <Link to="/contact" className={utilLinkClass}>
            고객센터
          </Link>
          {isAdmin ? (
            <>
              <span className="text-ink/25">|</span>
              <Link to="/admin" className={`${utilLinkClass} font-semibold text-oxide`}>
                관리자
              </Link>
            </>
          ) : null}
        </div>
      </div>

      <div
        className={`relative mx-auto flex max-w-[1500px] items-center gap-4 px-5 transition-all duration-500 lg:px-8 ${
          scrolled ? "min-h-14 py-2" : "min-h-20 py-3"
        }`}
      >
        <Link to="/" className="shrink-0 flex flex-col items-center" aria-label="EI JUNCO CLASSIC 홈">
          <img
            src={logoBar.url}
            alt="EI JUNCO CLASSIC"
            className={`h-auto object-contain transition-all duration-500 ${
              scrolled ? "w-[240px] sm:w-[300px]" : "w-[300px] sm:w-[380px]"
            }`}
          />
          <p
            className={`mt-1.5 text-center font-medium tracking-[0.28em] text-ink/70 transition-all duration-500 ${
              scrolled ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
            }`}
          >
            일본 프리미엄 미용 비누
          </p>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 xl:flex">
          <Link to="/shop" className={`${navLinkClass} text-oxide`}>
            SHOP
          </Link>
          <Dropdown label="제품" items={shopMenu} />
          <Dropdown label="브랜드" items={brandMenu} />
          <Dropdown label="사용 가이드" items={guideMenu} />
          <Dropdown label="고객센터" items={supportMenu} />

          <span className="h-4 w-px bg-antique-gold/40" />

          <Link
            to={session ? "/mypage" : "/auth"}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-light text-ink transition-colors hover:text-oxide"
          >
            <User className="size-4" />
            {session ? "MY" : "로그인"}
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-light text-ink transition-colors hover:text-oxide"
          >
            <ShoppingCart className="size-4" />
            장바구니
            {count > 0 ? (
              <span className="ml-0.5 rounded-full bg-oxide px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 text-ink xl:hidden">
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
            className="inline-flex items-center justify-center rounded-sm border border-antique-gold/35 bg-background p-2"
            aria-label="메뉴"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-antique-gold/35 bg-porcelain xl:hidden">
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
