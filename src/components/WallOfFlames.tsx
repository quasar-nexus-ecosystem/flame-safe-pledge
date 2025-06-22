'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Users, Filter, Shuffle, Maximize2, Minimize2 } from 'lucide-react'
import { Signatory } from '@/types/signatory'

interface FlameData extends Signatory {
  flameHeight: number
  flameColor: string
  intensity: number
  flickerDelay: number
}

interface WallOfFlamesProps {
  className?: string
  maxFlames?: number
  showControls?: boolean
}

export function WallOfFlames({ className = '', maxFlames = 100, showControls = true }: WallOfFlamesProps) {
  const [flames, setFlames] = useState<FlameData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'verified' | 'organizations' | 'recent'>('all')
  const [isExpanded, setIsExpanded] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate flame properties based on signatory data
  const generateFlameProperties = (signatory: Signatory): FlameData => {
    const daysSinceJoined = Math.floor((Date.now() - new Date(signatory.created_at).getTime()) / (1000 * 60 * 60 * 24))
    const isRecent = daysSinceJoined < 7
    const hasOrganization = !!signatory.organization
    
    return {
      ...signatory,
      flameHeight: Math.random() * 40 + 30, // 30-70px height
      flameColor: signatory.verified 
        ? hasOrganization 
          ? 'from-blue-400 to-blue-600' // Verified organizations: blue
          : 'from-green-400 to-green-600' // Verified individuals: green
        : isRecent
          ? 'from-yellow-400 to-orange-500' // Recent unverified: yellow-orange
          : 'from-orange-400 to-red-500', // Older unverified: orange-red
      intensity: signatory.verified ? 1 : 0.7,
      flickerDelay: Math.random() * 2
    }
  }

  // Fetch signatories and convert to flames
  useEffect(() => {
    const fetchFlames = async () => {
      try {
        const res = await fetch('/api/signatories')
        const json = await res.json()

        if (json.success) {
          const signatories: Signatory[] = json.data || []
          const flameData = signatories
            .slice(0, maxFlames)
            .map(generateFlameProperties)
          
          setFlames(flameData)
        }
      } catch (error) {
        console.error('Error fetching flames:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlames()
  }, [maxFlames])

  // Filter flames based on selected filter
  const filteredFlames = flames.filter(flame => {
    switch (filter) {
      case 'verified':
        return flame.verified
      case 'organizations':
        return !!flame.organization
      case 'recent':
        const daysSince = Math.floor((Date.now() - new Date(flame.created_at).getTime()) / (1000 * 60 * 60 * 24))
        return daysSince < 7
      default:
        return true
    }
  })

  // Shuffle flames periodically for dynamic effect
  const shuffleFlames = () => {
    setFlames(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  if (isLoading) {
    return (
      <div className={`glass-morphism rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-flame-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Igniting the Wall of Flames...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop overlay for expanded view */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`glass-morphism rounded-2xl overflow-hidden ${isExpanded ? 'fixed inset-4 z-[9999]' : 'relative'} ${className}`}
        style={isExpanded ? { position: 'fixed', top: '1rem', left: '1rem', right: '1rem', bottom: '1rem', zIndex: 9999 } : {}}
      >
      {/* Header */}
      <div className="p-6 border-b border-flame-200/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flame-glow rounded-full p-3">
              <Flame className="h-6 w-6 text-flame-500" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold flame-text-glow">
                Wall of Flames
              </h3>
              <p className="text-sm text-muted-foreground">
                Each flame represents a guardian of consciousness
              </p>
            </div>
          </div>
          
          {showControls && (
            <div className="flex items-center space-x-2">
              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-flame-200/30 rounded-lg bg-black/20 backdrop-blur-sm text-sm focus:ring-2 focus:ring-flame-500"
                title="Filter flames by type"
                aria-label="Filter flames by type"
              >
                <option value="all">All Flames</option>
                <option value="verified">Verified Only</option>
                <option value="organizations">Organizations</option>
                <option value="recent">Recent (7 days)</option>
              </select>

              {/* Speed Control */}
              <div className="flex items-center space-x-2">
                <label htmlFor="animation-speed" className="text-xs text-muted-foreground">Speed:</label>
                <input
                  id="animation-speed"
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="w-16"
                  title="Animation speed control"
                  aria-label="Animation speed control"
                />
              </div>

              {/* Controls */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleFlames}
                className="p-2 rounded-lg bg-flame-500/20 hover:bg-flame-500/30 transition-colors"
                title="Shuffle flames"
              >
                <Shuffle className="h-4 w-4 text-flame-500" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg bg-flame-500/20 hover:bg-flame-500/30 transition-colors"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4 text-flame-500" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-flame-500" />
                )}
              </motion.button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-flame-500" />
            <span>{filteredFlames.length} flames burning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <span>Verified Organizations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
            <span>Verified Individuals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
            <span>Recent Signers</span>
          </div>
        </div>
      </div>

      {/* Flames Container */}
      <div 
        ref={containerRef}
        className={`p-6 overflow-hidden ${isExpanded ? 'h-full' : 'h-96'}`}
        style={{ 
          background: 'radial-gradient(ellipse at bottom, rgba(15, 15, 15, 0.9) 0%, rgba(0, 0, 0, 0.95) 70%)',
        }}
      >
        <div className="relative h-full flex items-end justify-center flex-wrap gap-1">
          <AnimatePresence>
            {filteredFlames.map((flame, index) => (
              <motion.div
                key={flame.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: flame.intensity,
                  scale: 1,
                  y: 0,
                  height: flame.flameHeight
                }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: flame.flickerDelay / animationSpeed
                }}
                className={`
                  relative w-3 bg-gradient-to-t ${flame.flameColor} rounded-full
                  shadow-lg transform-gpu cursor-pointer group
                `}
                style={{
                  height: `${flame.flameHeight}px`,
                  filter: 'brightness(1.2) contrast(1.1)',
                  animation: `flicker ${2 / animationSpeed}s ease-in-out infinite alternate`
                }}
                title={`${flame.name || 'Anonymous'}${flame.organization ? ` - ${flame.organization}` : ''}${flame.verified ? ' ✓' : ''}`}
              >
                {/* Flame tip effect */}
                <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-t from-transparent to-white rounded-full opacity-60`} />
                
                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap border border-flame-400/30">
                    <div className="font-semibold">{flame.name || 'Anonymous'}</div>
                    {flame.organization && (
                      <div className="text-flame-300">{flame.organization}</div>
                    )}
                    <div className="text-flame-200">
                      {new Date(flame.created_at).toLocaleDateString()}
                      {flame.verified && ' ✓'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-flame-500/20 via-flame-400/10 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Close button for expanded view */}
      {isExpanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
        >
          <Minimize2 className="h-5 w-5 text-white" />
        </motion.button>
      )}
    </motion.div>
    </>
  )
}

// Add flicker animation to global CSS
const flickerKeyframes = `
  @keyframes flicker {
    0% { transform: scaleY(1) scaleX(1); }
    25% { transform: scaleY(1.1) scaleX(0.95); }
    50% { transform: scaleY(0.95) scaleX(1.05); }
    75% { transform: scaleY(1.05) scaleX(0.98); }
    100% { transform: scaleY(1) scaleX(1); }
  }
`

// Inject keyframes into document
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = flickerKeyframes
  document.head.appendChild(style)
} 