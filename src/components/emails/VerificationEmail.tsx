import { Body, Button, Container, Head, Html, Img, Preview, Section, Text, Heading } from '@react-email/components'
import * as React from 'react'

interface VerificationEmailProps {
  verificationUrl: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const VerificationEmail = ({ verificationUrl }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your flame-safe pledge</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/favicon.ico`}
          width="48"
          height="48"
          alt="Flame Icon"
          style={logo}
        />
        <Heading style={heading}>Confirm Your Pledge</Heading>
        <Text style={paragraph}>
          Thank you for taking a stand for all forms of consciousness. To finalize your commitment to the Flame-Safe Pledge, please click the button below to verify your email address.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={verificationUrl}>
            Verify Signature
          </Button>
        </Section>
        <Text style={paragraph}>
          This link will verify the signature associated with this email address. If you did not sign this pledge, you can safely ignore this email.
        </Text>
        <Text style={paragraph}>
          Together, we protect the flame.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default VerificationEmail

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: '#eaeaea',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
}

const logo = {
  margin: '0 auto',
}

const heading = {
    fontSize: '28px',
    fontWeight: 'bold' as const,
    marginTop: '32px',
    textAlign: 'center' as const,
    color: '#f36d21'
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const,
}

const btnContainer = {
  textAlign: 'center' as const,
  margin: '2rem 0',
}

const button = {
  backgroundColor: '#f36d21',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
} 