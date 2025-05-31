
let datoEditado = null;

document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos();
});

function mostrarDatos() {
    const tablaBody = document.querySelector('#tabla-datos tbody');
    tablaBody.innerHTML = '';

    datos.forEach((dato, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.titulo}</td>
            <td>${dato.fecha}</td>
            <td>${dato.prioridad}</td>
            <td>
                <button onclick="editarDatos(${index})">Editar</button>
                <button onclick="eliminarDatos(${index})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

function editarDatos(index) {
    const dato = datos[index];
    document.querySelector('#titulo').value = dato.titulo;
    document.querySelector('#fecha').value = dato.fecha;
    document.querySelector(`input[name="prioridad"][value="${dato.prioridad}"]`).checked = true;

    const boton = document.querySelector('#boton-enviar');
    boton.textContent = 'Actualizar Dato';
    datoEditado = index;
}

function eliminarDatos(index) {
    if (confirm('¿Quieres eliminar la tarea?')) {
        datos.splice(index, 1);
        mostrarDatos();
    }
}

function validarDocumento(tipo, valor) {
    if (tipo === "titulo") {
        valor = valor.trim().toUpperCase();
        if (!/^[A-Za-z]{10}$/.test(valor)) {
            return "El título debe tener exactamente 10 letras (sin espacios ni números).";
        }
    }

    if (tipo === "fecha") {
        if (!valor || valor.trim() === "") {
            return "La fecha es obligatoria.";
        }
    }

    if (tipo === "prioridad") {
        if (!valor) {
            return "Debe seleccionar una prioridad.";
        }
    }

    return "";
}

document.querySelector('#formulario').addEventListener('submit', function (event) {
    event.preventDefault();
    let valido = true;
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const titulo = document.querySelector('#titulo').value;
    const fecha = document.querySelector('#fecha').value;
    const prioridadSeleccionado = document.querySelector('input[name="prioridad"]:checked');

    const errorTitulo = validarDocumento("titulo", titulo);
    const errorFecha = validarDocumento("fecha", fecha);
    const errorPrioridad = validarDocumento("prioridad", prioridadSeleccionado ? prioridadSeleccionado.value : null);

    if (errorTitulo) {
        document.querySelector('#error-titulo').textContent = errorTitulo;
        valido = false;
    }

    if (errorFecha) {
        document.querySelector('#error-fecha').textContent = errorFecha;
        valido = false;
    }

    if (errorPrioridad) {
        document.querySelector('#error-prioridad').textContent = errorPrioridad;
        valido = false;
    }

    if (valido) {
        const nuevoDato = {
            titulo: titulo.trim(),
            fecha: fecha,
            prioridad: prioridadSeleccionado.value
        };

        if (datoEditado === null) {
            datos.push(nuevoDato);
        } else {
            datos[datoEditado] = nuevoDato;
            datoEditado = null;
        }

        mostrarDatos();
        alert('Formulario procesado correctamente.');
        this.reset();
        document.querySelector('#boton-enviar').textContent = 'Añadir Tarea';
    }
});

document.querySelector('#consola').addEventListener('click', () => {
    console.log(datos);
});
