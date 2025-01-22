function mostrarServicios(){
    const container = document.querySelector(".container");
    servicios.forEach(servicio => {
        const divServicio = document.createElement("div");
        const hNombre = document.createElement("h3");
        const pDescripcion = document.createElement("p");
        const pPrecio = document.createElement("p");
        const btnContratar = document.createElement("button");

        hNombre.innerHTML =servicio.nombre;
        pDescripcion.innerHTML = servicio.descripcion;
        pPrecio.innerHTML = `${servicio.precio}€`;
        pPrecio.className = "precio";
        btnContratar.innerText = "Contratar";
        btnContratar.className = "btnContratar";

        if(!servicio.disponible){
            btnContratar.disabled = true;
            btnContratar.innerText = "No disponible";
        }

        divServicio.className = "servicio";
        divServicio.appendChild(hNombre);
        divServicio.appendChild(pDescripcion);
        divServicio.appendChild(pPrecio);
        divServicio.appendChild(btnContratar);

        container.appendChild(divServicio);
        
    });
}

function addServiciosTabla(event){
    const tbody = document.querySelector("tbody");
    const servicioDiv = event.target.parentElement;
    const nombreServicio = servicioDiv.querySelector("h3").innerHTML;
    const precioTexto = servicioDiv.querySelector(".precio").innerText;
    const precioServicio = parseFloat(precioTexto.replace("€","").trim());

    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    const tdPrecio = document.createElement("td");
    const tdAccion = document.createElement("td");

    tdNombre.innerHTML = nombreServicio;
    tdPrecio.innerText = `${precioServicio}€`;
    tdPrecio.className = "precio";

    tdAccion.innerHTML = `<button class="btnEliminar">Eliminar</button>`;

    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdAccion);

    tbody.appendChild(tr);

    actualizarTotal();
}

function actualizarTotal() {
    const filas = document.querySelectorAll("tbody tr");
    const totalSpan = document.querySelector("#total");
    let total = 0;

    filas.forEach(fila => {
        const precioTexto = fila.querySelector(".precio").innerText;
        const precioValue = parseFloat(precioTexto.replace("€", "").trim());
        if (!isNaN(precioValue)) {
            total += precioValue;
        }
    });

    totalSpan.innerText = `${total.toFixed(2)} €`;
}

function eliminarServicio(event) {
    if (event.target.classList.contains("btnEliminar")) {
        const fila = event.target.closest("tr");
        fila.remove();
        actualizarTotal();
    }
}
window.onload = () => {
    mostrarServicios();

    document.querySelector(".container").addEventListener("click", (e) => {
        if (e.target.classList.contains("btnContratar")) {
            addServicosTabla(e);
        }
    });

    document.querySelector("table").addEventListener("click", (e) => {
        eliminarServicio(e);
    });
};


