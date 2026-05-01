import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import IconRenderer from './IconRenderer'
import { FiChevronDown } from 'react-icons/fi'

function SidebarSubmenu({ route }) {
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

    function handleDropdownMenuClick() {
        setIsDropdownMenuOpen(!isDropdownMenuOpen)
    }

    return (
        <li className="relative px-6 py-3" key={route.name}>
            <button
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={handleDropdownMenuClick}
                aria-haspopup="true"
            >
                <span className="inline-flex items-center">
                    <IconRenderer iconName={route.icon} className="w-5 h-5" aria-hidden="true" />
                    <span className="ml-4">{route.name}</span>
                </span>
                <FiChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownMenuOpen ? 'rotate-180' : ''}`} 
                    aria-hidden="true" 
                />
            </button>
            {isDropdownMenuOpen && (
                <ul className="p-2 mt-2 space-y-2 text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900">
                    {route.routes.map((r) => (
                        <li key={r.name}>
                            <Link to={r.path}>{r.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

export default SidebarSubmenu
