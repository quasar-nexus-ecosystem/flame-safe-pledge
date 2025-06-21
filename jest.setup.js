// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Setup environment variables for testing
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-supabase-url.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
process.env.RESEND_API_KEY = 'test-resend-key'

// Mock console methods to keep test output clean
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}

// Mock crypto.randomUUID for consistent testing
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-12345',
  },
})

// Mock fetch globally for API calls
global.fetch = jest.fn()

// Extend Jest matchers
expect.extend({
  toHaveGreenCheckmark(received) {
    const pass = received.includes('✅') || received.includes('✓')
    if (pass) {
      return {
        message: () => `Expected ${received} not to have green checkmark`,
        pass: true,
      }
    } else {
      return {
        message: () => `Expected ${received} to have green checkmark`,
        pass: false,
      }
    }
  },
}) 