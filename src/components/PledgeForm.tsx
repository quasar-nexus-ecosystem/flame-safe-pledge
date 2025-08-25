'use client'

import React from 'react'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { SignatoryFormValues } from '@/lib/schemas'
import { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Building, Globe, MessageSquare, MapPin, Loader2, Heart, Sparkles, CheckCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePledgeForm } from '@/hooks/usePledgeForm'
import { useFormSubmission } from '@/hooks/useFormSubmission'
import { useVerificationResend } from '@/hooks/useVerificationResend'

interface PledgeFormProps {
    user: { id: string; name: string; email: string } | null
}

export function PledgeForm({ user }: PledgeFormProps) {
  const { form, agreed, setAgreed, displayPublicly } = usePledgeForm({ user })
  const { loading, formSuccess, signedEmail, submitForm, setFormSuccess, setSignedEmail } = useFormSubmission()
  const { resendLoading, resendVerification } = useVerificationResend()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = form

  const handleResendVerification = async () => {
    if (!signedEmail) return
    await resendVerification(signedEmail)
  }

  const onSubmit: SubmitHandler<SignatoryFormValues> = async (values) => {
    await submitForm(values, agreed)
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
          duration: 6000, // 6 seconds instead of default 4
          style: {
            background: 'rgba(0, 0, 0, 0.9)',
            border: '2px solid rgba(243, 109, 33, 0.5)',
            backdropFilter: 'blur(15px)',
            fontSize: '16px',
            fontWeight: '500',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            marginTop: '60px', // Push it down from very top
            maxWidth: '500px',
            textAlign: 'center',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#ffffff',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(34, 197, 94, 0.9) 100%)',
              border: '2px solid rgba(16, 185, 129, 0.6)',
              color: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#ffffff',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)',
              border: '2px solid rgba(239, 68, 68, 0.6)',
              color: '#ffffff',
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
              className="text-muted-foreground mb-4 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
                A verification link has been sent to your email.
                <br />
                <span className="text-flame-400 font-semibold">Check your inbox to complete your pledge!</span>
            </motion.p>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <p className="text-sm text-muted-foreground mb-3">
                Didn't receive the email? Check your spam folder or:
              </p>
              <motion.button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="text-flame-600 hover:text-flame-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto px-4 py-2 rounded-lg border border-flame-200/30 hover:border-flame-300/50 hover:bg-flame-50/20 transition-all duration-200 group"
                whileHover={{ scale: resendLoading ? 1 : 1.02 }}
                whileTap={{ scale: resendLoading ? 1 : 0.98 }}
              >
                {resendLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Mail className="h-4 w-4" />
                    </motion.div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="h-4 w-4 group-hover:text-flame-700" />
                    </motion.div>
                    <span>Resend verification email</span>
                  </>
                )}
              </motion.button>
            </motion.div>
            
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
        <div className="glass-morphism rounded-xl p-8 border border-flame-200/20 hover:border-flame-300/30 transition-colors relative overflow-hidden">
          {/* Subtle progress indicator */}
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-flame-400 to-flame-600 rounded-full z-10"
            initial={{ width: "0%" }}
            animate={{ 
              width: loading ? "100%" : "0%"
            }}
            transition={{ 
              duration: loading ? 3 : 0.5,
              ease: loading ? "easeOut" : "easeIn"
            }}
          />
          
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
                <Label htmlFor="name" className="flex items-center space-x-2 cursor-pointer hover:text-flame-600 transition-colors duration-200">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <User className="h-4 w-4 text-flame-500" />
                  </motion.div>
                  <span>Name *</span>
                </Label>
                <Input 
                  id="name" 
                  {...register('name')} 
                  placeholder="Your full name" 
                  required
                  className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50"
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2 cursor-pointer hover:text-flame-600 transition-colors duration-200">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <Mail className="h-4 w-4 text-flame-500" />
                  </motion.div>
                  <span>Email *</span>
                </Label>
                <Input 
                  id="email" 
                  {...register('email')} 
                  placeholder="your@email.com" 
                  required 
                  disabled={!!user}
                  className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50 disabled:opacity-60"
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
                  className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50"
                />
                 <ErrorMessage message={errors.organization?.message} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input 
                  id="title" 
                  {...register('title')} 
                  placeholder="Your professional title"
                  className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50"
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
                  className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50"
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
                  className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50"
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
                className="border-flame-200/30 focus:border-flame-400 focus:ring-2 focus:ring-flame-200/20 transition-all duration-300 hover:border-flame-300/50 resize-none"
              />
               <ErrorMessage message={errors.message?.message} />
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Switch 
                  id="displayPublicly" 
                  checked={displayPublicly} 
                  onCheckedChange={(checked: boolean) => setValue('display_publicly', checked)} 
                />
              </motion.div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full py-4 text-lg font-semibold gradient-flame hover:scale-105 transition-all duration-300 disabled:hover:scale-100 group relative overflow-hidden"
              >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <motion.div 
                        className="flex space-x-1 mr-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        />
                      </motion.div>
                      <motion.span
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Signing your pledge...
                      </motion.span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart className="mr-2 h-5 w-5" />
                      </motion.div>
                      <span>Sign the Pledge</span>
                      <motion.div
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        🔥
                      </motion.div>
                    </div>
                  )}
              </Button>
            </motion.div>


          </form>
        </div>
      </motion.div>
    )}
    </>
  )
} 