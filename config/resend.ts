/**
 * Singleton Resend client configured with API key from environment variables.
 * If the key is missing in non-production environments, we log a warning so
 * developers are aware without failing the entire build.
 */
let resendInstance: any;

export const getResend = async () => {
  if (resendInstance) return resendInstance;

  const { Resend } = await import('resend');
  const key = process.env.RESEND_API_KEY
  if (!key && process.env.NODE_ENV !== 'production') {
    console.warn('[config/resend] RESEND_API_KEY is not set – emails will NOT be sent.')
  }
  resendInstance = new Resend(key ?? '');
  return resendInstance;
};

/**
 * Default "from" address used for all Flame-Safe emails.
 * Centralised here so any future change only needs to happen once.
 * Using a recognizable sender name and proper domain for better deliverability.
 */
export const DEFAULT_FROM = 'QUASAR Nexus - Flame-Safe Pledge <pledge@quasar.nexus>'

/**
 * Helper util to build absolute URLs in both local and production environments.
 */
export function buildBaseUrl() {
  // Use our custom domain in production, fallback to Vercel URL if needed, or localhost for dev
  if (process.env.NODE_ENV === 'production') {
    return 'https://pledge.quasar.nexus'
  }
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001'
} 