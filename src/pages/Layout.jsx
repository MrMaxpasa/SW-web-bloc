import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import Home from './Home.jsx'
import Single from './Detail.jsx'
import Footer from '../components/Footer'

// Layout con tema Star Wars
export default function Layout() {
  return (
    <div className="star-wars-app d-flex flex-column min-vh-100">
      <Navbar />
      {/* El dropdown de favoritos ya está en el Navbar */}
      <ScrollToTop />

      <main className="star-wars-container flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:uid" element={<Single />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
