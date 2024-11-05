document.addEventListener("DOMContentLoaded", function() {
    const nombreInput = document.getElementById("nombre");
    const amountInput = document.getElementById("amount");
    const cardInput = document.getElementById("num-card");
    const codeInput = document.getElementById("code");
    const dateInput = document.getElementById("date");
    const submitButton = document.getElementById("submit");

    // Funciones de validación
    const validateName = (name) => {
        const namePattern = /^[A-Z][a-zA-Z\s]{6,}$/; 
        return namePattern.test(name);
    };

    const validateCardNumber = (cardNumber) => {
        const cardPattern = /^(?:\d{4}[- ]){3}\d{4}$|^\d{16}$/; 
        return cardPattern.test(cardNumber);
    };

    const validateSecurityCode = (code) => {
        const codePattern = /^\d{3}$/; 
        return codePattern.test(code);
    };

    const validateExpirationDate = (date) => {
        const today = new Date();
        const expirationDate = new Date(date);
        return expirationDate > today; 
    };

    const validateAmount = (amount) => {
        const amountPattern = /^\d+(\.\d{1,2})?$/;
        return amountPattern.test(amount);
    };

    // Resaltar el campo activo
    const highlightActiveField = (event) => {
        document.querySelectorAll("input").forEach(input => input.classList.remove("active"));
        event.target.classList.add("active");
    };

    // Función para manejar el evento de salida
    const handleBlur = (event) => {
        if (event.target === nombreInput) {
            // Capitalizar el nombre
            event.target.value = event.target.value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        } else if (event.target === cardInput) {
            // Formatear el número de tarjeta
            const value = event.target.value.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
            event.target.value = value;
        } else if (event.target === dateInput) {
            // Formatear la fecha de expiración
            const value = event.target.value;
            if (value.length === 2) {
                event.target.value = value + '/';
            }
        } else if (event.target === amountInput) {
            // Cambiar el separador decimal
            let value = event.target.value.replace(',', '.');
            if (!value.includes('.')) {
                value += '.00';
            } else if (value.split('.')[1].length < 2) {
                value += '0';
            }
            event.target.value = value;
        }
    };

    // Validar campos al hacer clic en "Submit"
    const validateFields = () => {
        let isValid = true;

        // Limpia los mensajes de error
        document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
        document.querySelectorAll("input").forEach(input => input.classList.remove("error"));

        // Validar nombre
        if (!validateName(nombreInput.value)) {
            isValid = false;
            nombreInput.classList.add("error");
            document.getElementById("name-error").textContent = "El nombre debe contener al menos un nombre y un apellido (mínimo 7 caracteres).";
        }

        // Validar monto
        if (!validateAmount(amountInput.value)) {
            isValid = false;
            amountInput.classList.add("error");
            document.getElementById("amount-error").textContent = "Monto inválido. Debe ser un número con hasta dos decimales.";
        }

        // Validar número de tarjeta
        if (!validateCardNumber(cardInput.value)) {
            isValid = false;
            cardInput.classList.add("error");
            document.getElementById("card-error").textContent = "Número de tarjeta inválido. Debe tener el formato correcto.";
        }

        // Validar código de seguridad
        if (!validateSecurityCode(codeInput.value)) {
            isValid = false;
            codeInput.classList.add("error");
            document.getElementById("code-error").textContent = "El código de seguridad debe contener exactamente 3 números.";
        }

        // Validar fecha de expiración
        if (!validateExpirationDate(dateInput.value)) {
            isValid = false;
            dateInput.classList.add("error");
            document.getElementById("date-error").textContent = "La fecha de expiración no debe ser pasada.";
        }

        return isValid;
    };

    // Manejar el clic en el botón de enviar
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar el envío del formulario
        if (validateFields()) {
            alert("Formulario enviado con éxito."); // Aquí se puede añadir lógica para el envío real
        }
    });

    // Añadir eventos de foco y desenfoque
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focus", highlightActiveField);
        input.addEventListener("blur", handleBlur);
    });
});
