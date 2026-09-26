import { Link } from "@tanstack/react-router";
import onlineStoreMark from "@/assets/online-store-mark.jpg.asset.json";

const company = {
  name: "주식회사 SILION",
  owner: "송인재",
  bizNo: "000-00-00000",
  mailOrderNo: "2026-경기화성-0000호",
  address: "경기도 화성시 마도면 마도공단로 202 1F",
  phone: "070-4517-0773",
  email: "info@EIsoap.com",
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

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background text-muted-foreground">
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
            {sns.map(({ label, Icon }) => (
              <span key={label} role="img" aria-label={label}
                className="flex size-14 items-center justify-center rounded-full bg-muted text-background transition-colors ">
                <Icon />
              </span>
            ))}
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
            <span className="mx-2">|</span> EMAIL : {company.email}
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
