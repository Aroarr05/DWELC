//
/*

A field for the amount should be included.
    ● Validation:
Making use of regular expressions create functions to validate the fields listed below.
- Name: must contain at least a first name and a last name, minimum 7 characters.
- Credit Card Number: The parameter must have the correct format of a credit card.
- Security Code: 3 numbers
- Expiration date: It must be checked that the expiration date of the card has not yet
been reached.
Validations will be made when the button is clicked.
Apply a class to highlight fields with errors.
Displays a text below the inputs with errors indicating why the data is not correct.
    ● Events:
- Highlight the active input field.
- Name: when exiting it will be capitalized.
- Credit Card number: every 4 numbers put a space, automatically.
- Expiration date: after two numbers add /, automatically.
- Amount: when exiting it will change the decimal separator, if it is ',', by '.'.
If it does not have any decimals, put '.' and two 00.

*/


// Definir las reglas de validación en un objeto
const validations = {
    amount: {
        keyPress: /\d|\./,
        pattern: /^[1-9]\d*(\.\d{2})?$/,
    },
    card: {
        keyPress: /\d/,
        pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
        max: 19,
        autocomplete: handleCardAutocomplete,
    },
    name: {
        keyPress: /[A-Za-z]|\s/,
        pattern: /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/,
    },
    expiration: {
        keyPress: /\d|\//,
        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
        max: 5,
        autocomplete: handleExpirationAutocomplete,
    },
    csv: {
        keyPress: /\d/,
        pattern: /^\d{3}$/,
        max: 3,
    },
};

// Validación de cada tecla presionada
function handleKeyPress(event) {
    const { id, value, inputType } = event.target;
    const validation = validations[id];

    if (!validation.keyPress.test(value[value.length - 1]) || (validation.max && value.length > validation.max)) {
        event.target.value = value.slice(0, -1);
    }

    if (validation.autocomplete) {
        validation.autocomplete(event);
    }
}

// Validación al perder el foco
function handlePatternValidation(event) {
    const { id, value } = event.target;
    const validation = validations[id];
    const isValid = validation.pattern.test(value) && (!isExpirationField(id) || checkExpirationDate(value));

    updateInputStyle(event.target, isValid);
}

// Verificar si es el campo de expiración
function isExpirationField(id) {
    return id === "expiration";
}

// Actualizar el estilo del campo de entrada según su validez
function updateInputStyle(input, isValid) {
    input.classList.toggle("is-valid", isValid);
    input.classList.toggle("is-invalid", !isValid);
}

// Función para validar la fecha de expiración
function checkExpirationDate(value) {
    const [month, year] = value.split("/").map(Number);
    const today = new Date();
    const currentYear = today.getFullYear() % 100; // Dos últimos dígitos del año

    if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < today.getMonth() + 1)) {
        return false;
    }
    return true;
}

// Autocompletar campo de tarjeta
function handleCardAutocomplete(event) {
    if (!["deleteContentBackward", "deleteContentForward"].includes(event.inputType) &&
        [4, 9, 14].includes(event.target.value.length)) {
        event.target.value += " ";
    }
}

// Autocompletar campo de expiración
function handleExpirationAutocomplete(event) {
    if (!["deleteContentBackward", "deleteContentForward"].includes(event.inputType) &&
        event.target.value.length === 2) {
        event.target.value += "/";
    }
}

// Asignar los eventos a los campos de entrada
function assignValidationEvents() {
    document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", handleKeyPress);
        input.addEventListener("blur", handlePatternValidation);
    });
}

// Inicializar las validaciones al cargar la página
assignValidationEvents();