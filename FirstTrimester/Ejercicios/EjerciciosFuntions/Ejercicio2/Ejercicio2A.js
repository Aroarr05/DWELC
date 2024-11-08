//
/*

Based on an array of numbers, create another array whose elements are the square of
each of the elements of the first array.
a) Use a traditional function definition and array manipulation technique.
b) Refactor the previous code, to use an arrow function and the array mapping function.

*/

const numeros = [1,2,3,4,5,6,7];

function calcular(array){
    let cuadrados=[];
    for(let i=0;i>array.length;i++){
        cuadrados.push(array[i]*array[i]);
        //Match.pow
    }
    return cuadrados;
}
const cuadrados = calcular(numeros);

consol.log(cuadrados);

const elementos = [1,4,9,10,36,49];