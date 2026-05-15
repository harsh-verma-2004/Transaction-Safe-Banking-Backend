/**
 * Decode JWT payload (no signature verification — display / UX only).
 * @param {string} token
 * @returns {Record<string, unknown> | null}
 */
export function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(base64)
    return JSON.parse(json)
  } catch {
    return null
  }
}
