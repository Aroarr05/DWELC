
let ListData = [];
let filteredData = [];

document.addEventListener("DOMContentLoaded", () => {
    
    cargarSelects();
    cargarSelectFecha();
    cargarSelectOrdenar();

    manejarFiltros();
    manejarOrden();
    manejarChecked();

    document.querySelector("#alumnos").checked = true;
    cargarYmostrarDatos("../../assets/json/alumnos.json");
  
});

function cargarYmostrarDatos(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            ListData = data.alumnos || data.profesores || []; 
            console.log("Datos procesados:", ListData);
            filteredData = [];
            mostrarDatos(ListData);
        })
        .catch(error => console.error("Error al cargar datos:", error));
}

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

function manejarChecked() {
    const elegirAlumnos = document.querySelector("#alumnos");
    const elegirProfesores = document.querySelector("#profesores");
    
    elegirAlumnos.addEventListener("change", () => {
        if(elegirAlumnos.checked) {
            elegirProfesores.checked = false;
            cargarYmostrarDatos("../../assets/json/alumnos.json");
        }
    });

    elegirProfesores.addEventListener("change", () => {
        if(elegirProfesores.checked) {
            elegirAlumnos.checked = false;
            cargarYmostrarDatos("../../assets/json/profesores.json");
        }
    });
}

function manejarFiltros() {
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", actualizarInputs);
    });
    
    document.querySelector("#filtrar-btn").addEventListener("click", () => {
        filteredData = filtrarDatos([...ListData]);
        mostrarDatos(filteredData);  
    });
}

function manejarOrden() {
    document.querySelector("#ordenar-btn").addEventListener("click", () => {
        const dataToOrder = filteredData.length ? filteredData : [...ListData];
        const ordered = ordenarDatos(dataToOrder);
        mostrarDatos(ordered); 
    });
}

function actualizarInputs() {
    const filterGroups = document.querySelectorAll(".filter-group");
    
    filterGroups.forEach(group => {
        const select = group.querySelector("select");
        const inputs = group.querySelectorAll("input");

        if (inputs.length === 0) return;
        
        const selectValue = select.value;
        
        if (selectValue === "está_vacío" || selectValue === "está_relleno") {
            inputs.forEach(input => input.disabled = true);
        } else if (selectValue === "comprendido_entre") {
            inputs[0].disabled = false;
            inputs[1].disabled = false;
        } else {
            inputs[0].disabled = false;
            if (inputs[1]) inputs[1].disabled = true;
        }
    });
}
function filtrarDatos(data) {
    return data.filter(item => {
        return (
            filtrarCampo(item.nombre, "nombre") &&
            filtrarCampo(item.apellido1, "apellido1") &&
            filtrarCampo(item.apellido2, "apellido2") &&
            filtrarFecha(item.fechaNacimiento) &&
            filtrarCampo(item.curso, "curso")
        );
    });
}

function filtrarCampo(valor, campo) {
    const select = document.querySelector(`#${campo}-select`);
    const input = document.querySelector(`#${campo}-input1`);
    
    const selectValue = select.value;
    const inputValue = input ? input.value.trim().toLowerCase() : "";
    
    const valorStr = (valor === null || valor === undefined) ? "" : valor.toString().toLowerCase();
    
    switch (selectValue) {
        case "comenzar_por":
            return inputValue ? valorStr.startsWith(inputValue) : true;
        case "terminar_en":
            return inputValue ? valorStr.endsWith(inputValue) : true;
        case "contiene":
            return inputValue ? valorStr.includes(inputValue) : true;
        case "igual_a":
            return inputValue ? valorStr === inputValue : true;
        case "está_vacío":
            return valorStr === "";
        case "está_relleno":
            return valorStr !== "";
        default:
            return true;
    }
}

function convertirFecha(fechaString) {
    if (!fechaString || fechaString.trim() === "") return null;
    const [day, month, year] = fechaString.split('/');
    if (!day || !month || !year) return null;
    return new Date(`${year}-${month}-${day}`);
}

function filtrarFecha(fecha) {
    const select = document.querySelector("#fechaNacimiento-select");
    const input1 = document.querySelector("#fechaNacimiento-input1");
    const input2 = document.querySelector("#fechaNacimiento-input2");
    
    const selectValue = select.value;
    
    if (!fecha) {
        return selectValue === "Está vacío";
    }
    
    if (selectValue === "Está relleno") {
        return true;
    }
    
    try {
        const fechaItem = convertirFecha(fecha);
        if (!fechaItem) return false;
        
        const fechaInput1 = input1.value ? new Date(input1.value) : null;
        
        switch(selectValue) {
            case "Igual a":
                return fechaInput1 ? fechaItem.toDateString() === fechaInput1.toDateString() : true;
            case "Posterior a":
                return fechaInput1 ? fechaItem > fechaInput1 : true;
            case "Anterior a":
                return fechaInput1 ? fechaItem < fechaInput1 : true;
            case "Comprendido entre":
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
                return convertirFecha(a.fechaNacimiento) - convertirFecha(b.fechaNacimiento);
            case "fecha_recientes":
                return convertirFecha(a.fechaNacimiento) - convertirFecha(b.fechaNacimiento);
            default:
                return 0;
        }
    });
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