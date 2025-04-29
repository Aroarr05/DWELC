let animalSeleccionado = null;

const distintasRazas = {
    gato: ["Siamens", "Persa", "Ragdoll"],
    perro: ["Labrador", "Bulldog", "Husky"]
};

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos(animals); 
    cargarFormulario(animals);
});

// Mostrar datos
function mostrarDatos(data) {
    const tbody = document.querySelector("#animales-list tbody");
    tbody.innerHTML = ""; 

    data.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.name}</td>
            <td>${item.species}</td>
            <td>${item.foods.likes}</td>
            <td>${item.foods.dislikes}</td>
            <td><button id="editar">Editar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

function mostrarDatosJson(){
    document.querySelector("#datos-json").textContent = JSON.stringify(animalSeleccionado, null, 2);
}

// Editar
function editarDatos(){
    const editar = document.querySelector("#editar");
    
    fila.classList.add ("fila-seleccionada");
    
}

// Cargar formulario 
function cargarFormulario (animal){
    document.querySelector("#nombre").value = animal.name;

    const selectRaza = document.querySelector("#raza");
    selectRaza.innerHTML = ' <option value= "">--Raza--</option>'

}

// Validar
function validarFormulario(){

}
