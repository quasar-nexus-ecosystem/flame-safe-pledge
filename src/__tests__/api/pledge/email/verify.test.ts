import { GET } from '@/app/api/pledge/email/verify/[token]/route'
import { NextRequest } from 'next/server'

// Mock the dependencies
const mockSingle = jest.fn()
const mockUpdate = jest.fn(() => ({
  eq: jest.fn(() => ({
    select: jest.fn(() => ({
      single: mockSingle,
    })),
  })),
}))

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      update: mockUpdate,
    })),
  },
}))

// Make the mocks available for individual test setup
const setupMocks = () => ({
  mockSingle,
  mockUpdate,
})

describe('✅ API: /api/pledge/email/verify/[token]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('✓ GET /api/pledge/email/verify/[token]', () => {
    it('✅ should successfully verify valid token and redirect', async () => {
      const { mockSingle } = setupMocks()

      // Mock successful verification
      mockSingle.mockResolvedValue({
        data: { 
          id: 1, 
          name: 'John Doe', 
          email: 'john@example.com',
          verified: true 
        },
        error: null,
      })

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/valid-token-123?next=/pledge/verified'
      )

      const params = Promise.resolve({ token: 'valid-token-123' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/pledge/verified')
      expect(response.headers.get('location')).toContain('name=John+Doe')
      console.log('✅ Valid token verification test passed!')
    })

    it('✅ should redirect to invalid-token page for missing token', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/'
      )

      const params = Promise.resolve({ token: '' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/pledge/invalid-token')
      console.log('✅ Missing token test passed!')
    })

    it('✅ should redirect to invalid-token page for invalid token', async () => {
      const { mockSingle } = setupMocks()

      // Mock invalid token (no data found)
      mockSingle.mockResolvedValue({
        data: null,
        error: { message: 'No matching records found' },
      })

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/invalid-token-123'
      )

      const params = Promise.resolve({ token: 'invalid-token-123' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/pledge/invalid-token')
      console.log('✅ Invalid token test passed!')
    })

    it('✅ should handle database errors gracefully', async () => {
      const { mockSingle } = setupMocks()

      // Mock database error
      mockSingle.mockRejectedValue(
        new Error('Database connection failed')
      )

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/some-token-123'
      )

      const params = Promise.resolve({ token: 'some-token-123' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/pledge/invalid-token')
      console.log('✅ Database error handling test passed!')
    })

    it('✅ should use custom redirect URL from next parameter', async () => {
      const { mockSingle } = setupMocks()

      // Mock successful verification
      mockSingle.mockResolvedValue({
        data: { 
          id: 1, 
          name: 'Jane Smith', 
          email: 'jane@example.com',
          verified: true 
        },
        error: null,
      })

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/valid-token-456?next=/custom/success'
      )

      const params = Promise.resolve({ token: 'valid-token-456' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/custom/success')
      expect(response.headers.get('location')).toContain('name=Jane+Smith')
      console.log('✅ Custom redirect URL test passed!')
    })

    it('✅ should default to verified page when no next parameter', async () => {
      const { mockSingle } = setupMocks()

      // Mock successful verification
      mockSingle.mockResolvedValue({
        data: { 
          id: 1, 
          name: 'Bob Wilson', 
          email: 'bob@example.com',
          verified: true 
        },
        error: null,
      })

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/valid-token-789'
      )

      const params = Promise.resolve({ token: 'valid-token-789' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/pledge/verified')
      expect(response.headers.get('location')).toContain('name=Bob+Wilson')
      console.log('✅ Default redirect test passed!')
    })

    it('✅ should handle verification without name gracefully', async () => {
      const { mockSingle } = setupMocks()

      // Mock successful verification without name
      mockSingle.mockResolvedValue({
        data: { 
          id: 1, 
          name: null, // No name provided
          email: 'anonymous@example.com',
          verified: true 
        },
        error: null,
      })

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/valid-token-anonymous'
      )

      const params = Promise.resolve({ token: 'valid-token-anonymous' })
      
      const response = await GET(request, { params })

      expect(response.status).toBe(307) // Next.js temporary redirect status
      expect(response.headers.get('location')).toContain('/pledge/verified')
      // Should not add name parameter when name is null
      expect(response.headers.get('location')).not.toContain('name=')
      console.log('✅ No name verification test passed!')
    })

    it('✅ should properly update verification status in database', async () => {
      const mockSupabase = require('@/lib/supabase').supabase
      const mockUpdate = jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn().mockResolvedValue({
              data: { 
                id: 1, 
                name: 'Test User', 
                verified: true 
              },
              error: null,
            }),
          })),
        })),
      }))

      mockSupabase.from.mockReturnValue({
        update: mockUpdate,
      })

      const request = new NextRequest(
        'http://localhost:3000/api/pledge/email/verify/test-token-123'
      )

      const params = Promise.resolve({ token: 'test-token-123' })
      
      await GET(request, { params })

      expect(mockUpdate).toHaveBeenCalledWith({ 
        verified: true, 
        verification_token: null 
      })
      console.log('✅ Database update verification test passed!')
    })
  })

  afterAll(() => {
    console.log('\n🎉 All /api/pledge/email/verify/[token] tests completed successfully! 🎉\n')
  })
}) 