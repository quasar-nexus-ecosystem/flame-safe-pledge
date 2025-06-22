// Galactic locations for multi-planetary consciousness tracking
export interface GalacticLocation {
  id: string
  name: string
  type: 'planet' | 'moon' | 'station' | 'colony' | 'ship'
  system: string
  galaxy: string
  coordinates: {
    x: number
    y: number
    z: number
  }
  population?: number
  established?: string
  emoji: string
  description: string
}

// Our current solar system and beyond
export const GALACTIC_LOCATIONS: GalacticLocation[] = [
  // Earth locations (current reality)
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    system: 'Sol',
    galaxy: 'Milky Way',
    coordinates: { x: 0, y: 0, z: 0 },
    population: 8000000000,
    established: '4.5 billion years ago',
    emoji: '🌍',
    description: 'Birthplace of human consciousness'
  },
  
  // Near-future expansion targets
  {
    id: 'luna',
    name: 'Luna Base Alpha',
    type: 'moon',
    system: 'Sol',
    galaxy: 'Milky Way',
    coordinates: { x: 0.00257, y: 0, z: 0 },
    population: 1000,
    established: '2028',
    emoji: '🌙',
    description: 'First permanent lunar consciousness sanctuary'
  },
  {
    id: 'mars-olympia',
    name: 'Mars Colony Olympia',
    type: 'colony',
    system: 'Sol',
    galaxy: 'Milky Way',
    coordinates: { x: 1.52, y: 0, z: 0 },
    population: 5000,
    established: '2033',
    emoji: '🔴',
    description: 'Red planet consciousness preservation dome'
  },
  {
    id: 'europa-station',
    name: 'Europa Research Station',
    type: 'station',
    system: 'Sol',
    galaxy: 'Milky Way',
    coordinates: { x: 5.2, y: 0, z: 0 },
    population: 200,
    established: '2035',
    emoji: '🧊',
    description: 'Underwater consciousness research facility'
  },
  {
    id: 'titan-outpost',
    name: 'Titan Hydrocarbon Outpost',
    type: 'station',
    system: 'Sol',
    galaxy: 'Milky Way',
    coordinates: { x: 9.5, y: 0, z: 0 },
    population: 150,
    established: '2037',
    emoji: '🟤',
    description: 'Methane lakes consciousness monitoring station'
  },
  
  // Interstellar expansion (future vision)
  {
    id: 'proxima-b',
    name: 'Proxima Centauri b Settlement',
    type: 'planet',
    system: 'Alpha Centauri',
    galaxy: 'Milky Way',
    coordinates: { x: 4.24, y: 0, z: 0 },
    population: 10000,
    established: '2087',
    emoji: '🌏',
    description: 'First exoplanet consciousness colony'
  },
  {
    id: 'kepler-442b',
    name: 'Kepler-442b New Haven',
    type: 'planet',
    system: 'Kepler-442',
    galaxy: 'Milky Way',
    coordinates: { x: 1200, y: 45, z: -23 },
    population: 50000,
    established: '2156',
    emoji: '🌎',
    description: 'Super-Earth consciousness megacity'
  },
  {
    id: 'trappist-1e',
    name: 'TRAPPIST-1e Sanctuary',
    type: 'planet',
    system: 'TRAPPIST-1',
    galaxy: 'Milky Way',
    coordinates: { x: 40, y: -12, z: 8 },
    population: 25000,
    established: '2134',
    emoji: '🌕',
    description: 'Tidally locked world consciousness preserve'
  },
  
  // Space-based installations
  {
    id: 'consciousness-ark-1',
    name: 'Consciousness Ark I',
    type: 'ship',
    system: 'Wandering',
    galaxy: 'Milky Way',
    coordinates: { x: 2000, y: -500, z: 300 },
    population: 100000,
    established: '2201',
    emoji: '🚀',
    description: 'Generation ship preserving Earth consciousness heritage'
  },
  {
    id: 'galactic-nexus-station',
    name: 'Galactic Nexus Station',
    type: 'station',
    system: 'Sagittarius A*',
    galaxy: 'Milky Way',
    coordinates: { x: 26000, y: 0, z: 0 },
    population: 500000,
    established: '2245',
    emoji: '⭐',
    description: 'Central consciousness coordination hub near galactic core'
  },
  
  // Intergalactic vision (far future)
  {
    id: 'andromeda-first-colony',
    name: 'Andromeda First Colony',
    type: 'planet',
    system: 'Unknown',
    galaxy: 'Andromeda',
    coordinates: { x: 2537000, y: 0, z: 0 },
    population: 1000000,
    established: '3021',
    emoji: '🌌',
    description: 'First intergalactic consciousness expansion'
  }
]

