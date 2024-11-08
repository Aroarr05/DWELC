//
/* 

  Write a function that receives a date and displays the corresponding day of the week as a
  string, the name of the month and the full year.
 
*/

function getDateDetails(date) {
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const day = week[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${month} ${year}`;
}

console.log(getDateDetails(new Date()));
