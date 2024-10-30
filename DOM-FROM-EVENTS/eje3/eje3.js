const municipio = {
    1: "Huelva",
    2: "Sevilla",
    3: "Córdoba",
    4: "Jaen",
    5: "Málaga",
    6: "Cadiz",
    7: "Granada",
    8: "Almería",
}

const selectElement = document.getElementById("municipio-select");

for( const key in municipio){
    if (municipio.hasOwnProperty(key)){
        const option = document.createElement("option");
        option.value =key;
        option.textContent = municipio[key];
        selectElement.appendChild(option);
    }
}