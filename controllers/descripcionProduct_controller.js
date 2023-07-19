import { clientServices } from "../service/client_service.js";
import { showProductsCategoria } from "./showProductsIndex_controller.js";


const crearSeccionDescripcionProducto=(objeto)=>{
    const seccion=document.createElement("section");
    const clases=seccion.classList;
    clases.add("seccion__descripcion__producto");
    clases.add("contenedor");
    const contenido=`<img class="seccion__descripcion__producto__imagen" src=${objeto.imagen} alt=${objeto.nombre}>
    <div class="seccion__descripcion__producto__contenedor">
        <p class="seccion__descripcion__producto__titulo">${objeto.nombre}</p>
        <p class="seccion__descripcion__producto__precio">${objeto.precio}</p>
        <p class="seccion__descripcion__producto__descripcion">${objeto.descripcion}</p>
    </div>`;
    seccion.innerHTML=contenido;
    return seccion;

/*

<section class="seccion__descripcion__producto contenedor">
                <img class="seccion__descripcion__producto__imagen" src="img/404.jpg" alt="nombre de producto">
                <div class="seccion__descripcion__producto__contenedor">
                    <p class="seccion__descripcion__producto__titulo">ffffff</p>
                    <p class="seccion__descripcion__producto__precio">$ 15.000</p>
                    <p class="seccion__descripcion__producto__descripcion"> ffffffff</p>
                </div>
            </section>
*/

}


const crearSeccionProductosSimilares=(categoria)=>{
    const seccion=document.createElement("section");
    const clases=seccion.classList;
    clases.add(categoria);
    clases.add("contenedor");
    const contenido=`<h1 class="${categoria}__titulo"><b></b><span class="${categoria}__titulo_span">Productos Similares</span> <b></b></h1>
    <ul class="${categoria}__contenedor_lista">    
    </ul>`;
    seccion.innerHTML=contenido;
    return seccion;
}

clientServices.consultaProductos(clientServices.urlProductosAPI).then(dataArray=>{
    const arrayIDs=[];
    dataArray.forEach(objeto=> {
        arrayIDs.push(objeto.id);
    });

    const url=new URL(window.location);
    const main=document.querySelector("main");
    
    
    if (url.searchParams.size==0 || url.searchParams.size>1 || !url.searchParams.has('id') || !arrayIDs.includes(parseInt(url.searchParams.get('id'),10))){
    
        main.insertBefore(clientServices.construirPagina404(),main.firstChild);
    }
    else if(url.searchParams.size==1 && url.searchParams.has('id')){ 
        const id=url.searchParams.get('id')
        clientServices.consultaProductos(clientServices.urlProductosAPI+"/"+id).then(objeto=>{
            const categoriaProducto=objeto.categoria;
    
            main.append(crearSeccionDescripcionProducto(objeto));
            main.append(crearSeccionProductosSimilares(categoriaProducto));
            showProductsCategoria(categoriaProducto);
        }).catch(error=>{
            console.log('Error al cargar descripcion producto: '+error)
        })
    
    }



})



/*

<section class="seccion__404 contenedor">
                <img class="seccion__404__imagen"src="img/404.jpg" alt="imagen 404: recurso no encontrado">
                <div class="seccion__404__contenedor">
                    <p class="seccion__404__titulo">Esta página no existe &#128148;</p>
                    <button class="seccion__404__boton" ><a href="/">Volver a la página principal</a></button>
                </div>
            </section>


 <section class="gym contenedor">
                <h1 class="gym__titulo"><b></b><span class="gym__titulo_span">Productos Similares</span> <b></b></h1>
                <ul class="gym__contenedor_lista">
                    
                </ul>
            </section>


*/