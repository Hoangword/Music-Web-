// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom'
import { MusicPlayerProvider } from './components/MusicPlayerContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <MusicPlayerProvider>
      <App />
    </MusicPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
