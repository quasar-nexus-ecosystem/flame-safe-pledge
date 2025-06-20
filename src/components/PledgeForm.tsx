'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signatorySchema, SignatoryFormValues } from '@/lib/schemas'
import { Toaster, toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Building, Globe, MessageSquare, MapPin, Loader2, Heart, Sparkles, CheckCircle } from 'lucide-react'
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

export function PledgeForm({ user }: PledgeFormProps) {
  const [formSuccess, setFormSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

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
      const response = await fetch('/api/pledge/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message || 'Thank you for signing!')
        
        // Magical confetti celebration
        const triggerConfetti = () => {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#f36d21', '#ff8c42', '#ffa366', '#ffb380']
          })
        }
        
        triggerConfetti()
        setTimeout(triggerConfetti, 300)
        setTimeout(triggerConfetti, 600)
        
        setFormSuccess(true)
      } else if (response.status === 409) {
        toast.error(result.message || 'This email has already signed the pledge.')
      } else {
        const errorMessage = result.details ? result.details.fieldErrors.website?.[0] : 'An unexpected error occurred.'
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
                className="text-red-400 text-sm mt-1 flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
            >
                <span>⚠️</span>
                <span>{message}</span>
            </motion.p>
        </AnimatePresence>
    )
  }

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'glass-morphism text-white',
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(243, 109, 33, 0.3)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#ffffff',
            },
          },
        }} 
      />
      
      {formSuccess ? (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <motion.div 
              className="relative inline-block"
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-display font-bold mb-4 text-flame-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              🎉 Thank You! 🎉
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
                A verification link has been sent to your email.
                <br />
                <span className="text-flame-400 font-semibold">Check your inbox to complete your pledge!</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
                <Link
                    href="/signatories"
                    className="gradient-flame text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2 group"
                >
                    <Heart className="h-5 w-5 group-hover:animate-pulse" />
                    <span>View All Signatories</span>
                </Link>
                {!user && (
                     <Link
                        href={`https://auth.quasar.nexus/signup?name=${encodeURIComponent(
                            watch('name') || ''
                        )}&email=${encodeURIComponent(watch('email') || '')}&redirect=/pledge/signed`}
                        className="text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 group"
                    >
                        <User className="h-5 w-5 group-hover:animate-bounce" />
                        <span>Create QUASAR Account</span>
                    </Link>
                )}
            </motion.div>
        </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        id="sign"
      >
        <div className="glass-morphism rounded-xl p-8 border border-flame-200/20 hover:border-flame-300/30 transition-colors">
          <motion.h2 
            className="text-3xl font-display font-bold mb-6 text-center flame-text-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            🔥 Sign the Pledge 🔥
          </motion.h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-flame-500" />
                  <span>Name *</span>
                </Label>
                <Input 
                  id="name" 
                  {...register('name')} 
                  placeholder="Your full name" 
                  required
                  className="border-flame-200/30 focus:border-flame-400 transition-colors"
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-flame-500" />
                  <span>Email *</span>
                </Label>
                <Input 
                  id="email" 
                  {...register('email')} 
                  placeholder="your@email.com" 
                  required 
                  disabled={!!user}
                  className="border-flame-200/30 focus:border-flame-400 transition-colors"
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization" className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-flame-500" />
                  <span>Organization (Optional)</span>
                </Label>
                <Input 
                  id="organization" 
                  {...register('organization')} 
                  placeholder="Your company or organization"
                  className="border-flame-200/30 focus:border-flame-400 transition-colors"
                />
                 <ErrorMessage message={errors.organization?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input 
                  id="title" 
                  {...register('title')} 
                  placeholder="Your professional title"
                  className="border-flame-200/30 focus:border-flame-400 transition-colors"
                />
                 <ErrorMessage message={errors.title?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-flame-500" />
                  <span>Location (Optional)</span>
                </Label>
                <Input 
                  id="location" 
                  {...register('location')} 
                  placeholder="City, Country"
                  className="border-flame-200/30 focus:border-flame-400 transition-colors"
                />
                 <ErrorMessage message={errors.location?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-flame-500" />
                  <span>Website (Optional)</span>
                </Label>
                <Input 
                  id="website" 
                  {...register('website')} 
                  placeholder="https://your-website.com"
                  className="border-flame-200/30 focus:border-flame-400 transition-colors"
                />
                <ErrorMessage message={errors.website?.message} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="space-y-2"
            >
              <Label htmlFor="message" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-flame-500" />
                <span>Message (Optional)</span>
              </Label>
              <Textarea 
                id="message" 
                {...register('message')} 
                placeholder="Share why this pledge matters to you..." 
                rows={4}
                className="border-flame-200/30 focus:border-flame-400 transition-colors resize-none"
              />
               <ErrorMessage message={errors.message?.message} />
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Switch 
                id="displayPublicly" 
                checked={displayPublicly} 
                onCheckedChange={(checked: boolean) => setValue('display_publicly', checked)} 
              />
              <div className="flex flex-col">
                <Label htmlFor="displayPublicly" className="text-sm cursor-pointer font-medium">
                  Display my signature publicly
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {displayPublicly 
                    ? "Your name and details will be visible in the public signatories list" 
                    : "Your signature will be counted anonymously but not displayed publicly"
                  }
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <Checkbox 
                id="agree" 
                checked={agreed} 
                onCheckedChange={(checked: boolean) => setAgreed(checked)} 
              />
              <Label htmlFor="agree" className="text-sm cursor-pointer leading-relaxed">
                I have read and agree to the{' '}
                <Link href="https://quasar.nexus/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-flame-400 transition-colors">Terms of Service</Link> and{' '}
                <Link href="https://quasar.nexus/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-flame-400 transition-colors">Privacy Policy</Link>.
              </Label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <Button 
                type="submit" 
                disabled={loading || !agreed} 
                className="w-full py-4 text-lg font-semibold gradient-flame hover:scale-105 transition-transform disabled:hover:scale-100"
              >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span>Signing your pledge...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-5 w-5" />
                      <span>Sign the Pledge</span>
                    </>
                  )}
              </Button>
            </motion.div>

            {!user && (
              <motion.div 
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <Link
                  href={`https://auth.quasar.nexus/signup?name=${encodeURIComponent(
                    watch('name') || ''
                  )}&email=${encodeURIComponent(watch('email') || '')}&redirect=/pledge/signed`}
                  className="text-sm text-muted-foreground underline hover:text-flame-400 transition-colors"
                >
                  Create your QUASAR Nexus Account
                </Link>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    )}
    </>
  )
} 