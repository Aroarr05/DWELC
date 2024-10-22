function findMondaySept15() {
    const currentYear = new Date().getFullYear();
    const mondayYears = [];
  
    for (let year = currentYear; year <= 2070; year++) {
      const sept15 = new Date(year, 8, 15); 
      if (sept15.getDay() === 1) { 
        mondayYears.push(year);
      }
    }
  
    return mondayYears;
  }
  
  console.log(findMondaySept15()); 
  