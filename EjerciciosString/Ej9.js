
function swapcase(texto) {
    if (typeof texto !== "string") {
        return null;
    }
    let cadena = "";

    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        if (caracter === caracter.toUpperCase()) {
            cadena += caracter.toLowerCase(); 
        } else {
            cadena += caracter.toUpperCase(); 
        }
    }
    return cadena;
}

console.log(swapcase('AaBbc'));  // "aAbBC"