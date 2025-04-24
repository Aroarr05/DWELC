let datosCsv = [];
let datosJson = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCsv("../../../../../assets/json/da_centros.csv");
    cargarDatosJson("../../../../../assets/json/provincias.json");

    document.querySelector("#comunidad-selectJson").addEventListener("change",cambiarComunidad);
    document.querySelector("#provincia-selectJson").addEventListener("change", cambiarProvincia);
    
    document.querySelector("#municipio-selectCsv").addEventListener("change", cambiarMunicipioCsv);

    document.querySelector("#anadir-autorizacion").addEventListener("click", anadirautorizacion);
    document.querySelector("#eliminar-autorizcion").addEventListener("click", eliminarautorizacion);

    actualizarBotones();

    document.querySelector("#crear-autorizacion").addEventListener("click", function(e) {
        if (validarAutorizados()) {
            datosAutorizacion();
        }
    });

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

// EL + o -

let contadorPersonas = 1;

function anadirautorizacion() {
    if (contadorPersonas<5){
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

    actualizarBotones();

    }
}

function eliminarautorizacion() {
    if (contadorPersonas > 1) {
        const contenedor = document.querySelector(".autorizar");
        const titulo = contenedor.querySelectorAll(".titulo-autorizado");
        const formClon = contenedor.querySelectorAll(".form-clon");

        if (titulo.length > 0) {
            contenedor.removeChild(titulo[titulo.length - 1]);
        }

        if (formClon.length > 0) {
            contenedor.removeChild(formClon[formClon.length - 1]);
        }
        contadorPersonas--;

        actualizarBotones();
    }
}

function actualizarBotones(){
    const botonAnadir = document.querySelector("#anadir-autorizacion");
    const botonEliminar = document.querySelector("#eliminar-autorizcion");

    if ( contadorPersonas >= 5){
        botonAnadir.disabled = true;
    }else{
        botonAnadir.disabled = false;
    }

    if (contadorPersonas <= 1){
        botonEliminar.disabled = true;
    }else{
        botonEliminar.disabled = false;
    }
}

// VALIDACIÓN

function validarAutorizados() {
    const personaAutorizada = document.querySelectorAll(".persona-autorizada, .form-clon");
    const mensajesError = document.querySelector("#mensajes-error");
    let errores = [];

    personaAutorizada.forEach((persona, index) => {
        const nombre = persona.querySelector("#nombre");
        const apellido = persona.querySelector("#primer-apellido");
        const docTipo = persona.querySelector("#tipo-documentacion");
        const doc = persona.querySelector("#documento");

     
        if (!nombre.value.trim()) {
            errores.push(` ${index + 1}ª persona: Nombre obligatorio`);
        }

        if (!apellido.value.trim()) {
            errores.push(` ${index + 1}ª persona: Primer apellido obligatorio`);
        }

        const errorDocumento = validarDocumento(doc.value.trim(), docTipo.value);
        if (errorDocumento) {
            errores.push(` ${index + 1}ª persona: ${errorDocumento}`);
        }
    });

    if (errores.length > 0) {
        mensajesError.innerHTML = `
            <strong>Errores:</strong>
            <ul>${errores.map(e => `<li>${e}</li>`).join("")}</ul>
        `;
        return false; 
    } else {
        mensajesError.innerHTML = "";
        return true; 
    }
}

function validarDocumento(doc, tipoDocumento) {
    doc = doc.trim().toUpperCase();
    tipoDocumento = tipoDocumento.toLowerCase();

    if (doc === "") {
        return "El documento no puede estar vacío";
    }

    switch (tipoDocumento) {
        case "nif":
            if (!/^[0-9]{8}[A-Z]$/.test(doc)) {
                return "NIF inválido. Debe tener 8 números y 1 letra (Ej: 12345678A)";
            }
            break;

        case "nie":
            if (!/^[XYZ][0-9]{7}[A-Z]$/.test(doc)) {
                return "NIE inválido. Formato: X/Y/Z + 7 números + 1 letra (Ej: X1234567A)";
            }
            break;

        case "pasaporte":
            if (!/^[A-Z0-9]{5,20}$/.test(doc)) {
                return "Pasaporte inválido. Use 5-20 letras/números sin espacios";
            }
            break;

        default:
            return "Tipo de documento no válido. Use NIF, NIE o Pasaporte";
    }
    return "";
}

// RELLENAR FORMULARIO

function datosAutorizacion() {
    const personas = document.querySelectorAll(".persona-autorizada, .form-clon");
    let datosAutoriza = [];

    personas.forEach(persona => {
        const nombre = persona.querySelector("#nombre").value.trim();
        const apellido1 = persona.querySelector("#primer-apellido").value.trim();
        const apellido2 = persona.querySelector("#segundo-apellido").value.trim();
        const docTipo = persona.querySelector("#tipo-documentacion").value;
        const documento = persona.querySelector("#documento").value.trim();
        const telefono = persona.querySelector("#telefono").value.trim();

        datosAutoriza.push({
            nombre,
            apellido1,
            apellido2,
            docTipo,
            documento,
            telefono
        });
    });

    console.log("Datos Autorización", datosAutoriza);
}
