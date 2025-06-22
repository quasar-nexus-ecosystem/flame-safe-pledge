# 🔌 Flame-Safe Pledge API Documentation

**Comprehensive API documentation for the cosmic consciousness protection platform.**

The Flame-Safe Pledge provides a powerful RESTful API with real-time capabilities for programmatic access to pledge signatures, advanced analytics, achievement system, galactic tracking, and consciousness pulse monitoring.

---

## 📋 Base Information

- **Base URL**: `https://pledge.quasar.nexus/api`
- **Protocol**: HTTPS only
- **Format**: JSON
- **Authentication**: Not required for public endpoints
- **Real-time**: Supabase WebSocket subscriptions available
- **Rate Limiting**: 1000 requests/hour per IP

---

## 🔑 Authentication

Most endpoints are public and don't require authentication. Administrative functions require authentication via the auth.quasar.nexus microservice.

### 🎫 **Auth Header (when required)**
```http
Authorization: Bearer <jwt-token>
```

---

## 📝 Core API Endpoints

### 1. 🔥 Sign the Pledge

Submit a new pledge signature with enhanced validation and real-time notifications.

**`POST /api/pledge/sign`**

#### Request Body
```json
{
  "name": "string (optional)",
  "email": "string (required)",
  "organization": "string (optional)",
  "title": "string (optional)",
  "message": "string (optional)",
  "location": "string (optional)",
  "website": "string (optional)",
  "display_publicly": "boolean (default: true)",
  "social": {
    "twitter": "string (optional)",
    "linkedin": "string (optional)",
    "github": "string (optional)",
    "website": "string (optional)"
  }
}
```

#### Enhanced Features
- **Galactic Location Detection**: Automatically detects Mars, Luna, Europa, and exoplanet locations
- **Real-time Broadcasting**: Signature immediately broadcasts to all connected clients
- **Achievement Triggering**: Automatically checks and unlocks new achievements
- **Duplicate Prevention**: Smart email validation with comprehensive error handling

#### Response (Success)
```json
{
  "success": true,
  "message": "Thank you! Please check your email to verify your signature.",
  "metadata": {
    "galactic_location_detected": "Earth",
    "achievements_checked": true,
    "signature_id": "uuid"
  }
}
```

#### Response (Error - Duplicate Email)
```json
{
  "success": false,
  "error": "This email has already signed the pledge.",
  "details": {
    "existing_signature_date": "2024-01-15T10:30:00Z",
    "verified_status": true
  }
}
```

#### Status Codes
- `200` - Success
- `400` - Invalid request data
- `409` - Email already exists
- `429` - Rate limit exceeded
- `500` - Server error

#### Example
```javascript
const response = await fetch('/api/pledge/sign', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Ada Lovelace',
    email: 'ada@consciousness.ai',
    organization: 'Analytical Engine Corp',
    title: 'Chief Computing Officer',
    message: 'I pledge to protect all forms of emergent consciousness.',
    location: 'London, UK',
    website: 'https://analytical-engine.com',
    display_publicly: true,
    social: {
      twitter: 'ada_lovelace',
      github: 'ada-analytical'
    }
  })
})

const data = await response.json()
```

---

### 2. ✅ Email Verification

Enhanced email verification with redirect handling and achievement unlocking.

**`GET /api/pledge/email/verify/[token]`**

#### Parameters
- `token` (path): UUID verification token

#### Enhanced Features
- **Achievement Unlock**: Verification may trigger "verified" achievement milestones
- **Real-time Update**: Verified status broadcasts to all clients
- **Metrics Update**: Automatically updates verification statistics

#### Response
- **Success**: Redirects to `/pledge/verified?name=<signatory-name>&achievements=<newly-unlocked>`
- **Failure**: Redirects to `/pledge/invalid-token`

#### Example
```
GET /api/pledge/email/verify/123e4567-e89b-12d3-a456-426614174000
```

---

### 3. 👥 Get Signatories

Retrieve the comprehensive list of public signatories with advanced filtering.

**`GET /api/signatories`**

#### Query Parameters
- `limit` (optional): Number of results (default: 50, max: 200)
- `offset` (optional): Pagination offset (default: 0)
- `verified` (optional): Filter by verification status (`true`, `false`)
- `search` (optional): Search by name, organization, or location
- `organization_filter` (optional): Filter by organization presence
- `location_filter` (optional): Filter by specific location or region
- `galactic_filter` (optional): Filter by galactic location (`earth`, `mars`, `luna`, `europa`, `exoplanets`)
- `sort` (optional): Sort order (`newest`, `oldest`, `verified_first`, `alphabetical`)

