//
/*

Based on an array of numbers, create another array whose elements are the positive
numbers of the first one.
a) Use a traditional function definition and array manipulation technique.
b) Refactor the previous code, to use an arrow function and the array mapping function.

*/

const numeros =[1,2,3,4,5];

const cuadrados =numeros.map(numero =>numero*numero);

console.log(cuadrados);