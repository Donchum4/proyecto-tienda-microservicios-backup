import { Link } from 'react-router-dom'

export function AdminMenu() {
  return (
    <>
      <div className="admin-sidebar d-none d-lg-block">
        <div className="d-flex flex-column gap-1">
          <Link to="/admin" className="nav-link px-3 py-2">Panel principal</Link>
          <Link to="/admin/productos" className="nav-link px-3 py-2">Productos</Link>
          <Link to="/admin/usuarios" className="nav-link px-3 py-2">Usuarios</Link>
          <Link to="/" className="nav-link px-3 py-2">Volver a la tienda</Link>
        </div>
      </div>
    </>
  )
}

export function AdminLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-xl-2 d-none d-lg-block px-0">
          <AdminMenu />
        </div>
        <div className="col-lg-9 col-xl-10 p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
