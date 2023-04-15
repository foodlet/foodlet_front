import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { RecipesProvider } from './contexts/RecipesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </AuthProvider>
  </BrowserRouter>
)
