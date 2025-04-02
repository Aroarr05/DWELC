let ListData = [];
let filteredData = [];

document.addEventListener("DOMContentLoaded", () => {
    manejarSelectTipo();
    manejarFiltros();
    manejarOrden();

    document.querySelector(".lista-datos select").value = "Alumnos";
    cargarYmostrarDatos("../../assets/json/alumnos.json");
});

function manejarSelectTipo() {
    const selectTipo = document.querySelector(".lista-datos select");
    selectTipo.addEventListener("change", () => {
        const url = selectTipo.value === "Alumnos" ? "../../assets/json/alumnos.json" : "../../assets/json/profesores.json";
        cargarYmostrarDatos(url);
    });
}

function cargarYmostrarDatos(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            ListData = data.alumnos || data.profesores || [];
            filteredData = [];
            mostrarDatos(ListData);
        })
        .catch(error => console.error("Error al cargar datos:", error));
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
    document.querySelectorAll(".filter-group").forEach(group => {
        const select = group.querySelector("select");
        const inputs = group.querySelectorAll("input");

        if (inputs.length === 0) return;
        
        const selectValue = select.value;
        
        if (selectValue === "Está vacío" || selectValue === "Está relleno") {
            inputs.forEach(input => input.disabled = true);
        } else if (selectValue === "Comprendido entre") {
            inputs[0].disabled = false;
            inputs[1].disabled = false;
        } else {
            inputs[0].disabled = false;
            if (inputs[1]) inputs[1].disabled = true;
        }
    });
}

function filtrarDatos(data) {
    return data.filter(item => (
        filtrarCampo(item.nombre, "nombre") &&
        filtrarCampo(item.apellido1, "apellido1") &&
        filtrarCampo(item.apellido2, "apellido2") &&
        filtrarFecha(item.fechaNacimiento) &&
        filtrarCampo(item.curso, "curso")
    ));
}

function filtrarCampo(valor, campo) {
    const select = document.querySelector(`#${campo}-select`);
    const input = document.querySelector(`#${campo}-input1`);
    
    const selectValue = select.value.toLowerCase().replace(" ", "_");
    const inputValue = input ? input.value.trim().toLowerCase() : "";
    const valorStr = valor ? valor.toString().toLowerCase() : "";
    
    switch (selectValue) {
        case "comenzar_por": return inputValue ? valorStr.startsWith(inputValue) : true;
        case "terminar_en": return inputValue ? valorStr.endsWith(inputValue) : true;
        case "contiene": return inputValue ? valorStr.includes(inputValue) : true;
        case "igual_a": return inputValue ? valorStr === inputValue : true;
        case "está_vacío": return valorStr === "";
        case "está_relleno": return valorStr !== "";
        default: return true;
    }
}

function convertirFecha(fechaString) {
    if (!fechaString) return null;
    const [day, month, year] = fechaString.split('/');
    return new Date(`${year}-${month}-${day}`);
}

function filtrarFecha(fecha) {
    const select = document.querySelector("#fechaNacimiento-select");
    const input1 = document.querySelector("#fechaNacimiento-input1");
    const input2 = document.querySelector("#fechaNacimiento-input2");
    
    const selectValue = select.value.toLowerCase().replace(" ", "_");
    if (!fecha) return selectValue === "está_vacío";
    if (selectValue === "está_relleno") return true;
    
    const fechaItem = convertirFecha(fecha);
    if (!fechaItem) return false;
    
    const fechaInput1 = input1.value ? new Date(input1.value) : null;
    
    switch (selectValue) {
        case "igual_a": return fechaInput1 ? fechaItem.toDateString() === fechaInput1.toDateString() : true;
        case "posterior_a": return fechaInput1 ? fechaItem > fechaInput1 : true;
        case "anterior_a": return fechaInput1 ? fechaItem < fechaInput1 : true;
        case "comprendido_entre":
            const fechaInput2 = input2.value ? new Date(input2.value) : null;
            return fechaInput1 && fechaInput2 ? fechaItem >= fechaInput1 && fechaItem <= fechaInput2 : true;
        default: return true;
    }
}

function ordenarDatos(data) {
    const ordenarValue = document.querySelector("#ordenar-select").value.toLowerCase().replace(/ /g, "_");
    if (!ordenarValue || ordenarValue === "ninguno") return [...data];
    
    return [...data].sort((a, b) => {
        switch (ordenarValue) {
            case "nombre_a-z": return (a.nombre || "").localeCompare(b.nombre || "");
            case "nombre_z-a": return (b.nombre || "").localeCompare(a.nombre || "");
            case "apellido_a-z": return (a.apellido1 || "").localeCompare(b.apellido1 || "");
            case "apellido_z-a": return (b.apellido1 || "").localeCompare(a.apellido1 || "");
            case "curso_a-z": return (a.curso || "").localeCompare(b.curso || "");
            case "curso_z-a": return (b.curso || "").localeCompare(a.curso || "");
            case "fecha_antiguas": return convertirFecha(a.fechaNacimiento) - convertirFecha(b.fechaNacimiento);
            case "fecha_recientes": return convertirFecha(b.fechaNacimiento) - convertirFecha(a.fechaNacimiento);
            default: return 0;
        }
    });
}

function mostrarDatos(data) {
    const tbody = document.querySelector("#alumnos-list tbody");
    tbody.innerHTML = data.length ? data.map(item => `
        <tr>
            <td>${item.nombre || "-"}</td>
            <td>${item.apellido1 || "-"}</td>
            <td>${item.apellido2 || "-"}</td>
            <td>${item.fechaNacimiento || "-"}</td>
            <td>${item.curso || "-"}</td>
        </tr>`).join('') : '<tr><td colspan="5" style="text-align:center">No se encontraron datos</td></tr>';
    document.querySelector("#total").textContent = `Total: ${data.length}`;
}
