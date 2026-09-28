import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="ko" dir="ltr">
    <Head>
      <style>{darkModeCss}</style>
    </Head>
    <Preview>{siteName} 비밀번호 재설정 안내</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>비밀번호 재설정 안내</Heading>
        <Text style={text}>
          안녕하세요, {siteName}입니다. 비밀번호 재설정 요청을 받았습니다.
          아래 버튼을 눌러 새 비밀번호를 설정해 주세요.
        </Text>
        <Button className="dm-btn" style={button} href={confirmationUrl}>
          새 비밀번호 설정하기
        </Button>
        <Text style={footer}>
          본인이 요청하지 않았다면 이 메일을 무시하셔도 되며, 비밀번호는 변경되지 않습니다.
          문의: 070-4517-0773 · www.Eisoap.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#000000',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const button = {
  backgroundColor: '#000000',
  color: '#ffffff',
  fontSize: '14px',
  border: '1px solid #000000',
  borderRadius: '8px',
  padding: '12px 20px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
// Rendered as a text child, which React may HTML-escape: keep this CSS free of >, &, and quotes.
const darkModeCss = `
  @media (prefers-color-scheme: dark) {
    .dm-btn { background-color: #ffffff !important; color: #000000 !important; }
  }
  [data-ogsc] .dm-btn { background-color: #ffffff !important; color: #000000 !important; }
  [data-ogsb] .dm-btn { background-color: #ffffff !important; color: #000000 !important; }
`
