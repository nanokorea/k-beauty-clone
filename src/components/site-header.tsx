import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import logoBar from "@/assets/logo-bar.jpg.asset.json";
import { products } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";

const navLinkClass =
  "relative whitespace-nowrap py-2 text-xs font-semibold text-ink transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-oxide after:transition-transform hover:text-oxide hover:after:scale-x-100";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { session, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-antique-gold/35 bg-porcelain/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-[1500px] items-center gap-4 px-5 py-3 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="EI JUNCO CLASSIC 홈">
          <img src={logoBar.url} alt="EI JUNCO CLASSIC" className="h-auto w-[250px] object-contain sm:w-72" />
        </Link>

        <nav className="ml-auto hidden items-center gap-4 xl:flex">
          <Link to="/" className={navLinkClass}>
            홈
          </Link>
          <Link to="/about" className={navLinkClass}>
            EI
          </Link>
          <Link to="/brand-story" className={navLinkClass}>
            Brand Story
          </Link>
          <div className="group relative">
            <button className={navLinkClass} type="button">
              JUNCO CLASSIC 시리즈
            </button>
            <div className="invisible absolute left-1/2 z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <ul className="rounded-sm border border-antique-gold/35 bg-porcelain py-2 shadow-lg">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                       className="block px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-secondary hover:text-oxide"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/how-to-wash" className={navLinkClass}>
            세안법
          </Link>
          <Link to="/faq" className={navLinkClass}>
            자주 묻는 질문
          </Link>
          <Link to="/news" className={navLinkClass}>
            공지사항
          </Link>
          <Link to="/shop" className={`${navLinkClass} text-oxide`}>
            STORE
          </Link>

          {isAdmin ? (
            <Link to="/admin" className={`${navLinkClass} text-oxide`}>
              관리자
            </Link>
          ) : null}
          <Link to={session ? "/mypage" : "/auth"} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-ink transition-colors hover:text-oxide">
            <User className="size-4" />
            {session ? "마이페이지" : "로그인"}
          </Link>
          <Link to="/cart" className="relative inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-ink transition-colors hover:text-oxide">
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
              <Link to="/brand-story" onClick={() => setOpen(false)} className="block py-3 text-sm">
                Brand Story
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
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-semibold tracking-widest"
              >
                STORE
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
