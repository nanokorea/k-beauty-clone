import { Link } from "@tanstack/react-router";
import eiMark from "@/assets/ei-mark.jpg.asset.json";
import { contact } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <img src={eiMark.url} alt="EI" className="h-16 w-16 rounded-sm object-cover" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            EI · JUNCO CLASSIC 한국 공식 사이트
            <br />
            Shaping beauty with you!
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide">메뉴</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                EI에 대하여
              </Link>
            </li>
            <li>
              <Link to="/how-to-wash" className="transition-colors hover:text-primary">
                올바른 거품 팩 세안법
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
              <Link to="/contact" className="transition-colors hover:text-primary">
                문의하기
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide">문의</h3>
          <p className="mt-4 text-2xl font-semibold text-primary">{contact.phone}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{contact.hours}</p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EIICHI ISHINO / JUNCO CLASSIC. All rights reserved.
      </div>
    </footer>
  );
}
