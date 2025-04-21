let datosCsv = [];
let datosJson = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCsv("../../../../../assets/json/da_centros.csv");
    cargarDatosJson("../../../../../assets/json/provincias.json");

    document.querySelector("#comunidad-selectJson").addEventListener("change", comunidadChange);
    document.querySelector("#provincia-selectJson").addEventListener("change", provinciaChange);
    document.querySelector("#municipio-selectCsv").addEventListener("change", municipioCsvChange);
});

// CARGAR LOS DATOS

function cargarDatosCsv(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            datosCsv = procesarCSV(data);
            llenarSelectMunicipiosCsv();
        })
        .catch(error => console.error("Error al cargar el CSV:", error));
}

function cargarDatosJson(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            datosJson = data.provincias;
            llenarSelectComunidades(datosJson);
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
}

function procesarCSV(data) {
    const filas = data.split('\n');
    const listaPeque = [];

    for (let i = 1; i < filas.length; i++) {
        const columna = filas[i].split(';');
        if (columna.length >= 9) {
            const MinCSV = {
                D_DENOMINA: columna[2],
                D_ESPECIFICA: columna[3],
                D_MUNICIPIO: columna[8].trim()
            };
            listaPeque.push(MinCSV);
        }
    }
    return listaPeque;
}

// FUNCIONES PARA SELECTS CSV

function llenarSelectMunicipiosCsv() {
    const municipioSelect = document.querySelector("#municipio-selectCsv");
    const municipiosUnicos = [...new Set(datosCsv.map(d => d.D_MUNICIPIO))].sort();

    municipiosUnicos.forEach(municipio => {
        const option = document.createElement("option");
        option.textContent = municipio;
        option.value = municipio;
        municipioSelect.appendChild(option);
    });
}

function municipioCsvChange(e) {
    const municipioSeleccionado = e.target.value;
    const datosFiltrados = filtrarDatosPorMunicipioCsv(municipioSeleccionado);

    llenarSelectEnsenanza(datosFiltrados);
    llenarSelectCurso(datosFiltrados);
}

function filtrarDatosPorMunicipioCsv(municipio) {
    return datosCsv.filter(d => d.D_MUNICIPIO === municipio);
}

function llenarSelectEnsenanza(datos) {
    const ensenanzaSelect = document.querySelector("#ensenanza-select");

    const ensenanzasUnicas = [...new Set(datos.map(d => d.D_ESPECIFICA))].sort();
    ensenanzasUnicas.forEach(ensenanza => {
        const option = document.createElement("option");
        option.textContent = ensenanza;
        option.value = ensenanza;
        ensenanzaSelect.appendChild(option);
    });
}

function llenarSelectCurso(datos) {
    const cursoSelect = document.querySelector("#curso-select");

    const cursosUnicos = [...new Set(datos.map(d => d.D_DENOMINA))].sort();
    cursosUnicos.forEach(curso => {
        const option = document.createElement("option");
        option.textContent = curso;
        option.value = curso;
        cursoSelect.appendChild(option);
    });
}

// FUNCIONES PARA SELECTS JSON

function llenarSelectComunidades(comunidades) {
    const comunidadSelect = document.querySelector("#comunidad-selectJson");
    comunidadSelect.innerHTML = '<option>Selecciona una comunidad...</option>';
    comunidades.forEach(comunidad => {
        const option = document.createElement('option');
        option.value = comunidad.code;
        option.textContent = comunidad.label;
        comunidadSelect.appendChild(option);
    });
}

function comunidadChange(e) {
    const comunidadCode = e.target.value;
    const comunidad = datosJson.find(c => c.code === comunidadCode);
    if (comunidad) {
        llenarSelectProvincias(comunidad.provinces);
    }
}

function llenarSelectProvincias(provincias) {
    const provinciaSelect = document.querySelector("#provincia-selectJson");
    provinciaSelect.innerHTML = '<option>Selecciona una provincia...</option>';
    provincias.forEach(provincia => {
        const option = document.createElement('option');
        option.value = provincia.code;
        option.textContent = provincia.label;
        provinciaSelect.appendChild(option);
    });
}

function provinciaChange(e) {
    const provinciaCode = e.target.value;
    const comunidad = datosJson.find(c => c.provinces.some(p => p.code === provinciaCode));
    const provincia = comunidad.provinces.find(p => p.code === provinciaCode);
    if (provincia) {
        llenarSelectMunicipiosJson(provincia.towns);
    }
}

function llenarSelectMunicipiosJson(municipios) {
    const municipioSelect = document.querySelector("#municipio-selectJson");
    municipioSelect.innerHTML = '<option>Selecciona un municipio...</option>';
    municipios.forEach(municipio => {
        const option = document.createElement('option');
        option.value = municipio.code;
        option.textContent = municipio.label;
        municipioSelect.appendChild(option);
    });
}
