import { clientServices } from "../service/client_service.js";
import {
    removerClasesVacioImagen,
    validarImagenFile,
    validar_formulario_producto,
} from "../js/validar_formulario_producto.js";



(function(){    

    const crearFormularioCrearProducto = () => {
        const seleccionarImagen = () => {
            const inputFile = document.querySelector('[name="archivo"]');
            inputFile.addEventListener("change", (e) => {
                const mimetipeAdmitido = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                ];

                if (mimetipeAdmitido.includes(e.target.files[0].type)) {
                    const file = e.target.files[0];
                    const fileReader = new FileReader();

                    fileReader.onload = function () {
                        const imageUrl = fileReader.result;
                        document.querySelector(".form__drag_area__imagen").src = imageUrl;
                        document.querySelector(".form__drag_area__imagen").style.width =
                            "100%";

                        removerClasesVacioImagen(imageUrl);
                        if (document.querySelector(".form__drag_area_descripcion--crear")) {
                            document
                                .querySelector(".form__drag_area_descripcion--crear")
                                .remove();
                        }
                    };

                    fileReader.readAsDataURL(file);

                    
                } else {
                    swal(
                        "Error",
                        "Solo se permiten imagenes y de formato: JPG, JPEG, WEBP y PNG",
                        "error"
                    );
                }
            });

            const dragArea = document.querySelector(".form__drag_area");
            dragArea.addEventListener("dragover", (e) => e.preventDefault());
            dragArea.addEventListener("drop", (e) => {
                e.preventDefault();

                const mimetipeAdmitido = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                ];

                const file = e.dataTransfer.files[0];
                if (mimetipeAdmitido.includes(file.type)){
                const fileReader = new FileReader();

                fileReader.onload = function () {
                    const imageUrl = fileReader.result;
                    document.querySelector(".form__drag_area__imagen").src = imageUrl;
                    document.querySelector(".form__drag_area__imagen").style.width =
                        "100%";
                    
                    removerClasesVacioImagen(imageUrl);

                    if (document.querySelector(".form__drag_area_descripcion--crear")) {
                        document
                            .querySelector(".form__drag_area_descripcion--crear")
                            .remove();
                    }
                    
                };

                fileReader.readAsDataURL(file);
                
            }else{
                swal(
                    "Error",
                    "Solo se permiten imagenes y de formato: JPG, JPEG, WEBP y PNG",
                    "error"
                );
                
            }
            });
        };

        const main = document.querySelector("main");
        const contenido = `
        <h1>Crear Producto</h1>
                <form data-formulario_producto>
                    <label for="imagen">Selecciona una Imagen</label>
                    <div class="form__contenedor__buscar_producto">
                        <div class="form__drag_area">
                            <img class="form__drag_area__imagen" src="../img/datos/imagen_drag.svg" alt="imagen drag area">
                            <p class="form__drag_area_descripcion--crear">Arrastra una imagen a esta área</p>
                        </div>
                        <span class="form__contenedor__buscar_producto_separador">ó</span>
                        <div class="form__buscar_producto">
                            <label for="archivo" class="form__label__archivo" >Buscar Imagen en el PC</label>
                            <input  type="file" id="archivo" name="archivo" class="form__input__archivo" accept="image/*"   >
                        </div>
                    </div>
                    <label for="categoria">Selecciona una Categoría</label>
                    <select name="categoria" id="categoria" required>
                        <option value="gym">Gimnasio</option>
                        <option value="oficina">Oficina</option>
                        <option value="casual">Casual</option>
                    </select>
                    <label for="nombre_producto">Nombre del Producto</label>
                    <div class="contenedor__formulario__producto__mensaje"> 
                        <input data-producto="nombre" type="text" name="nombre_producto" id="nombre_producto" required placeholder="Calzas PushUp"/>
                        <span class="formulario__producto__mensaje">Este campo no puede estar vacio</span>
                    </div>
                    <label for="precio_producto">Precio del Producto (CLP)</label>
                    <div class="contenedor__formulario__producto__mensaje"> 
                        <input data-producto="precio" type="number" name="precio_producto" id="precio_producto" min="0" required placeholder="100"/>
                        <span class="formulario__producto__mensaje">Este campo no puede estar vacio</span>
                    </div>
                    <label for="descripcion">Descripción</label>
                    <div class="contenedor__formulario__producto__mensaje">
                        <textarea data-producto="descripcion" name="descripcion" id="descripcion" rows="5" required placeholder="Calzas que estilizan la figura, levantan y definen gluteos...."></textarea>
                        <span class="formulario__producto__mensaje">Este campo no puede estar vacio</span>
                    </div>
                    <button type="submit" title="Crear Producto">Crear Producto</button>
                </form>
        `;
        main.innerHTML = contenido;
        
        validar_formulario_producto();
        seleccionarImagen();

    

        const submitFormulario = document.querySelector(
            "[data-formulario_producto]"
        );

        
        submitFormulario.addEventListener("submit", (e) => {
            e.preventDefault();

            validarImagenFile();

            clientServices
                .consultaProductos(clientServices.urlProductosAPI)
                .then((dataArray) => {
                    const largo = dataArray.length;

                    const objetoID = largo + 1;
                    const objetoNombre = document.querySelector(
                        '[data-producto="nombre"]'
                    ).value;
                    const objetoPrecio =
                        "$ " +
                        document
                            .querySelector('[id="precio_producto"]')
                            .value.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    const objetoImagen = document.querySelector(
                        ".form__drag_area__imagen"
                    ).src;

                    const selectTag = document.querySelector('[id="categoria"]');
                    const objetoCategoria =
                        selectTag.options[selectTag.selectedIndex].value;

                    const objetoDescripcion =
                        document.querySelector('[id="descripcion"]').value;

                    const objeto = {
                        nombre: objetoNombre,
                        precio: objetoPrecio,
                        imagen: objetoImagen,
                        id: objetoID,
                        categoria: objetoCategoria,
                        descripcion: objetoDescripcion,
                    };

                    const inputFile=document.querySelector(".form__input__archivo");
                    const urlImagen=window.location.origin+'/img/datos/imagen_drag_download.svg';

                    if (inputFile.value || document.querySelector('.form__drag_area__imagen').src!==urlImagen) {
                        clientServices
                            .crearProducto(objeto, clientServices.urlProductosAPI)
                            .then(() => console.log("Éxito en crear el producto"))
                            .catch((err) =>
                                console.log("Ha ocurrido un error en crear el producto" + err)
                            );
                        swal("¡Éxito!", "Se ha creado el producto", "success").then((resultado)=>{
                            if(resultado){window.location.reload()}});
                        
                        
                    }else{
                        swal("Error", "El campo Imagen esta vacio. Agrega una imagen por favor", "error");
                    }
                })
                .catch((error) =>
                    console.log("Ocurrio un error en crear el producto: " + error)
                );
        });
    
    
    };

    /* Promesas para capturar data de perfil y realizar comparaciones*/
    clientServices
        .consultaProductos(clientServices.urlAdminAPI)
        .then((arrayData) => {
            const urlEdit = new URL(window.location);
            const parametros = urlEdit.searchParams;

            if (
                parametros.size == 0 ||
                parametros.size > 2 ||
                !parametros.has("email") ||
                !parametros.has("password") ||
                parametros.get("email") !== arrayData[0].usuario ||
                parametros.get("password") !== arrayData[0].password
            ) {
                const main = document.querySelector("main");
                main.appendChild(clientServices.construirPagina404());
            } else {
                crearFormularioCrearProducto();
            }
        })
        .catch((error) => console.log("error"));

    })()