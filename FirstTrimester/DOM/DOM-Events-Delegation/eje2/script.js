//
/*

Make a function that, by means of events and the use of the event object, detects which
element the mouse is over and shows, in some element of the page:
- the current position of the mouse on the screen.
- the element on which it is located and the position within it.
The background colour of the element on which the mouse is located will be changed
and it will be changed again when it exits (uses the toggle method of classList).

*/


document.addEventListener('DOMContentLoaded', () => {
  const mousePosition = document.querySelector('#mouse-position');
  const elementInfo = document.querySelector('#element-info');
  const elementPosition = document.querySelector('#element-position');

  // Función que maneja el movimiento del ratón
  const handleMouseMove = (event) => {
    mousePosition.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;

    const targetElement = event.target;
    elementInfo.textContent = targetElement.id || targetElement.className || 'Elemento sin ID';

    const { offsetX, offsetY } = event; // Desestructuración de las posiciones X y Y
    elementPosition.textContent = `X: ${offsetX}, Y: ${offsetY}`;

    targetElement.classList.toggle('highlight', event.type === 'mouseenter' || event.type === 'mouseleave');
  };

  // Selecciona todos los elementos con la clase .element y les asigna los event listeners
  document.querySelectorAll('.element').forEach((element) => {
    element.addEventListener('mouseenter', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseMove);
  });
});
