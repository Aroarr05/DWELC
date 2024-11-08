//
/* 

Based on an array of numbers, use an arrow function to calculate its average.

*/

const numeros =[10,20,30,40,50];

const calcularPromedio = (array)=>{
    const suma =array.reduce((acumulador,num)=>acumulador+num,0);
    return suma / array.length;
};
const promedio = calcularPromedio(numeros);
console.log(promedio);
