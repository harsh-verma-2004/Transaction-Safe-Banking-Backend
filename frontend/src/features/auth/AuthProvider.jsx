import {
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react'
import { AuthContext } from '@/features/auth/auth-context'
import { clearTokens, getAccessToken } from '@/lib/api/tokenStorage'
import { decodeJwtPayload } from '@/lib/api/jwt'
import { loginWithPassword } from '@/features/auth/authApi'

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('banking-auth-changed', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('banking-auth-changed', callback)
  }
}

function getSnapshot() {
  return getAccessToken()
}

function getServerSnapshot() {
  return null
}

function notifyAuthChanged() {
  window.dispatchEvent(new Event('banking-auth-changed'))
}

export function AuthProvider({ children }) {
  const accessToken = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const isAuthenticated = Boolean(accessToken)

  const claims = useMemo(() => {
    if (!accessToken) return null
    return decodeJwtPayload(accessToken)
  }, [accessToken])

  const login = useCallback(async (username, password) => {
    await loginWithPassword(username, password)
    notifyAuthChanged()
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    notifyAuthChanged()
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated,
      accessToken,
      claims,
      login,
      logout,
    }),
    [isAuthenticated, accessToken, claims, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
