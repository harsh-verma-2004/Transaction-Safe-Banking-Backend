const ACCESS_KEY = 'banking_access_token'
const REFRESH_KEY = 'banking_refresh_token'

/** @returns {string | null} */
export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_KEY)
}

/** @returns {string | null} */
export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_KEY)
}

/** @param {{ access: string, refresh: string }} tokens */
export function setTokens({ access, refresh }) {
  sessionStorage.setItem(ACCESS_KEY, access)
  sessionStorage.setItem(REFRESH_KEY, refresh)
}

/** @param {{ access: string }} partial */
export function setAccessToken(access) {
  sessionStorage.setItem(ACCESS_KEY, access)
}

export function clearTokens() {
  sessionStorage.removeItem(ACCESS_KEY)
  sessionStorage.removeItem(REFRESH_KEY)
}
