import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from "./layout/Layout.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";
import Home from "./layout/Home.jsx";
import {useAuthStore} from "./store/authStore.js";
import {useEffect} from "react";

function App() {
    const initAuth = useAuthStore(state => state.initAuth)

    useEffect(() => {
        initAuth()
    }, [])

    return (
        <>
            <BrowserRouter>
                <SidebarProvider>
                    <Routes>
                        <Route path={"/auth/login"} element={<Home/>}/>
                        <Route path={"/app/*"} element={<Layout/>}/>
                    </Routes>
                </SidebarProvider>
            </BrowserRouter>
        </>
    )
}

export default App