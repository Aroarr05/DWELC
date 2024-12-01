document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('data-table').querySelector('tbody');

    // Para almacenar los datos de los países ya mostrados
    let displayedCountries = [];

    // Evento para el botón 1 (Muestra los países)
    document.getElementById('button1').addEventListener('click', () => {
        const continent = document.getElementById('continent-select').value;
        tableBody.innerHTML = '';  // Limpiar la tabla 
        displayedCountries = [];  // Limpiar la lista de países mostrados

        if (continent) {
            const continentData = companies.find(c => c.continent === continent);
            if (continentData) {
                continentData.countries.forEach(country => {
                    const row = document.createElement('tr');
                    const countryCell = document.createElement('td');
                    countryCell.textContent = country.name;
                    row.appendChild(countryCell);

                    // Guardar el país para agregar más datos luego
                    displayedCountries.push(country);

                    tableBody.appendChild(row);
                });
            }
        }
    });

    // Evento para el botón 2 (Añadir número de compañías)
    document.getElementById('button2').addEventListener('click', () => {
        const continent = document.getElementById('continent-select').value;
        if (continent && displayedCountries.length > 0) {
            displayedCountries.forEach((country, index) => {
                const row = tableBody.rows[index]; // Obtener la fila correspondiente al país
                const numCell = document.createElement('td');
                numCell.textContent = country.companies.length;
                row.appendChild(numCell);
            });
        }
    });

    // Evento para el botón 3 (Añadir nombres de las compañías)
    document.getElementById('button3').addEventListener('click', () => {
        const continent = document.getElementById('continent-select').value;
        if (continent && displayedCountries.length > 0) {
            displayedCountries.forEach((country, index) => {
                const row = tableBody.rows[index]; // Obtener la fila correspondiente al país
                const companiesCell = document.createElement('td');
                companiesCell.textContent = country.companies.map(company => Object.keys(company)[0]).join(', ');
                row.appendChild(companiesCell);
            });
        }
    });
});

