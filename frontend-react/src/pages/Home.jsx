import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { KEYS, getColeccion, setColeccion } from '../datos.js'
import Tarjeta from '../components/Tarjeta.jsx'

export default function Home() {
  const [destacados, setDestacados] = useState([])
  const [noticias, setNoticias] = useState([])
  const [foto, setFoto] = useState(0)
  const filaRef = useRef(null)

  const fotos = [
    "/img/banner-principal.png",
    "/img/banner2.png",
    "/img/banner3.png",
    "/img/carrusel1.png"
  ]

  useEffect(() => {
    const prods = getColeccion(KEYS.productos).filter(p => p.estado === "Activo" && p.destacado)
    setDestacados(prods)
    setNoticias(getColeccion(KEYS.blog).slice(0, 3))
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setFoto(f => (f + 1) % fotos.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  function agregar(codigo) {
    const prods = getColeccion(KEYS.productos)
    const prod = prods.find(p => p.codigo === codigo)
    if (!prod || prod.stock <= 0) return
    const carrito = getColeccion(KEYS.carrito)
    const item = carrito.find(i => i.codigo === codigo)
    const actual = item ? item.cantidad : 0
    if (actual + 1 > prod.stock) {
      alert("Solo hay " + prod.stock + " unidades de " + prod.nombre)
      return
    }
    if (item) item.cantidad += 1
    else carrito.push({ codigo, cantidad: 1 })
    setColeccion(KEYS.carrito, carrito)
    window.dispatchEvent(new Event("carrito-cambio"))
  }

  function mover(dir) {
    if (filaRef.current) {
      filaRef.current.scrollBy({ left: dir * filaRef.current.clientWidth * 0.8, behavior: "smooth" })
    }
  }

  return (
    <>
      <section className="hero-intro">
        <div className="hero-intro-bg">
          {fotos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="FreshFits"
              className="hero-intro-img"
              style={{ opacity: i === foto ? 1 : 0, transition: "opacity 0.8s" }}
            />
          ))}
          <div className="hero-intro-overlay"></div>
        </div>
        <div className="hero-intro-content">
          <h1 className="hero-intro-title">FRESH <span>FITS</span></h1>
          <div className="d-flex gap-2 justify-content-center mt-3">
            <button className="btn btn-sm btn-light" onClick={() => setFoto((foto - 1 + fotos.length) % fotos.length)}>{"<"}</button>
            <button className="btn btn-sm btn-light" onClick={() => setFoto((foto + 1) % fotos.length)}>{">"}</button>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-2">
            {fotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setFoto(i)}
                style={{
                  width: 10, height: 10, borderRadius: "50%", border: "none",
                  background: i === foto ? "#fff" : "rgba(255,255,255,0.4)"
                }}
              />
            ))}
          </div>
        </div>
        <div className="scroll-indicator" id="scrollIndicator">
          <span className="scroll-text">scroll</span>
          <i className="bi bi-chevron-double-down"></i>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title mb-0">Productos destacados</h2>
          <Link to="/productos" className="btn btn-outline-accent btn-sm">Ver todos <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div className="position-relative">
          <button className="btn btn-accent carrusel-flecha carrusel-flecha-izq" onClick={() => mover(-1)} type="button">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="btn btn-accent carrusel-flecha carrusel-flecha-der" onClick={() => mover(1)} type="button">
            <i className="bi bi-chevron-right"></i>
          </button>
          <div className="row g-4 carrusel-productos" ref={filaRef}>
            {destacados.map(p => <Tarjeta key={p.codigo} p={p} onAgregar={agregar} />)}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title mb-0">Ultimas noticias</h2>
          <Link to="/blog" className="btn btn-outline-accent btn-sm">Ver blog <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div className="row g-4">
          {noticias.map(n => (
            <div className="col-md-6 col-lg-4" key={n.id}>
              <article className="card h-100 card-ff-hover">
                <img src={"/img/" + n.imagen} className="card-img-top" alt={n.titulo} />
                <div className="card-body d-flex flex-column">
                  <p className="small text-muted mb-1">{n.fecha}</p>
                  <h3 className="h6">{n.titulo}</h3>
                  <p className="small text-muted flex-grow-1">{n.resumen}</p>
                  <Link to={"/blog/" + n.slug} className="btn btn-outline-accent btn-sm align-self-start">Ver noticia</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
