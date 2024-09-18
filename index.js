import { setMessage, validateOptionsPassword } from "./validate.js";
// =========== Elementos HTML ==================
const formulario = document.getElementById("form");
const switches = document.querySelectorAll(".toggle-switch input");

// ============== Evento Principal =============
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const { password, username } = e.target;
  const { existCheck, preValidate } = validateOptionsPassword(
    switches,
    password.value
  );
   // == En caso de no haber seleccionado una opción ==
  if (!existCheck) setMessage("Seleccione una validacion");
   // == Si ha adivinado la contraseña ===
  if (preValidate) {
    let { tiempo, intentos } = preValidate;
    setMessage(`Tiempo: ${tiempo.toFixed(4)}s, ${intentos} intentos`, "green");
  }
});

// ========= Manejo De Switches ==========
for (const switchElm of switches) {
  switchElm.addEventListener("click", () => {
    switches.forEach((elm) => {
      if (elm.id !== switchElm.id) elm.checked = false;
    });
  });
}
