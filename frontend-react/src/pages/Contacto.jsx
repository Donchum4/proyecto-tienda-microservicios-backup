import { useState } from 'react'
import { KEYS, getColeccion, setColeccion } from '../datos.js'
import { correoOk, textoOk } from '../validaciones.js'

export default function Contacto() {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [comentario, setComentario] = useState("")
  const [error, setError] = useState("")

  function enviar(e) {
    e.preventDefault()
    setError("")

    if (!textoOk(nombre, 100)) {
      setError("Pon tu nombre")
      return
    }
    if (!correoOk(correo)) {
      setError("Ese correo no sirve, usa @duoc.cl, @profesor.duoc.cl o @gmail.com")
      return
    }
    if (!textoOk(comentario, 500)) {
      setError("Escribe un comentario")
      return
    }

    const lista = getColeccion(KEYS.contactos)
    lista.push({
      nombre: nombre.trim(),
      correo: correo.trim(),
      comentario: comentario.trim(),
      fecha: new Date().toISOString().slice(0, 10)
    })
    setColeccion(KEYS.contactos, lista)

    alert("Mensaje enviado, gracias por escribirnos")
    setNombre("")
    setCorreo("")
    setComentario("")
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <h1 className="section-title">Contacto</h1>
          <p className="text-muted mb-4">Tienes dudas o comentarios? Escribenos y te responderemos a la brevedad.</p>
          <div className="auth-card p-4 p-md-5">
            <form onSubmit={enviar}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control" maxLength="100" value={nombre} onChange={e => setNombre(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input className="form-control" maxLength="100" placeholder="usuario@gmail.com" value={correo} onChange={e => setCorreo(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="form-label">Comentario</label>
                <textarea className="form-control" rows="5" maxLength="500" value={comentario} onChange={e => setComentario(e.target.value)}></textarea>
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" className="btn btn-accent w-100">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
