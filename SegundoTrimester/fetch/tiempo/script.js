document.querySelector('.boton').addEventListener('click', async() => {
    const input = document.querySelector('#q'); 
    const q = input.value; 
    // const q = input.value || "48.8567,2.3508";
    // increso el nombre que quierio || si no lo quiero escribir el predeterminado 
    const url = `http://api.weatherapi.com/v1/current.json?key=13fe627b112345ba97491014250801&q=${q}&aqi=no`;

    // los then van anidados aunque esten todos en la misma linea 
    //+
     await fetch(url)
        .then((response) => {
            console.log("response", response.ok, response.status,response);
            return response.json();
        })
        .then(async(data) => {
             console.log(data);

            const location = data.location.name;
            const country = data.location.country;
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            
            const result = document.querySelector('#result');
            result.innerHTML = `
                <h2>Clima en ${location}, ${country}</h2>
                <p>Temperatura: ${temp} °C</p>
                <p>Condición: ${condition}</p>
            `;
            return fetch(data.current.condition.icon);
        })
        .then((iconResponse)=>{
            console.log(iconResponse)
            return iconResponse.blob();
        })
        .then(imgBlod => {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(imgBlod);
            img.alt = "imagen tiempo";
            result.insertAdjacentElement("afterend",img)
        })
        .catch((error) => {
            console.error('Error al obtener los datos del clima:', error);
            document.querySelector('#result').innerHTML = '<p>Error al obtener los datos del clima. Intenta de nuevo.</p>';
        });
});
