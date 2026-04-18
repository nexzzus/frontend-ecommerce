import React from 'react'
import { useSidebar} from '../context/SidebarContextCreate'
import { Input } from '@windmill/react-ui'
import { useTheme } from '../context/ThemeContext'
import {FiSearch} from "react-icons/fi";
import {IoMenuSharp, IoSunny} from "react-icons/io5";
import {IoIosMoon, IoMdExit} from "react-icons/io";

function Header() {
    const { isDark, toggleTheme } = useTheme()
    const { toggleSidebar } = useSidebar()

    return (
        <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800 h-16">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                {/* <!-- Mobile hamburger --> */}
                <button
                    className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    {/*<MenuIcon className="w-6 h-6" aria-hidden="true" />*/}
                    <IoMenuSharp className={"w-6 h-6"} aria-hidden={"true"} />
                </button>
                {/*/!* <!-- Search input --> *!/*/}
                {/*<div className="flex justify-center flex-1 lg:mr-32">*/}
                {/*    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">*/}
                {/*        <div className="absolute inset-y-0 flex items-center pl-2">*/}
                {/*            /!*<SearchIcon className="w-4 h-4" aria-hidden="true" />*!/*/}
                {/*            <FiSearch className={"w-4 h-4"} aria-hidden={"true"}/>*/}
                {/*        </div>*/}
                {/*        <Input*/}
                {/*            className="pl-8 text-gray-700 border-primary"*/}
                {/*            placeholder="Search for projects"*/}
                {/*            aria-label="Search"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <ul className="flex ml-auto shrink-0 space-x-6">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                        <button
                            className="rounded-md focus:outline-none focus:shadow-outline-purple"
                            onClick={toggleTheme}
                            aria-label="Toggle color mode"
                        >
                            {isDark ? (
                                <IoSunny className={"w-5 h-5"} aria-hidden={"true"}/>
                            ) : (
                                <IoIosMoon className={"w-5 h-5"} aria-hidden={"true"}/>
                            )}
                        </button>
                    </li>

                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                        <IoMdExit className={"w-5 h-5"} aria-hidden={"true"}/>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
