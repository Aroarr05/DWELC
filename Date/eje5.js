const day = new Date("2024-9-15");
const year = 2070;
let manyMondays = (day, year) => {
  let match=0;
  let years =[];
  while(day.getFullYear()<= year)
{
  if(day.getDay()==1){
    match++;
    year.push(day.getFullYear());

  }
  day.setFullYear(day.getFullYear()+1);

}
years.push("Total:"+ match);
return years;
}
console.log(manyMondays(day,year));