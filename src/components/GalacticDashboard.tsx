'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  Globe, 
  Users, 
  Zap, 
  Star, 
  ArrowUp, 
  Eye,
  Orbit,
  Satellite,
  Sparkles
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { GALACTIC_LOCATIONS, getGalacticStats, getExpansionRecommendations, type GalacticLocation } from '@/lib/galactic-locations'

interface GalacticDashboardProps {
  className?: string
  showCompact?: boolean
}

export function GalacticDashboard({ className = '', showCompact = false }: GalacticDashboardProps) {
  const [galacticData, setGalacticData] = useState<any>(null)
  const [signatories, setSignatories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<GalacticLocation | null>(null)
  const [expansionPhase, setExpansionPhase] = useState<'earthbound' | 'solar' | 'interstellar' | 'intergalactic'>('earthbound')

  useEffect(() => {
    const fetchGalacticData = async () => {
      try {
        // Fetch all signatories
        const { data: signatoryData, error } = await supabase
          .from('signatories')
          .select('id, name, location, organization, created_at')
          .eq('display_publicly', true)

        if (error) {
          // Log only in development to reduce console spam
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching signatories:', error)
          }
          
          // Check if it's a permission issue
          if (error.message.includes('permission denied')) {
            console.error('🔒 Database permission issue detected.')
          }
          
          // Don't set any data - let the error state handle it
          setGalacticData(null)
          setSignatories([])
          setExpansionPhase('earthbound')
          return
        }

        const signatories = signatoryData || []
        setSignatories(signatories)

        // Calculate galactic statistics
        const galacticStats = getGalacticStats(signatories)
        
        // Determine expansion phase based on total signatures
        const total = signatories.length
        let phase: typeof expansionPhase = 'earthbound'
        if (total > 100000) phase = 'intergalactic'
        else if (total > 10000) phase = 'interstellar'
        else if (total > 1000) phase = 'solar'
        
        setExpansionPhase(phase)

        // Get expansion recommendations
        const recommendations = getExpansionRecommendations({ 
          total, 
          galactic: galacticStats 
        })

        setGalacticData({
          stats: galacticStats,
          recommendations,
          totalSignatories: total,
          phase
        })

      } catch (error) {
        // Log only in development to reduce console spam
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching galactic data:', error)
        }
        
        // Don't set any data on error - let the error state handle it
        setGalacticData(null)
        setSignatories([])
        setExpansionPhase('earthbound')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalacticData()

    // Set up realtime subscription
    const channel = supabase
      .channel('galactic_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'signatories'
        },
        () => {
          console.log('🌌 GALACTIC UPDATE: Refetching cosmic data')
          fetchGalacticData()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className={`glass-morphism rounded-2xl p-8 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded w-1/3 opacity-20"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl opacity-20"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!galacticData) {
    return (
      <div className={`glass-morphism rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-xl font-semibold text-red-500 mb-2">
            Galactic Data Unavailable
          </h3>
          <p className="text-muted-foreground">
            Database access is currently restricted. Galactic expansion features will be available once access is restored.
          </p>
        </div>
      </div>
    )
  }

  const getPhaseInfo = (phase: typeof expansionPhase) => {
    switch (phase) {
      case 'earthbound':
        return {
          title: 'Earthbound Consciousness',
          description: 'Building foundation for cosmic expansion',
          color: 'from-blue-500 to-green-500',
          icon: Globe,
          nextMilestone: '1,000 signatures to unlock Solar System expansion'
        }
      case 'solar':
        return {
          title: 'Solar System Pioneers',
          description: 'Expanding consciousness across our home system',
          color: 'from-orange-500 to-red-500',
          icon: Orbit,
          nextMilestone: '10,000 signatures to begin interstellar journey'
        }
      case 'interstellar':
        return {
          title: 'Interstellar Voyagers',
          description: 'Consciousness spreading between the stars',
          color: 'from-purple-500 to-blue-500',
          icon: Rocket,
          nextMilestone: '100,000 signatures for intergalactic reach'
        }
      case 'intergalactic':
        return {
          title: 'Intergalactic Consciousness',
          description: 'Awareness spanning across galaxies',
          color: 'from-pink-500 to-purple-500',
          icon: Star,
          nextMilestone: 'Universal consciousness achieved!'
        }
    }
  }

  const phaseInfo = getPhaseInfo(expansionPhase)

  if (showCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-morphism rounded-xl p-4 bg-gradient-to-r ${phaseInfo.color}/10 border-2 border-purple-500/30 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
              className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            >
              <phaseInfo.icon className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <div className="font-semibold">Galactic Reach</div>
              <div className="text-xs text-muted-foreground">{phaseInfo.title}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {galacticData.stats.uniqueLocations || 0} Locations
            </div>
            <div className="text-xs text-muted-foreground">
              {galacticData.stats.uniqueSystems || 0} Systems
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <div className="text-sm font-bold text-purple-400">
              {galacticData.stats.totalGalacticSignatories || 0}
            </div>
            <div className="text-xs text-muted-foreground">Off-World</div>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <div className="text-sm font-bold text-blue-400">
              {galacticData.stats.uniqueSystems || 1}
            </div>
            <div className="text-xs text-muted-foreground">Systems</div>
          </div>
          <div className="p-2 bg-pink-500/10 rounded-lg">
            <div className="text-sm font-bold text-pink-400">
              {galacticData.stats.uniqueGalaxies || 1}
            </div>
            <div className="text-xs text-muted-foreground">Galaxies</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`glass-morphism rounded-2xl p-8 bg-gradient-to-br ${phaseInfo.color}/5 border-2 border-purple-500/20 ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
          }}
          className={`rounded-full p-4 inline-block mb-4 bg-gradient-to-r ${phaseInfo.color}`}
        >
          <phaseInfo.icon className="h-8 w-8 text-white" />
        </motion.div>
        <h2 className={`text-3xl font-display font-bold mb-2 bg-gradient-to-r ${phaseInfo.color} bg-clip-text text-transparent`}>
          Galactic Consciousness Expansion
        </h2>
        <p className="text-muted-foreground mb-2">
          {phaseInfo.description}
        </p>
        <div className="text-sm bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">
          Current Phase: {phaseInfo.title}
        </div>
        

      </div>

      {/* Expansion Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Expansion Progress</h3>
          <div className="text-sm text-muted-foreground">
            Next milestone: {phaseInfo.nextMilestone}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['earthbound', 'solar', 'interstellar', 'intergalactic'].map((phase, index) => {
            const isActive = expansionPhase === phase
            const isCompleted = ['earthbound', 'solar', 'interstellar', 'intergalactic'].indexOf(expansionPhase) > index
            const phaseData = getPhaseInfo(phase as typeof expansionPhase)
            
            return (
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-300
                  ${isActive 
                    ? `border-purple-400 bg-gradient-to-br ${phaseData.color}/20 shadow-lg` 
                    : isCompleted
                      ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-blue-500/20'
                      : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-60'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${phaseData.color}` 
                      : isCompleted
                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                        : 'bg-gray-300'
                    } text-white
                  `}>
                    <phaseData.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{phaseData.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {isCompleted ? 'Completed' : isActive ? 'Active' : 'Locked'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Galactic Locations Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Satellite className="h-5 w-5 text-purple-500" />
          <span>Consciousness Outposts</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALACTIC_LOCATIONS.slice(0, 6).map((location, index) => {
            const signatureCount = galacticData.stats.locationBreakdown[location.id] || 0
            const isActive = signatureCount > 0 || location.id === 'earth'
            
            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedLocation(location)}
                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105
                  ${isActive 
                    ? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-lg' 
                    : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-40'
                  }
                `}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{location.emoji}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{location.name}</div>
                    <div className="text-xs text-muted-foreground">{location.system}</div>
                  </div>
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground mb-2">
                  {location.description}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Est. {location.established}
                  </div>
                  <div className="text-sm font-bold text-purple-500">
                    {signatureCount > 0 ? `${signatureCount} signatures` : 'Awaiting activation'}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Expansion Recommendations */}
      {galacticData.recommendations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span>Expansion Opportunities</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galacticData.recommendations.map((rec: any, index: number) => (
              <motion.div
                key={rec.target}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-xl border-2 
                  ${rec.priority === 'high' 
                    ? 'border-red-400 bg-gradient-to-br from-red-500/20 to-orange-500/20' 
                    : rec.priority === 'medium'
                      ? 'border-yellow-400 bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
                      : 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-blue-500/20'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{rec.title}</div>
                  <div className={`
                    text-xs px-2 py-1 rounded-full font-semibold uppercase
                    ${rec.priority === 'high' 
                      ? 'bg-red-500/20 text-red-400' 
                      : rec.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }
                  `}>
                    {rec.priority}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {rec.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  Required: {rec.requiredSignatures.toLocaleString()} signatures
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="rounded-2xl p-6 max-w-md mx-4 border-2 border-purple-500/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">{selectedLocation.emoji}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedLocation.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{selectedLocation.system} System</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Type:</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white capitalize">{selectedLocation.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Population:</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedLocation.population?.toLocaleString() || 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Established:</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLocation.established}</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-700 dark:text-slate-200 mb-4 leading-relaxed">
                {selectedLocation.description}
              </p>
              
              <div className="text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {galacticData.stats.locationBreakdown[selectedLocation.id] || 0} Consciousness Protectors
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Active at this location
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 