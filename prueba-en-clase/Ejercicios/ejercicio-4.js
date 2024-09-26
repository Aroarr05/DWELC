// Función para solicitar la edad
function solicitarEdad() {
    let edad = parseInt(prompt("Por favor, ingresa tu edad:"));
    return edad;
}

// Función para evaluar la edad y mostrar mensajes
function evaluarEdad(edad) {
    if (edad >= 18 && edad <= 120) {
        console.log("¡Excelente! Tienes la edad suficiente para disfrutar de todas las oportunidades.");
    } else {
        console.log("Parece que la edad ingresada no es válida o estás fuera del rango esperado.");
    }
}

// Programa principal
function main() {
    let edad = solicitarEdad();
    evaluarEdad(edad);
}

// Ejecutar el programa
main();
