// Crear un arreglo con nombres de frutas
let frutas = ["Manzana", "Banana", "Naranja", "Uva", "Mango", "Piña", "Fresa"];

// Función para buscar la posición de una fruta
function buscarFruta(fruta) {
    let posicion = frutas.indexOf(fruta);

    if (posicion !== -1) {
        console.log(`La fruta "${fruta}" se encuentra en la posición ${posicion}.`);
    } else {
        console.log(`La fruta "${fruta}" no se encuentra en el arreglo.`);
    }
}

// Solicitar una fruta al usuario y buscar su posición
let frutaABuscar = prompt("Ingresa el nombre de la fruta que deseas buscar:");
buscarFruta(frutaABuscar);
