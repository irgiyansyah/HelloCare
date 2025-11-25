import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Import Provider Context
import { HelloProvider } from './context/HelloContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelloProvider>
        <App />
      </HelloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)