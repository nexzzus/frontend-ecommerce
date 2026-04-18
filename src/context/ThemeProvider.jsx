import React, { useState, useEffect, useCallback } from 'react'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        // Load theme from localStorage on initial render
        const savedTheme = localStorage.getItem('theme')
        return savedTheme === 'dark'
    })

    // Update document class when theme changes
    useEffect(() => {
        const html = document.documentElement
        if (isDark) {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    const toggleTheme = useCallback(() => {
        setIsDark(prev => !prev)
    }, [])

    const value = {
        isDark,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
