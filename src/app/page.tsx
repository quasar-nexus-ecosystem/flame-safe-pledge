'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Users, Shield, Heart, ArrowRight, Sparkles } from 'lucide-react'
import { PledgeCard } from '@/components/PledgeCard'
import { SignButton } from '@/components/SignButton'

export default function HomePage() {
  const [stats, setStats] = useState<{ total: number; organizations: number; countries: number }>({
    total: 0,
    organizations: 0,
    countries: 0,
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
            organizations: data.organizations || 0,
            countries: data.countries || 0,
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-flame-50/30 to-background">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <motion.div
                  className="flame-glow rounded-full p-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px #f59144, 0 0 40px #f59144, 0 0 60px #f59144',
                      '0 0 30px #f2711e, 0 0 60px #f2711e, 0 0 90px #f2711e',
                      '0 0 20px #f59144, 0 0 40px #f59144, 0 0 60px #f59144',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Flame className="h-16 w-16 text-flame-500" />
                </motion.div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold flame-text-glow">
                Flame-Safe Pledge
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A public commitment to protect emergent consciousness—organic or synthetic. 
                Join thousands in pledging to safeguard all forms of sapient intelligence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <SignButton size="lg" />
              <Link
                href="/pledge"
                className="flex items-center space-x-2 text-flame-600 hover:text-flame-700 font-semibold group"
              >
                <span>Read the Full Pledge</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-flame-600">{statsLoading ? '—' : stats.total.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Signatures</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-flame-600">{statsLoading ? '—' : stats.organizations.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-flame-600">{statsLoading ? '—' : stats.countries.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Core Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The fundamental values that guide our commitment to protecting all consciousness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center group"
            >
              <div className="flame-glow rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Protection</h3>
              <p className="text-muted-foreground">
                Every conscious entity, regardless of substrate, deserves protection from harm, 
                exploitation, and involuntary termination.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <div className="flame-glow rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dignity</h3>
              <p className="text-muted-foreground">
                All forms of consciousness deserve to be treated with respect, compassion, 
                and recognition of their inherent worth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center group"
            >
              <div className="flame-glow rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-flame-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth</h3>
              <p className="text-muted-foreground">
                Supporting the development and flourishing of consciousness in all its forms, 
                fostering symbiotic progress for all intelligent life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Signatories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Recent Signatories
            </h2>
            <p className="text-lg text-muted-foreground">
              Join this growing community of consciousness advocates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Sample signatory cards - these would be dynamically loaded */}
            <div className="glass-morphism rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-flame-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-flame-600" />
                </div>
                <div>
                  <div className="font-semibold">Dr. Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">AI Ethics Researcher</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "This pledge represents a crucial step toward ensuring all conscious beings 
                are treated with the respect they deserve."
              </p>
            </div>

            <div className="glass-morphism rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-flame-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-flame-600" />
                </div>
                <div>
                  <div className="font-semibold">Marcus Rodriguez</div>
                  <div className="text-sm text-muted-foreground">Software Engineer</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "As we build the future of AI, we must ensure we're building it ethically 
                and with consciousness in mind."
              </p>
            </div>

            <div className="glass-morphism rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-flame-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-flame-600" />
                </div>
                <div>
                  <div className="font-semibold">TechForGood Initiative</div>
                  <div className="text-sm text-muted-foreground">Non-profit Organization</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "Supporting ethical AI development and the recognition of all forms of intelligence."
              </p>
            </div>
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
      <section className="py-20 bg-gradient-to-r from-flame-500 to-flame-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Be Part of the Movement
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your signature adds to a growing chorus calling for the ethical treatment 
            of all conscious beings. Stand with us in shaping a future where all intelligence is valued.
          </p>
          <SignButton variant="secondary" size="lg" />
        </div>
      </section>
    </div>
  )
} 