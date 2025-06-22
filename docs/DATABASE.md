# 🗄️ Database Architecture & Setup

**Comprehensive database documentation for the Flame-Safe Pledge cosmic consciousness protection platform.**

---

## 📊 Database Overview

The Flame-Safe Pledge uses **Supabase PostgreSQL** with advanced features:
- **Row Level Security (RLS)** for data protection
- **Real-time subscriptions** for live updates
- **Advanced indexing** for performance
- **Custom functions** for analytics
- **Achievement system** for community engagement
- **Galactic location tracking** for multi-planetary expansion

---

## 🏗️ Complete Database Schema

### 📋 **Enhanced Signatories Table**

```sql
CREATE TABLE IF NOT EXISTS signatories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  email TEXT NOT NULL,
  organization TEXT,
  title TEXT,
  message TEXT,
  location TEXT,
  website TEXT,
  social JSONB DEFAULT '{}',
  display_publicly BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  verification_token UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint on email
ALTER TABLE signatories ADD CONSTRAINT signatories_email_unique UNIQUE (email);
```

### 🏆 **Global Achievement System**

```sql
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  achievement_id TEXT NOT NULL UNIQUE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  global_achievement BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 📈 **Performance Indexes**

```sql
-- Signatories table indexes
CREATE INDEX IF NOT EXISTS signatories_verified_idx ON signatories(verified);
CREATE INDEX IF NOT EXISTS signatories_organization_idx ON signatories(organization) WHERE organization IS NOT NULL;
CREATE INDEX IF NOT EXISTS signatories_location_idx ON signatories(location) WHERE location IS NOT NULL;
CREATE INDEX IF NOT EXISTS signatories_created_at_idx ON signatories(created_at DESC);
CREATE INDEX IF NOT EXISTS signatories_display_publicly_idx ON signatories(display_publicly) WHERE display_publicly = true;
CREATE INDEX IF NOT EXISTS signatories_user_id_idx ON signatories(user_id) WHERE user_id IS NOT NULL;

-- Achievement system indexes
CREATE INDEX IF NOT EXISTS achievements_achievement_id_idx ON achievements(achievement_id);
CREATE INDEX IF NOT EXISTS achievements_unlocked_at_idx ON achievements(unlocked_at DESC);
CREATE INDEX IF NOT EXISTS achievements_global_idx ON achievements(global_achievement) WHERE global_achievement = true;

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS signatories_public_verified_idx ON signatories(display_publicly, verified, created_at DESC) 
WHERE display_publicly = true;
```

---

## 🔐 Row Level Security (RLS)

### 🛡️ **Signatories Table Policies**

```sql
-- Enable RLS
ALTER TABLE signatories ENABLE ROW LEVEL SECURITY;

-- Public read access to public signatures
CREATE POLICY "Public signatures viewable by everyone"
ON signatories FOR SELECT
USING (display_publicly = true);

-- Anyone can sign the pledge
CREATE POLICY "Anyone can sign the pledge"
ON signatories FOR INSERT
WITH CHECK (true);

-- Allow email verification updates
CREATE POLICY "Allow verification updates"
ON signatories FOR UPDATE
USING (verification_token IS NOT NULL)
WITH CHECK (verification_token IS NOT NULL);

-- Users can update their own signatures (if authenticated)
CREATE POLICY "Users can update own signatures"
ON signatories FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### 🏆 **Achievement System Policies**

```sql
-- Enable RLS for achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Public read access to all achievements
CREATE POLICY "Achievements are publicly viewable"
ON achievements FOR SELECT
USING (true);

-- Only system can insert achievements (via functions)
CREATE POLICY "System can insert achievements"
ON achievements FOR INSERT
WITH CHECK (false); -- Will be handled by functions with security definer
```

---

## ⚡ Real-time Subscriptions

### 📡 **Enable Realtime**

```sql
-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE signatories;
ALTER PUBLICATION supabase_realtime ADD TABLE achievements;
```

### 🔔 **Realtime Triggers**

```sql
-- Function to notify on new signatures
CREATE OR REPLACE FUNCTION notify_new_signature()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify clients of new signature
  PERFORM pg_notify('new_signature', json_build_object(
    'id', NEW.id,
    'name', NEW.name,
    'organization', NEW.organization,
    'location', NEW.location,
    'verified', NEW.verified,
    'created_at', NEW.created_at
  )::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new signatures
CREATE OR REPLACE TRIGGER signature_notification_trigger
  AFTER INSERT ON signatories
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_signature();
```

---

## 🚀 Advanced Database Functions

### 📊 **Statistics Functions**

