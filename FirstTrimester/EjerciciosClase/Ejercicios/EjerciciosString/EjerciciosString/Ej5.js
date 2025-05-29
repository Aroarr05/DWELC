
function abreviacion(nombreApellido){
    let nombre = '';
    let apellido = '';
    let partes = nombreApellido.split(" ");

    nombre = partes[0];

    //for (let i =1;<partes.lenght)

    if (partes.length > 1){
        apellido = partes[1].charAt(0).toUpperCase();
    }
    console.log(nombre + ' ' + apellido + '.');
}

abreviacion("Andres Conde");