import React from 'react'
import { PledgeContent } from '@/components/PledgeContent'
import { PledgeForm } from '@/components/PledgeForm'
import { getCurrentUser } from '@/lib/auth'

// Mark as dynamic since we use cookies for authentication
export const dynamic = 'force-dynamic'

export default async function PledgePage() {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <PledgeContent />
          <PledgeForm user={user} />
        </div>
      </div>
    </div>
  )
} 