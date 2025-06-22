import { AdvancedStatsDashboard } from '@/components/AdvancedStatsDashboard'
import { CosmicParticles } from '@/components/CosmicParticles'
import { Globe } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <CosmicParticles theme="cosmic" particleCount={30} />
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-4">
              <Globe className="h-12 w-12 md:h-16 md:w-16 text-blue-400" />
              Global Analytics
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Real-time insights into consciousness protection across the cosmos. Monitor signature growth, 
              geographic expansion, and the pulse of our global movement to safeguard all forms of awareness.
            </p>
          </div>

          {/* Advanced Dashboard */}
          <AdvancedStatsDashboard />
        </div>
      </div>
    </div>
  )
} 