import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from "./layout/Layout.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";
import {ThemeProvider} from "./context/ThemeProvider.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <ThemeProvider>
                <SidebarProvider>
                    <Routes>
                        <Route path={"/*"} element={<Layout/>}/>
                    </Routes>
                </SidebarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </>
    )
}

export default App