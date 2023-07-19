const boton_verAllProductos=document.querySelector('.banner__boton');
boton_verAllProductos.addEventListener("click",()=>window.location.href='../productosShow.html')


const boton_verGymProducts=document.querySelector('.gym__boton_catalogo');
boton_verGymProducts.addEventListener("click",()=>window.location.assign('../productosShow.html?categoria=gym'));

const boton_verOficinaProducts=document.querySelector('.oficina__boton_catalogo');
boton_verOficinaProducts.addEventListener("click",()=>window.location.assign('../productosShow.html?categoria=oficina'));

const boton_verCasualProducts=document.querySelector('.casual__boton_catalogo');
boton_verCasualProducts.addEventListener("click",()=>window.location.assign('../productosShow.html?categoria=casual'));