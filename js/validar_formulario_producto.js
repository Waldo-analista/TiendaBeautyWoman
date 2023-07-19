export const validar_formulario_producto = () => {
  const inputs = document.querySelectorAll("[data-producto]");

  inputs.forEach((input) =>
    input.addEventListener("blur", (e) => {
      validacion(e.target);
    })
  );

  function validacion(input) {
    const tipoDeInput = input.dataset.producto;

    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
      input.classList.remove("formulario__producto--error");
    } else {
      input.classList.add("formulario__producto--error");
      if (tipoDeInput) {
        input.parentElement.querySelector(
          ".formulario__producto__mensaje"
        ).innerHTML = mostrarMensajeDeError(tipoDeInput, input);
      }
    }
  }

  const validadores = {
    nombre: (input) => validarNombre(input),
    descripcion: (input) => validarDescripcion(input),
    precio: (input) => validarPrecio(input),
  };

  const tipoDeErrores = ["valueMissing", "customError"];

  function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";

    for (let i = 0; i < tipoDeErrores.length; i++) {
      if (input.validity[tipoDeErrores[i]]) {
        mensaje = mensajesDeError[tipoDeInput][tipoDeErrores[i]];
        break;
      }
    }

    return mensaje;
  }

  const mensajesDeError = {
    nombre: {
      valueMissing: "El campo Nombre esta vacio. Debe tener data escrita.",
      customError:
        "El campo Nombre posee más de 20 caracteres. El máximo aceptado es de 20 caracteres.",
    },
    descripcion: {
      valueMissing: "El campo Descripción esta vacio. Debe tener data escrita.",
      customError:
        "El campo Descripción posee más de 150 caracteres. El máximo aceptado es de 150 caracteres-",
    },
    precio: {
      valueMissing: "El campo Precio esta vacio. Debes establecer un precio.",
    }
  };

  function validarNombre(input) {
    const valor = input.value;
    let mensaje = "";
    if (valor.length == 0) {
      mensaje = "El campo Nombre esta vacio. Debe tener data escrita.";
    }
    if (valor.length > 20) {
      mensaje = mensajesDeError.nombre.customError;
    }
    input.setCustomValidity(mensaje);
  }

  function validarDescripcion(input) {
    const valor = input.value;
    let mensaje = "";
    if (valor.length == 0) {
      mensaje = "El campo Descripcion esta vacio. Debe tener data escrita";
    }
    if (valor.length > 150) {
      mensaje = mensajesDeError.descripcion.customError;
    }
    input.setCustomValidity(mensaje);
  }

  function validarPrecio(input) {
    const valor = input.value;
    let mensaje = "";
    if (valor.length == 0) {
      mensaje = mensajesDeError.precio.valueMissing;
    }
    input.setCustomValidity(mensaje);
  }



};

export const validarImagenFile=()=>{

  const inputImagen=document.querySelector('.form__input__archivo');
  const dragArea=document.querySelector('.form__drag_area');
  const clases=dragArea.classList;
  const urlImagen=window.location.origin+'/img/datos/imagen_drag.svg';
  
  


  if(!inputImagen.value && document.querySelector('.form__drag_area__imagen').src==urlImagen ){
    clases.add('form__drag_area--error');
    
    document.querySelector('.form__drag_area__imagen').src="../img/datos/imagen_drag_download.svg";
    document.querySelector('.form__drag_area_descripcion--crear').innerHTML='No has seleccionado una imagen. Selecciona una imagen para que se muestre aquí.'
  }

  
 
}


export const removerClasesVacioImagen=(urlImagen)=>{

  
  const urlImagenDrag=window.location.origin+'/img/datos/imagen_drag_download.svg';
  if(urlImagen!==urlImagenDrag){
    const dragArea=document.querySelector('.form__drag_area');
    const clases=dragArea.classList;

    clases.remove('form__drag_area--error');
    document.querySelector('.form__drag_area_descripcion--crear').remove();

  }

}