// Filtrar recetas
function filtrarRecetas() {
    const busquedaTexto = document.querySelector("#busquedaTexto").value.toLowerCase();
    const filtroNombre = document.querySelector("#filtroNombre").checked;
    const filtroIngredientes = document.querySelector("#filtroIngredientes").checked;
    const filtroCategoria = document.querySelector("#filtroCategoria").checked;
    const tiempoPreparacion = document.querySelector("#tiempoPreparacion").value;
    const vegetariano = document.querySelector("#vegetariano").checked;
    return recetas.filter((receta) => {
        // Filtrar por texto
        const matchesTexto =
            (filtroNombre && receta.nombre.toLowerCase().includes(busquedaTexto)) ||
            (filtroIngredientes &&
                receta.ingredientes.some((ing) => ing.toLowerCase().includes(busquedaTexto))) ||
            (filtroCategoria && receta.categorias.some((cat) => cat.toLowerCase().includes(busquedaTexto)));
        // Filtrar por tiempo de preparación
        const matchesTiempo =
            tiempoPreparacion === "all" ||
            (tiempoPreparacion === "short" && receta.tiempo < 30) ||
            (tiempoPreparacion === "medium" && receta.tiempo >= 30 && receta.tiempo <= 60) ||
            (tiempoPreparacion === "long" && receta.tiempo > 60);
        // Filtrar por categorías específicas
        const matchesCategoria = !vegetariano || receta.categorias.includes("Vegetariano");
        return matchesTexto && matchesTiempo && matchesCategoria;
    });
}
// Renderizar recetas
function renderizarRecetas(recetasFiltradas) {
    const contenedorResultados = document.querySelector("#resultados");
    const resultadosCantidad = document.querySelector("#resultadosCantidad");
    // Limpiar resultados previos
    contenedorResultados.innerHTML = "";
    resultadosCantidad.textContent = `${recetasFiltradas.length} receta(s) encontrada(s)`;
    // Crear tarjetas para cada receta
    recetasFiltradas.forEach((receta) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col";
        tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${receta.imagen}" class="card-img-top" alt="${receta.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${receta.nombre}</h5>
                    <p class="card-text">
                        Tiempo de preparación: ${receta.tiempo} min<br>
                        Categorías: ${receta.categorias.join(", ") || "Ninguna"}
                    </p>
                    <button class="btn btn-secondary btn-ver-detalles">Ver Detalles</button>
                </div>
            </div>
        `;
        // Agregar event listener para ver detalles
        tarjeta.querySelector(".btn-ver-detalles").addEventListener("click", () => {
            alert(`
                Ingredientes: ${receta.ingredientes.join(", ")}
                Instrucciones: ${receta.instrucciones}
            `);
        });
        contenedorResultados.appendChild(tarjeta);
    });
}
// Configurar el botón de búsqueda
document.querySelector("#buscar").addEventListener("click", () => {
    const recetasFiltradas = filtrarRecetas();
    renderizarRecetas(recetasFiltradas);
});
