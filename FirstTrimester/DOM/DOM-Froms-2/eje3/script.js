//
/*

The province and town data are obtained from provincias.json.
- The province dropdown will obtain the data dynamically.
- The city dropdown will obtain the data dynamically when selecting a province.
- What can you do to identify the selected city without using the corresponding option
value.
Authorized persons:
- Name and firstname are required.
- NIF/NIE/Passport, must be validated.
- There must be at least one authorized person and at maximum five.
Use a button to display all the indicated data when pressed.

*/

//DATOS DE LAS COMUNIDADES,PROVINCIAS Y LOCALIDAD
document.addEventListener("DOMContentLoaded", () => {
    const comunidadSelect = document.querySelector("#comunidades-select");
    const provinciaSelect = document.querySelector("#municipio-select");
    const localidadSelect = document.querySelector("#localidad-select");

    // Cargar comunidades
    datos.forEach(comunidad => {
        const option = document.createElement("option");
        option.value = comunidad.label;
        option.textContent = comunidad.label;
        comunidadSelect.appendChild(option);
    });

    // Función para cargar provincias
    const cargarProvincias = () => {
        const selectedComunidad = comunidadSelect.value;
        const comunidad = datos.find(c => c.label === selectedComunidad);
        provinciaSelect.innerHTML = "";
        comunidad?.provinces.forEach(provincia => {
            const option = document.createElement("option");
            option.value = provincia.label;
            option.textContent = provincia.label;
            provinciaSelect.appendChild(option);
        });
    };

    // Función para cargar localidades
    const cargarLocalidades = () => {
        const selectedProvincia = provinciaSelect.value;
        const selectedComunidad = comunidadSelect.value;
        const comunidad = datos.find(c => c.label === selectedComunidad);
        localidadSelect.innerHTML = "";
        const provincia = comunidad?.provinces.find(p => p.label === selectedProvincia);
        provincia?.towns.forEach(localidad => {
            const option = document.createElement("option");
            option.value = localidad.label;
            option.textContent = localidad.label;
            localidadSelect.appendChild(option);
        });
    };

    comunidadSelect.addEventListener("change", cargarProvincias);
    provinciaSelect.addEventListener("change", cargarLocalidades);

    let personCount = 1;
    const maxPersons = 6;
    let selectedItem = null;
    let selectedPersonData = null;  // Variable para almacenar los datos de la persona seleccionada

    // Función para añadir persona
    const addPerson = (event) => {
        event.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const primerApellido = document.querySelector("#primer-apellido").value.trim();
        const segundoApellido = document.querySelector("#segundo-apellido").value.trim();
        const dni = document.querySelector("#dni").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();

        if (!nombre || !primerApellido || !dni) {
            alert("Por favor, complete el nombre, primer apellido y el DNI.");
            return;
        }

        if (personCount <= maxPersons) {
            const listaDatos = document.querySelector("#listaDatos");

            const nuevoElemento = document.createElement("li");
            nuevoElemento.classList.add("list-group-item");
            nuevoElemento.innerHTML = `
                <strong>Nombre:</strong> ${nombre} <br>
                <strong>Primer Apellido:</strong> ${primerApellido} <br>
                <strong>Segundo Apellido:</strong> ${segundoApellido} <br>
                <strong>DNI:</strong> ${dni} <br>
                <strong>Teléfono:</strong> ${telefono}
               <button class="btn btn-primary btn-sm float-end edit-btn">Editar</button>
            `;

            // Añadir evento de clic para seleccionar el elemento
            nuevoElemento.addEventListener("click", () => {
                if (selectedItem) {
                    selectedItem.classList.remove("seleccionado");
                }
                nuevoElemento.classList.add("seleccionado");
                selectedItem = nuevoElemento;
                selectedPersonData = { nombre, primerApellido, segundoApellido, dni, telefono };  // Guardar los datos de la persona seleccionada
            });

            // Evento de clic en el botón "Editar"
            nuevoElemento.querySelector(".edit-btn").addEventListener("click", (e) => {
                e.stopPropagation();  // Evitar que el clic también seleccione el elemento
                fillEditForm(selectedPersonData);  // Llenar el formulario de edición con los datos
            });

            listaDatos.appendChild(nuevoElemento);

            // Limpiar el formulario para la próxima entrada
            document.querySelector("#nombre").value = "";
            document.querySelector("#primer-apellido").value = "";
            document.querySelector("#segundo-apellido").value = "";
            document.querySelector("#dni").value = "";
            document.querySelector("#telefono").value = "";

            if (personCount < maxPersons) {
                personCount++;
                document.querySelector(".authorized-person h2").textContent = `${personCount}ª Persona autorizada:`;
            } else {
                alert("Has alcanzado el máximo de 6 personas autorizadas.");
            }
        }
    };

    // Función para rellenar el formulario de edición
    const fillEditForm = (personData) => {
        document.querySelector("#name").value = personData.nombre;
        document.querySelector("#aeplllido1").value = personData.primerApellido;
        document.querySelector("#apellido2").value = personData.segundoApellido;
        document.querySelector("#documento-persona").value = "NIE";  // Asumimos que el tipo de documento es "NIE", puedes hacer esto más dinámico si es necesario
        document.querySelector("#dni-persona").value = personData.dni;
        document.querySelector("#telefono-persona").value = personData.telefono;
    };

    // Función para actualizar los datos de la persona en la lista
    const updatePersonData = (event) => {
        event.preventDefault();

        if (!selectedPersonData) {
            alert("Por favor, selecciona una persona para editar.");
            return;
        }

        const updatedNombre = document.querySelector("#name").value.trim();
        const updatedPrimerApellido = document.querySelector("#aeplllido1").value.trim();
        const updatedSegundoApellido = document.querySelector("#apellido2").value.trim();
        const updatedDni = document.querySelector("#dni-persona").value.trim();
        const updatedTelefono = document.querySelector("#telefono-persona").value.trim();

        // Actualizar la persona seleccionada en la lista
        selectedItem.innerHTML = `
            <strong>Nombre:</strong> ${updatedNombre} <br>
            <strong>Primer Apellido:</strong> ${updatedPrimerApellido} <br>
            <strong>Segundo Apellido:</strong> ${updatedSegundoApellido} <br>
            <strong>DNI:</strong> ${updatedDni} <br>
            <strong>Teléfono:</strong> ${updatedTelefono}
            <button class="btn btn-primary btn-sm float-end edit-btn">Editar</button>
        `;

        // Añadir el evento de editar nuevamente
        selectedItem.querySelector(".edit-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            fillEditForm({
                nombre: updatedNombre,
                primerApellido: updatedPrimerApellido,
                segundoApellido: updatedSegundoApellido,
                dni: updatedDni,
                telefono: updatedTelefono,
            });
        });

        // Limpiar el formulario de edición
        document.querySelector("#name").value = "";
        document.querySelector("#aeplllido1").value = "";
        document.querySelector("#apellido2").value = "";
        document.querySelector("#dni-persona").value = "";
        document.querySelector("#telefono-persona").value = "";

        // Incrementar el contador de personas, pero no cambiar el encabezado si se alcanza el máximo
        if (personCount < maxPersons) {
            personCount++;
            document.querySelector(".authorized-person h2").textContent = `${personCount}ª Persona autorizada:`;
        } else if (personCount === maxPersons) {
            alert("Has alcanzado el máximo de 6 personas autorizadas.");
        }

        // Restablecer los datos de la persona seleccionada
        selectedPersonData = null;
    };

    // Función para eliminar la persona seleccionada en la lista
    const removePerson = () => {
        if (selectedItem) {
            selectedItem.remove();  // Eliminar solo el elemento seleccionado en la lista
            selectedItem = null;  // Restablecer la selección

            // Reducir el contador de personas y actualizar el encabezado
            if (personCount > 1) {
                personCount--;
                document.querySelector(".authorized-person h2").textContent = `${personCount}ª Persona autorizada:`;
            } else {
                document.querySelector(".authorized-person h2").textContent = `1ª Persona autorizada:`;
            }
        } else {
            alert("Por favor, seleccione una persona de la lista para eliminar.");
        }
    };

    // Event listeners para los botones de añadir y actualizar
    document.querySelector("#add-person").addEventListener("click", addPerson);
    document.querySelector("#remove-person").addEventListener("click", removePerson);
    document.querySelector("#editForm").addEventListener("submit", updatePersonData);
});
