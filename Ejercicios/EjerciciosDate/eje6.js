//
/*
  Write a function that calculates the number of school days remaining until the end of the
  term, (Monday to Friday).
    - Show the dates.
    - Create a timeline similar to the one in the image, showing all the days, the school days
    in one style and the others in another.

*/

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
