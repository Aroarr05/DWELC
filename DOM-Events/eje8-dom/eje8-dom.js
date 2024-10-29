
const tabla = document.getElementById('tablaDinamica');

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

function agregarColumnaInicio() {
    for (let i = 0; i < tabla.rows.length; i++) {
        const nuevaCelda = document.createElement('td');
        nuevaCelda.textContent = `${i + 1}, Nueva col`;
        tabla.rows[i].insertBefore(nuevaCelda, tabla.rows[i].firstChild);
    }
}

function agregarColumnaFinal() {
    for (let i = 0; i < tabla.rows.length; i++) {
        const nuevaCelda = document.createElement('td');
        nuevaCelda.textContent = `${i + 1}, Nueva col`;
        tabla.rows[i].appendChild(nuevaCelda);
    }
}

document.querySelector('agregarFilaInicioBtn').addEventListener('click', agregarFilaInicio);
document.querySelector('agregarFilaFinalBtn').addEventListener('click', agregarFilaFinal);
document.querySelector('agregarColumnaInicioBtn').addEventListener('click', agregarColumnaInicio);
document.querySelector('agregarColumnaFinalBtn').addEventListener('click', agregarColumnaFinal);
