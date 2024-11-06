// Selecciona los elementos de la interfaz donde se mostrará la información
const screenPos = document.getElementById("screen-pos");
const currentElement = document.getElementById("current-element");
const elementPos = document.getElementById("element-pos");

// Función para manejar el evento de entrada del ratón
function onMouseEnter(event) {
  // Cambia el color de fondo del elemento actual
  event.target.classList.toggle("highlight");
}

// Función para manejar el evento de movimiento del ratón
function onMouseMove(event) {
  // Muestra la posición del ratón en la pantalla
  screenPos.textContent = `X: ${event.screenX}, Y: ${event.screenY}`;
  
  // Muestra el nombre del elemento sobre el que está el ratón
  currentElement.textContent = event.target.tagName;

  // Muestra la posición del ratón dentro del elemento
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;
  elementPos.textContent = `X: ${offsetX}, Y: ${offsetY}`;
}

// Función para manejar el evento de salida del ratón
function onMouseLeave(event) {
  // Cambia el color de fondo del elemento al salir
  event.target.classList.toggle("highlight");
}

// Añade los event listeners a todos los elementos con la clase "hoverable"
document.querySelectorAll(".hoverable").forEach(element => {
  element.addEventListener("mouseenter", onMouseEnter);
  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
});