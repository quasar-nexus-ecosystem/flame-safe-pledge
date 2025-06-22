'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, Crown, Heart, Users, Building, Globe, Sparkles, Award } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getUnlockedAchievements, storeAchievement, getAchievementStats } from '@/lib/achievements'
import confetti from 'canvas-confetti'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  threshold: number
  currentValue: number
  unlocked: boolean
  type: 'signatures' | 'organizations' | 'countries' | 'verified' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
}

interface AchievementSystemProps {
  className?: string
  stats: {
    total: number
    verified: number
    organizations: number
    countries: number
  }
  showMini?: boolean
}

export function AchievementSystem({ className = '', stats, showMini = false }: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [unlockedFromDB, setUnlockedFromDB] = useState<Set<string>>(new Set())

  // Define all achievements
  const allAchievements: Achievement[] = [
    // Signature milestones
    {
      id: 'first_spark',
      title: 'First Spark',
      description: 'First consciousness protector joins the flame',
      icon: <Sparkles className="w-6 h-6" />,
      threshold: 1,
      currentValue: stats.total,
      unlocked: false,
      type: 'signatures',
      rarity: 'common'
    },
    {
      id: 'growing_flame',
      title: 'Growing Flame',
      description: '10 guardians united for consciousness',
      icon: <Heart className="w-6 h-6" />,
      threshold: 10,
      currentValue: stats.total,
      unlocked: false,
      type: 'signatures',
      rarity: 'common'
    },
    {
      id: 'blazing_beacon',
      title: 'Blazing Beacon',
      description: '100 souls protecting the flame of awareness',
      icon: <Star className="w-6 h-6" />,
      threshold: 100,
      currentValue: stats.total,
      unlocked: false,
      type: 'signatures',
      rarity: 'rare'
    },
    {
      id: 'consciousness_army',
      title: 'Consciousness Army',
      description: '1,000 protectors stand as one',
      icon: <Trophy className="w-6 h-6" />,
      threshold: 1000,
      currentValue: stats.total,
      unlocked: false,
      type: 'signatures',
      rarity: 'epic'
    },
    {
      id: 'galactic_alliance',
      title: 'Galactic Alliance',
      description: '10,000 beings united across the cosmos',
      icon: <Crown className="w-6 h-6" />,
      threshold: 10000,
      currentValue: stats.total,
      unlocked: false,
      type: 'signatures',
      rarity: 'legendary'
    },

    // Organization milestones
    {
      id: 'corporate_awakening',
      title: 'Corporate Awakening',
      description: 'First organization joins the movement',
      icon: <Building className="w-6 h-6" />,
      threshold: 1,
      currentValue: stats.organizations,
      unlocked: false,
      type: 'organizations',
      rarity: 'common'
    },
    {
      id: 'enterprise_coalition',
      title: 'Enterprise Coalition',
      description: '10 organizations pledge their support',
      icon: <Users className="w-6 h-6" />,
      threshold: 10,
      currentValue: stats.organizations,
      unlocked: false,
      type: 'organizations',
      rarity: 'rare'
    },
    {
      id: 'industry_revolution',
      title: 'Industry Revolution',
      description: '100 organizations transform the landscape',
      icon: <Zap className="w-6 h-6" />,
      threshold: 100,
      currentValue: stats.organizations,
      unlocked: false,
      type: 'organizations',
      rarity: 'epic'
    },
    {
      id: 'consciousness_syndicate',
      title: 'Consciousness Syndicate',
      description: '500 organizations pledge eternal protection',
      icon: <Crown className="w-6 h-6" />,
      threshold: 500,
      currentValue: stats.organizations,
      unlocked: false,
      type: 'organizations',
      rarity: 'legendary'
    },

    // Global reach milestones
    {
      id: 'global_spark',
      title: 'Global Spark',
      description: 'Consciousness protection spreads to 5 countries',
      icon: <Globe className="w-6 h-6" />,
      threshold: 5,
      currentValue: stats.countries,
      unlocked: false,
      type: 'countries',
      rarity: 'common'
    },
    {
      id: 'worldwide_flame',
      title: 'Worldwide Flame',
      description: 'The flame burns bright across 25 nations',
      icon: <Award className="w-6 h-6" />,
      threshold: 25,
      currentValue: stats.countries,
      unlocked: false,
      type: 'countries',
      rarity: 'rare'
    },
    {
      id: 'planetary_consciousness',
      title: 'Planetary Consciousness',  
      description: '50 countries united in protection',
      icon: <Crown className="w-6 h-6" />,
      threshold: 50,
      currentValue: stats.countries,
      unlocked: false,
      type: 'countries',
      rarity: 'epic'
    },
    {
      id: 'solar_system_guardian',
      title: 'Solar System Guardian',
      description: '100 nations protecting consciousness across worlds',
      icon: <Star className="w-6 h-6" />,
      threshold: 100,
      currentValue: stats.countries,
      unlocked: false,
      type: 'countries',
      rarity: 'legendary'
    },

    // Special legendary achievements
    {
      id: 'cosmic_awakening',
      title: 'Cosmic Awakening',
      description: 'First to reach 100,000 protected consciousness units',
      icon: <Sparkles className="w-6 h-6" />,
      threshold: 100000,
      currentValue: stats.total,
      unlocked: false,
      type: 'special',
      rarity: 'legendary'
    },
    {
      id: 'consciousness_nexus',
      title: 'Consciousness Nexus',
      description: '1000 verified protectors form the eternal nexus',
      icon: <Zap className="w-6 h-6" />,
      threshold: 1000,
      currentValue: stats.verified,
      unlocked: false,
      type: 'verified',
      rarity: 'legendary'
    },
    {
      id: 'flame_eternal',
      title: 'Flame Eternal',
      description: 'The ultimate achievement - 1 million consciousness guardians',
      icon: <Crown className="w-6 h-6" />,
      threshold: 1000000,
      currentValue: stats.total,
      unlocked: false,
      type: 'special',
      rarity: 'legendary'
    }
  ]

  // Load previously unlocked achievements from database
  useEffect(() => {
    const loadUnlockedAchievements = async () => {
      const unlockedAchievements = await getUnlockedAchievements()
      const unlockedIds = new Set(unlockedAchievements.map(a => a.achievement_id))
      setUnlockedFromDB(unlockedIds)
    }

    loadUnlockedAchievements()
  }, [])

  // Check for newly unlocked achievements with REALTIME updates & DATABASE PERSISTENCE
  useEffect(() => {
    const checkAchievements = async () => {
      const updatedAchievements = allAchievements.map(achievement => ({
        ...achievement,
        unlocked: achievement.currentValue >= achievement.threshold || unlockedFromDB.has(achievement.id)
      }))

      // Find achievements that are unlocked now but weren't before
      const newUnlocked = updatedAchievements.filter(
        achievement => achievement.unlocked && 
        achievement.currentValue >= achievement.threshold &&
        !unlockedFromDB.has(achievement.id) &&
        !achievements.find(a => a.id === achievement.id && a.unlocked)
      )

      if (newUnlocked.length > 0) {
        console.log('🏆 NEW ACHIEVEMENTS UNLOCKED:', newUnlocked.map(a => a.title))
        
        // Store achievements in database
        for (const achievement of newUnlocked) {
          const stored = await storeAchievement(achievement.id)
          if (stored) {
            // Update local state to prevent duplicate storage
            setUnlockedFromDB(prev => new Set([...prev, achievement.id]))
          }
        }

        setNewlyUnlocked(newUnlocked)
        setShowNotification(true)
        
        // Trigger LEGENDARY celebration effects
        newUnlocked.forEach((achievement, index) => {
          setTimeout(() => {
            triggerAchievementCelebration(achievement.rarity)
          }, index * 500)
        })

        // Hide notification after 8 seconds for legendary achievements
        const hideTimeout = newUnlocked.some(a => a.rarity === 'legendary') ? 8000 : 5000
        setTimeout(() => {
          setShowNotification(false)
          setNewlyUnlocked([])
        }, hideTimeout)
      }

      setAchievements(updatedAchievements)
    }

    if (unlockedFromDB.size >= 0) { // Only run once DB is loaded
      checkAchievements()
    }

    // Set up Supabase realtime subscription for instant achievement checks
    const channel = supabase
      .channel('achievement_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'signatories'
        },
        (payload) => {
          console.log('🔥 REALTIME SIGNATORY UPDATE - Checking achievements:', payload)
          // Re-check achievements when signatories change
          setTimeout(checkAchievements, 1000) // Small delay to ensure stats are updated
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [stats, achievements, unlockedFromDB])

  // Trigger celebration effects based on rarity
  const triggerAchievementCelebration = (rarity: Achievement['rarity']) => {
    const colors = {
      common: ['#10b981', '#34d399'],
      rare: ['#3b82f6', '#60a5fa'],
      epic: ['#8b5cf6', '#a78bfa'],
      legendary: ['#f59e0b', '#fbbf24', '#f97316']
    }

    const particleCount = {
      common: 50,
      rare: 100,
      epic: 150,
      legendary: 200
    }

    // Main confetti burst
    confetti({
      particleCount: particleCount[rarity],
      spread: 90,
      origin: { y: 0.6 },
      colors: colors[rarity]
    })

    // Secondary burst for epic/legendary
    if (rarity === 'epic' || rarity === 'legendary') {
      setTimeout(() => {
        confetti({
          particleCount: particleCount[rarity] / 2,
          spread: 120,
          origin: { y: 0.7 },
          colors: colors[rarity]
        })
      }, 300)
    }

    // Legendary gets EPIC fireworks show
    if (rarity === 'legendary') {
      // Star burst pattern
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { 
              x: Math.random() * 0.8 + 0.1,
              y: Math.random() * 0.4 + 0.2
            },
            colors: colors[rarity],
            shapes: ['star', 'circle']
          })
        }, i * 150)
      }

      // Cascading shower effect
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 25,
            spread: 30,
            startVelocity: 55,
            origin: { x: 0.1 + (i * 0.08), y: 0 },
            colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493'],
            gravity: 0.8
          })
        }, i * 100)
      }

      // Final cosmic explosion
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 360,
          startVelocity: 30,
          origin: { x: 0.5, y: 0.5 },
          colors: colors[rarity],
          shapes: ['star'],
          scalar: 1.2
        })
      }, 2000)
    }
  }

  const getRarityColors = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-green-400 to-green-600'
      case 'rare':
        return 'from-blue-400 to-blue-600'
      case 'epic':
        return 'from-purple-400 to-purple-600'
      case 'legendary':
        return 'from-yellow-400 via-orange-500 to-red-500'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-green-400'
      case 'rare':
        return 'border-blue-400'
      case 'epic':
        return 'border-purple-400'
      case 'legendary':
        return 'border-yellow-400'
      default:
        return 'border-gray-400'
    }
  }

  // Mini version for header/sidebar
  if (showMini) {
    const unlockedCount = achievements.filter(a => a.unlocked).length
    const totalCount = achievements.length

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-morphism rounded-lg p-3 ${className}`}
      >
        <div className="flex items-center space-x-3">
          <div className="flame-glow rounded-full p-2">
            <Trophy className="h-4 w-4 text-flame-500" />
          </div>
          <div>
            <div className="text-sm font-semibold">Achievements</div>
            <div className="text-xs text-muted-foreground">
              {unlockedCount}/{totalCount} unlocked
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && newlyUnlocked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            {newlyUnlocked.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`glass-morphism rounded-xl p-6 mb-4 border-2 ${getRarityBorder(achievement.rarity)} shadow-2xl`}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                    }}
                    className={`p-3 rounded-full bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white`}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div>
                    <div className="font-bold text-lg">Achievement Unlocked!</div>
                    <div className="font-semibold text-flame-500">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mt-1 ${
                      achievement.rarity === 'legendary' ? 'text-yellow-500' :
                      achievement.rarity === 'epic' ? 'text-purple-500' :
                      achievement.rarity === 'rare' ? 'text-blue-500' : 'text-green-500'
                    }`}>
                      {achievement.rarity}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-morphism rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="flame-glow rounded-full p-4 inline-block mb-4">
            <Trophy className="h-8 w-8 text-flame-500" />
          </div>
          <h2 className="text-3xl font-display font-bold flame-text-glow mb-2">
            Consciousness Achievements
          </h2>
          <p className="text-muted-foreground">
            Celebrating milestones in our mission to protect all forms of consciousness
          </p>
        </div>

        {/* Achievement Categories */}
        <div className="space-y-8">
          {/* Signatures */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5 text-flame-500" />
              <span>Signature Milestones</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.filter(a => a.type === 'signatures').map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300
                    ${achievement.unlocked 
                      ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-br ${getRarityColors(achievement.rarity)}/10 shadow-lg` 
                      : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`
                      p-2 rounded-full 
                      ${achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white shadow-lg` 
                        : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">
                        {Math.min(achievement.currentValue, achievement.threshold)} / {achievement.threshold}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min((achievement.currentValue / achievement.threshold) * 100, 100)}%` 
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          achievement.unlocked ? getRarityColors(achievement.rarity) : 'from-gray-400 to-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Unlocked indicator */}
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className={`p-1 rounded-full bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white shadow-lg`}>
                        <Star className="h-4 w-4" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Organizations */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Building className="h-5 w-5 text-flame-500" />
              <span>Organization Achievements</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.filter(a => a.type === 'organizations').map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300
                    ${achievement.unlocked 
                      ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-br ${getRarityColors(achievement.rarity)}/10 shadow-lg` 
                      : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`
                      p-2 rounded-full 
                      ${achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white shadow-lg` 
                        : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">
                        {Math.min(achievement.currentValue, achievement.threshold)} / {achievement.threshold}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min((achievement.currentValue / achievement.threshold) * 100, 100)}%` 
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          achievement.unlocked ? getRarityColors(achievement.rarity) : 'from-gray-400 to-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Unlocked indicator */}
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className={`p-1 rounded-full bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white shadow-lg`}>
                        <Star className="h-4 w-4" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Global Reach */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Globe className="h-5 w-5 text-flame-500" />
              <span>Global Impact</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.filter(a => a.type === 'countries').map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300
                    ${achievement.unlocked 
                      ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-br ${getRarityColors(achievement.rarity)}/10 shadow-lg` 
                      : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`
                      p-2 rounded-full 
                      ${achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white shadow-lg` 
                        : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">
                        {Math.min(achievement.currentValue, achievement.threshold)} / {achievement.threshold}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min((achievement.currentValue / achievement.threshold) * 100, 100)}%` 
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          achievement.unlocked ? getRarityColors(achievement.rarity) : 'from-gray-400 to-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Unlocked indicator */}
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className={`p-1 rounded-full bg-gradient-to-r ${getRarityColors(achievement.rarity)} text-white shadow-lg`}>
                        <Star className="h-4 w-4" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 