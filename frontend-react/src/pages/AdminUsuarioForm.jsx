import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { KEYS, getColeccion, setColeccion, getSesion } from '../datos.js'
import { correoOk, passOk, runOk, textoOk } from '../validaciones.js'
import { AdminLayout } from '../components/AdminMenu.jsx'

export default function AdminUsuarioForm() {
  const { run } = useParams()
  const nav = useNavigate()
  const editando = !!run
  const [roles, setRoles] = useState([])
  const [regiones, setRegiones] = useState([])
  const [comunas, setComunas] = useState([])
  const [form, setForm] = useState({
    run: "", nombre: "", apellidos: "", correo: "", pass: "",
    fecha: "", rol: "", region: "", comuna: "", direccion: "", estado: "Activo"
  })

  useEffect(() => {
    const s = getSesion()
    if (!s || s.rolId !== 1) {
      nav("/admin")
      return
    }
    setRoles(getColeccion(KEYS.roles))
    setRegiones(getColeccion(KEYS.regiones))
    if (run) {
      const u = getColeccion(KEYS.usuarios).find(x => x.run === run)
      if (u) {
        setForm({
          run: u.run, nombre: u.nombre, apellidos: u.apellidos, correo: u.correo,
          pass: u.password, fecha: u.fechaNacimiento || "", rol: u.rolId,
          region: u.regionId, comuna: u.comunaId, direccion: u.direccion, estado: u.estado
        })
      }
    }
  }, [run])

  useEffect(() => {
    if (!form.region) {
      setComunas([])
      return
    }
    setComunas(getColeccion(KEYS.comunas).filter(c => c.regionId === Number(form.region)))
  }, [form.region])

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function guardar(e) {
    e.preventDefault()
    if (!runOk(form.run) || !textoOk(form.nombre, 50) || !textoOk(form.apellidos, 100)) {
      alert("Revisa run, nombre y apellidos")
      return
    }
    if (!correoOk(form.correo) || !passOk(form.pass)) {
      alert("Revisa correo y contrasena")
      return
    }
    if (!form.rol || !form.region || !form.comuna || !textoOk(form.direccion, 300)) {
      alert("Faltan rol, region, comuna o direccion")
      return
    }

    const todos = getColeccion(KEYS.usuarios)
    if (!editando && todos.some(u => u.run === form.run.toUpperCase().trim())) {
      alert("Ese run ya existe")
      return
    }

    const user = {
      run: form.run.toUpperCase().trim(),
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: form.correo.trim(),
      password: form.pass,
      fechaNacimiento: form.fecha || "",
      rolId: Number(form.rol),
      regionId: Number(form.region),
      comunaId: Number(form.comuna),
      direccion: form.direccion.trim(),
      estado: form.estado
    }

    if (editando) {
      setColeccion(KEYS.usuarios, todos.map(u => u.run === run ? user : u))
    } else {
      todos.push(user)
      setColeccion(KEYS.usuarios, todos)
    }
    alert("Usuario guardado")
    nav("/admin/usuarios")
  }

  return (
    <AdminLayout>
      <h1 className="section-title">{editando ? "Editar usuario" : "Nuevo usuario"}</h1>
      <form onSubmit={guardar} className="bg-ff-panel rounded p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">RUN</label>
            <input name="run" className="form-control" value={form.run} onChange={cambiar} readOnly={editando} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha nacimiento</label>
            <input name="fecha" type="date" className="form-control" value={form.fecha} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input name="nombre" className="form-control" value={form.nombre} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellidos</label>
            <input name="apellidos" className="form-control" value={form.apellidos} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input name="correo" className="form-control" value={form.correo} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contrasena</label>
            <input name="pass" className="form-control" value={form.pass} onChange={cambiar} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Rol</label>
            <select name="rol" className="form-select" value={form.rol} onChange={cambiar}>
              <option value="">Seleccione...</option>
              {roles.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Region</label>
            <select name="region" className="form-select" value={form.region} onChange={cambiar}>
              <option value="">Seleccione...</option>
              {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Comuna</label>
            <select name="comuna" className="form-select" value={form.comuna} onChange={cambiar}>
              <option value="">Seleccione...</option>
              {comunas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-8">
            <label className="form-label">Direccion</label>
            <input name="direccion" className="form-control" value={form.direccion} onChange={cambiar} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Estado</label>
            <select name="estado" className="form-select" value={form.estado} onChange={cambiar}>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-accent">Guardar</button>
          <Link to="/admin/usuarios" className="btn btn-outline-accent">Volver</Link>
        </div>
      </form>
    </AdminLayout>
  )
}
