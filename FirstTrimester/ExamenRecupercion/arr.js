document.addEventListener('DOMContentLoaded', function () {
    const datosIniciales = [
        {
            titulo: "Deporte",
            fecha: "18/18/2025",
            prioridad: "Alta"
        },
        {
            titulo: "Cocinar",
            fecha: "18/16/2025",
            prioridad: "Baja"
        },
        {
            titulo: "danza",
            fecha: "18/18/2025",
            prioridad: "Media"
        }
        
    ];

    let tabla = document.querySelector("#table");
    let datoEditado = null;

    function mostrarDatos() {
        const tablaBody = document.querySelector('#tabla-datos tbody');
        tablaBody.innerHTML = '';

        datosIniciales.forEach((dato, index) => {
            const fila = document.createElement('tr');

            const celdaTitulo = document.createElement('td');
            celdaTitulo.textContent = dato.titulo;
            fila.appendChild(celdaTitulo);

            const celdaFecha = document.createElement('td');
            celdaFecha.textContent = dato.fecha;
            fila.appendChild(celdaFecha);

            const celdaPrioridad = document.createElement('td');
            celdaPrioridad.textContent = dato.prioridad;
            fila.appendChild(celdaPrioridad);

            const celdaAcciones = document.createElement('td');
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', function () {
                editarDato(index);
            });
            celdaAcciones.appendChild(botonEditar);

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', function () {
                eliminarDato(index);
            });

            celdaAcciones.appendChild(botonEliminar);

            fila.appendChild(celdaAcciones);

            tablaBody.appendChild(fila);
        });
    }

    function editarDato(index) {
        const dato = datosIniciales[index];
        document.querySelector('#titulo').value = dato.titulo;
        document.querySelector('#fecha').value = dato.fecha;
        document.querySelector(`input[name="prioridad"][value="${dato.prioridad}"]`).checked = true;

        const boton = document.querySelector('#boton-enviar');
        boton.textContent = 'Actualizar Dato';

        datoEditado = index;
    }

    function eliminarDato(index) {
        alert('¿Quieres eliminar la tarea?.');
        datosIniciales.splice(index, 1);
        mostrarDatos();
    }
    mostrarDatos();

    document.querySelector('#formulario').addEventListener('submit', function (event) {
        event.preventDefault();

        let valido = true;

        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        const titulo = document.querySelector('#titulo').value.trim();
        const tituloRango = /^[A-Za-z]{10}$/;
        if (!tituloRango.test(titulo)) {
            document.querySelector('#error-titulo').textContent = 'El titulo es obligatorio.';
            valido = false;
        }

        const fecha = document.querySelector('#fecha').value;
        if (!fecha) {
            document.querySelector('#error-fecha').textContent = 'Introduce la fechad de nacimiento.';
            valido = false;
        }

        const prioridadSeleccionado = document.querySelector('input[name="prioridad"]:checked');
        if (!prioridadSeleccionado) {
            document.querySelector('#error-prioridad').textContent = 'Por favor, selecciona una prioridad.';
            valido = false;
        }

        if (valido) {

            const nuevoDato = {
                titulo: titulo,
                fecha: fecha,
                prioridad: prioridadSeleccionado.value
            };

            if (datoEditado === null) {
                datosIniciales.push(nuevoDato);
            } else {
                datosIniciales[datoEditado] = nuevoDato;
                datoEditado = null;
            }

            mostrarDatos();

            alert('Formulario procesado correctamente.');
            this.reset();
            document.querySelector('#boton-enviar').textContent = 'Crear Dato';
        }
    });

    document.querySelector('#consola').addEventListener('click', () => {
        console.log(datosIniciales);
    });
 
});