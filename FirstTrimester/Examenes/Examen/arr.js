let carrito = [];

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
         Cantidad: <input type="number" id="cantidad-${index}" min="1" value="1"><br>
        <button onclick ="agregarAlCarrito(${index})">Añadir al carrito</button>
    `;
    contenedor.appendChild(tarjeta);
   });
}

function agregarAlCarrito(index){
    const inputCantidad = document.querySelector(`#caantidad-${index}`);
    const cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad)|| cantidad<=0){
        alert("Introduce una cantidad válida");
    }
    const producto = productos[index];
    const existente = carrito.find(p=>p.nombre === producto.nombre);

    if ( existente){
        existente.cantidad += cantidad;
    }else{
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,

            cantidad: cantidad
        })
    }
    mostrarCarrito();
}

function mostrarCarrito(){
    const tablaBody = document.querySelector('#tablaDatos tbody');
    tablaBody.innerHTML='';
    carrito.forEach((producto, index) =>{

        const total= producto.precio* producto.cantidad;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.stock}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>$${total.toFixed(2)}</td>
            <td>
                <button onclick="modificarCantidad(${index},-1)">-<button>
                <button onclick="modificarCantidad(${index},+1)">+<button>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

//ACCIONES
function modificarCantidad(index){
    carrito[index].cantidad += cambio;
    if(carrito[index].cantidad<=0){
        carrito.splice(index,1);
    }
    mostrarCarrito();
}

function eliminarDelCarrito(index){
    carrito.splice(index,1);
    mostrarCarrito();
}