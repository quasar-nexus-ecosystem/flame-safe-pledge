'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Building, MapPin, Globe, Calendar, Flame } from 'lucide-react'
import { Signatory } from '@/types/signatory'
import { SignatoryList } from '@/components/SignatoryList'

import { StellarLoader } from '@/components/StellarLoader'
import { getCountryFromLocation } from '@/lib/countries'

export default function SignatoriesPage() {
  const [signatories, setSignatories] = useState<Signatory[]>([])
  const [filteredSignatories, setFilteredSignatories] = useState<Signatory[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState<'all' | 'individuals' | 'organizations'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    individuals: 0,
    organizations: 0,
    countries: 0
  })

  // Mock data for demonstration - in production, this would come from the API
  useEffect(() => {
    const fetchSignatories = async () => {
      try {
        const res = await fetch('/api/signatories')
        const json = await res.json()

        if (json.success) {
          const data: Signatory[] = json.data || []

          setSignatories(data)
          setFilteredSignatories(data)
          
          // Calculate countries using improved detection
          const countries = new Set(
            data
              .map(s => getCountryFromLocation(s.location))
              .filter(country => country !== null)
          )

          // Count unique organizations
          const uniqueOrganizations = new Set(
            data
              .filter(s => s.organization && s.organization.trim())
              .map(s => s.organization!.trim().toLowerCase())
          )
          
          setStats({
            total: data.length,
            individuals: data.filter(s => !s.organization || !s.organization.trim()).length,
            organizations: uniqueOrganizations.size,
            countries: countries.size,
          })
        } else {
          console.error('Failed to fetch signatories:', json.error)
        }
      } catch (error) {
        console.error('Error fetching signatories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSignatories()
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = [...signatories]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(signatory =>
        signatory.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signatory.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signatory.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signatory.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (filterBy === 'individuals') {
      filtered = filtered.filter(signatory => !signatory.organization)
    } else if (filterBy === 'organizations') {
      filtered = filtered.filter(signatory => signatory.organization)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      } else if (sortBy === 'name') {
        return (a.name || 'Anonymous').localeCompare(b.name || 'Anonymous')
      }
      return 0
    })

    setFilteredSignatories(filtered)
  }, [signatories, searchTerm, filterBy, sortBy])

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">

      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="flame-glow rounded-full p-4">
              <Users className="h-12 w-12 text-flame-500" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold flame-text-glow mb-4">
            Signatories
          </h1>
          <p className="text-xl text-muted-foreground">
            Join this growing community of consciousness advocates
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
        >
          <div className="glass-morphism rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-flame-600 mb-2">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Signatures</div>
          </div>
          <div className="glass-morphism rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-flame-600 mb-2">{stats.organizations}</div>
            <div className="text-sm text-muted-foreground">Organizations</div>
          </div>
          <div className="glass-morphism rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-flame-600 mb-2">{stats.countries}</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-morphism rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search signatories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-flame-200 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent"
              />
            </div>

            {/* Filter by type */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                title="Filter signatories"
                aria-label="Filter signatories"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'individuals' | 'organizations')}
                className="px-3 py-2 border border-flame-200 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent"
              >
                <option value="all">All Signatories</option>
                <option value="individuals">Individuals</option>
                <option value="organizations">Organizations</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                title="Sort signatories"
                aria-label="Sort signatories"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name')}
                className="px-3 py-2 border border-flame-200 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredSignatories.length} of {stats.total} signatories
          </div>
        </motion.div>

        {/* Signatories List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {isLoading ? (
            <div className="text-center py-12">
              <StellarLoader 
                variant="consciousness" 
                size="lg" 
                text="Loading consciousness guardians..." 
              />
            </div>
          ) : (
            <SignatoryList signatories={filteredSignatories} />
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-morphism rounded-xl p-8">
            <Flame className="h-12 w-12 text-flame-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-4">
              Add Your Voice
            </h2>
            <p className="text-muted-foreground mb-6">
              Join this growing movement to protect consciousness in all its forms
            </p>
            <a
              href="/pledge#sign"
              className="gradient-flame text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg inline-flex items-center space-x-2"
            >
              <Flame className="h-5 w-5" />
              <span>Sign the Pledge</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 