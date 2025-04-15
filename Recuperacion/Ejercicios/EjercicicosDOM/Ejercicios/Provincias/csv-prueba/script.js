let datos =[];

document.addEventListener("DOMContentLoaded",()=>{
    cargarDatos("../../../../../assets/json/da_centros.csv");
});

function cargarDatos(url){
    fetch(url)
    .then(response => response.text())
    .then(data =>{
        datos = procesarCSV(data)
        mostrarDatos(datos);
    })
    .catch(error => console.error("Error al cargar datos:", error));
}

function procesarCSV(data){
    const filas = data.split('\n');
    const listaPeque = [];

    for(let i =1; i<filas.length; i++){
        const columna = filas[i].split(';');
        if (columna.length >= 8){
            const MinCSV={
                D_DENOMINA: columna[2],
                D_ESPECIFICA: columna[3],
                D_MUNICIPIO: columna[8]
            }
            listaPeque.push(MinCSV);
        }
    }
    console.log(listaPeque);
    return listaPeque;
}

function mostrarDatos(datos){
    const tbody = document.querySelector("#list tbody");
    tbody.innerHTML= "";
    if (!datos || datos.length === 0){
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan=3;
        cell.textContent="No se encontraron los datos."
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tbody.appendChild(row);
    } else{
        datos.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML=`
            <td>${item.D_DENOMINA}</td>
            <td>${item.D_ESPECIFICA}</td>
            <td>${item.D_MUNICIPIO}</td>
            `;
            tbody.appendChild(row);
        });
    }
}
