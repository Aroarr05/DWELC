let carrito = [];
let productos = []; // Array para almacenar los productos cargados

document.addEventListener("DOMContentLoaded", () => {
  cargarYmostrarDatos("./assets/json/productos.json");
});

function cargarYmostrarDatos(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      return response.json();
    })
    .then((data) => {
      productos = data;
      console.log("Productos cargados:", productos);
      mostrarDatos();
    })
    .catch((error) => {
      console.error("Error al cargar datos:", error);
      // Mostrar mensaje de error en la interfaz
      document.getElementById("divProductos").innerHTML =
        "<p>Error al cargar los productos. Por favor recarga la página.</p>";
    });
}

function mostrarDatos() {
  const contenedor = document.querySelector("#divProductos");
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.innerHTML = `
                    <img src="${producto.imagen}" alt="${
      producto.nombre
    }" style="max-width: 100%; height: auto;">
                    <br>
                    <strong>${producto.nombre}</strong><br>
                    Precio: $${producto.precio.toFixed(2)}<br>
                    Stock: ${producto.stock}<br>
                    Cantidad: <input type="number" id="cantidad-${index}" min="1" max="${
      producto.stock
    }" value="1"><br>
                    <button onclick="agregarAlCarrito(${index})">Añadir al carrito</button>
                `;
    contenedor.appendChild(tarjeta);
  });
}

function agregarAlCarrito(index) {
  const inputCantidad = document.getElementById(`cantidad-${index}`);
  const cantidad = parseInt(inputCantidad.value);
  const producto = productos[index];

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Introduce una cantidad válida");
    return;
  }

  if (cantidad > producto.stock) {
    alert("No hay suficiente stock disponible");
    return;
  }

  const existente = carrito.find((p) => p.nombre === producto.nombre);

  if (existente) {
    if (existente.cantidad + cantidad > producto.stock) {
      alert("No puedes agregar más de lo que hay en stock");
      return;
    }
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      nombre: producto.nombre,
      stock: producto.stock,
      precio: producto.precio,
      cantidad: cantidad,
    });
  }
  mostrarCarrito();
}

function mostrarCarrito() {
  const tablaBody = document.querySelector("#tablaDatos tbody");
  tablaBody.innerHTML = "";
  let totalCarrito = 0;

  carrito.forEach((producto, index) => {
    const total = producto.precio * producto.cantidad;
    totalCarrito += total;

    const fila = document.createElement("tr");
    fila.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${producto.precio.toFixed(2)}</td>
                    <td>$${total.toFixed(2)}</td>
                    <td>
                        <button onclick="modificarCantidad(${index}, -1)">-</button>
                        <button onclick="modificarCantidad(${index}, 1)">+</button>
                        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                    </td>
                `;
    tablaBody.appendChild(fila);
  });

  // Mostrar el total general
  document.getElementById("total-carrito").textContent = `$${totalCarrito.toFixed(2)}`;
}

function modificarCantidad(index, cambio) {
  const producto = carrito[index];
  const productoOriginal = productos.find((p) => p.nombre === producto.nombre);

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito.splice(index, 1);
  } else if (producto.cantidad > productoOriginal.stock) {
    alert("No hay suficiente stock disponible");
    producto.cantidad -= cambio; // Revertir el cambio
  }

  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}
