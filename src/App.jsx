import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from "./layout/Layout.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <SidebarProvider>
                    <Routes>
                        <Route path={"/*"} element={<Layout/>}/>
                    </Routes>
                </SidebarProvider>
            </BrowserRouter>
        </>
    )
}

export default App