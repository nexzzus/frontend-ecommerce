import React, {Suspense, useEffect, lazy} from 'react'
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../layout/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import {useSidebar} from '../context/SidebarContextCreate'
import {useAuth} from "../context/AuthContextCreate.js";

const Page404 = lazy(() => import('../pages/Page404.jsx'))

function Layout() {
    const {isSidebarOpen, closeSidebar} = useSidebar()
    let location = useLocation()
    const {isAuthenticated} = useAuth()
    console.log("isAuthenticated", isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />
    }

    useEffect(() => {
        closeSidebar()
    }, [location, closeSidebar])

    return (
        <div
            className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
        >
            <Sidebar/>

            <div className="flex flex-col flex-1 w-full">
                <Header/>
                <Main>
                    <Suspense fallback={<ThemedSuspense/>}>
                        <Routes>
                            {routes.map((route, i) => {
                                return route.component ? (
                                    <Route
                                        key={i}
                                        path={route.path}
                                        element={<route.component/>}
                                    />
                                ) : null
                            })}
                            <Route path={"*"} element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </Main>
            </div>
        </div>
    )
}

export default Layout
