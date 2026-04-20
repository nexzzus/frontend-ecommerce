import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react'
import { ThemeContext } from './ThemeContextCreate'

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(key) {
    const userPreference =
        !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    const [theme, setTheme] = useState(
        // use stored theme; fallback to user preference
        localStorage.getItem(key) || (userPreference ? 'dark' : 'light')
    )

    // update stored theme
    useEffect(() => {
        localStorage.setItem(key, theme)
    }, [theme, key])

    return [theme, setTheme]
}

// create context provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useStorageTheme('theme')

    // update root element class on theme change
    useLayoutEffect(() => {
        const html = document.documentElement
        if (theme === 'dark') {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }, [theme, setTheme])

    const value = useMemo(
        () => ({
            theme,
            toggleTheme,
        }),
        [theme, toggleTheme]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
