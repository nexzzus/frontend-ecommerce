import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Layout from "./layout/Layout.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";
import Home from "./layout/Home.jsx";
import {useAuthStore} from "./store/authStore.js";
import {useEffect} from "react";

function App() {
    const initAuth = useAuthStore(state => state.initAuth)
    const user = useAuthStore(state => state.user)

    useEffect(() => {
        initAuth()
    }, [])

    return (
        <>
            <BrowserRouter>
                <SidebarProvider>
                    <Routes>
                        <Route
                            path={"/auth/login"}
                            element={user ? <Navigate to={"/app/users"} replace/> : <Home/> }
                                />
                        <Route path={"/app/*"} element={<Layout/>}/>
                    </Routes>
                </SidebarProvider>
            </BrowserRouter>
        </>
    )
}

export default App