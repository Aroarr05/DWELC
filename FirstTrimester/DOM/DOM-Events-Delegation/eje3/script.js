//
/* 

Creates a table with a single event handler (the same to all rows and cells).
Clicking on one of the cells will display the row and column number and change its
colour to green, if the Ctrl key is held down simultaneously it will change to red and if
Shift is pressed it will change to blue.
All other cells in the same row and column than the target cell will change to some other
colour. The colour of these will be restored when another cell is pressed.
An object will be created, to be displayed somewhere on the page, with the following
properties:
- tag, id and textContent of the target element, a property for each of them will be
created.
- row textContent, a list with the textContent of the cells of the same row
- colum textContent, a list with the textContent of the cells of the same column

*/

document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('#myTable');
  const tagSpan = document.querySelector('#tag');
  const idSpan = document.querySelector('#id');
  const textContentSpan = document.querySelector('#textContent');
  const rowTextSpan = document.querySelector('#rowText');
  const colTextSpan = document.querySelector('#colText');

  function handleCellClick(event) {
    const cell = event.target;

    // Verificar que sea una celda y no el borde de la tabla
    if (cell.tagName !== 'TD') return;

    const rowIndex = cell.parentNode.rowIndex;
    const colIndex = cell.cellIndex;

    // Eliminar las clases previas de color para evitar conflictos
    cell.classList.remove('red', 'blue', 'green');

    // Aplicar el color dependiendo de la tecla presionada
    if (event.ctrlKey) {
      cell.classList.add('red');
    } else if (event.shiftKey) {
      cell.classList.add('blue');
    } else {
      cell.classList.add('green');
    }

    // Resaltar la fila y columna correspondiente
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.cells.length; j++) {
        const currentCell = row.cells[j];
        if (i === rowIndex || j === colIndex) {
          currentCell.classList.add('highlight');
        } else {
          currentCell.classList.remove('highlight');
        }
      }
    }

    // Mostrar la información de la celda seleccionada
    const cellInfo = {
      tag: cell.tagName,
      id: cell.id || 'No tiene ID',
      textContent: cell.textContent,
      rowTextContent: Array.from(cell.parentNode.cells).map(c => c.textContent),
      columnTextContent: Array.from(table.rows).map(row => row.cells[colIndex].textContent)
    };

    tagSpan.textContent = cellInfo.tag;
    idSpan.textContent = cellInfo.id;
    textContentSpan.textContent = cellInfo.textContent;
    rowTextSpan.textContent = cellInfo.rowTextContent.join(', ');
    colTextSpan.textContent = cellInfo.columnTextContent.join(', ');
  }

  table.addEventListener('click', handleCellClick);
});
