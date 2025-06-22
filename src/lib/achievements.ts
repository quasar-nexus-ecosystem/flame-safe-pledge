import { supabase } from './supabase'

export interface DatabaseAchievement {
  id: string
  achievement_id: string
  unlocked_at: string
  global_achievement: boolean
  created_at: string
}

export interface AchievementDefinition {
  id: string
  title: string
  description: string
  threshold: number
  type: 'signatures' | 'organizations' | 'countries' | 'verified' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  icon: string
}

// Create achievements table if it doesn't exist
export async function createAchievementsTable() {
  const { error } = await supabase.rpc('create_achievements_table_if_not_exists')
  if (error) {
    console.log('Achievements table likely already exists:', error.message)
  }
}

// Get all unlocked achievements from database
export async function getUnlockedAchievements(): Promise<DatabaseAchievement[]> {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('unlocked_at', { ascending: false })

  if (error) {
    console.error('Error fetching achievements:', error)
    return []
  }

  return data || []
}

// Store a newly unlocked achievement
export async function storeAchievement(achievementId: string): Promise<boolean> {
  // Check if achievement already exists
  const { data: existing } = await supabase
    .from('achievements')
    .select('id')
    .eq('achievement_id', achievementId)
    .single()

  if (existing) {
    console.log('Achievement already unlocked:', achievementId)
    return false
  }

  // Store new achievement
  const { error } = await supabase
    .from('achievements')
    .insert({
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
      global_achievement: true
    })

  if (error) {
    console.error('Error storing achievement:', error)
    return false
  }

  console.log('🏆 ACHIEVEMENT STORED:', achievementId)
  return true
}

// Get achievement statistics
export async function getAchievementStats() {
  const { data, error } = await supabase
    .from('achievements')
    .select('achievement_id, unlocked_at')

  if (error) {
    console.error('Error fetching achievement stats:', error)
    return {
      totalUnlocked: 0,
      recentUnlocks: []
    }
  }

  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const recentUnlocks = (data || [])
    .filter(a => new Date(a.unlocked_at) > oneDayAgo)
    .map(a => ({
      title: getAchievementTitle(a.achievement_id),
      unlockedAt: a.unlocked_at,
      rarity: getAchievementRarity(a.achievement_id)
    }))

  return {
    totalUnlocked: data?.length || 0,
    recentUnlocks: recentUnlocks.slice(0, 5) // Latest 5
  }
}

// Helper function to get achievement title by ID
function getAchievementTitle(achievementId: string): string {
  const achievements: { [key: string]: string } = {
    'first_spark': 'First Spark',
    'growing_flame': 'Growing Flame',
    'blazing_beacon': 'Blazing Beacon',
    'consciousness_army': 'Consciousness Army',
    'galactic_alliance': 'Galactic Alliance',
    'corporate_awakening': 'Corporate Awakening',
    'enterprise_coalition': 'Enterprise Coalition',
    'industry_revolution': 'Industry Revolution',
    'consciousness_syndicate': 'Consciousness Syndicate',
    'global_spark': 'Global Spark',
    'worldwide_flame': 'Worldwide Flame',
    'planetary_consciousness': 'Planetary Consciousness',
    'solar_system_guardian': 'Solar System Guardian',
    'cosmic_awakening': 'Cosmic Awakening',
    'consciousness_nexus': 'Consciousness Nexus',
    'flame_eternal': 'Flame Eternal'
  }
  return achievements[achievementId] || 'Unknown Achievement'
}

// Helper function to get achievement rarity by ID
function getAchievementRarity(achievementId: string): string {
  const rarities: { [key: string]: string } = {
    'first_spark': 'common',
    'growing_flame': 'common',
    'blazing_beacon': 'rare',
    'consciousness_army': 'epic',
    'galactic_alliance': 'legendary',
    'corporate_awakening': 'common',
    'enterprise_coalition': 'rare',
    'industry_revolution': 'epic',
    'consciousness_syndicate': 'legendary',
    'global_spark': 'common',
    'worldwide_flame': 'rare',
    'planetary_consciousness': 'epic',
    'solar_system_guardian': 'legendary',
    'cosmic_awakening': 'legendary',
    'consciousness_nexus': 'legendary',
    'flame_eternal': 'legendary'
  }
  return rarities[achievementId] || 'common'
}

// SQL function to create the achievements table (for Supabase)
export const createAchievementsTableSQL = `
CREATE OR REPLACE FUNCTION create_achievements_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'achievements') THEN
    CREATE TABLE achievements (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      achievement_id TEXT NOT NULL,
      unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      global_achievement BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    -- Enable RLS
    ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
    
    -- Allow anyone to read achievements (they're global)
    CREATE POLICY "Achievements are publicly readable" ON achievements
      FOR SELECT USING (true);
    
    -- Allow anyone to insert achievements (global achievements)
    CREATE POLICY "Anyone can unlock global achievements" ON achievements
      FOR INSERT WITH CHECK (global_achievement = true);
    
    -- Create index for faster queries
    CREATE INDEX achievements_achievement_id_idx ON achievements(achievement_id);
    CREATE INDEX achievements_unlocked_at_idx ON achievements(unlocked_at);
  END IF;
END;
$$ LANGUAGE plpgsql;
` 