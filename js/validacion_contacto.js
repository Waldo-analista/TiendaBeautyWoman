(function(){const inputs = document.querySelectorAll(".footer__contenedor__contacto_input");

inputs.forEach((input) =>
  input.addEventListener("blur", (e) => {
    validacion(e.target);
  })
);

function validacion(input) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.classList.remove("footer__contenedor__contacto_input--error");
  } else {
    input.classList.add("footer__contenedor__contacto_input--error");
    if (tipoDeInput) {
      input.parentElement.querySelector(".footer__input__mensaje").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];
const validadores = {
  nombre: (input) => validarNombre(input),
  mensaje: (input) => validarMensaje(input),
};

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
  nombre: {
    valueMissing: "Este campo NO puede estar vacío",
    customError: "El campo Nombre debe tener 40 caracteres como máximo",
  },
  email: {
    valueMissing: "Este campo NO puede estar vacío",
    typeMismatch: "El correo no es valido",
    patternMismatch: "Ingresa en el formato XXX@XXX.XXX",
  },
  asunto: {
    valueMissing: "Este campo NO puede estar vacío",
  },
  mensaje: {
    valueMissing: "Este campo NO puede estar vacío",
    customError: "El campo Mensaje debe tener 120 caracteres como máximo",
  },
};

function validarNombre(input) {
  const valor = input.value;
  let mensaje = "";
  if (valor.length > 40) {
    mensaje = "Has ingresado más de 40 caracteres. El limite son 40.";
  }
  input.setCustomValidity(mensaje);
}

function validarMensaje(input) {
  const valor = input.value;
  let mensaje = "";
  if (valor.length > 120) {
    mensaje = "Has ingresado más de 120 caracteres. El limite son 120.";
  }
  input.setCustomValidity(mensaje);
}


/*Codigo cuando se envia el formulario*/
const formulario_contacto = document.querySelector("[data-form]");
formulario_contacto.addEventListener("submit", (e) => {
  e.preventDefault();
  swal(
    "¡Datos Enviados!",
    "Los datos han sido enviados correctamente",
    "success",
    {button:{
      text: "OK, gracias"
    }}
  );
  inputs.forEach((input) => (input.value = ""));
});
})()