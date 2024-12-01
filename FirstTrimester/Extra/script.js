document.addEventListener('DOMContentLoaded', () => {
    // Evento para el botón 1
    document.getElementById('button1').addEventListener('click', () => {
        const continent = document.getElementById('continent-select').value;
        const tableBody = document.getElementById('data-table').querySelector('tbody');
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        if (continent) {
            const continentData = companies.find(c => c.continent === continent);
            if (continentData) {
                continentData.countries.forEach(country => {
                    const row = document.createElement('tr');
                    const countryCell = document.createElement('td');
                    countryCell.textContent = country.name;
                    row.appendChild(countryCell);

                    const numCell = document.createElement('td');
                    numCell.textContent = country.companies.length;
                    row.appendChild(numCell);

                    const companiesCell = document.createElement('td');
                    companiesCell.textContent = country.companies.map(company => Object.keys(company)[0]).join(', ');
                    row.appendChild(companiesCell);

                    tableBody.appendChild(row);
                });
            }
        }
    });

    // Evento para el botón 2
    document.getElementById('button2').addEventListener('click', () => {
        const continent = document.getElementById('continent-select').value;
        const tableBody = document.getElementById('data-table').querySelector('tbody');
        tableBody.innerHTML = '';  // Limpiar la tabla antes de agregar los nuevos datos

        if (continent) {
            const continentData = companies.find(c => c.continent === continent);
            if (continentData) {
                continentData.countries.forEach(country => {
                    const row = document.createElement('tr');
                    const countryCell = document.createElement('td');
                    countryCell.textContent = country.name;
                    row.appendChild(countryCell);

                    const numCell = document.createElement('td');
                    numCell.textContent = country.companies.length;
                    row.appendChild(numCell);

                    const companiesCell = document.createElement('td');
                    companiesCell.textContent = country.companies.length;
                    row.appendChild(companiesCell);

                    tableBody.appendChild(row);
                });
            }
        }
    });

    // Evento para el botón 3
    document.getElementById('button3').addEventListener('click', () => {
        const continent = document.getElementById('continent-select').value;
        const tableBody = document.getElementById('data-table').querySelector('tbody');
        tableBody.innerHTML = '';  // Limpiar la tabla antes de agregar los nuevos datos

        if (continent) {
            const continentData = companies.find(c => c.continent === continent);
            if (continentData) {
                continentData.countries.forEach(country => {
                    const row = document.createElement('tr');
                    const countryCell = document.createElement('td');
                    countryCell.textContent = country.name;
                    row.appendChild(countryCell);

                    const numCell = document.createElement('td');
                    numCell.textContent = country.companies.length;
                    row.appendChild(numCell);

                    const companiesCell = document.createElement('td');
                    companiesCell.textContent = country.companies.map(company => Object.keys(company)[0]).join(', ');
                    row.appendChild(companiesCell);

                    tableBody.appendChild(row);
                });
            }
        }
    });
});
