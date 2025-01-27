document.addEventListener('DOMContentLoaded', () => {
    function mostrarServicios(listaServicios) {
        const container = document.querySelector(".container");
        container.innerHTML = ""; 
        listaServicios.forEach(servicio => {
            const divServicio = document.createElement("div");
            divServicio.className = "servicio";

            divServicio.innerHTML = `
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
                <p class="precio">${servicio.precio} €</p>
                <button class="btn" ${!servicio.disponible ? "disabled" : ""}>${servicio.disponible ? "Añadir al Carrito" : "No Disponible"}</button>
            `;

            container.appendChild(divServicio); 
        });
    }

    function addServicioCarrito(event) {
        const servicioDiv = event.target.parentElement;
        const nombreServicio = servicioDiv.querySelector("h3").innerText;
        const precioTexto = servicioDiv.querySelector(".precio").innerText;
        const precioServicio = parseFloat(precioTexto.replace("€", "").trim());

        const tbody = document.querySelector("tbody");

        let filaExistente = Array.from(tbody.querySelectorAll("tr")).find(fila =>
            fila.querySelector("td").innerText === nombreServicio
        );

        if (filaExistente) {
            // Incrementar la cantidad al añadir el mismo producto
            const cantidadTd = filaExistente.querySelector(".cantidad span");
            const subtotalTd = filaExistente.querySelector(".subtotal");
            const cantidad = parseInt(cantidadTd.innerText) + 1;

            cantidadTd.innerText = cantidad;

            const descuento = cantidad > 3 ? 0.10 : 0;
            const subtotal = cantidad * precioServicio * (1 - descuento);

            subtotalTd.innerText = `${subtotal.toFixed(2)} €`;

            if (descuento > 0) {
                filaExistente.querySelector(".descuento")?.remove();
                const descuentoMsg = document.createElement("small");
                descuentoMsg.className = "descuento";
                descuentoMsg.style.color = "green";
                descuentoMsg.innerText = "¡10% de descuento aplicado!";
                filaExistente.appendChild(descuentoMsg);
            }
        } else {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${nombreServicio}</td>
                <td>${precioServicio} €</td>
                <td class="cantidad">
                    <button class="btn btnRestar">-</button>
                    <span>1</span>
                    <button class="btn btnSumar">+</button>
                </td>
                <td class="subtotal">${precioServicio.toFixed(2)} €</td>
                <td><button class="btn btnEliminar">Eliminar</button></td>
            `;
            tbody.appendChild(tr);
        }

        actualizarCarrito();
    }

    function actualizarCarrito() {
        const filas = document.querySelectorAll("tbody tr");
        const totalSpan = document.querySelector("#total");
        const itemsCountSpan = document.querySelector("#items-count");

        let total = 0;
        let itemCount = 0;

        filas.forEach(fila => {
            const cantidad = parseInt(fila.querySelector(".cantidad").innerText);
            const precioTexto = fila.querySelector(".subtotal").innerText;
            const precioValue = parseFloat(precioTexto.replace("€", "").trim());

            if (!isNaN(precioValue)) {
                total += precioValue;
                itemCount += cantidad;
            }
        });

        totalSpan.innerText = `${total.toFixed(2)} €`;
        itemsCountSpan.innerText = itemCount;
    }

    function eliminarServicio(event) {
        if (event.target.classList.contains("btnEliminar")) {
            const fila = event.target.closest("tr");
            fila.remove();
            actualizarCarrito();
        }
    }

    function aplicarFiltros() {
        const filtroNombre = document.querySelector("#filtroNombre").value.toLowerCase();
        const filtroDisponible = document.querySelector("#filtroDisponible").checked;

        const serviciosFiltrados = servicios.filter(servicio => {
            const coincideNombre = servicio.nombre.toLowerCase().includes(filtroNombre);
            const coincideDisponibilidad = !filtroDisponible || servicio.disponible;

            return coincideNombre && coincideDisponibilidad;
        });

        mostrarServicios(serviciosFiltrados);
    }

    function modificarCantidad(event) {
        const button = event.target;
        const fila = button.closest("tr");
        const cantidadSpan = fila.querySelector(".cantidad span");
        const precioTexto = fila.querySelector("td:nth-child(2)").innerText;
        const precioUnitario = parseFloat(precioTexto.replace("€", "").trim());
        const subtotalTd = fila.querySelector(".subtotal");

        let cantidad = parseInt(cantidadSpan.innerText);

        if (button.classList.contains("btnSumar")) {
            cantidad += 1;
        } else if (button.classList.contains("btnRestar") && cantidad > 1) {
            cantidad -= 1;
        }

        cantidadSpan.innerText = cantidad;

        const descuento = cantidad > 3 ? 0.10 : 0;
        const subtotal = cantidad * precioUnitario * (1 - descuento);
        subtotalTd.innerText = `${subtotal.toFixed(2)} €`;

        if (descuento > 0) {
            fila.querySelector(".descuento")?.remove();
            const descuentoMsg = document.createElement("small");
            descuentoMsg.className = "descuento";
            descuentoMsg.style.color = "green";
            descuentoMsg.innerText = "¡10% de descuento aplicado!";
            fila.appendChild(descuentoMsg);
        } else {
            fila.querySelector(".descuento")?.remove();
        }

        actualizarCarrito();
    }

    document.querySelector("table").addEventListener("click", (event) => {
        if (event.target.classList.contains("btnSumar") || event.target.classList.contains("btnRestar")) {
            modificarCantidad(event);
        }

        if (event.target.classList.contains("btnEliminar")) {
            eliminarServicio(event);
        }
    });

    mostrarServicios(servicios);

    document.querySelector(".container").addEventListener("click", (event) => {
        if (event.target.classList.contains("btn")) {
            addServicioCarrito(event);
        }
    });

    document.querySelector("table").addEventListener("click", (event) => {
        eliminarServicio(event);
    });

    document.querySelector("#aplicarFiltros").addEventListener("click", aplicarFiltros);
});
