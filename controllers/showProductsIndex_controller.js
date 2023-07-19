import { clientServices } from "../service/client_service.js";


export const showProductsCategoria=(categoria)=>{
    const contenedorLista=document.querySelector(`.${categoria}__contenedor_lista`);

    const urlCategoria=clientServices.urlProductosAPI+`?categoria=${categoria}`;
    clientServices.consultaProductos(urlCategoria).then(data=>{
        
        for(let i=0;i<6;i++){
            const objeto=data[i];
            const listElement=document.createElement('li');
            listElement.className=`${categoria}__item`;
            const contenido=
            `<img src=${objeto.imagen} alt=${objeto.nombre} class="${categoria}__imagen">
            <p class="${categoria}__item_titulo">${objeto.nombre}</p>
            <p class="${categoria}__item__precio">${objeto.precio}</p>
            <button class="${categoria}__button"><a href="../pagina_producto.html?id=${objeto.id}">Ver Producto</a></button>`;
            listElement.innerHTML=contenido;

            contenedorLista.appendChild(listElement);
        }
       

    }).catch(error=>console.log("Ha ocurrido un error al devolver la data: "+error))

}


showProductsCategoria("gym");
showProductsCategoria("oficina");
showProductsCategoria("casual");


/*

<li class="gym__item"><img src="img/Productos/gym/leggin_diseño_blanco_negro.jpg" alt="leggin diseño blanco y negro" class="gym__imagen">
                        <p class="gym__item_titulo">Leggin Diseño Blanco y Negro</p>
                        <p class="gym__item__precio">$15.000</p>
                        <button class="gym__button">Ver Producto</button>
                    </li>
                    <li class="gym__item"><img src="img/Productos/gym/leggin_tie_rosa.jpg" alt="leggin diseño tie rosa" class="gym__imagen">
                        <p class="gym__item_titulo">Leggin Diseño Tie Dye Rosa</p>
                        <p class="gym__item__precio">$20.000</p>
                        <button class="gym__button">Ver Producto</button>
                    </li>
                    <li class="gym__item"><img src="img/Productos/gym/conjunto_tie_dye_amarillo.jpg" alt="conjunto tie dye amarillo" class="gym__imagen">
                        <p class="gym__item_titulo">Conjunto Diseño Tie Dye Amarillo</p>
                        <p class="gym__item__precio">$40.000</p>
                        <button class="gym__button">Ver Producto</button>
                    </li>
                    <li class="gym__item"><img src="img/Productos/gym/conjunto_gradiente.jpg" alt="conjunto gradiente" class="gym__imagen">
                        <p class="gym__item_titulo">Conjunto Diseño Gradiente Colores</p>
                        <p class="gym__item__precio">$30.000</p>
                        <button class="gym__button">Ver Producto</button>
                    </li>
                    <li class="gym__item"><img src="img/Productos/gym/leggin_tie_amarilla.jpg" alt="leggin diseño tie amarillo" class="gym__imagen">
                        <p class="gym__item_titulo">Leggin Diseño Tie Dye Amarillo</p>
                        <p class="gym__item__precio">$20.000</p>
                        <button class="gym__button">Ver Producto</button>
                    </li>
                    <li class="gym__item"><img src="img/Productos/gym/conjunto_tie_dye_verde.jpg" alt="conjunto tie dye verde" class="gym__imagen">
                        <p class="gym__item_titulo">Conjunto Diseño Tie Dye Verde Fluor</p>
                        <p class="gym__item__precio">$40.000</p>
                        <button class="gym__button">Ver Producto</button>
                    </li>



                    <li class="oficina__item"><img src="img/Productos/oficina/chaqueta_rosa.jpg" alt="chaqueta rosa" class="oficina__imagen">
                        <p class="oficina__item_titulo">Chaqueta Rosa Cuello V</p>
                        <p class="oficina__item__precio">$75.000</p>
                        <button class="oficina__button">Ver Producto</button>
                    </li>
                    <li class="oficina__item"><img src="img/Productos/oficina/camiseta_animal_print_leopardo.jpg" alt="camiseta animal print leopardo" class="oficina__imagen">
                        <p class="oficina__item_titulo">Camiseta Animal Print Leopardo</p>
                        <p class="oficina__item__precio">$35.000</p>
                        <button class="oficina__button">Ver Producto</button>
                    </li>
                    <li class="oficina__item"><img src="img/Productos/oficina/zapatos_tacon_medio.jpg" alt="zapatos tacon medio" class="oficina__imagen">
                        <p class="oficina__item_titulo">Zapatos Tacon Medio</p>
                        <p class="oficina__item__precio">$55.000</p>
                        <button class="oficina__button">Ver Producto</button>
                    </li>
                    <li class="oficina__item"><img src="img/Productos/oficina/blusa_animal_print_leopardo_blanca.jpg" alt="blusa animal print blanca" class="oficina__imagen">
                        <p class="oficina__item_titulo">Blusa Animal Print Leopardo Blanca</p>
                        <p class="oficina__item__precio">$35.000</p>
                        <button class="oficina__button">Ver Producto</button>
                    </li>
                    <li class="oficina__item"><img src="img/Productos/oficina/blusa_clasica_negra.jpg" alt="blusa clasica negra" class="oficina__imagen">
                        <p class="oficina__item_titulo">Blusa Clásica Negra</p>
                        <p class="oficina__item__precio">$30.000</p>
                        <button class="oficina__button">Ver Producto</button>
                    </li>
                    <li class="oficina__item"><img src="img/Productos/oficina/pantalon_cintura_alta.jpg" alt="pantalon cintura alta" class="oficina__imagen">
                        <p class="oficina__item_titulo">Pantalón Cintura Alta</p>
                        <p class="oficina__item__precio">$60.000</p>
                        <button class="oficina__button">Ver Producto</button>
                    </li>

*/