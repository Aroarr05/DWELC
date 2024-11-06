// PROVINCIAS Y MUNICIPIO
document.addEventListener("DOMContentLoaded", function() {
    const provinciaSelect = document.getElementById("provincia-select");
    const municipioSelect = document.getElementById("municipio-select");

    if (typeof datosProvincia !== "undefined" && datosProvincia.provincias) {
        datosProvincia.provincias[0].provinces.forEach(provincia => {
            const option = document.createElement("option");
            option.value = provincia.label;
            option.textContent = provincia.label;
            provinciaSelect.appendChild(option);
        });
    }

    function cargarMunicipios() {
        const selectedProvince = provinciaSelect.value;
        municipioSelect.innerHTML = "";  

        const provincia = datosProvincia.provincias[0].provinces.find(p => p.label === selectedProvince);
        if (provincia) {
            provincia.towns.forEach(municipio => {
                const option = document.createElement("option");
                option.value = municipio.label;
                option.textContent = municipio.label;
                municipioSelect.appendChild(option);
            });
        }
    }

    provinciaSelect.addEventListener("change", cargarMunicipios);
});

// Lista de personas autorizadas
function addLista(event){
    event.preventDefault(); // Prevenir que el formulario se envíe para manejar la acción de forma personalizada

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
