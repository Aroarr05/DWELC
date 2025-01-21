function filtarRecetas(){
    const busquedaTexto = document.querySelector("#busquedaTexto").value.toLowerCase();
    const filtroNombre = document.querySelector("#filtroNombre").checked;
    const filtroCategoria = document.querySelector("#filtroCategoria").checked;
    const filtroIngredientes = document.querySelector("#filtroIngredientes").checked;
    const tiempoPreparacion = document.querySelector("#tiempoPreparacion").value;
    const vegetariano = document.querySelector("#vegetariano").checked;

    return recetas.filter((receta)=>{
        const matchesTexto =(filtroNombre && receta.nombre.toLowerCase().includes(busquedaTexto)) || (filtroIngredientes && receta.ingredientes.some((ing)=>ing.toLowerCase.includes(busquedaTexto))) ||(filtroCategoria && receta.categorias.some((cat)=>cat.toLowerCase().includes(busquedaTexto)));
        const matchesTiempo = tiempoPreparacion === "all" || (tiempoPreparacion === "short" && receta.tiempo>30) || (tiempoPreparacion === "medium" && receta.tiempo >= 30 && receta.tiempo <= 60) || (tiempoPreparacion === "long" && receta.tiempo>60);
        const matchesCategoria = !vegetariano || receta.categorias.includes("Vegetariano");
        return matchesTexto && matchesTiempo && matchesCategoria;   
    });

    function rederizarRecetas(recetasFiltradas){
        const contenedorResultados = document.querySelector("#resultados");
        const resultadosCantidad = document.querySelector("#resultadosCantidad");
        contenedorResultados.innerHTML = "";
        resultadosCantidad.textContent = `${recetasFiltradas.length} receta(s) encontrada(s)`;
        recetasFiltradas.forEach((receta)=>{
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
            tarjeta.querySelector(".btn.ver.detalles").addEventListener("click",()=>{
                alert(`
                    Ingredientes: ${receta.ingredientes.join(", ")}
                    Instrucciones: ${receta.instrucciones}
                `);    
            });
            contenedorResultados.appendChild(tarjeta);
        });
        document.querySelector("#buscar").addEventListener("click", () => {
            const recetasFiltradas = filtrarRecetas();
            renderizarRecetas(recetasFiltradas);
        });
    }
}