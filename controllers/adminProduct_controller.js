import { clientServices } from "../service/client_service.js";

const crearPaginaAllProducts = (url) => {
  const seccionProductos = document.querySelector(".productos.contenedor");

  const titulo = document.createElement("h1");
  titulo.className = "productos__titulo";
  titulo.innerHTML = "Todos los Productos";

  const botonAgregarProducto = document.createElement("button");
  botonAgregarProducto.className = "productos__boton__agregar_producto";
  botonAgregarProducto.title = "Agregar Producto";
  botonAgregarProducto.innerHTML =
    'Agregar Producto <i class="fa-solid fa-circle-plus"></i>';

  const listaProductos = document.createElement("ul");
  listaProductos.className = "productos__contenedor__lista";

  seccionProductos.appendChild(titulo);
  seccionProductos.appendChild(botonAgregarProducto);
  seccionProductos.appendChild(listaProductos);

  clientServices.consultaProductos(clientServices.urlProductosAPI).then((data) => {
    if (data) {
      data.forEach((objeto) => {
        const listaItem = document.createElement("li");
        listaItem.className = "productos__item";
        const contenido = `<img src=${objeto.imagen} alt=${
          objeto.nombre
        } class="productos__imagen">
                <div class="productos__contenedor__botones">
                    <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><a><i class="fa-solid fa-trash"></i></a></span>
                    <span class="productos__contenedor__boton" title="Editar"><a href="../edit_product.html?id=${
                      objeto.id
                    }"><i class="fa-sharp fa-solid fa-pencil"></i></a></span>
                </div>
                <p class="productos__item_titulo">${objeto.nombre}</p>
                <p class="productos__item__precio">${objeto.precio}</p>
                `;
        listaItem.innerHTML = contenido;

        const botonAgregarProducto=document.querySelector('.productos__boton__agregar_producto');
        botonAgregarProducto.addEventListener("click",()=>{
            window.location.assign(url);
        });


        const btn =listaItem.querySelector(".productos__contenedor__boton--eliminar");
        btn.addEventListener("click", () => {

          swal({
            title: "¿Estas seguro de borrar el producto?",
            text: "¡Una vez eliminado, no serás capaz de revertir esta acción!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((okBorrado) => {
            if (okBorrado) {
              clientServices.eliminarCliente(objeto.id).catch(err=>console.log("Ha ocurrido un error: "+err));

              setTimeout(function(){
                location.reload();
              },1000);

              swal("¡Tu archivo ha sido eliminado!", {
                icon: "success",
              });
            } else {
              swal("Tu archivo esta seguro, no fue eliminado");
            }
          });





        });


        listaProductos.appendChild(listaItem);
      });
    } else {
      console.log("No existe data");
    }
  });
};



const urlAdmin=new URL(window.location);

clientServices.consultaProductos(clientServices.urlAdminAPI).then(array=>{

    if(urlAdmin.searchParams.size==0 || urlAdmin.searchParams.size>2 || !urlAdmin.searchParams.get('email') || !urlAdmin.searchParams.get('password') || urlAdmin.searchParams.get('email')!==array[0].usuario || urlAdmin.searchParams.get('password')!==array[0].password ){
        const main= document.querySelector('main');
        main.appendChild(clientServices.construirPagina404());

    }else{
    
        const urlEditor='../crear_product.html?email='+urlAdmin.searchParams.get('email')+'&password='+urlAdmin.searchParams.get('password');
        crearPaginaAllProducts(urlEditor);
        
    }

});







/*
                    <li class="productos__item">
                        <img src="img/Productos/gym/leggin_diseño_blanco_negro.jpg" alt="leggin diseño blanco y negro" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Leggin Diseño Blanco y Negro</p>
                        <p class="productos__item__precio">$15.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/gym/leggin_tie_rosa.jpg" alt="leggin diseño tie rosa" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Leggin Diseño Tie Dye Rosa</p>
                        <p class="productos__item__precio">$20.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/gym/conjunto_tie_dye_amarillo.jpg" alt="conjunto tie dye amarillo" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Conjunto Diseño Tie Dye Amarillo</p>
                        <p class="productos__item__precio">$40.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/gym/conjunto_gradiente.jpg" alt="conjunto gradiente" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Conjunto Diseño Gradiente Colores</p>
                        <p class="productos__item__precio">$30.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/gym/leggin_tie_amarilla.jpg" alt="leggin diseño tie amarillo" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Leggin Diseño Tie Dye Amarillo</p>
                        <p class="productos__item__precio">$20.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/gym/conjunto_tie_dye_verde.jpg" alt="conjunto tie dye verde" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Conjunto Diseño Tie Dye Verde Fluor</p>
                        <p class="productos__item__precio">$40.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/oficina/chaqueta_rosa.jpg" alt="chaqueta rosa" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Chaqueta Rosa Cuello V</p>
                        <p class="productos__item__precio">$75.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/oficina/camiseta_animal_print_leopardo.jpg" alt="camiseta animal print leopardo" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Camiseta Animal Print Leopardo</p>
                        <p class="productos__item__precio">$35.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/oficina/zapatos_tacon_medio.jpg" alt="zapatos tacon medio" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Zapatos Tacon Medio</p>
                        <p class="productos__item__precio">$55.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/oficina/blusa_animal_print_leopardo_blanca.jpg" alt="blusa animal print blanca" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Blusa Animal Print Leopardo Blanca</p>
                        <p class="productos__item__precio">$35.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/oficina/blusa_clasica_negra.jpg" alt="blusa clasica negra" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Blusa Clásica Negra</p>
                        <p class="productos__item__precio">$30.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/oficina/pantalon_cintura_alta.jpg" alt="pantalon cintura alta" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Pantalón Cintura Alta</p>
                        <p class="productos__item__precio">$60.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/casual/zapatillas_lona_plataforma.jpg" alt="zapatillas lona plataforma" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Zapatillas de Lona con Plataforma Blanco y Negro</p>
                        <p class="productos__item__precio">$65.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/casual/sweter_ancho.jpg" alt="sweater ancho" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Sweater Ancho Mostaza</p>
                        <p class="productos__item__precio">$45.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/casual/pantalon_cargo_gris.jpg" alt="pantalon cargo gris" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Pantalón Cargo Gris</p>
                        <p class="productos__item__precio">$40.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/casual/zapatos_plataforma.jpg" alt="zapatos plataforma" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Zapatos Plataforma</p>
                        <p class="productos__item__precio">$65.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/casual/jeasn_pierna_ancha.jpg" alt="jeans pierna ancha" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Jeans Pierna Ancha</p>
                        <p class="productos__item__precio">$40.000</p>
                    </li>
                    <li class="productos__item">
                        <img src="img/Productos/casual/cardigan_color_crema.jpg" alt="cardigan color crema" class="productos__imagen">
                        <div class="productos__contenedor__botones">
                            <span class="productos__contenedor__boton productos__contenedor__boton--eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></span>
                            <span class="productos__contenedor__boton" title="Editar"><i class="fa-sharp fa-solid fa-pencil"></i></span>
                        </div>
                        <p class="productos__item_titulo">Cardigan Color Crema</p>
                        <p class="productos__item__precio">$40.000</p>
                    </li>
*/
