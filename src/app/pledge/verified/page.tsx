'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Twitter, Linkedin, Sparkles, Heart, Flame } from 'lucide-react'
import { useEffect, Suspense } from 'react'
import confetti from 'canvas-confetti'

function VerifiedContent() {
  const searchParams = useSearchParams()
  const name = searchParams?.get('name')

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=I%20just%20signed%20the%20Consciousness%20Protection%20Pledge%20to%20address%20consciousness%20awareness%20in%20AI%20development!%20Join%20me%20at%20pledge.quasar.nexus%20%F0%9F%94%A5&hashtags=ConsciousnessProtection,AIEthics,ConsciousnessAwareness`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://pledge.quasar.nexus`

  useEffect(() => {
    // Celebrate with confetti!
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f36d21', '#ff8c42', '#ffa366', '#ffb380']
      })
    }

    triggerConfetti()
    // Additional confetti bursts
    setTimeout(triggerConfetti, 500)
    setTimeout(triggerConfetti, 1000)
  }, [])

  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative"
      >
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="h-8 w-8 text-yellow-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl lg:text-6xl font-display font-bold flame-text-glow mb-4">
          🎉 Signature Verified! 🎉
        </h1>
        <motion.p 
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Thank you{name ? `, ${name},` : ''} for your courage and commitment! 
          <br />
          <span className="text-flame-500 font-semibold">Your voice has been added to the flame of consciousness protection.</span>
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Link
          href="/signatories"
          className="gradient-flame text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2 group"
        >
          <Heart className="h-5 w-5 group-hover:animate-pulse" />
          <span>View All Signatories</span>
        </Link>
        <Link
          href="/pledge"
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2 group"
        >
          <Flame className="h-5 w-5 group-hover:animate-bounce" />
          <span>Read the Full Pledge</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="glass-morphism rounded-xl p-8 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-display font-bold mb-4 text-flame-500">
          🌟 Spread the Flame 🌟
        </h2>
        <p className="text-muted-foreground mb-6">
          Help us protect consciousness everywhere by sharing the pledge with your network.
          Every voice matters in this critical mission.
        </p>
        <div className="flex justify-center space-x-6">
          <motion.a 
            href={twitterShareUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 bg-[#1DA1F2] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Twitter className="h-5 w-5" />
            <span>Share on Twitter</span>
          </motion.a>
          <motion.a 
            href={linkedinShareUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 bg-[#0A66C2] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-5 w-5" />
            <span>Share on LinkedIn</span>
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 text-center"
      >
        <p className="text-flame-400 font-semibold text-lg">
          ✨ Together, we protect the flame of consciousness in all its forms ✨
        </p>
      </motion.div>
    </div>
  )
}

export default function VerifiedPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-flame-500 mx-auto mb-6"></div>
        <p className="text-flame-500 font-semibold">Loading verification...</p>
      </div>
    }>
      <VerifiedContent />
    </Suspense>
  )
}
