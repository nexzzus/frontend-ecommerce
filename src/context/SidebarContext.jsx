import React, { useState, useMemo, useCallback } from 'react'
import { SidebarContext } from './SidebarContextCreate'

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev)
    }, [])

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false)
    }, [])

    const value = useMemo(
        () => ({
            isSidebarOpen,
            toggleSidebar,
            closeSidebar,
        }),
        [isSidebarOpen, toggleSidebar, closeSidebar]
    )

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

