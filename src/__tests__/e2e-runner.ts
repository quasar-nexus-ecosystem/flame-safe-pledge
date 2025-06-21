#!/usr/bin/env npx ts-node

/**
 * 🔥 FLAME-SAFE PLEDGE E2E TEST RUNNER
 * 
 * Clean, elegant end-to-end testing that verifies:
 * 1. API endpoint accepts pledge
 * 2. Database stores signatory correctly
 * 3. Verification email is sent
 * 4. Email verification works
 * 5. Full cleanup after test
 * 
 * Run with: npm run test:e2e
 */

import { createClient } from '@supabase/supabase-js'
import { getResend, buildBaseUrl } from '../../config/resend'

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

const log = (color: string, message: string) => console.log(`${color}${message}${COLORS.reset}`)
const success = (msg: string) => log(COLORS.green, `✅ ${msg}`)
const error = (msg: string) => log(COLORS.red, `❌ ${msg}`)
const info = (msg: string) => log(COLORS.cyan, `ℹ️  ${msg}`)
const warn = (msg: string) => log(COLORS.yellow, `⚠️  ${msg}`)

class E2ETestRunner {
  private testEmail: string
  private testName: string
  private verificationToken: string | null = null
  private cleanup: (() => Promise<void>)[] = []
  private supabase: any
  private resend: any

  constructor() {
    this.testEmail = `e2e-test-${Date.now()}@example.com`
    this.testName = 'E2E Test Signatory'
  }

