
(function (){


    /* Validacion de Campos */
    const inputs = document.querySelectorAll(".input__login");

inputs.forEach((input) =>
  input.addEventListener("blur", (e) => {
    validacion(e.target);
  })
);



function validacion(input) {
    const tipoDeInput = input.dataset.tipo_login;
  
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
  
    if (input.validity.valid) {
      input.classList.remove("input__login--error");
    } else {
      input.classList.add("input__login--error");
      if (tipoDeInput) {
        input.parentElement.querySelector(".input__mensaje").innerHTML =
          mostrarMensajeDeError(tipoDeInput, input);
      }
    }
  }


  const validadores = {
    email: (input) => validarEmail(input),
    password: (input) => validarPassword(input),
  };


  const tipoDeErrores = [
    "valueMissing",
    "patternMismatch"
  ];

  function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
  
    return mensaje;
  }
  
  const mensajesDeError = {
    email: {
      valueMissing: "El campo Email esta vacio. Debe tener data escrita.",
      patternMismatch: "Ingresa en el formato XXX@XXX.XXX",
    },
    password: {
      valueMissing: "El campo Password esta vacio. Debe tener data escrita.",
    }
  };


  function validarEmail(input) {
    const valor = input.value;
    let mensaje = "";
    if (valor.length == 0) {
      mensaje = "El campo Email esta vacio. Debe tener data escrita.";
    }
    input.setCustomValidity(mensaje);
  }
  
  function validarPassword(input) {
    const valor = input.value;
    let mensaje = "";
    if (valor.length == 0) {
      mensaje = "El campo Password esta vacio. Debe tener data escrita";
    }
    input.setCustomValidity(mensaje);
  }







})()