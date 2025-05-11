let animalSeleccionado = null;

const razasGato = ["Siamens", "Persa", "Ragdoll"];
const razasPerro = ["Labrador", "Bulldog", "Husky"];

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos(animals); 
    cargarFormulario();  
    document.querySelector("#guardar").addEventListener("click", guardarCambios);
});

// Mostrar datos en la tabla
function mostrarDatos(data) {
    const tbody = document.querySelector("#animales-list tbody");
    tbody.innerHTML = ""; 
    
    data.forEach((item, index) => {
        const fila = document.createElement("tr");
        fila.dataset.index = index;
        fila.innerHTML = `
            <td>${item.name}</td>
            <td>${item.raza || ""}</td>
            <td>${item.foods?.likes || ""}</td>
            <td>${item.foods?.dislikes || ""}</td>
            <td><button class="editar-btn">Editar</button></td>
        `;
        tbody.appendChild(fila);
    });

    document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const fila = this.closest('tr');
            editarDatos(fila);
        });
    });
}

function mostrarDatosJson(){
    document.querySelector("#datos-json").textContent = JSON.stringify(animalSeleccionado, null, 2);
}

function editarDatos(fila) {
    document.querySelectorAll('.fila-seleccionada').forEach(f => f.classList.remove('fila-seleccionada'));
    fila.classList.add("fila-seleccionada");

    const index = fila.dataset.index;
    animalSeleccionado = animals[index];

    mostrarDatosJson();

    document.querySelector("#nombre").value = animalSeleccionado.name;
    document.querySelector("#macho").checked = animalSeleccionado.sexo === "macho";
    document.querySelector("#hembra").checked = animalSeleccionado.sexo === "hembra";
    document.querySelector("#peso").value = animalSeleccionado.peso || "";

    const checkboxes = document.querySelectorAll('#revision input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = animalSeleccionado.revision?.includes(cb.nextElementSibling.textContent.trim()) || false;
    });

    document.querySelector("#diagnostico").value = animalSeleccionado.diagnostico || "";

    cargarFormulario(animalSeleccionado.species);

    document.querySelector("#raza").value = animalSeleccionado.raza || "";
}


// Cargar formulario
function cargarFormulario(especie) {
    const nombreInput = document.querySelector("#nombre");
    nombreInput.readOnly = true;

    const selectRaza = document.querySelector("#raza");
    selectRaza.innerHTML = '<option value="">--Raza--</option>';

    let razas = [];
    if (especie === "cat") {
        razas = razasGato;
    } else if (especie === "dog") {
        razas = razasPerro;
    }

    razas.forEach(raza => {
        const option = document.createElement("option");
        option.value = raza;
        option.textContent = raza;
        selectRaza.appendChild(option);
    });
}

function limpiarFormulario() {
    document.querySelector("#nombre").value = "";
    document.querySelector("#raza").innerHTML = '<option value="">--Raza--</option>';
    document.querySelector("#macho").checked = false;
    document.querySelector("#hembra").checked = false;
    document.querySelector("#peso").value = "";
    document.querySelector("#diagnostico").value = "";

    const checkboxesRevision = document.querySelectorAll('#revision input[type="checkbox"]');
    checkboxesRevision.forEach(cb => cb.checked = false);

    document.querySelectorAll('.fila-seleccionada').forEach(f => f.classList.remove('fila-seleccionada'));
}

// Guardar cambios
function guardarCambios(){
    if (!validarFormulario()) return;

    const raza = document.querySelector("#raza").value;
    const sexo = document.querySelector("#macho").checked ? "macho" : "hembra";
    const peso = document.querySelector("#peso").value;
    
    const checkboxesRevision = document.querySelectorAll('#revision input[type="checkbox"]');
    const revisionesSeleccionadas = Array.from(checkboxesRevision)
        .filter(cb => cb.checked)
        .map(cb => cb.nextElementSibling.textContent.trim());

    const diagnostico = document.querySelector("#diagnostico").value;

    animalSeleccionado.raza = raza;
    animalSeleccionado.sexo = sexo;
    animalSeleccionado.peso = peso;
    animalSeleccionado.revision = revisionesSeleccionadas;
    animalSeleccionado.diagnostico = diagnostico;

    mostrarDatos(animals);
    mostrarDatosJson();
    limpiarFormulario();
    animalSeleccionado = null;
}

// Validación
function validarFormulario(){
    const raza = document.querySelector("#raza").value;
    if (!raza) {
        alert("Por favor selecciona una raza");
        return false;
    }

    const sexoM = document.querySelector("#macho");
    const sexoF = document.querySelector("#hembra");
    if (!sexoM.checked && !sexoF.checked) {
        alert("Por favor seleccione un sexo");
        return false;
    }

    const peso = document.querySelector("#peso").value.trim();
    if (!/^\d{1,3}(\.\d{1,2})?$/.test(peso)) {
        alert("Por favor ingresa un peso válido en formato NN.NN");
        return false;
    }

    const checkboxesRevision = document.querySelectorAll('#revision input[type="checkbox"]');
    const seleccionados = Array.from(checkboxesRevision).filter(cb => cb.checked);
    if (seleccionados.length === 0) {
        alert("Por favor selecciona al menos una opción de revisión");
        return false;
    }

    const diagnostico = document.querySelector("#diagnostico").value.trim();
    if (!diagnostico) {
        alert("Por favor escribe el diagnóstico");
        return false;
    }

    return true;
}
