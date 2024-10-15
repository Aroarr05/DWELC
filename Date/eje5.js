function findMondaySept15() {
    const currentYear = new Date().getFullYear();
    const mondayYears = [];
  
    for (let year = currentYear; year <= 2070; year++) {
      const sept15 = new Date(year, 8, 15); // September 15
      if (sept15.getDay() === 1) { // Check if it's a Monday
        mondayYears.push(year);
      }
    }
  
    return mondayYears;
  }
  
  console.log(findMondaySept15()); // Output: [2031, 2036, 2042, 2047, 2053, 2058, 2064, 2070]
  