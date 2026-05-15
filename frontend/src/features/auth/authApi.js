import { API_BASE_URL } from '@/lib/config'
import { setTokens } from '@/lib/api/tokenStorage'

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Response>}
 */
export function requestTokenPair(username, password) {
  return fetch(`${API_BASE_URL}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<void>}
 */
export async function loginWithPassword(username, password) {
  const res = await requestTokenPair(username, password)
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const detail =
      typeof data?.detail === 'string'
        ? data.detail
        : 'Could not sign in. Check credentials.'
    throw new Error(detail)
  }

  if (!data?.access || !data?.refresh) {
    throw new Error('Unexpected response from server.')
  }

  setTokens({ access: data.access, refresh: data.refresh })
}
