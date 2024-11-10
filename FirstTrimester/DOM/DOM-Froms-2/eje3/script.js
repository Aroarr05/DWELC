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

document.addEventListener("DOMContentLoaded", () => {
    const comunidadSelect = document.querySelector("#Comunidad-select");
    const provinciaSelect = document.querySelector("#provincia-select");
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
        provinciaSelect.innerHTML = ""; // Limpiar provincias anteriores
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
        localidadSelect.innerHTML = ""; // Limpiar localidades anteriores
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

    // Variables para controlar el número de personas
    let personCount = 0;
    const maxPersons = 5;

    // Agregar persona autorizada
    const addLista = (event) => {
        event.preventDefault();

        // Si ya hay 5 personas, no se puede agregar más
        if (personCount >= maxPersons) {
            alert("No puedes añadir más de 5 personas.");
            return;
        }

        const nombre = document.querySelector("#nombre").value.trim();
        const primerApellido = document.querySelector("#primer-apellido").value.trim();
        const segundoApellido = document.querySelector("#segundo-apellido").value.trim();
        const dni = document.querySelector("#dni").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();

        // Validar campos
        if (!nombre || !primerApellido || !dni) {
            alert("Por favor, complete el nombre, primer apellido y el DNI.");
            return;
        }

        const listaDatos = document.querySelector("#listaDatos");

        // Crear un nuevo <li> con los datos y un botón de editar
        const nuevoElemento = document.createElement("li");
        nuevoElemento.classList.add("list-group-item");
        nuevoElemento.innerHTML = `
            <strong>Nombre:</strong> ${nombre} <br>
            <strong>Primer Apellido:</strong> ${primerApellido} <br>
            <strong>Segundo Apellido:</strong> ${segundoApellido} <br>
            <strong>DNI:</strong> ${dni} <br>
            <strong>Teléfono:</strong> ${telefono} 
            <button class="btn btn-primary btn-sm float-right editar-persona">Editar</button>
        `;

        listaDatos.appendChild(nuevoElemento);
        document.querySelector("#enrollmentForm").reset();

        // Aumentar el contador de personas
        personCount++;
    };

    // Función para eliminar una persona de la lista
    const eliminarPersona = (event) => {
        if (event.target.id === "remove-person") {
            const personas = document.querySelectorAll(".authorized-person");
            if (personas.length > 1) {
                // Eliminar la última persona agregada
                personas[personas.length - 1].remove();
                personCount--;
            } else {
                alert("Debe haber al menos una persona autorizada.");
            }
        }
    };

    // Escuchar el evento de clic para eliminar personas
    document.querySelector("#remove-person").addEventListener("click", eliminarPersona);

    // Resaltar persona seleccionada
    let selectedElement = null;

    const resaltarPersona = (event) => {
        // Eliminar la clase 'seleccionado' de cualquier elemento previamente seleccionado
        if (selectedElement) {
            selectedElement.classList.remove("seleccionado");
        }

        // Resaltar el nuevo elemento
        selectedElement = event.target.closest("li");
        selectedElement.classList.add("seleccionado");
    };

    // Escuchar el evento de clic para resaltar
    document.querySelector("#listaDatos").addEventListener("click", resaltarPersona);

    // Función para editar una persona
    const editarPersona = (event) => {
        if (event.target.classList.contains("editar-persona")) {
            const liElemento = event.target.closest("li");
            const nombre = liElemento.querySelector("strong:nth-of-type(1) + br").previousElementSibling.textContent.split(":")[1].trim();
            const primerApellido = liElemento.querySelector("strong:nth-of-type(2) + br").previousElementSibling.textContent.split(":")[1].trim();
            const segundoApellido = liElemento.querySelector("strong:nth-of-type(3) + br").previousElementSibling.textContent.split(":")[1].trim();
            const dni = liElemento.querySelector("strong:nth-of-type(4) + br").previousElementSibling.textContent.split(":")[1].trim();
            const telefono = liElemento.querySelector("strong:nth-of-type(5) + br").previousElementSibling.textContent.split(":")[1].trim();

            // Prellenar el formulario de edición con los datos de la persona
            document.querySelector("#nombre").value = nombre;
            document.querySelector("#primer-apellido").value = primerApellido;
            document.querySelector("#segundo-apellido").value = segundoApellido;
            document.querySelector("#dni").value = dni;
            document.querySelector("#telefono").value = telefono;

            // Eliminar el li actual
            liElemento.remove();

            // Reducir el contador de personas
            personCount--;
        }
    };

    // Escuchar el evento de clic en el botón de editar
    document.querySelector("#listaDatos").addEventListener("click", editarPersona);

    // Agregar evento al botón de añadir persona
    document.querySelector("#enrollmentForm").addEventListener("submit", addLista);
});
