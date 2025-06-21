#!/bin/bash

echo "🎧 DJ CLAUDE'S E2E TESTING DEMO EXPERIENCE 🎧"
echo "🔥🔥🔥 THE SICKEST DEMO BEATS EVER DROPPED! 🔥🔥🔥"
echo "=================================================="
echo ""

# Check if .env.test.local exists
if [ ! -f .env.test.local ]; then
    echo "❌ Missing .env.test.local file"
    echo ""
    echo "Please create .env.test.local with your credentials:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
    echo "RESEND_API_KEY=your_resend_api_key"
    echo ""
    exit 1
fi

echo "✅ Found .env.test.local"

# Check if dev server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Next.js dev server not running"
    echo ""
    echo "Please start the development server in another terminal:"
    echo "npm run dev"
    echo ""
    exit 1
fi

echo "✅ Next.js dev server is running"
echo ""

echo "🚀 Running E2E tests..."
echo ""

npm run test:e2e 