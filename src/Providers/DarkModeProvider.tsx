import React, { useState, useEffect, useCallback } from 'react'
import { DarkModeContext } from '../contexts'
import { DarkModeProp } from '../models/Props'

const DarkModeProvider: React.FC<DarkModeProp> = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "object") {
            // Check local storage for stored theme
            const storedTheme = localStorage.getItem('theme')
            if (storedTheme) {
                return storedTheme
            }

            // Check media query for system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            if (prefersDark) {
                return 'dark'
            }

            return 'light'
        } else {
            return 'light'
        }
    })

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }, [theme])

    useEffect(() => {
        // Update document element's data-theme attribute
        document.documentElement.setAttribute('data-theme', theme)

        // Update local storage
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <DarkModeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeProvider
