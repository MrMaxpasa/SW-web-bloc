import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import Layout from './pages/Layout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <FavoritesProvider>
            <Layout />
        </FavoritesProvider>
    </BrowserRouter>
)
