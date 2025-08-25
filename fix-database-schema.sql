-- =============================================
-- MISSING COLUMNS FIX FOR SIGNATORIES TABLE
-- =============================================

-- Add all the missing columns that the application expects
DO $$
BEGIN
    -- Add email column (required for email verification flow)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'email') THEN
        ALTER TABLE signatories ADD COLUMN email TEXT;
        CREATE INDEX IF NOT EXISTS signatories_email_idx ON signatories(email);
    END IF;

    -- Add message column (for user messages/testimonials)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'message') THEN
        ALTER TABLE signatories ADD COLUMN message TEXT;
    END IF;

    -- Add verification_token column (for email verification)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'verification_token') THEN
        ALTER TABLE signatories ADD COLUMN verification_token TEXT;
        CREATE INDEX IF NOT EXISTS signatories_verification_token_idx ON signatories(verification_token);
    END IF;

    -- The following columns should already exist from your previous SQL script:
    -- user_id, title, location, website, social, verified, display_publicly
    
    -- But let's make sure they exist:
    
    -- Add user_id if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'user_id') THEN
        ALTER TABLE signatories ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;

    -- Add title if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'title') THEN
        ALTER TABLE signatories ADD COLUMN title TEXT;
    END IF;

    -- Add location if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'location') THEN
        ALTER TABLE signatories ADD COLUMN location TEXT;
    END IF;

    -- Add website if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'website') THEN
        ALTER TABLE signatories ADD COLUMN website TEXT;
    END IF;

    -- Add social if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'social') THEN
        ALTER TABLE signatories ADD COLUMN social JSONB DEFAULT '{}';
    END IF;

    -- Add verified if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'verified') THEN
        ALTER TABLE signatories ADD COLUMN verified BOOLEAN DEFAULT false;
    END IF;

    -- Add display_publicly if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'signatories' AND column_name = 'display_publicly') THEN
        ALTER TABLE signatories ADD COLUMN display_publicly BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Refresh the schema cache (important for PostgREST/Supabase)
NOTIFY pgrst, 'reload schema';

-- Show the current table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'signatories' 
ORDER BY ordinal_position;
