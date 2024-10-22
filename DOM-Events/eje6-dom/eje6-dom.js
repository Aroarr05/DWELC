// Función para crear la tabla con las propiedades dadas
function crearTabla() {
    // Obtener los valores del número de filas, columnas, anchura y altura de las celdas
    let filas = document.getElementById('filas').value;
    let columnas = document.getElementById('columnas').value;
    let anchura = document.getElementById('anchura').value;
    let altura = document.getElementById('altura').value;

    // Validar que todos los campos tengan valores correctos
    if (filas <= 0 || columnas <= 0 || anchura <= 0 || altura <= 0) {
        alert("Por favor, ingresa valores válidos para filas, columnas, anchura y altura.");
        return;
    }

    // Seleccionar el contenedor donde se mostrará la tabla
    let contenedor = document.getElementById('tablaContenedor');

    // Limpiar cualquier tabla existente en el contenedor
    contenedor.innerHTML = '';

    // Crear la tabla
    let tabla = document.createElement('table');

    // Crear las filas y columnas de la tabla
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement('tr');  // Crear una nueva fila
        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement('td');  // Crear una nueva celda
            celda.style.width = anchura + 'px';  // Asignar la anchura de la celda
            celda.style.height = altura + 'px';  // Asignar la altura de la celda
            celda.textContent = `${i + 1},${j + 1}`;  // Agregar contenido a la celda (opcional)
            fila.appendChild(celda);  // Añadir la celda a la fila
        }
        tabla.appendChild(fila);  // Añadir la fila a la tabla
    }

    // Añadir la tabla al contenedor
    contenedor.appendChild(tabla);
}

// Asignar la función al botón de "Generar Tabla"
document.getElementById('generarTablaBtn').addEventListener('click', crearTabla);
