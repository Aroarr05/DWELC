function diasClaseRestantes(fechaFin) {
  const hoy = new Date();
  const diasClase = [];
  
  let fecha = new Date(hoy);

  while (fecha <= fechaFin) {
    const diaSemana = fecha.getDay();
    if (diaSemana >= 1 && diaSemana <= 5) { // De lunes (1) a viernes (5)
      diasClase.push(new Date(fecha));
    }
    fecha.setDate(fecha.getDate() + 1); // Avanza al siguiente día
  }

  return diasClase;
}

const finDePeriodo = new Date(2024, 11, 15); // Supongamos que el fin del periodo es el 15 de diciembre de 2024
console.log(diasClaseRestantes(finDePeriodo));
