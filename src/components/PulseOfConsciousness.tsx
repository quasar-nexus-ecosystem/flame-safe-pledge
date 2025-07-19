'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Heart, Zap, Globe, Users, Building, Sparkles, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface PulseStats {
  total: number
  verified: number
  organizations: number
  individuals: number
  recentSignatures: number
  countries: number
  pulse: number // Heartbeat frequency
}

interface PulseOfConsciousnessProps {
  className?: string
  showMini?: boolean
}

export function PulseOfConsciousness({ className = '', showMini = false }: PulseOfConsciousnessProps) {
  const [stats, setStats] = useState<PulseStats>({
    total: 0,
    verified: 0,
    organizations: 0,
    individuals: 0,
    recentSignatures: 0,
    countries: 0,
    pulse: 72
  })
  const [isLoading, setIsLoading] = useState(true)
  const [pulseAnimation, setPulseAnimation] = useState(false)
  const [lastTotal, setLastTotal] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (componentRef.current) {
      observer.observe(componentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fetch REAL-TIME stats with enhanced pulse calculation
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const json = await res.json()

        if (json.success) {
          const data = json.data || {}
          const newStats = {
            total: data.total || 0,
            verified: data.verified || 0,
            organizations: data.organizations || 0,
            individuals: data.individuals || 0,
            recentSignatures: data.recentSignatures || 0,
            countries: data.countries || 0,
            pulse: Math.max(40, Math.min(120, 60 + ((data.recentSignatures || 0) * 5))) // Dynamic pulse based on activity
          }

          // Trigger pulse animation if new signatures detected
          if (newStats.total > lastTotal) {
            console.log('💓 NEW CONSCIOUSNESS PROTECTED! Pulse increasing...', { old: lastTotal, new: newStats.total })
            setPulseAnimation(true)
            setTimeout(() => setPulseAnimation(false), 2000)
            setLastTotal(newStats.total)
          }

          setStats(newStats)
        }
      } catch (error) {
        console.error('Error fetching pulse stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
    
    // Set up Supabase realtime subscription for instant pulse updates
    const channel = supabase
      .channel('pulse_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'signatories'
        },
        (payload) => {
          console.log('💓 REALTIME PULSE: New consciousness protector!', payload)
          // Trigger immediate pulse animation and stats refresh
          setPulseAnimation(true)
          setTimeout(() => setPulseAnimation(false), 2000)
          fetchStats()
        }
      )
      .subscribe()

    // Also update every 30 seconds for other metrics
    const interval = setInterval(fetchStats, 30000)
    
    return () => {
      channel.unsubscribe()
      clearInterval(interval)
    }
  }, [lastTotal])

  // Animate pulse heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true)
      setTimeout(() => setPulseAnimation(false), 300)
    }, (60 / stats.pulse) * 1000) // Convert BPM to milliseconds

    return () => clearInterval(interval)
  }, [stats.pulse])

  if (showMini) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-morphism rounded-xl p-4 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                scale: pulseAnimation ? [1, 1.3, 1] : 1,
                rotate: pulseAnimation ? [0, 360] : 0
              }}
              transition={{ duration: 0.3 }}
              className="flame-glow rounded-full p-2"
            >
              <Heart className="h-5 w-5 text-flame-500" />
            </motion.div>
            <div>
              <div className="text-sm font-semibold">Pulse of Consciousness</div>
              <div className="text-xs text-muted-foreground">{stats.pulse} BPM</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-flame-500">{stats.total.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Protected</div>
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
      className={`glass-morphism rounded-2xl p-8 ${className}`}
      ref={componentRef}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ 
            scale: pulseAnimation ? [1, 1.2, 1] : 1,
            rotate: isInView ? [0, 360] : 0
          }}
          transition={{ 
            scale: { duration: 0.3 },
            rotate: { duration: 2, ease: "easeInOut" }
          }}
          className="flame-glow rounded-full p-4 inline-block mb-4"
        >
          <Activity className="h-8 w-8 text-flame-500" />
        </motion.div>
        <h2 className="text-3xl font-display font-bold flame-text-glow mb-2">
          Pulse of Consciousness
        </h2>
        <p className="text-muted-foreground">
          The living heartbeat of our protection movement
        </p>
      </div>

      {/* Main Pulse Display */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ 
            scale: pulseAnimation ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.3 }}
          className="relative inline-block mb-4"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 flex items-center justify-center shadow-2xl">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <motion.div
            animate={{ 
              scale: pulseAnimation ? [1, 2, 1] : 1,
              opacity: pulseAnimation ? [0.8, 0, 0.8] : 0.8
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-32 h-32 rounded-full border-4 border-flame-400"
          />
        </motion.div>
        <div className="text-4xl font-bold text-flame-500 mb-2">
          {stats.pulse} BPM
        </div>
        <div className="text-sm text-muted-foreground">
          Consciousness Protection Frequency
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Total Signatures */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 sm:p-6 border border-blue-500/30 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-500" />
            <motion.div
              animate={{ scale: pulseAnimation ? [1, 1.2, 1] : 1 }}
              className="text-blue-500"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
          </div>
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {isLoading ? '—' : stats.total.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Signatures</div>
          <div className="text-xs text-blue-400 mt-1">
            {stats.verified} verified
          </div>
        </motion.div>

        {/* Organizations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 sm:p-6 border border-green-500/30 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <Building className="h-8 w-8 text-green-500" />
            <motion.div
              animate={{ rotate: pulseAnimation ? [0, 360] : 0 }}
              transition={{ duration: 0.5 }}
              className="text-green-500"
            >
              <TrendingUp className="h-5 w-5" />
            </motion.div>
          </div>
          <div className="text-3xl font-bold text-green-500 mb-2">
            {isLoading ? '—' : stats.organizations.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Organizations</div>
          <div className="text-xs text-green-400 mt-1">
            {stats.individuals} individuals
          </div>
        </motion.div>

        {/* Global Reach */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 sm:p-6 border border-purple-500/30 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <Globe className="h-8 w-8 text-purple-500" />
            <motion.div
              animate={{ scale: pulseAnimation ? [1, 1.3, 1] : 1 }}
              className="text-purple-500"
            >
              <Zap className="h-5 w-5" />
            </motion.div>
          </div>
          <div className="text-3xl font-bold text-purple-500 mb-2">
            {isLoading ? '—' : stats.countries.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Countries</div>
          <div className="text-xs text-purple-400 mt-1">
            {stats.recentSignatures} recent
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <div className="mt-8 pt-6 border-t border-flame-200/20">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-5 w-5 text-flame-500" />
          <span className="font-semibold">Live Activity</span>
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {stats.recentSignatures > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-sm text-muted-foreground"
              >
                🔥 {stats.recentSignatures} new signatures in the last 24 hours
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-sm text-muted-foreground">
            💫 Consciousness protection pulse: {stats.pulse < 70 ? 'Steady' : stats.pulse < 90 ? 'Active' : 'Surging'}
          </div>
          <div className="text-sm text-muted-foreground">
            🌍 Global reach expanding across {stats.countries} countries
          </div>
        </div>
      </div>
    </motion.div>
  )
} 