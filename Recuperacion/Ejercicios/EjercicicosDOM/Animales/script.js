let animalSeleccionado = null;

const razas = ["Siamens", "Persa", "Ragdoll", "Labrador", "Bulldog", "Husky"];

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos(animals); 
    cargarFormulario(razas);
    document.querySelector("#guardar").addEventListener("click", guardarCambios);
});

// Mostrar datos
function mostrarDatos(data) {
    const tbody = document.querySelector("#animales-list tbody");
    tbody.innerHTML = ""; 
    
    data.forEach((item, index) => {
        const fila = document.createElement("tr");
        fila.dataset.index = index;
        fila.innerHTML = `
            <td>${item.name}</td>
            <td>${item.species}</td>
            <td>${item.foods.likes}</td>
            <td>${item.foods.dislikes}</td>
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
    document.querySelectorAll('.fila-seleccionada').forEach(f => {
        f.classList.remove('fila-seleccionada');
    });

    fila.classList.add("fila-seleccionada");

    const index = fila.dataset.index;
    animalSeleccionado = animals[index];

    mostrarDatosJson();

    document.querySelector("#nombre").value = animalSeleccionado.name;
    document.querySelector("#raza").value = animalSeleccionado.species || "";

    const sexo = animalSeleccionado.sexo || "";
    document.querySelector("#macho").checked = sexo === "macho";
    document.querySelector("#hembra").checked = sexo === "hembra";

    document.querySelector("#peso").value = animalSeleccionado.peso || "";

    const checkboxes = document.querySelectorAll('#revision input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = animalSeleccionado.revison?.includes(cb.nextElementSibling.textContent.trim()) || false;
    });

    document.querySelector("#diagnostico").value = animalSeleccionado.diagnostico || "";
}

// Cargar formulario 
function cargarFormulario (razas){
    const nombreInput = document.querySelector("#nombre");
    nombreInput.readOnly= true;

    const selectRaza = document.querySelector("#raza");
    selectRaza.innerHTML = ' <option value= "">--Raza--</option>'

    razas.forEach(raza =>{
        const option = document.createElement('option');
        option.value = raza;
        option.textContent = raza;
        selectRaza.appendChild(option);
    })
}

function limpiarFormulario() {
    document.querySelector("#nombre").value = "";
    document.querySelector("#raza").value = "";
    document.querySelector("#macho").checked = false;
    document.querySelector("#hembra").checked = false;
    document.querySelector("#peso").value = "";

    const checkboxesRevision = document.querySelectorAll('#revision input[type="checkbox"]');
    checkboxesRevision.forEach(cb => cb.checked = false);

    document.querySelector("#diagnostico").value = "";
}


function guardarCambios(){
    if (!validarFormulario())
    return;

    const raza= document.querySelector("#raza").value;
    const sexoM = document.querySelector("#macho").checked;
    const sexoF = document.querySelector("#hembra").checked;
    const peso = document.querySelector("#peso").value;
    
    const checkboxesRevision = document.querySelectorAll('#revision input[type="checkbox"]');
    const revisionesSeleccionadas = Array.from(checkboxesRevision)
    .filter(cb => cb.checked)
    .map(cb => cb.nextElementSibling.textContent.trim());

    const diagnostico = document.querySelector("#diagnostico").value;

    animalSeleccionado.species = raza;
    animalSeleccionado.sexo = sexoM? "macho":"hembra";
    animalSeleccionado.peso = peso;
    animalSeleccionado.revison = revisionesSeleccionadas;
    animalSeleccionado.diagnostico = diagnostico;

    mostrarDatos(animals);
    mostrarDatosJson ();
    limpiarFormulario();
    animalSeleccionado = null;
}

// Validar
function validarFormulario(){
    const raza = document.querySelector("#raza").value;
    if (!raza){
        alert("Por favor selecciona una raza");
        return false;
    }

    const sexoM = document.querySelector("#macho");
    const sexoF = document.querySelector("#hembra");
    if (!sexoM.checked && !sexoF.checked){
        alert("Por favor seleccione un sexo");
        return false;
    }

    const peso = document.querySelector("#peso").value.trim();
    if(!/^\d{1,3}(\.\d{1,2})?$/.test(peso)){
        alert("Por favor ingresa un peso válido en formato NN.NN");
        return false;
    }

    const checkboxesRevision = document.querySelectorAll('#revision input[type="checkbox"]');
    const seleccionados = Array.from(checkboxesRevision).filter(cb => cb.checked);
    if(seleccionados.length === 0){
        alert("Por favor selecciona una opcion de la revisión");
        return false;
    }

    const diagnostico = document.querySelector("#diagnostico").value.trim();
    if(!diagnostico){
        alert("Por favor escriba el diagnóstico")
        return false;
    }

    return true;
}
