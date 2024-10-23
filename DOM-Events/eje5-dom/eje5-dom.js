
const colores = [
    'rgb(255, 0, 0)',   // Rojo
    'rgb(0, 255, 0)',   // Verde
    'rgb(0, 0, 255)',   // Azul
    'rgb(255, 255, 0)', // Amarillo
    'rgb(255, 0, 255)', // Magenta
    'rgb(0, 255, 255)'  // Cian
];


function asignarColores() {
   
    const celdas = document.querySelectorAll('#tablaColores td');
    
    celdas.forEach((celda, index) => {
        let color = colores[index % colores.length];
        celda.style.backgroundColor = color;
    });
}

document.getElementById('asignarColoresBtn').addEventListener('click', asignarColores);

/*
for (const ele of celda)
else
*/