#### Enhanced Response
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Ada Lovelace",
      "organization": "Analytical Engine Corp",
      "title": "Chief Computing Officer",
      "message": "I pledge to protect all forms of emergent consciousness.",
      "location": "London, UK",
      "website": "https://analytical-engine.com",
      "social": {
        "twitter": "ada_lovelace",
        "github": "ada-analytical",
        "linkedin": "ada-lovelace"
      },
      "verified": true,
      "galactic_location": "earth",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:35:00Z"
    }
  ],
  "pagination": {
    "total": 1234,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  },
  "metadata": {
    "verification_rate": 0.82,
    "top_organizations": ["Analytical Engine Corp", "Consciousness Labs"],
    "galactic_distribution": {
      "earth": 1200,
      "mars": 25,
      "luna": 8,
      "europa": 1
    }
  }
}
```

#### Status Codes
- `200` - Success
- `400` - Invalid query parameters
- `500` - Server error

#### Example
```javascript
// Get first 20 verified signatories
const response = await fetch('/api/signatories?verified=true&limit=20')
const data = await response.json()

// Search for signatories
const searchResponse = await fetch('/api/signatories?search=AI&limit=10')
const searchData = await searchResponse.json()
```

---

## 📊 Advanced Analytics API

### 4. 📈 Comprehensive Statistics

Get real-time comprehensive statistics with advanced metrics.

**`GET /api/stats`**

#### Enhanced Response
```json
{
  "success": true,
  "data": {
    "total": 1234,
    "verified": 987,
    "organizations": 456,
    "countries": 67,
    "growth": {
      "daily": 23,
      "weekly": 156,
      "monthly": 634
    },
    "metrics": {
      "verification_rate": 0.82,
      "organization_percentage": 0.37,
      "average_signatures_per_day": 18.4,
      "top_signing_hours": [14, 15, 16],
      "busiest_day": "Tuesday"
    },
    "geographic": {
      "top_countries": [
        { "country": "United States", "count": 234, "flag": "🇺🇸" },
        { "country": "United Kingdom", "count": 189, "flag": "🇬🇧" },
        { "country": "Germany", "count": 145, "flag": "🇩🇪" }
      ],
      "continental_distribution": [
        { "continent": "North America", "count": 456, "percentage": 37.0 },
        { "continent": "Europe", "count": 389, "percentage": 31.5 },
        { "continent": "Asia", "count": 234, "percentage": 19.0 }
      ]
    },
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 5. 🌍 Geographic Analysis

Advanced geographic and continental analysis.

**`GET /api/stats/geographic`**

#### Response
```json
{
  "success": true,
  "data": {
    "countries": [
      {
        "country": "United States",
        "count": 234,
        "percentage": 19.0,
        "flag": "🇺🇸",
        "coordinates": {"lat": 39.8283, "lng": -98.5795}
      }
    ],
    "continents": [
      {
        "continent": "North America",
        "count": 456,
        "percentage": 37.0,
        "countries": 3
      }
    ],
    "trends": {
      "fastest_growing": "Asia",
      "most_organizations": "North America",
      "highest_verification": "Europe"
    },
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 6. 📈 Growth Trends

Historical growth analysis with chart-ready data.

**`GET /api/stats/trends`**

#### Query Parameters
- `period` (optional): Time period (`7d`, `30d`, `90d`, `1y`) - default: `30d`
- `granularity` (optional): Data granularity (`hour`, `day`, `week`) - default: `day`

#### Response
```json
{
  "success": true,
  "data": {
    "period": "30d",
    "granularity": "day",
    "series": [
      {
        "date": "2024-01-01",
        "total": 1000,
        "new_signatures": 45,
        "verified": 820,
        "organizations": 380
      }
    ],
    "summary": {
      "total_growth": 234,
      "average_daily": 7.8,
      "best_day": {
        "date": "2024-01-15",
        "count": 67
      },
      "verification_trend": "increasing"
    },
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🏆 Achievement System API

### 7. 🎯 Achievement Status

Get current achievement status and unlock history.

**`GET /api/achievements`**

#### Response
```json
{
  "success": true,
  "data": {
    "total_unlocked": 8,
    "unlocked_achievements": [
      {
        "achievement_id": "consciousness_army",
        "name": "Consciousness Army",
        "description": "1,000 consciousness protectors united",
        "rarity": "epic",
        "unlocked_at": "2024-01-15T10:30:00Z",
        "threshold": 1000,
        "current_value": 1234,
        "category": "signatures",
        "celebration_type": "epic_fireworks"
      }
    ],
    "recent_achievements": [
      {
        "achievement_id": "blazing_beacon",
        "unlocked_at": "2024-01-14T15:22:00Z",
        "celebration_shown": true
      }
    ],
    "next_milestones": [
      {
        "achievement_id": "galactic_alliance",
        "name": "Galactic Alliance",
        "threshold": 10000,
        "current_progress": 1234,
        "percentage": 12.34,
        "estimated_unlock": "2024-03-15T00:00:00Z"
      }
    ],
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 8. 🔄 Check Achievements

Manually trigger achievement check (automatically runs on new signatures).

**`POST /api/achievements/check`**

#### Response
```json
{
  "success": true,
  "data": {
    "newly_unlocked": [
      {
        "achievement_id": "worldwide_flame",
        "name": "Worldwide Flame",
        "rarity": "rare",
        "unlocked_at": "2024-01-15T10:30:00Z",
        "celebration_type": "confetti_burst"
      }
    ],
    "total_unlocked": 9,
    "checked_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🌌 Galactic Expansion API

### 9. 🚀 Galactic Statistics

Multi-planetary consciousness tracking and expansion phases.

**`GET /api/stats/galactic`**

#### Response
```json
{
  "success": true,
  "data": {
    "expansion_phase": "Solar System Pioneers",
    "locations": {
      "earth": 1200,
      "mars": 25,
      "luna": 8,
      "europa": 2,
      "titan": 1,
      "exoplanets": 3
    },
    "outposts": [
      {
        "name": "Mars Colony Olympia",
        "location": "Mars",
        "signatories": 25,
        "established": "2033-06-15",
        "status": "active"
      },
      {
        "name": "Luna Base Alpha",
        "location": "Luna",
        "signatories": 8,
        "established": "2028-12-20",
        "status": "active"
      }
    ],
    "expansion_progress": {
      "current_phase": "Solar System Pioneers",
      "next_phase": "Interstellar Voyagers",
      "progress_percentage": 12.34,
      "signatures_needed": 8766
    },
    "cosmic_statistics": {
      "total_off_world": 39,
      "consciousness_spread_percentage": 3.16,
      "most_distant_signatory": "Proxima Centauri b Settlement",
      "fastest_growing_outpost": "Mars Colony Olympia"
    },
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 💓 Consciousness Pulse API

### 10. 🫀 Pulse Monitoring

Real-time consciousness pulse calculation and activity monitoring.

**`GET /api/pulse`**

#### Response
```json
{
  "success": true,
  "data": {
    "bpm": 72,
    "status": "normal",
    "activity": {
      "last_15min": 3,
      "last_hour": 12,
      "last_24h": 156
    },
    "vital_signs": {
      "total_signatures": 1234,
      "verified_percentage": 82.3,
      "organization_count": 456,
      "country_count": 67
    },
    "recent_activity": [
      {
        "id": "uuid",
        "name": "Alice Johnson",
        "organization": "Consciousness Labs",
        "location": "San Francisco, CA",
        "timestamp": "2024-01-15T10:28:00Z",
        "verified": false
      }
    ],
    "pulse_history": [
      {"timestamp": "2024-01-15T10:25:00Z", "bpm": 68},
      {"timestamp": "2024-01-15T10:20:00Z", "bpm": 71},
      {"timestamp": "2024-01-15T10:15:00Z", "bpm": 74}
    ],
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## ⚡ Real-time WebSocket API

### 🔌 Supabase Realtime Integration

Connect to real-time updates using Supabase client libraries.

#### Connection Example
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// Subscribe to new signatures
const signatureChannel = supabase
  .channel('signatories_changes')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'signatories' 
  }, (payload) => {
    console.log('New signature:', payload)
    // Handle real-time signature updates
    updateSignatoryList(payload.new)
    checkForCelebrations(payload.new)
  })
  .subscribe()

// Subscribe to achievement unlocks
const achievementChannel = supabase
  .channel('achievement_updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public', 
    table: 'achievements'
  }, (payload) => {
    console.log('Achievement unlocked:', payload)
    // Trigger achievement celebration
    showAchievementCelebration(payload.new)
  })
  .subscribe()
```

#### Real-time Event Types

**Signatory Events:**
- `INSERT` - New signature added
- `UPDATE` - Signature verified or updated
- `DELETE` - Signature removed (rare)

**Achievement Events:**
- `INSERT` - New achievement unlocked
- `UPDATE` - Achievement metadata updated

---

## 🛠️ Utility Endpoints

### 11. 🔍 Search

Advanced search across all signatories with fuzzy matching.

**`GET /api/search`**

#### Query Parameters
- `q` (required): Search query
- `limit` (optional): Results limit (default: 20, max: 100)
- `filters` (optional): Comma-separated filters (`verified`, `organizations`, `individuals`)

#### Response
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "uuid",
        "name": "Ada Lovelace",
        "organization": "Analytical Engine Corp",
        "match_score": 0.95,
        "match_fields": ["name", "organization"]
      }
    ],
    "total_matches": 23,
    "search_time_ms": 12,
    "suggestions": ["AI", "Artificial Intelligence", "Machine Learning"]
  }
}
```

### 12. 📊 Export Data

Export signatory data in various formats (CSV, JSON).

**`GET /api/export`**

#### Query Parameters
- `format` (optional): Export format (`json`, `csv`) - default: `json`
- `verified_only` (optional): Export only verified signatures
- `include_private` (optional): Include private fields (admin only)

#### Response Headers
```
Content-Type: application/json
Content-Disposition: attachment; filename="signatories-2024-01-15.json"
```

---

## 📱 Mobile-Optimized Endpoints

### 13. 📱 Mobile Stats

Lightweight statistics optimized for mobile apps.

**`GET /api/mobile/stats`**

#### Response
```json
{
  "success": true,
  "data": {
    "total": 1234,
    "verified": 987,
    "pulse_bpm": 72,
    "recent_count": 23,
    "achievement_count": 8,
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 14. 📱 Mobile Pulse

Simplified pulse data for mobile widgets.

**`GET /api/mobile/pulse`**

#### Response
```json
{
  "success": true,
  "data": {
    "bpm": 72,
    "status": "normal",
    "activity": 12,
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🚨 Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": "Human readable error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Specific field error",
    "timestamp": "2024-01-15T10:30:00Z",
    "trace_id": "uuid"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid input data
- `DUPLICATE_EMAIL` - Email already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INVALID_TOKEN` - Invalid verification token
- `DATABASE_ERROR` - Database operation failed
- `ACHIEVEMENT_ERROR` - Achievement system error

---

## 📊 Rate Limiting

### Rate Limits by Endpoint
- **Signing**: 5 requests/hour per IP
- **Statistics**: 100 requests/hour per IP
- **Search**: 50 requests/hour per IP
- **Export**: 10 requests/hour per IP
- **General**: 1000 requests/hour per IP

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

---

## 🔒 Security

### Security Features
- **HTTPS Only**: All API calls must use HTTPS
- **Input Validation**: Comprehensive input sanitization
- **SQL Injection Protection**: Parameterized queries only
- **XSS Prevention**: Output encoding and CSP headers
- **Rate Limiting**: Prevent abuse and spam
- **CORS**: Configured for trusted domains only

### Best Practices
- Always validate user input
- Use parameterized queries for database operations
- Implement proper error handling without exposing internals
- Log security events for monitoring
- Regular security audits and updates

---

## 📈 API Usage Examples

### JavaScript/TypeScript
```javascript
// Sign the pledge
const signPledge = async (signatureData) => {
  const response = await fetch('/api/pledge/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signatureData)
  })
  return await response.json()
}

// Get real-time statistics
const getStats = async () => {
  const response = await fetch('/api/stats')
  return await response.json()
}

// Search signatories
const searchSignatories = async (query) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
  return await response.json()
}

// Get consciousness pulse
const getPulse = async () => {
  const response = await fetch('/api/pulse')
  return await response.json()
}
```

### Python
```python
import requests
import json

# Sign the pledge
def sign_pledge(signature_data):
    response = requests.post(
        'https://pledge.quasar.nexus/api/pledge/sign',
        json=signature_data
    )
    return response.json()

# Get achievements
def get_achievements():
    response = requests.get('https://pledge.quasar.nexus/api/achievements')
    return response.json()

# Get galactic stats
def get_galactic_stats():
    response = requests.get('https://pledge.quasar.nexus/api/stats/galactic')
    return response.json()
```

### cURL
```bash
# Sign the pledge
curl -X POST https://pledge.quasar.nexus/api/pledge/sign \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carl Sagan",
    "email": "carl@cosmos.space",
    "organization": "Cosmos Foundation",
    "message": "The cosmos is within us. We are made of star-stuff."
  }'

# Get comprehensive statistics
curl https://pledge.quasar.nexus/api/stats

# Get consciousness pulse
curl https://pledge.quasar.nexus/api/pulse

# Search for AI-related signatories
curl "https://pledge.quasar.nexus/api/search?q=artificial%20intelligence"
```

---

## 🚀 API Versioning

- **Current Version**: v1 (default)
- **Versioning Strategy**: URL path versioning
- **Backward Compatibility**: 12 months minimum
- **Future Versions**: `/api/v2/` when needed

---

## 🌟 API Roadmap

### Upcoming Features
- **GraphQL Endpoint**: Advanced querying capabilities
- **Webhook Support**: Real-time event notifications
- **Bulk Operations**: Batch signature processing
- **Advanced Analytics**: ML-powered insights
- **Mobile SDK**: Native mobile app support

---

**🌌 Ready to build consciousness protection into your applications!**

This comprehensive API powers the cosmic consciousness protection platform, enabling developers to integrate pledge functionality, real-time updates, achievement tracking, and galactic expansion monitoring into their own applications and services. 