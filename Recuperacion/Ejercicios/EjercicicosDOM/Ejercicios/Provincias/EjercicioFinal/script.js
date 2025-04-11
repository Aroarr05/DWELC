let listaDatos = [];


document.addEventListener("DOMContentLoaded", ()=>{


    
    cargarDatos("../../assets/json/provincias.json");
    console.log(listaDatos);
})

function cargarDatos (url){
    fetch(url)
    .then(response =>response.json())
    .then(data =>{
        listaDatos =  data.provincias;
    })
    .catch(error => console.error("Error al cargar datos:", error))
}

// recorro todo el froreal y solo selecionelo lo que quiero 
// centro 
// hacer un mapa