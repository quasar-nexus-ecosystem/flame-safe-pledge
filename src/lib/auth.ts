/**
 * Authentication integration with auth.quasar.nexus microservice.
 * Uses Next Auth v5 session detection for optional user recognition.
 * 
 * Cookie Domain Configuration:
 * - auth.quasar.nexus should set COOKIE_DOMAIN=.quasar.nexus (or NEXTAUTH_COOKIE_DOMAIN if using pure NextAuth.js)
 * - This allows cookies to be shared across pledge.quasar.nexus
 * 
 * @returns {Promise<{ id: string; name: string; email: string } | null>}
 */
export async function getCurrentUser() {
  try {
    // Import cookies dynamically to avoid build issues
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    
    // Check for session cookies from auth.quasar.nexus
    // These cookies should be available if COOKIE_DOMAIN=.quasar.nexus is set
    const sessionCookie = cookieStore.get('__Secure-next-auth.session-token')?.value || 
                         cookieStore.get('next-auth.session-token')?.value ||
                         cookieStore.get('session-token')?.value ||
                         cookieStore.get('auth-token')?.value

    if (sessionCookie) {
      try {
        // Validate session with auth.quasar.nexus microservice
        const response = await fetch('https://auth.quasar.nexus/api/auth/session', {
          headers: {
            'Cookie': cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
            'Origin': 'https://pledge.quasar.nexus'
          },
          credentials: 'include'
        })

        if (response.ok) {
          const session = await response.json()
          if (session?.user) {
            return {
              id: session.user.id || session.user.email,
              name: session.user.name || '',
              email: session.user.email || ''
            }
          }
        }
      } catch (fetchError) {
        console.warn('Failed to validate session with auth microservice:', fetchError)
        // Fall through to anonymous mode
      }
    }

    return null
  } catch (error) {
    console.error('Auth check error:', error)
    return null
  }
} 