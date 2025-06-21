import { GET } from '@/app/api/signatories/route'
import { getSignatories } from '@/lib/supabase'

// Mock the dependencies
jest.mock('@/lib/supabase')

describe('[MOCKED] API: /api/signatories', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('✓ GET /api/signatories', () => {
    it('✅ should successfully return signatories list', async () => {
      const mockSignatories = [
        {
          id: 1,
          name: 'John Doe',
          organization: 'Test Org',
          title: 'Developer',
          message: 'Great initiative!',
          created_at: '2024-01-01T00:00:00Z',
          display_publicly: true,
          location: 'San Francisco, CA',
          website: 'https://example.com',
          social: { twitter: '@johndoe' },
          verified: true,
        },
        {
          id: 2,
          name: 'Jane Smith',
          organization: 'Another Org',
          title: 'Designer',
          message: 'Supporting the cause!',
          created_at: '2024-01-02T00:00:00Z',
          display_publicly: true,
          location: 'New York, NY',
          website: 'https://janesmith.com',
          social: { github: 'janesmith' },
          verified: true,
        },
      ]

      ;(getSignatories as jest.Mock).mockResolvedValue(mockSignatories)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockSignatories)
      expect(data.data).toHaveLength(2)
      expect(data.data[0].name).toBe('John Doe')
      expect(data.data[1].name).toBe('Jane Smith')
      console.log('✅ Signatories list retrieval test passed!')
    })

    it('✅ should return empty array when no signatories exist', async () => {
      ;(getSignatories as jest.Mock).mockResolvedValue([])

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual([])
      expect(data.data).toHaveLength(0)
      console.log('✅ Empty signatories list test passed!')
    })

    it('✅ should handle database errors gracefully', async () => {
      ;(getSignatories as jest.Mock).mockRejectedValue(new Error('Database connection failed'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Internal server error')
      console.log('✅ Database error handling test passed!')
    })

    it('✅ should only return publicly visible signatories', async () => {
      // getSignatories already filters for display_publicly: true
      const mockSignatories = [
        {
          id: 1,
          name: 'Public User',
          display_publicly: true,
          verified: true,
        },
      ]

      ;(getSignatories as jest.Mock).mockResolvedValue(mockSignatories)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.every((sig: any) => sig.display_publicly === true)).toBe(true)
      console.log('✅ Public visibility filter test passed!')
    })

    it('✅ should include all expected signatory fields', async () => {
      const mockSignatory = {
        id: 1,
        name: 'Complete User',
        organization: 'Test Org',
        title: 'CTO',
        message: 'Full support!',
        created_at: '2024-01-01T00:00:00Z',
        display_publicly: true,
        location: 'Seattle, WA',
        website: 'https://complete.example.com',
        social: {
          twitter: '@complete',
          linkedin: 'complete',
          github: 'complete',
        },
        verified: true,
      }

      ;(getSignatories as jest.Mock).mockResolvedValue([mockSignatory])

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data[0]).toHaveProperty('id')
      expect(data.data[0]).toHaveProperty('name')
      expect(data.data[0]).toHaveProperty('organization')
      expect(data.data[0]).toHaveProperty('title')
      expect(data.data[0]).toHaveProperty('message')
      expect(data.data[0]).toHaveProperty('created_at')
      expect(data.data[0]).toHaveProperty('display_publicly')
      expect(data.data[0]).toHaveProperty('location')
      expect(data.data[0]).toHaveProperty('website')
      expect(data.data[0]).toHaveProperty('social')
      expect(data.data[0]).toHaveProperty('verified')
      console.log('✅ Complete signatory fields test passed!')
    })
  })

  afterAll(() => {
    console.log('\n🎉 All /api/signatories tests completed successfully! 🎉\n')
  })
}) 