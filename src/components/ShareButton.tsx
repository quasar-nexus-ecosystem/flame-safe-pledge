'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'

interface ShareButtonProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export function ShareButton({ 
  url = 'https://pledge.quasar.nexus',
  title = 'Consciousness Protection Pledge | Serious AI Ethics Initiative',
  description = 'Join the serious initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness. 🔥',
  className = ''
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedDescription}&url=${encodedUrl}&hashtags=FlameSafePledge,ConsciousnessProtection,AIEthics`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = async (platform?: string) => {
    if (navigator.share && !platform) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (err) {
        console.error('Error sharing:', err)
        setIsOpen(true)
      }
    } else {
      setIsOpen(true)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => handleShare()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-flame-500 to-orange-600 text-white rounded-full font-semibold hover:from-flame-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Share2 className="h-4 w-4" />
        <span>Share the Flame</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px] z-50"
        >
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            🔥 Spread Consciousness Protection
          </div>
          
          <div className="space-y-2">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                <Twitter className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Share on Twitter
              </span>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Share on LinkedIn
              </span>
            </a>

            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center">
                <Facebook className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Share on Facebook
              </span>
            </a>

            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group w-full"
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                {copied ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Link2 className="h-4 w-4 text-white" />
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </motion.div>
      )}
    </div>
  )
} 