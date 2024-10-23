// a
let ageTable = document.getElementById('age-table');
console.log(ageTable);

// b
let labelsInTable = ageTable.getElementsByTagName('label');
console.log(labelsInTable); 

// c 
let firstTd = ageTable.querySelector('td');
console.log(firstTd); 

// d
let searchForm = document.forms['search'];
console.log(searchForm);

// e
let firstInput = searchForm.querySelector('input');
console.log(firstInput);

// f
let inputs = searchForm.querySelectorAll('input');
let lastInput = inputs[inputs.length - 1];
console.log(lastInput); 