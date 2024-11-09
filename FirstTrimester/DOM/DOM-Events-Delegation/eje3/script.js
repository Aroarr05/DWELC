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



const table = document.getElementById('myTable');
const tagSpan = document.getElementById('tag');
const idSpan = document.getElementById('id');
const textContentSpan = document.getElementById('textContent');
const rowTextSpan = document.getElementById('rowText');
const colTextSpan = document.getElementById('colText');


function handleCellClick(event) {
  const cell = event.target;

  const rowIndex = cell.parentNode.rowIndex;
  const colIndex = cell.cellIndex;

  if (event.ctrlKey) {
    cell.classList.add('red');
  } else if (event.shiftKey) {
    cell.classList.add('blue');
  } else {
    cell.classList.add('green');
  }

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

  const cellInfo = {
    tag: cell.tagName,
    id: cell.id,
    textContent: cell.textContent,
    rowTextContent: Array.from(cell.parentNode.cells).map(c => c.textContent),
    columnTextContent: Array.from(table.rows).map(row => row.cells[colIndex].textContent)
  };

  tagSpan.textContent = cellInfo.tag;
  idSpan.textContent = cellInfo.id || 'No tiene ID';
  textContentSpan.textContent = cellInfo.textContent;
  rowTextSpan.textContent = cellInfo.rowTextContent.join(', ');
  colTextSpan.textContent = cellInfo.columnTextContent.join(', ');
}

table.addEventListener('click', handleCellClick);

