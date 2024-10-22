
function mostrarEncabezados() {

    let encabezados = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    let resultadosDiv = document.getElementById('resultados');

    encabezados.forEach(function(encabezado) {
        let nivel = encabezado.tagName.toLowerCase(); 
        let nuevoParrafo = document.createElement('p');
        nuevoParrafo.textContent = `Encabezado ${nivel}`;
        resultadosDiv.appendChild(nuevoParrafo);
    });
}

mostrarEncabezados();
