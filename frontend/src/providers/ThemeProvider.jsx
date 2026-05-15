import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/providers/theme-context'
import {
  readStoredTheme,
  resolveDarkClass,
  THEME_STORAGE_KEY,
  writeStoredTheme,
} from '@/lib/theme/themeStorage'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() =>
    typeof window === 'undefined' ? 'system' : readStoredTheme(),
  )

  const setTheme = useCallback((next) => {
    setThemeState(next)
    writeStoredTheme(next)
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const order = /** @type {const} */ (['system', 'light', 'dark'])
      const i = order.indexOf(prev)
      const next = order[(i + 1) % order.length]
      writeStoredTheme(next)
      return next
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolveDarkClass(theme))
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return undefined

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      document.documentElement.classList.toggle(
        'dark',
        resolveDarkClass('system'),
      )
    }

    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [theme])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== THEME_STORAGE_KEY || e.newValue == null) return
      if (
        e.newValue === 'light' ||
        e.newValue === 'dark' ||
        e.newValue === 'system'
      ) {
        setThemeState(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      cycleTheme,
    }),
    [theme, setTheme, cycleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
