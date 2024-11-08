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

