import React from 'react'
import { useSidebar} from '../context/SidebarContextCreate'
import {IoMenuSharp, IoSunny} from "react-icons/io5";
import {IoIosMoon, IoMdExit} from "react-icons/io";
import { useTheme } from '../context/useTheme'

function Header() {
    const { theme, toggleTheme } = useTheme()
    const { toggleSidebar } = useSidebar()

    return (
        <header className="z-40 py-4 bg-white shadow-md dark:bg-gray-800 h-16 w-full">
            <div className="flex items-center justify-between h-full w-full px-4 sm:px-6 lg:px-8 text-purple-600 dark:text-purple-300">
                {/* <!-- Mobile hamburger --> */}
                <button
                    className="p-1 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    {/*<MenuIcon className="w-6 h-6" aria-hidden="true" />*/}
                    <IoMenuSharp className={"w-6 h-6"} aria-hidden={"true"} />
                </button>
                <ul className="flex ml-auto shrink-0 space-x-4 sm:space-x-6">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                        <button
                            className="p-1 rounded-md focus:outline-none focus:shadow-outline-purple transition-colors hover:text-purple-700 dark:hover:text-purple-200"
                            onClick={toggleTheme}
                            aria-label="Toggle color mode"
                        >
                            {theme === "dark" ? (
                                <IoSunny className={"w-5 h-5"} aria-hidden={"true"}/>
                            ) : (
                                <IoIosMoon className={"w-5 h-5"} aria-hidden={"true"}/>
                            )}
                        </button>
                    </li>

                    {/* <!-- Profile menu --> */}
                    <li className="flex items-center">
                        <button className="p-1 rounded-md focus:outline-none focus:shadow-outline-purple transition-colors hover:text-purple-700 dark:hover:text-purple-200">
                            <IoMdExit className={"w-5 h-5"} aria-hidden={"true"}/>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
