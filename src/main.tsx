import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChessProvider } from './context/ChessContext.tsx'
import { ChessEngineProvider } from './context/ChessEngineContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ChessEngineProvider>
      <ChessProvider>
        <App />
      </ChessProvider>
    </ChessEngineProvider>  
  </StrictMode>,
)
