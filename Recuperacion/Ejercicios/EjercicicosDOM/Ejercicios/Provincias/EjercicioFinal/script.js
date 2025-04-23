let datosCsv = [];
let datosJson = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCsv("../../../../../assets/json/da_centros.csv");
    cargarDatosJson("../../../../../assets/json/provincias.json");

    document.querySelector("#comunidad-selectJson").addEventListener("change",cambiarComunidad);
    document.querySelector("#provincia-selectJson").addEventListener("change", cambiarProvincia);
    document.querySelector("#municipio-selectCsv").addEventListener("change", cambiarMunicipioCsv);

    document.querySelector("#add-person").addEventListener("click", anadirautorizacion);
    document.querySelector("#remove-person").addEventListener("click", eliminarautorizacion);

    document.querySelector("#validar-personas").addEventListener("click", validarAutorizados);
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
        municipioSelect.appendChild(option);
    });
}

function filtrarDatosPorMunicipioCsv(municipio) {
    return datosCsv.filter(d => d.D_MUNICIPIO === municipio);
}

function cambiarMunicipioCsv(event) {
    const municipioSeleccionado = event.target.value;
    const datosFiltrados = filtrarDatosPorMunicipioCsv(municipioSeleccionado);

    llenarSelectEnsenanza(datosFiltrados);
    llenarSelectCurso(datosFiltrados);
}


function llenarSelectEnsenanza(datos) {
    const ensenanzaSelect = document.querySelector("#ensenanza-select");
    const ensenanzasUnicas = [...new Set(datos.map(d => d.D_ESPECIFICA))].sort();
    
    ensenanzasUnicas.forEach(ensenanza => {
        const option = document.createElement("option");
        option.textContent = ensenanza;
        ensenanzaSelect.appendChild(option);
    });
}

function llenarSelectCurso(datos) {
    const cursoSelect = document.querySelector("#curso-select");
    const cursosUnicos = [...new Set(datos.map(d => d.D_DENOMINA))].sort();
    
    cursosUnicos.forEach(curso => {
        const option = document.createElement("option");
        option.textContent = curso;
        cursoSelect.appendChild(option);
    });
}

// FUNCIONES PARA SELECTS JSON

function llenarSelectComunidades(comunidades) {
    const comunidadSelect = document.querySelector("#comunidad-selectJson");

    comunidades.forEach(comunidad => {
        const option = document.createElement('option');
        option.value = comunidad.code;
        option.textContent = comunidad.label;
        comunidadSelect.appendChild(option);
    });
}

function cambiarComunidad(event) {
    const comunidadCode = event.target.value;
    const comunidad = datosJson.find(c => c.code === comunidadCode);
    if (comunidad) {
        llenarSelectProvincias(comunidad.provinces);
    }
}

function llenarSelectProvincias(provincias) {
    const provinciaSelect = document.querySelector("#provincia-selectJson");

    provincias.forEach(provincia => {
        const option = document.createElement('option');
        option.value = provincia.code;
        option.textContent = provincia.label;
        provinciaSelect.appendChild(option);
    });
}

function cambiarProvincia(event) {
    const provinciaCode = event.target.value;
    const comunidad = datosJson.find(c => c.provinces.some(p => p.code === provinciaCode));
    const provincia = comunidad.provinces.find(p => p.code === provinciaCode);
    if (provincia) {
        llenarSelectMunicipiosJson(provincia.towns);
    }
}

function llenarSelectMunicipiosJson(municipios) {
    const municipioSelect = document.querySelector("#municipio-selectJson");
  
    municipios.forEach(municipio => {
        const option = document.createElement('option');
        option.textContent = municipio.label;
        municipioSelect.appendChild(option);
    });
}

// el + o -

let contadorPersonas = 1;

function anadirautorizacion() {
    contadorPersonas++;

    const contenedor = document.querySelector(".autorizar");
    const titulo = document.createElement("h2");
    titulo.textContent = `${contadorPersonas}ª Persona Autorizada:`;
    titulo.classList.add("titulo-autorizado"); 

    const formularioClon = document.querySelector(".persona-autorizada").cloneNode(true);
    formularioClon.classList.add("form-clon"); 

    formularioClon.querySelectorAll("input").forEach(input => input.value = "");
    formularioClon.querySelectorAll("select").forEach(select => select.selectedIndex = 0);

    contenedor.appendChild(titulo);
    contenedor.appendChild(formularioClon);
}

function eliminarautorizacion() {
    if (contadorPersonas > 1) {
        const contenedor = document.querySelector(".autorizar");
        const titulo = contenedor.querySelectorAll(".titulo-autorizado");
        const grupos = contenedor.querySelectorAll(".form-clon");

        if (titulo.length > 0) {
            contenedor.removeChild(titulo[titulo.length - 1]);
        }

        if (grupos.length > 0) {
            contenedor.removeChild(grupos[grupos.length - 1]);
        }
        contadorPersonas--;
    }
}

// Validacion

function validarAutorizados() {
    const grupos = document.querySelectorAll("#persona-autorizada, #group-from-extra");
    let errores = [];
    
    if (grupos.length < 1) {
        errores.push("Debe haber al menos una persona autorizada.");
    }
    if (grupos.length > 5) {
        errores.push("No puede haber más de cinco personas autorizadas.");
    }

    grupos.forEach((grupo, index) => {
        const nombre = grupo.querySelector("#nombre").value.trim();
        const apellido = grupo.querySelector("#primer-apellido").value.trim();
        const docTipo = grupo.querySelector("#tipo-documentacion").value;
        const doc = grupo.querySelector("#documento").value.trim();

        if (!nombre) {
            errores.push(`(${index + 1}) El nombre es obligatorio.`);
        }
        if (!apellido) {
            errores.push(`(${index + 1}) El primer apellido es obligatorio.`);
        }

        if (!validarDocumento(doc, docTipo)) {
            errores.push(`(${index + 1}) El documento es inválido o el tipo no coincide.`);
        }
    });

    if (errores.length > 0) {
        alert("Errores encontrados:\n\n" + errores.join("\n"));
    } else {
        alert("Todos los datos son válidos.");
    }
}

function validarDocumento(doc, tipo) {
    if (!doc || !tipo) return false;

    const nifRegex = /^[0-9]{8}[A-Za-z]$/;
    const nieRegex = /^[XYZxyz][0-9]{7}[A-Za-z]$/;
    const pasaporteRegex = /^[A-Za-z0-9]{5,20}$/;

    switch (tipo.toLowerCase()) {
        case "nif":
            return nifRegex.test(doc);
        case "nie":
            return nieRegex.test(doc);
        case "pasaporte":
            return pasaporteRegex.test(doc);
        default:
            return false;
    }
}