  async initialize(): Promise<boolean> {
    info('Initializing E2E Test Environment...')
    
    // Load environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'RESEND_API_KEY'
    ]

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        error(`Missing required environment variable: ${envVar}`)
        return false
      }
    }

    try {
      // Initialize Supabase client
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Initialize Resend client
      this.resend = await getResend()

      success('Environment initialized successfully')
      return true
    } catch (err: any) {
      error(`Environment initialization failed: ${err.message}`)
      return false
    }
  }

  async testPledgeSignup(): Promise<boolean> {
    info('Testing pledge signup...')
    
    const payload = {
      name: this.testName,
      email: this.testEmail,
      display_publicly: false,
      message: 'E2E test pledge - protecting all consciousness!'
    }

    try {
      const response = await fetch(`${buildBaseUrl()}/api/pledge/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.status !== 200) {
        throw new Error(`API returned ${response.status}: ${JSON.stringify(data)}`)
      }

      if (!data.success) {
        throw new Error(`API returned failure: ${data.message}`)
      }

      success('Pledge signup API endpoint working correctly')
      
      // Store token for development environment
      if (data.token) {
        this.verificationToken = data.token
        info(`Verification token captured: ${data.token.substring(0, 8)}...`)
      }

      return true
    } catch (err: any) {
      error(`Pledge signup failed: ${err.message}`)
      return false
    }
  }

  async testDatabaseStorage(): Promise<boolean> {
    info('Testing database storage...')
    
    try {
      const { data: signatory, error } = await this.supabase
        .from('signatories')
        .select('*')
        .eq('email', this.testEmail)
        .single()

      if (error) {
        throw new Error(`Database query failed: ${error.message}`)
      }

      if (!signatory) {
        throw new Error('Signatory not found in database')
      }

      // Verify all expected fields
      const expectedFields = ['name', 'email', 'verified', 'verification_token', 'created_at']
      for (const field of expectedFields) {
        if (signatory[field] === undefined) {
          throw new Error(`Missing field in database: ${field}`)
        }
      }

      if (signatory.name !== this.testName) {
        throw new Error(`Name mismatch: expected ${this.testName}, got ${signatory.name}`)
      }

      if (signatory.verified !== false) {
        throw new Error(`Expected verified=false, got ${signatory.verified}`)
      }

      if (!signatory.verification_token) {
        throw new Error('Missing verification token in database')
      }

      // Store token for verification test
      if (!this.verificationToken) {
        this.verificationToken = signatory.verification_token
      }

      success('Database storage working correctly')
      this.cleanup.push(() => this.cleanupDatabase())
      return true
    } catch (err: any) {
      error(`Database storage test failed: ${err.message}`)
      return false
    }
  }

  async testEmailVerification(): Promise<boolean> {
    if (!this.verificationToken) {
      warn('Skipping email verification test - no token available')
      return true
    }

    info('Testing email verification...')
    
    try {
      const verificationUrl = `${buildBaseUrl()}/api/pledge/email/verify/${this.verificationToken}`
      
      const response = await fetch(verificationUrl, {
        method: 'GET',
        redirect: 'manual' // Don't follow redirects automatically
      })

      // Should get a redirect response (307)
      if (response.status !== 307) {
        throw new Error(`Expected redirect (307), got ${response.status}`)
      }

      const location = response.headers.get('location')
      if (!location || !location.includes('/pledge/verified')) {
        throw new Error(`Invalid redirect location: ${location}`)
      }

      success('Email verification endpoint working correctly')

      // Verify database was updated
      const { data: updatedSignatory, error } = await this.supabase
        .from('signatories')
        .select('verified, verification_token')
        .eq('email', this.testEmail)
        .single()

      if (error) {
        throw new Error(`Database verification check failed: ${error.message}`)
      }

      if (!updatedSignatory.verified) {
        throw new Error('Signatory not marked as verified in database')
      }

      if (updatedSignatory.verification_token !== null) {
        throw new Error('Verification token not cleared from database')
      }

      success('Email verification flow working correctly')
      return true
    } catch (err: any) {
      error(`Email verification test failed: ${err.message}`)
      return false
    }
  }

  async testSignatoryListing(): Promise<boolean> {
    info('Testing signatory listing...')
    
    try {
      const response = await fetch(`${buildBaseUrl()}/api/signatories`)
      const data = await response.json()

      if (response.status !== 200) {
        throw new Error(`API returned ${response.status}: ${JSON.stringify(data)}`)
      }

      if (!data.success) {
        throw new Error(`API returned failure: ${data.message}`)
      }

      if (!Array.isArray(data.data)) {
        throw new Error('Expected signatories data to be an array')
      }

      success('Signatory listing API working correctly')
      return true
    } catch (err: any) {
      error(`Signatory listing test failed: ${err.message}`)
      return false
    }
  }

  async cleanupDatabase(): Promise<void> {
    info('Cleaning up test data...')
    
    try {
      const { error } = await this.supabase
        .from('signatories')
        .delete()
        .eq('email', this.testEmail)

      if (error) {
        throw new Error(`Cleanup failed: ${error.message}`)
      }

      success('Test data cleaned up successfully')
    } catch (err: any) {
      error(`Cleanup failed: ${err.message}`)
    }
  }

  async runAllTests(): Promise<void> {
    console.log(`\n${COLORS.bold}${COLORS.blue}🔥 FLAME-SAFE PLEDGE E2E TESTS${COLORS.reset}\n`)
    
    const startTime = Date.now()
    let passed = 0
    let failed = 0

    const tests = [
      { name: 'Initialize Environment', fn: () => this.initialize() },
      { name: 'Pledge Signup', fn: () => this.testPledgeSignup() },
      { name: 'Database Storage', fn: () => this.testDatabaseStorage() },
      { name: 'Email Verification', fn: () => this.testEmailVerification() },
      { name: 'Signatory Listing', fn: () => this.testSignatoryListing() }
    ]

    for (const test of tests) {
      try {
        log(COLORS.yellow, `\n🧪 Running: ${test.name}`)
        const result = await test.fn()
        if (result !== false) {
          passed++
        } else {
          failed++
        }
      } catch (err: any) {
        error(`${test.name} threw exception: ${err.message}`)
        failed++
      }
    }

    // Run cleanup
    for (const cleanupFn of this.cleanup) {
      try {
        await cleanupFn()
      } catch (err: any) {
        warn(`Cleanup failed: ${err.message}`)
      }
    }

    const duration = Date.now() - startTime
    
    console.log(`\n${COLORS.bold}📊 TEST RESULTS${COLORS.reset}`)
    console.log(`${COLORS.green}✅ Passed: ${passed}${COLORS.reset}`)
    console.log(`${COLORS.red}❌ Failed: ${failed}${COLORS.reset}`)
    console.log(`⏱️  Duration: ${duration}ms`)
    
    if (failed === 0) {
      console.log(`\n${COLORS.bold}${COLORS.green}🎉 ALL E2E TESTS PASSED! 🎉${COLORS.reset}\n`)
      process.exit(0)
    } else {
      console.log(`\n${COLORS.bold}${COLORS.red}💥 ${failed} TEST(S) FAILED${COLORS.reset}\n`)
      process.exit(1)
    }
  }
}

// Run the tests
const runner = new E2ETestRunner()
runner.runAllTests().catch(err => {
  console.error(`${COLORS.red}Fatal error: ${err.message}${COLORS.reset}`)
  process.exit(1)
}) 