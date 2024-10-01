/*const numeros =[2,4,6,2,88,20];

const calcularMayor =(array)=>array.reduce((max,num)=>num>max?num:max,array[0]);

const mayorNumero =calcularMayor(numeros);

console.log (mayorNumero);*/

function demoParams(num1,num2){
    console.log("in");
    //console.log(aeguments);
    //console.log(aeguments.lenght);
    console.log(aeguments[0]);
    console.log(num1);
    console.log(aeguments[1]);
    console.log(num2);
    console.log(aeguments[2]);

}
demoParams(1,2,4,6,'hola');

function createPerson(name,surname,...cities){
    const person={};
    person.name=nameA;
    person.surname=surnameA;
    person.locations= cities;

    cities.array.forEach(c => console.log(c));

    console.log(person);
    console.log(person.locations);



}
createPerson('anaa','pablo','carlos','maria');