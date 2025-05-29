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

document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('#personTable');
  const editForm = document.querySelector('#editForm');
  const nameInput = document.querySelector('#name');
  const surnameInput = document.querySelector('#surname');
  const ageInput = document.querySelector('#age');
  const emancipatedSelect = document.querySelector('#emancipated');
  let currentRow = null; // Fila seleccionada

  // Manejar el clic en la tabla para cargar los datos en el formulario
  table.addEventListener('click', (event) => {
    const cell = event.target;
    const row = cell.closest('tr');

    const editCount = parseInt(row.dataset.editCount, 10); // Usar dataset para acceder al atributo 'data-edit-count'

    // Verificar si la fila ha sido editada más de tres veces
    if (editCount > 3 && !confirm('Esta fila ha sido editada más de tres veces. ¿Deseas continuar editando?')) return;

    // Cargar los valores de la fila en el formulario
    nameInput.value = row.cells[0].textContent;
    surnameInput.value = row.cells[1].textContent;
    ageInput.value = row.cells[2].textContent;
    emancipatedSelect.value = row.cells[3].textContent.includes('Sí') ? 'true' : 'false';

    currentRow = row;
  });

  // Manejar el envío del formulario
  editForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    if (!currentRow) return; // Si no hay fila seleccionada, no hacer nada

    // Obtener los valores del formulario
    const name = nameInput.value;
    const surname = surnameInput.value;
    const age = ageInput.value;
    const emancipated = emancipatedSelect.value === 'true';

    // Actualizar los valores en la tabla
    currentRow.cells[0].textContent = name;
    currentRow.cells[1].textContent = surname;
    currentRow.cells[2].textContent = age;
    currentRow.cells[3].innerHTML = emancipated ? '<span class="icon-yes">&#10003;</span>' : '<span class="icon-no">&#10007;</span>';

    // Incrementar el contador de ediciones y actualizar el atributo data-edit-count
    const newEditCount = (parseInt(currentRow.dataset.editCount, 10) || 0) + 1;
    currentRow.dataset.editCount = newEditCount;

    // Limpiar el formulario y deseleccionar la fila
    editForm.reset();
    currentRow = null;
  });
});
