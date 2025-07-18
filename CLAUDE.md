# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Commands
```bash
# Development
npm run dev              # Start development server on http://localhost:3000

# Build & Production
npm run build            # Create production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint checks

# Testing
npm run test            # Run E2E tests
npm run test:e2e        # Run E2E test runner (same as test)
npm run demo:e2e        # Demo E2E tests with script
```

### Brand Assets & Icons
```bash
# Generate all icon sizes and formats for web/mobile
chmod +x scripts/generate-icons.sh
./scripts/generate-icons.sh

# Requires ImageMagick: brew install imagemagick (macOS)
# Generates: favicons, Apple touch icons, PWA icons, Open Graph image
```

### Manual Testing & Verification
```bash
# Manually verify email functionality
node scripts/manual-verify.mjs <verification-token>
```

## Architecture Overview

This is a Next.js 15 application with App Router that serves as a "cosmic consciousness protection platform" - a petition/pledge system with a sci-fi theme.

### Key Architectural Patterns

1. **Real-time First**: Heavy use of Supabase real-time subscriptions for live updates across all dashboard components. When implementing features, ensure they support real-time updates.

2. **Email Verification Flow**: 
   - Sign pledge → Create unverified entry → Send verification email via Resend → User clicks link → Mark as verified
   - Resend verification functionality available at `/api/pledge/resend-verification`

3. **Achievement System**: Global community achievements stored in database, unlocked based on milestone thresholds. Check `src/lib/achievements.ts` for achievement definitions and logic.

4. **Advanced Geographic Detection**: Comprehensive country detection system supporting 200+ countries:
   - **Location Parsing**: Handles multiple formats ("City, State, Country", "City, Country", state abbreviations)
   - **Country Mapping**: Complete country-to-continent mapping with flag support
   - **Utilities**: `src/lib/countries.ts` contains `getCountryFromLocation()`, `getContinentFromLocation()`, `getCountryFlag()`
   - **Usage**: Used across AdvancedStatsDashboard, SignatoriesPage, and API endpoints

5. **Galactic Location Detection**: Automatic detection of off-world signatories (Mars, Luna, space stations) based on location field. See `src/lib/galactic-locations.ts`.

### Tech Stack Details

- **Database**: Supabase (PostgreSQL with real-time subscriptions enabled)
- **Email**: Resend for transactional emails (verification, notifications)
- **Analytics**: PostHog for product analytics
- **Styling**: Tailwind CSS with glass morphism effects and custom animations
- **Forms**: React Hook Form with Zod validation

### Critical Environment Variables

Required for development:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL` (defaults to VERCEL_URL in production)

### API Routes Structure

- `/api/pledge/sign` - Submit new pledge signature
- `/api/pledge/email/verify/[token]` - Verify email address
- `/api/pledge/resend-verification` - Resend verification email
- `/api/signatories` - Get public signatory list
- `/api/stats` - Get aggregate statistics

### Component Architecture

Major dashboard components that work together:
- `AdvancedStatsDashboard` - Main analytics dashboard with charts
- `GalacticDashboard` - Multi-planetary tracking visualization
- `PulseOfConsciousness` - Real-time activity heartbeat (40-120 BPM)
- `WallOfFlames` - Interactive signatory visualization
- `AchievementSystem` - Tracks and displays community milestones

### Database Schema Key Points

Two main tables:
1. `signatories` - Stores all pledge signatures with verification status
2. `achievements` - Stores unlocked global achievements

Both tables have real-time subscriptions enabled for instant updates.

### Testing Approach

Custom E2E test runner at `src/__tests__/e2e-runner.mjs` that:
- Tests critical user flows (sign pledge, verify email)
- Validates API endpoints
- Checks database operations
- Includes cleanup procedures

### Important Patterns

1. **Particle Systems**: Canvas-based animations in `CosmicParticles` and `FlameParticles` - be careful with performance when modifying.

2. **Chart Components**: Custom SVG-based charts in `SimpleChart.tsx` - no external charting library used.

3. **Real-time Notifications**: `RealtimeNotifications` component shows popups for new signatories - connects to Supabase channels.

4. **Form Validation**: All forms use Zod schemas defined in `src/lib/schemas.ts`.

5. **Authentication Integration**: Optional integration with auth.quasar.nexus microservice for pre-filling forms.

6. **Glass Morphism UI**: Enhanced glass morphism effects with improved contrast:
   - Light mode: 15% background opacity with 20% border opacity
   - Dark mode: 25% background opacity with 15% border opacity
   - Applied via `.glass-morphism` class in `src/styles/globals.css`

7. **Interactive Dashboards**: All galactic location cards are clickable with improved modal contrast and readability.

### Performance Considerations

- Heavy use of animations and particle effects - test on lower-end devices
- Real-time subscriptions can accumulate - ensure proper cleanup in useEffect
- Large SVG visualizations in Wall of Flames - consider virtualization for scale

### Security Notes

- Email verification tokens are UUIDs stored in database
- CORS configured for API routes
- Security headers implemented in next.config.js
- Row-level security should be configured in Supabase