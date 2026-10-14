import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { KEYS, getColeccion, setColeccion, getSesion } from '../datos.js'
import { AdminLayout } from '../components/AdminMenu.jsx'

export default function AdminProductoForm() {
  const { codigo } = useParams()
  const nav = useNavigate()
  const editando = !!codigo
  const [cats, setCats] = useState([])
  const [form, setForm] = useState({
    codigo: "", nombre: "", descripcion: "", precio: "",
    stock: "", stockCritico: "", categoriaId: "", imagen: "", estado: "Activo", destacado: false
  })

  useEffect(() => {
    const s = getSesion()
    if (!s || s.rolId !== 1) {
      alert("Solo el admin puede editar productos")
      nav("/admin")
      return
    }
    setCats(getColeccion(KEYS.categorias))
    if (codigo) {
      const p = getColeccion(KEYS.productos).find(x => x.codigo === codigo)
      if (p) {
        setForm({
          codigo: p.codigo, nombre: p.nombre, descripcion: p.descripcion || "",
          precio: p.precio, stock: p.stock, stockCritico: p.stockCritico ?? "",
          categoriaId: p.categoriaId, imagen: p.imagen || "", estado: p.estado, destacado: !!p.destacado
        })
      }
    }
  }, [codigo])

  function cambiar(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

  function guardar(e) {
    e.preventDefault()
    if (form.codigo.trim().length < 3 || !form.nombre.trim() || !form.categoriaId) {
      alert("Completa codigo, nombre y categoria")
      return
    }
    if (Number(form.precio) < 0 || Number(form.stock) < 0) {
      alert("Precio y stock no pueden ser negativos")
      return
    }
    const todos = getColeccion(KEYS.productos)
    if (!editando && todos.some(p => p.codigo === form.codigo.trim())) {
      alert("Ese codigo ya existe")
      return
    }

    const prod = {
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: form.stockCritico === "" ? null : Number(form.stockCritico),
      categoriaId: Number(form.categoriaId),
      imagen: form.imagen.trim() || "logo.svg",
      estado: form.estado,
      destacado: form.destacado
    }

    if (editando) {
      setColeccion(KEYS.productos, todos.map(p => p.codigo === codigo ? prod : p))
    } else {
      todos.push(prod)
      setColeccion(KEYS.productos, todos)
    }
    alert("Producto guardado")
    nav("/admin/productos")
  }

  return (
    <AdminLayout>
      <h1 className="section-title">{editando ? "Editar producto" : "Nuevo producto"}</h1>
      <form onSubmit={guardar} className="bg-ff-panel rounded p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Codigo</label>
            <input name="codigo" className="form-control" value={form.codigo} onChange={cambiar} readOnly={editando} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input name="nombre" className="form-control" maxLength="100" value={form.nombre} onChange={cambiar} />
          </div>
          <div className="col-12">
            <label className="form-label">Descripcion</label>
            <textarea name="descripcion" className="form-control" rows="2" value={form.descripcion} onChange={cambiar}></textarea>
          </div>
          <div className="col-md-4">
            <label className="form-label">Precio</label>
            <input name="precio" type="number" className="form-control" value={form.precio} onChange={cambiar} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Stock</label>
            <input name="stock" type="number" className="form-control" value={form.stock} onChange={cambiar} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Stock critico</label>
            <input name="stockCritico" type="number" className="form-control" value={form.stockCritico} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Categoria</label>
            <select name="categoriaId" className="form-select" value={form.categoriaId} onChange={cambiar}>
              <option value="">Seleccione una categoria</option>
              {cats.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Imagen (ruta dentro de /img)</label>
            <input name="imagen" className="form-control" value={form.imagen} onChange={cambiar} placeholder="productos/polera-basica.webp" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Estado</label>
            <select name="estado" className="form-select" value={form.estado} onChange={cambiar}>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check">
              <input name="destacado" type="checkbox" className="form-check-input" checked={form.destacado} onChange={cambiar} />
              <label className="form-check-label">Destacado en el home</label>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-accent">Guardar</button>
          <Link to="/admin/productos" className="btn btn-outline-accent">Volver</Link>
        </div>
      </form>
    </AdminLayout>
  )
}
