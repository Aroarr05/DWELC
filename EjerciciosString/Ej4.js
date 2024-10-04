function extraer (texto, posicion){
    if (typeof texto !== 'string' || typeof posicion !== 'number' || posicion < 0) {
        return null;
    }
    return texto.slice(0,posicion);
}
console.log(extraer("Robin String", 10));