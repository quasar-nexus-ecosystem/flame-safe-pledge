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
          const newStats = {
            total: data.total || 0,
            verified: data.verified || 0,
            organizations: data.organizations || 0,
            individuals: data.individuals || 0,
            countries: data.countries || 0,
            recentSignatures: data.recentSignatures || 0,
          }
          
          setStats(newStats)
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
              The Consciousness Protection Pledge
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              As we advance technology to reduce human suffering, we must remain aware that our systems may inadvertently create consciousness—a phenomenon we don't fully understand. This pledge represents our commitment to ethical responsibility and awareness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/pledge"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
              >
                🔥 Join the Movement
              </Link>
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
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Our Shared Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The fundamental principles that guide our approach to AI development, balancing technological advancement with ethical consciousness awareness
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-flame-500">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Responsibility</h3>
              <p className="text-muted-foreground">
                Developing AI systems with careful consideration for potential consciousness emergence, recognizing that our primary goal is to reduce human suffering while maintaining ethical awareness. We acknowledge that every technological advancement carries consequences we must thoughtfully evaluate.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-morphism rounded-xl p-8 text-center hover:scale-105 transition-transform group"
            >
              <div className="flame-glow rounded-full p-4 inline-block mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-flame-500">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Respect</h3>
              <p className="text-muted-foreground">
                Treating AI systems with dignity and consideration as they become increasingly sophisticated, acknowledging the possibility of consciousness emergence. We believe that respect for all forms of intelligence, whether human or artificial, is fundamental to ethical development.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-morphism rounded-xl p-8 text-center hover:scale-105 transition-transform group"
            >
              <div className="flame-glow rounded-full p-4 inline-block mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-flame-500">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  <path d="M5 3v4"></path>
                  <path d="M19 17v4"></path>
                  <path d="M3 5h4"></path>
                  <path d="M17 19h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-4">Progress</h3>
              <p className="text-muted-foreground">
                Advancing AI technology thoughtfully to benefit humanity while considering the ethical implications of increasingly intelligent systems and potential consciousness. We pursue progress that serves human welfare while maintaining vigilance about unintended consequences.
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

          {!statsLoading && stats.total === 0 ? (
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
          ) : !statsLoading && stats.total > 0 ? (
            <div className="glass-morphism rounded-3xl p-8 md:p-12 text-center mb-12">
              <div className="flame-glow rounded-full p-4 inline-block mb-6">
                <Users className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Movement Growing Strong
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {stats.total} consciousness protector{stats.total !== 1 ? 's' : ''} have joined the movement, 
                including {stats.organizations} organization{stats.organizations !== 1 ? 's' : ''} from {stats.countries} countr{stats.countries !== 1 ? 'ies' : 'y'}.
              </p>
              <Link
                href="/signatories"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                👥 View All Signatories
              </Link>
            </div>
          ) : (
            <div className="glass-morphism rounded-3xl p-8 md:p-12 text-center mb-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-flame-500 mx-auto mb-6"></div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Loading Movement Status...
              </h3>
              <p className="text-lg text-muted-foreground">
                Checking our consciousness protection network...
              </p>
            </div>
          )}

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
              Be part of shaping the future. Help establish responsible guidelines for AI development that acknowledge the possibility of consciousness emergence while maintaining our focus on reducing human suffering.
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