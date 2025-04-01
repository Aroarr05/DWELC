document.addEventListener("DOMContentLoaded", () => {
    let ListData = [];
    let filteredData = [];

    const selector = document.querySelector(".lista-datos select");
    
    // Cargar datos al cambiar el selector
    selector.addEventListener("change", () => cargarDatos(selector.value));

    // Cargar datos iniciales
    cargarDatos(selector.value || "Alumnos");

    // Configurar eventos de filtrado y ordenación
    document.querySelector("#filtrar-btn").addEventListener("click", () => {
        filteredData = filtrarDatos(ListData);
        mostrarDatos(filteredData);
    });

    document.querySelector("#ordenar-btn").addEventListener("click", () => {
        const dataToOrder = filteredData.length ? filteredData : ListData;
        mostrarDatos(ordenarDatos(dataToOrder));
    });
});

function cargarDatos(tipo) {
    const url = tipo === "Alumnos" ? "../../assets/json/alumnos.json" : "../../assets/json/profesores.json";

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Error en la carga de datos");
            return response.json();
        })
        .then(datos => {
            ListData = datos.alumnos || datos.profesores || [];
            mostrarDatos(ListData);
        })
        .catch(error => console.error("Error al cargar los datos:", error));
}

function mostrarDatos(data) {
    const tbody = document.querySelector("#alumnos-list tbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No se encontraron resultados</td></tr>';
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

function filtrarDatos(data) {
    return data.filter(alumno => (
        filtrarCampo(alumno.nombre, "#nombre-select", "#nombre-input1") &&
        filtrarCampo(alumno.apellido1, "#apellido1-select", "#apellido1-input1") &&
        filtrarCampo(alumno.apellido2, "#apellido2-select", "#apellido2-input1") &&
        filtrarFecha(alumno.fechaNacimiento, "#fechaNacimiento-select", "#fechaNacimiento-input1", "#fechaNacimiento-input2") &&
        filtrarCampo(alumno.curso, "#curso-select", "#curso-input1")
    ));
}

function ordenarDatos(data) {
    const ordenarValue = document.querySelector("#ordenar-select").value;
    if (ordenarValue === "Ninguno") return data;

    return [...data].sort((a, b) => {
        switch (ordenarValue) {
            case "Nombre (A-Z)": return a.nombre.localeCompare(b.nombre);
            case "Nombre (Z-A)": return b.nombre.localeCompare(a.nombre);
            case "Apellido (A-Z)": return a.apellido1.localeCompare(b.apellido1);
            case "Apellido (Z-A)": return b.apellido1.localeCompare(a.apellido1);
            case "Curso (A-Z)": return a.curso.localeCompare(b.curso);
            case "Curso (Z-A)": return b.curso.localeCompare(a.curso);
            case "Fecha (Antiguas)": return new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento);
            case "Fecha (Recientes)": return new Date(b.fechaNacimiento) - new Date(a.fechaNacimiento);
            default: return 0;
        }
    });
}
