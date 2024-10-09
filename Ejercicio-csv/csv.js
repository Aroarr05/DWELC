
function csvarray(csv, separador = ",") {
    let filas = csv.trim().split("\n");
    return filas.map(fila => fila.trim().split(separador));
}

function crearTabla(csv) {
    const tabla = document.createElement("table");
    const datos = csvarray(csv);

    datos.forEach(fila => {
        const tr = document.createElement("tr");
        fila.forEach(celda => {
            const td = document.createElement("td");
            td.textContent = celda;
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    });

    return tabla;
}

document.querySelector(".tabla").innerHTML = "";
document.querySelector(".tabla").appendChild(crearTabla(csv));