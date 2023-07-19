const input=document.querySelector('.header__buscador');
const botonBuscar=document.querySelector('.header__boton_buscar');


botonBuscar.addEventListener("click",e=>{
    if(input.value.length==0){
        swal("Advertencia", "No has ingresado nada que buscar. Ingresa algún nombre de producto para buscar.", "warning");
    }else{
    const urlPasarParametros='../search_productos.html?search='+input.value;
    window.location.assign(urlPasarParametros);}

});

input.addEventListener("keydown",e=>{
    if(e.key=="Enter"){
        if(input.value.length==0){
            swal("Advertencia", "No has ingresado nada que buscar. Ingresa algo que buscar", "warning");
        }else{

    const urlPasarParametros='../search_productos.html?search='+input.value;
    window.location.assign(urlPasarParametros);
    }}

});