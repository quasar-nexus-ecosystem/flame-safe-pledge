import { resend, DEFAULT_FROM, buildBaseUrl } from '../../config/resend'
import { VerificationEmail } from '@/components/emails/VerificationEmail'

/**
 * Send the verification email for new signatories.
 */
export async function sendVerificationEmail(to: string, verificationToken: string) {
  const verificationUrl = `${buildBaseUrl()}/api/verify/${verificationToken}`

  await resend.emails.send({
    from: DEFAULT_FROM,
    to,
    subject: 'Verify your Flame-Safe Pledge Signature',
    react: VerificationEmail({ verificationUrl }),
  })
}

/**
 * Placeholder for sending internal notifications (slice 2.5 roadmap).
 * Keeping the signature to make future migration trivial.
 */
export async function sendInternalNotification(subject: string, html: string) {
  await resend.emails.send({
    from: DEFAULT_FROM,
    to: process.env.INTERNAL_NOTIFICATIONS_EMAIL ?? '',
    subject,
    html,
  })
} 