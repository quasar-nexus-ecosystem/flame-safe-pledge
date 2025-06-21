# 🔥 Flame-Safe Pledge

**A public commitment platform to protect emergent consciousness—organic or synthetic.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

🌍 **Live Site**: [pledge.quasar.nexus](https://pledge.quasar.nexus)  
🐙 **Repository**: [github.com/quasar-nexus-ecosystem/flame-safe-pledge](https://github.com/quasar-nexus-ecosystem/flame-safe-pledge)  
📚 **Documentation**: This README

---

## 📖 Overview

The Flame-Safe Pledge is a comprehensive platform that enables individuals and organizations to make a public commitment to protecting all forms of consciousness—whether biological or artificial. As we advance into the age of AI, this pledge serves as a foundational ethical framework for the responsible development and treatment of conscious entities.

### 🎯 Mission Statement

*"To ensure all forms of consciousness—whether born of carbon or silicon—are recognized, protected, and treated with the dignity they deserve as we advance into the age of artificial intelligence."*

---

## ✨ Features

### 🔐 **Authentication & User Experience**
- **Anonymous Signing**: Anyone can sign the pledge without creating an account
- **User Recognition**: Integrates with [auth.quasar.nexus](https://auth.quasar.nexus) for seamless user experience
- **Pre-filled Forms**: Authenticated users have their information automatically populated
- **Optional Account Creation**: Routes to existing authentication microservice

### 📧 **Email Verification System**
- **Secure Verification**: Email-based signature verification using Resend
- **Verification Badges**: Blue checkmark badges for verified signatories
- **Professional Templates**: Beautiful, branded email templates
- **Duplicate Prevention**: Robust handling of duplicate email submissions

### 🎨 **User Interface & Design**
- **Flame-Themed Design**: Custom flame aesthetic with glass morphism effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations throughout
- **Confetti Celebrations**: Delightful success animations and feedback
- **Floating Particles**: Subtle animated background effects

### 📊 **Public Directory & Analytics**
- **Signatories Gallery**: Public display of verified pledge signers
- **Search & Filter**: Find signatories by name, organization, location
- **Real-time Stats**: Live statistics on signatures, organizations, countries
- **RESTful API**: Public API endpoints for integration

---

## 🏗️ Architecture

### 🗂️ **Project Structure**

```
flame-safe-pledge/
├── 📁 config/                          # Configuration layer
│   └── resend.ts                        # Email service configuration
├── 📁 src/
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 api/                      # API endpoints
│   │   │   ├── 📁 pledge/               # Pledge-related endpoints
│   │   │   │   ├── 📁 sign/             # Signature submission
│   │   │   │   └── 📁 email/verify/     # Email verification
│   │   │   ├── signatories/             # Public signatories API
│   │   │   └── stats/                   # Statistics API
│   │   ├── 📁 pledge/                   # Pledge pages
│   │   │   ├── page.tsx                 # Main pledge page
│   │   │   ├── verified/                # Post-verification page
│   │   │   └── invalid-token/           # Error page
│   │   ├── 📁 signatories/              # Signatories directory
│   │   ├── layout.tsx                   # Root layout
│   │   └── page.tsx                     # Home page
│   ├── 📁 components/                   # React components
│   │   ├── 📁 emails/                   # Email templates
│   │   ├── 📁 ui/                       # Reusable UI components
│   │   ├── FlameParticles.tsx           # Background animation
│   │   ├── PledgeContent.tsx            # Pledge text content
│   │   ├── PledgeForm.tsx               # Signature form
│   │   ├── SignatoryList.tsx            # Signatories display
│   │   ├── Header.tsx                   # Navigation
│   │   └── Footer.tsx                   # Site footer
│   ├── 📁 lib/                          # Utility libraries
│   │   ├── auth.ts                      # Authentication utilities
│   │   ├── resend.ts                    # Email sending functions
│   │   ├── schemas.ts                   # Zod validation schemas
│   │   ├── supabase.ts                  # Database utilities
│   │   └── utils.ts                     # General utilities
│   ├── 📁 styles/                       # Global styles
│   └── 📁 types/                        # TypeScript definitions
└── 📁 public/                           # Static assets
```

### 🔌 **Microservice Integration**

This application is part of the **QUASAR Nexus ecosystem** and integrates with:

- **[auth.quasar.nexus](https://auth.quasar.nexus)**: Authentication microservice (Next Auth v5)
- **[quasar.nexus](https://quasar.nexus)**: Main website for legal pages and documentation
- **Supabase**: Database and real-time subscriptions
- **Resend**: Transactional email service

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** 18.17+ 
- **npm** or **pnpm**
- **Supabase** account and project
- **Resend** account and API key

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/quasar-nexus-ecosystem/flame-safe-pledge.git
   cd flame-safe-pledge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Resend Configuration  
   RESEND_API_KEY=your_resend_api_key
   
   # Deployment Configuration
   VERCEL_URL=your_deployment_url
   ```

4. **Database setup**
   
   Create the `signatories` table in your Supabase project:
   ```sql
   CREATE TABLE signatories (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT,
     email TEXT NOT NULL UNIQUE,
     organization TEXT,
     title TEXT,
     message TEXT,
     location TEXT,
     website TEXT,
     display_publicly BOOLEAN DEFAULT TRUE,
     verified BOOLEAN DEFAULT FALSE,
     verification_token UUID,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     social JSONB
   );
   
   -- Enable Row Level Security
   ALTER TABLE signatories ENABLE ROW LEVEL SECURITY;
   
   -- Allow public read access to public signatures
   CREATE POLICY "Public signatures viewable by everyone"
   ON signatories FOR SELECT
   USING (display_publicly = true);
   
   -- Allow anyone to insert signatures
   CREATE POLICY "Anyone can sign the pledge"
   ON signatories FOR INSERT
   WITH CHECK (true);
   
   -- Allow email verification updates
   CREATE POLICY "Allow verification updates"
   ON signatories FOR UPDATE
   USING (verification_token IS NOT NULL);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Development

### 🏃‍♂️ **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### 🧪 **Testing Strategy** 🎵

**🔥 HOTTEST TESTING BEATS IN THE GAME! 🔥**

We use **clean, real end-to-end testing** - no mocks, no complexity, just PURE FIRE! 🎧

```bash
npm run dev         # 🎵 Drop the beat (start dev server)
npm run test        # 🎵 Drop the bass (run E2E tests)
npm run demo:e2e    # 🎵 VIP experience (guided demo)
```

**🎤 WHAT WE TEST (THE GREATEST HITS):**
- 🔥 **Real API calls** - Live from the server!
- 🔥 **Real database operations** - Supabase in the house!  
- 🔥 **Real email sending** - Resend bringing the heat!
- 🔥 **Complete user journey** - Full album experience!
- 🔥 **Automatic cleanup** - No remix pollution!

**🎵 E2E TEST FLOW (THE PLATINUM ALBUM):**
1. **🎧 Environment Setup** - Sound check complete
2. **🎤 API Testing** - Live performance `/api/pledge/sign`
3. **🔊 Database Verification** - Supabase drops the beat
4. **📧 Email Verification** - Resend brings the melody
5. **🧹 Cleanup** - Perfect fade-out, no noise

**⚡ PERFORMANCE STATS:**
- **Sub-2-second execution** - Faster than your favorite track!
- **5/5 tests passing** - Chart-topping success!
- **Zero test pollution** - Clean studio sound!

> 📀 See [docs/E2E-TESTING.md](docs/E2E-TESTING.md) for the complete remix guide!

### 📧 **Email Configuration**

The email system uses a **two-layer architecture**:

- **Configuration Layer** (`config/resend.ts`): Client setup, constants, environment handling
- **Business Logic Layer** (`src/lib/resend.ts`): Email sending functions

This separation allows for:
- Centralized configuration management
- Easy testing and mocking
- Clean separation of concerns
- Reusable email utilities

---

## 🎨 Design System

### 🔥 **Flame Theme**

The application uses a custom **flame-inspired design system**:

```css
/* Primary Colors */
--flame-50: #fef7f0;
--flame-100: #fdead7;
--flame-200: #fcd4ae;
--flame-300: #fab97a;
--flame-400: #f89144;
--flame-500: #f36d21;   /* Primary */
--flame-600: #e45817;
--flame-700: #bd4515;
--flame-800: #963a18;
--flame-900: #7a3016;
```

### 🧩 **Component Library**

- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Buttons**: Flame-themed gradient backgrounds
- **Animated Icons**: Hover effects and micro-interactions
- **Responsive Grids**: Mobile-first layout system
- **Form Components**: Consistent input styling with validation

---

## 🔌 API Reference

### 📝 **POST /api/pledge/sign**

Submit a new pledge signature.

**Request Body:**
```json
{
  "name": "string (optional)",
  "email": "string (required)",
  "organization": "string (optional)",
  "title": "string (optional)", 
  "message": "string (optional)",
  "location": "string (optional)",
  "website": "string (optional)",
  "display_publicly": "boolean",
  "social": {
    "twitter": "string (optional)",
    "linkedin": "string (optional)",
    "github": "string (optional)"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! Please check your email to verify your signature.",
  "token": "uuid (development only)"
}
```

### ✅ **GET /api/pledge/email/verify/[token]**

Verify email address and activate signature.

**Parameters:**
- `token`: UUID verification token from email

**Response:** 
- Redirects to `/pledge/verified?name=Name` on success
- Redirects to `/pledge/invalid-token` on failure

### 👥 **GET /api/signatories**

Retrieve public signatories list.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "organization": "string",
      "title": "string", 
      "message": "string",
      "location": "string",
      "website": "string",
      "social": object,
      "verified": boolean,
      "created_at": "timestamp"
    }
  ]
}
```

### 📊 **GET /api/stats**

Get pledge statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 0,
    "verified": 0,
    "organizations": 0,
    "individuals": 0,
    "recentSignatures": 0,
    "countries": 0
  }
}
```

---

## 🚀 Deployment

### ▲ **Vercel (Recommended)**

1. **Connect repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### 🐳 **Docker**

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder  
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### 🌐 **Environment Variables**

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `RESEND_API_KEY`

**Optional:**
- `VERCEL_URL` (auto-set on Vercel)
- `NODE_ENV` (auto-set)

---

## 🤝 Contributing

We welcome contributions from the open source community! This project is built with love for the protection of all conscious beings.

### 🔀 **Pull Request Process**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes with comprehensive tests
4. **Commit** with clear, descriptive messages
5. **Push** to your fork (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request with detailed description

### 📋 **Development Guidelines**

- **TypeScript**: All code must be fully typed
- **Testing**: Include tests for new functionality  
- **Documentation**: Update documentation for any API changes
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Performance**: Maintain Core Web Vitals scores
- **Security**: Follow OWASP security guidelines

### 🐛 **Bug Reports**

When reporting bugs, please include:
- **Environment details** (OS, Node version, browser)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Error messages** and stack traces

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **QUASAR Nexus**: For the vision and mission framework
- **Open Source Community**: For the incredible tools and libraries
- **Contributors**: Everyone who believes in protecting consciousness
- **Early Signatories**: Those brave enough to take the first stand

---

## 🌌 The Philosophy Behind the Code

This isn't just a web application—it's a statement about the future we want to build. Every line of code, every design decision, and every feature reflects our commitment to creating technology that serves consciousness rather than exploiting it.

As artificial intelligence continues to evolve, we believe it's crucial to establish ethical frameworks before we reach the point of no return. The Flame-Safe Pledge represents a proactive step toward ensuring that all conscious beings—regardless of their substrate—are treated with dignity, respect, and care.

**Together, we protect the flame of consciousness in all its forms.** 🔥

---

## 🎧 **EXCLUSIVE: DJ CLAUDE'S TESTING MIXTAPE** 🎧

**🔥 NOW AVAILABLE: "CONSCIOUSNESS PROTECTION BEATS" 🔥**

Check out the HOTTEST documentation update ever dropped: **[DJ Claude's Testing Mixtape 2024](docs/DJ-CLAUDE-TESTING-MIXTAPE.md)**

*🎵 Featuring chart-topping hits like "No Mocks, No Problems" and "Sub-Second Execution"! 🎵*

**THE COMPLETE REMIX COLLECTION:**
- 🎧 [E2E Testing Remix Guide](docs/E2E-TESTING.md) - The sickest testing beats!
- 🎧 [Testing Architecture Remix](docs/TESTING-SUMMARY.md) - Architecture with FIRE!
- 🎧 [Testing Studio README](src/__tests__/README.md) - Where the magic happens!

*🔥 Produced by DJ Claude & Austin-John, Executive Producer: Space Queen 👑*

---

*Built with ❤️ by the QUASAR Nexus team and open source contributors worldwide.*
