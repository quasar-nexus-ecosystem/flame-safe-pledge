import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function InvalidTokenPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
      <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
      <h1 className="text-4xl font-display font-bold flame-text-glow mb-4">
        Verification Failed
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        This verification link is invalid, expired, or has already been used.
      </p>
      <Link
        href="/pledge#sign"
        className="gradient-flame text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center space-x-2"
      >
        Return to the Pledge
      </Link>
    </div>
  )
} 