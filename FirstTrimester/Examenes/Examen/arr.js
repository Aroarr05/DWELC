let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos();
    mostrarCarrito();
});

function mostrarDatos() {
    const contenedor = document.querySelector('#divProductos');
    contenedor.innerHTML = '';

    productos.forEach((producto, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto-card';
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <p>Stock: ${producto.stock}</p>
                <div class="producto-acciones">
                    Cantidad: <input type="number" id="cantidad-${index}" min="1" max="${producto.stock}" value="1">
                    <button onclick="agregarAlCarrito(${index})" class="btn-agregar">Añadir al carrito</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function agregarAlCarrito(index) {
    const inputCantidad = document.querySelector(`#cantidad-${index}`);
    const cantidad = parseInt(inputCantidad.value);
    const producto = productos[index];

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, introduce una cantidad válida");
        return;
    }

    if (cantidad > producto.stock) {
        alert("No hay suficiente stock disponible");
        return;
    }

    const existente = carrito.find(p => p.nombre === producto.nombre);

    if (existente) {
        if (existente.cantidad + cantidad > producto.stock) {
            alert("No puedes agregar más de lo que hay en stock");
            return;
        }
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }

    guardarCarrito();
    mostrarCarrito();
}

function mostrarCarrito() {
    const tablaBody = document.querySelector('#tablaDatos tbody');
    tablaBody.innerHTML = '';
    
    let totalCarrito = 0;

    carrito.forEach((producto, index) => {
        const total = producto.precio * producto.cantidad;
        totalCarrito += total;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.stock}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
            <td class="acciones">
                <button onclick="modificarCantidad(${index}, -1)" class="btn-modificar">-</button>
                <button onclick="modificarCantidad(${index}, +1)" class="btn-modificar">+</button>
                <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });

    document.querySelector('#total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
}

function modificarCantidad(index, cambio) {
    const producto = carrito[index];
    const productoOriginal = productos.find(p => p.nombre === producto.nombre);

    if (producto.cantidad + cambio <= 0) {
        eliminarDelCarrito(index);
        return;
    }

    if (producto.cantidad + cambio > productoOriginal.stock) {
        alert("No hay suficiente stock disponible");
        return;
    }

    producto.cantidad += cambio;
    guardarCarrito();
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}