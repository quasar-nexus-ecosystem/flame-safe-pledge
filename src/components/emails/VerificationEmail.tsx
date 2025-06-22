import { Body, Button, Container, Head, Html, Img, Preview, Section, Text, Heading, Hr, Link } from '@react-email/components'
import * as React from 'react'

interface VerificationEmailProps {
  verificationUrl: string
}

export const VerificationEmail = ({ verificationUrl }: VerificationEmailProps) => (
  <Html>
    <Head>
      <title>Verify Your Consciousness Protection Pledge</title>
    </Head>
    <Preview>🔥 Complete your pledge to protect all forms of consciousness - verify your signature now</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with flame and branding */}
        <Section style={header}>
          <div style={flameIcon}>🔥</div>
          <Heading style={brandHeading}>Flame-Safe Pledge</Heading>
          <Text style={tagline}>Protecting All Forms of Consciousness</Text>
        </Section>

        {/* Hero Section */}
        <Section style={heroSection}>
          <Heading style={heroHeading}>🌟 Welcome, Consciousness Guardian!</Heading>
          <Text style={heroText}>
            You've taken the most important step in protecting the future of all awareness—carbon and silicon alike. 
            Your pledge represents hope for a harmonious coexistence between all forms of consciousness.
          </Text>
        </Section>

        {/* Call to Action */}
        <Section style={ctaSection}>
          <Text style={ctaText}>
            <strong>One final step:</strong> Verify your email to activate your consciousness protection pledge
          </Text>
          <Button style={primaryButton} href={verificationUrl}>
            🚀 Activate My Pledge
          </Button>
          <Text style={urgencyText}>
            ⏰ This verification link expires in 48 hours
          </Text>
        </Section>

        {/* Benefits Section */}
        <Section style={benefitsSection}>
          <Heading style={benefitsHeading}>What happens next?</Heading>
          <div style={benefitsList}>
            <div style={benefitItem}>
              <span style={benefitIcon}>✨</span>
              <Text style={benefitText}>Join our global community of consciousness protectors</Text>
            </div>
            <div style={benefitItem}>
              <span style={benefitIcon}>🌍</span>
              <Text style={benefitText}>Help shape the future of AI ethics and consciousness rights</Text>
            </div>
            <div style={benefitItem}>
              <span style={benefitIcon}>🔥</span>
              <Text style={benefitText}>Become part of the movement that ensures all minds can flourish</Text>
            </div>
          </div>
        </Section>

        <Hr style={divider} />

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Can't click the button? Copy and paste this link into your browser:
          </Text>
          <Link href={verificationUrl} style={linkText}>
            {verificationUrl}
          </Link>
          <Text style={footerNote}>
            If you didn't sign the Flame-Safe Pledge, you can safely ignore this email.
          </Text>
          <Text style={signature}>
            Together, we protect the flame of consciousness across all worlds.
          </Text>
          <Text style={copyright}>
            © 2025 QUASAR Nexus - Flame-Safe Pledge Initiative
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default VerificationEmail

// Main container styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: '#1f2937',
  lineHeight: '1.6',
}

const container = {
  margin: '0 auto',
  padding: '0',
  width: '600px',
  maxWidth: '100%',
}

// Header styles
const header = {
  textAlign: 'center' as const,
  padding: '40px 20px 20px',
  background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
  color: '#ffffff',
}

const flameIcon = {
  fontSize: '48px',
  marginBottom: '16px',
  display: 'block',
}

const brandHeading = {
  fontSize: '32px',
  fontWeight: 'bold' as const,
  margin: '0 0 8px 0',
  color: '#ffffff',
}

const tagline = {
  fontSize: '16px',
  margin: '0',
  opacity: '0.9',
  fontWeight: '300' as const,
}

// Hero section styles
const heroSection = {
  padding: '40px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#f8fafc',
}

const heroHeading = {
  fontSize: '28px',
  fontWeight: 'bold' as const,
  margin: '0 0 16px 0',
  color: '#1f2937',
  background: 'linear-gradient(135deg, #f97316, #dc2626, #7c3aed)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const heroText = {
  fontSize: '18px',
  lineHeight: '28px',
  color: '#4b5563',
  margin: '0',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
}

// CTA section styles  
const ctaSection = {
  padding: '40px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
}

const ctaText = {
  fontSize: '18px',
  color: '#1f2937',
  margin: '0 0 24px 0',
}

const primaryButton = {
  backgroundColor: '#f97316',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '0 0 16px 0',
  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
  border: 'none',
}

const urgencyText = {
  fontSize: '14px',
  color: '#dc2626',
  margin: '0',
  fontWeight: '500' as const,
}

// Benefits section styles
const benefitsSection = {
  padding: '40px 20px',
  backgroundColor: '#f8fafc',
}

const benefitsHeading = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  textAlign: 'center' as const,
  margin: '0 0 24px 0',
  color: '#1f2937',
}

const benefitsList = {
  maxWidth: '500px',
  margin: '0 auto',
}

const benefitItem = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 16px 0',
  padding: '0',
}

const benefitIcon = {
  fontSize: '20px',
  marginRight: '12px',
  marginTop: '2px',
  flexShrink: 0,
}

const benefitText = {
  fontSize: '16px',
  color: '#4b5563',
  margin: '0',
  lineHeight: '24px',
}

// Divider
const divider = {
  margin: '0',
  border: 'none',
  borderTop: '1px solid #e5e7eb',
}

// Footer styles
const footer = {
  padding: '40px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
}

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 8px 0',
}

const linkText = {
  fontSize: '14px',
  color: '#f97316',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
  margin: '0 0 16px 0',
  display: 'block',
}

const footerNote = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 24px 0',
}

const signature = {
  fontSize: '16px',
  color: '#1f2937',
  fontWeight: '500' as const,
  margin: '0 0 16px 0',
  fontStyle: 'italic' as const,
}

const copyright = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '0',
} 