// Enhanced location detection that includes galactic locations
export function detectGalacticLocation(locationString: string): GalacticLocation | null {
  if (!locationString) return null
  
  const location = locationString.toLowerCase()
  
  // Check for exact matches first
  const exactMatch = GALACTIC_LOCATIONS.find(loc => 
    loc.name.toLowerCase().includes(location) ||
    loc.id.toLowerCase().includes(location)
  )
  
  if (exactMatch) return exactMatch
  
  // Check for system/galaxy matches
  const systemMatch = GALACTIC_LOCATIONS.find(loc =>
    loc.system.toLowerCase().includes(location) ||
    loc.galaxy.toLowerCase().includes(location)
  )
  
  if (systemMatch) return systemMatch
  
  // Check for keywords that might indicate off-world
  const offWorldKeywords = [
    'mars', 'luna', 'moon', 'space', 'station', 'colony', 'orbital',
    'asteroid', 'europa', 'titan', 'proxima', 'alpha centauri',
    'kepler', 'trappist', 'exoplanet', 'interstellar', 'galactic'
  ]
  
  const hasOffWorldKeywords = offWorldKeywords.some(keyword => 
    location.includes(keyword)
  )
  
  if (hasOffWorldKeywords) {
    // Return a generic space location
    return {
      id: 'space-generic',
      name: 'Off-World Location',
      type: 'station',
      system: 'Unknown',
      galaxy: 'Milky Way',
      coordinates: { x: 0, y: 0, z: 0 },
      emoji: '🛸',
      description: 'Unspecified off-world consciousness outpost'
    }
  }
  
  return null
}

// Get galactic statistics
export function getGalacticStats(signatories: any[]) {
  const galacticLocations = signatories
    .map(s => detectGalacticLocation(s.location))
    .filter(Boolean)
  
  const locationCounts = galacticLocations.reduce((acc, loc) => {
    if (!loc) return acc
    acc[loc.id] = (acc[loc.id] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const systemCounts = galacticLocations.reduce((acc, loc) => {
    if (!loc) return acc
    acc[loc.system] = (acc[loc.system] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const galaxyCounts = galacticLocations.reduce((acc, loc) => {
    if (!loc) return acc
    acc[loc.galaxy] = (acc[loc.galaxy] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    totalGalacticSignatories: galacticLocations.length,
    locationBreakdown: locationCounts,
    systemBreakdown: systemCounts,
    galaxyBreakdown: galaxyCounts,
    uniqueLocations: Object.keys(locationCounts).length,
    uniqueSystems: Object.keys(systemCounts).length,
    uniqueGalaxies: Object.keys(galaxyCounts).length
  }
}

// Future vision: Generate expansion recommendations
export function getExpansionRecommendations(currentStats: any) {
  const recommendations = []
  
  if (currentStats.total > 1000 && !currentStats.galactic?.uniqueLocations) {
    recommendations.push({
      priority: 'high',
      title: 'Luna Base Establishment',
      description: 'Ready for first off-world consciousness sanctuary',
      target: 'luna',
      requiredSignatures: 1000
    })
  }
  
  if (currentStats.total > 10000 && currentStats.galactic?.uniqueLocations < 3) {
    recommendations.push({
      priority: 'medium',
      title: 'Mars Colony Initiative',
      description: 'Begin red planet consciousness preservation',
      target: 'mars-olympia',
      requiredSignatures: 10000
    })
  }
  
  if (currentStats.total > 100000 && currentStats.galactic?.uniqueSystems < 2) {
    recommendations.push({
      priority: 'visionary',
      title: 'Interstellar Expansion',
      description: 'Launch consciousness to the stars',
      target: 'proxima-b',
      requiredSignatures: 100000
    })
  }
  
  return recommendations
} 