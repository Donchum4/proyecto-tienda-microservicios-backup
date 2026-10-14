import { Link } from 'react-router-dom'
import { KEYS, getColeccion } from '../datos.js'
import { useEffect, useState } from 'react'

export default function Blog() {
  const [noticias, setNoticias] = useState([])

  useEffect(() => {
    setNoticias(getColeccion(KEYS.blog))
  }, [])

  return (
    <section className="container py-5">
      <h1 className="section-title">Blog de Moda</h1>
      <p className="text-muted mb-4">Novedades, tendencias y consejos de estilo para vestir fresh todos los dias.</p>
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
  )
}
