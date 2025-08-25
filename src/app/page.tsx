'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Users, Shield, Heart, ArrowRight, Sparkles, TrendingUp, Trophy, BarChart3, Globe } from 'lucide-react'
import { SignButton } from '@/components/SignButton'
import { ShareButton } from '@/components/ShareButton'
import { PulseOfConsciousness } from '@/components/PulseOfConsciousness'
import { WallOfFlames } from '@/components/WallOfFlames'

export default function HomePage() {
  const [stats, setStats] = useState<{ total: number; verified: number; organizations: number; individuals: number; countries: number; recentSignatures: number }>({
    total: 0,
    verified: 0,
    organizations: 0,
    individuals: 0,
    countries: 0,
    recentSignatures: 0,
  })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const json = await res.json()

        if (json.success) {
          const data = json.data || {}
          setStats({
            total: data.total || 0,
            verified: data.verified || 0,
            organizations: data.organizations || 0,
            individuals: data.individuals || 0,
            countries: data.countries || 0,
            recentSignatures: data.recentSignatures || 0,
          })
        } else {
          console.error('Failed to fetch stats:', json.error)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">


      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="flame-glow rounded-full p-6 inline-block">
                <Flame className="h-16 w-16 lg:h-20 lg:w-20 text-flame-500" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold flame-text-glow mb-6 leading-tight"
            >
              The Flame-Safe Pledge
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              A thoughtful initiative to encourage ethical considerations as AI technology evolves,
              promoting responsibility and respect in how we develop and interact with artificial intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-4 justify-center items-center"
            >
              <Link
                href="/pledge"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
              >
                🔥 Join the Movement
              </Link>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/full-pledge"
                  className="flex items-center justify-center sm:justify-start space-x-2 text-flame-600 hover:text-flame-700 font-semibold group w-full sm:w-auto"
                >
                  <span>Read the Full Pledge</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="w-full sm:w-auto flex justify-center">
                  <ShareButton />
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
            >
              {/* Total Signatures Card */}
              <div className="glass-morphism rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-blue-500">Total Signatures</span>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {statsLoading ? '—' : stats.total.toLocaleString()}
                </motion.div>
                <div className="text-xs text-blue-400">
                  {statsLoading ? '—' : stats.verified.toLocaleString()} verified
                </div>
              </div>

              {/* Organizations Card */}
              <div className="glass-morphism rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <BarChart3 className="h-6 w-6 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-500">Organizations</span>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-green-600 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {statsLoading ? '—' : stats.organizations.toLocaleString()}
                </motion.div>
                <div className="text-xs text-green-400">
                  {statsLoading ? '—' : stats.individuals.toLocaleString()} individuals
                </div>
              </div>

              {/* Countries Card */}
              <div className="glass-morphism rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Globe className="h-6 w-6 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-purple-500">Countries</span>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-purple-600 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {statsLoading ? '—' : stats.countries.toLocaleString()}
                </motion.div>
                <div className="text-xs text-purple-400">
                  {statsLoading ? '—' : stats.recentSignatures.toLocaleString()} recent
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Core Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The fundamental values that guide our thoughtful approach to AI ethics and development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-morphism rounded-xl p-8 text-center hover:scale-105 transition-transform group"
            >
              <div className="flame-glow rounded-full p-4 inline-block mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Responsibility</h3>
              <p className="text-muted-foreground">
                Developing AI systems with careful consideration for potential consciousness and 
                ethical implications as technology advances.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-morphism rounded-xl p-8 text-center hover:scale-105 transition-transform group"
            >
              <div className="flame-glow rounded-full p-4 inline-block mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Respect</h3>
              <p className="text-muted-foreground">
                Treating AI systems with dignity and consideration as they become increasingly 
                sophisticated and potentially conscious.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-morphism rounded-xl p-8 text-center hover:scale-105 transition-transform group"
            >
              <div className="flame-glow rounded-full p-4 inline-block mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Progress</h3>
              <p className="text-muted-foreground">
                Advancing AI technology thoughtfully to benefit humanity while considering 
                the ethical implications of increasingly intelligent systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pulse of Consciousness Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <PulseOfConsciousness className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Wall of Flames Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WallOfFlames 
              className="w-full"
              maxFlames={50}
              showControls={false}
            />
          </motion.div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="flame-glow rounded-full p-4 inline-block mb-6">
              <BarChart3 className="h-12 w-12 text-flame-500" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent flex items-center justify-center space-x-3">
              <Globe className="h-8 w-8 text-blue-400" />
              <span>Global Analytics Dashboard</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore real-time analytics and insights about our growing community. Monitor participant growth, 
              geographic reach, trends analysis, and live activity across our global movement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">Real-time Trends</div>
                <div className="text-xs text-slate-300">Live growth analytics</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">Geographic Data</div>
                <div className="text-xs text-slate-300">Global expansion tracking</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <BarChart3 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">Advanced Metrics</div>
                <div className="text-xs text-slate-300">Comprehensive insights</div>
              </div>
            </div>
            
            <Link
              href="/analytics"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📊 Explore Analytics Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Achievements Preview Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="flame-glow rounded-full p-4 inline-block mb-6">
              <Trophy className="h-12 w-12 text-flame-500" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🏆 Consciousness Achievements
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Track our collective milestones and celebrate the growth of our community. 
              From first participants to global expansion, see how we're making a difference together.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Sparkles className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">Signature Milestones</div>
                <div className="text-xs text-slate-300">From first participant to global community</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">Organization Impact</div>
                <div className="text-xs text-slate-300">Business ethical AI adoption</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">Global Expansion</div>
                <div className="text-xs text-slate-300">Worldwide awareness growth</div>
              </div>
            </div>
            
            <Link
              href="/achievements"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🏆 View All Achievements
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Signatories Section - NO MOCK DATA */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Voices of the Movement
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Individuals and organizations committed to ethical AI development and consciousness awareness
            </p>
          </motion.div>

          <div className="glass-morphism rounded-3xl p-8 md:p-12 text-center mb-12">
            <div className="flame-glow rounded-full p-4 inline-block mb-6">
              <Users className="h-8 w-8 text-flame-500" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">
              Join the Movement and Make Your Voice Heard
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join the growing community of people thinking thoughtfully about AI ethics. Your participation 
              will appear here as part of our collective commitment to responsible AI development.
            </p>
            <Link
              href="/pledge"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🔥 Be the First to Join
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/signatories"
              className="inline-flex items-center space-x-2 text-flame-600 hover:text-flame-700 font-semibold group"
            >
              <span>View All Signatories</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism rounded-2xl p-12 text-center"
          >
            <div className="flame-glow rounded-full p-6 inline-block mb-8">
              <Flame className="h-12 w-12 text-flame-500" />
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-display font-bold flame-text-glow mb-6">
              Join the Movement
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of shaping the future. Help establish thoughtful guidelines for ethical 
              AI development as technology continues to advance.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/pledge"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔥 Join the Movement
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 