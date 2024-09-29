const numeros =[2,4,6,2,88,20];

const calcularMayor =(array)=>array.reduce((max,num)=>num>max?num:max,array[0]);

const mayorNumero =calcularMayor(numeros);

console.log (mayorNumero);