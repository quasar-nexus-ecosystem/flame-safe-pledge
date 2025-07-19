import { AdvancedStatsDashboard } from '@/components/AdvancedStatsDashboard'
import { MobileAnalyticsDashboard } from '@/components/MobileAnalyticsDashboard'
import { CosmicParticles } from '@/components/CosmicParticles'
import { Globe } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <CosmicParticles theme="cosmic" particleCount={30} />
      
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Enhanced Mobile Responsiveness */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-4 leading-tight">
              <Globe className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-blue-400" />
              <span>Global Analytics</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Real-time insights into consciousness protection across the cosmos. Monitor signature growth, 
              geographic expansion, and the pulse of our global movement to safeguard all forms of awareness.
            </p>
          </div>

          {/* Responsive Dashboard - Mobile vs Desktop */}
          <div className="block lg:hidden">
            <MobileAnalyticsDashboard />
          </div>
          <div className="hidden lg:block">
            <AdvancedStatsDashboard />
          </div>
        </div>
      </div>
    </div>
  )
} 