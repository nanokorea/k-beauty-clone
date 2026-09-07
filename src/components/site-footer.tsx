import { Link } from "@tanstack/react-router";
import { User, ShoppingCart } from "lucide-react";
import eiMark from "@/assets/ei-mark.jpg.asset.json";
import { contact } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-[1200px] px-4 py-14">
        <div className="text-center">
          <img
            src={eiMark.url}
            alt="EI"
            className="mx-auto h-16 w-16 rounded-sm object-cover"
          />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            EI · JUNCO CLASSIC 한국 공식 사이트
            <br />
            Shaping beauty with you!
          </p>
        </div>

        <nav className="mt-10">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-center text-sm text-muted-foreground sm:grid-cols-3 md:grid-cols-5">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                홈
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                EI
              </Link>
            </li>
            <li>
              <Link to="/brand-story" className="transition-colors hover:text-primary">
                Brand Story
              </Link>
            </li>
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {p.sub}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/how-to-wash" className="transition-colors hover:text-primary">
                세안법
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-primary">
                자주 묻는 질문
              </Link>
            </li>
            <li>
              <Link to="/news" className="transition-colors hover:text-primary">
                공지사항
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="font-semibold tracking-widest text-oxide transition-colors hover:text-primary"
              >
                STORE
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">고객센터</p>
          <a
            href={`tel:${contact.phone}`}
            className="mt-2 inline-block text-2xl font-semibold text-primary"
          >
            {contact.phone}
          </a>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {contact.hours}
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EIICHI ISHINO / JUNCO CLASSIC. All rights reserved.
      </div>
    </footer>
  );
}
