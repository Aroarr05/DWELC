function crearCronograma(fechaInicio, fechaFin, festivos) {
  let fecha = new Date(fechaInicio);
  const cronograma = [];

  while (fecha <= fechaFin) {
    const diaSemana = fecha.getDay();
    const esFinDeSemana = diaSemana === 0 || diaSemana === 6; // Fin de semana (domingo o sábado)
    const festivo = festivos.find(festivo => festivo.fecha.toDateString() === fecha.toDateString());

    let estilo;
    if (festivo) {
      estilo = `Festivo: ${festivo.descripcion}`;
    } else if (esFinDeSemana) {
      estilo = "Fin de semana";
    } else {
      estilo = "Día de clase";
    }

    cronograma.push({
      fecha: new Date(fecha),
      estilo: estilo
    });

    fecha.setDate(fecha.getDate() + 1); // Avanza al siguiente día
  }

  return cronograma;
}

const festivos = [
  { fecha: new Date(2024, 4, 1), descripcion: "Día del Trabajador" }, // 1 de mayo
  { fecha: new Date(2024, 9, 12), descripcion: "Día de la Hispanidad" } // 12 de octubre
];

const cronograma = crearCronograma(new Date(2024, 8, 1), new Date(2024, 11, 15), festivos);
console.log(cronograma);
