document.addEventListener('DOMContentLoaded', function () {
   
    const backButton = document.querySelector('.back-btn-container .btn');
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
        });
    }
    
    const primaryButton = document.querySelector('.btn .btn-primary');
    if (primaryButton) {
        primaryButton.addEventListener('click', function () {
            desplegar(); 
        });
    }

    // Seleccionamos el contenedor donde se mostrarán las tarjetas
    const destinosContainer = document.getElementById('destinos-container');
    if (destinosContainer) {
        destinos.forEach(destino => {
            const card = document.createElement('div');
            card.classList.add('col-12', 'col-md-6', 'col-lg-4'); // Responsividad

            card.innerHTML = `
                <div class="card">
                    <img src="${destino.imagen}" alt="${destino.nombreDestino}">
                    <div class="card-body">
                        <h5 class="card-title">${destino.nombreDestino}</h5>
                        <p class="card-text">${destino.ubicacion}</p>
                    </div>
                    <div class="card-footer">
                        <small>Latitud: ${destino.latitud}, Longitud: ${destino.longitud}</small>
                    </div>
                </div>
            `;

            // Verificar la ruta de la imagen
            const imgElement = card.querySelector('img');
            console.log('Ruta de la imagen:', imgElement.src); // Esto debería mostrar la ruta correcta de la imagen

            destinosContainer.appendChild(card);
        });
    } else {
        console.error('Contenedor de destinos no encontrado.');
    }
});
