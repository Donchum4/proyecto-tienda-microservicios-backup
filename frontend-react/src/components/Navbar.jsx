import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { KEYS, getColeccion, getSesion } from '../datos.js'

export default function Navbar() {
  const [sesion, setSesion] = useState(null)
  const [cant, setCant] = useState(0)
  const nav = useNavigate()
  const ruta = useLocation().pathname

  function refrescar() {
    setSesion(getSesion())
    const carrito = getColeccion(KEYS.carrito)
    let total = 0
    carrito.forEach(i => total += i.cantidad)
    setCant(total)
  }

  useEffect(() => {
    refrescar()
    window.addEventListener("carrito-cambio", refrescar)
    window.addEventListener("sesion-cambio", refrescar)
    return () => {
      window.removeEventListener("carrito-cambio", refrescar)
      window.removeEventListener("sesion-cambio", refrescar)
    }
  }, [ruta])

  function salir() {
    localStorage.removeItem(KEYS.sesion)
    window.dispatchEvent(new Event("sesion-cambio"))
    nav("/login")
  }

  const esAdmin = sesion && (sesion.rolId === 1 || sesion.rolId === 2)

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light ff-navbar sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span className="brand-text">FRESH FITS</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className={"nav-link" + (ruta === "/" ? " active" : "")} to="/">Inicio</Link></li>
              <li className="nav-item"><Link className={"nav-link" + (ruta.startsWith("/productos") ? " active" : "")} to="/productos">Tienda</Link></li>
              <li className="nav-item"><Link className={"nav-link" + (ruta.startsWith("/blog") ? " active" : "")} to="/blog">Blog</Link></li>
              <li className="nav-item"><Link className={"nav-link" + (ruta === "/nosotros" ? " active" : "")} to="/nosotros">Nosotros</Link></li>
              <li className="nav-item"><Link className={"nav-link" + (ruta === "/contacto" ? " active" : "")} to="/contacto">Contacto</Link></li>
              {esAdmin && (
                <li className="nav-item"><Link className="nav-link" to="/admin"><i className="bi bi-speedometer2"></i> Administracion</Link></li>
              )}
            </ul>
            <ul className="navbar-nav align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/carrito" title="Carrito">
                  <i className="bi bi-bag fs-5"></i>
                  {cant > 0 && (
                    <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">{cant}</span>
                  )}
                </Link>
              </li>
              {!sesion ? (
                <li className="nav-item">
                  <div className="d-flex align-items-center gap-2">
                    <Link className="btn btn-outline-dark btn-sm" to="/login">Iniciar sesion</Link>
                    <Link className="btn btn-dark btn-sm" to="/registro">Registrarse</Link>
                  </div>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle fs-5"></i> {sesion.nombre}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#" onClick={salir}><i className="bi bi-box-arrow-right"></i> Cerrar sesion</a></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
