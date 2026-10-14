import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KEYS, getColeccion } from '../datos.js'
import { correoOk, passOk } from '../validaciones.js'

export default function Login() {
  const [correo, setCorreo] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const nav = useNavigate()

  function entrar(e) {
    e.preventDefault()
    setError("")

    if (!correoOk(correo) || !passOk(pass)) {
      setError("Revisa el correo o la contrasena")
      return
    }

    const user = getColeccion(KEYS.usuarios).find(
      u => u.correo.toLowerCase() === correo.toLowerCase() && u.password === pass
    )

    if (!user) {
      setError("El correo o la contrasena no coinciden")
      return
    }

    if (user.estado === "Inactivo") {
      setError("Tu cuenta esta deshabilitada, habla con un admin")
      return
    }

    localStorage.setItem(KEYS.sesion, JSON.stringify({
      run: user.run,
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      rolId: user.rolId
    }))
    window.dispatchEvent(new Event("sesion-cambio"))

    if (user.rolId === 1 || user.rolId === 2) nav("/admin")
    else nav("/")
  }

  return (
    <section className="container py-5 min-vh-70 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="auth-card p-4 p-md-5 text-center">
            <img src="/img/logo.svg" alt="FreshFits" height="70" className="mb-3" />
            <h1 className="h3 mb-4">Iniciar sesion</h1>
            <form onSubmit={entrar} className="text-start">
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  maxLength="100"
                  placeholder="usuario@gmail.com"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Contrasena</label>
                <input
                  type="password"
                  className="form-control"
                  maxLength="10"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" className="btn btn-accent w-100">Iniciar sesion</button>
            </form>
            <p className="mt-4 mb-0 small text-muted">
              No tienes cuenta? <Link to="/registro">Registrate aqui</Link>
            </p>
            <p className="mt-2 mb-0 small text-muted">admin@gmail.com / admin123</p>
          </div>
        </div>
      </div>
    </section>
  )
}
