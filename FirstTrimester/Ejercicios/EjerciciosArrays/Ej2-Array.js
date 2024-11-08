//
/*

    Using the function every, check if one array is exactly the same as another.

*/

let array1=[1,2,3,4];
let array2=[1,2,3,4];
let array3=[3,4,8,9];

function arrayEqual (array1,array2){
    if (array1.length !== array2.length){
        return false;
    }
    return array1.every((element,i)=>element === array2[i]);
}

console.log(arrayEqual(array1,array2));
console.log(arrayEqual(array1,array3));