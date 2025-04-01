document.addEventListener("DOMContentLoaded", () => {
    let ListData = [];
    let filteredData = [];

    //cargar los select...
    cargarSelects();
    cargarSelectFecha();
    cargarSelectOrdenar();
    
    manejarChecked();
    manejarFiltros(ListData,filteredData);        
});

function cargarYmostrarDatos(url) {
    fetch(url)
    .then(response => response.json())
    .then(data=> {
        const lista = data.alumnos || data.profesores || [];
        ListData = lista; 
        filteredData = [];
        mostrarDatos(lista);
    })
    .catch(error => console.error("Error al cargar los datos:", error));
}
 
function manejarChecked(){
        
    const elegirAlumnos = document.querySelector("#alumnos");
    const elegirProfesores = document.querySelector("#profesores");
    
    elegirAlumnos.addEventListener("change", ()=>{
       if(elegirAlumnos.checked){elegirProfesores.checked = false;
        cargarYmostrarDatos("../../assets/json/alumnos.json")
       } 
    });

    elegirProfesores.addEventListener("change", () => {
        if(elegirProfesores.checked){
            elegirAlumnos.checked = false;
            cargarYmostrarDatos("../../assets/json/profesores.json")
        }
    });
    
    elegirAlumnos.checked = true;
    cargarYmostrarDatos("../../assets/json/alumnos.json");
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

function manejarFiltros(ListData, filteredData) {
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", () => actualizarInputs());
    });

    document.querySelector("#filtrar-btn").addEventListener("click", () => {
        console.log("Filtrando datos...");
        filteredData = filtrarDatos([...ListData]);
        console.log("Datos filtrados: ", filteredData);  
    });

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
    console.log("Filtrando datos...");
    return data.filter(alumno => {
        console.log("Filtrando alumno:", alumno);
        return (
            filtrarCampo(alumno.nombre, "#nombre-select", "#nombre-input1") &&
            filtrarCampo(alumno.apellido1, "#apellido1-select", "#apellido1-input1") &&
            filtrarCampo(alumno.apellido2, "#apellido2-select", "#apellido2-input1") &&
            filtrarFecha(alumno.fechaNacimiento, "#fechaNacimiento-select", "#fechaNacimiento-input1", "#fechaNacimiento-input2") &&
            filtrarCampo(alumno.curso, "#curso-select", "#curso-input1")
        );
    });
}

function filtrarCampo(valor, selectId, input1Id) {
    const selectValue = document.querySelector(selectId).value;
    const input1 = document.querySelector(input1Id).value.trim().toLowerCase();
    
    const valorStr = (valor !== null && valor !== undefined) ? valor.toString().toLowerCase() : "";
    console.log(`Filtrando campo: ${valorStr}, con valor del input: ${input1} y select: ${selectValue}`);
    
    switch (selectValue) {
        case "comenzar_por": 
            return valorStr.startsWith(input1);
        case "terminar_en": 
            return valorStr.endsWith(input1);
        case "contiene": 
            return valorStr.includes(input1);
        case "igual_a": 
            return valorStr === input1;
        case "está_vacío": 
            return valorStr === "";
        case "está_relleno": 
            return valorStr !== "";
        default: 
            return true;
    }
}

function filtrarFecha(valor, selectId, input1Id, input2Id) {
    const selectValue = document.querySelector(selectId).value;
    const input1 = document.querySelector(input1Id).value;
    const input2 = document.querySelector(input2Id) ? document.querySelector(input2Id).value : "";
    
    if (!valor) {
        return selectValue === "está_vacío";
    }
    
    if (selectValue === "está_relleno") {
        return valor !== "";
    }
    
    if (!input1 && selectValue !== "está_vacío" && selectValue !== "está_relleno") {
        return true;
    }
    
    try {
        const [day, month, year] = valor.split('/');
        const dateValor = new Date(`${year}-${month}-${day}`);
        const date1 = new Date(input1);
        const date2 = input2 ? new Date(input2) : null;
        
        if (isNaN(dateValor.getTime())) return false;
        
        switch (selectValue) {
            case "igual_a":
                return dateValor.toDateString() === date1.toDateString();
            case "posterior_a":
                return dateValor > date1;
            case "anterior_a":
                return dateValor < date1;
            case "comprendido_entre":
                if (!date2 || isNaN(date2.getTime())) return false;
                return dateValor >= date1 && dateValor <= date2;
            default:
                return true;
        }
    } catch (e) {
        console.error("Error al procesar fechas:", e);
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
    
    if (data.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No se encontraron los datos que coincidan con la búsqueda";
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tbody.appendChild(row);
    } else {
        data.forEach(alumno => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${alumno.nombre || "-"}</td>
                <td>${alumno.apellido1 || "-"}</td>
                <td>${alumno.apellido2 || "-"}</td>
                <td>${alumno.fechaNacimiento || "-"}</td>
                <td>${alumno.curso || "-"}</td>
            `;
            tbody.appendChild(row);
        });
    }
    document.querySelector("#total").textContent = `Total: ${data.length}`;
}