#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function initDatabase() {
  try {
    console.log('🔍 Initializing database...')
    
    // First, let's check if we can connect at all
    const { data: testData, error: testError } = await supabase
      .from('_dummy_table_')
      .select('*')
      .limit(1)
    
    // We expect this to fail, but it should fail with a different error than "permission denied"
    if (testError && testError.message.includes('permission denied')) {
      console.error('❌ Database permission issue detected')
      console.error('This suggests the database user lacks proper permissions')
      console.error('Please check your Supabase project settings and RLS policies')
      return
    }
    
    // Try to create the signatories table if it doesn't exist
    console.log('🔍 Checking signatories table...')
    
    const { data: signatories, error: signatoriesError } = await supabase
      .from('signatories')
      .select('count')
      .limit(1)
    
    if (signatoriesError) {
      if (signatoriesError.message.includes('relation "signatories" does not exist')) {
        console.log('📋 Creating signatories table...')
        
        // Create the table with basic structure
        const { error: createError } = await supabase.rpc('exec_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS signatories (
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT,
              organization TEXT,
              title TEXT,
              message TEXT,
              location TEXT,
              website TEXT,
              social JSONB DEFAULT '{}',
              verified BOOLEAN DEFAULT false,
              display_publicly BOOLEAN DEFAULT true,
              verification_token TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            
            -- Create indexes
            CREATE INDEX IF NOT EXISTS signatories_email_idx ON signatories(email);
            CREATE INDEX IF NOT EXISTS signatories_verification_token_idx ON signatories(verification_token);
            CREATE INDEX IF NOT EXISTS signatories_created_at_idx ON signatories(created_at);
          `
        })
        
        if (createError) {
          console.error('❌ Failed to create table:', createError.message)
          return
        }
        
        console.log('✅ Signatories table created successfully')
      } else {
        console.error('❌ Unexpected error checking signatories table:', signatoriesError.message)
        return
      }
    } else {
      console.log('✅ Signatories table already exists')
    }
    
    // Test the connection again
    const { data: testSignatories, error: testSignatoriesError } = await supabase
      .from('signatories')
      .select('*')
      .limit(1)
    
    if (testSignatoriesError) {
      console.error('❌ Still cannot access signatories table:', testSignatoriesError.message)
      return
    }
    
    console.log('✅ Database initialization successful!')
    console.log(`📊 Signatories table accessible with ${testSignatories?.length || 0} records`)
    
  } catch (error) {
    console.error('❌ Unexpected error during initialization:', error.message)
  }
}

initDatabase()
