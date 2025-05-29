// Hay un objeto 'salaries' con un número arbitrario de salarios.

// Escribe una función que muestre el número de propiedades del objeto y que devuelva la suma de todos los salarios utilizados 'Object.values' y el bucle 'for..of'.

const salaries={
    "John":100,
    "Pete":300,
    "Mary":250
};

function processSalaries(salaries){

    const salaryValues = Object.values(salaries);

    let totalSalary =0;
    for(const salary of salaryValues){
        totalSalary += salary;
    }

    console.log(`Número de propiedades: ${Object.keys(salaries).length}`);

    const sortedEntries = Object.entries(salaries).sort(([nameA],[nameB]) => nameA.localeCompare(nameB));
    console.log("Nombres ordenados alfabéticamente con sus valores:");
    for(const[name, salary] of sortedEntries){
        console.log(`${name}: ${salary}`)
    }
    return totalSalary;
}

const total = processSalaries(salaries);
console.log (`Suma total de salarios: ${total}`);