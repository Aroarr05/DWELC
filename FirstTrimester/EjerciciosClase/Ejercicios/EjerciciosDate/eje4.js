//
/*

  Taking into account the current course:
    - how many days have passed since September 15?
    - how many mondays? Which ones?

*/

function diasDesdeSeptiembre15() {
  const hoy = new Date();
  const sept15 = new Date(hoy.getFullYear(), 8, 15);
  
  const diferenciaTiempo = Math.abs(hoy - sept15);
  const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
  
  return diferenciaDias;
}

function listarLunesDesdeSeptiembre15() {
  const hoy = new Date();
  const sept15 = new Date(hoy.getFullYear(), 8, 15);
  const lunes = [];
  
  let fecha = sept15;
  
  while (fecha <= hoy) {
    if (fecha.getDay() === 1) { 
      lunes.push(new Date(fecha));
    }
    fecha.setDate(fecha.getDate() + 1);
  }
  
  return lunes;
}

console.log(`Días desde el 15 de septiembre: ${diasDesdeSeptiembre15()}`);
console.log(`Lunes desde el 15 de septiembre:`, listarLunesDesdeSeptiembre15());
