// Función para solicitar 4 calificaciones
function solicitarCalificaciones() {
    let calificaciones = [];
    for (let i = 1; i <= 4; i++) {
        let calificacion = parseFloat(prompt(`Ingresa la calificación ${i}:`));
        calificaciones.push(calificacion);
    }
    return calificaciones;
}

// Función para calcular el promedio
function calcularPromedio(calificaciones) {
    let suma = 0;
    for (let i = 0; i < calificaciones.length; i++) {
        suma += calificaciones[i];
    }
    return suma / calificaciones.length;
}

// Función para determinar la evaluación del promedio
function evaluarPromedio(promedio) {
    if (promedio < 5) {
        return "Reprobado";
    } else if (promedio >= 5 && promedio < 7) {
        return "Suficiente";
    } else if (promedio >= 7 && promedio < 9) {
        return "Bueno";
    } else {
        return "Sobresaliente";
    }
}

// Programa principal
function main() {
    let calificaciones = solicitarCalificaciones();
    let promedio = calcularPromedio(calificaciones);
    let evaluacion = evaluarPromedio(promedio);

    console.log(`Calificaciones: ${calificaciones.join(", ")}`);
    console.log(`Promedio: ${promedio.toFixed(2)}`);
    console.log(`Evaluación: ${evaluacion}`);
}

// Ejecutar el programa
main();
