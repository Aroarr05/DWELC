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
