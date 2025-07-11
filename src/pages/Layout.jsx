// src/pages/Layout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Home from './Home.jsx';
import Detail from './Detail.jsx';   // Importamos el componente de detalle
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div className="star-wars-app d-flex flex-column min-vh-100">
      <Navbar />
      <ScrollToTop />

      <main className="star-wars-container flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:uid" element={<Detail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
