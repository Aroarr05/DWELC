function obtenerDiaHoraActual() {
  const diasDeLaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const ahora = new Date();
  
  const dia = diasDeLaSemana[ahora.getDay()];
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  const segundos = ahora.getSeconds();
  
  const periodo = horas >= 12 ? 'PM' : 'AM';
  const horasFormateadas = horas % 12 || 12; // Convertir a formato de 12 horas
  const minutosFormateados = minutos.toString().padStart(2, '0');
  const segundosFormateados = segundos.toString().padStart(2, '0');
  
  return `${dia}. Ahora: ${horasFormateadas}${periodo} ${minutosFormateados}:${segundosFormateados}`;
}

console.log(obtenerDiaHoraActual());
