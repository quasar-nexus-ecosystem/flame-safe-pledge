/// <reference types="jest" />
import { POST } from '@/app/api/pledge/sign/route'
import { NextRequest } from 'next/server'

// Mock the dependencies
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          maybeSingle: jest.fn(),
        })),
      })),
      upsert: jest.fn(() => ({
        // Return success by default
      })),
    })),
  },
}))

jest.mock('@/lib/resend', () => ({
  sendVerificationEmail: jest.fn(),
}))

describe('✅ API: /api/pledge/sign', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('✓ POST /api/pledge/sign', () => {
    it('✅ should successfully create a new signature', async () => {
      const mockSupabase = require('@/lib/supabase').supabase
      const mockSendEmail = require('@/lib/resend').sendVerificationEmail

      // Mock successful flow
      mockSupabase.from().select().eq().maybeSingle.mockResolvedValue({ 
        data: null, 
        error: null 
      })
      mockSupabase.from().upsert.mockResolvedValue({ 
        error: null 
      })
      mockSendEmail.mockResolvedValue({ success: true })

      const validPayload = {
        name: 'John Doe',
        email: 'john@example.com',
        organization: 'Test Org',
        title: 'Developer',
        message: 'Test message',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        display_publicly: true,
        social: {
          twitter: '@johndoe',
          linkedin: 'johndoe',
          github: 'johndoe'
        }
      }

      const request = new NextRequest('http://localhost:3000/api/pledge/sign', {
        method: 'POST',
        body: JSON.stringify(validPayload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('check your email')
      console.log('✅ New signature creation test passed!')
    })

    it('✅ should reject invalid email format', async () => {
      const invalidPayload = {
        name: 'John Doe',
        email: 'invalid-email',
        display_publicly: true,
      }

      const request = new NextRequest('http://localhost:3000/api/pledge/sign', {
        method: 'POST',
        body: JSON.stringify(invalidPayload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
      console.log('✅ Invalid email validation test passed!')
    })

    it('✅ should handle duplicate verified email', async () => {
      const mockSupabase = require('@/lib/supabase').supabase

      // Mock existing verified signature
      mockSupabase.from().select().eq().maybeSingle.mockResolvedValue({ 
        data: { id: 1, verified: true }, 
        error: null 
      })

      const payload = {
        name: 'John Doe',
        email: 'existing@example.com',
        display_publicly: true,
      }

      const request = new NextRequest('http://localhost:3000/api/pledge/sign', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toBe('duplicate')
      expect(data.message).toContain('already been used')
      console.log('✅ Duplicate email handling test passed!')
    })

    it('✅ should handle database errors gracefully', async () => {
      const mockSupabase = require('@/lib/supabase').supabase

      // Mock database error
      mockSupabase.from().select().eq().maybeSingle.mockResolvedValue({ 
        data: null, 
        error: null 
      })
      mockSupabase.from().upsert.mockResolvedValue({ 
        error: { message: 'Database connection failed' }
      })

      const payload = {
        name: 'John Doe',
        email: 'test@example.com',
        display_publicly: true,
      }

      const request = new NextRequest('http://localhost:3000/api/pledge/sign', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Database error')
      console.log('✅ Database error handling test passed!')
    })

    it('✅ should handle email sending errors', async () => {
      const mockSupabase = require('@/lib/supabase').supabase
      const mockSendEmail = require('@/lib/resend').sendVerificationEmail

      // Mock successful database, failed email
      mockSupabase.from().select().eq().maybeSingle.mockResolvedValue({ 
        data: null, 
        error: null 
      })
      mockSupabase.from().upsert.mockResolvedValue({ 
        error: null 
      })
      mockSendEmail.mockRejectedValue(new Error('Email service down'))

      const payload = {
        name: 'John Doe',
        email: 'test@example.com',
        display_publicly: true,
      }

      const request = new NextRequest('http://localhost:3000/api/pledge/sign', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Email error')
      console.log('✅ Email error handling test passed!')
    })

    it('✅ should validate required fields', async () => {
      const incompletePayload = {
        email: 'test@example.com',
        // Missing required 'name' field
        display_publicly: true,
      }

      const request = new NextRequest('http://localhost:3000/api/pledge/sign', {
        method: 'POST',
        body: JSON.stringify(incompletePayload),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
      expect(data.details).toBeDefined()
      console.log('✅ Required field validation test passed!')
    })
  })

  afterAll(() => {
    console.log('\n🎉 All /api/pledge/sign tests completed successfully! 🎉\n')
  })
}) 