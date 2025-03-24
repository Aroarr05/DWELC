document.addEventListener("DOMContentLoaded", ()=>{
    fetch("../../assets/json/alumnos.json")
        .then(response => response.json())
        .then(data => {
            cargarSelct();
            selectFecha();
            selectOrdenar();
            manejarFiltros(data);
            //mostrarDatos(data);
        })
        .catch(error => console.error ("Error al cargar el Json", error));    
})

//let alumnosDatos = [];

function cargarSelct(){
    const opciones = [ "Comenzar por", "Terminar en", "Contiene", "Igual a", "Está vacío", "Está relleno"];
    const selects = document.querySelectorAll("select");

    selects.forEach(select =>{
        opciones.forEach(opcion => {
            let opc = document.createElement ("option");
            opc.value = opcion.toLowerCase().replace(" ", "_");
            opc.textContent=opcion;
            select.appendChild(opc);
        })
    })
}

function selectFecha(){
    const opciones = ["Igual a", "Comprenmdido entre", "Posterior a", "Aterior a","Está vacío","Está relleno"];
    const fechaSelect = document.querySelector("#fechaNacimiento-select");

    fechaSelect.innerHTML = ' ';

    opciones.forEach(option =>{
        const opc = document.createElement("option");
        opc.value = option.toLowerCase().replace(" ", "_");
        opc.textContent = option;
        fechaSelect.appendChild(opc);
    })

}

function selectOrdenar(){
    const opciones = ["Asccendente","Descendente","Nombre","Apellido","Curso","Fecha de Nacimiento"];
    const ordenarSelect = document.querySelector("#ordenar-select");

    ordenarSelect.innerHTML = ' ';

    opciones.forEach(option => {
        const opc = document.createElement("option");
        opc.value = option.toLowerCase().replace(" ", "_");
        opc.textContent = option;
        ordenarSelect.appendChild(opc);
    })
}

function manejarFiltros(){
  
}