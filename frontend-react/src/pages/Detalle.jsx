import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { KEYS, getColeccion, setColeccion, plata, imgProducto, nombreCategoria } from '../datos.js'

export default function Detalle() {
  const { codigo } = useParams()
  const [p, setP] = useState(null)
  const [cant, setCant] = useState(1)

  useEffect(() => {
    const prod = getColeccion(KEYS.productos).find(x => x.codigo === codigo)
    setP(prod || null)
    setCant(1)
  }, [codigo])

  if (!p) {
    return (
      <section className="container py-5">
        <p className="text-muted text-center">Prenda no encontrada.</p>
        <div className="text-center"><Link to="/productos" className="btn btn-accent">Volver al catalogo</Link></div>
      </section>
    )
  }

  const agotado = p.stock <= 0

  function agregar() {
    const carrito = getColeccion(KEYS.carrito)
    const item = carrito.find(i => i.codigo === p.codigo)
    const actual = item ? item.cantidad : 0
    if (actual + cant > p.stock) {
      alert("Solo hay " + p.stock + " unidades disponibles")
      return
    }
    if (item) item.cantidad += cant
    else carrito.push({ codigo: p.codigo, cantidad: cant })
    setColeccion(KEYS.carrito, carrito)
    window.dispatchEvent(new Event("carrito-cambio"))
    alert(p.nombre + " se agrego al carrito")
  }

  return (
    <section className="container py-5">
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Tienda</Link></li>
          <li className="breadcrumb-item active">Detalle</li>
        </ol>
      </nav>
      <div className="row g-4">
        <div className="col-md-5">
          <img src={imgProducto(p)} className="img-fluid rounded bg-ff-panel p-2" alt={p.nombre} />
        </div>
        <div className="col-md-7">
          <span className="badge bg-secondary mb-2">{nombreCategoria(p.categoriaId)}</span>
          <h1 className="h3">{p.nombre}</h1>
          <p className="text-muted">{p.descripcion || "Sin descripcion disponible."}</p>
          <p className="display-6">{plata(p.precio)}</p>
          <p>{agotado ? <span className="badge bg-danger">Sin stock</span> : <span className="badge bg-success">Stock disponible: {p.stock}</span>}</p>
          <div className="d-flex align-items-center gap-3 my-3">
            <label className="form-label mb-0">Cantidad</label>
            <input
              type="number"
              className="form-control"
              style={{ width: 90 }}
              value={cant}
              min={1}
              max={Math.max(p.stock, 1)}
              disabled={agotado}
              onChange={e => setCant(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <button className="btn btn-accent btn-lg" disabled={agotado} onClick={agregar}>
            <i className="bi bi-bag-plus"></i> Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  )
}