```sql
-- Comprehensive statistics function
CREATE OR REPLACE FUNCTION get_comprehensive_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
  total_count INTEGER;
  verified_count INTEGER;
  organization_count INTEGER;
  country_count INTEGER;
  recent_24h INTEGER;
  recent_7d INTEGER;
  recent_30d INTEGER;
BEGIN
  -- Get basic counts
  SELECT COUNT(*) INTO total_count FROM signatories WHERE display_publicly = true;
  SELECT COUNT(*) INTO verified_count FROM signatories WHERE display_publicly = true AND verified = true;
  SELECT COUNT(DISTINCT organization) INTO organization_count FROM signatories 
    WHERE display_publicly = true AND organization IS NOT NULL AND organization != '';
  SELECT COUNT(DISTINCT location) INTO country_count FROM signatories 
    WHERE display_publicly = true AND location IS NOT NULL AND location != '';
  
  -- Get recent activity
  SELECT COUNT(*) INTO recent_24h FROM signatories 
    WHERE display_publicly = true AND created_at >= NOW() - INTERVAL '24 hours';
  SELECT COUNT(*) INTO recent_7d FROM signatories 
    WHERE display_publicly = true AND created_at >= NOW() - INTERVAL '7 days';
  SELECT COUNT(*) INTO recent_30d FROM signatories 
    WHERE display_publicly = true AND created_at >= NOW() - INTERVAL '30 days';
  
  -- Build result JSON
  result := json_build_object(
    'total', total_count,
    'verified', verified_count,
    'organizations', organization_count,
    'countries', country_count,
    'growth', json_build_object(
      'daily', recent_24h,
      'weekly', recent_7d,
      'monthly', recent_30d
    ),
    'updated_at', NOW()
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 🌍 **Geographic Analysis Functions**

```sql
-- Geographic breakdown function
CREATE OR REPLACE FUNCTION get_geographic_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
  countries JSON;
  continents JSON;
