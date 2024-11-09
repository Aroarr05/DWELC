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

document.addEventListener("DOMContentLoaded", function() {
    const provinciaSelect = document.getElementById("provincia-select");
    const municipioSelect = document.getElementById("municipio-select");
    const localidadSelect = document.getElementById("localidad-select");

  
    if (Array.isArray(datos) && datos.length > 0 && datos[0].provinces) {
        datos[0].provinces.forEach(provincia => {
            const option = document.createElement("option");
            option.value = provincia.label;
            option.textContent = provincia.label;
            provinciaSelect.appendChild(option);
        });
    }


    localidadSelect.innerHTML = "<option value=''>Selecciona una localidad</option>";


    function cargarMunicipios() {
        const selectedProvince = provinciaSelect.value;
        municipioSelect.innerHTML = "<option value=''>Selecciona un municipio</option>"; // Limpiar municipios

        const provincia = datos[0].provinces.find(p => p.label === selectedProvince);
        if (provincia) {
            provincia.towns.forEach(municipio => {
                const option = document.createElement("option");
                option.value = municipio.label;
                option.textContent = municipio.label;
                municipioSelect.appendChild(option);
            });
        }

        localidadSelect.innerHTML = "<option value=''>Selecciona una localidad</option>";
    }

    function cargarLocalidades() {
        const selectedMunicipio = municipioSelect.value;
        localidadSelect.innerHTML = "<option value=''>Selecciona una localidad</option>";  // Limpiar localidades

        if (selectedMunicipio) {
            const selectedProvince = provinciaSelect.value;
            const provincia = datos[0].provinces.find(p => p.label === selectedProvince);
            if (provincia) {
                const municipio = provincia.towns.find(town => town.label === selectedMunicipio);
                if (municipio && municipio.localities) { // Asegurarse de que las localidades existan
                    municipio.localities.forEach(localidad => {
                        const option = document.createElement("option");
                        option.value = localidad.label;
                        option.textContent = localidad.label;
                        localidadSelect.appendChild(option);
                    });
                }
            }
        }
    }

    
    provinciaSelect.addEventListener("change", function() {
        cargarMunicipios();  
    });
    municipioSelect.addEventListener("change", function() {
        cargarLocalidades();  
    });
});


function addLista(event){
    event.preventDefault(); 

    const nombre = document.getElementById("nombre").value.trim();
    const primerApellido = document.getElementById("primer-apellido").value.trim();
    const segundoApellido = document.getElementById("segundo-apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    // Validar que los campos necesarios no estén vacíos
    if (!nombre || !primerApellido || !dni) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const listaDatos = document.getElementById("listaDatos");

    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = `Nombre: ${nombre}, Primer Apellido: ${primerApellido}, Segundo Apellido: ${segundoApellido}, DNI: ${dni}, Teléfono: ${telefono}`;

    listaDatos.appendChild(nuevoElemento);

    document.getElementById("enrollmentForm").reset();
}

// Manejar el envío del formulario para agregar la persona a la lista
document.getElementById("enrollmentForm").addEventListener("submit", addLista);

// AGRAGAR HASTA 5 PERSONAS CON EL BOTÓN
// QUITAR PERSONAS CON EL BOTÓN
let personCount = 1;
const maxPersons = 5;

const addPerson = () => {
    if (personCount >= maxPersons) {
        alert("No puedes añadir más de 5 personas.");
        return;
    }

    const originalPerson = document.querySelector(".authorized-person");
    const newPerson = originalPerson.cloneNode(true);

    newPerson.querySelectorAll("input").forEach(input => input.value = "");
    newPerson.querySelector("h1").textContent = `${++personCount}ª Persona autorizada:`;

    originalPerson.parentNode.appendChild(newPerson);
};

const removePerson = () => {
    if (personCount > 1) {
        const persons = document.querySelectorAll(".authorized-person");
        persons[persons.length - 1].remove();
        personCount--;
    } else {
        alert("Debe haber al menos una persona autorizada.");
    }
};

document.getElementById("add-person").addEventListener("click", addPerson);
document.getElementById("remove-person").addEventListener("click", removePerson);
