let animalSeleccionado = null;
const distintasRazas = {
    gato: ["Siamens", "Persa", "Ragdoll"],
    perro: ["Labrador", "Bulldog", "Husky"]
};

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos(animals); 
});

function mostrarDatos(data) {
    const tbody = document.querySelector("#animales-list tbody");
    tbody.innerHTML = ""; 

    data.forEach((item, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.name}</td>
            <td>${item.species}</td>
            <td>${item.foods.likes}</td>
            <td>${item.foods.dislikes}</td>
            <td><button class="editar" data-index="${index}">Editar</button></td>
        `;
        tbody.appendChild(fila);
    });

    /*tbody.addEventListener("click", (e) => {
        if (e.target.classList.contains("editar")) {
            const index = e.target.getAttribute("data-index");
            cargarFormulario(animals[index]);
        }
        
        if (e.target.closest('tr') && !e.target.classList.contains('editar')) {
            const filaActual = e.target.closest('tr');
            destacarFila(filaActual);
        }
    });*/
}

/*function cargarFormulario(animals) {
    document.querySelector("#nombre").value = animals.name;
    document.querySelector("#especie").value = animals.species;
    document.querySelector("#likes").value = animals.foods.likes;
    document.querySelector("#dislikes").value = animals.foods.dislikes;
}*/

/*let filaAnteriorSeleccionada = null;

function destacarFila(filaActual) {
    if (filaAnteriorSeleccionada) {
        filaAnteriorSeleccionada.classList.remove("fila-seleccionada");
    }
    
    filaActual.classList.add("fila-seleccionada");
    filaAnteriorSeleccionada = filaActual;
}*/
