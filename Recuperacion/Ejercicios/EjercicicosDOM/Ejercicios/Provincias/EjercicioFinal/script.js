let datosCsv = [];
let datosJson = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCsv("../../../../../assets/json/da_centros.csv");
    cargarDatosJson("../../../../../assets/json/provincias.json");
});

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
