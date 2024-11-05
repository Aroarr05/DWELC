
//Procincia y Municipio

document.addEventListener("DOMContentLoaded", function() {
    const provinciaSelect = document.getElementById("provincia-select");
    const municipioSelect = document.getElementById("municipio-select");

    datosProvincia.provincias[0].provinces.forEach(provincia => {
        const option = document.createElement("option");
        option.value = provincia.label;  
        option.textContent = provincia.label;
        provinciaSelect.appendChild(option);
    });

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
    cargarMunicipios();
});


// Nombre , primer apelliodo y NIF/NIE/PASSPORT tienen que ser validos

function validateFrom(){
    const nombre = document.getElementById("nombre").value.trim();
    const primerApellido = document.getElementById("primer-apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();

    if(nombre === ""){
        alert("El nombre es obligatorio.");
        return;
    }
    if(primerApellido === ""){
        alert("El primer apellido es obligatorio.");
        return;
    }
    if(dni === ""){
        alert("El dni es obligatorio");
        return;
    }
    alert("Formulario exitoso.");
}

document.getElementById("enrollmentForm").addEventListener("submit", function(event) {
    const nombre = document.getElementById("nombre").value.trim();
    const primerApellido = document.getElementById("primer-apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();

    if (nombre === "" || primerApellido === "" || dni === "") {
        event.preventDefault();  // Evita el envío del formulario
        alert("Por favor, complete los campos obligatorios: 'Nombre', 'Primer apellido' y 'NIF/NIE/Pasaporte'.");
    } else {
        alert("Formulario enviado con éxito.");
    }
});


//Persona autorizada y un maximo de 5

const addPerson = () => {
    const nombre = document.getElementById("nombre").value.trim();
    const primerApellido = document.getElementById("primer-apellido").value.trim();
    const segundoApellido = document.getElementById("segundo-apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (validate() && personCount < 5) {
        let person = document.createElement("div");
        let registro = document.createElement("p");
        registro.classList.add("fw-bold");
        registro.textContent = `${nombre} ${primerApellido} ${segundoApellido ? segundoApellido : ""} Dni: ${dni} ${telefono ? "Tlf: " + telefono : ""}`;
        person.appendChild(registro);
        autorithed.appendChild(person);
        personCount++;
        contador.textContent = personCount; // Actualiza el contador visualmente
    } else {
        alert("Por favor, complete todos los campos obligatorios y no exceda el límite de 5 personas.");
    }
};

const removePerson = () => {
    const dni = document.getElementById("dni").value.trim();
    const authorizedPersons = document.querySelectorAll(".authorized-list p");

    authorizedPersons.forEach(p => {
        if (p.textContent.includes(dni)) {
            p.remove();
            personCount--;
            contador.textContent = personCount; // Actualiza el contador visualmente
        }
    });
};

document.getElementById("add-person").addEventListener("click", addPerson);
document.getElementById("remove-person").addEventListener("click", removePerson);