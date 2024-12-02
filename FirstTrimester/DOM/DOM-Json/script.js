// Función para ordenar provincias según un criterio y orden especificados
function ordenarProvincias(provincias, criterio, orden) {
    return provincias.sort((a, b) => {
        let valorA, valorB;

        // Determinar los valores a comparar según el criterio
        if (criterio === "alfabeticamente") {
            valorA = a.label; // Comparar por el nombre de la provincia
            valorB = b.label;
        } else if (criterio === "nCiudades") {
            valorA = a.towns.length; // Comparar por el número de ciudades
            valorB = b.towns.length;
        }

        // Ordenar según el criterio de orden (ascendente o descendente)
        if (orden === "asc") {
            return valorA > valorB ? 1 : (valorA < valorB ? -1 : 0); // Orden ascendente
        } else if (orden === "desc") {
            return valorA < valorB ? 1 : (valorA > valorB ? -1 : 0); // Orden descendente
        }
    });
}

// Función para generar y mostrar el acordeón con las comunidades y provincias
function mostrarAcordeon() {
    // Obtener los valores de los campos de selección para el modo y orden de ordenamiento
    const ordenarModo = document.querySelector("#ordenarModo").value; // Criterio de ordenamiento
    const ordenarOrden = document.querySelector("#ordenarOrden").value; // Orden (ascendente o descendente)

    // Seleccionar el contenedor del acordeón
    const acordeonContainer = document.querySelector("#accordion");
    acordeonContainer.innerHTML = ""; // Limpiar el contenido previo del acordeón

    // Iterar sobre las comunidades autónomas
    comunidades.forEach(comunidad => {
        // Ordenar las provincias de la comunidad según el criterio y orden seleccionados
        const ordenProvincias = ordenarProvincias(comunidad.provinces, ordenarModo, ordenarOrden);

        // Crear un elemento de acordeón para la comunidad
        const comunidadItem = document.createElement("div");
        comunidadItem.classList.add("accordion-item");

        // Generar el contenido del acordeón para la comunidad
        comunidadItem.innerHTML = `
        <h2 class="accordion-header" id="comunidad-${comunidad.code}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${comunidad.code}" aria-expanded="true" aria-controls="collapse-${comunidad.code}">
                ${comunidad.label} (${comunidad.provinces.length} Provincias) <!-- Mostrar el nombre y cantidad de provincias -->
            </button>
        </h2>
        <div id="collapse-${comunidad.code}" class="accordion-collapse collapse" aria-labelledby="comunidad-${comunidad.code}" data-bs-parent="#accordion">
            <div class="accordion-body">
                <ul class="list-group">
                    ${ordenProvincias.map(provincia => `
                        <li class="list-group-item">
                            <!-- Botón para desplegar las ciudades de la provincia -->
                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#provincia-${provincia.code}">
                            ${provincia.label} (${provincia.towns.length} Ciudades) <!-- Mostrar el nombre y cantidad de ciudades -->
                            </button> 
                            <div id="provincia-${provincia.code}" class="collapse">
                                <ul class="list-group">
                                    <!-- Generar lista de ciudades -->
                                    ${provincia.towns.map(ciudad => `<li class="list-group-item">${ciudad.label}</li>`).join('')}
                                </ul>
                            </div>
                        </li>
                    `).join('')} <!-- Unir todos los elementos generados en un solo string -->
                </ul>
            </div>
        </div>
        `;
        // Agregar el elemento generado al contenedor del acordeón
        acordeonContainer.appendChild(comunidadItem);
    });
}

// Función para actualizar el acordeón cuando cambian los valores seleccionados
function actualizarAcordeon() {
    mostrarAcordeon(); // Vuelve a generar el acordeón con los nuevos valores
}

// Agregar eventos "blur" a los campos de selección para actualizar el acordeón
document.querySelector("#ordenarModo").addEventListener("blur", actualizarAcordeon); // Actualiza al perder el foco
document.querySelector("#ordenarOrden").addEventListener("blur", actualizarAcordeon); // Actualiza al perder el foco
