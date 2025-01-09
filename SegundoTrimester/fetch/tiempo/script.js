document.querySelector('.boton').addEventListener('click', () => {
    const input = document.querySelector('#q'); 
    const q = input.value; 
    const url = `http://api.weatherapi.com/v1/current.json?key=13fe627b112345ba97491014250801&q=${q}&aqi=no`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            
            const location = data.location.name;
            const country = data.location.country;
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;

            const result = document.querySelector('#result');
            result.innerHTML = `
                <h2>Clima en ${location}, ${country}</h2>
                <p>Temperatura: ${temp} °C</p>
                <p>Condición: ${condition}</p>
                <img src="${icon}" alt="${condition}">
            `;
        })
        .catch((error) => {
            console.error('Error al obtener los datos del clima:', error);
            document.querySelector('#result').innerHTML = '<p>Error al obtener los datos del clima. Intenta de nuevo.</p>';
        });
});
