document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales en JSON
    const datosIniciales = [
        {
            nombre: "Juan Pérez",
            email: "juan.perez@example.com",
            telefono: "1234567890",
            password: "password123",
            genero: "masculino"
        },
        {
            nombre: "María López",
            email: "maria.lopez@example.com",
            telefono: "9876543210",
            password: "mypass456",
            genero: "femenino"
        },
        {
            nombre: "Carlos Gómez",
            email: "carlos.gomez@example.com",
            telefono: "1122334455",
            password: "securepass789",
            genero: "masculino"
        }
    ];

    let usuarioEditar = null; // Para saber qué usuario estamos editando

    // Función para mostrar los datos en la tabla
    function mostrarDatos() {
        const tablaBody = document.querySelector('#tabla-datos tbody');
        tablaBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

        // Recorrer los datos y agregar filas a la tabla
        datosIniciales.forEach((usuario, index) => {
            const fila = document.createElement('tr');

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = usuario.nombre;
            fila.appendChild(celdaNombre);

            const celdaEmail = document.createElement('td');
            celdaEmail.textContent = usuario.email;
            fila.appendChild(celdaEmail);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = usuario.telefono;
            fila.appendChild(celdaTelefono);

            const celdaPassword = document.createElement('td');
            celdaPassword.textContent = usuario.password; // Nota: por seguridad, no es recomendable mostrar la contraseña
            fila.appendChild(celdaPassword);

            const celdaGenero = document.createElement('td');
            celdaGenero.textContent = usuario.genero;
            fila.appendChild(celdaGenero);

            // Botón de editar
            const celdaAcciones = document.createElement('td');
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', function() {
                editarUsuario(index);
            });
            celdaAcciones.appendChild(botonEditar);

            // Botón de eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', function() {
                eliminarUsuario(index);
            });
            celdaAcciones.appendChild(botonEliminar);

            fila.appendChild(celdaAcciones);

            tablaBody.appendChild(fila);
        });
    }

    // Función para editar un usuario
    function editarUsuario(index) {
        const usuario = datosIniciales[index];
        document.querySelector('#nombre').value = usuario.nombre;
        document.querySelector('#email').value = usuario.email;
        document.querySelector('#telefono').value = usuario.telefono;
        document.querySelector('#password').value = usuario.password;
        document.querySelector('#confirmar-password').value = usuario.password;
        document.querySelector(`input[name="genero"][value="${usuario.genero}"]`).checked = true;

        // Cambiar el texto del botón
        const boton = document.querySelector('#boton-enviar');
        boton.textContent = 'Actualizar Usuario';

        // Guardar el índice del usuario a editar
        usuarioEditar = index;
    }

    // Función para eliminar un usuario
    function eliminarUsuario(index) {
        datosIniciales.splice(index, 1);
        mostrarDatos();
    }

    // Llamar a la función para mostrar los datos al cargar la página
    mostrarDatos();

    // Event listener para el formulario
    document.querySelector('#formulario').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío del formulario

        let valido = true;

        // Limpiar mensajes de error
        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        // Validar nombre
        const nombre = document.querySelector('#nombre').value.trim();
        if (nombre === '') {
            document.querySelector('#error-nombre').textContent = 'El nombre es obligatorio.';
            valido = false;
        }

        // Validar email
        const email = document.querySelector('#email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.querySelector('#error-email').textContent = 'Introduce un correo electrónico válido.';
            valido = false;
        }

        // Validar teléfono
        const telefono = document.querySelector('#telefono').value.trim();
        const telefonoRegex = /^[0-9]{10}$/; // Acepta solo 10 dígitos
        if (!telefonoRegex.test(telefono)) {
            document.querySelector('#error-telefono').textContent = 'Introduce un número de teléfono válido (10 dígitos).';
            valido = false;
        }

        // Validar contraseña
        const password = document.querySelector('#password').value;
        if (password.length < 6) {
            document.querySelector('#error-password').textContent = 'La contraseña debe tener al menos 6 caracteres.';
            valido = false;
        }

        // Confirmar contraseña
        const confirmarPassword = document.querySelector('#confirmar-password').value;
        if (password !== confirmarPassword) {
            document.querySelector('#error-confirmar-password').textContent = 'Las contraseñas no coinciden.';
            valido = false;
        }

        // Validar género
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
        if (!generoSeleccionado) {
            document.querySelector('#error-genero').textContent = 'Por favor, selecciona un género.';
            valido = false;
        }

        if (valido) {
            // Si es un nuevo usuario, agregarlo
            const nuevoUsuario = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                password: password, // De nuevo, por seguridad, no se debe mostrar
                genero: generoSeleccionado.value
            };

            if (usuarioEditar === null) {
                datosIniciales.push(nuevoUsuario); // Agregar el nuevo usuario a los datos iniciales
            } else {
                datosIniciales[usuarioEditar] = nuevoUsuario; // Actualizar el usuario
                usuarioEditar = null; // Limpiar la referencia
            }

            mostrarDatos(); // Mostrar los datos actualizados en la tabla

            alert('Formulario procesado correctamente.');
            this.reset(); // Limpiar formulario
            document.querySelector('#boton-enviar').textContent = 'Crear Usuario'; // Restablecer texto del botón
        }
    });
});
