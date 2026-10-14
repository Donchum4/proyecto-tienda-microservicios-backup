Frontend en Reac FreshFits

Este es el frontend pasado a React. Antes lo teniamos en flask con puros templates. Se ve igual que antes, no cambiamos el diseño, solo la forma en que esta hecho
Para correrlo hay que tener node instalado, nosotros ocupamos la version 20 que es la que piden en el laboratorio. Despues es entrar a la carpeta frontend-react, hacer npm install y despues npm run dev. Se abre solo en el puerto 5173, ahi aparece la tienda

La pagina tiene lo mismo de siempre. El home con los destacados y las noticias, el catalogo donde se puede buscar por nombre y filtrar por categoria, el detalle de cada prenda, el carrito que se guarda en el localstorage, el login con el registro que valida el run y deja solo correos duoc y gmail, y aparte el blog con nosotros y contacto. El panel admin tambien quedo, se entra con admin@gmail.com y la clave admin123, ahi se pueden ver los productos, los usuarios y el stock critico

No hay que levantar el backend para probar esto porque los datos quedan en el navegador, igual que como lo teniamos en flask. Los microservicios no se tocaron, eso sigue tal cual para cuando lo revisemos con docker
