import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Windmill} from "@windmill/react-ui"
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <Windmill usePreferences={false} theme={{mode: 'light'}}>
                <App/>
            </Windmill>
        </ThemeProvider>
    </StrictMode>,
)