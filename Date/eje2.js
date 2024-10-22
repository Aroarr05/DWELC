function getDateDetails(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const day = daysOfWeek[date.getDay()]; 
    const month = months[date.getMonth()]; 
    const year = date.getFullYear(); 
  
    return `${day}, ${month} ${year}`;
  }
  
  console.log(getDateDetails(new Date()));
  