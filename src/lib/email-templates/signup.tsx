import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import signupBackground from '@/assets/eisoap-signup-background-faded.jpg.asset.json'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ confirmationUrl, siteUrl }: SignupEmailProps) => (
  <Html lang="ko" dir="ltr">
    <Head />
    <Preview>Ei 미용비누 회원가입을 환영합니다! 이메일 인증을 완료해 주세요.</Preview>
    <Body style={main}>
      <Container style={{ ...container, backgroundImage: `url(${siteUrl}${signupBackground.url})` }}>
        <Text style={brand}>Ei 미용비누</Text>
        <Heading style={h1}>회원가입을 환영합니다!</Heading>
        <Text style={text}>
          안녕하세요! Ei 미용비누에 오신 것을 진심으로 환영합니다.
        </Text>
        <Text style={text}>
          회원가입을 안전하게 완료하고 Ei 미용비누의 다양한 혜택과 소식을 받아보시려면,
          아래 버튼을 눌러 이메일 주소를 인증해 주세요.
        </Text>
        <Section style={{ textAlign: 'center', margin: '8px 0 32px' }}>
          <Button style={button} href={confirmationUrl}>
            이메일 주소 인증하기
          </Button>
        </Section>
        <Text style={note}>• 본인이 요청하지 않은 가입이라면 이 메일을 무시하셔도 됩니다.</Text>
        <Text style={note}>• 문의사항이 있으시면 언제든지 고객센터로 연락해 주세요.</Text>
        <Text style={note}>
          • 070-4517-0773&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="https://www.eisoap.com" style={siteLink}>www.Eisoap.com</a>
        </Text>
        <Text style={sign}>
          감사합니다.
          <br />
          Ei 미용비누 드림
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Noto Sans KR', Arial, sans-serif" }
const container = {
  padding: '40px 32px',
  maxWidth: '560px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  border: '1px solid #ded5ca',
}
const brand = { fontSize: '13px', letterSpacing: '0.2em', color: '#9a5b3c', margin: '0 0 16px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1f1a17', margin: '0 0 24px' }
const text = { fontSize: '14px', color: '#3d3733', lineHeight: '1.8', margin: '0 0 18px' }
const button = {
  backgroundColor: '#1f1a17',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '2px',
  padding: '14px 28px',
  textDecoration: 'none',
}
const note = { fontSize: '12px', color: '#77706a', lineHeight: '1.6', margin: '0 0 6px' }
const siteLink = { color: '#694734', textDecoration: 'underline' }
const sign = { fontSize: '14px', color: '#3d3733', lineHeight: '1.8', margin: '28px 0 0' }
