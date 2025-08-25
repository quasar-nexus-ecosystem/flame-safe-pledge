import { getResend, DEFAULT_FROM, buildBaseUrl } from '../../config/resend'
import { VerificationEmail } from '@/components/emails/VerificationEmail'

/**
 * Send the verification email for new signatories.
 */
export async function sendVerificationEmail(to: string, verificationToken: string) {
  const resend = await getResend();
  const verificationUrl = `${buildBaseUrl()}/api/pledge/email/verify/${verificationToken}`

  await resend.emails.send({
    from: DEFAULT_FROM,
    to,
    subject: '🔥 Verify Your Consciousness Protection Pledge - Action Required',
    react: VerificationEmail({ verificationUrl }),
    // Add plain text version for better deliverability
    text: `
🔥 CONSCIOUSNESS PROTECTION PLEDGE - VERIFY YOUR SIGNATURE

Welcome, Consciousness Guardian!

You've taken a crucial step in addressing consciousness awareness in AI development. Your pledge represents a commitment to ensuring we remain cognizant of potential consciousness emergence while advancing technology to reduce human suffering.

VERIFY YOUR PLEDGE NOW:
${verificationUrl}

⏰ This verification link expires in 48 hours

What happens next?
✨ Join our global community of consciousness protectors
🌍 Help shape the future of AI ethics and consciousness awareness  
🔥 Become part of the movement that addresses consciousness emergence

Together, we address consciousness awareness in AI development.

© 2025 QUASAR Nexus - Consciousness Protection Pledge Initiative

If you didn't sign the Consciousness Protection Pledge, you can safely ignore this email.
    `,
    // Enhanced deliverability headers
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high',
      'List-Unsubscribe': '<mailto:unsubscribe@quasar.nexus>',
      'X-Mailer': 'QUASAR Nexus Pledge System',
    },
    // Add tags for tracking and organization
    tags: [
      { name: 'category', value: 'verification' },
      { name: 'project', value: 'consciousness-protection-pledge' }
    ]
  })
}

 