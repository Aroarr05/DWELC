//
/*

In this exercise you must try each of the array cloning methods listed in the notes.
- Clone a one-dimensional array. Make changes to the cloned array. Check if
everything works as expected.
- Clone a two-dimensional array. Make changes to the cloned array and one of the
internal arrays. Check if everything works as expected.

*/

const estudiantes = ["Pedro Sanchez", "María Pedregalejo", "Fernando Alonso", "Andrés Conde", "Jesús de Nazaret"]


const clonado1 = [...estudiantes];
const clonado2 = Array.from(estudiantes);
const clonado3 = estudiantes.slice();

console.log(clonado1);
console.log(clonado2);
console.log(clonado3);

const arrayBi = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const clonadoBi1 = arrayBi.map(i => [...i]);
const clonadoBi2 = arrayBi.map(i => Array.from(i));
const clonadoBi3 = arrayBi.map(i => i.slice());
console.log(arrayBi);
console.log(clonadoBi1);
console.log(clonadoBi2);
console.log(clonadoBi3);