import { API_BASE_URL } from '@/lib/config'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '@/lib/api/tokenStorage'

/**
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`
  const headers = new Headers(options.headers)

  if (
    !headers.has('Content-Type') &&
    options.body &&
    typeof options.body === 'string'
  ) {
    headers.set('Content-Type', 'application/json')
  }

  const access = getAccessToken()
  if (access) {
    headers.set('Authorization', `Bearer ${access}`)
  }

  let response = await fetch(url, { ...options, headers })

  if (response.status === 401 && getRefreshToken()) {
    const newAccess = await tryRefreshAccess()
    if (newAccess) {
      headers.set('Authorization', `Bearer ${newAccess}`)
      response = await fetch(url, { ...options, headers })
    }
  }

  return response
}

/** @returns {Promise<string | null>} */
async function tryRefreshAccess() {
  const refresh = getRefreshToken()
  if (!refresh) return null

  const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  if (!res.ok) {
    clearTokens()
    return null
  }

  const data = await res.json()
  if (data?.access) {
    setAccessToken(data.access)
    return data.access
  }

  clearTokens()
  return null
}
