//
/* 

Based on the previous exercise, delegation of events in a table:
- The table will show people's data: name, surname, age and an icon to indicate
emancipation or not.
- Add a form to the page with a control for each of the person data.
- Clicking on a cell in the table will load the values of the row into the corresponding
fields of the form.
- Data in the form can be modified and will be updated in the table

*/

const table = document.getElementById('personTable');
const editForm = document.getElementById('editForm');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const ageInput = document.getElementById('age');
const emancipatedSelect = document.getElementById('emancipated');
let currentRow = null; // Fila seleccionada


table.addEventListener('click', function(event) {
  const cell = event.target;
  const row = cell.closest('tr');

  const editCount = parseInt(row.getAttribute('data-edit-count'), 10);
  if (editCount > 3 && !confirm('Esta fila ha sido editada más de tres veces. ¿Deseas continuar editando?')) {
    return; 
  }

  nameInput.value = row.cells[0].textContent;
  surnameInput.value = row.cells[1].textContent;
  ageInput.value = row.cells[2].textContent;
  emancipatedSelect.value = row.cells[3].textContent.includes('Sí') ? 'true' : 'false';

 
  currentRow = row;
});

// Manejar el envío del formulario
editForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe

  if (!currentRow) return; // Si no hay fila seleccionada, no hacer nada

  // Obtener los valores del formulario
  const name = nameInput.value;
  const surname = surnameInput.value;
  const age = ageInput.value;
  const emancipated = emancipatedSelect.value === 'true';

  // Actualizar la tabla con los nuevos datos
  currentRow.cells[0].textContent = name;
  currentRow.cells[1].textContent = surname;
  currentRow.cells[2].textContent = age;
  currentRow.cells[3].innerHTML = emancipated ? '<span class="icon-yes">&#10003;</span>' : '<span class="icon-no">&#10007;</span>';

  // Incrementar el contador de ediciones
  const newEditCount = parseInt(currentRow.getAttribute('data-edit-count'), 10) + 1;
  currentRow.setAttribute('data-edit-count', newEditCount);

  // Limpiar el formulario y deseleccionar la fila
  editForm.reset();
  currentRow = null;
});
