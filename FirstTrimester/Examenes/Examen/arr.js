document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos();
    mostrarCarrito();
});


function mostrarDatos() {
   const contenedor = document.querySelector('#divProductos');
   contenedor.innerHTML='';

   productos.forEach((producto, index)=>{
    const tarjeta= document.createElement('div');
    tarjeta.innerHTML=`
        <img src=${producto.imagen} alt="${producto.nombre}">
        <br>
        <strong>${producto.nombre}</strong><br>
        Precio: $${producto.precio}<br>
        Stock: ${producto.stock}<br>
        <button onclick ="agregarAlCarrito(${index})">Añadir al carrito</button>
    `;
    contenedor.appendChild(tarjeta);
   });
}

function mostrarCarrito(){
    const tablaBody = document.querySelector('#tablaDatos tbody');
    tablaBody.innerHTML='';
    productos.forEach((producto, index) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.stock}</td>
            <td>${producto.precio}</td>
            <td></td>
            <td>
                <button onclick="modificarCantidad(${index},-1)">-<button>
                <button onclick="modificarCantidad(${index},+1)">+<button>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}