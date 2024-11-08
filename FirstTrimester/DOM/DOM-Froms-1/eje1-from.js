//
/*

  Piensa en una situación del mundo real donde se tenga que cumplimentar un formulario.
  El formulario debe tener los siguientes elementos:
    - Inputs: text, password, checkbox y radio y algunos otros de los que aparecen aquí:
      https://www.w3schools.com/html/html_form_input_types.asp
    - textarea
    - select
    - datalist
  Al pulsar un botón (tipo submit) se validará el formulario,
  Todos los campos son obligatorios, si uno no tiene un valor se resaltará con un estilo
  apropiado de Bootstrap.

  Se debe mostrar en un div la información de cada campo, nombre/id y valor indicado por el
  usuario.

*/
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const submitButton = document.getElementById("submitButton");
  const resultDiv = document.getElementById("result");

  submitButton.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el envío del formulario

      // Obtener todos los elementos de entrada del formulario
      const inputs = form.querySelectorAll("input, select, textarea");
      let isValid = true;
      let formData = {};

      // Limpiar mensajes anteriores
      resultDiv.innerHTML = "";

      // Validar cada campo
      inputs.forEach(input => {
          if (input.type !== "checkbox" && input.type !== "radio") {
              // Para inputs normales
              if (input.value.trim() === "") {
                  input.classList.add("is-invalid");
                  isValid = false;
              } else {
                  input.classList.remove("is-invalid");
                  formData[input.name] = input.value;
              }
          } else if (input.type === "checkbox" || input.type === "radio") {
              // Para checkboxes y radios
              const group = form.querySelectorAll(`[name="${input.name}"]`);
              const checked = [...group].some(item => item.checked);

              if (!checked) {
                  group.forEach(item => item.classList.add("is-invalid"));
                  isValid = false;
              } else {
                  group.forEach(item => item.classList.remove("is-invalid"));
                  if (!formData[input.name]) formData[input.name] = [];
                  if (input.checked) formData[input.name].push(input.value);
              }
          }
      });

      if (isValid) {
          // Mostrar los datos del formulario en el div `resultDiv`
          resultDiv.innerHTML = "<h3>Información del Formulario</h3>";
          for (let key in formData) {
              resultDiv.innerHTML += `<p><strong>${key}:</strong> ${formData[key]}</p>`;
          }
      } else {
          resultDiv.innerHTML = "<p class='text-danger'>Por favor, complete todos los campos.</p>";
      }
  });
});
