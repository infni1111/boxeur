import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from './components/AppProvider'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter >
     <AppProvider>
 
        <App />
   
     </AppProvider>

   </BrowserRouter>
  </StrictMode>,
)
