import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "개인정보처리방침 — EI 공식몰" },
      { name: "description", content: "주식회사 SILION EI 공식몰 개인정보처리방침입니다." },
      { property: "og:title", content: "개인정보처리방침 — EI 공식몰" },
      { property: "og:description", content: "EI 공식몰 개인정보처리방침" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const sections: [string, string][] = [
  ["1. 수집하는 개인정보 항목", "필수: 아이디, 이름, 이메일, 비밀번호, 휴대전화번호, 주소\n주문 시: 받는 분 이름·연락처·배송지, 결제 정보"],
  ["2. 수집 및 이용 목적", "회원 관리, 상품 주문·배송, 결제 확인, 고객 문의 응대, 공지사항 전달"],
  ["3. 보유 및 이용 기간", "회원 탈퇴 시 지체 없이 파기합니다. 단, 관련 법령에 따라 계약·결제 기록 5년, 소비자 불만 처리 기록 3년, 접속 기록 3개월간 보관합니다."],
  ["4. 제3자 제공", "회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만 배송을 위해 택배사에 필요한 최소 정보를 제공합니다."],
  ["5. 개인정보의 파기", "보유 기간이 끝난 개인정보는 복구할 수 없는 방법으로 지체 없이 파기합니다."],
  ["6. 이용자의 권리", "이용자는 언제든지 자신의 개인정보를 조회·수정하거나 회원 탈퇴를 요청할 수 있습니다."],
  ["7. 개인정보 보호책임자", "성명: 송인재\n전화: 070-4517-0773\n이메일: info@EIsoap.com"],
  ["8. 회사 정보", "주식회사 SILION\n경기도 화성시 마도면 마도공단로 202 1F"],
];

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-14">
        <SectionHeading title="개인정보처리방침" sub="PRIVACY POLICY" />
        <div className="mt-10 space-y-8 text-sm leading-7 text-foreground/85">
          {sections.map(([t, b]) => (
            <section key={t}>
              <h2 className="text-base font-semibold text-foreground">{t}</h2>
              <p className="mt-2 whitespace-pre-line">{b}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
