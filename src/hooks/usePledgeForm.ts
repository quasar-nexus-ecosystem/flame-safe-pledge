import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signatorySchema, SignatoryFormValues } from '@/lib/schemas'

interface UsePledgeFormOptions {
  user?: { id: string; name: string; email: string } | null
}

interface UsePledgeFormReturn {
  form: ReturnType<typeof useForm<SignatoryFormValues>>
  agreed: boolean
  setAgreed: (agreed: boolean) => void
  displayPublicly: boolean
}

export function usePledgeForm(options: UsePledgeFormOptions = {}): UsePledgeFormReturn {
  const [agreed, setAgreed] = useState(false)
  const { user } = options

  const form = useForm<SignatoryFormValues>({
    resolver: zodResolver(signatorySchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      organization: '',
      title: '',
      message: '',
      location: '',
      website: '',
      display_publicly: true,
      social: {
        twitter: '',
        linkedin: '',
        github: '',
      },
    },
  })

  const displayPublicly = form.watch('display_publicly')

  return {
    form,
    agreed,
    setAgreed,
    displayPublicly,
  }
}