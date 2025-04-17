let datosCsv = [];
let datosJson = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCsv("../../../../../assets/json/da_centros.csv");
    cargarDatosJson("../../../../../assets/json/provincias.json");

    document.querySelector("#comunidad-selectJson").addEventListener("change",comunidadChange);
    document.querySelector("#provincia-selectJson").addEventListener("change",provinciaChange);
});

// CARGAR LOS DATOS

function cargarDatosCsv(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        datosCsv = procesarCSV(data);
    })
    .catch(error => console.error("Error al cargar el CSV:", error));
}

function cargarDatosJson(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        datosJson = data.provincias;
        console.log("Contenido del JSON:", datosJson);
        llenarSelectComunidades(datosJson);
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
}

function procesarCSV(data) {
    const filas = data.split('\n');
    const listaPeque = [];

    for (let i = 1; i < filas.length; i++) {
        const columna = filas[i].split(';');
        if (columna.length >= 8) {  
            const MinCSV = {
                D_DENOMINA: columna[2],
                D_ESPECIFICA: columna[3],
                D_MUNICIPIO: columna[8]
            };
            listaPeque.push(MinCSV);
        }
    }
    console.log("Contenido procesado del CSV:", listaPeque); 
    return listaPeque;
}

// LLENAR LOS SELECT CON JSON

function llenarSelectComunidades (comunidades){
    const comunidadSelect = document.querySelector("#comunidad-selectJson");
    comunidades.forEach(comunidad => {
        const option = document.createElement('option');
        option.value = comunidad.code;
        option.textContent = comunidad.label;
        comunidadSelect.appendChild(option);
    });
}

function comunidadChange (e){
    const comunidadCode = e.target.value;
    const comunidad= datosJson.find(c => c.code === comunidadCode);
    if(comunidad){
        llenarSelectProvincias(comunidad.provinces);
    }
}

function llenarSelectProvincias (provincias){
    const provinciaSelect = document.querySelector("#provincia-selectJson");
    provincias.forEach(provincia=>{
        const option = document.createElement('option');
        option.value = provincia.code;
        option.textContent = provincia.label;
        provinciaSelect.appendChild(option);
    })
}

function provinciaChange(e){
    const provinciaCode = e.target.value;
    const comunidad = datosJson.find(c => c.provinces.some(p => p.code === provinciaCode));
    const provincia = comunidad.provinces.find(p => p.code === provinciaCode);
    if (provincia){
        llenarSelectMunicipiosJson(provincia.towns);
    }
}

function llenarSelectMunicipiosJson (municipios){
    const municipioSelect = document.querySelector("#municipio-selectJson");
    municipios.forEach(municipio =>{
        const option = document.createElement('option');
        option.value = municipio.code;
        option.textContent = municipio.label;
        municipioSelect.appendChild(option);
    })
}

// LLENAR LOS SELECT CON CSV

function llenarSelectMunicipiosCsv (){

}

function llenarSelectEnsenanza (data){

}

function llenarSelectCurso (data){

}