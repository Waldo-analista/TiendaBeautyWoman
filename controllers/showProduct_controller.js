import { clientServices } from "../service/client_service.js";

const crearPaginaAllProducts = (url,titulo) => {
    const seccionProductos = document.querySelector(".productos.contenedor");
  
    const tituloTag = document.createElement("h1");
    tituloTag.className = "productos__titulo";
    tituloTag.innerHTML = titulo;
    seccionProductos.appendChild(tituloTag);

    const listaProductos = document.createElement("ul");
    listaProductos.className = "productos__contenedor__lista";
    seccionProductos.appendChild(listaProductos);

    clientServices.consultaProductos(url).then(data=>{
        if (data) {
            data.forEach((objeto) => {
              const listaItem = document.createElement("li");
              listaItem.className = "productos__item";
              const contenido = `<img src=${objeto.imagen} alt=${
                objeto.nombre
              } class="productos__imagen">
                      <p class="productos__item_titulo">${objeto.nombre}</p>
                      <p class="productos__item__precio">${objeto.precio}</p>
                      <button class="${objeto.categoria}__button"><a href="../pagina_producto.html?id=${objeto.id}">Ver Producto</a></button>
                      `;
              listaItem.innerHTML = contenido;
      
              listaProductos.appendChild(listaItem);
            });
          } else {
            console.log("No existe data");
          }


    })

}


const url=new URL(window.location);

if (url.searchParams.size==0){
    
crearPaginaAllProducts(clientServices.urlProductosAPI,"Nuestro catálogo de todos los productos");
}
else{
    if(url.searchParams.get('categoria')=="gym"){
        crearPaginaAllProducts(clientServices.urlProductosAPI+'/'+'?categoria=gym', "Todos los productos de Gym");
    }
    if(url.searchParams.get('categoria')=="casual")
    {
        crearPaginaAllProducts(clientServices.urlProductosAPI+'/'+'?categoria=casual', "Todos los productos de Casual");
    }
    if(url.searchParams.get('categoria')=="oficina"){
        crearPaginaAllProducts(clientServices.urlProductosAPI+'/'+'?categoria=oficina', "Todos los productos de Oficina");
    }
    

}