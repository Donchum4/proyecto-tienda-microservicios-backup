import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Detalle from './pages/Detalle.jsx'
import { initDatos } from './datos.js'

export default function App() {
  useEffect(() => {
    initDatos()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:codigo" element={<Detalle />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
