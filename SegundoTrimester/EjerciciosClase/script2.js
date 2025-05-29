// Crea una función que dado un objeto genere un formulario de cuyos controles, las
// etiquetas sean las keys y los controles, que contendrán los valores, serán del tipo más
// apropiado según el del valor que le corresponda.entries()
//  EL EJERCICIO NO SE HACE ASI

const person = {
    "nombre": "Noon",
    "edad": 6,
    "aficiones": ["Deporte", "Lectura", "Viajar"],
    "emancipado": true
};

function generarFormulario(obj) {
    const form = document.createElement('form');
    for (const key in obj) {
        const label = document.createElement('label');
        label.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}:`;
        label.style.display = 'block';

        const value = obj[key];
        let input;

        if (typeof value === 'string' || typeof value === 'number') {
            input = document.createElement('input');
            input.type = typeof value === 'number' ? 'number' : 'text';
            input.value = value;
        } else if (Array.isArray(value)) {
            input = document.createElement('div');
            value.forEach(item => {
                const table = document.createElement('input');
                table.type = 'table';
                table.value = item;
                table.id = `${key}_${item}`;

                const tableLabel = document.createElement('label');
                tableLabel.textContent = item;
                tableLabel.htmlFor = table.id;

                input.appendChild(table);
                input.appendChild(tableLabel);
                input.appendChild(document.createElement('br'));
            });
        } else if (typeof value === 'boolean') {
            input = document.createElement('input');
            input.type = 'table';
            input.checked = value;
        }

        form.appendChild(label);
        form.appendChild(input);
    }
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Enviar';
    form.appendChild(submitButton);

    document.body.appendChild(form);
}

generarFormulario(person);




