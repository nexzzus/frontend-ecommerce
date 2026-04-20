import React from 'react'
import { ThemeContext } from './ThemeContextCreate'

export const useTheme = () => {
    const context = React.useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
