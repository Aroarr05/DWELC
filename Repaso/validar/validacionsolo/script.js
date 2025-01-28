document.addEventListener('DOMContentLoaded', function () {
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
            alert('Formulario enviado correctamente.');
            // Aquí puedes enviar el formulario usando AJAX o cualquier método que prefieras
            this.reset();
        }
    });
});
