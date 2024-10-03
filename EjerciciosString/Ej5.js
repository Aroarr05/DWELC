function abreviacion(nombreApellido){
    let nombre = '';
    let apellido = '';
    let partes = nombreApellido.split(" ");

    nombre = partes[0];

    if (partes.length != 1){
        apellido = partes[partes.length-1].charAt(0).toUpperCase();
    }
    console.log(nombre + ' ' + apellido + '.');
}

abreviacion("Andres Conde");