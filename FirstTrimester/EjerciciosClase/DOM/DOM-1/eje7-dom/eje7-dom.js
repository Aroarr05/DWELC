
function crearTabla() {
    let filas = document.querySelector('#filas').value;
    let columnas = document.querySelector('#columnas').value;
    let anchura = document.querySelector('#anchura').value;
    let altura = document.querySelector('#altura').value;

    // Validar que los valores sean mayores que 0
    if (filas <= 0 || columnas <= 0 || anchura <= 0 || altura <= 0) {
        alert("Por favor, ingresa valores válidos para filas, columnas, anchura y altura.");
        return;
    }

    let contenedor = document.querySelector('#tablaContenedor');
    contenedor.innerHTML = '';  // Limpiar el contenido previo

    let tabla = document.createElement('table');

    for (let i = 0; i < filas; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement('td');
            celda.style.width = anchura + 'px';
            celda.style.height = altura + 'px';
            celda.textContent = `${i + 1},${j + 1}`;

            // Agregar clase según si la columna es par o impar
            if ((j + 1) % 2 === 0) {
                celda.classList.add('columna-par');
            } else {
                celda.classList.add('columna-impar');
            }

            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    contenedor.appendChild(tabla);
}

// Cambiar a querySelector con el selector correcto para el botón
document.querySelector('#generarTablaBtn').addEventListener('click', crearTabla);
