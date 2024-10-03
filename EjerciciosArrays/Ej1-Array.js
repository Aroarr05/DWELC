const estudiantes = ["Pedro Sanchez", "María Pedregalejo", "Fernando Alonso", "Andrés Conde", "Jesús de Nazaret"]

function ordenarPorApellido(estudiantes) {
    return estudiantes.sort((a, b) => {

        const parteA = a.split(' ');
        const parteB = b.split(' ');

        const apellidoA1 = parteA[1];
        const apellidoB1 = parteB[1];

        const apellidoA2 = parteA.length === 3 ? parteA[2] : '';
        const apellidoB2 = parteB.length === 3 ? parteB[2] : '';

        if (apellidoA1 < apellidoB1) return -1;
        if (apellidoA1 > apellidoB1) return 1;

        if (apellidoA2 < apellidoB2) return -1;
        if (apellidoA2 > apellidoB2) return 1;

        return 0;
    });

}

const estudiantesOrdenados = ordenarPorApellido(estudiantes);
console.log(estudiantesOrdenados);