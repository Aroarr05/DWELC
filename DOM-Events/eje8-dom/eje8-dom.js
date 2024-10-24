// Seleccionar la tabla
const tabla = document.getElementById('tablaDinamica');

// Función para agregar una fila al inicio de la tabla
function agregarFilaInicio() {
    const nuevaFila = document.createElement('tr');
    const numColumnas = tabla.rows[0].cells.length; // Número de columnas actuales
    for (let i = 0; i < numColumnas; i++) {
        const nuevaCelda = document.createElement('td');
        nuevaCelda.textContent = `Nueva fila,${i + 1}`;
        nuevaFila.appendChild(nuevaCelda);
    }
    tabla.insertBefore(nuevaFila, tabla.firstChild);
}

// Función para agregar una fila al final de la tabla
function agregarFilaFinal() {
    const nuevaFila = document.createElement('tr');
    const numColumnas = tabla.rows[0].cells.length; // Número de columnas actuales
    for (let i = 0; i < numColumnas; i++) {
        const nuevaCelda = document.createElement('td');
        nuevaCelda.textContent = `Nueva fila,${i + 1}`;
        nuevaFila.appendChild(nuevaCelda);
    }
    tabla.appendChild(nuevaFila);
}

// Función para agregar una columna al inicio de cada fila
function agregarColumnaInicio() {
    for (let i = 0; i < tabla.rows.length; i++) {
        const nuevaCelda = document.createElement('td');
        nuevaCelda.textContent = `${i + 1}, Nueva col`;
        tabla.rows[i].insertBefore(nuevaCelda, tabla.rows[i].firstChild);
    }
}

// Función para agregar una columna al final de cada fila
function agregarColumnaFinal() {
    for (let i = 0; i < tabla.rows.length; i++) {
        const nuevaCelda = document.createElement('td');
        nuevaCelda.textContent = `${i + 1}, Nueva col`;
        tabla.rows[i].appendChild(nuevaCelda);
    }
}

// Asignar los eventos a los botones
document.getElementById('agregarFilaInicioBtn').addEventListener('click', agregarFilaInicio);
document.getElementById('agregarFilaFinalBtn').addEventListener('click', agregarFilaFinal);
document.getElementById('agregarColumnaInicioBtn').addEventListener('click', agregarColumnaInicio);
document.getElementById('agregarColumnaFinalBtn').addEventListener('click', agregarColumnaFinal);
