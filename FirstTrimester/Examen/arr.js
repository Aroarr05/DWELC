document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarrito();

});


function cargarProductos() {
    let productoCard = null;
    //const contenedor = document.querySelector("#contenedor");
    const divProductos = document.querySelector("#divProductos");
    if (productoCard) {
        divProductos.innerHtml =
            `<img src="${products.imagen && products.imagen.length > 0 ? products.imagen[0] : products.imagen}" class="carta-imagen">
            <h3>${products.nombre}</h3>
            <p>Precio: ${products.precio}€ ${products.stock}</p>
            <input type="number" class="input-cantidad">
            <button class="botonComprar">Comprar</button>
            `;
        cargarProductos();
    }
   /* const botonComprar = document.querySelector(".comprar");
    botonComparar.addEventListener("click", function () {
        productoCard.removeChild();
    })
    */
  /* const cantidad = domcument.querySelector(".cantidad");
   cantidad.addEventListener("click",function(){


   })*/
}

function cargarCarrito() {
    const contenedor = document.querySelector("#contenedor");
    const divCarrito = document.querySelector("#divCarrito");
    divCarrito.innerHtml= '';
    
    /*let productoEliminar;
    const divCarrito = document.querySelector("#carrito");
    if(){
    divCarrito.innHtml =
        `<table>
            <td>
            <th>Cantidad</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acción</th>
            </td>
            <td>
            <tr>${cantidad}</tr>
            <tr>${products.nombre}</tr>
            <tr>${products.precio}</tr>
            <tr></tr>
            <tr><button class="botonEliminar">Eliminar</button></tr>
            </td>
            </table>
            <h2>Total: </h2>`;
    const botonEliminar = preDiv.querySelector(".eliminar");
    }
    botonEliminar.addEventListener("click", function () {
        productoEliminar.removeChild();
        productoEliminar.classList.remove('')
    })*/
   /*const carrito = document.querySelector(".cantidad");
   carrito.addEventListener("click", function(){

   })*/
}

