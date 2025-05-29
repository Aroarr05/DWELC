// Obtener JSON (puedes cargarlo desde un archivo externo o una API)
const data = {
    "productos": [
        {
            "nombre": "Laptop Gamer",
            "categoria": "Electrónica",
            "precio": 1200,
            "enOferta": true,
            "imagen": "https://via.placeholder.com/150",
            "descripcion": "Laptop potente para juegos y trabajo."
        },
        {
            "nombre": "Cafetera Eléctrica",
            "categoria": "Hogar",
            "precio": 80,
            "enOferta": false,
            "imagen": "https://via.placeholder.com/150",
            "descripcion": "Cafetera automática con función de temporizador."
        },
        {
            "nombre": "Teléfono Móvil",
            "categoria": "Electrónica",
            "precio": 600,
            "enOferta": true,
            "imagen": "https://via.placeholder.com/150",
            "descripcion": "Teléfono con cámara de alta resolución y pantalla AMOLED."
        },
        {
            "nombre": "Silla de Oficina",
            "categoria": "Muebles",
            "precio": 200,
            "enOferta": false,
            "imagen": "https://via.placeholder.com/150",
            "descripcion": "Silla ergonómica con soporte lumbar ajustable."
        }
    ]
};

// Filtrar productos
function filtrarProductos() {
    const busquedaTexto = document.querySelector("#busquedaTexto").value.toLowerCase();
    const filtroCategoria = document.querySelector("#filtroCategoria").value;
    const rangoPrecio = document.querySelector("#rangoPrecio").value;
    const enOferta = document.querySelector("#enOferta").checked;

    return data.productos.filter(producto => {
        const matchesTexto = producto.nombre.toLowerCase().includes(busquedaTexto);
        const matchesCategoria = filtroCategoria === "all" || producto.categoria === filtroCategoria;
        const matchesPrecio = rangoPrecio === "all" ||
            (rangoPrecio === "low" && producto.precio < 100) ||
            (rangoPrecio === "medium" && producto.precio >= 100 && producto.precio <= 500) ||
            (rangoPrecio === "high" && producto.precio > 500);
        const matchesOferta = !enOferta || producto.enOferta;

        return matchesTexto && matchesCategoria && matchesPrecio && matchesOferta;
    });
}

// Renderizar productos
function renderizarProductos(productosFiltrados) {
    const divResultados = document.querySelector("#resultados");
    const resultCantidad = document.querySelector("#resultadosCantidad");

    divResultados.innerHTML = "";
    resultCantidad.textContent = `${productosFiltrados.length} producto(s) encontrados`;

    productosFiltrados.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col";

        tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">
                        Categoría: ${producto.categoria}<br>
                        Precio: ${producto.precio} €<br>
                        ${producto.enOferta ? "<strong>En oferta</strong>" : ""}
                    </p>
                    <button class="btn btn-secondary btn-ver-detalles">Ver Detalles</button>
                </div>
            </div>
        `;

        tarjeta.querySelector(".btn-ver-detalles").addEventListener("click", () => {
            mostrarDetallesProducto(producto);
        });

        divResultados.appendChild(tarjeta);
    });
}

// Mostrar detalles del producto en el contenedor
function mostrarDetallesProducto(producto) {
    const divDetalles = document.querySelector("#detallesProducto");

    divDetalles.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100px;">
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precio} €</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p>${producto.enOferta ? "<strong>Este producto está en oferta.</strong>" : "No está en oferta."}</p>
    `;
}

// Eventos
document.querySelector("#buscar").addEventListener("click", () => {
    const productosFiltrados = filtrarProductos();
    renderizarProductos(productosFiltrados);
});
