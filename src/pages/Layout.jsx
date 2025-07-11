import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FavoriteDropdown from '../components/FavoriteDropdown'
import ScrollToTop from '../components/ScrollToTop'
import Home from './Home.jsx'
import Footer from '../components/Footer'

export default function Layout() {
    return (
        <>
            <Navbar />
            <FavoriteDropdown />
            <ScrollToTop />
            <div className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:type/:uid" element={<Single />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}