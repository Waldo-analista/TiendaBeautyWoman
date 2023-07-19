import { validar_formulario_producto } from "../js/validar_formulario_producto.js";
import { clientServices } from "../service/client_service.js";

(function(){

const seleccionarImagen=()=>{
    const inputFile=document.querySelector('[name="archivo"]');
    inputFile.addEventListener('change',e=>{
        const mimetipeAdmitido=['image/jpeg','image/jpg','image/png','image/webp'];

        if(mimetipeAdmitido.includes(e.target.files[0].type)){
        
            const file = e.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = function() {
                const imageUrl = fileReader.result;
                document.querySelector('.form__drag_area__imagen').src = imageUrl;
                };

            fileReader.readAsDataURL(file);


        }else{
            swal("Error", "Solo se permiten imagenes y de formato: JPG, JPEG, WEBP y PNG", "error");
        }
    });

    const dragArea=document.querySelector('.form__drag_area');
    dragArea.addEventListener('dragover',e=>e.preventDefault());
    dragArea.addEventListener('drop',e=>{
        e.preventDefault();
        
        const mimetipeAdmitido = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        const file=e.dataTransfer.files[0];
        
        if (mimetipeAdmitido.includes(file.type)){
        const fileReader = new FileReader();

      fileReader.onload = function() {
        const imageUrl = fileReader.result;
        document.querySelector('.form__drag_area__imagen').src = imageUrl;
      }

      fileReader.readAsDataURL(file);
    }else{
        swal("Error", "Solo se permiten imagenes y de formato: JPG, JPEG, WEBP y PNG", "error");
    }

    });


}

const crearFormularioEdicion=(id)=>{
    clientServices.consultaProductos(clientServices.urlProductosAPI+'/'+id).then(objeto=>{

        const main=document.querySelector('main');
        const contenido=`
        <h1>Editar Producto</h1>
                <form data-formulario_producto>
                    <label for="imagen">Selecciona una Imagen</label>
                    <div class="form__contenedor__buscar_producto">
                        <div class="form__drag_area">
                            <img class="form__drag_area__imagen" src=${objeto.imagen} alt=${objeto.nombre}>
                            <p class="form__drag_area_descripcion">Arrastra una imagen a esta área</p>
                        </div>
                        <span class="form__contenedor__buscar_producto_separador">ó</span>
                        <div class="form__buscar_producto">
                            <label for="archivo" class="form__label__archivo" >Buscar Imagen en el PC</label>
                            <input  type="file" id="archivo" name="archivo" class="form__input__archivo" accept="image/*">
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
                    <button type="submit" title="Editar Producto">Editar Producto</button>
                </form>
        `
        main.innerHTML=contenido;
        document.querySelector('.form__drag_area__imagen').style.width='100%';

        document.querySelector(`[value=${objeto.categoria}]`).setAttribute('selected','');
        document.querySelector('[name="nombre_producto"]').value=objeto.nombre;
        document.querySelector('[name="precio_producto"]').value=parseInt(objeto.precio.match(/\d+/g).join(''),10);
        document.querySelector('[name="descripcion"]').value=objeto.descripcion;

        seleccionarImagen();
        validar_formulario_producto();

        /*editar data al hacer submit*/


        const   submitFormulario =document.querySelector('[data-formulario_producto]');
        submitFormulario.addEventListener('submit',e=>{
            e.preventDefault();
            const objetoID=id;
            const objetoNombre=document.querySelector('[data-producto="nombre"]').value;
            const objetoPrecio="$ "+(document.querySelector('[id="precio_producto"]').value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            const objetoImagen=document.querySelector('.form__drag_area__imagen').src;

            const selectTag=document.querySelector('[id="categoria"]');
            const objetoCategoria=selectTag.options[selectTag.selectedIndex].value;
            
            const objetoDescripcion=document.querySelector('[id="descripcion"]').value;

            const objeto={
                nombre:objetoNombre,
                precio:objetoPrecio,
                imagen:objetoImagen,
                id:objetoID,
                categoria:objetoCategoria,
                descripcion:objetoDescripcion,
            }
            
          

            clientServices.editarProducto(objeto).then(response=>console.log(response.json())).catch(error=>console.log(error));
            swal("¡Éxito!", "Se ha editado el producto","success");

        });



    });
  
}





const urlEdit=new URL(window.location);
const parametros=urlEdit.searchParams;


if( parametros.size==0 || parametros.size>2 || !parametros.has('id')){
    const main=document.querySelector('main');
    main.appendChild(clientServices.construirPagina404());
}else{
    const id=parametros.get('id');
    crearFormularioEdicion(id);


}

})()