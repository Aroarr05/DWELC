
function uncamelize (str, separator = ' '){
    return str
        .replace(/([a-z])([A-Z])/g,'$1'+ separator + '$2')
        .toLowerCase();
}

console.log(uncamelize('HelloWorld'));
console.log(uncamelize('HelloWorld', '-'));
console.log(uncamelize('HelloWord','_'));