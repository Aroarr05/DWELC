
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


function validateForm() {
    const nombre = document.getElementById("nombre").value.trim();
    const primerApellido = document.getElementById("primer-apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();

    if (nombre === "") {
        alert("El nombre es obligatorio.");
        return false;
    }
    if (primerApellido === "") {
        alert("El primer apellido es obligatorio.");
        return false;
    }
    if (dni === "") {
        alert("El dni es obligatorio.");
        return false;
    }
    return true;
}


document.getElementById("enrollmentForm").addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault(); 
    } else {
        alert("Formulario enviado con éxito.");
    }
});


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
