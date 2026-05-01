import React from 'react'
import routes from '../../routes/sidebar'
import {NavLink} from 'react-router-dom'
import IconRenderer from './IconRenderer'
import SidebarSubmenu from './SidebarSubmenu'

function SidebarContent() {
    return (
        <div className="py-4 text-gray-500 dark:text-gray-400">
            <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                Nexzus Dashboard
            </a>
            <ul className="mt-6">
                {routes.map((route) =>
                    route.routes ? (
                        <SidebarSubmenu route={route} key={route.name}/>
                    ) : (
                        <li className="relative px-6 py-3" key={route.name}>
                            <NavLink
                                to={route.path}
                                className={({isActive}) =>
                                    `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                                        isActive ? "text-gray-800 dark:text-gray-100" : ""
                                    }`
                                }
                            >
                                {({isActive}) => (
                                    <>
                                        {isActive && (
                                            <span
                                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"></span>
                                        )}
                                        <IconRenderer iconName={route.icon} className="w-5 h-5 mr-4"/>
                                        <span>{route.name}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}

export default SidebarContent
