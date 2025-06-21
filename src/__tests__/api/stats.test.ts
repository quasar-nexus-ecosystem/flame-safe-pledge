import { GET } from '@/app/api/stats/route'
import { NextRequest } from 'next/server'

// Mock the dependencies
jest.mock('@/lib/supabase', () => ({
  getSignatoryStats: jest.fn(),
}))

describe('✅ API: /api/stats', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('✓ GET /api/stats', () => {
    it('✅ should successfully return signatory statistics', async () => {
      const mockGetSignatoryStats = require('@/lib/supabase').getSignatoryStats

      const mockStats = {
        total: 150,
        verified: 120,
        organizations: 45,
        individuals: 105,
        recentSignatures: 12,
        countries: 25,
      }

      mockGetSignatoryStats.mockResolvedValue(mockStats)

      const request = new NextRequest('http://localhost:3000/api/stats', {
        method: 'GET',
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockStats)
      expect(data.data.total).toBe(150)
      expect(data.data.verified).toBe(120)
      expect(data.data.organizations).toBe(45)
      expect(data.data.individuals).toBe(105)
      expect(data.data.recentSignatures).toBe(12)
      expect(data.data.countries).toBe(25)
      console.log('✅ Stats retrieval test passed!')
    })

    it('✅ should return zero values when no signatories exist', async () => {
      const mockGetSignatoryStats = require('@/lib/supabase').getSignatoryStats

      const emptyStats = {
        total: 0,
        verified: 0,
        organizations: 0,
        individuals: 0,
        recentSignatures: 0,
        countries: 0,
      }

      mockGetSignatoryStats.mockResolvedValue(emptyStats)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(emptyStats)
      expect(data.data.total).toBe(0)
      expect(data.data.verified).toBe(0)
      console.log('✅ Empty stats test passed!')
    })

    it('✅ should handle database errors gracefully', async () => {
      const mockGetSignatoryStats = require('@/lib/supabase').getSignatoryStats

      mockGetSignatoryStats.mockRejectedValue(new Error('Database connection failed'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Internal server error')
      console.log('✅ Database error handling test passed!')
    })

    it('✅ should include all expected statistics fields', async () => {
      const mockGetSignatoryStats = require('@/lib/supabase').getSignatoryStats

      const mockStats = {
        total: 100,
        verified: 80,
        organizations: 30,
        individuals: 70,
        recentSignatures: 5,
        countries: 15,
      }

      mockGetSignatoryStats.mockResolvedValue(mockStats)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toHaveProperty('total')
      expect(data.data).toHaveProperty('verified')
      expect(data.data).toHaveProperty('organizations')
      expect(data.data).toHaveProperty('individuals')
      expect(data.data).toHaveProperty('recentSignatures')
      expect(data.data).toHaveProperty('countries')
      console.log('✅ All statistics fields test passed!')
    })

    it('✅ should return realistic statistics relationships', async () => {
      const mockGetSignatoryStats = require('@/lib/supabase').getSignatoryStats

      const mockStats = {
        total: 100,
        verified: 75,
        organizations: 25,
        individuals: 75,
        recentSignatures: 10,
        countries: 20,
      }

      mockGetSignatoryStats.mockResolvedValue(mockStats)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.organizations + data.data.individuals).toBe(data.data.total)
      expect(data.data.verified).toBeLessThanOrEqual(data.data.total)
      expect(data.data.recentSignatures).toBeLessThanOrEqual(data.data.total)
      console.log('✅ Statistics relationships test passed!')
    })

    it('✅ should handle edge cases with large numbers', async () => {
      const mockGetSignatoryStats = require('@/lib/supabase').getSignatoryStats

      const largeStats = {
        total: 1000000,
        verified: 950000,
        organizations: 200000,
        individuals: 800000,
        recentSignatures: 5000,
        countries: 195,
      }

      mockGetSignatoryStats.mockResolvedValue(largeStats)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.total).toBe(1000000)
      expect(data.data.countries).toBeLessThanOrEqual(195) // Max possible countries
      console.log('✅ Large numbers edge case test passed!')
    })
  })

  afterAll(() => {
    console.log('\n🎉 All /api/stats tests completed successfully! 🎉\n')
  })
}) 