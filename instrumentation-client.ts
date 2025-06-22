import posthog from "posthog-js"

// Only initialize PostHog if we have a valid key
if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "https://us.i.posthog.com",
    ui_host: "https://us.posthog.com",
    capture_pageview: 'history_change',
    capture_pageleave: true, // Enable pageleave capture
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
    debug: process.env.NODE_ENV === "development",
  })
} else {
  console.log('PostHog not initialized - missing key or server-side rendering')
}
