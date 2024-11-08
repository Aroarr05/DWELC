// Función para solicitar el número del mes
function solicitarMes() {
    let mes = parseInt(prompt("Por favor, ingresa el número de un mes (1-12):"));
    return mes;
}

// Función para determinar la cantidad de días en el mes
function mostrarDiasDelMes(mes) {
    switch (mes) {
        case 1: // Enero
        case 3: // Marzo
        case 5: // Mayo
        case 7: // Julio
        case 8: // Agosto
        case 10: // Octubre
        case 12: // Diciembre
            console.log("Este mes tiene 31 días.");
            break;
        case 4: // Abril
        case 6: // Junio
        case 9: // Septiembre
        case 11: // Noviembre
            console.log("Este mes tiene 30 días.");
            break;
        case 2: // Febrero
            console.log("Febrero tiene 28 días, y 29 días en año bisiesto.");
            break;
        default:
            console.log("Número de mes no válido. Debes ingresar un número entre 1 y 12.");
    }
}

// Programa principal
function main() {
    let mes = solicitarMes();
    mostrarDiasDelMes(mes);
}

// Ejecutar el programa
main();

//tmb se puede hacer con array