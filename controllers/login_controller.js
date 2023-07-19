import { clientServices } from "../service/client_service.js";


/*Validación de data ingresada con data registrada*/
(function(){
const formularioLogin=document.querySelector('[data-form_login]');
formularioLogin.addEventListener("submit",e=>{
    e.preventDefault();
    const emailIngresado=document.querySelector('[data-tipo_login="email"]').value;
    const passwordIngresado=document.querySelector('[data-tipo_login="password"]').value;
    clientServices.consultaProductos(clientServices.urlAdminAPI).then(data_array=>{
        const emailAdmin=data_array[0].usuario;
        const passwordAdmin=data_array[0]['password'];
        if(emailAdmin==emailIngresado && passwordAdmin==passwordIngresado){
            const urlAdmin='../productosAdmin.html?email='+emailAdmin+'&password='+passwordAdmin;
            window.location.assign(urlAdmin);
            
        }
        else{
            swal("Error", "Los datos de registro son inválidos. Ingresa las credenciales correctas", "error");
        }


    });


});


})();