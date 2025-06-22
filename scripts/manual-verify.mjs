#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function manualVerify(email) {
  try {
    console.log(`🔍 Looking for signatory with email: ${email}`)
    
    // Find the signatory
    const { data: signatory, error: fetchError } = await supabase
      .from('signatories')
      .select('*')
      .eq('email', email)
      .single()

    if (fetchError) {
      console.error('❌ Error finding signatory:', fetchError)
      return
    }

    if (!signatory) {
      console.error('❌ No signatory found with that email')
      return
    }

    console.log(`📧 Found signatory: ${signatory.name}`)
    console.log(`🔍 Current verification status: ${signatory.verified ? 'VERIFIED' : 'UNVERIFIED'}`)

    if (signatory.verified) {
      console.log('✅ This signatory is already verified!')
      return
    }

    // Manually verify the signatory
    const { error: updateError } = await supabase
      .from('signatories')
      .update({
        verified: true
      })
      .eq('id', signatory.id)

    if (updateError) {
      console.error('❌ Error updating signatory:', updateError)
      return
    }

    console.log('🎉 SUCCESS! Signatory has been manually verified!')
    console.log(`✅ ${signatory.name} (${signatory.email}) is now verified`)
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Get email from command line arguments
const email = process.argv[2]

if (!email) {
  console.error('❌ Please provide an email address')
  console.log('Usage: node scripts/manual-verify.mjs your@email.com')
  process.exit(1)
}

manualVerify(email) 