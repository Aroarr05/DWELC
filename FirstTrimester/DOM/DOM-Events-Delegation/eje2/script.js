//
/*

Make a function that, by means of events and the use of the event object, detects which
element the mouse is over and shows, in some element of the page:
- the current position of the mouse on the screen.
- the element on which it is located and the position within it.
The background colour of the element on which the mouse is located will be changed
and it will be changed again when it exits (uses the toggle method of classList).

*/

// script.js


function handleMouseMove(event) {
  const mousePosition = document.getElementById('mouse-position');
  const elementInfo = document.getElementById('element-info');
  const elementPosition = document.getElementById('element-position');

  mousePosition.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
 
  const targetElement = event.target;
  elementInfo.textContent = targetElement.id || targetElement.className || 'Elemento sin ID';

  const xPos = event.offsetX;
  const yPos = event.offsetY;
  elementPosition.textContent = `X: ${xPos}, Y: ${yPos}`;

  if (event.type === 'mouseenter') {
    targetElement.classList.toggle('highlight');
  }
  if (event.type === 'mouseleave') {
    targetElement.classList.toggle('highlight');
  }
}

const elements = document.querySelectorAll('.element');


elements.forEach(element => {
  element.addEventListener('mouseenter', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseMove);
});
