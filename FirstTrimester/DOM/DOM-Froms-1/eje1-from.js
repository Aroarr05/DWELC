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

const form = document.getElementById('registroForm');
const submitButton = document.getElementById('submitButton');
const resultadoDiv = document.getElementById('resultado');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); 

  const campos = form.querySelectorAll('input, select, textarea');
  let formularioValido = true;
  resultadoDiv.innerHTML = ''; 

  campos.forEach(campo => {
    if (!campo.checkValidity()) {
      campo.classList.add('error'); 
      formularioValido = false;
    } else {
      campo.classList.remove('error');
      resultadoDiv.innerHTML += `<p><strong>${campo.id || campo.name}:</strong> ${campo.value}</p>`;
    }
  });

  if (formularioValido) {
    resultadoDiv.innerHTML = `<h4>Información Registrada:</h4>${resultadoDiv.innerHTML}`;
  }
});
