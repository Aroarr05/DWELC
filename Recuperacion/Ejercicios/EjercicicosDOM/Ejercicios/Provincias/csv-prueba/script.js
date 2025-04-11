let datosCentros = [];

document.addEventListener("DOMContentLoaded",  () => {
    datosCentros = cargarDatos("../../../../../assets/json/da_centros.csv");

    console.log("fffff",datosCentros)
    mostrarCentros(datosCentros);

    const buscarInput = document.querySelector("#buscar-input");
    buscarInput.addEventListener("input", () => {
        const municipio = buscarInput.value;
        if (municipio) {
          //  const centrosFiltrados = filtrarPorMunicipio(municipio);
            mostrarCentros(datosCentros);
        } else {
            mostrarCentros([]);  
        }
    });

    const centrosSelect = document.querySelector("#centros-select");
    centrosSelect.addEventListener("change", () => {
        const centroSeleccionado = centrosSelect.value;
        if (centroSeleccionado) {
            const centro = datosCentros.find(c => c.D_DENOMINA === centroSeleccionado);
            if (centro) {
                mostrarSitio(centro);  
            }
        }
    });
});

 function cargarDatos(url) {
     fetch(url)
        .then(response => response.text())  
        .then(data => {
                return procesarCSV(data) 
        })
        .catch(error => console.error("Error al cargar datos:", error));
}

function procesarCSV(data) {
    // Se divide en filas
    const filas = data.split('\n');  
    const listaCentrosMin = [];

    // Saltar el encabezado
    for (let i = 1; i < filas.length; i++) {
        const columnas = filas[i].split(',');

        if (columnas.length >= 8) {
            const centro = {
                D_DENOMINA: columnas[2],  
                D_ESPECIFICA: columnas[3], 
                D_MUNICIPIO: columnas[8]  
            };
            listaCentrosMin.push(centro);  
        }
    }
    console.log(listaCentrosMin);
    return listaCentrosMin;  
}

function filtrarPorMunicipio(municipio) {
    return datosCentros.filter(centro => {
        const municipioCentro = centro.D_MUNICIPIO ? centro.D_MUNICIPIO.trim().toLowerCase() : '';
        return municipioCentro.includes(municipio.trim().toLowerCase());
    });
}

document.querySelector("#buscar-btn").addEventListener("click", () => {
    const municipio = document.querySelector("#buscar-input").value;
    console.log(municipio);

    if (municipio) {
        const centrosFiltrados = filtrarPorMunicipio(municipio);
        console.log(centrosFiltrados);
        mostrarCentros(centrosFiltrados);
    }
});

function mostrarCentros(centros) {
    const centrosSelect = document.querySelector("#centros-select");

    const centrosdiv = document.querySelector("#centros-div");
     console.log("aqui", centros)

    centrosSelect.innerHTML = "";

    if (centros.length === 0) {
        //const option = document.createElement("option");
       // option.textContent = "No se encontraron centros";
      //  centrosSelect.appendChild(option);
        console.log("no hay"); 

    } else {
        centros.forEach(centro => {
            console.log(centro.D_DENOMINA); 
         //   const option = document.createElement("option");
         //   option.textContent = centro.D_DENOMINA;  
         //   option.value = centro.D_DENOMINA;  
         //   centrosSelect.appendChild(option);

            centrosdiv.innerHTML+=centro.D_DENOMINA


        });
    }
}

function mostrarSitio(centro) {

    const sitioDiv = document.querySelector("#ensenanza-select");

    sitioDiv.innerHTML = "";

    if (centro && centro.D_ESPECIFICA) {
        sitioDiv.textContent = `Descripción específica: ${centro.D_ESPECIFICA}`;
    } else {
        sitioDiv.textContent = "No se encontró una descripción específica.";
    }
}
