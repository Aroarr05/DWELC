
function string_parametrize(texto){
    if(typeof texto !== 'string'){
        return null;
    }
    return texto.replace(/ /g, "-").toLowerCase();
}
console.log(string_parametrize("Robin Singh from USA"));