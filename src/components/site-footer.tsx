import { Link } from "@tanstack/react-router";
import eiMark from "@/assets/ei-mark.jpg.asset.json";
import { contact, products } from "@/data/site";

type FooterLink = { label: string; to: string; params?: Record<string, string> };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-oxide">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={`${l.to}-${l.label}`}>
            <Link
              to={l.to}
              params={l.params as never}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const shopLinks: FooterLink[] = [
    { label: "전체 상품", to: "/shop" },
    ...products.slice(0, 4).map((p) => ({
      label: p.name,
      to: "/products/$slug",
      params: { slug: p.slug },
    })),
  ];

  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-[1200px] px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <img src={eiMark.url} alt="EI" className="h-14 w-14 rounded-sm object-cover" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              EI · JUNCO CLASSIC 한국 공식 스토어
              <br />
              Shaping beauty with you!
            </p>
          </div>

          <FooterColumn title="SHOP" links={shopLinks} />
          <FooterColumn
            title="브랜드"
            links={[
              { label: "브랜드 스토리", to: "/brand-story" },
              { label: "장인 이시노 에이이치 (石野栄一)", to: "/about" },
              { label: "올바른 거품 팩 세안법", to: "/how-to-wash" },
              { label: "제품 활용 가이드", to: "/guide" },
            ]}
          />
          <FooterColumn
            title="고객센터"
            links={[
              { label: "공지사항", to: "/news" },
              { label: "자주 묻는 질문", to: "/faq" },
              { label: "1:1 문의", to: "/contact" },
            ]}
          />
          <FooterColumn
            title="MY"
            links={[
              { label: "마이페이지", to: "/mypage" },
              { label: "주문내역", to: "/orders" },
              { label: "장바구니", to: "/cart" },
              { label: "로그인 · 회원가입", to: "/auth" },
            ]}
          />
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-medium text-muted-foreground">고객센터</p>
          <a
            href={`tel:${contact.phone}`}
            className="mt-2 inline-block text-2xl font-semibold text-primary"
          >
            {contact.phone}
          </a>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{contact.hours}</p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EIICHI ISHINO / JUNCO CLASSIC. All rights reserved.
      </div>
    </footer>
  );
}
