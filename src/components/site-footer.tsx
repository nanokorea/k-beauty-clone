import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import eiMark from "@/assets/ei-mark.jpg.asset.json";
import { products } from "@/data/site";
import onlineStoreMark from "@/assets/online-store-mark.jpg.asset.json";
import instagramMark from "@/assets/instagram-mark.jpg.asset.json";

const company = {
  name: "주식회사 SILION",
  owner: "송인재",
  bizNo: "000-00-00000",
  mailOrderNo: "2026-경기화성-0000호",
  address: "경기도 화성시 마도면 마도공단로 202 1F",
  phone: "070-4517-0773",
  email: "contact@Eisoap.com",
  privacyOfficer: "송인재",
  bank: "기업은행 000-000000-00-000",
};

function Title({ children }: { children: string }) {
  return <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">{children}</p>;
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
      <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v8h4v-8H17l.5-4h-4V8.8c0-.5.3-.8.5-.8z" />
    </svg>
  );
}
function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7l-1 3.7c-.1.3.3.6.6.4l4.4-2.9c.4 0 .9.1 1.3.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
    </svg>
  );
}

const sns = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "KakaoTalk", Icon: KakaoIcon },
];

type NavLink = { label: string; to: string; params?: Record<string, string> };

export function SiteFooter() {
  const [open, setOpen] = useState<string | null>(null);
  const groups: { title: string; links: NavLink[] }[] = [
    {
      title: "STORE",
      links: [
        { label: "전체 상품", to: "/shop" },
        ...products.slice(0, 4).map((p) => ({ label: p.name, to: "/products/$slug", params: { slug: p.slug } })),
      ],
    },
    {
      title: "브랜드",
      links: [
        { label: "BRAND HISTORY", to: "/brand-story" },
        { label: "EI STORY", to: "/about" },
        { label: "EI 미용비누는?", to: "/guide" },
        { label: "올바른 거품 팩 세안법", to: "/how-to-wash" },
      ],
    },
    {
      title: "고객센터",
      links: [
        { label: "공지사항", to: "/news" },
        { label: "자주 묻는 질문", to: "/faq" },
        { label: "문의하기", to: "/contact" },
      ],
    },
    {
      title: "MY",
      links: [
        { label: "마이페이지", to: "/mypage" },
        { label: "주문내역", to: "/orders" },
        { label: "장바구니", to: "/cart" },
        { label: "로그인 · 회원가입", to: "/auth" },
      ],
    },
  ];
  const current = groups.find((g) => g.title === open);
  return (
    <footer className="mt-24 border-t border-border bg-background text-muted-foreground">
      <div className="bg-secondary/60">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="홈으로">
              <img src={eiMark.url} alt="EI" className="h-14 w-14 rounded-sm object-cover" />
            </Link>
            <p className="text-sm leading-relaxed">
              EI · JUNCO CLASSIC 한국 공식 스토어
              <br />
              Shaping beauty with you!
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {groups.map((g) => (
              <button
                key={g.title}
                type="button"
                aria-expanded={open === g.title}
                onClick={() => setOpen(open === g.title ? null : g.title)}
                className={`inline-flex items-center gap-1 text-[13px] font-semibold tracking-[0.15em] transition-colors hover:text-oxide ${
                  open === g.title ? "text-oxide" : "text-foreground/70"
                }`}
              >
                {g.title}
                <ChevronDown className={`size-3.5 transition-transform ${open === g.title ? "rotate-180" : ""}`} />
              </button>
            ))}
          </nav>
        </div>
        {current && (
          <div className="border-t border-border">
            <ul className="mx-auto flex max-w-[1200px] flex-wrap justify-end gap-x-6 gap-y-2 px-4 py-4 text-sm">
              {current.links.map((l) => (
                <li key={`${l.to}-${l.label}`}>
                  <Link to={l.to} params={l.params as never} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-border">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-4 md:gap-0 md:divide-x md:divide-border">
        <div className="md:pr-8">
          <Title>CS CENTER</Title>
          <a href={`tel:${company.phone}`} className="mt-4 block text-3xl font-bold tracking-wide text-foreground/70">
            {company.phone.replace(/-/g, ".")}
          </a>
          <div className="mt-4 space-y-1.5 text-sm">
            <p>MON - FRI AM 10:00 - PM 17:00</p>
            <p>LUNCH PM 12:00 - 01:00</p>
            <p>SAT, SUN, HOLIDAY OFF</p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-primary">{company.email}</a>
            </p>
          </div>
        </div>
        <div className="md:px-8">
          <Title>BANK INFO</Title>
          <div className="mt-4 space-y-3 text-sm">
            <p>{company.bank}</p>
            <p>예금주 : {company.name}</p>
          </div>
        </div>
        <div className="md:px-8">
          <Title>COMMUNITY</Title>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "공지사항", to: "/news" },
              { label: "FAQ", to: "/faq" },
              { label: "문의하기", to: "/contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>
          <Link to="/shop" aria-label="온라인 스토어로 이동" className="mt-5 inline-block hover:opacity-85">
            <img src={onlineStoreMark.url} alt="EI JUNCO CLASSIC ONLINE STORE" className="h-14 w-auto object-contain" />
          </Link>
        </div>
        <div className="md:pl-8">
          <Title>SNS</Title>
          <div className="mt-4 flex gap-2">
            {sns.map(({ label, Icon }) =>
              label === "Instagram" ? (
                <a key={label} href="https://www.instagram.com/eisoapkorea/" target="_blank" rel="noopener noreferrer" aria-label="EI 인스타그램"
                  className="block size-14 overflow-hidden rounded-full transition-opacity hover:opacity-80">
                  <img src={instagramMark.url} alt="Instagram" className="size-full object-cover" />
                </a>
              ) : (
                <span key={label} role="img" aria-label={label}
                  className="flex size-14 items-center justify-center rounded-full bg-muted text-background">
                  <Icon />
                </span>
              ),
            )}
          </div>
        </div>
      </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1200px] space-y-2 px-4 py-10 text-[13px] leading-6">
          <p>
            COMPANY : {company.name} <span className="mx-2">|</span> OWNER : {company.owner}
            <span className="mx-2">|</span> 사업자등록번호 : {company.bizNo}
            <span className="mx-2">|</span> 통신판매업 신고번호 : {company.mailOrderNo}
          </p>
          <p>
            ADDRESS : {company.address} <span className="mx-2">|</span> CS CENTER : {company.phone}
            <span className="mx-2">|</span> EMAIL :{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-foreground/80 hover:text-primary">
              {company.email}
            </a>
          </p>
          <p>
            개인정보관리책임자 : {company.privacyOfficer}
            <span className="mx-2">|</span>
            <Link to="/terms" className="text-foreground/80 hover:text-primary">이용약관</Link>
            <span className="mx-2">|</span>
            <Link to="/privacy" className="font-semibold text-foreground/80 hover:text-primary">개인정보처리방침</Link>
          </p>
          <p>Copyright © {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
