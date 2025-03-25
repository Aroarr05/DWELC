document.addEventListener("DOMContentLoaded", () => {
    fetch("../../assets/json/alumnos.json")
        .then(response => response.json())
        .then(data => {
            cargarSelects();
            selectFecha();
            selectOrdenar();
            manejarFiltros(data);
            mostrarDatos(data);
        })
        .catch(error => console.error("Error al cargar el Json", error));
});

function cargarSelects() {
    const opciones = ["Comenzar por", "Terminar en", "Contiene", "Igual a", "Está vacío", "Está relleno"];
    const selects = document.querySelectorAll("#nombre-select, #apellido1-select, #apellido2-select, #curso-select");

    selects.forEach(select => {
        select.innerHTML = ""; // Limpiar select antes de añadir opciones
        opciones.forEach(opcion => {
            let opc = document.createElement("option");
            opc.value = opcion.toLowerCase().replace(/ /g, "_");
            opc.textContent = opcion;
            select.appendChild(opc);
        });
    });
}

function selectFecha() {
    const opciones = ["Igual a", "Comprendido entre", "Posterior a", "Anterior a", "Está vacío", "Está relleno"];
    const fechaSelect = document.querySelector("#fechaNacimiento-select");

    fechaSelect.innerHTML = "";
    opciones.forEach(option => {
        const opc = document.createElement("option");
        opc.value = option.toLowerCase().replace(/ /g, "_");
        opc.textContent = option;
        fechaSelect.appendChild(opc);
    });
}

function selectOrdenar() {
    const opciones = ["Ascendente", "Descendente", "Nombre", "Apellido", "Curso", "Fecha de Nacimiento"];
    const ordenarSelect = document.querySelector("#ordenar-select");

    ordenarSelect.innerHTML = "";
    opciones.forEach(option => {
        const opc = document.createElement("option");
        opc.value = option.toLowerCase().replace(/ /g, "_");
        opc.textContent = option;
        ordenarSelect.appendChild(opc);
    });
}

function manejarFiltros(data) {
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", () => actualizarInputs(select));
    });

    document.querySelector("#filtrar-btn").addEventListener("click", () => filtrarDatos(data));
}

function actualizarInputs(select) {
    const parent = select.parentElement;
    const inputs = parent.querySelectorAll("input");

    if (select.value === "está_vacío" || select.value === "está_relleno") {
        inputs.forEach(input => input.disabled = true);
    } else if (select.value === "comprendido_entre") {
        inputs.forEach(input => input.disabled = false);
    } else {
        inputs[0].disabled = false;
        if (inputs[1]) inputs[1].disabled = true;
    }
}

function filtrarDatos(data) {
    let alumnosFiltrados = data.alumnos.filter(alumno => {
        return filtrarCampo(alumno.nombre, "#nombre-select", "#nombre-input1", "#nombre-input2") &&
            filtrarCampo(alumno.apellido1, "#apellido1-select", "#apellido1-input1", "#apellido1-input2") &&
            filtrarCampo(alumno.apellido2, "#apellido2-select", "#apellido2-input1", "#apellido2-input2") &&
            filtrarFecha(alumno.fechaNacimiento, "#fechaNacimiento-select", "#fechaNacimiento-input1", "#fechaNacimiento-input2") &&
            filtrarCampo(alumno.curso, "#curso-select", "#curso-input1", "#curso-input2");
    });
    mostrarDatos({ alumnos: alumnosFiltrados });
}

function filtrarCampo(valor, selectId, input1Id, input2Id) {
    const selectValue = document.querySelector(selectId).value;
    const input1 = document.querySelector(input1Id).value.trim().toLowerCase();
    const input2 = document.querySelector(input2Id) ? document.querySelector(input2Id).value.trim().toLowerCase() : "";

    valor = valor ? valor.toLowerCase() : "";

    switch (selectValue) {
        case "comenzar_por": return valor.startsWith(input1);
        case "terminar_en": return valor.endsWith(input1);
        case "contiene": return valor.includes(input1);
        case "igual_a": return valor === input1;
        case "está_vacío": return valor === "";
        case "está_relleno": return valor !== "";
        default: return true;
    }
}

function filtrarFecha(valor, selectId, input1Id, input2Id) {
    const selectValue = document.querySelector(selectId).value;
    const fecha1 = document.querySelector(input1Id).value;
    const fecha2 = document.querySelector(input2Id) ? document.querySelector(input2Id).value : "";

    if (!valor) return selectValue === "está_vacío";
    if (selectValue === "está_relleno") return valor !== "";
    if (!fecha1) return true;

    const dateValor = new Date(valor.split("/").reverse().join("-"));
    const date1 = new Date(fecha1);
    const date2 = fecha2 ? new Date(fecha2) : null;

    switch (selectValue) {
        case "igual_a": return dateValor.getTime() === date1.getTime();
        case "posterior_a": return dateValor > date1;
        case "anterior_a": return dateValor < date1;
        case "comprendido_entre": return date2 ? dateValor >= date1 && dateValor <= date2 : false;
        default: return true;
    }
}

function mostrarDatos(data) {
    const table = document.querySelector("#alumnos-list");
    table.innerHTML = "";
    const headerRow = document.createElement("tr");
    ["Nombre", "1º Apellido", "2º Apellido", "Fecha de Nacimiento", "Curso"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.alumnos.forEach(alumno => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${alumno.nombre || "-"}</td>
            <td>${alumno.apellido1 || "-"}</td>
            <td>${alumno.apellido2 || "-"}</td>
            <td>${alumno.fechaNacimiento || "-"}</td>
            <td>${alumno.curso || "-"}</td>
        `;
        table.appendChild(row);
    });
    document.querySelector("#total").textContent = `Total de alumnos: ${data.alumnos.length}`;
}
