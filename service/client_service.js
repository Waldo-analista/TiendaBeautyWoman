const urlProductosAPI = "https://datachallenge3.vercel.app/productos";
const urlAdminAPI = "https://datachallenge3.vercel.app/perfil";
// https://datachallenge3.vercel.app
const eliminarCliente = (id) => {
  return fetch(urlProductosAPI + "/" + id, {
    method: "DELETE",
  });
};

const consultaProductos = async (url) => {
  try {
    const responseObj = await fetch(url);
    return await responseObj.json();
  } catch (error) {
    return console.log("Ha ocurrido un error en el fetch: " + error);
  }
};

const construirPagina404 = () => {
  const seccion = document.createElement("section");
  const clases = seccion.classList;
  clases.add("seccion__404");
  clases.add("contenedor");
  const contenido = `<img class="seccion__404__imagen"src="img/404.jpg" alt="imagen 404: recurso no encontrado">
    <div class="seccion__404__contenedor">
        <p class="seccion__404__titulo">Esta página no existe &#128148;</p>
        <button class="seccion__404__boton" ><a href="/">Volver a la página principal</a></button>
    </div>`;
  seccion.innerHTML = contenido;
  return seccion;
};

const crearProducto = (objeto, url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objeto),
  });
};

const editarProducto = (objeto) => {
  const URL = urlProductosAPI + "/" + objeto.id;
  return fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objeto),
  });
};

export const clientServices = {
  urlProductosAPI,
  urlAdminAPI,
  consultaProductos,
  eliminarCliente,
  crearProducto,
  editarProducto,
  construirPagina404,
};
