let ListData = [];
let filteredData = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarSelects();
    cargarSelectFecha();
    cargarSelectOrdenar();
    cargarYmostrarDatos("../../assets/json/alumnos.json");
    
    document.querySelector("#alumnos").addEventListener("change", () => {
        if (document.querySelector("#alumnos").checked) {
            document.querySelector("#profesores").checked = false;
            cargarYmostrarDatos("../../assets/json/alumnos.json");
        }
    });

    document.querySelector("#profesores").addEventListener("change", () => {
        if (document.querySelector("#profesores").checked) {
            document.querySelector("#alumnos").checked = false;
            cargarYmostrarDatos("../../assets/json/profesores.json");
        }
    });

    document.querySelector("#filtrar-btn").addEventListener("click", () => {
        filteredData = filtrarDatos([...ListData]);
        mostrarDatos(filteredData);
    });

    document.querySelector("#ordenar-btn").addEventListener("click", () => {
        const dataToOrder = filteredData.length ? filteredData : [...ListData];
        mostrarDatos(ordenarDatos(dataToOrder));
    });

    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", actualizarInputs);
    });
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

function manejarFiltros() {
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", actualizarInputs);
    });
    
    document.querySelector("#filtrar-btn").addEventListener("click", () => {
        console.log("Filtrando datos...");
        filteredData = filtrarDatos([...ListData]);
        console.log("Datos filtrados: ", filteredData);
        mostrarDatos(filteredData);  
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
    console.log("Datos a filtrar:", data);
    const filtered = data.filter(item => {
        const nombreValido = filtrarCampo(item.nombre, "nombre");
        const apellido1Valido = filtrarCampo(item.apellido1, "apellido1");
        const apellido2Valido = filtrarCampo(item.apellido2, "apellido2");
        const fechaValida = filtrarFecha(item.fechaNacimiento);
        const cursoValido = filtrarCampo(item.curso, "curso");
        
        console.log(`Filtros para ${item.nombre}:`, {
            nombreValido,
            apellido1Valido,
            apellido2Valido,
            fechaValida,
            cursoValido
        });
        
        return nombreValido && apellido1Valido && apellido2Valido && fechaValida && cursoValido;
    });
    console.log("Datos filtrados:", filtered);
    return filtered;
}

function filtrarCampo(valor, campo) {
    const select = document.querySelector(`#${campo}-select`);
    const input = document.querySelector(`#${campo}-input1`);
    
    const selectValue = select.value;
    const inputValue = input ? input.value.trim().toLowerCase() : "";
    
    const valorStr = (valor === null || valor === undefined) ? "" : valor.toString().toLowerCase();
    
    console.log(`Filtrando ${campo}:`, {
        valorOriginal: valor,
        valorStr,
        selectValue,
        inputValue
    });

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

function convertirFecha(fechaStr) {
    if (!fechaStr || fechaStr.trim() === "") return null;
    const [day, month, year] = fechaStr.split('/');
    if (!day || !month || !year) return null;
    return new Date(`${year}-${month}-${day}`);
}

function filtrarFecha(fecha) {
    const select = document.querySelector("#fechaNacimiento-select");
    const input1 = document.querySelector("#fechaNacimiento-input1");
    const input2 = document.querySelector("#fechaNacimiento-input2");

    const selectValue = select.value;
    
    console.log(`Filtrando fecha: ${fecha}`, {selectValue});

    if (selectValue === "está_vacío") return !fecha || fecha.trim() === "";
    if (selectValue === "está_relleno") return !!fecha && fecha.trim() !== "";

    if (!fecha || fecha.trim() === "") return false;

    try {
        const fechaItem = convertirFecha(fecha);
        if (!fechaItem) return false;

        const fecha1 = input1.value ? new Date(input1.value) : null;
        
        if ((selectValue === "igual_a" || selectValue === "posterior_a" || 
             selectValue === "anterior_a") && !fecha1) {
            return true;
        }

        switch(selectValue) {
            case "igual_a":
                return fechaItem.toDateString() === fecha1.toDateString();
            case "posterior_a":
                return fechaItem > fecha1;
            case "anterior_a":
                return fechaItem < fecha1;
            case "comprendido_entre":
                const fecha2 = input2.value ? new Date(input2.value) : null;
                if (!fecha1 || !fecha2) return true;
                return fechaItem >= fecha1 && fechaItem <= fecha2;
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
                return new Date(a.fechaNacimiento?.split('/').reverse().join('-') || 0) - 
                       new Date(b.fechaNacimiento?.split('/').reverse().join('-') || 0);
            case "fecha_recientes":
                return new Date(b.fechaNacimiento?.split('/').reverse().join('-') || 0) - 
                       new Date(a.fechaNacimiento?.split('/').reverse().join('-') || 0);
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