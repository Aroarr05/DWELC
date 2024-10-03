function removeDuplicates(arr) {
    return [...new Set(arr)];
}


const arrayWithDuplicates = [1, 2, 3, 4, 3, 2, 5, 6, 6];
const arrayWithoutDuplicates = removeDuplicates(arrayWithDuplicates);

console.log(arrayWithoutDuplicates);