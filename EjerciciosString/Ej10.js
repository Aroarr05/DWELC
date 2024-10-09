
function camelize(str) {
    return str
        .split(' ')                  
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        })
        .join('');                    
}

console.log(camelize("JavaScript Exercises"));   
console.log(camelize("JavaScript exercises"));   
console.log(camelize("JavaScriptExercises"));