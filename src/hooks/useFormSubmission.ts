import { useState } from 'react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { SignatoryFormValues } from '@/lib/schemas'

interface UseFormSubmissionOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface UseFormSubmissionReturn {
  loading: boolean
  formSuccess: boolean
  signedEmail: string
  submitForm: (values: SignatoryFormValues) => Promise<void>
  setFormSuccess: (success: boolean) => void
  setSignedEmail: (email: string) => void
}

export function useFormSubmission(options: UseFormSubmissionOptions = {}): UseFormSubmissionReturn {
  const [loading, setLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [signedEmail, setSignedEmail] = useState('')


  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f36d21', '#ff8c42', '#ffa366', '#ffb380']
    })
  }

  const submitForm = async (values: SignatoryFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('/api/pledge/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (response.ok) {
        // Check if this was a resend
        const successMessage = result.isResend 
          ? '🔄 New verification email sent! Check your inbox (and spam folder) for the fresh link.'
          : '🎉 Thank you for signing the Consciousness Protection Pledge! Check your email to verify your signature.'
        
        toast.success(successMessage)
        
        // Store the email for potential resend
        setSignedEmail(values.email)
        
        // Magical confetti celebration
        triggerConfetti()
        setTimeout(triggerConfetti, 300)
        setTimeout(triggerConfetti, 600)
        
        setFormSuccess(true)
        options.onSuccess?.()
      } else if (response.status === 409) {
        // Handle duplicate email with specific message
        if (result.error === 'duplicate') {
          toast.error('✋ This email has already been used to sign and verify the pledge. You\'re already protecting consciousness!')
        } else {
          toast.error(result.message || 'This email has already signed the pledge.')
        }
        options.onError?.(result.error || 'Duplicate email')
      } else if (response.status === 400) {
        // Handle validation errors
        if (result.details?.fieldErrors) {
          const fieldErrors = result.details.fieldErrors
          const errorMessages = []
          
          if (fieldErrors.email) errorMessages.push(`Email: ${fieldErrors.email[0]}`)
          if (fieldErrors.name) errorMessages.push(`Name: ${fieldErrors.name[0]}`)
          if (fieldErrors.website) errorMessages.push(`Website: ${fieldErrors.website[0]}`)
          if (fieldErrors.message) errorMessages.push(`Message: ${fieldErrors.message[0]}`)
          
          if (errorMessages.length > 0) {
            toast.error(`❌ Please fix these errors: ${errorMessages.join(', ')}`)
          } else {
            toast.error('❌ Please check your form and try again.')
          }
        } else {
          toast.error(result.message || '❌ Invalid form data. Please check your entries and try again.')
        }
        options.onError?.(result.message || 'Validation error')
      } else if (response.status === 500) {
        toast.error('🔧 Internal server error occurred. Please try again in a moment or contact support if the issue persists.')
        options.onError?.('Server error')
      } else {
        toast.error(`❌ Failed to sign pledge: ${result.error || 'Unknown error occurred. Please try again.'}`)
        options.onError?.(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('🔌 Network error occurred. Please check your connection and try again.')
      options.onError?.('Network error')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    formSuccess,
    signedEmail,
    submitForm,
    setFormSuccess,
    setSignedEmail,
  }
}