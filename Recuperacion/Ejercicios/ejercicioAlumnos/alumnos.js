document.addEventListener("DOMContentLoaded", ()=>{
    fetch("../../assets/json/alumnos.json")
        .then(response => response.json())
        .then(data => {
            cargarOpciones();
            manejarFiltros(data);
            mostrarDatos(data)
        })
        .catch(error => console.error ("Error al cargar el Json", error));    
})

let alumnosDatos = [];

function cargarOpciones(){
    const opciones = [ "Comenzar por", "Terminar en", "Contiene", "Igual a", "Está vacío", "Está relleno"];
    const selects = document.querySelectorAll("select");

    selects.forEach(select =>{
        opciones.forEach(opcion => {
            let opt = document.createElement ("option");
            opt.value = opcion.toLowerCase().replace(" ", "_");
            opt.textContent=opcion;
            select.appendChild(opt);
        })
    })
}

function manejarFiltros(){
    document.querySelectorAll("select"). forEach(select =>{
        select.addEventListener("change",(event) =>{
            const input1 = event.target.nextElementSibling.nextElementSibling;
            const input2 = input1.nextElementSibling.nextElementSibling;
            if (event.target.value === "esta_vacio"|| event.target.value==="esta_relleno"){
                input1.disabled = true;
                input2.disabled = true;
            }else{
                input1.disabled = false;
                input2.disabled = false;
            }
        })
    })
}