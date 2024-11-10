
function crearTabla() {

    let filas = document.querySelector('#filas').value;
    let columnas = document.querySelector('#columnas').value;
    let anchura = document.querySelector('#anchura').value;
    let altura = document.querySelector('#altura').value;

    if (filas <= 0 || columnas <= 0 || anchura <= 0 || altura <= 0) {
        alert("Ingresa valores válidos para filas, columnas, anchura y altura.");
        return;
    }

    let contenedor = document.querySelector('#tablaContenedor');
    contenedor.innerHTML = '';

    let tabla = document.createElement('table');

    for (let i = 0; i < filas; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement('td');
            celda.style.width = anchura + 'px';
            celda.style.height = altura + 'px';
            celda.textContent = `${i + 1},${j + 1}`;
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    contenedor.appendChild(tabla);
}

document.querySelector('#generarTablaBtn').addEventListener('click', crearTabla);
