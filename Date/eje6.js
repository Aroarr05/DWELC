function diasClaseRestantes(fechaFin) {
  const hoy = new Date();
  const diasClase = [];
  
  let fecha = new Date(hoy);

  while (fecha <= fechaFin) {
    const diaSemana = fecha.getDay();
    if (diaSemana >= 1 && diaSemana <= 5) { 
      diasClase.push(new Date(fecha));
    }
    fecha.setDate(fecha.getDate() + 1); 
  }

  return diasClase;
}

const finDePeriodo = new Date(2024, 11, 15);
console.log(diasClaseRestantes(finDePeriodo));
