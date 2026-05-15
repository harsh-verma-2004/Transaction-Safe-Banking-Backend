/** @typedef {'light' | 'dark' | 'system'} ThemePreference */

export const THEME_STORAGE_KEY = 'banking-theme'

/** @returns {ThemePreference} */
export function readStoredTheme() {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') {
      return raw
    }
  } catch {
    /* ignore */
  }
  return 'system'
}

/** @param {ThemePreference} theme */
export function writeStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

/** @returns {boolean} */
export function prefersDarkScheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * @param {ThemePreference} theme
 * @returns {boolean}
 */
export function resolveDarkClass(theme) {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return prefersDarkScheme()
}
