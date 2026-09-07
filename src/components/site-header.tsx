import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import logoBar from "@/assets/logo-bar.jpg.asset.json";
import { products } from "@/data/site";

const navLinkClass =
  "text-sm tracking-wide text-foreground/85 transition-colors hover:text-primary";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-4 py-2">
        <Link to="/" className="shrink-0">
          <img
            src={logoBar.url}
            alt="EI JUNCO CLASSIC"
            className="h-10 w-auto md:h-11"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
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
          <Link to="/how-to-wash" className={navLinkClass}>
            세안법
          </Link>
          <Link to="/faq" className={navLinkClass}>
            자주 묻는 질문
          </Link>
          <Link to="/news" className={navLinkClass}>
            공지사항
          </Link>
          <Link to="/contact" className={navLinkClass}>
            문의하기
          </Link>
          <a
            href="https://juncoclassic.cart.fc2.com/?ca=all"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground transition-colors hover:text-primary"
          >
            <ShoppingCart className="size-4" />
            ONLINE STORE
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 lg:hidden"
          aria-label="메뉴"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card lg:hidden">
          <ul className="mx-auto max-w-[1400px] divide-y divide-border px-4">
            <li>
              <Link to="/" onClick={() => setOpen(false)} className="block py-3 text-sm">
                홈
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm"
              >
                EI
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
              <Link to="/contact" onClick={() => setOpen(false)} className="block py-3 text-sm">
                문의하기
              </Link>
            </li>
            <li>
              <a
                href="https://juncoclassic.cart.fc2.com/?ca=all"
                target="_blank"
                rel="noreferrer"
                className="block py-3 text-sm"
              >
                ONLINE STORE
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
