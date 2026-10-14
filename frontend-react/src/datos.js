// datos iniciales de la tienda, los mismos que teniamos en el flask
// se guardan en localstorage la primera vez que se abre la pagina

export const KEYS = {
  usuarios: "ff_usuarios",
  productos: "ff_productos",
  categorias: "ff_categorias",
  regiones: "ff_regiones",
  comunas: "ff_comunas",
  roles: "ff_roles",
  carrito: "ff_carrito",
  contactos: "ff_contactos",
  blog: "ff_blog",
  sesion: "ff_sesion"
}

const VERSION = "7"

export function getColeccion(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave)) || []
  } catch {
    return []
  }
}

export function setColeccion(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}

export function plata(valor) {
  return "$" + Number(valor).toLocaleString("es-CL")
}

export function imgProducto(producto) {
  if (!producto.imagen) return "/img/logo.svg"
  return "/img/" + producto.imagen
}

export function initDatos() {
  if (localStorage.getItem("ff_datos_version") !== VERSION) {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
    localStorage.setItem("ff_datos_version", VERSION)
  }

  if (!localStorage.getItem(KEYS.roles)) {
    setColeccion(KEYS.roles, [
      { id: 1, nombre: "Administrador" },
      { id: 2, nombre: "Vendedor" },
      { id: 3, nombre: "Cliente" }
    ])
  }

  if (!localStorage.getItem(KEYS.categorias)) {
    setColeccion(KEYS.categorias, [
      { id: 1, nombre: "Poleras" },
      { id: 2, nombre: "Polerones" },
      { id: 3, nombre: "Jeans" },
      { id: 4, nombre: "Camisas" },
      { id: 5, nombre: "Zapatillas" },
      { id: 6, nombre: "Accesorios" }
    ])
  }

  if (!localStorage.getItem(KEYS.regiones)) {
    setColeccion(KEYS.regiones, [
      { id: 1, nombre: "Region Metropolitana" },
      { id: 2, nombre: "Valparaiso" },
      { id: 3, nombre: "Biobio" }
    ])
  }

  if (!localStorage.getItem(KEYS.comunas)) {
    setColeccion(KEYS.comunas, [
      { id: 1, regionId: 1, nombre: "Santiago" },
      { id: 2, regionId: 1, nombre: "Providencia" },
      { id: 3, regionId: 1, nombre: "Maipu" },
      { id: 4, regionId: 2, nombre: "Valparaiso" },
      { id: 5, regionId: 2, nombre: "Vina del Mar" },
      { id: 6, regionId: 3, nombre: "Concepcion" },
      { id: 7, regionId: 3, nombre: "Talcahuano" }
    ])
  }

  if (!localStorage.getItem(KEYS.usuarios)) {
    setColeccion(KEYS.usuarios, [
      {
        run: "123456785", nombre: "Admin", apellidos: "FreshFits",
        correo: "admin@gmail.com", password: "admin123",
        fechaNacimiento: "1990-01-01", rolId: 1,
        regionId: 1, comunaId: 1, direccion: "Av. Principal 123",
        estado: "Activo"
      },
      {
        run: "987654325", nombre: "Vendedor", apellidos: "FreshFits",
        correo: "vendedor@gmail.com", password: "vend1234",
        fechaNacimiento: "1992-05-14", rolId: 2,
        regionId: 1, comunaId: 2, direccion: "Calle Venta 456",
        estado: "Activo"
      },
      {
        run: "112223339", nombre: "Camila", apellidos: "Soto Perez",
        correo: "camila@gmail.com", password: "cliente1",
        fechaNacimiento: "1998-03-22", rolId: 3,
        regionId: 2, comunaId: 4, direccion: "Los Aromos 789",
        estado: "Activo"
      },
      {
        run: "201113334", nombre: "Diego", apellidos: "Fernandez Rojas",
        correo: "diego@duoc.cl", password: "diego123",
        fechaNacimiento: "2001-11-09", rolId: 3,
        regionId: 3, comunaId: 6, direccion: "Las Rosas 321",
        estado: "Activo"
      }
    ])
  }

  if (!localStorage.getItem(KEYS.productos)) {
    setColeccion(KEYS.productos, [
      { codigo: "FF-001", nombre: "Polera Fresh Basica", descripcion: "Polera de algodon 100%, corte relajado y comodo para todos los dias.", precio: 14990, stock: 15, stockCritico: 3, categoriaId: 1, imagen: "productos/polera-basica.webp", estado: "Activo", destacado: true },
      { codigo: "FF-002", nombre: "Poleron Cloud Hoodie", descripcion: "Poleron oversized con capucha, bolsillo canguro y tela afelpada.", precio: 29990, stock: 20, stockCritico: 5, categoriaId: 2, imagen: "productos/polerones.png", estado: "Activo", destacado: true },
      { codigo: "FF-003", nombre: "Jean Slim Fit", descripcion: "Jean de corte slim, denim lavado medio, elastico y muy comodo.", precio: 24990, stock: 8, stockCritico: 2, categoriaId: 3, imagen: "productos/pantalones.png", estado: "Activo", destacado: true },
      { codigo: "FF-004", nombre: "Camisa Lino Flow", descripcion: "Camisa manga corta de lino, fresca y perfecta para el verano.", precio: 21990, stock: 12, stockCritico: 4, categoriaId: 4, imagen: "productos/camisas.png", estado: "Activo", destacado: true },
      { codigo: "FF-005", nombre: "Polera Retro Graphic", descripcion: "Polera con grafico retro, estilo vintage y tela premium.", precio: 17990, stock: 10, stockCritico: 3, categoriaId: 1, imagen: "productos/poleraretro.webp", estado: "Activo", destacado: false },
      { codigo: "FF-006", nombre: "Zapatillas Urban Run", descripcion: "Zapatillas urbanas ligeras, ideales para tu look del dia a dia.", precio: 39990, stock: 25, stockCritico: 5, categoriaId: 5, imagen: "productos/zaptilla.png", estado: "Activo", destacado: true },
      { codigo: "FF-007", nombre: "Cargo Street Pants", descripcion: "Pantalon cargo estilo militar, con bolsillos y corte streetwear.", precio: 27990, stock: 2, stockCritico: 3, categoriaId: 3, imagen: "productos/pantalonescargo.jpg", estado: "Activo", destacado: false },
      { codigo: "FF-008", nombre: "Gorra Fresh Cap", descripcion: "Gorra con logo bordado, ajuste regulable y tela transpirable.", precio: 12990, stock: 6, stockCritico: 2, categoriaId: 6, imagen: "productos/gorrofresh.jpg", estado: "Activo", destacado: false }
    ])
  }

  if (!localStorage.getItem(KEYS.blog)) {
    setColeccion(KEYS.blog, [
      { id: 1, titulo: "FreshFits abre sus puertas", resumen: "Nace una nueva tienda online de ropa moderna pensada para todos.", imagen: "blog/blooms.png", fecha: "2026-08-01", slug: "detalle-1" },
      { id: 2, titulo: "Los lanzamientos mas esperados de la temporada", resumen: "Repasamos las prendas que marcaran tendencia en los proximos meses.", imagen: "blog/lanzamientoesperados.png", fecha: "2026-08-10", slug: "detalle-2" },
      { id: 3, titulo: "5 consejos para un look streetwear", resumen: "Ideas simples para armar outfits fresh sin complicaciones.", imagen: "blog/5consejos.png", fecha: "2026-08-20", slug: "detalle-3" }
    ])
  }

  if (!localStorage.getItem(KEYS.carrito)) {
    setColeccion(KEYS.carrito, [])
  }

  if (!localStorage.getItem(KEYS.contactos)) {
    setColeccion(KEYS.contactos, [])
  }
}

export function getSesion() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.sesion)) || null
  } catch {
    return null
  }
}

export function nombreCategoria(id) {
  const c = getColeccion(KEYS.categorias).find(x => x.id === Number(id))
  return c ? c.nombre : "Sin categoria"
}
