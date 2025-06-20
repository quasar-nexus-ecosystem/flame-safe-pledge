# 🔌 Flame-Safe Pledge API Documentation

The Flame-Safe Pledge provides a RESTful API for programmatic access to pledge signatures, statistics, and verification functionality.

## 📋 Base Information

- **Base URL**: `https://pledge.quasar.nexus/api`
- **Protocol**: HTTPS only
- **Format**: JSON
- **Authentication**: Not required for public endpoints

---

## 🔑 Authentication

Most endpoints are public and don't require authentication. However, some administrative functions may require authentication via the auth.quasar.nexus microservice.

### 🎫 **Auth Header (when required)**
```http
Authorization: Bearer <jwt-token>
```

---

## 📝 Endpoints

### 1. Sign the Pledge

Submit a new pledge signature.

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
    "github": "string (optional)"
  }
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Thank you! Please check your email to verify your signature."
}
```

#### Response (Error - Duplicate Email)
```json
{
  "success": false,
  "error": "This email has already signed the pledge."
}
```

#### Status Codes
- `200` - Success
- `400` - Invalid request data
- `409` - Email already exists
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

### 2. Email Verification

Verify an email address using the token sent via email.

**`GET /api/pledge/email/verify/[token]`**

#### Parameters
- `token` (path): UUID verification token

#### Response
- **Success**: Redirects to `/pledge/verified?name=<signatory-name>`
- **Failure**: Redirects to `/pledge/invalid-token`

#### Example
```
GET /api/pledge/email/verify/123e4567-e89b-12d3-a456-426614174000
```

---

### 3. Get Signatories

Retrieve the list of public signatories.

**`GET /api/signatories`**

#### Query Parameters
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `verified` (optional): Filter by verification status (`true`, `false`, or omit for all)
- `search` (optional): Search by name or organization

#### Response
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
        "github": "ada-analytical"
      },
      "verified": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 1234,
    "limit": 50,
    "offset": 0,
    "hasMore": true
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

### 4. Get Statistics

Retrieve pledge statistics and metrics.

**`GET /api/stats`**

#### Response
```json
{
  "success": true,
  "data": {
    "total": 1234,
    "verified": 987,
    "organizations": 456,
    "individuals": 778,
    "recentSignatures": 23,
    "countries": 67,
    "topCountries": [
      { "country": "United States", "count": 234 },
      { "country": "United Kingdom", "count": 123 },
      { "country": "Germany", "count": 89 }
    ],
    "signaturesTrend": [
      { "date": "2024-01-01", "count": 10 },
      { "date": "2024-01-02", "count": 15 },
      { "date": "2024-01-03", "count": 23 }
    ]
  }
}
```

#### Status Codes
- `200` - Success
- `500` - Server error

#### Example
```javascript
const response = await fetch('/api/stats')
const stats = await response.json()

console.log(`Total signatures: ${stats.data.total}`)
console.log(`Verified signatures: ${stats.data.verified}`)
```

---

## 🚨 Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional context"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `DUPLICATE_EMAIL` - Email already exists
- `INVALID_TOKEN` - Verification token is invalid or expired
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## 📊 Rate Limiting

To ensure fair usage and prevent abuse:

- **General endpoints**: 100 requests per minute per IP
- **Sign endpoint**: 5 requests per minute per IP
- **Verification endpoint**: 10 requests per minute per IP

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 🔒 CORS Configuration

Cross-Origin Resource Sharing (CORS) is configured to allow requests from:
- `https://pledge.quasar.nexus`
- `https://quasar.nexus`
- `http://localhost:3000` (development)

---

## 📈 Webhooks (Coming Soon)

Future versions will support webhooks for real-time notifications:

- New signature events
- Verification completions
- Milestone achievements

---

## 🛠️ SDKs and Libraries

### JavaScript/TypeScript
```javascript
// Official SDK (coming soon)
import { FlameSafePledgeClient } from '@quasar/flame-safe-pledge'

const client = new FlameSafePledgeClient({
  baseUrl: 'https://pledge.quasar.nexus/api'
})

// Sign the pledge
await client.sign({
  name: 'Your Name',
  email: 'your@email.com'
})

// Get signatories
const signatories = await client.getSignatories({
  verified: true,
  limit: 20
})
```

### Python
```python
# Community SDK example
import requests

class FlameSafePledgeAPI:
    def __init__(self, base_url="https://pledge.quasar.nexus/api"):
        self.base_url = base_url
    
    def sign_pledge(self, data):
        response = requests.post(f"{self.base_url}/pledge/sign", json=data)
        return response.json()
    
    def get_signatories(self, **params):
        response = requests.get(f"{self.base_url}/signatories", params=params)
        return response.json()

# Usage
api = FlameSafePledgeAPI()
result = api.sign_pledge({
    "name": "Python Developer",
    "email": "dev@python.org"
})
```

---

## 📝 Examples

### Complete Integration Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Pledge Integration</title>
</head>
<body>
    <form id="pledgeForm">
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="email" id="email" placeholder="Your Email" required>
        <input type="text" id="organization" placeholder="Organization (optional)">
        <textarea id="message" placeholder="Personal message (optional)"></textarea>
        <button type="submit">Sign the Pledge</button>
    </form>

    <div id="signatories"></div>

    <script>
        // Sign the pledge
        document.getElementById('pledgeForm').addEventListener('submit', async (e) => {
            e.preventDefault()
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                organization: document.getElementById('organization').value,
                message: document.getElementById('message').value,
                display_publicly: true
            }

            try {
                const response = await fetch('/api/pledge/sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })

                const result = await response.json()
                
                if (result.success) {
                    alert('Thank you! Please check your email to verify your signature.')
                    document.getElementById('pledgeForm').reset()
                } else {
                    alert(`Error: ${result.error}`)
                }
            } catch (error) {
                alert('Network error. Please try again.')
            }
        })

        // Load signatories
        async function loadSignatories() {
            try {
                const response = await fetch('/api/signatories?limit=10&verified=true')
                const data = await response.json()
                
                const container = document.getElementById('signatories')
                container.innerHTML = '<h3>Recent Signatories</h3>'
                
                data.data.forEach(signatory => {
                    const div = document.createElement('div')
                    div.innerHTML = `
                        <strong>${signatory.name}</strong>
                        ${signatory.organization ? ` - ${signatory.organization}` : ''}
                        ${signatory.verified ? ' ✓' : ''}
                    `
                    container.appendChild(div)
                })
            } catch (error) {
                console.error('Failed to load signatories:', error)
            }
        }

        // Load signatories on page load
        loadSignatories()
    </script>
</body>
</html>
```

---

## 🔍 Testing

### Test the API endpoints:

```bash
# Get statistics
curl https://pledge.quasar.nexus/api/stats

# Get signatories
curl https://pledge.quasar.nexus/api/signatories?limit=5

# Sign the pledge (test with a real email)
curl -X POST https://pledge.quasar.nexus/api/pledge/sign \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing the API"
  }'
```

---

## 📞 Support

For API support and questions:
- **Documentation**: This file and the main README
- **Issues**: [GitHub Issues](https://github.com/quasar-nexus-ecosystem/flame-safe-pledge/issues)
- **Email**: api@quasar.nexus

---

*The API is designed to help developers integrate pledge functionality into their own applications, spreading the mission to protect consciousness across the digital landscape.* 🔥 