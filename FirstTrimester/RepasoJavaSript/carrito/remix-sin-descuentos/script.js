document.addEventListener('DOMContentLoaded', () => {

    function mostrarProductos(listarProductos) {
        const container = document.querySelector(".container");
        container.innerHTML = "";
        listarProductos.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.className = "producto";
            divProducto.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">${producto.precio}€</p>
                <button class="btn" ${!producto.disponible ? "disabled" : ""}>
                    ${producto.disponible ? "Añadir al carrito" : "No disponible"}
                </button>
            `;
            container.appendChild(divProducto);
        });
    }

    function addProductoCarrito(event) {
        const productoDiv = event.target.parentElement;
        const nombreProducto = productoDiv.querySelector("h3").innerText;
        const precioTexto = productoDiv.querySelector(".precio").innerText;
        const precioProducto = parseFloat(precioTexto.replace("€", "").trim());

        const tbody = document.querySelector("tbody");

        let filaExistente = Array.from(tbody.querySelectorAll("tr")).find(fila =>
            fila.querySelector("td").innerText === nombreProducto
        );

        if (filaExistente) {
            const cantidadTd = filaExistente.querySelector(".cantidad span");
            const subtotalTd = filaExistente.querySelector(".subtotal");
            const cantidad = parseInt(cantidadTd.innerText) + 1;

            cantidadTd.innerText = cantidad;

            const descuento = cantidad > 3 ? 0.10 : 0;
            const subtotal = cantidad * precioProducto * (1 - descuento);

            subtotalTd.innerHTML = `${subtotal.toFixed(2)}€`;

            if (descuento > 0) {
                filaExistente.querySelector(".descuento")?.remove();
                const descuentoMsg = document.createElement("small");
                descuentoMsg.className = "descuento";
                descuentoMsg.style.color = "green";
                descuentoMsg.innerText = "¡10% DE DESCUENTO APLICADO!";
                filaExistente.appendChild(descuentoMsg);
            }
        } else {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${nombreProducto}</td>
                <td>${precioProducto}</td>
                <td class="cantidad">
                    <button class="btn btnRestar">-</button>
                    <span>1</span>
                    <button class="btn btnSumar">+</button>
                </td>
                <td class="subtotal">${precioProducto.toFixed(2)}€</td>
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
            const cantidad = parseInt(fila.querySelector(".cantidad span").innerText);
            const subtotalTexto = fila.querySelector(".subtotal").innerText;
            const subtotalValue = parseFloat(subtotalTexto.replace("€", "").trim());

            if (!isNaN(subtotalValue)) {
                total += subtotalValue;
                itemCount += cantidad;
            }
        });

        totalSpan.innerText = `${total.toFixed(2)} €`;
        itemsCountSpan.innerText = itemCount;
    }

    function aplicarFiltros() {
        const filtroNombre = document.querySelector("#filtroNombre").value.toLowerCase();
        const filtroDisponible = document.querySelector("#filtroDisponible").checked;

        const productosFiltrados = productos.filter(producto => {
            const coincideNombre = producto.nombre.toLowerCase().includes(filtroNombre);
            const coincideDisponibilidad = !filtroDisponible || producto.disponible;

            return coincideNombre && coincideDisponibilidad;
        });

        mostrarProductos(productosFiltrados);
    }

    function eliminarProducto(event) {
        const button = event.target;
        if (button.classList.contains("btnEliminar")) {
            const fila = button.closest("tr");
            fila.remove();
            actualizarCarrito();
        }
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
            eliminarProducto(event);
        }
    });

    document.querySelector(".container").addEventListener("click", (event) => {
        if (event.target.classList.contains("btn")) {
            addProductoCarrito(event);
        }
    });

    document.querySelector("#aplicarFiltros").addEventListener("click", aplicarFiltros);
});
