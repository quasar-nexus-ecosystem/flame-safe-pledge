import { resend, DEFAULT_FROM, buildBaseUrl } from '../../config/resend'
import { VerificationEmail } from '@/components/emails/VerificationEmail'

/**
 * Send the verification email for new signatories.
 */
export async function sendVerificationEmail(to: string, verificationToken: string) {
  const verificationUrl = `${buildBaseUrl()}/api/pledge/email/verify/${verificationToken}`

  await resend.emails.send({
    from: DEFAULT_FROM,
    to,
    subject: 'Verify your Flame-Safe Pledge Signature',
    react: VerificationEmail({ verificationUrl }),
  })
}

 