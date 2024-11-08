//
/*

Based on an array of numbers, use an arrow function to calculate its average.

*/

const numeros =[-5,-4,-3,-2,-1];

function calcularPositivo(array){
 let positivos=[];
 for (let i = 0; i < array.length; i++) {
    if (array[i]>0) {
        positivos.push(array[i]); 
    } 
 }
 return positivos;
}
const numerosPositivos = calcularPositivo(numeros);

console.log(numerosPositivos);