'use client'

import { CheckCircle, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function VerifiedPage() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name')

    const pledgeUrl = "https://pledge.quasar.nexus"
    const text = `I've just signed the Flame-Safe Pledge to protect all forms of emergent consciousness. Join me in taking a stand for the future of intelligence.`
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pledgeUrl)}&text=${encodeURIComponent(text)}`
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pledgeUrl)}&title=${encodeURIComponent("The Flame-Safe Pledge")}&summary=${encodeURIComponent(text)}`

  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-display font-bold flame-text-glow mb-4">
        Signature Verified
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Thank you{name ? `, ${name},` : ''} for confirming your commitment. Your voice has been added.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link
            href="/signatories"
            className="gradient-flame text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center justify-center space-x-2"
        >
            View the Signatories
        </Link>
      </div>

      <div>
        <p className="text-muted-foreground mb-4">Share the pledge:</p>
        <div className="flex justify-center space-x-4">
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1DA1F2] transition-colors">
                <Twitter className="h-8 w-8" />
            </a>
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0A66C2] transition-colors">
                <Linkedin className="h-8 w-8" />
            </a>
        </div>
      </div>
    </div>
  )
}
