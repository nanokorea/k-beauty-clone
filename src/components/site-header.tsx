import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import logoBar from "@/assets/logo-bar.jpg.asset.json";
import { products } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";

const navLinkClass =
  "whitespace-nowrap text-sm tracking-wide text-foreground/85 transition-colors hover:text-primary";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { session, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-4 py-2">
        <Link to="/" className="shrink-0">
          <img src={logoBar.url} alt="EI JUNCO CLASSIC" className="h-10 w-auto md:h-11" />
        </Link>

        <nav className="ml-auto hidden items-center gap-5 xl:flex">
          <Link to="/" className={navLinkClass}>
            홈
          </Link>
          <Link to="/about" className={navLinkClass}>
            EI
          </Link>
          <div className="group relative">
            <button className={navLinkClass} type="button">
              JUNCO CLASSIC 시리즈
            </button>
            <div className="invisible absolute left-1/2 z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <ul className="rounded-md border border-border bg-card py-2 shadow-lg">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      className="block px-4 py-2 text-sm text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/shop" className={navLinkClass}>
            스토어
          </Link>
          <Link to="/how-to-wash" className={navLinkClass}>
            세안법
          </Link>
          <Link to="/guide" className={navLinkClass}>
            활용 가이드
          </Link>
          <Link to="/faq" className={navLinkClass}>
            자주 묻는 질문
          </Link>
          <Link to="/news" className={navLinkClass}>
            공지사항
          </Link>
          <Link to="/contact" className={navLinkClass}>
            견적 문의
          </Link>
          {isAdmin ? (
            <Link to="/admin" className={`${navLinkClass} text-primary`}>
              관리자
            </Link>
          ) : null}
          <Link to={session ? "/mypage" : "/auth"} className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm">
            <User className="size-4" />
            {session ? "마이페이지" : "로그인"}
          </Link>
          <Link to="/cart" className="relative inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium">
            <ShoppingCart className="size-4" />
            장바구니
            {count > 0 ? (
              <span className="ml-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 xl:hidden">
          <Link to="/cart" className="relative inline-flex items-center p-2">
            <ShoppingCart className="size-5" />
            {count > 0 ? (
              <span className="absolute right-0 top-0 rounded-full bg-primary px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2"
            aria-label="메뉴"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card xl:hidden">
          <ul className="mx-auto max-w-[1400px] divide-y divide-border px-4">
            <li>
              <Link to="/" onClick={() => setOpen(false)} className="block py-3 text-sm">
                홈
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)} className="block py-3 text-sm">
                EI
              </Link>
            </li>
            <li>
              <Link to="/shop" onClick={() => setOpen(false)} className="block py-3 text-sm">
                스토어
              </Link>
            </li>
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm"
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/how-to-wash" onClick={() => setOpen(false)} className="block py-3 text-sm">
                세안법
              </Link>
            </li>
            <li>
              <Link to="/guide" onClick={() => setOpen(false)} className="block py-3 text-sm">
                활용 가이드
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={() => setOpen(false)} className="block py-3 text-sm">
                자주 묻는 질문
              </Link>
            </li>
            <li>
              <Link to="/news" onClick={() => setOpen(false)} className="block py-3 text-sm">
                공지사항
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpen(false)} className="block py-3 text-sm">
                견적 문의
              </Link>
            </li>
            <li>
              <Link
                to={session ? "/mypage" : "/auth"}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm"
              >
                {session ? "마이페이지" : "로그인 · 회원가입"}
              </Link>
            </li>
            {isAdmin ? (
              <li>
                <Link to="/admin" onClick={() => setOpen(false)} className="block py-3 text-sm text-primary">
                  관리자
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
