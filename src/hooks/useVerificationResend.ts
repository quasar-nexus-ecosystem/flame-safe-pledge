import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface UseVerificationResendReturn {
  resendLoading: boolean
  resendVerification: (email: string) => Promise<void>
}

export function useVerificationResend(): UseVerificationResendReturn {
  const [resendLoading, setResendLoading] = useState(false)

  const resendVerification = async (email: string) => {
    if (!email) {
      toast.error('Email address is required to resend verification.')
      return
    }
    
    setResendLoading(true)
    try {
      const response = await fetch('/api/pledge/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message || '🔄 New verification email sent! Check your inbox and spam folder.')
      } else if (response.status === 404) {
        toast.error('📧 Email not found. Please sign the pledge first, then try resending verification.')
      } else if (response.status === 400) {
        toast.error('✅ This email is already verified! You\'re all set to protect consciousness.')
      } else {
        toast.error(`❌ Failed to resend verification email: ${result.error || 'Please try again or contact support.'}`)
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      toast.error('🔌 Network error occurred. Please check your connection and try again.')
    } finally {
      setResendLoading(false)
    }
  }

  return {
    resendLoading,
    resendVerification,
  }
}