import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KEYS, getColeccion, setColeccion, plata, getSesion, nombreCategoria } from '../datos.js'
import { AdminLayout } from '../components/AdminMenu.jsx'

export default function AdminProductos() {
  const nav = useNavigate()
  const [prods, setProds] = useState([])
  const [soloVer, setSoloVer] = useState(false)

  useEffect(() => {
    const s = getSesion()
    if (!s || (s.rolId !== 1 && s.rolId !== 2)) {
      alert("No tienes permiso para ver esto")
      nav("/login")
      return
    }
    setSoloVer(s.rolId === 2)
    setProds(getColeccion(KEYS.productos))
  }, [])

  function eliminar(codigo) {
    if (!confirm("Eliminar este producto? No se puede deshacer")) return
    setColeccion(KEYS.productos, getColeccion(KEYS.productos).filter(p => p.codigo !== codigo))
    setProds(getColeccion(KEYS.productos))
  }

  function ver(p) {
    alert(p.nombre + "\nCodigo: " + p.codigo + "\nPrecio: " + plata(p.precio) + "\nStock: " + p.stock)
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="section-title mb-0">Productos</h1>
        {!soloVer && <Link to="/admin/productos/nuevo" className="btn btn-accent btn-sm">+ Nuevo producto</Link>}
      </div>
      <div className="table-responsive bg-ff-panel rounded p-2">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prods.map(p => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{nombreCategoria(p.categoriaId)}</td>
                <td>{plata(p.precio)}</td>
                <td className={p.stockCritico != null && p.stock <= p.stockCritico ? "stock-critico" : ""}>{p.stock}</td>
                <td><span className={"badge " + (p.estado === "Activo" ? "bg-success" : "bg-secondary")}>{p.estado}</span></td>
                <td className="text-nowrap">
                  <button className="btn btn-sm btn-outline-accent me-1" onClick={() => ver(p)}><i className="bi bi-eye"></i></button>
                  {!soloVer && (
                    <>
                      <Link to={"/admin/productos/" + p.codigo} className="btn btn-sm btn-outline-dark me-1"><i className="bi bi-pencil"></i></Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.codigo)}><i className="bi bi-trash"></i></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
