# Database Permission Issue - Solution Guide

## 🚨 Current Issue
The application is experiencing **database permission errors** that are causing:
- API 500 errors on `/api/stats` and `/api/debug/signatories`
- Console spam with thousands of error messages
- Complete failure of database-dependent features

## 🔍 Root Cause
**Database Permission Denied**: The Supabase user lacks proper permissions to access the `signatories` table schema.

## 🛠️ Immediate Fixes Applied

### 1. Console Spam Reduction ✅
- Wrapped all `console.log` and `console.error` statements with `NODE_ENV === 'development'` checks
- This prevents production console spam while maintaining development debugging

### 2. Error Handling Improvements ✅
- Added specific handling for "permission denied" errors
- API routes now return graceful fallbacks instead of crashing
- Better error messages for debugging

### 3. Missing Files Fixed ✅
- Created `instrumentation-client.ts` to stop Next.js import errors
- Fixed empty debug route that was causing 500 errors

## 🔧 Required Database Fixes

### Option 1: Fix Supabase RLS Policies (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **Authentication > Policies**
3. Check if the `signatories` table has proper RLS policies
4. Ensure the `anon` role has `SELECT` permissions on the `signatories` table

### Option 2: Run Database Schema Fix
The `fix-database-schema.sql` file contains the proper table structure. You need to:
1. Connect to your Supabase database with admin privileges
2. Run the SQL script to ensure all required columns exist
3. Verify table permissions

### Option 3: Check Environment Variables
Ensure these are properly set in your Supabase project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📋 Database Schema Requirements

The `signatories` table should have these columns:
```sql
- id (UUID, Primary Key)
- name (TEXT, NOT NULL)
- email (TEXT)
- organization (TEXT)
- title (TEXT)
- message (TEXT)
- location (TEXT)
- website (TEXT)
- social (JSONB)
- verified (BOOLEAN)
- display_publicly (BOOLEAN)
- verification_token (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🚀 Next Steps

1. **Immediate**: The console spam should now be significantly reduced
2. **Short-term**: Fix the database permissions in Supabase dashboard
3. **Long-term**: Set up proper database monitoring and error handling

## 🔍 Testing

After fixing permissions, test with:
```bash
node scripts/init-database.mjs
```

This will verify database connectivity and table access.

## 📞 Support

If the issue persists, check:
- Supabase project status
- RLS policy configuration
- Database user roles and permissions
- Network connectivity to Supabase
