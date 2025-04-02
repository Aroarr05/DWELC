document.addEventListener("DOMContentLoaded", () => {
    const estado = {
        ListData: [],
        filteredData: []
    };

    cargarSelects();
    cargarSelectFecha();
    cargarSelectOrdenar();
    
    manejarChecked();
    manejarFiltros(estado);
    
    document.querySelector("#alumnos").checked = true;
    cargarYmostrarDatos("../../assets/json/alumnos.json", estado);
});

function cargarSelects() {
    const opciones = ["Comenzar por", "Terminar en", "Contiene", "Igual a", "Está vacío", "Está relleno"];
    const selects = document.querySelectorAll("#nombre-select, #apellido1-select, #apellido2-select, #curso-select");

    selects.forEach(select => {
        select.innerHTML = ""; 
        opciones.forEach(opcion => {
            //opciones.forEach((opcion, i) => {
            let opc = document.createElement("option");
            opc.value = opcion.toLowerCase().replace(" ", "_");
            //opc.value = i;
            opc.textContent = opcion;
            select.appendChild(opc);
        });
    });
}

function cargarSelectFecha() {
    const opciones = ["Igual a", "Comprendido entre", "Posterior a", "Anterior a", "Está vacío", "Está relleno"];
    const fechaSelect = document.querySelector("#fechaNacimiento-select");

    fechaSelect.innerHTML = "";
    opciones.forEach(option => {
        const opc = document.createElement("option");
        opc.value = option.toLowerCase().replace(" ", "_");
        opc.textContent = option;
        fechaSelect.appendChild(opc);
    });
}

function cargarSelectOrdenar() {
    const opciones = ["Ninguno", "Nombre (A-Z)", "Nombre (Z-A)", "Apellido (A-Z)", "Apellido (Z-A)", "Curso (A-Z)", "Curso (Z-A)", "Fecha (Antiguas)", "Fecha (Recientes)"];
    const ordenarSelect = document.querySelector("#ordenar-select");

    ordenarSelect.innerHTML = "";
    opciones.forEach(option => {
        const opc = document.createElement("option");
        opc.value = option.toLowerCase().replace(/ /g, "_").replace(/[()]/g, "");
        opc.textContent = option;
        ordenarSelect.appendChild(opc);
    });
}

function cargarYmostrarDatos(url, estado) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        estado.ListData = data.alumnos || data.profesores || [];
        estado.filteredData = [];
        console.log("Datos cargados:", estado.ListData);
        mostrarDatos(estado.ListData);
    })
    .catch(error => console.error("Error al cargar los datos:", error));
}

function manejarChecked(estado) {
    const elegirAlumnos = document.querySelector("#alumnos");
    const elegirProfesores = document.querySelector("#profesores");
    
    elegirAlumnos.addEventListener("change", () => {
        if(elegirAlumnos.checked) {
            elegirProfesores.checked = false;
            cargarYmostrarDatos("../../assets/json/alumnos.json", estado);
        }
    });

    elegirProfesores.addEventListener("change", () => {
        if(elegirProfesores.checked) {
            elegirAlumnos.checked = false;
            cargarYmostrarDatos("../../assets/json/profesores.json", estado);
        }
    });
}

function manejarFiltros(estado) {
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", actualizarInputs);
    });

    document.querySelector("#filtrar-btn").addEventListener("click", () => {
        estado.filteredData = filtrarDatos([...estado.ListData]);
        console.log("Datos filtrados:", estado.filteredData);
        mostrarDatos(estado.filteredData);
    });

    document.querySelector("#ordenar-btn").addEventListener("click", () => {
        const dataToOrder = estado.filteredData.length ? [...estado.filteredData] : [...estado.ListData];
        const ordered = ordenarDatos(dataToOrder);
        mostrarDatos(ordered);
    });
}

function actualizarInputs() {
    document.querySelectorAll(".filter-group").forEach(group => {
        const select = group.querySelector("select");
        const inputs = group.querySelectorAll("input");

        if (!inputs.length) return;

        const selectValue = select.value;

        if (selectValue === "está_vacío" || selectValue === "está_relleno") {
            inputs.forEach(input => {
                input.value = "";
                input.disabled = true;
            });
        } else if (selectValue === "comprendido_entre") {
            inputs[0].disabled = false;
            if (inputs[1]) inputs[1].disabled = false;
        } else {
            inputs[0].disabled = false;
            if (inputs[1]) {
                inputs[1].value = "";
                inputs[1].disabled = true;
            }
        }
    });
}

function filtrarDatos(data) {
    return data.filter(item => {
        const pasaFiltroNombre = filtrarCampo(item.nombre, "nombre");
        const pasaFiltroApellido1 = filtrarCampo(item.apellido1, "apellido1");
        const pasaFiltroApellido2 = filtrarCampo(item.apellido2, "apellido2");
        const pasaFiltroFecha = filtrarFecha(item.fechaNacimiento);
        const pasaFiltroCurso = filtrarCampo(item.curso, "curso");
        
        return pasaFiltroNombre && pasaFiltroApellido1 && pasaFiltroApellido2 && pasaFiltroFecha && pasaFiltroCurso;
    });
}

