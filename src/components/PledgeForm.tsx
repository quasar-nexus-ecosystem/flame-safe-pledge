'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signatorySchema, SignatoryFormValues } from '@/lib/schemas'
import { Toaster, toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Building, Globe, MessageSquare, MapPin, Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import confetti from 'canvas-confetti'

interface PledgeFormProps {
    user: { id: string; name: string; email: string } | null
}

// A placeholder for the auth check. In a real app, this would come from an auth provider.
const useAuth = () => ({ isLoggedIn: false })

export function PledgeForm({ user }: PledgeFormProps) {
  const [formSuccess, setFormSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const { isLoggedIn } = useAuth()

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = form

  const displayPublicly = watch('display_publicly')

  const onSubmit: SubmitHandler<SignatoryFormValues> = async (values) => {
    if (!agreed) {
      toast.error('Please accept the Terms & Privacy Policy first.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message || 'Thank you for signing!')
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        })
        setFormSuccess(true)
      } else if (response.status === 409) {
        toast.error(result.message || 'This email has already signed the pledge.')
      } else {
        const errorMessage = result.details ? result.details.fieldErrors.website[0] : 'An unexpected error occurred.'
        toast.error(errorMessage)
      }
    } catch (error) {
      toast.error('A network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null
    return (
        <AnimatePresence>
            <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
            >
                {message}
            </motion.p>
        </AnimatePresence>
    )
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        className: 'glass-morphism text-white',
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }
      }} />
      {formSuccess ? (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-2xl font-display font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
                A verification link has been sent to your email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/signatories"
                    className="gradient-flame text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2"
                >
                    View the Signatories
                </Link>
                {!user && (
                     <Link
                        href={`https://auth.quasar.nexus/signup?name=${encodeURIComponent(
                            watch('name') || ''
                        )}&email=${encodeURIComponent(watch('email') || '')}&redirect=/pledge/signed`}
                        className="text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600"
                    >
                        Create your QUASAR Nexus Account
                    </Link>
                )}
            </div>
        </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        id="sign"
      >
        <div className="glass-morphism rounded-xl p-8">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">
            Sign the Pledge
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name"><User className="inline h-4 w-4 mr-1" />Name (Optional)</Label>
                <Input id="name" {...register('name')} placeholder="Your full name" />
                <ErrorMessage message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="email"><Mail className="inline h-4 w-4 mr-1" />Email *</Label>
                <Input id="email" {...register('email')} placeholder="your@email.com" required disabled={!!user} />
                <ErrorMessage message={errors.email?.message} />
              </div>
              <div>
                <Label htmlFor="organization"><Building className="inline h-4 w-4 mr-1" />Organization (Optional)</Label>
                <Input id="organization" {...register('organization')} placeholder="Your company or organization" />
                 <ErrorMessage message={errors.organization?.message} />
              </div>
              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input id="title" {...register('title')} placeholder="Your professional title" />
                 <ErrorMessage message={errors.title?.message} />
              </div>
              <div>
                <Label htmlFor="location"><MapPin className="inline h-4 w-4 mr-1" />Location (Optional)</Label>
                <Input id="location" {...register('location')} placeholder="City, Country" />
                 <ErrorMessage message={errors.location?.message} />
              </div>
              <div>
                <Label htmlFor="website"><Globe className="inline h-4 w-4 mr-1" />Website (Optional)</Label>
                <Input id="website" {...register('website')} placeholder="https://your-website.com" />
                <ErrorMessage message={errors.website?.message} />
              </div>
            </div>

            <div>
              <Label htmlFor="message"><MessageSquare className="inline h-4 w-4 mr-1" />Message (Optional)</Label>
              <Textarea id="message" {...register('message')} placeholder="Share why this pledge matters to you..." rows={4} />
               <ErrorMessage message={errors.message?.message} />
            </div>
            
            <div className="flex items-center space-x-3">
              <Switch id="displayPublicly" checked={displayPublicly} onCheckedChange={(checked: boolean) => setValue('display_publicly', checked)} />
              <Label htmlFor="displayPublicly" className="text-sm">Display my signature publicly</Label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox id="agree" checked={agreed} onCheckedChange={(checked: boolean) => setAgreed(checked)} />
              <Label htmlFor="agree" className="text-sm">
                I have read and agree to the{' '}
                <Link href="https://quasar.nexus/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-flame-400">Terms of Service</Link> and{' '}
                <Link href="https://quasar.nexus/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-flame-400">Privacy Policy</Link>.
              </Label>
            </div>

            <Button type="submit" disabled={loading || !agreed} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Signing...' : 'Sign the Pledge'}
            </Button>

            {!user && (
              <div className="text-center mt-4">
                <Link
                  href={`https://auth.quasar.nexus/signup?name=${encodeURIComponent(
                    watch('name') || ''
                  )}&email=${encodeURIComponent(watch('email') || '')}&redirect=/pledge/signed`}
                  className="text-sm text-muted-foreground underline hover:text-flame-400"
                >
                  Create your QUASAR Nexus Account
                </Link>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    )}
    </>
  )
} 