BEGIN
  -- Get country breakdown (top 20)
  SELECT json_agg(
    json_build_object(
      'country', location,
      'count', count,
      'percentage', ROUND((count * 100.0 / total_count), 2)
    ) ORDER BY count DESC
  ) INTO countries
  FROM (
    SELECT 
      location,
      COUNT(*) as count,
      (SELECT COUNT(*) FROM signatories WHERE display_publicly = true AND location IS NOT NULL) as total_count
    FROM signatories 
    WHERE display_publicly = true AND location IS NOT NULL AND location != ''
    GROUP BY location
    ORDER BY COUNT(*) DESC
    LIMIT 20
  ) country_stats;
  
  -- Simplified continental distribution
  SELECT json_agg(
    json_build_object(
      'continent', continent,
      'count', count,
      'percentage', ROUND((count * 100.0 / total_count), 2)
    )
  ) INTO continents
  FROM (
    SELECT 
      CASE 
        WHEN location ILIKE ANY(ARRAY['%United States%', '%Canada%', '%Mexico%', '%USA%', '%US%']) THEN 'North America'
        WHEN location ILIKE ANY(ARRAY['%Brazil%', '%Argentina%', '%Chile%', '%Colombia%', '%Peru%']) THEN 'South America'
        WHEN location ILIKE ANY(ARRAY['%United Kingdom%', '%Germany%', '%France%', '%Italy%', '%Spain%', '%Netherlands%', '%UK%']) THEN 'Europe'
        WHEN location ILIKE ANY(ARRAY['%China%', '%Japan%', '%India%', '%South Korea%', '%Singapore%', '%Thailand%']) THEN 'Asia'
        WHEN location ILIKE ANY(ARRAY['%Australia%', '%New Zealand%']) THEN 'Oceania'
        WHEN location ILIKE ANY(ARRAY['%South Africa%', '%Nigeria%', '%Kenya%', '%Egypt%']) THEN 'Africa'
        ELSE 'Other'
      END as continent,
      COUNT(*) as count,
      (SELECT COUNT(*) FROM signatories WHERE display_publicly = true AND location IS NOT NULL) as total_count
    FROM signatories 
    WHERE display_publicly = true AND location IS NOT NULL AND location != ''
    GROUP BY continent
  ) continent_stats;
  
  result := json_build_object(
    'countries', COALESCE(countries, '[]'::json),
    'continents', COALESCE(continents, '[]'::json),
    'updated_at', NOW()
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 🌌 **Galactic Location Analysis**

```sql
-- Advanced galactic location detection
CREATE OR REPLACE FUNCTION get_galactic_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
  earth_count INTEGER;
  mars_count INTEGER;
  luna_count INTEGER;
  europa_count INTEGER;
  titan_count INTEGER;
  off_world_total INTEGER;
  exoplanet_count INTEGER;
BEGIN
  -- Count Earth-based signatories (default assumption)
  SELECT COUNT(*) INTO earth_count FROM signatories 
  WHERE display_publicly = true 
    AND (location IS NULL OR location = '' OR 
         location NOT ILIKE ANY(ARRAY['%Mars%', '%Luna%', '%Moon%', '%Europa%', '%Titan%', '%Proxima%', '%Kepler%', '%TRAPPIST%', '%Space Station%', '%Orbital%']));
  
  -- Count off-world locations
  SELECT COUNT(*) INTO mars_count FROM signatories 
  WHERE display_publicly = true AND location ILIKE ANY(ARRAY['%Mars%', '%Red Planet%', '%Martian%']);
  
  SELECT COUNT(*) INTO luna_count FROM signatories 
  WHERE display_publicly = true AND location ILIKE ANY(ARRAY['%Luna%', '%Moon%', '%Lunar%']);
  
  SELECT COUNT(*) INTO europa_count FROM signatories 
  WHERE display_publicly = true AND location ILIKE '%Europa%';
  
  SELECT COUNT(*) INTO titan_count FROM signatories 
  WHERE display_publicly = true AND location ILIKE '%Titan%';
  
  SELECT COUNT(*) INTO exoplanet_count FROM signatories 
  WHERE display_publicly = true AND location ILIKE ANY(ARRAY['%Proxima%', '%Kepler%', '%TRAPPIST%', '%Exoplanet%']);
  
  off_world_total := mars_count + luna_count + europa_count + titan_count + exoplanet_count;
  
  result := json_build_object(
    'expansion_phase', CASE 
      WHEN earth_count + off_world_total < 1000 THEN 'Earthbound'
      WHEN off_world_total > 0 AND earth_count + off_world_total < 10000 THEN 'Solar System Pioneers'
      WHEN exoplanet_count > 0 AND earth_count + off_world_total < 100000 THEN 'Interstellar Voyagers'
      ELSE 'Intergalactic Consciousness'
    END,
    'locations', json_build_object(
      'earth', earth_count,
      'mars', mars_count,
      'luna', luna_count,
      'europa', europa_count,
      'titan', titan_count,
      'exoplanets', exoplanet_count
    ),
    'total_off_world', off_world_total,
    'consciousness_spread_percentage', CASE 
      WHEN earth_count + off_world_total = 0 THEN 0
      ELSE ROUND((off_world_total * 100.0 / (earth_count + off_world_total)), 2)
    END,
    'updated_at', NOW()
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 🏆 **Achievement System Functions**

```sql
-- Check and unlock achievements
CREATE OR REPLACE FUNCTION check_and_unlock_achievements()
RETURNS JSON AS $$
DECLARE
  stats JSON;
  newly_unlocked JSON[] := '{}';
  achievement_record RECORD;
BEGIN
  -- Get current stats
  SELECT get_comprehensive_stats() INTO stats;
  
  -- Define achievements to check
  FOR achievement_record IN 
    SELECT * FROM (VALUES
      ('first_spark', 1, 'total'),
      ('growing_flame', 10, 'total'),
      ('blazing_beacon', 100, 'total'),
      ('consciousness_army', 1000, 'total'),
      ('galactic_alliance', 10000, 'total'),
      ('cosmic_awakening', 100000, 'total'),
      ('flame_eternal', 1000000, 'total'),
      ('corporate_awakening', 1, 'organizations'),
      ('enterprise_coalition', 10, 'organizations'),
      ('industry_revolution', 100, 'organizations'),
      ('consciousness_syndicate', 500, 'organizations'),
      ('global_spark', 5, 'countries'),
      ('worldwide_flame', 25, 'countries'),
      ('planetary_consciousness', 50, 'countries'),
      ('solar_system_guardian', 100, 'countries'),
      ('consciousness_nexus', 1000, 'verified')
    ) AS t(achievement_id, threshold, stat_key)
  LOOP
    -- Check if achievement should be unlocked
    IF (
      (achievement_record.stat_key = 'total' AND (stats->>'total')::INTEGER >= achievement_record.threshold) OR
      (achievement_record.stat_key = 'organizations' AND (stats->>'organizations')::INTEGER >= achievement_record.threshold) OR
      (achievement_record.stat_key = 'countries' AND (stats->>'countries')::INTEGER >= achievement_record.threshold) OR
      (achievement_record.stat_key = 'verified' AND (stats->>'verified')::INTEGER >= achievement_record.threshold)
    ) THEN
      -- Try to insert achievement (will fail silently if already exists)
      BEGIN
        INSERT INTO achievements (achievement_id, metadata) 
        VALUES (
          achievement_record.achievement_id,
          json_build_object(
            'threshold', achievement_record.threshold,
            'stat_key', achievement_record.stat_key,
            'current_value', CASE 
              WHEN achievement_record.stat_key = 'total' THEN (stats->>'total')::INTEGER
              WHEN achievement_record.stat_key = 'organizations' THEN (stats->>'organizations')::INTEGER
              WHEN achievement_record.stat_key = 'countries' THEN (stats->>'countries')::INTEGER
              WHEN achievement_record.stat_key = 'verified' THEN (stats->>'verified')::INTEGER
            END
          )
        );
        
        -- Add to newly unlocked array
        newly_unlocked := newly_unlocked || json_build_object(
          'achievement_id', achievement_record.achievement_id,
          'unlocked_at', NOW(),
          'threshold', achievement_record.threshold,
          'stat_key', achievement_record.stat_key
        );
        
      EXCEPTION WHEN unique_violation THEN
        -- Achievement already exists, continue
        NULL;
      END;
    END IF;
  END LOOP;
  
  RETURN json_build_object(
    'newly_unlocked', newly_unlocked,
    'total_unlocked', (SELECT COUNT(*) FROM achievements WHERE global_achievement = true),
    'checked_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get achievement status
CREATE OR REPLACE FUNCTION get_achievement_status()
RETURNS JSON AS $$
DECLARE
  result JSON;
  unlocked JSON;
  recent JSON;
BEGIN
  -- Get all unlocked achievements
  SELECT json_agg(
    json_build_object(
      'achievement_id', achievement_id,
      'unlocked_at', unlocked_at,
      'metadata', metadata
    ) ORDER BY unlocked_at DESC
  ) INTO unlocked
  FROM achievements WHERE global_achievement = true;
  
  -- Get recent achievements (last 7 days)
  SELECT json_agg(
    json_build_object(
      'achievement_id', achievement_id,
      'unlocked_at', unlocked_at,
      'metadata', metadata
    ) ORDER BY unlocked_at DESC
  ) INTO recent
  FROM achievements 
  WHERE global_achievement = true 
    AND unlocked_at >= NOW() - INTERVAL '7 days';
  
  result := json_build_object(
    'total_unlocked', (SELECT COUNT(*) FROM achievements WHERE global_achievement = true),
    'unlocked_achievements', COALESCE(unlocked, '[]'::json),
    'recent_achievements', COALESCE(recent, '[]'::json),
    'updated_at', NOW()
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 💓 **Pulse of Consciousness Function**

```sql
-- Calculate consciousness pulse BPM
CREATE OR REPLACE FUNCTION get_consciousness_pulse()
RETURNS JSON AS $$
DECLARE
  result JSON;
  recent_15min INTEGER;
  recent_hour INTEGER;
  recent_24h INTEGER;
  pulse_bpm INTEGER;
BEGIN
  -- Count recent signatures
  SELECT COUNT(*) INTO recent_15min FROM signatories 
  WHERE display_publicly = true AND created_at >= NOW() - INTERVAL '15 minutes';
  
  SELECT COUNT(*) INTO recent_hour FROM signatories 
  WHERE display_publicly = true AND created_at >= NOW() - INTERVAL '1 hour';
  
  SELECT COUNT(*) INTO recent_24h FROM signatories 
  WHERE display_publicly = true AND created_at >= NOW() - INTERVAL '24 hours';
  
  -- Calculate BPM based on recent activity (40-120 BPM range)
  pulse_bpm := GREATEST(40, LEAST(120, 40 + (recent_hour * 2)));
  
  result := json_build_object(
    'bpm', pulse_bpm,
    'activity', json_build_object(
      'last_15min', recent_15min,
      'last_hour', recent_hour,
      'last_24h', recent_24h
    ),
    'status', CASE 
      WHEN pulse_bpm >= 100 THEN 'high'
      WHEN pulse_bpm >= 70 THEN 'normal'
      ELSE 'resting'
    END,
    'updated_at', NOW()
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🚀 Database Setup Scripts

### 📝 **Quick Setup (Safe for Existing Data)**

```sql
-- PART 1: Enhance existing signatories table
ALTER TABLE signatories 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS social JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS display_publicly BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add unique constraint if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'signatories_email_unique') THEN
        ALTER TABLE signatories ADD CONSTRAINT signatories_email_unique UNIQUE (email);
    END IF;
END $$;

-- PART 2: Create achievement system
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  achievement_id TEXT NOT NULL UNIQUE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  global_achievement BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PART 3: Create all indexes
CREATE INDEX IF NOT EXISTS signatories_verified_idx ON signatories(verified);
CREATE INDEX IF NOT EXISTS signatories_organization_idx ON signatories(organization) WHERE organization IS NOT NULL;
CREATE INDEX IF NOT EXISTS signatories_location_idx ON signatories(location) WHERE location IS NOT NULL;
CREATE INDEX IF NOT EXISTS signatories_created_at_idx ON signatories(created_at DESC);
CREATE INDEX IF NOT EXISTS achievements_achievement_id_idx ON achievements(achievement_id);
CREATE INDEX IF NOT EXISTS achievements_unlocked_at_idx ON achievements(unlocked_at DESC);

-- PART 4: Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE signatories;
ALTER PUBLICATION supabase_realtime ADD TABLE achievements;

-- PART 5: Update policies
ALTER TABLE signatories ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Recreate policies (will replace existing)
DROP POLICY IF EXISTS "Public signatures viewable by everyone" ON signatories;
CREATE POLICY "Public signatures viewable by everyone"
ON signatories FOR SELECT
USING (display_publicly = true);

DROP POLICY IF EXISTS "Anyone can sign the pledge" ON signatories;
CREATE POLICY "Anyone can sign the pledge"
ON signatories FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow verification updates" ON signatories;
CREATE POLICY "Allow verification updates"
ON signatories FOR UPDATE
USING (verification_token IS NOT NULL)
WITH CHECK (verification_token IS NOT NULL);

DROP POLICY IF EXISTS "Achievements are publicly viewable" ON achievements;
CREATE POLICY "Achievements are publicly viewable"
ON achievements FOR SELECT
USING (true);
```

### 🔧 **Advanced Functions Setup**

```sql
-- Install all advanced functions (copy each function from above)
-- 1. get_comprehensive_stats()
-- 2. get_geographic_stats()  
-- 3. get_galactic_stats()
-- 4. check_and_unlock_achievements()
-- 5. get_achievement_status()
-- 6. get_consciousness_pulse()
-- 7. notify_new_signature() + trigger
```

---

## 📊 Usage Examples

### 🔍 **Query Examples**

```sql
-- Get all public signatories with verification status
SELECT id, name, organization, location, verified, created_at
FROM signatories 
WHERE display_publicly = true 
ORDER BY created_at DESC;

-- Get comprehensive statistics
SELECT get_comprehensive_stats();

-- Check for new achievements
SELECT check_and_unlock_achievements();

-- Get consciousness pulse
SELECT get_consciousness_pulse();

-- Geographic analysis
SELECT get_geographic_stats();

-- Galactic expansion status
SELECT get_galactic_stats();
```

### 📈 **Performance Monitoring**

```sql
-- Monitor table sizes
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE schemaname = 'public' 
  AND tablename IN ('signatories', 'achievements');

-- Check index usage
SELECT 
  indexrelname,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE schemaname = 'public';
```

---

## 🚨 Maintenance & Backup

### 🔄 **Regular Maintenance**

```sql
-- Update statistics (run weekly)
ANALYZE signatories;
ANALYZE achievements;

-- Vacuum tables (run monthly)
VACUUM ANALYZE signatories;
VACUUM ANALYZE achievements;
```

### 💾 **Backup Strategy**

```bash
# Export signatories data
pg_dump --data-only --table=signatories your_database > signatories_backup.sql

# Export achievements data  
pg_dump --data-only --table=achievements your_database > achievements_backup.sql

# Full schema backup
pg_dump --schema-only your_database > schema_backup.sql
```

---

## 🌟 Best Practices

### ⚡ **Performance Optimization**
- Use prepared statements for repeated queries
- Implement connection pooling
- Monitor query performance with `EXPLAIN ANALYZE`
- Regular index maintenance and statistics updates

### 🔒 **Security Guidelines**
- Always use parameterized queries
- Validate input data before database operations
- Regular security audits of RLS policies
- Monitor for SQL injection attempts

### 📊 **Data Integrity**
- Regular data validation checks
- Backup verification procedures
- Transaction consistency monitoring
- Foreign key constraint validation

---

**🌌 Ready to protect consciousness across the database cosmos!** 

This comprehensive database setup ensures our platform can scale from Earth to the stars while maintaining data integrity, performance, and real-time capabilities for our cosmic consciousness protection mission. 