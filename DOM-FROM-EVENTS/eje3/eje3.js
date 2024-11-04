document.addEventListener("DOMContentLoaded", function() {
    const provinciaSelect = document.getElementById("provincia-select");
    const municipioSelect = document.getElementById("municipio-select");

    datosProvincia.provincias[0].provinces.forEach(provincia => {
        const option = document.createElement("option");
        option.value = provincia.label;  
        option.textContent = provincia.label;
        provinciaSelect.appendChild(option);
    });

    provinciaSelect.addEventListener("change", function() {
        const selectedProvince = provinciaSelect.value;
        municipioSelect.innerHTML = "";  

        const provincia = datosProvincia.provincias[0].provinces.find(p => p.label === selectedProvince);
        if (provincia) {
            provincia.towns.forEach(municipio => {
                const option = document.createElement("option");
                option.value = municipio.label;  
                option.textContent = municipio.label;
                municipioSelect.appendChild(option);
            });
        }
    });
});
