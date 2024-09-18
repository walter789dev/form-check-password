const message = document.getElementById("message");

// ====== Defino estilos al Mensaje de Error/Exito ==========
export function setMessage(text, color = "red") {
  message.style.color = color;
  message.textContent = text;
}

// =============== Función Principal
export function validateOptionsPassword(options, passValue) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "01234567890";
   // === Utilities ===
  let preValidate = null,
    existCheck = null,
    letters = "";

   // ==== Recorro las opciones, buscando la que contiene "checked" =====
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      existCheck = true;
      // ======= Manejo de Opciones =============
      switch (options[i].id) {
        case "a-z":
          if (!/^[a-z]{4}$/.test(passValue)) 
            setMessage("Debe ingresar 4 digitos entre a-z");
          else preValidate = searchMatches(passValue, characters);
          break;
        case "0-9":
          if (!/^[0-9]{4}$/.test(passValue))
            setMessage("Debe ingresar 4 digitos entre 0-9");
          else preValidate = searchMatches(passValue, numbers);
          break;
        case "2-y-2":
          let regex1 = /^(?=(?:.*[a-z]){2})(?=(?:.*\d){2})[a-z\d]{4}$/;

          if (!regex1.test(passValue))
            setMessage("Debe ingresar 2 de a-z y 2 de 0-9");
          else preValidate = searchMatches(passValue, characters + numbers);
          break;
        case "todos":
          if (!/[a-zA-Z0-9]/.test(passValue))
            setMessage(
              "Debe ingresar 8 caracteres que contengan a-z, A-Z, 0-9"
            );
          else {
            letters = characters + characters.toUpperCase() + numbers;
            preValidate = searchMatches(passValue, letters);
          }
          break;
        case "simbolos":
          let regex2 = /^[a-zA-Z0-9!\#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8}$/;

          if (!regex2.test(passValue))
            setMessage(
              "Debe ingresar 8 caracteres que contengan a-z, A-Z, 0-9 y simbolos"
            );
          else {
            letters =
              characters +
              characters.toUpperCase() +
              numbers +
              "!#$%&’()*+,-./:;<=>?@[]^_`{|}~";

            preValidate = searchMatches(passValue, letters);
          }
          break;
      }
    }
  }
  return {
    existCheck,
    preValidate,
  };
}

// ===== Registra la cantidad de intentos y el tiempo efectuado ====
function searchMatches(password, letters) {
  let counterTry = 0,
    startTime = performance.now(),
    endTime = 0;

  for (let i = 0; i < password.length; i++) {
    const character = password[i];
    for (let j = 0; j < letters.length; j++) {
      if (letters[i] === character) break;
      counterTry++;
    }
  }
  endTime = performance.now();
  return {
    tiempo: (endTime - startTime) / 1000,
    intentos: counterTry,
  };
}
