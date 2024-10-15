function getDateDetails(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const day = daysOfWeek[date.getDay()]; // getDay() devuelve un número del 0-6 (Domingo-Sábado)
    const month = months[date.getMonth()]; // getMonth() devuelve un número del 0-11
    const year = date.getFullYear(); // getFullYear() devuelve el año completo
  
    return `${day}, ${month} ${year}`;
  }
  
  console.log(getDateDetails(new Date()));
  