function filtrarCampo(valor, campo) {
    const select = document.querySelector(`#${campo}-select`);
    const input = document.querySelector(`#${campo}-input1`);
    
    const selectValue = select.value;
    const inputValue = input ? input.value.trim().toLowerCase() : "";
    const valorStr = valor ? valor.toString().toLowerCase() : "";
    
    switch(selectValue) {
        case "comenzar_por":
            return inputValue ? valorStr.startsWith(inputValue) : true;
        case "terminar_en":
            return inputValue ? valorStr.endsWith(inputValue) : true;
        case "contiene":
            return inputValue ? valorStr.includes(inputValue) : true;
        case "igual_a":
            return inputValue ? valorStr === inputValue : true;
        case "está_vacío":
            return !valorStr;
        case "está_relleno":
            return !!valorStr;
        default:
            return true;
    }
}

function filtrarFecha(fecha) {
    const select = document.querySelector("#fechaNacimiento-select");
    const input1 = document.querySelector("#fechaNacimiento-input1");
    const input2 = document.querySelector("#fechaNacimiento-input2");
    
    const selectValue = select.value;
    
    if (!fecha) {
        return selectValue === "está_vacío";
    }
    
    if (selectValue === "está_relleno") {
        return true;
    }
    
    try {
        const fechaItem = convertirFecha(fecha);
        if (!fechaItem) return false;
        
        const fechaInput1 = input1.value ? new Date(input1.value) : null;
        
        switch(selectValue) {
            case "igual_a":
                return fechaInput1 ? fechaItem.toDateString() === fechaInput1.toDateString() : true;
            case "posterior_a":
                return fechaInput1 ? fechaItem > fechaInput1 : true;
            case "anterior_a":
                return fechaInput1 ? fechaItem < fechaInput1 : true;
            case "comprendido_entre":
                const fechaInput2 = input2.value ? new Date(input2.value) : null;
                return fechaInput1 && fechaInput2 ? 
                    fechaItem >= fechaInput1 && fechaItem <= fechaInput2 : true;
            default:
                return true;
        }
    } catch(e) {
        console.error("Error filtrando fecha:", e);
        return false;
    }
}

function convertirFecha(fechaStr) {
    if (!fechaStr) return null;
    const [day, month, year] = fechaStr.split('/');
    return new Date(`${year}-${month}-${day}`);
}

function ordenarDatos(data) {
    const ordenarValue = document.querySelector("#ordenar-select").value;
    
    if (!ordenarValue || ordenarValue === "ninguno") return [...data];
    
    const resultado = [...data].sort((a, b) => {
        switch (ordenarValue) {
            case "nombre_a-z":
                return (a.nombre || "").localeCompare(b.nombre || "");
            case "nombre_z-a":
                return (b.nombre || "").localeCompare(a.nombre || "");
            case "apellido_a-z":
                return (a.apellido1 || "").localeCompare(b.apellido1 || "") || 
                       (a.apellido2 || "").localeCompare(b.apellido2 || "");
            case "apellido_z-a":
                return (b.apellido1 || "").localeCompare(a.apellido1 || "") || 
                       (b.apellido2 || "").localeCompare(a.apellido2 || "");
            case "curso_a-z":
                return (a.curso || "").localeCompare(b.curso || "");
            case "curso_z-a":
                return (b.curso || "").localeCompare(a.curso || "");
            case "fecha_antiguas":
                return new Date(a.fechaNacimiento?.split('/').reverse().join('-') || 0) - 
                       new Date(b.fechaNacimiento?.split('/').reverse().join('-') || 0);
            case "fecha_recientes":
                return new Date(b.fechaNacimiento?.split('/').reverse().join('-') || 0) - 
                       new Date(a.fechaNacimiento?.split('/').reverse().join('-') || 0);
            default:
                return 0;
        }
    });
    //console.log("Datos después de ordenar:", resultado.length, resultado);
    return resultado;
}

function mostrarDatos(data) {
    const tbody = document.querySelector("#alumnos-list tbody");
    tbody.innerHTML = "";
    
    if (!data || data.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No se encontraron los datos que coincidan con la búsqueda";
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tbody.appendChild(row);
    } else {
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.nombre || "-"}</td>
                <td>${item.apellido1 || "-"}</td>
                <td>${item.apellido2 || "-"}</td>
                <td>${item.fechaNacimiento || "-"}</td>
                <td>${item.curso || "-"}</td>
            `;
            tbody.appendChild(row);
        });
    }
    document.querySelector("#total").textContent = `Total: ${data ? data.length : 0}`;
}