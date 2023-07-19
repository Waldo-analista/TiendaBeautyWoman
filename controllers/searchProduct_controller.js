import { clientServices } from "../service/client_service.js";

const crearSeccionConsultas=(arrayObjetos,titulo)=>{

    const seccionProductos=document.createElement('section');
    const clases=seccionProductos.classList;
    clases.add('productos');
    clases.add('contenedor');
  
    const tituloTag = document.createElement("h1");
    tituloTag.className = "productos__titulo";
    tituloTag.innerHTML = titulo;
    seccionProductos.appendChild(tituloTag);

    const subtituloTag=document.createElement('h1');
    subtituloTag.className = "productos__subtitulo";
    subtituloTag.innerHTML='Esta búsqueda arrojo: <span style="color:red;font-size:2rem;text-decoration:underline">'+arrayObjetos.length+'</span> resultados';
    seccionProductos.appendChild(subtituloTag);


    const listaProductos = document.createElement("ul");
    listaProductos.className = "productos__contenedor__lista";
    seccionProductos.appendChild(listaProductos);


    if (arrayObjetos) {
        arrayObjetos.forEach((objeto) => {
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
      return seccionProductos;
}

const main=document.querySelector('main');



const url=new URL(window.location);

if (url.searchParams.size==0 || url.searchParams.size>1 || !url.searchParams.has('search') ){
    main.appendChild(clientServices.construirPagina404());

}
else{
    const string_buscado=url.searchParams.get('search');
   
    clientServices.consultaProductos(clientServices.urlProductosAPI).then(data_array=>{
        const arrayObjetos=[];
        data_array.forEach((objeto)=>{
            const nombreProducto=objeto.nombre;
            
            if(nombreProducto.match(new RegExp(string_buscado,'i'))){
                arrayObjetos.push(objeto);
            }
        });
        main.appendChild(crearSeccionConsultas(arrayObjetos,"Buscar productos de nombre: "+string_buscado)); 
    }).catch(error=>console.log("Error en devolver la data:"+error));
    

    

}