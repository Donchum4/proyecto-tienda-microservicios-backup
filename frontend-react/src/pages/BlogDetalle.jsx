import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { KEYS, getColeccion } from '../datos.js'

const TEXTOS = {
  "detalle-1": {
    titulo: "FreshFits abre sus puertas",
    texto: "Partimos como un proyecto de barrio y hoy somos una tienda online completa. La idea siempre fue la misma: ropa comoda, precios justos y una pagina facil de usar. Gracias a todos los que nos apañaron desde el dia uno."
  },
  "detalle-2": {
    titulo: "Los lanzamientos mas esperados de la temporada",
    texto: "Se vienen polerones oversized, cargos y zapatillas urbanas. Estuvimos mirando lo que se usa afuera y lo adaptamos a lo que nos gusta aca. Atentos al catalogo que vamos a ir subiendo cosas nuevas."
  },
  "detalle-3": {
    titulo: "5 consejos para un look streetwear",
    texto: "1. Parte por lo basico: una buena polera. 2. Suma una capa arriba (poleron o camisa). 3. Que el calzado combine. 4. Un accesorio basta (gorra). 5. Usa tu talla, ni muy suelto ni muy apretado."
  }
}

export default function BlogDetalle() {
  const { slug } = useParams()
  const [n, setN] = useState(null)

  useEffect(() => {
    setN(getColeccion(KEYS.blog).find(x => x.slug === slug) || null)
  }, [slug])

  if (!n) {
    return (
      <section className="container py-5 text-center">
        <p className="text-muted">Noticia no encontrada.</p>
        <Link to="/blog" className="btn btn-accent">Volver al blog</Link>
      </section>
    )
  }

  const extra = TEXTOS[n.slug]

  return (
    <section className="container py-5">
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/blog">Blog</Link></li>
          <li className="breadcrumb-item active">{n.titulo}</li>
        </ol>
      </nav>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <p className="small text-muted">{n.fecha}</p>
          <h1 className="h3">{n.titulo}</h1>
          <img src={"/img/" + n.imagen} className="img-fluid rounded my-3" alt={n.titulo} />
          <p>{n.resumen}</p>
          {extra && <p className="text-muted">{extra.texto}</p>}
          <Link to="/blog" className="btn btn-outline-accent mt-3">Volver</Link>
        </div>
      </div>
    </section>
  )
}
