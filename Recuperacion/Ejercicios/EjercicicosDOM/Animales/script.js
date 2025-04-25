
document.addEventListener("DOMContentLoaded",()=>{
    mostrarDatos(animals);
})

//MOSTRAR LOS DATOS 
function mostrarDatos(data){
    const tbody = document.querySelector("#animales-list tbody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${item.name}</td>
        <td>${item.species}</td>
        <td>${item.foods.likes}</td>
        <td>${item.foods.dislikes}</td>
        <td><button id="editar">Editar</button><td>
        `;
        tbody.appendChild(fila);
    });

}